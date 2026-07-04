'use client'

export default function WorksheetCard({ worksheet }) {
  function download(print) {
    window.open(
      '/api/download-worksheet?id=' + worksheet.id + (print ? '&print=true' : ''),
      '_blank'
    )
  }

  return (
    <div style={{
      background: 'white',
      border: '1.5px solid #F0F0F0',
      borderRadius: '16px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          background: '#FCE8DF',
          color: '#E8845A',
          fontSize: '11px',
          fontWeight: '700',
          padding: '3px 10px',
          borderRadius: '20px',
        }}>
          {worksheet.skill_nodes?.clusters?.domains?.grade_id === 'K' ? 'Kindergarten' : '1st Grade'}
        </span>
        {worksheet.skill_nodes?.cc_standard && (
          <span style={{ fontSize: '10px', color: '#aaa' }}>
            {worksheet.skill_nodes.cc_standard}
          </span>
        )}
      </div>

      <div>
        <div style={{
          fontFamily: 'Grandstander, cursive',
          fontWeight: '700',
          fontSize: '1rem',
          color: '#2A7B8C',
          lineHeight: '1.3',
          marginBottom: '4px',
        }}>
          {worksheet.title}
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>
          {worksheet.skill_nodes?.name}
        </div>
        <div style={{ fontSize: '11px', color: '#bbb', marginTop: '2px' }}>
          {worksheet.sub_skills?.name}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button
          onClick={() => download(false)}
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
          onClick={() => download(true)}
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
          Print Version
        </button>
      </div>
    </div>
  )
}