// SQLite setup for intern groups
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./internGroups.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS intern_groups (
    id TEXT PRIMARY KEY,
    name TEXT,
    community TEXT,
    bio TEXT,
    photo TEXT
  )`);
});

module.exports = db;
