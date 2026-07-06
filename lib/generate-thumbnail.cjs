const puppeteer = require('puppeteer')

async function generateThumbnail(worksheet, subSkill, skillNode) {
  const questions = Array.isArray(worksheet.questions)
    ? worksheet.questions
    : JSON.parse(worksheet.questions || '[]')

  const first2 = questions.slice(0, 2)

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Grandstander:wght@700;800;900&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { width: 600px; background: white; font-family: 'Atkinson Hyperlegible', sans-serif; }
      .header { background: #E8845A; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; }
      .brand { font-family: 'Grandstander', cursive; font-weight: 900; font-size: 14px; color: white; }
      .meta { font-size: 9px; color: rgba(255,255,255,0.85); }
      .content { padding: 12px 16px; }
      .title { font-family: 'Grandstander', cursive; font-weight: 800; font-size: 16px; color: #2A7B8C; margin-bottom: 4px; }
      .skill-meta { font-size: 10px; color: #E8845A; font-weight: 700; margin-bottom: 8px; }
      .instructions { background: #FCE8DF; border-radius: 6px; padding: 6px 10px; font-size: 11px; color: #4A4A4A; margin-bottom: 10px; }
      .questions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .question { border: 1.5px solid #E8845A; border-radius: 8px; padding: 8px; }
      .q-number { font-size: 9px; font-weight: 700; color: #E8845A; margin-bottom: 4px; }
      .q-text { font-size: 11px; color: #333; line-height: 1.4; }
      .answer-line { border-top: 1px solid #eee; margin-top: 8px; padding-top: 4px; height: 12px; }
      .footer { padding: 6px 16px; display: flex; justify-content: space-between; border-top: 0.5px solid #eee; margin-top: 8px; }
      .footer-text { font-size: 8px; color: #aaa; }
    </style></head><body>
    <div class="header"><span class="brand">ShinyMelon</span><span class="meta">${worksheet.skill_url || ''}</span></div>
    <div class="content">
      <div class="title">${worksheet.title}</div>
      <div class="skill-meta">${skillNode?.cc_standard || ''}</div>
      <div class="instructions"><strong>Instructions:</strong> ${worksheet.instructions}</div>
      <div class="questions">${first2.map(q => `
        <div class="question">
          <div class="q-number">Question ${q.number}</div>
          <div class="q-text">${q.prompt}</div>
          <div class="answer-line"></div>
        </div>`).join('')}
      </div>
      <div class="footer"><span class="footer-text">© ${new Date().getFullYear()} ShinyMelon</span><span class="footer-text">Name: _______________</span></div>
    </div></body></html>`

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 600, height: 400 },
  })

  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 600, height: 400 } })
  await browser.close()
  return screenshot
}

module.exports = { generateThumbnail }
