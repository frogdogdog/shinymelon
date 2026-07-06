const { createClient } = require('@supabase/supabase-js')
const { config } = require('dotenv')
const { resolve } = require('path')
const ws = require('ws')
const { generateThumbnail } = require('./lib/generate-thumbnail.cjs')

config({ path: resolve(process.cwd(), '.env.local') })

console.log('🍈 ShinyMelon Thumbnail Generator')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { realtime: { transport: ws } }
)

const BATCH_SIZE = 231

async function run() {
  try {
    console.log('Fetching worksheets without thumbnails...')

    const { data: worksheets, error } = await supabase
      .from('worksheets')
      .select('id, title, instructions, questions, skill_url, copyright_year, sub_skills(id, name, difficulty), skill_nodes(id, code, name, cc_standard)')
      .is('thumbnail_url', null)
      .limit(BATCH_SIZE)

    if (error) {
      console.error('Failed to fetch:', error.message)
      process.exit(1)
    }

    console.log('Found:', worksheets?.length, 'worksheets')

    if (!worksheets || worksheets.length === 0) {
      console.log('All worksheets already have thumbnails!')
      process.exit(0)
    }

    let success = 0
    let failed = 0

    for (const worksheet of worksheets) {
      process.stdout.write(`  [${success + failed + 1}/${worksheets.length}] ${worksheet.title}... `)
      try {
        const thumbnail = await generateThumbnail(worksheet, worksheet.sub_skills, worksheet.skill_nodes)
        const fileName = `thumbnails/${worksheet.id}.png`
        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(fileName, thumbnail, { contentType: 'image/png', upsert: true })
        if (uploadError) throw new Error(uploadError.message)
        const thumbnailUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/${fileName}`
        await supabase.from('worksheets').update({ thumbnail_url: thumbnailUrl }).eq('id', worksheet.id)
        console.log('✅')
        success++
      } catch (err) {
        console.log('❌', err.message)
        failed++
      }
    }

    console.log(`\nDone! ✅ ${success} generated, ❌ ${failed} failed`)
  } catch (err) {
    console.error('Unexpected error:', err.message)
    console.error(err.stack)
  }
}

run()
