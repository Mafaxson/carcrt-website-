import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { DynamicContent } from '@/types/supabase';

/**
 * useDynamicContent fetches a dynamic content section from Supabase by section name.
 */
export function useDynamicContent(section: string) {
  const [content, setContent] = useState<DynamicContent | null>(null);

  useEffect(() => {
    supabase
      .from('dynamic_content')
      .select('*')
      .eq('section', section)
      .single()
      .then(({ data }) => setContent(data));
  }, [section]);

  return content;
}
