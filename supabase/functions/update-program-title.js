// Supabase Edge Function: Update program title
// Place this file in supabase/functions/update-program-title.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  try {
    // Update the program title
    const { data, error } = await supabase
      .from('programs')
      .update({ title: 'Governance, Human Rights & Social Accountability' })
      .eq('title', 'Governance, Human Rights & Accountability');

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.json({ success: true, updated: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

// Usage:
// POST to this endpoint (e.g., /functions/update-program-title) to trigger the update.
// Make sure SUPABASE_SERVICE_ROLE_KEY is set in your environment for write access.
