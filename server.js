const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express()

const port = 4000

const db = new sqlite3.Database('database.db');

app.use(express.static("public"))
app.use(bodyParser.json());

app.use(session({
  secret: 'ljskdjb72cbku87vc9gcid8sdih',
  resave: false,
  saveUninitialized: false
}));

app.listen(port, () => {
  console.log("APP LISTEN ON PORT", port)
})



app.get("/getUsername", (req, res) => {
  //req.session.username = 'Philipp'
  if (req.session.username === undefined) {
    res.status(204);
    res.send();
  }
  else {
    res.status(200);
    res.json(req.session.username)
  }
})



app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let checkUserQuery = `SELECT * FROM users WHERE username = '${username}'`;

  db.get(checkUserQuery, async (err, row) => {
    if (row === undefined) {
      if (password.length < 5) {
        res.status(400);
        res.send(`Password is too short`);
      } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let createNewUser = `INSERT INTO users (username, email, password)
          VALUES ('${username}', '${email}', '${hashedPassword}')`;

        await db.run(createNewUser);

        let getUID = `SELECT uid, username FROM users WHERE username = "${username}"`;
        db.get(getUID, (err, row) => {
          req.session.uid = row.uid;
          req.session.username = row.username;
        });

        res.status(200);
        res.send(`User created successfully`);
      }
    } else {
      res.status(400);
      res.send(`This username already exists`);
    }
  });
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let getUserDetails = `SELECT * FROM users WHERE username = '${username}'`;

  db.get(getUserDetails, async (err, row) => {
    if (row === undefined) {
      res.status(400);
      res.send("Invalid user");
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        row.password
      );

      if (isPasswordMatched) {
        req.session.uid = row.uid;
        req.session.username = row.username;

        res.status(200);
        res.send("Login success!");
      } else {
        res.status(400);
        res.send("Invalid password");
      }
    }
  });
});

app.post('/getTasks', (req, res) => {

  const { lid } = req.body;
  const sql = `SELECT * FROM task WHERE lid = ${lid}`;


  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.post('/getListByName', (req, res) => {

  const { listname } = req.body;
  const sql = `SELECT * FROM list WHERE listname = ${listname}`;


  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.post('/getLists', (req, res) => {

  const uid = req.session.uid;
  const sql = `
      SELECT userlist.lid, list.listname
      FROM userlist
      INNER JOIN users ON userlist.uid = users.uid
      INNER JOIN list ON list.lid = userlist.lid
      WHERE users.uid = ${uid}`;

  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    else {
      res.status(200);
      res.json({ data: rows });
    }
  });
});

app.post('/addTask', async (req, res) => {

  const { taskname, edate, lid } = req.body;

  var sql = `INSERT INTO task (taskname,edate,lid) VALUES('${taskname}','${edate}',${lid})`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200);
    res.send("task created")
  });
})

app.post('/deleteTask', async (req, res) => {

  const { tid } = req.body;

  var sql = `DELETE FROM task WHERE tid = ${tid};`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(200);
    res.send("task deleted")

  });

})

app.post('/createList', async (req, res) => {
  const { listname, uids } = req.body;
  console.log(uids);
  var sql = `INSERT INTO list (listname) VALUES('${listname}')`
  await db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }
    const lid = this.lastID
    
    for (i = 0; i < uids.length; i++) {
      sql = `INSERT INTO userlist (uid,lid) VALUES (${uids[i]},${lid})`;
      await db.run(sql, async function (err) {
        if (err) {
          return console.error(err.message);  
        }
      });

    }
    res.json(lid);
    res.status(200);
   
  });
})

app.post('/deleteList', async (req, res) => {

  const { lid } = req.body;

  var sql = `DELETE FROM list WHERE lid = ${lid};`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }

  });

  sql = `DELETE FROM task WHERE lid = ${lid};`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }

  });

  sql = `DELETE FROM userlist WHERE lid = ${lid};`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }

  });

  res.status(200);
  res.send("list deleted")

})

app.post('/removeUserFromList', async (req, res) => {

  const { lid } = req.body;
  const uid = req.session.uid;
  var sql = `DELETE FROM userlist WHERE lid = ${lid} AND uid = ${uid};`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }
    sql = `SELECT * FROM userlist WHERE lid = ${lid}`;
    db.all(sql, (err, rows) => {
      if (rows.length == 0) {
        sql = `DELETE FROM list WHERE lid = ${lid}`;
        db.run(sql);
        sql = `DELETE FROM task WHERE lid = ${lid}`;
        db.run(sql);
      }
    })
    res.status(200);
    res.send("user removed")
  });

})

app.post('/addUserToList', async (req, res) => {

  const { lid, users } = req.body;
  const user = users.split(", ")
  for (i = 0; i < user.length; i++) {
    sql = `SELECT uid FROM users WHERE username = "${user[i]}"`;

    db.get(sql, (err, row) => {
      if (row == null) {
        res.status(400);
        res.send('Dieser User existiert nicht');
      } else {

        sql = `INSERT INTO userlist (uid,lid) SELECT ${row.uid},${lid} WHERE NOT EXISTS(SELECT * FROM userlist WHERE uid = ${row.uid} AND lid =${lid});`;

        db.run(sql, async function (err) {
          if (err) {
            return console.error(err.message);
          } else {
            res.status(200);
            res.send('User erfolgreich hinzugefügt')
          }

        });
      }


    });
  }
})

app.post('/changeTaskState', (req, res) => {
  const { tid, state } = req.body;

  const sql = `UPDATE task SET done = '${state}' WHERE tid = ${tid}`;

  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }

    res.status(200);
    res.send("task state changed")
  });
});


app.post("/getUsersInList", (req, res) => {
  //req.session.username = 'Philipp'
  const { lid } = req.body;
  var sql = `SELECT users.uid, users.username FROM users
  INNER JOIN userlist ON userlist.uid = users.uid
  WHERE userlist.lid = ${lid};`

  db.all(sql, (err, rows) => {
    res.json(rows);
    res.status(200);
  });


  //return res.status


})


app.post('/getUid', async(req, res) => {

  const { username } = req.body;
  const sql = `SELECT uid FROM users WHERE username = "${username}";`;


  await db.get(sql, (err, rows) => {
    if(rows == null){
      res.json(null)
      res.status(400);
      return;
    }else{
      res.json(rows.uid);
      res.status(200)
    }
   
  });

});



console.log("tasks:")
var sql = 'SELECT * FROM task'
db.all(sql, (err, rows) => {
  console.log(rows)
})

console.log("list:")
sql = 'SELECT * FROM list'
db.all(sql, (err, rows) => {
  console.log(rows)
})

console.log("userlist:")
sql = 'SELECT * FROM userlist'
db.all(sql, (err, rows) => {
  console.log(rows)
})

console.log("users:")
sql = 'SELECT * FROM users'
db.all(sql, (err, rows) => {
  console.log(rows)
})

/*
sql = 'INSERT INTO list(listname) VALUES("einkaufen")'
db.all(sql, (err, rows) => {
  console.log(rows)
})

sql = 'INSERT INTO task(taskname, sdate, edate, lid) VALUES("apfel", "20201202 10:10:01 AM", "20201202 10:10:01 AM", 1)'
db.all(sql, (err, rows) => {
  console.log(rows)
})

sql = 'INSERT INTO task(taskname, sdate, edate, lid) VALUES("banane", "20201202 10:10:01 AM", "20201202 10:10:01 AM", 1)'
db.all(sql, (err, rows) => {
  console.log(rows)
})

sql = 'INSERT INTO userlist(uid, lid) VALUES(1,1)'
db.all(sql, (err, rows) => {
  console.log(rows)
})


sql = 'DELETE FROM task WHERE 1'
db.all(sql, (err, rows) => {
  console.log(rows)
})
sql = 'DELETE FROM userlist WHERE 1'
db.all(sql, (err, rows) => {
  console.log(rows)
})
sql = 'DELETE FROM list WHERE 1'
db.all(sql, (err, rows) => {
  console.log(rows)
})
*/