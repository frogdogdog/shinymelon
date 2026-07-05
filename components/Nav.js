'use client'

export default function Nav() {
  return (
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
      <button
        onClick={() => window.location.href = '/'}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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
      </button>
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '14px', color: '#666' }}>
        <button onClick={() => window.location.href = '/math'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#666' }}>Worksheets</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#666' }}>For Teachers</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#666' }}>About</button>
        <button style={{ background: '#E8845A', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Grandstander, cursive' }}>Sign Up Free</button>
      </div>
    </nav>
  )
}