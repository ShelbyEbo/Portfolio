'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { CONFIG } from '@/data'
import { Sun, Moon, Globe } from 'lucide-react'
import './Navbar.css'

const LANGS: { code: Lang; fi: string; label: string }[] = [
  { code: 'pt', fi: 'fi-pt', label: 'PT' },
  { code: 'en', fi: 'fi-gb', label: 'EN' },
  { code: 'es', fi: 'fi-es', label: 'ES' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useI18n()

  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeDropdown)

    return () => {
      document.removeEventListener('pointerdown', closeDropdown)
    }
  }, [])

  const links = [
    { href: '#about', key: 'nav.about' },
    { href: '#skills', key: 'nav.skills' },
    { href: '#projects', key: 'nav.projects' },
    { href: '#contact', key: 'nav.contact' },
  ]

  const currentLang = LANGS.find((l) => l.code === lang)!

  const navStyle: React.CSSProperties = scrolled
    ? {
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--stroke)',
      }
    : {
        background: 'transparent',
      }

  const btnStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid var(--stroke)',
    background: 'var(--card)',
    color: 'var(--txt)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background .2s, transform .2s',
  }

  return (
    <nav className="navbar" style={navStyle}>
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '1.2rem',
          color: 'var(--txt)',
          textDecoration: 'none',
          letterSpacing: '-0.03em',
          flexShrink: 0,
        }}
      >
        {CONFIG.initials.slice(0, -1)}
        <span style={{ color: 'var(--accent)' }}>
          {CONFIG.initials.slice(-1)}
        </span>
      </a>

      {/* Navigation Links */}
      <ul className="nav-links">
        {links.map(({ href, key }) => (
          <li key={key}>
            <a
              href={href}
              style={{
                fontSize: '.85rem',
                fontWeight: 500,
                color: 'var(--txt2)',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--txt)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--txt2)')
              }
            >
              {t(key)}
            </a>
          </li>
        ))}
      </ul>

      {/* Controls */}
      <div className="nav-controls">
        {/* Language Selector */}
        <div
          ref={dropdownRef}
          style={{
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            style={{
              ...btnStyle,
              width: 'auto',
              borderRadius: 999,
              padding: '0 10px',
              gap: 6,
              fontSize: '.8rem',
              fontWeight: 600,
            }}
          >
            <span
              className={`fi ${currentLang.fi}`}
              style={{
                width: 18,
                height: 13,
              }}
            />

            <span className="lang-text">
              {currentLang.label}
            </span>

            <Globe size={12} />
          </button>

          {open && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: 'var(--card)',
                border: '1px solid var(--stroke)',
                borderRadius: 10,
                overflow: 'hidden',
                minWidth: 110,
                boxShadow: '0 8px 24px rgba(0,0,0,.15)',
              }}
            >
              {LANGS.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => {
                    setLang(language.code)
                    setOpen(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    background: 'none',
                    border: 'none',
                    color:
                      lang === language.code
                        ? 'var(--accent)'
                        : 'var(--txt)',
                    fontWeight:
                      lang === language.code ? 600 : 400,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--card2)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'none')
                  }
                >
                  <span
                    className={`fi ${language.fi}`}
                    style={{
                      width: 18,
                      height: 13,
                    }}
                  />

                  {language.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <button
            type="button"
            className="theme-btn"
            style={btnStyle}
            onClick={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--card2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--card)'
            }}
          >
            {theme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )}
          </button>
        )}
      </div>
    </nav>
  )
}