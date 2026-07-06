import { createClient } from '@supabase/supabase-js'
import HomeClient from '../components/HomeClient'

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: worksheets } = await supabase
    .from('worksheets')
    .select(`
      id, title, skill_url, copyright_year, thumbnail_url,
      skill_nodes (
        name, code, cc_standard,
        clusters (
          name,
          domains (
            name, code, grade_id
          )
        )
      ),
      sub_skills (name)
    `)
    .order('generated_at', { ascending: false })
    .limit(100)

  return <HomeClient worksheets={worksheets || []} />
}