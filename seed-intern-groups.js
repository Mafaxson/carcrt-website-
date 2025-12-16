// Script to seed intern_groups table with sample data
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./internGroups.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS intern_groups (
    id TEXT PRIMARY KEY,
    name TEXT,
    community TEXT,
    bio TEXT,
    photo TEXT
  )`);

  const stmt = db.prepare('INSERT OR REPLACE INTO intern_groups (id, name, community, bio, photo) VALUES (?, ?, ?, ?, ?)');

  stmt.run(
    'intern-2023',
    '2023 Internship Cohort',
    'Freetown',
    'A group of passionate interns who contributed to CArCRT projects in 2023.',
    '/uploads/interns-2023.jpg'
  );
  stmt.run(
    'intern-2024',
    '2024 Internship Cohort',
    'Bo',
    'The 2024 cohort focused on community outreach and digital transformation.',
    '/uploads/interns-2024.jpg'
  );
  stmt.run(
    'intern-2025',
    '2025 Internship Cohort',
    'Kenema',
    'Interns from 2025 worked on health and education initiatives.',
    '/uploads/interns-2025.jpg'
  );

  stmt.finalize();
  console.log('Intern groups seeded successfully.');
  db.close();
});
