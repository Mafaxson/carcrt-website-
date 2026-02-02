import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = supabase.auth.getSession ? supabase.auth.getSession() : supabase.auth.session();
    if (currentSession instanceof Promise) {
      currentSession.then(({ data }) => {
        setSession(data?.session || null);
        setLoading(false);
      });
    } else {
      setSession(currentSession);
      setLoading(false);
    }
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return { session, loading };
}
