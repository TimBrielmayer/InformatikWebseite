Jo, damit starten wir also in ein neues Abenteuer. Ich wünsche euch allen eine gute Reise.
Haltet euch fest, der Wasserfallsturz ist noch die leichteste Aufgabe die wir hinter uns bringen müssen
Signed Dominik Kienle

Stand 31.01.2024



db.run('CREATE TABLE IF NOT EXISTS users (uid INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS todos (tid INTEGER PRIMARY KEY, task TEXT, sdate DATETIME, edate DATETIME)');
  db.run('CREATE TABLE IF NOT EXISTS usertodos (utid INTEGER PRIMARY KEY, tid INTEGER, uid INTEGER)');
