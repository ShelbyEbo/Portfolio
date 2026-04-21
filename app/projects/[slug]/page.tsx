'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PROJECTS } from '@/data'
import { useI18n, type Lang } from '@/hooks/useI18n'

function Icon({ name, size = 64, color }: { name: string; size?: number; color: string }) {
  const C = ((LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.Code) as LucideIcon
  return <C size={size} color={color} />
}

function ProjectCarousel({
  images,
  name,
  icon,
  color,
  noImagesLabel,
}: {
  images?: string[]
  name: string
  icon: string
  color: string
  noImagesLabel: string
}) {
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const hasImages = !!images?.length
  const fit = name === 'NASA Farms Navigators' ? 'contain' : 'cover'

  useEffect(() => {
    if (!hasImages || (images?.length ?? 0) <= 1) return
    const id = window.setInterval(() => {
      setActive(i => (i + 1) % (images?.length ?? 1))
    }, 4500)
    return () => window.clearInterval(id)
  }, [hasImages, images])

  const go = (next: number) => {
    if (!images?.length) return
    setActive((next + images.length) % images.length)
  }

  const activeImage = images?.[active]

  if (!hasImages) {
    return (
      <div style={{
        position: 'relative',
        minHeight: 'clamp(420px, 62vw, 780px)',
        borderRadius: 28,
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${color}25, var(--card) 72%)`,
        border: '1px solid var(--stroke)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(255,255,255,.08), transparent 55%)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--stroke)' }}>
            <Icon name={icon} size={56} color={color} />
          </div>
          <div style={{ color: 'var(--txt2)', fontSize: '.9rem' }}>{noImagesLabel}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'relative',
      minHeight: 'clamp(420px, 62vw, 780px)',
      borderRadius: 28,
      overflow: 'hidden',
      background: 'var(--card)',
      border: '1px solid var(--stroke)',
      boxShadow: '0 22px 60px rgba(0,0,0,.2)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.02), rgba(0,0,0,.24))', zIndex: 1 }} />

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'zoom-in' }}>
        <div
          style={{
            display: 'flex',
            width: `${images.length * 100}%`,
            height: '100%',
            transform: `translateX(-${(active * 100) / images.length}%)`,
            transition: 'transform .7s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {images.map((src, idx) => (
            <div
              key={src}
              style={{
                position: 'relative',
                width: `${100 / images.length}%`,
                height: '100%',
                background: fit === 'contain' ? 'var(--bg2)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: fit === 'contain' ? '20px 24px' : 0,
              }}
            >
              <img
                src={src}
                alt={`${name} ${idx + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: fit,
                  objectPosition: 'center top',
                  display: 'block',
                  borderRadius: fit === 'contain' ? 18 : 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Imagem anterior"
        style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
          width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--stroke)',
          background: 'rgba(0,0,0,.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', cursor: 'pointer',
        }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Próxima imagem"
        style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
          width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--stroke)',
          background: 'rgba(0,0,0,.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', cursor: 'pointer',
        }}
      >
        <ChevronRight size={18} />
      </button>

      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Ir para a imagem ${idx + 1}`}
              onClick={() => setActive(idx)}
              style={{
                width: idx === active ? 28 : 8,
                height: 8,
                borderRadius: 999,
                border: 'none',
                background: idx === active ? 'var(--accent)' : 'rgba(255,255,255,.55)',
                cursor: 'pointer',
                transition: 'all .25s ease',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Miniatura ${idx + 1}`}
              style={{
                width: 52,
                height: 34,
                borderRadius: 10,
                border: idx === active ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,.25)',
                background: 'rgba(255,255,255,.08)',
                boxShadow: idx === active ? '0 0 0 2px rgba(255,255,255,.1)' : 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                padding: 0,
              }}
            >
              <img src={images[idx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            style={{
              padding: '8px 12px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,.25)',
              background: 'rgba(0,0,0,.28)',
              color: '#fff',
              fontSize: '.78rem',
              fontWeight: 700,
              backdropFilter: 'blur(12px)',
              cursor: 'zoom-in',
            }}
          >
            Ver em tela cheia
          </button>
        </div>
      </div>

      {fullscreen && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setFullscreen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,.82)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Fechar tela cheia"
            style={{
              position: 'fixed',
              top: 18,
              right: 18,
              width: 46,
              height: 46,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.25)',
              background: 'rgba(255,255,255,.08)',
              color: '#fff',
              fontSize: 24,
              lineHeight: 1,
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 'min(96vw, 1600px)',
              height: 'min(92vh, 980px)',
              borderRadius: 28,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.12)',
              boxShadow: '0 30px 90px rgba(0,0,0,.45)',
              background: 'rgba(15,13,11,.9)',
            }}
          >
            <img
              src={activeImage}
              alt={`${name} fullscreen`}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectDetailPage() {
  const { lang, t } = useI18n()
  const params = useParams<{ slug: string }>()
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ''

  const project = useMemo(() => PROJECTS.find(p => p.slug === slug), [slug])
  const galleryImages = project ? (project.detailImages?.length ? project.detailImages : project.images ?? []) : []

  if (!project) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--txt)', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link href="/#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
            padding: '10px 16px', borderRadius: 999, border: '1px solid var(--stroke)',
            background: 'var(--card)', color: 'var(--txt)', textDecoration: 'none',
          }}>
            <ArrowLeft size={16} /> {t('projects.back')}
          </Link>
          <div style={{ padding: 32, borderRadius: 24, border: '1px solid var(--stroke)', background: 'var(--card)' }}>
            Projeto não encontrado.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--txt)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 540, height: 540, borderRadius: '50%', filter: 'blur(90px)', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(255,93,58,.13) 0%, transparent 70%)', top: -140, right: -120 }} />
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', filter: 'blur(90px)', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(26,236,255,.09) 0%, transparent 70%)', bottom: 20, left: -120 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1700, margin: '0 auto', padding: '28px 4% 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
          <Link href="/#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 18px', borderRadius: 999,
            border: '1px solid var(--stroke)', background: 'var(--card)',
            color: 'var(--txt)', textDecoration: 'none', fontWeight: 600,
            boxShadow: '0 10px 30px rgba(0,0,0,.12)',
          }}>
            <ArrowLeft size={16} /> {t('projects.back')}
          </Link>

          <div style={{ fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--txt2)' }}>
            {t('projects.detail')}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.45fr .8fr', gap: '1.75rem', alignItems: 'start' }} className="project-detail-grid">
          <ProjectCarousel
            images={galleryImages}
            name={project.name}
            icon={project.icon}
            color={project.color}
            noImagesLabel={t('projects.noImages')}
          />

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 22, padding: '1.35rem', boxShadow: '0 16px 40px rgba(0,0,0,.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${project.color}18`, border: '1px solid var(--stroke)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={project.icon} size={22} color={project.color} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '.74rem', textTransform: 'uppercase', letterSpacing: '.16em', color: 'var(--txt2)' }}>
                    {project.slug}
                  </div>
                  <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(1.85rem, 3.9vw, 2.9rem)', lineHeight: .94, letterSpacing: '-.04em', marginTop: 6, maxWidth: '100%', overflowWrap: 'anywhere', wordBreak: 'break-word', hyphens: 'auto' }}>
                    {project.name}
                  </h1>
                </div>
              </div>

              <p style={{ color: 'var(--txt2)', lineHeight: 1.75, fontSize: '.95rem', marginBottom: '1rem' }}>
                {project.desc[lang as Lang]}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: '1rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '5px 11px', borderRadius: 999,
                    background: 'var(--bg2)', border: '1px solid var(--stroke)',
                    color: 'var(--txt2)', fontSize: '.74rem', fontWeight: 600,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                    padding: '10px 14px', borderRadius: 12, background: 'var(--accent)', color: '#fff',
                    textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 10px 24px rgba(255,93,58,.3)',
                  }}>
                    <ExternalLink size={14} /> Demo
                  </a>
                )}
                {project.repo && !project.private && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{
                    padding: '10px 14px', borderRadius: 12, background: 'var(--card2)', color: 'var(--txt)',
                    textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8,
                    border: '1px solid var(--stroke)',
                  }}>
                    <Github size={14} /> GitHub
                  </a>
                )}
                {project.private && (
                  <span style={{
                    padding: '10px 14px', borderRadius: 12, background: 'var(--card2)', color: 'var(--txt2)',
                    border: '1px solid var(--stroke)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    Privado
                  </span>
                )}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(180deg, var(--card), var(--card2))', border: '1px solid var(--stroke)', borderRadius: 22, padding: '1.15rem' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: '.9rem' }}>
                {t('projects.highlights')}
              </div>
              <ul style={{ color: 'var(--txt2)', lineHeight: 1.8, paddingLeft: '1.1rem', fontSize: '.92rem' }}>
                <li>Descrição traduzida conforme o idioma ativo.</li>
                <li>Galeria com carrossel e miniaturas.</li>
                <li>Layout responsivo e alinhado ao estilo do portfólio.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .project-detail-grid {
          grid-template-columns: 1.45fr .8fr;
        }
        @media (max-width: 980px) {
          .project-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
