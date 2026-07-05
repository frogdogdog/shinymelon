import { join } from 'path'
import { renderToBuffer } from '@react-pdf/renderer'
import { createClient } from '@supabase/supabase-js'
import { WorksheetPDF } from '../../../lib/pdf-worksheet.js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  console.log('cwd:', process.cwd())
console.log('font path:', join(process.cwd(), 'public/fonts/Atkinson-Regular.ttf'))
  const { searchParams } = new URL(request.url)
  const worksheetId = searchParams.get('id')
  const isPrint = searchParams.get('print') === 'true'

  try {
    const { data: worksheet, error } = await supabase
      .from('worksheets')
      .select(`
        *,
        skill_nodes (
          code,
          name,
          cc_standard,
          clusters (
            name,
            domains (
              name,
              code,
              grade_id
            )
          )
        ),
        sub_skills (
          name,
          difficulty
        )
      `)
      .eq('id', worksheetId)
      .single()

    if (error) throw new Error(error.message)

    // Merge difficulty from sub_skill onto worksheet for the PDF
    worksheet.difficulty = worksheet.sub_skills?.difficulty || 1

    const buffer = await renderToBuffer(
      <WorksheetPDF worksheet={worksheet} isPrint={isPrint} />
    )

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="shinymelon-${worksheet.skill_nodes?.code || 'worksheet'}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}