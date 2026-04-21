'use client'
import { useI18n } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { CONFIG } from '@/data'
import { Mail, Linkedin, Github } from 'lucide-react'

export function Contact() {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  const socials = [
    { Icon: Github,   label: 'GitHub',   text: 'ShelbyEbo',       href: CONFIG.github },
    { Icon: Linkedin, label: 'LinkedIn', text: 'Orisa Melzira Ebo',  href: CONFIG.linkedin },
    { Icon: Mail,     label: 'Email',    text: CONFIG.email,                  href: `mailto:${CONFIG.email}` },
  ]

  return (
    <section id="contact">
      <div className="section-wrap" ref={ref}>
        <div style={{ fontSize:'.75rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:'.75rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
          <span style={{ display:'inline-block', width:20, height:2, background:'var(--accent)', borderRadius:2 }} />
          {t('contact.label')}
        </div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)',
          letterSpacing:'-.03em', color:'var(--txt)', marginBottom:'3rem', lineHeight:1.1 }}>
          {t('contact.title')}
        </h2>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}
             className="contact-grid">

          {/* info */}
          <div className={`reveal ${inView ? 'visible' : ''}`}>
            <p style={{ color:'var(--txt2)', lineHeight:1.8, marginBottom:'2rem' }}>{t('contact.desc')}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
              {socials.map(({ Icon, label, text, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  display:'flex', alignItems:'center', gap:'.75rem',
                  padding:'.75rem 1rem', borderRadius:12, border:'1px solid var(--stroke)',
                  color:'var(--txt)', textDecoration:'none', fontSize:'.9rem', fontWeight:500,
                  transition:'background .2s, border-color .2s, transform .2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card)'; el.style.borderColor='var(--accent)'; el.style.transform='translateX(4px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderColor='var(--stroke)'; el.style.transform='none' }}>
                  <Icon size={18} style={{ color:'var(--accent)', flexShrink:0 }} />
                  <div>
                    <div style={{ fontWeight:600 }}>{text}</div>
                    <div style={{ fontSize:'.78rem', color:'var(--txt2)' }}>{label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .contact-grid{ grid-template-columns:1fr !important; gap:2rem !important; } }`}</style>
    </section>
  )
}
