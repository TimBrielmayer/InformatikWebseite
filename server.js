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

app.get('/tasks', (req, res) => {

  const uid = req.session.uid;

  const sql = `
      SELECT usertodos.*, todos.*
      FROM usertodos
      INNER JOIN todos ON usertodos.tid = todos.tid
      WHERE usertodos.uid = ?`;

  db.all(sql, [uid], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.post('/addTask', async (req, res) => {

  const { task, sdate, edate } = req.body;
  const uid = req.session.uid;

  var sql = `INSERT INTO todos (task,sdate,edate) VALUES('${task}','${sdate}','${edate}')`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }

    const tid = this.lastID;
    
    sql = `INSERT INTO usertodos (tid,uid) VALUES(${tid},${uid})`
    await db.run(sql);
    res.status(200);
    res.send("task created")
  });
})

app.post('/deleteTask', async (req, res) => {

  const { tid } = req.body;

  var sql = `DELETE FROM usertodos WHERE tid = ${tid};DELETE FROM todos WHERE tid = ${tid};`
  db.run(sql, async function (err) {
    if (err) {
      return console.error(err.message);
    }
    sql = `DELETE FROM todos WHERE tid = ${tid};`
    db.run(sql, function(err) {
      if(err) {
        return console.error(err.message)
      }
      res.status(200);
      res.send("task deleted")
    });
  });

})

console.log("tasks:")
var sql = 'SELECT * FROM todos'
db.all(sql, (err, rows) => {
  console.log(rows)
})

console.log("usertodos:")
sql = 'SELECT * FROM usertodos'
db.all(sql, (err, rows) => {
  console.log(rows)
})