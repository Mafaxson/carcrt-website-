// migrate-news-events.cjs
// Node.js script to import news and events from local JSON files into Supabase using REST API
// Usage: node migrate-news-events.cjs

const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const newsData = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
const eventsData = JSON.parse(fs.readFileSync('./data/events.json', 'utf8'));

async function insertRows(table, rows) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to insert into ${table}: ${err}`);
  }
  return res.json();
}

(async () => {
  // Prepare news rows
  const newsRows = newsData.map(n => ({
    id: n.id,
    title: n.title,
    body: n.content || n.excerpt,
    published_at: n.date,
    image_url: n.image || null
  }));
  // Prepare events rows
  const eventRows = eventsData.map(e => ({
    id: e.id,
    title: e.title,
    description: e.description,
    event_date: e.dateFrom,
    location: e.location,
    image_url: e.image || null
  }));
  try {
    if (newsRows.length) {
      console.log('Inserting news...');
      await insertRows('news', newsRows);
      console.log('News imported successfully.');
    }
    if (eventRows.length) {
      console.log('Inserting events...');
      await insertRows('events', eventRows);
      console.log('Events imported successfully.');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
