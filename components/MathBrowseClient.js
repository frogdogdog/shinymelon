'use client'
import { useState } from 'react'
import Nav from './Nav'

export default function MathBrowseClient({ grades, domains, countMap }) {
  const [selectedGrade, setSelectedGrade] = useState('K')
  const [selectedDomainId, setSelectedDomainId] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [hasWorksheetsOnly, setHasWorksheetsOnly] = useState(false)

  const gradeDomains = domains
    .filter(d => d.grade_id === selectedGrade)
    .sort((a, b) => a.sort_order - b.sort_order)

  const activeDomains = selectedDomainId
    ? gradeDomains.filter(d => d.id === selectedDomainId)
    : gradeDomains

  const totalWorksheets = gradeDomains.reduce((acc, d) =>
    acc + (d.clusters || []).reduce((acc2, c) =>
      acc2 + (c.skill_nodes || []).reduce((acc3, sn) =>
        acc3 + (countMap[sn.id] || 0), 0), 0), 0)

  function getSkillSlug(code) {
    const parts = code.split('.')
    return parts.map((p, i) => i < parts.length - 1 ? p.toLowerCase() : p).join('-')
  }

  function getDomainCount(domain) {
    return (domain.clusters || []).reduce((acc, c) =>
      acc + (c.skill_nodes || []).reduce((acc2, sn) =>
        acc2 + (countMap[sn.id] || 0), 0), 0)
  }

  function nodeMatchesFilters(node) {
    if (hasWorksheetsOnly && (countMap[node.id] || 0) === 0) return false
    return true
  }

  return (
    <div style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif', minHeight: '100vh', background: '#FAFAFA' }}>
      <Nav />

      <div style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '0.6rem 2rem', fontSize: '12px', color: '#aaa' }}>
        <button onClick={() => window.location.href = '/'} style={{ color: '#2A7B8C', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }}>Home</button>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#4A4A4A' }}>Math</span>
      </div>

      <div style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Grandstander, cursive', fontWeight: '900', fontSize: '1.8rem', color: '#2A7B8C', margin: '0 0 1rem' }}>
            Math Worksheets
          </h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {grades.map(g => (
              <button
                key={g.id}
                onClick={() => { setSelectedGrade(g.id); setSelectedDomainId(null) }}
                style={{
                  background: selectedGrade === g.id ? '#E8845A' : 'white',
                  color: selectedGrade === g.id ? 'white' : '#666',
                  border: selectedGrade === g.id ? '2px solid #E8845A' : '2px solid #E0E0E0',
                  borderRadius: '50px',
                  padding: '6px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'Grandstander, cursive',
                }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.5rem' }}>

        {/* Left sidebar */}
        <div style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
          <div style={{ background: 'white', border: '1.5px solid #F0F0F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>

            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Grandstander, cursive', fontWeight: '800', fontSize: '0.85rem', color: '#2A7B8C' }}>
                {grades.find(g => g.id === selectedGrade)?.label}
              </span>
              <span style={{ fontSize: '11px', color: '#aaa' }}>{totalWorksheets} worksheets</span>
            </div>

            {/* Domain filters */}
            <div style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ padding: '0.5rem 1rem 0.25rem', fontSize: '10px', fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Domain
              </div>
              <button
                onClick={() => setSelectedDomainId(null)}
                style={{
                  width: '100%', padding: '0.5rem 1rem', textAlign: 'left',
                  background: selectedDomainId === null ? '#FCE8DF' : 'white',
                  border: 'none', borderBottom: '1px solid #F8F8F8', cursor: 'pointer',
                  fontSize: '12px', fontWeight: selectedDomainId === null ? '700' : '400',
                  color: selectedDomainId === null ? '#E8845A' : '#4A4A4A',
                }}>
                All Domains
              </button>
              {gradeDomains.map(domain => {
                const count = getDomainCount(domain)
                const isSelected = selectedDomainId === domain.id
                return (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomainId(isSelected ? null : domain.id)}
                    style={{
                      width: '100%', padding: '0.5rem 1rem', textAlign: 'left',
                      background: isSelected ? '#FCE8DF' : 'white',
                      border: 'none', borderBottom: '1px solid #F8F8F8', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px',
                    }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: isSelected ? '#E8845A' : '#aaa', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1px' }}>
                        {domain.code}
                      </div>
                      <div style={{ fontSize: '12px', color: isSelected ? '#C0633A' : '#4A4A4A', fontWeight: isSelected ? '700' : '400', lineHeight: '1.3' }}>
                        {domain.name}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: count > 0 ? '#1E8449' : '#ccc', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {count > 0 ? count : '—'}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Difficulty filter */}
            <div style={{ borderBottom: '1px solid #F0F0F0', padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                Difficulty
              </div>
              {[
                { value: null, label: 'All Levels', color: '#888' },
                { value: 1, label: 'Introduction', color: '#1E8449' },
                { value: 2, label: 'Practice', color: '#D4A017' },
                { value: 3, label: 'Challenge', color: '#E8845A' },
              ].map(d => (
                <button
                  key={String(d.value)}
                  onClick={() => setSelectedDifficulty(d.value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    width: '100%', padding: '4px 0', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '12px', marginBottom: '2px',
                    color: selectedDifficulty === d.value ? d.color : '#666',
                    fontWeight: selectedDifficulty === d.value ? '700' : '400',
                  }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: selectedDifficulty === d.value ? d.color : '#ddd',
                    flexShrink: 0,
                  }} />
                  {d.label}
                </button>
              ))}
            </div>

            {/* Available only toggle */}
            <div style={{ padding: '0.75rem 1rem' }}>
              <button
                onClick={() => setHasWorksheetsOnly(!hasWorksheetsOnly)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: '12px', color: '#4A4A4A', fontWeight: hasWorksheetsOnly ? '700' : '400',
                }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '4px',
                  border: '1.5px solid #2A7B8C',
                  background: hasWorksheetsOnly ? '#2A7B8C' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {hasWorksheetsOnly && <span style={{ color: 'white', fontSize: '10px', fontWeight: '900' }}>✓</span>}
                </div>
                Available only
              </button>
            </div>

          </div>
        </div>

        {/* Right content */}
        <div>
          {activeDomains.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍈</div>
              <div style={{ fontFamily: 'Grandstander, cursive', fontSize: '1.2rem', color: '#2A7B8C', marginBottom: '0.5rem' }}>Coming soon!</div>
              <div style={{ fontSize: '14px' }}>We are adding worksheets for this grade.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activeDomains.map(domain => (
                <div key={domain.id} style={{
                  background: 'white', border: '1.5px solid #F0F0F0',
                  borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    background: '#FCE8DF', padding: '0.85rem 1.25rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '1px solid #F0E0D6',
                  }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#E8845A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                        {domain.code}
                      </div>
                      <h2 style={{ fontFamily: 'Grandstander, cursive', fontWeight: '800', fontSize: '1rem', color: '#2A7B8C', margin: 0 }}>
                        {domain.name}
                      </h2>
                    </div>
                    <span style={{ fontSize: '12px', color: '#E8845A', fontWeight: '700' }}>
                      {getDomainCount(domain)} worksheets
                    </span>
                  </div>

                  <div style={{ padding: '1rem 1.25rem' }}>
                    {(domain.clusters || []).sort((a, b) => a.sort_order - b.sort_order).map(cluster => {
                      const filteredNodes = (cluster.skill_nodes || [])
                        .sort((a, b) => a.sort_order - b.sort_order)
                        .filter(nodeMatchesFilters)
                      if (filteredNodes.length === 0) return null
                      return (
                        <div key={cluster.id} style={{ marginBottom: '1.25rem' }}>
                          <div style={{
                            fontSize: '11px', fontWeight: '700', color: '#2A7B8C',
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                            marginBottom: '0.5rem', paddingBottom: '0.4rem',
                            borderBottom: '1px solid #F0F0F0',
                          }}>
                            {cluster.name}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {filteredNodes.map(node => {
                              const count = countMap[node.id] || 0
                              const slug = getSkillSlug(node.code)
                              return (
                                <button
                                  key={node.id}
                                  onClick={() => count > 0 && (window.location.href = `/math/${selectedGrade.toLowerCase()}/${domain.code.toLowerCase()}/${slug}`)}
                                  style={{
                                    background: count > 0 ? '#F7FCFD' : '#FAFAFA',
                                    border: count > 0 ? '1.5px solid #D6EEF2' : '1.5px solid #F0F0F0',
                                    borderRadius: '10px', padding: '0.65rem 0.85rem',
                                    textAlign: 'left', cursor: count > 0 ? 'pointer' : 'default',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px',
                                  }}>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: count > 0 ? '#2A7B8C' : '#bbb', marginBottom: '1px' }}>
                                      {node.name}
                                    </div>
                                    {node.cc_standard && (
                                      <div style={{ fontSize: '10px', color: '#aaa' }}>{node.cc_standard}</div>
                                    )}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    {count > 0 ? (
                                      <>
                                        <span style={{ fontSize: '11px', color: '#1E8449', fontWeight: '700' }}>{count} ✓</span>
                                        <span style={{
                                          background: '#E8845A', color: 'white', fontSize: '11px',
                                          fontWeight: '700', padding: '3px 10px', borderRadius: '20px',
                                          fontFamily: 'Grandstander, cursive',
                                        }}>View →</span>
                                      </>
                                    ) : (
                                      <span style={{ fontSize: '11px', color: '#ccc' }}>Soon</span>
                                    )}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer style={{ background: '#2A7B8C', color: 'white', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
        <div style={{ fontFamily: 'Grandstander, cursive', fontWeight: '900', fontSize: '1.2rem', marginBottom: '0.5rem' }}>ShinyMelon</div>
        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '0.25rem' }}>for curious minds</div>
        <div style={{ fontSize: '12px', opacity: 0.6 }}>© {new Date().getFullYear()} ShinyMelon · Free worksheets for K–8th grade</div>
      </footer>
    </div>
  )
}
