import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data: grades } = await supabase
    .from('grades')
    .select('*')
    .order('sort_order')

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#E8845A', fontSize: '2.5rem' }}>🍈 ShinyMelon</h1>
      <p style={{ color: '#4A4A4A', fontSize: '1.1rem' }}>
        Fun learning for curious kids — PK through 8th grade.
      </p>
      <h2 style={{ color: '#2A7B8C', marginTop: '2rem' }}>Select a Grade</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
        {grades.map(grade => (
          <div key={grade.id} style={{
            background: '#FCE8DF',
            border: '2px solid #E8845A',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#E8845A',
            fontSize: '1rem'
          }}>
            {grade.label}
          </div>
        ))}
      </div>
    </main>
  )
}