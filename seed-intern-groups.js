// Script to seed the 2025 internship group into the SQLite database
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./internGroups.db');

const group = {
	id: '2025',
	name: 'Internship Cohort 2025',
	community: 'CArCRT Internship Cohorts by Year',
	bio: 'The 2025 CArCRT Internship Cohort brought together passionate young leaders dedicated to community transformation across Sierra Leone.',
	photo: '/uploads/interns-2025.jpg',
};

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS intern_groups (
		id TEXT PRIMARY KEY,
		name TEXT,
		community TEXT,
		bio TEXT,
		photo TEXT
	)`);
	db.run(
		`INSERT OR REPLACE INTO intern_groups (id, name, community, bio, photo) VALUES (?, ?, ?, ?, ?)`,
		[group.id, group.name, group.community, group.bio, group.photo],
		function (err) {
			if (err) {
				console.error('Failed to insert 2025 intern group:', err);
			} else {
				console.log('2025 intern group seeded successfully.');
			}
			db.close();
		}
	);
});
