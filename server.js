const express = require("express")
const sqlite3 = require('sqlite3').verbose();
const app = express()
const session = require('express-session');

const port = 4000

app.use(express.static("public"))
app.listen(port,() => {
    console.log("APP LISTEN ON PORT",port)
})

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