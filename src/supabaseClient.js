import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://diqviartkdfafpvaznzz.supabase.co'
const supabaseKey = 'sb_publishable_8DSUs8I21wuuoxazZwg_YA_DiEjkNKw'

export const supabase = createClient(supabaseUrl, supabaseKey)