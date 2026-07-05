'use client'
import Nav from './Nav'
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

      <Nav />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #E8845A 0%, #d4693d 100%)',
        padding: '2rem 2rem 2.5rem',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}>
          <img
            src="https://tvimmduaznytpjpbwfiw.supabase.co/storage/v1/object/public/assets/watermelon-rays.png"
            style={{ width: '70px', height: '70px', objectFit: 'contain', flexShrink: 0 }}
            alt="ShinyMelon mascot"
          />
          <h1 style={{
            fontFamily: 'Grandstander, cursive',
            fontWeight: '900',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
            color: 'white',
            margin: 0,
            lineHeight: '1.1',
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}>
            Math Worksheets Kids Love
          </h1>
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.05rem',
          maxWidth: '520px',
          margin: '-0.25rem auto 1.5rem',
          lineHeight: '1.6',
        }}>
          Printable math worksheets for K–8th grade. Aligned to Common Core.
          Designed to keep kids interested in learning for life.
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
              We are adding worksheets for this grade. Check back soon.
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
        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '0.25rem' }}>
          for curious minds
        </div>
        <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '0.5rem' }}>
          Learn · Grow · Explore
        </div>
        <div style={{ fontSize: '12px', opacity: 0.6 }}>
          © {new Date().getFullYear()} ShinyMelon · Free math worksheets for K–8th grade
        </div>
      </footer>

    </div>
  )
}