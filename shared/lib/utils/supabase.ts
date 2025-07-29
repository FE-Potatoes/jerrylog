import { Database } from '@/types_db';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  global: {
    fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) =>
      fetch(input, {
        ...init,
        cache: 'no-store',
      }),
  },
});
