'use client'

const DIFFICULTY_LABEL = ['', 'Introduction', 'Practice', 'Challenge']
const DIFFICULTY_COLOR = ['', '#1E8449', '#D4A017', '#E8845A']

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function SubSkillDetailClient({
  skillNode, subSkill, allSubSkills, worksheet,
  prevSubSkill, nextSubSkill, relatedNodes,
  grade, domainCode, skillSlug
}) {
  const domain = skillNode.clusters?.domains
  const gradeLabel = domain?.grade_id === 'K' ? 'Kindergarten' : `${domain?.grade_id}st Grade`
  const questions = worksheet?.questions
    ? (Array.isArray(worksheet.questions) ? worksheet.questions : JSON.parse(worksheet.questions))
    : []

  const skillPageUrl = `/math/${grade}/${domainCode.toLowerCase()}/${skillSlug}`

  function download(print) {
    if (!worksheet) return
    window.open(
      '/api/download-worksheet?id=' + worksheet.id + (print ? '&print=true' : ''),
      '_blank'
    )
  }

  function goToSubSkill(ss) {
    window.location.href = `${skillPageUrl}/${toSlug(ss.name)}`
  }

  return (
    <div style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif', minHeight: '100vh', background: '#FAFAFA' }}>

      {/* Nav */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #F0F0F0',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://tvimmduaznytpjpbwfiw.supabase.co/storage/v1/object/public/assets/watermelon-rays.png"
            style={{ width: '52px', height: '52px', objectFit: 'contain' }}
            alt="ShinyMelon"
          />
          <div>
            <div style={{
              fontFamily: 'Grandstander, cursive',
              fontWeight: '900',
              fontSize: '1.4rem',
              color: '#E8845A',
              lineHeight: '1.1',
            }}>ShinyMelon</div>
            <div style={{
              fontFamily: 'Grandstander, cursive',
              fontSize: '10px',
              color: '#2A7B8C',
              letterSpacing: '0.08em',
              fontWeight: '700',
            }}>for curious minds</div>
          </div>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          style={{ fontSize: '14px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
          Back to worksheets
        </button>
      </nav>

      {/* Breadcrumb */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #F0F0F0',
        padding: '0.6rem 2rem',
        fontSize: '12px',
        color: '#aaa',
      }}>
        <button onClick={() => window.location.href = '/'} style={{ color: '#2A7B8C', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }}>Home</button>
        <span style={{ margin: '0 6px' }}>›</span>
        <span>{gradeLabel}</span>
        <span style={{ margin: '0 6px' }}>›</span>
        <span>{domain?.name}</span>
        <span style={{ margin: '0 6px' }}>›</span>
        <button onClick={() => window.location.href = skillPageUrl} style={{ color: '#2A7B8C', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }}>
          {skillNode.name}
        </button>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#4A4A4A' }}>{subSkill.name}</span>
      </div>

      {/* Page header */}
      <div style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ background: '#FCE8DF', color: '#E8845A', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>
              {gradeLabel}
            </span>
            <span style={{ background: '#D6EEF2', color: '#2A7B8C', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>
              {domain?.name}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              color: DIFFICULTY_COLOR[subSkill.difficulty],
              background: '#F7F7F7',
              padding: '3px 10px',
              borderRadius: '20px',
            }}>
              {DIFFICULTY_LABEL[subSkill.difficulty]}
            </span>
            {skillNode.cc_standard && (
              <span style={{ background: '#F7F7F7', color: '#888', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>
                {skillNode.cc_standard}
              </span>
            )}
          </div>
          <h1 style={{
            fontFamily: 'Grandstander, cursive',
            fontWeight: '900',
            fontSize: '1.8rem',
            color: '#2A7B8C',
            margin: '0 0 0.25rem',
          }}>
            {subSkill.name}
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 1rem' }}>
            {skillNode.name} · {skillNode.clusters?.name}
          </p>

          {/* Prev / Next navigation */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {prevSubSkill && (
              <button
                onClick={() => goToSubSkill(prevSubSkill)}
                style={{
                  background: '#F7F7F7',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  color: '#2A7B8C',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}>
                ← {prevSubSkill.name}
              </button>
            )}
            {nextSubSkill && (
              <button
                onClick={() => goToSubSkill(nextSubSkill)}
                style={{
                  background: '#F7F7F7',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  color: '#2A7B8C',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}>
                {nextSubSkill.name} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>

          {/* Left — full worksheet preview */}
          <div>
            {worksheet ? (
              <div style={{
                background: 'white',
                border: '1.5px solid #F0F0F0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: '1.5rem',
              }}>
                {/* Preview header */}
                <div style={{ background: '#E8845A', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src="https://tvimmduaznytpjpbwfiw.supabase.co/storage/v1/object/public/assets/watermelon-rays.png"
                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                      alt=""
                    />
                    <span style={{ fontFamily: 'Grandstander, cursive', fontWeight: '900', fontSize: '14px', color: 'white' }}>ShinyMelon</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)' }}>{worksheet.skill_url}</span>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <h2 style={{ fontFamily: 'Grandstander, cursive', fontWeight: '800', fontSize: '1.2rem', color: '#2A7B8C', margin: '0 0 4px' }}>
                    {worksheet.title}
                  </h2>
                  <div style={{ fontSize: '11px', color: '#E8845A', fontWeight: '700', marginBottom: '10px' }}>
                    {skillNode.cc_standard} · {DIFFICULTY_LABEL[subSkill.difficulty]}
                  </div>
                  <div style={{ background: '#FCE8DF', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '12px', color: '#4A4A4A', marginBottom: '1rem' }}>
                    <strong>Instructions:</strong> {worksheet.instructions}
                  </div>

                  {/* Show first 2 questions, blur the rest */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {questions.slice(0, 2).map((q) => (
                      <div key={q.number} style={{ border: '1.5px solid #E8845A', borderRadius: '8px', padding: '0.75rem' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#E8845A', marginBottom: '4px' }}>Question {q.number}</div>
                        <div style={{ fontSize: '12px', color: '#333' }}>{q.prompt}</div>
                        {q.options && (
                          <div style={{ marginTop: '6px' }}>
                            {q.options.map((opt, i) => (
                              <div key={i} style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>○ {opt}</div>
                            ))}
                          </div>
                        )}
                        <div style={{ borderTop: '1px solid #eee', marginTop: '8px', paddingTop: '6px', height: '14px' }} />
                      </div>
                    ))}
                  </div>

                  {questions.length > 2 && (
                    <div style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.97) 70%, rgba(255,255,255,1) 100%)',
                      padding: '2rem 1rem 0.5rem',
                      textAlign: 'center',
                      marginTop: '-0.5rem',
                    }}>
                      <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>
                        + {questions.length - 2} more questions in the full worksheet
                      </div>
                      <div style={{ fontSize: '12px', color: '#aaa' }}>
                        Sign up free to download
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa', background: 'white', borderRadius: '16px', border: '1.5px solid #F0F0F0', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍈</div>
                <div style={{ fontFamily: 'Grandstander, cursive', color: '#2A7B8C', marginBottom: '4px' }}>Coming soon</div>
                <div style={{ fontSize: '13px' }}>This worksheet is being generated.</div>
              </div>
            )}

            {/* Other variants in this skill */}
            <div>
              <h3 style={{
                fontFamily: 'Grandstander, cursive',
                fontWeight: '800',
                fontSize: '1rem',
                color: '#2A7B8C',
                margin: '0 0 0.75rem',
              }}>
                Other variants in {skillNode.name}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {allSubSkills.filter(ss => ss.id !== subSkill.id).map(ss => (
                  <button
                    key={ss.id}
                    onClick={() => goToSubSkill(ss)}
                    style={{
                      background: 'white',
                      border: '1.5px solid #F0F0F0',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: DIFFICULTY_COLOR[ss.difficulty], marginBottom: '4px' }}>
                      {DIFFICULTY_LABEL[ss.difficulty]}
                    </div>
                    <div style={{ fontSize: '12px', color: '#333' }}>{ss.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — CTAs */}
          <div style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
            <div style={{
              background: 'white',
              border: '1.5px solid #F0F0F0',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              marginBottom: '1rem',
            }}>
              <div style={{ fontFamily: 'Grandstander, cursive', fontWeight: '800', fontSize: '1rem', color: '#2A7B8C', marginBottom: '0.25rem' }}>
                {worksheet?.title || subSkill.name}
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '1.25rem' }}>
                {DIFFICULTY_LABEL[subSkill.difficulty]} · {skillNode.name}
              </div>

              <button
                onClick={() => download(false)}
                style={{
                  width: '100%',
                  background: '#E8845A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  fontFamily: 'Grandstander, cursive',
                }}>
                Download Worksheet
              </button>
              <button
                onClick={() => download(true)}
                style={{
                  width: '100%',
                  background: 'white',
                  color: '#2A7B8C',
                  border: '2px solid #2A7B8C',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '1.25rem',
                }}>
                Print Version (ink-saving)
              </button>

              <div style={{ borderTop: '1px solid #F0F0F0', marginBottom: '1rem' }} />

              <div style={{ fontSize: '11px', fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                More options
              </div>
              {[
                { icon: '✏️', label: 'Try Interactive Version' },
                { icon: '👤', label: 'Personalize (add name)' },
                { icon: '🎲', label: 'Generate New Version' },
                { icon: '🔖', label: 'Save to Collection' },
              ].map(cta => (
                <button
                  key={cta.label}
                  style={{
                    width: '100%',
                    background: '#F7F7F7',
                    color: '#4A4A4A',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '6px',
                    textAlign: 'left',
                  }}>
                  {cta.icon}  {cta.label}
                </button>
              ))}

              {skillNode.cc_standard && (
                <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#D6EEF2', borderRadius: '10px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: '#2A7B8C', marginBottom: '2px' }}>COMMON CORE</div>
                  <div style={{ fontSize: '12px', color: '#2A7B8C', fontWeight: '700' }}>{skillNode.cc_standard}</div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{skillNode.name}</div>
                </div>
              )}
            </div>

            {/* Related skills */}
            {relatedNodes.length > 0 && (
              <div style={{ background: 'white', border: '1.5px solid #F0F0F0', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  Related skills
                </div>
                {relatedNodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => window.location.href = `/math/${grade}/${domain?.code?.toLowerCase()}/${node.code.toLowerCase().replace(/\./g, '-')}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#2A7B8C',
                      marginBottom: '4px',
                      background: '#F7F7F7',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}>
                    {node.name}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#2A7B8C',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '4rem',
      }}>
        <div style={{ fontFamily: 'Grandstander, cursive', fontWeight: '900', fontSize: '1.2rem', marginBottom: '0.5rem' }}>ShinyMelon</div>
        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '0.25rem' }}>for curious minds</div>
        <div style={{ fontSize: '12px', opacity: 0.6 }}>© {new Date().getFullYear()} ShinyMelon · Free math worksheets for K–8th grade</div>
      </footer>

    </div>
  )
}