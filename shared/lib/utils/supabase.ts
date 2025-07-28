import { Database } from '@/types_db';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
