import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { News } from '@/types/supabase';

/**
 * useNews fetches all news/blog/updates from Supabase, ordered by published date.
 */
export function useNews() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .then(({ data }) => setNews(data || []));
  }, []);

  return news;
}
