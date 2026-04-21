'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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

function ProjectMedia({
  images,
  name,
  icon,
  color,
}: {
  images?: string[]
  name: string
  icon: string
  color: string
}) {
  const [active, setActive] = useState(0)
  const fit = name === 'NASA Farms Navigators' ? 'contain' : 'cover'

  useEffect(() => {
    if (!images || images.length <= 1) return
    const id = window.setInterval(() => {
      setActive(i => (i + 1) % images.length)
    }, 3500)
    return () => window.clearInterval(id)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Icon name={icon} size={52} color={color} />
      </div>
    )
  }

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden' }} aria-label={name}>
      <div
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(active * 100) / images.length}%)`,
          transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {images.map((src, idx) => (
          <div
            key={src}
            style={{
              position:'relative',
              width: `${100 / images.length}%`,
              height:'100%',
              background: fit === 'contain' ? 'var(--bg2)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: fit === 'contain' ? '12px 16px' : 0,
            }}
          >
            <img
              src={src}
              alt={`${name} ${idx + 1}`}
              loading="lazy"
              decoding="async"
              style={{
                width:'100%',
                height:'100%',
                objectFit: fit,
                objectPosition: 'center top',
                display:'block',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,.04) 0%, rgba(0,0,0,.18) 100%)' }} />

      <div style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6, zIndex:2 }}>
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === active ? 18 : 6,
              height: 6,
              borderRadius: 999,
              background: idx === active ? 'var(--accent)' : 'rgba(255,255,255,.55)',
              transition: 'all .25s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  const { t, lang } = useI18n()
  const { ref, inView } = useInView()
  const router = useRouter()

  const linkBtn: React.CSSProperties = {
    fontSize: '.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: 8,
    border: '1px solid var(--stroke)', background: 'var(--bg2)',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
    transition: 'border-color .2s, color .2s', cursor: 'pointer',
  }

  return (
    <section id="projects">
      <div className="section-wrap" ref={ref} style={{ maxWidth: 1500 }}>
        <div style={{ fontSize:'.75rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
          <span style={{ display:'inline-block', width:20, height:2, background:'var(--accent)', borderRadius:2 }} />
          {t('projects.label')}
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)',
          letterSpacing:'-.03em', color:'var(--txt)', marginBottom:'3rem', lineHeight:1.1 }}>
          {t('projects.title')}
        </h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:'1.5rem' }}
             className={`reveal ${inView ? 'visible' : ''}`}>
          {PROJECTS.map(p => (
            <div key={p.name} style={{
              background:'var(--card)', border:'1px solid var(--stroke)',
              borderRadius: 10, overflow:'hidden', transition:'transform .3s, box-shadow .3s',
              cursor:'pointer',
            }}
            role="button"
            tabIndex={0}
            aria-label={`Abrir detalhes de ${p.name}`}
            title="Abrir detalhes"
            onClick={() => router.push(`/projects/${p.slug}`)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                router.push(`/projects/${p.slug}`)
              }
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-6px)'; el.style.boxShadow='0 20px 40px rgba(0,0,0,.15)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='none'; el.style.boxShadow='none' }}>

              {/* thumb */}
              <div style={{
                height:'clamp(220px, 24vw, 300px)', display:'flex', alignItems:'center', justifyContent:'center',
                background:`${p.color}18`, position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 60%,var(--card))' }} />
                <ProjectMedia images={p.images} name={p.name} icon={p.icon} color={p.color} />
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
                      onClick={e => e.stopPropagation()}
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
                      onClick={e => e.stopPropagation()}
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
      <style>{`
        @media (max-width: 1100px) {
          #projects > .section-wrap > div:last-child {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 720px) {
          #projects > .section-wrap > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
