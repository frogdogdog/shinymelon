import { createClient } from '@supabase/supabase-js'
import WorksheetDetailClient from '../../../../../components/WorksheetDetailClient'
import { notFound } from 'next/navigation'

export default async function WorksheetDetailPage({
  params,
}: {
  params: Promise<{ grade: string; domain: string; skill: string }>
}) {
  const { grade, domain, skill } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Preserve case for the last segment (e.g. K.OA.1a not K.OA.1A)
const parts = skill.split('-')
const skillCode = parts.map((p, i) => i < parts.length - 1 ? p.toUpperCase() : p).join('.')

  const { data: skillNode } = await supabase
    .from('skill_nodes')
    .select(`
      id, code, name, cc_standard, description,
      cluster_id,
      clusters (
        name,
        domains (
          name, code, grade_id
        )
      )
    `)
    .eq('code', skillCode)
    .single()

  if (!skillNode) return notFound()

  const { data: subSkills } = await supabase
    .from('sub_skills')
    .select(`
      id, name, difficulty,
      worksheets (
        id, title, instructions, questions, skill_url, copyright_year
      )
    `)
    .eq('skill_node_id', skillNode.id)
    .order('difficulty')
    .order('sort_order')

  const { data: relatedNodes } = await supabase
    .from('skill_nodes')
    .select('id, code, name')
    .eq('cluster_id', skillNode.cluster_id)
    .neq('id', skillNode.id)
    .limit(4)

  return (
    <WorksheetDetailClient
      skillNode={skillNode}
      subSkills={subSkills || []}
      relatedNodes={relatedNodes || []}
    />
  )
}