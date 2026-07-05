'use client'
import { useState } from 'react'
import Nav from './Nav'

export default function MathBrowseClient({ grades, domains, countMap }) {
  const [selectedGrade, setSelectedGrade] = useState('K')

  const gradeDomains = domains.filter(d => d.grade_id === selectedGrade)
  const totalWorksheets = gradeDomains.reduce((acc, d) => {
    return acc + (d.clusters || []).reduce((acc2, c) => {
      return acc2 + (c.skill_nodes || []).reduce((acc3, sn) => {
        return acc3 + (countMap[sn.id] || 0)
      }, 0)
    }, 0)
  }, 0)

  function getSkillSlug(code) {
    const parts = code.split('.')
    return parts.map((p, i) => i < parts.length - 1 ? p.toLowerCase() : p).join('-')
  }

  function getDomainWorksheetCount(domain) {
    return (domain.clusters || []).reduce((acc, c) => {
      return acc + (c.skill_nodes || []).reduce((acc2, sn) => {
        return acc2 + (countMap[sn.id] || 0)
      }, 0)
    }, 0)
  }

  return (
    <div style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif', minHeight: '100vh', background: '#FAFAFA' }}>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '0.6rem 2rem', fontSize: '12px', color: '#aaa' }}>
        <button onClick={() => window.location.href = '/'} style={{ color: '#2A7B8C', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }}>Home</button>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#4A4A4A' }}>Math</span>
      </div>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'Grandstander, cursive',
            fontWeight: '900',
            fontSize: '2rem',
            color: '#2A7B8C',
            margin: '0 0 0.5rem',
          }}>
            Math Worksheets
          </h1>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 1.5rem' }}>
            Browse by grade and topic. {totalWorksheets} worksheets available for {grades.find(g => g.id === selectedGrade)?.label}.
          </p>

          {/* Grade tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {grades.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGrade(g.id)}
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

      {/* Domain grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {gradeDomains.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍈</div>
            <div style={{ fontFamily: 'Grandstander, cursive', fontSize: '1.2rem', color: '#2A7B8C', marginBottom: '0.5rem' }}>Coming soon!</div>
            <div style={{ fontSize: '14px' }}>We are adding worksheets for this grade.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {gradeDomains.map(domain => {
              const domainCount = getDomainWorksheetCount(domain)
              return (
                <div key={domain.id} style={{
                  background: 'white',
                  border: '1.5px solid #F0F0F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  {/* Domain header */}
                  <div style={{
                    background: '#FCE8DF',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #F0E0D6',
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#E8845A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                        {domain.code}
                      </div>
                      <h2 style={{
                        fontFamily: 'Grandstander, cursive',
                        fontWeight: '800',
                        fontSize: '1.1rem',
                        color: '#2A7B8C',
                        margin: 0,
                      }}>
                        {domain.name}
                      </h2>
                    </div>
                    <span style={{ fontSize: '12px', color: '#E8845A', fontWeight: '700' }}>
                      {domainCount} worksheet{domainCount !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Clusters and skills */}
                  <div style={{ padding: '1rem 1.5rem' }}>
                    {(domain.clusters || []).sort((a, b) => a.sort_order - b.sort_order).map(cluster => (
                      <div key={cluster.id} style={{ marginBottom: '1.25rem' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                          {cluster.name}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '6px' }}>
                          {(cluster.skill_nodes || []).sort((a, b) => a.sort_order - b.sort_order).map(node => {
                            const count = countMap[node.id] || 0
                            const slug = getSkillSlug(node.code)
                            return (
                              <button
                                key={node.id}
                                onClick={() => window.location.href = `/math/${selectedGrade.toLowerCase()}/${domain.code.toLowerCase()}/${slug}`}
                                style={{
                                  background: count > 0 ? '#F7FCFD' : '#FAFAFA',
                                  border: count > 0 ? '1.5px solid #D6EEF2' : '1.5px solid #F0F0F0',
                                  borderRadius: '10px',
                                  padding: '0.75rem',
                                  textAlign: 'left',
                                  cursor: count > 0 ? 'pointer' : 'default',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}>
                                <div>
                                  <div style={{ fontSize: '12px', fontWeight: '600', color: count > 0 ? '#2A7B8C' : '#aaa', marginBottom: '2px' }}>
                                    {node.name}
                                  </div>
                                  {node.cc_standard && (
                                    <div style={{ fontSize: '10px', color: '#aaa' }}>{node.cc_standard}</div>
                                  )}
                                </div>
                                <span style={{
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  color: count > 0 ? '#1E8449' : '#ccc',
                                  whiteSpace: 'nowrap',
                                  flexShrink: 0,
                                }}>
                                  {count > 0 ? `${count} ✓` : 'Soon'}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
        <div style={{ fontSize: '12px', opacity: 0.6 }}>© {new Date().getFullYear()} ShinyMelon · Free worksheets for K–8th grade</div>
      </footer>

    </div>
  )
}