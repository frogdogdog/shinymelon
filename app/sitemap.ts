import { createClient } from '@supabase/supabase-js'

export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const baseUrl = 'https://shinymelon.com'

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/math`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]

  // Get all skill nodes with their domain info
  const { data: skillNodes } = await supabase
    .from('skill_nodes')
    .select(`
      code,
      clusters (
        domains (
          code, grade_id
        )
      )
    `)

  const skillPages = (skillNodes || []).map((node: any) => {
    const domain = node.clusters?.domains
    const grade = domain?.grade_id?.toLowerCase()
    const domainCode = domain?.code?.toLowerCase()
    const parts = node.code.split('.')
    const skillSlug = parts.map((p: string, i: number) =>
      i < parts.length - 1 ? p.toLowerCase() : p
    ).join('-')

    return {
      url: `${baseUrl}/math/${grade}/${domainCode}/${skillSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  }).filter(p => p.url.includes('undefined') === false)

  // Get all sub-skills with worksheet data
  const { data: subSkills } = await supabase
    .from('sub_skills')
    .select(`
      name,
      skill_nodes (
        code,
        clusters (
          domains (
            code, grade_id
          )
        )
      )
    `)
    .not('worksheets', 'is', null)

  const subSkillPages = (subSkills || []).map((ss: any) => {
    const node = ss.skill_nodes
    const domain = node?.clusters?.domains
    const grade = domain?.grade_id?.toLowerCase()
    const domainCode = domain?.code?.toLowerCase()
    const parts = (node?.code || '').split('.')
    const skillSlug = parts.map((p: string, i: number) =>
      i < parts.length - 1 ? p.toLowerCase() : p
    ).join('-')
    const subSkillSlug = ss.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    return {
      url: `${baseUrl}/math/${grade}/${domainCode}/${skillSlug}/${subSkillSlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  }).filter(p => p.url.includes('undefined') === false)

  return [...staticPages, ...skillPages, ...subSkillPages]
}