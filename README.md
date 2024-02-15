Jo, damit starten wir also in ein neues Abenteuer. Ich wünsche euch allen eine gute Reise.
Haltet euch fest, der Wasserfallsturz ist noch die leichteste Aufgabe die wir hinter uns bringen müssen
Signed Dominik Kienle

Stand 31.01.2024

Die erste Zusammenarbeit hat auch gut geklappt, wir haben eine Login Page, danke an euch,
Und ja, ich versuch mich jetzt noch weiter, bald bin ich auf der Rennbahn und versuch aufzuholen.

Jo, also die Webseite nimmt ja langsam gestallt an, wir haben nun die Todos Seite über die, die
Listen erkennbar sind und auswählbar, außerdem lassen sich neue Tasks in der Datenbank hinzufügen und löschen.



db.run('CREATE TABLE IF NOT EXISTS users (uid INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)');
db.run('CREATE TABLE IF NOT EXISTS todos (tid INTEGER PRIMARY KEY, task TEXT, sdate DATETIME, edate DATETIME)');
db.run('CREATE TABLE IF NOT EXISTS usertodos (utid INTEGER PRIMARY KEY, tid INTEGER, uid INTEGER)');




db.run('CREATE TABLE IF NOT EXISTS users (uid INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)');
db.run('CREATE TABLE IF NOT EXISTS task (tid INTEGER PRIMARY KEY, taskname TEXT, sdate DATETIME, edate DATETIME, lid INTEGER)');
db.run('CREATE TABLE IF NOT EXISTS userlist (ulid INTEGER PRIMARY KEY, lid INTEGER, uid INTEGER)');
db.run('CREATE TABLE IF NOT EXISTS list (lid INTEGER PRIMARY KEY, listname TEXT)');


createElement