'use client'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { PROJECTS } from '@/data'
import { Lock, ExternalLink, Github } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function Icon({ name, size = 52, color }: { name: string; size?: number; color: string }) {
  const C = ((LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.Code) as LucideIcon
  return <C size={size} color={color} />
}

export function Projects() {
  const { t, lang } = useI18n()
  const { ref, inView } = useInView()

  const linkBtn: React.CSSProperties = {
    fontSize: '.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: 8,
    border: '1px solid var(--stroke)', background: 'var(--bg2)',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
    transition: 'border-color .2s, color .2s', cursor: 'pointer',
  }

  return (
    <section id="projects">
      <div className="section-wrap" ref={ref}>
        <div style={{ fontSize:'.75rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
          <span style={{ display:'inline-block', width:20, height:2, background:'var(--accent)', borderRadius:2 }} />
          {t('projects.label')}
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)',
          letterSpacing:'-.03em', color:'var(--txt)', marginBottom:'3rem', lineHeight:1.1 }}>
          {t('projects.title')}
        </h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}
             className={`reveal ${inView ? 'visible' : ''}`}>
          {PROJECTS.map(p => (
            <div key={p.name} style={{
              background:'var(--card)', border:'1px solid var(--stroke)',
              borderRadius:20, overflow:'hidden', transition:'transform .3s, box-shadow .3s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-6px)'; el.style.boxShadow='0 20px 40px rgba(0,0,0,.15)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='none'; el.style.boxShadow='none' }}>

              {/* thumb */}
              <div style={{
                height:160, display:'flex', alignItems:'center', justifyContent:'center',
                background:`${p.color}18`, position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 60%,var(--card))' }} />
                <span style={{ position:'relative', zIndex:1 }}>
                  <Icon name={p.icon} size={52} color={p.color} />
                </span>
              </div>

              {/* body */}
              <div style={{ padding:'1.5rem' }}>
                <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', marginBottom:'.75rem' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize:'.7rem', fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase',
                      padding:'2px 8px', borderRadius:4, background:'var(--bg2)', color:'var(--txt2)',
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'1.2rem',
                  color:'var(--txt)', marginBottom:'.5rem' }}>{p.name}</div>
                <div style={{ fontSize:'.88rem', color:'var(--txt2)', lineHeight:1.6, marginBottom:'1.25rem' }}>
                  {p.desc[lang as Lang]}
                </div>
                <div style={{ display:'flex', gap:'.75rem', alignItems:'center', flexWrap:'wrap' }}>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      style={{ ...linkBtn, color: p.color, borderColor: p.color + '55' }}>
                      <ExternalLink size={12} /> {t('projects.demo')}
                    </a>
                  )}
                  {p.private && (
                    <span style={{ ...linkBtn, color:'var(--txt2)', cursor:'default' }}>
                      <Lock size={12} /> {t('projects.private')}
                    </span>
                  )}
                  {p.repo && !p.private && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer"
                      style={{ ...linkBtn, color:'var(--txt2)' }}>
                      <Github size={12} /> {t('projects.github')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
