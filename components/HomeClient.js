'use client'
import { useState } from 'react'
import WorksheetCard from './WorksheetCard'

const GRADES = [
  { id: 'K', label: 'Kindergarten' },
  { id: '1', label: '1st Grade' },
  { id: '2', label: '2nd Grade' },
  { id: '3', label: '3rd Grade' },
  { id: '4', label: '4th Grade' },
  { id: '5', label: '5th Grade' },
  { id: '6', label: '6th Grade' },
  { id: '7', label: '7th Grade' },
  { id: '8', label: '8th Grade' },
]

export default function HomeClient({ worksheets }) {
  const [selectedGrade, setSelectedGrade] = useState('K')

  const filtered = worksheets.filter(w =>
    w.skill_nodes?.clusters?.domains?.grade_id === selectedGrade
  )

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
            style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            alt="ShinyMelon"
          />
          <span style={{
            fontFamily: 'Grandstander, cursive',
            fontWeight: '900',
            fontSize: '1.4rem',
            color: '#E8845A',
          }}>ShinyMelon</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '14px', color: '#666' }}>
          <span style={{ cursor: 'pointer' }}>Worksheets</span>
          <span style={{ cursor: 'pointer' }}>For Teachers</span>
          <span style={{ cursor: 'pointer' }}>About</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #E8845A 0%, #d4693d 100%)',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
      }}>
        <img
          src="https://tvimmduaznytpjpbwfiw.supabase.co/storage/v1/object/public/assets/watermelon-rays.png"
          style={{ width: '90px', height: '90px', objectFit: 'contain', marginBottom: '1rem' }}
          alt="ShinyMelon mascot"
        />
        <h1 style={{
          fontFamily: 'Grandstander, cursive',
          fontWeight: '900',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'white',
          margin: '0 0 0.75rem',
          lineHeight: '1.1',
        }}>
          Math Worksheets Kids Love
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.1rem',
          maxWidth: '520px',
          margin: '0 auto 2rem',
          lineHeight: '1.6',
        }}>
          Free printable math worksheets for PK–8th grade. Aligned to Common Core.
          Designed for easy reading. No login required.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          {GRADES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGrade(g.id)}
              style={{
                background: selectedGrade === g.id ? 'white' : 'rgba(255,255,255,0.2)',
                color: selectedGrade === g.id ? '#E8845A' : 'white',
                border: '2px solid',
                borderColor: selectedGrade === g.id ? 'white' : 'rgba(255,255,255,0.4)',
                borderRadius: '50px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'Grandstander, cursive',
                transition: 'all 0.15s',
              }}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Worksheets section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{
            fontFamily: 'Grandstander, cursive',
            fontWeight: '800',
            fontSize: '1.4rem',
            color: '#2A7B8C',
            margin: 0,
          }}>
            {GRADES.find(g => g.id === selectedGrade)?.label} Worksheets
          </h2>
          <span style={{ fontSize: '13px', color: '#aaa' }}>
            {filtered.length} available
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#aaa',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍈</div>
            <div style={{ fontFamily: 'Grandstander, cursive', fontSize: '1.2rem', color: '#2A7B8C', marginBottom: '0.5rem' }}>
              Coming soon!
            </div>
            <div style={{ fontSize: '14px' }}>
              We're adding worksheets for this grade. Check back soon.
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {filtered.map(w => (
              <WorksheetCard key={w.id} worksheet={w} />
            ))}
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
        <div style={{
          fontFamily: 'Grandstander, cursive',
          fontWeight: '900',
          fontSize: '1.2rem',
          marginBottom: '0.5rem',
        }}>
          ShinyMelon
        </div>
        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '0.5rem' }}>
          Learn · Grow · Explore
        </div>
        <div style={{ fontSize: '12px', opacity: 0.6 }}>
          © {new Date().getFullYear()} ShinyMelon · Free math worksheets for PK–8th grade
        </div>
      </footer>

    </div>
  )
}