import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer'
import { brand, buildSkillUrl } from './brand.js'

Font.register({
  family: 'Grandstander',
  src: './public/fonts/Grandstander-Bold.ttf',
})

Font.register({
  family: 'Atkinson',
  fonts: [
    { src: './public/fonts/Atkinson-Regular.ttf' },
    { src: './public/fonts/Atkinson-Bold.ttf', fontWeight: 700 },
  ]
})

const mm = (inches) => inches * 72 // convert inches to PDF points

const makeStyles = (isPrint) => StyleSheet.create({
  page: {
    paddingTop: mm(0.75),
    paddingBottom: mm(0.75),
    paddingLeft: mm(0.75),
    paddingRight: mm(0.75),
    backgroundColor: '#FFFFFF',
    fontFamily: 'Atkinson',
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: isPrint ? '#FFFFFF' : brand.colors.melon,
    borderBottom: isPrint ? `2pt solid ${brand.colors.teal}` : 'none',
    borderRadius: isPrint ? 0 : 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mascot: {
    width: 28,
    height: 28,
  },
  brandName: {
    fontFamily: 'Grandstander',
    fontSize: 16,
    fontWeight: 700,
    color: isPrint ? brand.colors.teal : '#FFFFFF',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerMeta: {
    fontSize: 8,
    color: isPrint ? brand.colors.teal : 'rgba(255,255,255,0.9)',
  },

  // ── Title block ─────────────────────────────────────────────
  titleBlock: {
    marginBottom: 8,
  },
  worksheetTitle: {
    fontFamily: 'Grandstander',
    fontSize: 20,
    fontWeight: 700,
    color: brand.colors.teal,
    marginBottom: 2,
  },
  skillMeta: {
    fontSize: 10,
    color: isPrint ? brand.colors.gray : brand.colors.melon,
    fontWeight: 700,
    marginBottom: 6,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameField: {
    fontSize: 10,
    color: brand.colors.gray,
    borderBottom: `1pt solid ${brand.colors.gray}`,
    width: '45%',
    paddingBottom: 2,
  },

  // ── Instructions ─────────────────────────────────────────────
  instructions: {
    backgroundColor: isPrint ? '#FFFFFF' : brand.colors.melonLight,
    borderLeft: isPrint ? `3pt solid ${brand.colors.teal}` : 'none',
    borderRadius: isPrint ? 0 : 6,
    padding: 8,
    marginBottom: 10,
    fontSize: 12,
    color: brand.colors.gray,
  },
  instructionsBold: {
    fontWeight: 700,
    color: isPrint ? brand.colors.teal : brand.colors.melon,
  },

  // ── Questions grid ───────────────────────────────────────────
  questionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  questionBox: {
    width: '47.5%',
    border: isPrint ? `1pt solid #555` : `1.5pt solid ${brand.colors.melon}`,
    borderRadius: 6,
    padding: 6,
    marginBottom: 4,
  },
  questionNumber: {
    fontFamily: 'Grandstander',
    fontSize: 10,
    fontWeight: 700,
    color: isPrint ? brand.colors.teal : brand.colors.melon,
    marginBottom: 4,
  },
  questionText: {
    fontSize: 11,
    color: brand.colors.gray,
    lineHeight: 1.3,
    marginBottom: 4,
  },
  answerLine: {
    borderBottom: `1pt solid ${isPrint ? '#999' : brand.colors.melon}`,
    marginTop: 2,
    height: 14,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  optionBubble: {
    width: 12,
    height: 12,
    borderRadius: 6,
    border: `1pt solid ${isPrint ? '#555' : brand.colors.melon}`,
  },
  optionText: {
    fontSize: 11,
    color: brand.colors.gray,
  },

  // ── Footer ───────────────────────────────────────────────────
footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `0.5pt solid #ddd`,
    paddingTop: 4,
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },

  // ── Answer key page ──────────────────────────────────────────
  answerKeyTitle: {
    fontFamily: 'Grandstander',
    fontSize: 16,
    fontWeight: 700,
    color: brand.colors.teal,
    marginBottom: 10,
    marginTop: 6,
  },
  answerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  answerItem: {
    width: '22%',
    backgroundColor: isPrint ? '#FFFFFF' : brand.colors.tealLight,
    border: isPrint ? `1pt solid ${brand.colors.teal}` : 'none',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
  },
  answerNumber: {
    fontSize: 9,
    color: brand.colors.teal,
    fontWeight: 700,
    marginBottom: 2,
  },
  answerText: {
    fontSize: 11,
    color: brand.colors.gray,
    textAlign: 'center',
  },
})

export function WorksheetPDF({ worksheet, isPrint = false }) {
  const styles = makeStyles(isPrint)
  const node = worksheet.skill_nodes
  const domain = node?.clusters?.domains
  const skillUrl = worksheet.skill_url || 'shinymelon.com'
  const grade = domain?.grade_id === 'K' ? 'Kindergarten' : `${domain?.grade_id}st Grade`

  const questions = Array.isArray(worksheet.questions)
    ? worksheet.questions
    : JSON.parse(worksheet.questions || '[]')

  const answerKey = Array.isArray(worksheet.answer_key)
    ? worksheet.answer_key
    : JSON.parse(worksheet.answer_key || '[]')

  return (
    <Document>
      {/* ── Worksheet page ── */}
      <Page size="LETTER" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {!isPrint && (
              <Image
                src={brand.logo.mascotUrl}
                style={styles.mascot}
              />
            )}
            {isPrint && (
              <View style={{
                width: 24, height: 24, borderRadius: 12,
                border: `2pt solid ${brand.colors.teal}`,
                alignItems: 'center', justifyContent: 'center'
              }}>
                <Text style={{ fontFamily: 'Grandstander', fontSize: 9, color: brand.colors.teal, fontWeight: 700 }}>SM</Text>
              </View>
            )}
            <Text style={styles.brandName}>ShinyMelon</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerMeta}>{grade} · {domain?.name}</Text>
            <Text style={styles.headerMeta}>{skillUrl}</Text>
          </View>
        </View>

        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.worksheetTitle}>{worksheet.title}</Text>
          <Text style={styles.skillMeta}>
            {node?.cc_standard ? `${node.cc_standard} · ` : ''}
            {['', 'Level 1 — Introduction', 'Level 2 — Practice', 'Level 3 — Challenge'][worksheet.difficulty] || ''}
          </Text>
          <View style={styles.nameRow}>
            <Text style={styles.nameField}>Name: </Text>
            <Text style={styles.nameField}>Date: </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text>
            <Text style={styles.instructionsBold}>Instructions: </Text>
            <Text>{worksheet.instructions}</Text>
          </Text>
        </View>

        {/* Questions */}
        <View style={styles.questionsGrid}>
          {questions.map((q) => (
            <View key={q.number} style={styles.questionBox}>
              <Text style={styles.questionNumber}>Question {q.number}</Text>
              <Text style={styles.questionText}>{q.prompt}</Text>
              {q.type === 'multiple-choice' && q.options ? (
                q.options.map((opt, i) => (
                  <View key={i} style={styles.optionRow}>
                    <View style={styles.optionBubble} />
                    <Text style={styles.optionText}>{opt}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.answerLine} />
              )}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{brand.copyright.text()}</Text>
          <Text style={styles.footerText}>{skillUrl}</Text>
        </View>

      </Page>

      {/* ── Answer key page ── */}
      <Page size="LETTER" style={styles.page} break>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandName}>ShinyMelon</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerMeta}>Answer Key · {worksheet.title}</Text>
          </View>
        </View>

        <Text style={styles.answerKeyTitle}>Answer Key</Text>

        <View style={styles.answerGrid}>
          {answerKey.map((a) => (
            <View key={a.number} style={styles.answerItem}>
              <Text style={styles.answerNumber}>Q{a.number}</Text>
              <Text style={styles.answerText}>{a.answer}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{brand.copyright.text()} · Answer Key</Text>
        </View>
      </Page>
    </Document>
  )
}