'use client'
import { useI18n } from '@/hooks/useI18n'
import { CONFIG } from '@/data'
import { Heart } from 'lucide-react'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer style={{
      borderTop: '1px solid var(--stroke)', padding: '2rem 5%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{
        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.1rem',
        letterSpacing: '-.03em', color: 'var(--txt)',
      }}>
        {CONFIG.initials.slice(0, -1)}<span style={{ color:'var(--accent)' }}>{CONFIG.initials.slice(-1)}</span>
      </span>

      <span style={{ fontSize:'.82rem', color:'var(--txt2)', display:'flex', alignItems:'center', gap:4 }}>
        © 2026 <span style={{ color:'var(--accent)', fontWeight:600 }}>{CONFIG.name}</span>.
        &nbsp;{t('footer.copy')} <Heart size={13} fill="var(--accent)" color="var(--accent)" />
      </span>

      <a href="#home" style={{
        padding: '.5rem 1rem', borderRadius: 100,
        background: 'transparent', color: 'var(--txt)',
        border: '1px solid var(--stroke)', textDecoration: 'none',
        fontSize: '.8rem', fontWeight: 600,
        transition: 'background .2s, border-color .2s, transform .2s',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--card)'; el.style.borderColor='var(--txt2)'; el.style.transform='translateY(-2px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderColor='var(--stroke)'; el.style.transform='none' }}>
        {t('footer.top')}
      </a>
    </footer>
  )
}
