const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const app = express()
const session = require('express-session');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

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
        let createNewUser = `INSERT INTO users (username,email,password)
        VALUES ('${username}','${email}','${hashedPassword}')`;
        let insertInDataBase = await db.run(createNewUser);
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
        res.status(200);
        res.send("Login success!");
      } else {
        res.status(400);
        res.send("Invalid password");
      }
    }
  });
});

app.get('/tasks/:uid', (req, res) => {
  const db = new sqlite3.Database('database.db');
  const uid = req.params.uid;

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
  db.close();
});



const sql = 'SELECT * FROM users';

db.all(sql, (err, rows) => {
  console.log(rows)
});