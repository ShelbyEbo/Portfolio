'use client'
import { useI18n } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { SKILL_GROUPS } from '@/data'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function Icon({ name, size = 52, color }: { name: string; size?: number; color: string }) {
  const C = ((LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.Code) as LucideIcon
  return <C size={size} color={color} />
}

export function Skills() {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  return (
    <section id="skills">
      <div className="section-wrap" ref={ref}>
        <div style={{ fontSize:'.75rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
          <span style={{ display:'inline-block', width:20, height:2, background:'var(--accent)', borderRadius:2 }} />
          {t('skills.label')}
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)',
          letterSpacing:'-.03em', color:'var(--txt)', marginBottom:'3rem', lineHeight:1.1 }}>
          {t('skills.title')}
        </h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}>
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.label}
              className={`reveal ${i===1?'rd1':i===2?'rd2':i===3?'rd3':''} ${inView?'visible':''}`}
              style={{ background:'var(--card)', border:'1px solid var(--stroke)', borderRadius:20,
                padding:'1.75rem', transition:'background .2s, transform .2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card2)'; el.style.transform='translateY(-3px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card)'; el.style.transform='none' }}>

              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'.9rem',
                color:'var(--txt)', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:g.color, display:'inline-block' }} />
                <Icon name={g.icon} size={15} color={g.color} />
                {t(g.label)}
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                {g.skills.map(s => (
                  <span key={s} style={{
                    padding:'4px 12px', borderRadius:100, fontSize:'.78rem', fontWeight:500,
                    border:'1px solid var(--stroke)', color:'var(--txt2)',
                    transition:'border-color .2s, color .2s', cursor:'default',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--accent)'; el.style.color='var(--accent)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--stroke)'; el.style.color='var(--txt2)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
