'use client'
import { useState } from 'react'

export default function TestPipeline() {
  const [subSkillId, setSubSkillId] = useState('')
  const [worksheet, setWorksheet] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generate() {
    setLoading(true)
    setError(null)
    setWorksheet(null)
    try {
      const res = await fetch('/api/generate-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sub_skill_id: subSkillId }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setWorksheet(data.worksheet)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function openPdf(print) {
    window.open('/api/download-worksheet?id=' + worksheet.id + (print ? '&print=true' : ''), '_blank')
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#E8845A' }}>ShinyMelon — Worksheet Pipeline Test</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2A7B8C', fontWeight: 'bold' }}>
          Sub-skill ID (paste from Supabase)
        </label>
        <input
          value={subSkillId}
          onChange={function(e) { setSubSkillId(e.target.value) }}
          placeholder="paste sub-skill id here"
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', borderRadius: '8px', border: '2px solid #2A7B8C' }}
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !subSkillId}
        style={{ background: loading ? '#ccc' : '#E8845A', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
      >
        {loading ? 'Generating...' : 'Generate Worksheet'}
      </button>

      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fee', borderRadius: '8px', color: 'red' }}>
          Error: {error}
        </div>
      )}

      {worksheet && (
        <div style={{ marginTop: '2rem', border: '2px solid #E8845A', borderRadius: '12px', padding: '1.5rem' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: '#E8845A', fontWeight: 'bold', fontSize: '0.85rem' }}>ShinyMelon</div>
              <h2 style={{ color: '#2A7B8C', margin: '0.25rem 0' }}>{worksheet.title}</h2>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>{worksheet.grade} · {worksheet.skill}</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Sub-skill: {worksheet.sub_skill}</div>
              {worksheet.cc_standard && (
                <div style={{ color: '#888', fontSize: '0.85rem' }}>CC: {worksheet.cc_standard}</div>
              )}
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#aaa' }}>
              <div>Copyright {worksheet.copyright_year} ShinyMelon</div>
              <div>{worksheet.skill_url}</div>
            </div>
          </div>

          <div style={{ margin: '1rem 0', padding: '0.75rem', background: '#FCE8DF', borderRadius: '8px' }}>
            <strong>Instructions:</strong> {worksheet.instructions}
          </div>

          <div>
            {worksheet.questions.map(function(q) {
              return (
                <div key={q.number} style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f9f9f9', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: '#2A7B8C' }}>Question {q.number}</div>
                  <div style={{ margin: '0.25rem 0' }}>{q.prompt}</div>
                  {q.options && (
                    <div style={{ marginTop: '0.5rem' }}>
                      {q.options.map(function(opt, i) {
                        return <div key={i} style={{ marginLeft: '1rem' }}>o {opt}</div>
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#D6EEF2', borderRadius: '8px' }}>
            <strong style={{ color: '#2A7B8C' }}>Answer Key</strong>
            <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {worksheet.answer_key.map(function(a) {
                return (
                  <div key={a.number} style={{ fontSize: '0.9rem' }}>
                    <strong>{a.number}.</strong> {a.answer}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={function() { openPdf(false) }}
              style={{ background: '#E8845A', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            >
              Download Screen Version
            </button>
            <button
              onClick={function() { openPdf(true) }}
              style={{ background: '#2A7B8C', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            >
              Download Print Version
            </button>
          </div>

        </div>
      )}

    </main>
  )
}