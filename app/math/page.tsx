import { createClient } from '@supabase/supabase-js'
import MathBrowseClient from '../../components/MathBrowseClient'

export const metadata = {
  title: 'Math Worksheets K-8 | ShinyMelon',
  description: 'Browse free math worksheets for Kindergarten through 8th grade. Organized by grade, domain, and skill. Common Core aligned. Download or print instantly.',
}

export default async function MathBrowsePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: grades } = await supabase
    .from('grades')
    .select('id, label, sort_order')
    .order('sort_order')

  const { data: domains } = await supabase
    .from('domains')
    .select(`
      id, code, name, grade_id, sort_order,
      clusters (
        id, name, sort_order,
        skill_nodes (
          id, code, name, cc_standard
        )
      )
    `)
    .order('sort_order')

  const { data: worksheetCounts } = await supabase
    .from('worksheets')
    .select('skill_node_id')

  const countMap: Record<string, number> = {}
  worksheetCounts?.forEach(w => {
    countMap[w.skill_node_id] = (countMap[w.skill_node_id] || 0) + 1
  })

  return (
    <MathBrowseClient
      grades={grades || []}
      domains={domains || []}
      countMap={countMap}
    />
  )
}