'use client'

export default function WorksheetCard({ worksheet }) {
  function download(print) {
    window.open(
      '/api/download-worksheet?id=' + worksheet.id + (print ? '&print=true' : ''),
      '_blank'
    )
  }

  const node = worksheet.skill_nodes
  const domain = node?.clusters?.domains

  function goToDetail() {
    if (domain?.grade_id && domain?.code && node?.code) {
      const parts = node.code.split('.')
      const slug = parts.map((p, i) => i < parts.length - 1 ? p.toLowerCase() : p).join('-')
      window.location.href = `/math/${domain.grade_id.toLowerCase()}/${domain.code.toLowerCase()}/${slug}`
    }
  }

  return (
    <div
      onClick={goToDetail}
      style={{
        background: 'white',
        border: '1.5px solid #F0F0F0',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
      }}>

      {/* Thumbnail */}
      {worksheet.thumbnail_url ? (
        <img
          src={worksheet.thumbnail_url}
          alt={worksheet.title}
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'cover',
            objectPosition: 'top',
            borderBottom: '1px solid #F0F0F0',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '160px',
          background: '#FCE8DF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #F0F0F0',
        }}>
          <span style={{ fontSize: '2rem' }}>🍈</span>
        </div>
      )}

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            background: '#FCE8DF',
            color: '#E8845A',
            fontSize: '11px',
            fontWeight: '700',
            padding: '3px 10px',
            borderRadius: '20px',
          }}>
            {domain?.grade_id === 'K' ? 'Kindergarten' : `${domain?.grade_id}st Grade`}
          </span>
          {node?.cc_standard && (
            <span style={{ fontSize: '10px', color: '#aaa' }}>{node.cc_standard}</span>
          )}
        </div>

        <div>
          <div style={{
            fontFamily: 'Grandstander, cursive',
            fontWeight: '700',
            fontSize: '0.95rem',
            color: '#2A7B8C',
            lineHeight: '1.3',
            marginBottom: '4px',
          }}>
            {worksheet.title}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>{node?.name}</div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '0.5rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); download(false) }}
            style={{
              flex: 1,
              background: '#E8845A',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 0',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
            }}>
            Download
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); download(true) }}
            style={{
              flex: 1,
              background: 'white',
              color: '#2A7B8C',
              border: '1.5px solid #2A7B8C',
              borderRadius: '8px',
              padding: '8px 0',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
            }}>
            Print
          </button>
        </div>
      </div>
    </div>
  )
}