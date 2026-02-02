import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Event } from '@/types/supabase';

/**
 * useEvents fetches all events from Supabase, ordered by event date.
 */
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })
      .then(({ data }) => setEvents(data || []));
  }, []);

  return events;
}
