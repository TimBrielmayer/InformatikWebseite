const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen (oder erstellen, wenn nicht vorhanden)
const db = new sqlite3.Database('meineDatenbank.db');

// Beispiel-Tabelle erstellen
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');

  // Beispiel-Datensatz einfügen
  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
  stmt.run('John Doe');
  stmt.finalize();

  // Beispiel-Abfrage
  db.each('SELECT id, name FROM users', (err, row) => {
    console.log(`ID: ${row.id}, Name: ${row.name}`);
  });
});

// Datenbankverbindung schließen
db.close();
