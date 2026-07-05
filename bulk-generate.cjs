const Anthropic = require('@anthropic-ai/sdk')
const { createClient } = require('@supabase/supabase-js')
const { config } = require('dotenv')
const { resolve } = require('path')
const ws = require('ws')

config({ path: resolve(process.cwd(), '.env.local') })

console.log('🍈 ShinyMelon Bulk Worksheet Generator')

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { realtime: { transport: ws } }
)

const BATCH_SIZE = 50

async function generateWorksheet(subSkill, node, cluster, domain) {
  const grade = domain.grade_id === 'K' ? 'Kindergarten' : `${domain.grade_id}st Grade`
  const difficultyLabel = ['', 'Introduction', 'Practice', 'Challenge'][subSkill.difficulty]
  const skillUrl = `shinymelon.com/math/${domain.grade_id.toLowerCase()}/${domain.code.toLowerCase()}/${node.code.toLowerCase().replace(/\./g, '-')}`

  const prompt = `You are an expert elementary math curriculum designer creating a worksheet for ShinyMelon, an educational platform for young children.

WORKSHEET DETAILS:
- Grade: ${grade}
- Domain: ${domain.name}
- Cluster: ${cluster.name}
- Skill: ${node.name} [${node.cc_standard || 'Extension'}]
- Sub-skill / Variant: ${subSkill.name}
- Difficulty Level: ${subSkill.difficulty}/3 (${difficultyLabel})

DESIGN RULES:
- Language must be simple enough for ${grade} students
- Use fun, child-friendly themes (animals, food, toys, nature)
- Questions must directly practice the sub-skill
- Difficulty ${subSkill.difficulty} means: ${subSkill.difficulty === 1 ? 'very simple, heavily scaffolded' : subSkill.difficulty === 2 ? 'moderate, some scaffolding' : 'challenging, minimal scaffolding'}
- Include exactly 8 questions
- Every question must have one clear correct answer
- Answer key must be complete and accurate

Respond ONLY with a valid JSON object — no markdown, no backticks, no explanation:

{
  "title": "Worksheet title (fun, skill-specific, 4-8 words)",
  "instructions": "One sentence telling the child what to do",
  "questions": [
    {
      "number": 1,
      "prompt": "The question text",
      "type": "fill-in | multiple-choice | true-false",
      "options": ["A", "B", "C"]
    }
  ],
  "answer_key": [
    { "number": 1, "answer": "The correct answer" }
  ]
}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const worksheetData = JSON.parse(message.content[0].text)

  const { data, error } = await supabase
    .from('worksheets')
    .insert({
      sub_skill_id: subSkill.id,
      skill_node_id: node.id,
      variant_index: 1,
      title: worksheetData.title,
      instructions: worksheetData.instructions,
      questions: worksheetData.questions,
      answer_key: worksheetData.answer_key,
      logo_version: 'v1',
      copyright_year: new Date().getFullYear(),
      skill_url: skillUrl,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

async function run() {
  try {
    const { data: existing, error: existingError } = await supabase
      .from('worksheets')
      .select('sub_skill_id')

    if (existingError) {
      console.error('❌ Failed to fetch existing worksheets:', existingError.message)
      process.exit(1)
    }

    const doneIds = new Set((existing || []).map(w => w.sub_skill_id))
    console.log(`✅ Already generated: ${doneIds.size} worksheets`)

    const { data: subSkills, error } = await supabase
      .from('sub_skills')
      .select(`
        id, name, difficulty, skill_node_id,
        skill_nodes (
          id, code, name, cc_standard,
          clusters (
            name,
            domains (
              name, code, grade_id
            )
          )
        )
      `)
      .limit(500)

    if (error) {
      console.error('❌ Failed to fetch sub-skills:', error.message)
      process.exit(1)
    }

    const pending = subSkills.filter(s => !doneIds.has(s.id)).slice(0, BATCH_SIZE)

    if (pending.length === 0) {
      console.log('🎉 All worksheets already generated!')
      process.exit(0)
    }

    console.log(`📋 Generating ${pending.length} worksheets...\n`)

    let success = 0
    let failed = 0

    for (const subSkill of pending) {
      const node = subSkill.skill_nodes
      const cluster = node.clusters
      const domain = cluster.domains

      process.stdout.write(`  [${success + failed + 1}/${pending.length}] ${node.code} — ${subSkill.name}... `)

      try {
        await generateWorksheet(subSkill, node, cluster, domain)
        console.log('✅')
        success++
        await new Promise(r => setTimeout(r, 500))
      } catch (err) {
        console.log(`❌ ${err.message}`)
        failed++
      }
    }

    console.log(`\n📊 Results:`)
    console.log(`   ✅ Generated: ${success}`)
    console.log(`   ❌ Failed:    ${failed}`)
    console.log(`   📦 Total in DB: ${doneIds.size + success}`)
    console.log(`   📋 Remaining:   ${496 - doneIds.size - success}\n`)

  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
    console.error(err.stack)
  }
}

run()