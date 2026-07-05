import { createClient } from '@supabase/supabase-js'
import SubSkillDetailClient from '@/components/SubSkillDetailClient'
import { notFound } from 'next/navigation'

export default async function SubSkillDetailPage({
  params,
}: {
  params: Promise<{ grade: string; domain: string; skill: string; subskill: string }>
}) {
  const { grade, domain, skill, subskill } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const skillCode = skill.toUpperCase().replace(/-/g, '.')

  // Get the skill node
  const { data: skillNode } = await supabase
    .from('skill_nodes')
    .select(`
      id, code, name, cc_standard, cluster_id,
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

  // Get all sub-skills for this node so we can find the right one
  const { data: allSubSkills } = await supabase
    .from('sub_skills')
    .select('id, name, difficulty, sort_order')
    .eq('skill_node_id', skillNode.id)
    .order('difficulty')
    .order('sort_order')

  if (!allSubSkills || allSubSkills.length === 0) return notFound()

  // Match sub-skill by slug — convert URL slug back to name for matching
  const subskillSlug = subskill.toLowerCase()
  const matchedSubSkill = allSubSkills.find(ss =>
    ss.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === subskillSlug
  ) || allSubSkills[0]

  // Get the worksheet for this sub-skill
  const { data: worksheet } = await supabase
    .from('worksheets')
    .select('id, title, instructions, questions, answer_key, skill_url, copyright_year')
    .eq('sub_skill_id', matchedSubSkill.id)
    .single()

  // Get adjacent sub-skills for prev/next navigation
  const currentIndex = allSubSkills.findIndex(ss => ss.id === matchedSubSkill.id)
  const prevSubSkill = currentIndex > 0 ? allSubSkills[currentIndex - 1] : null
  const nextSubSkill = currentIndex < allSubSkills.length - 1 ? allSubSkills[currentIndex + 1] : null

  // Get related skill nodes
  const { data: relatedNodes } = await supabase
    .from('skill_nodes')
    .select('id, code, name')
    .eq('cluster_id', skillNode.cluster_id)
    .neq('id', skillNode.id)
    .limit(4)

  const gradeId = domain.toUpperCase()
  const domainCode = domain.toUpperCase()
  const skillSlug = skill.toLowerCase()

  return (
    <SubSkillDetailClient
      skillNode={skillNode}
      subSkill={matchedSubSkill}
      allSubSkills={allSubSkills}
      worksheet={worksheet}
      prevSubSkill={prevSubSkill}
      nextSubSkill={nextSubSkill}
      relatedNodes={relatedNodes || []}
      grade={grade}
      domainCode={domainCode}
      skillSlug={skillSlug}
    />
  )
}