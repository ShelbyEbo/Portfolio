'use client'
import { useEffect, useState } from 'react'
import { useI18n } from '@/hooks/useI18n'
import { CONFIG } from '@/data'
import { ArrowRight, MessageCircle } from 'lucide-react'

export function Hero() {
  const { t, lang, roles } = useI18n()

  /* typewriter */
  const [displayed, setDisplayed] = useState('')
  const [rIdx, setRIdx]           = useState(0)
  const [cIdx, setCIdx]           = useState(0)
  const [del,  setDel]            = useState(false)

  useEffect(() => { setDisplayed(''); setRIdx(0); setCIdx(0); setDel(false) }, [lang])

  useEffect(() => {
    const list = roles()
    const cur  = list[rIdx]
    let tm: ReturnType<typeof setTimeout>
    if (!del) {
      if (cIdx < cur.length) tm = setTimeout(() => setCIdx(i => i + 1), 75)
      else tm = setTimeout(() => setDel(true), 1800)
    } else {
      if (cIdx > 0) tm = setTimeout(() => setCIdx(i => i - 1), 45)
      else { setDel(false); setRIdx(i => (i + 1) % list.length) }
    }
    setDisplayed(cur.slice(0, cIdx))
    return () => clearTimeout(tm)
  }, [cIdx, del, rIdx, lang, roles])

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '80px 5% 60px', position: 'relative', overflow: 'hidden',
    }}>
      {/* bg glows */}
      <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(255,93,58,.18) 0%,transparent 70%)', top:-100, right:-100 }} />
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(26,236,255,.12) 0%,transparent 70%)', bottom:0, left:-80 }} />

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem',
        alignItems: 'center', width: '100%', maxWidth: 1200, margin: '0 auto',
        position: 'relative', zIndex: 1,
      }} className="hero-grid">

        {/* LEFT */}
        <div>
          {/* label */}
          <div className="anim-fadeUp" style={{
            fontSize: '.78rem', fontWeight: 500, letterSpacing: '.15em',
            textTransform: 'uppercase', color: 'var(--accent)',
            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.5rem',
          }}>
            <span style={{ display:'inline-block', width:24, height:2, background:'var(--accent)', borderRadius:2 }} />
            {t('hero.label')}
          </div>

          {/* name */}
          <h1 className="anim-fadeUp delay-1" style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(3rem,7vw,5.5rem)', lineHeight: .95,
            letterSpacing: '-0.04em', color: 'var(--txt)', marginBottom: '1.5rem',
          }}>
            {t('hero.greeting')}<br />
            <span style={{ color: 'var(--accent)' }}>{t('hero.name')}</span>
          </h1>

          {/* typewriter */}
          <div className="anim-fadeUp delay-1" style={{
            fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1rem,2vw,1.25rem)',
            fontWeight: 600, color: 'var(--txt2)', marginBottom: '2rem', minHeight: '2rem',
          }}>
            {displayed}
            <span className="anim-blink" style={{
              display:'inline-block', width:2, height:'1.2em',
              background:'var(--accent)', verticalAlign:'middle', marginLeft:3,
            }} />
          </div>

          {/* desc */}
          <p className="anim-fadeUp delay-2" style={{
            maxWidth: 480, color: 'var(--txt2)', fontSize: '1rem',
            lineHeight: 1.7, marginBottom: '2.5rem',
          }}>
            {t('hero.desc')}
          </p>

          {/* CTA */}
          <div className="anim-fadeUp delay-3" style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <a href="#projects" style={{
              padding: '.75rem 1.75rem', borderRadius: 100,
              background: 'var(--accent)', color: '#fff',
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '.9rem',
              border: 'none', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              boxShadow: '0 4px 20px rgba(255,93,58,.35)',
              transition: 'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 8px 28px rgba(255,93,58,.45)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='none'; el.style.boxShadow='0 4px 20px rgba(255,93,58,.35)' }}>
              {t('hero.cta1')} <ArrowRight size={15} />
            </a>
            <a href="#contact" style={{
              padding: '.75rem 1.75rem', borderRadius: 100,
              background: 'transparent', color: 'var(--txt)',
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '.9rem',
              border: '1px solid var(--stroke)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              transition: 'background .2s, border-color .2s, transform .2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card)'; el.style.borderColor='var(--txt2)'; el.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderColor='var(--stroke)'; el.style.transform='none' }}>
              {t('hero.cta2')} <MessageCircle size={15} />
            </a>
          </div>
        </div>

        {/* RIGHT — avatar */}
        <div className="anim-fadeUp delay-3" style={{ position:'relative', width:280, height:280, flexShrink:0 }}>
          {/* spinning ring */}
          <div className="anim-spin-slow" style={{
            position:'absolute', inset:-12, borderRadius:'50%',
            border:'2px dashed var(--stroke)',
          }}>
            <div style={{
              position:'absolute', width:10, height:10, borderRadius:'50%',
              background:'var(--accent)', top:'50%', left:-5,
              transform:'translateY(-50%)', boxShadow:'0 0 12px var(--accent)',
            }} />
          </div>
          {/* circle */}
          <div style={{
            width:'100%', height:'100%', borderRadius:'50%',
            background:'var(--card)', border:'2px solid var(--stroke)',
            display:'flex', alignItems:'center', justifyContent:'center',
            overflow:'hidden', position:'relative',
          }}>
            <img src="/avatar.png" alt="Avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          {/* badge */}
          <div style={{
            position:'absolute', bottom:12, right:-8,
            background:'var(--accent)', color:'#fff',
            fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'.7rem',
            padding:'4px 10px', borderRadius:100, letterSpacing:'.05em', whiteSpace:'nowrap',
          }}>
            {t('hero.badge')}
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="anim-fadeUp delay-7" style={{
        position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:4,
        fontSize:'.75rem', color:'var(--txt2)', zIndex:10,
      }}>
        <div className="anim-scrollLine" style={{
          height:48, width:1,
          background:'linear-gradient(to bottom, var(--accent), transparent)',
        }} />
        scroll
      </div>

      <style>{`
        @media(max-width:768px){
          .hero-grid{ grid-template-columns:1fr !important; text-align:center; }
          .hero-grid > div:last-child{ width:200px; height:200px; margin:0 auto; }
        }
      `}</style>
    </section>
  )
}
