'use client'
import { useI18n } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { School, FolderGit2, Languages, Infinity as Inf } from 'lucide-react'

const STATS = [
  { num: '42',  key: 'about.stat1', Icon: School },
  { num: '10+', key: 'about.stat2', Icon: FolderGit2 },
  { num: '3',   key: 'about.stat3', Icon: Languages },
  { num: '∞',   key: 'about.stat4', Icon: Inf },
]

const card: React.CSSProperties = {
  background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 16,
  padding: '1.5rem', transition: 'background .2s, transform .2s',
}

export function About() {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  return (
    <section id="about">
      <div className="section-wrap" ref={ref}>
        <div style={{ fontSize:'.75rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
          <span style={{ display:'inline-block', width:20, height:2, background:'var(--accent)', borderRadius:2 }} />
          {t('about.label')}
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)',
          letterSpacing:'-.03em', color:'var(--txt)', marginBottom:'3rem', lineHeight:1.1 }}>
          {t('about.title')}
        </h2>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}
             className={`reveal ${inView ? 'visible' : ''} about-grid`}>
          {/* text */}
          <div>
            {['about.p1','about.p2','about.p3'].map(k => (
              <p key={k} style={{ color:'var(--txt2)', lineHeight:1.8, marginBottom:'1rem' }}>{t(k)}</p>
            ))}
          </div>
          {/* stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}
               className={`reveal rd1 ${inView ? 'visible' : ''}`}>
            {STATS.map(({ num, key, Icon }) => (
              <div key={key} style={card}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card2)'; el.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card)'; el.style.transform='none' }}>
                <Icon size={18} style={{ color:'var(--accent)', marginBottom:8 }} />
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'2rem',
                  color:'var(--accent)', lineHeight:1, marginBottom:4 }}>{num}</div>
                <div style={{ fontSize:'.82rem', color:'var(--txt2)' }}>{t(key)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.about-grid{ } @media(max-width:768px){ .about-grid{ grid-template-columns:1fr !important; gap:2rem !important; } }`}</style>
    </section>
  )
}
