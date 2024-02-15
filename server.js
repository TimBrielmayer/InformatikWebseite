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

        let getUID = `SELECT uid FROM users WHERE username = "${username}"`;
        db.get(getUID, (err, row) => {
          req.session.uid = row.uid;
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

app.post('/getLists', (req, res) => {

  //const uid = req.session.uid;
  const uid = 1;
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
    res.json({ data: rows });
  });
});

app.post('/addTask', async (req, res) => {

  const { taskname, sdate, edate, lid } = req.body;

  var sql = `INSERT INTO task (taskname,sdate,edate,lid) VALUES('${taskname}','${sdate}','${edate}',${lid})`
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

  const { listname, users } = req.body;

  var sql = `INSERT INTO list (listname) VALUES('${listname}')`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }
    const lid = this.lastID
    for (i = 0; i < users.length; i++) {
      sql = `SELECT uid FROM users WHERE username = "${users[i]}"`;
      db.get(sql, (err, row) => {
        sql = `INSERT INTO userlist (uid,lid) VALUES (${users[i]},${lid})`;

        db.run(sql, async function (err) {
          if (err) {
            return console.error(err.message);
          }

        });
      });
    }

    res.status(200);
    res.send("userlist created")
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

  const { lid, uid } = req.body;

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

  const { lid, uid } = req.body;

  var sql = `INSERT INTO userlist (uid,lid) VALUES (${uid}, ${lid});`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }

    res.status(200);
    res.send("user added")
  });

})


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