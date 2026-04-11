'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { CONFIG } from '@/data'
import { Sun, Moon, Globe } from 'lucide-react'

const LANGS: { code: Lang; fi: string; label: string }[] = [
  { code: 'pt', fi: 'fi-pt', label: 'PT' },
  { code: 'en', fi: 'fi-gb', label: 'EN' },
  { code: 'es', fi: 'fi-es', label: 'ES' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t }  = useI18n()
  const [mounted,  setMounted]  = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    setMounted(true)
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const links = [
    { href: '#about',    key: 'nav.about' },
    { href: '#skills',   key: 'nav.skills' },
    { href: '#projects', key: 'nav.projects' },
    { href: '#contact',  key: 'nav.contact' },
  ]

  const cur = LANGS.find(l => l.code === lang)!

  const navStyle: React.CSSProperties = scrolled
    ? { background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--stroke)' }
    : { background: 'transparent' }

  const btnStyle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: '50%',
    border: '1px solid var(--stroke)', background: 'var(--card)',
    color: 'var(--txt)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background .2s, transform .2s',
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 64, padding: '0 5%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background .5s cubic-bezier(.4,0,.2,1)',
      ...navStyle,
    }}>
      {/* Logo */}
      <a href="#" style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem',
        color: 'var(--txt)', textDecoration: 'none', letterSpacing: '-0.03em',
      }}>
        {CONFIG.initials.slice(0, -1)}<span style={{ color: 'var(--accent)' }}>{CONFIG.initials.slice(-1)}</span>
      </a>

      {/* Nav links */}
      <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }}
          className="hidden md:flex">
        {links.map(({ href, key }) => (
          <li key={key}>
            <a href={href} style={{
              fontSize: '.85rem', fontWeight: 500, color: 'var(--txt2)',
              textDecoration: 'none', transition: 'color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--txt)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--txt2)')}>
              {t(key)}
            </a>
          </li>
        ))}
      </ul>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>

        {/* Lang dropdown */}
        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{ ...btnStyle, gap: 6, padding: '0 10px', width: 'auto', borderRadius: 100, fontSize: '.8rem', fontWeight: 600 }}>
            <span className={`fi ${cur.fi}`} style={{ width: 18, height: 13 }} />
            {cur.label}
            <Globe size={12} />
          </button>
          {open && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'var(--card)', border: '1px solid var(--stroke)',
              borderRadius: 10, overflow: 'hidden', minWidth: 110,
              boxShadow: '0 8px 24px rgba(0,0,0,.15)',
            }}>
              {LANGS.map(l => (
                <button key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false) }}
                  style={{
                    width: '100%', padding: '8px 14px', background: 'none', border: 'none',
                    color: lang === l.code ? 'var(--accent)' : 'var(--txt)',
                    fontWeight: lang === l.code ? 600 : 400,
                    fontFamily: "'DM Sans', sans-serif", fontSize: '.85rem',
                    textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--card2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                  <span className={`fi ${l.fi}`} style={{ width: 18, height: 13 }} />
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        {mounted && (
          <button style={btnStyle}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--card2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--card)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
    </nav>
  )
}
