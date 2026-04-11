'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'pt' | 'en' | 'es'

const translations: Record<Lang, Record<string, string | string[]>> = {
  pt: {
    'nav.about':    'Sobre mim',
    'nav.skills':   'Skills',
    'nav.projects': 'Projetos',
    'nav.contact':  'Contacto',

    'hero.label': 'Frontend Developer',
    'hero.name':  'Melzira Ebo',
    'hero.desc':  'Desenvolvedora frontend apaixonada por criar experiências digitais modernas, acessíveis e memoráveis.',
    'hero.cta1':  'Ver projetos',
    'hero.cta2':  'Falar comigo',
    'hero.badge': '✦ Frontend Dev',
    'hero.roles': ['Frontend Developer','Blockchain Enthusiast','Problem Solver','42 Student'] as unknown as string,

    'about.label': 'Sobre mim',
    'about.title': 'Quem sou eu?',
    'about.p1':    'Sou uma desenvolvedora frontend com paixão por criar interfaces bonitas e funcionais. Formada pela 42, tenho experiência com as tecnologias mais modernas do mercado.',
    'about.p2':    'Adoro desafios, aprendo rápido e me adapto com facilidade a novos ambientes e tecnologias. Atualmente a explorar o mundo do blockchain e Web3.',
    'about.p3':    'Quando não estou a programar, estou a explorar design, jogar videojogos ou a aprender algo completamente novo.',
    'about.stat1': 'Escola 42',
    'about.stat2': 'Projetos concluídos',
    'about.stat3': 'Idiomas',
    'about.stat4': 'Curiosidade',

    'skills.label':      'Competências',
    'skills.title':      'O que sei fazer',
    'skills.frontend':   'Frontend',
    'skills.mobile':   'Mobile',
    'skills.backend':    'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.tools':      'Ferramentas',

    'projects.label':   'Trabalhos',
    'projects.title':   'Projetos em destaque',
    'projects.demo':    'Demo',
    'projects.private': 'Privado',
    'projects.github':  'GitHub',

    'contact.label':   'Contacto',
    'contact.title':   'Vamos conversar',
    'contact.desc':    'Estou aberta a novas oportunidades, colaborações ou apenas uma boa conversa sobre tecnologia. Não hesites em entrar em contacto!',
    'contact.name':    'Nome',
    'contact.email':   'Email',
    'contact.message': 'Mensagem',
    'contact.send':    'Enviar mensagem',
    'contact.sent':    'Enviado!',

    'footer.copy': '© 2026 O Teu Nome. Feito com ♥',
    'footer.top':  '↑ Topo',
  },
  en: {
    'nav.about':    'About',
    'nav.skills':   'Skills',
    'nav.projects': 'Projects',
    'nav.contact':  'Contact',

    'hero.label': 'Frontend Developer',
    'hero.name':  'Melzira Ebo',
    'hero.desc':  'Frontend developer passionate about creating modern, accessible and memorable digital experiences.',
    'hero.cta1':  'See projects',
    'hero.cta2':  'Talk to me',
    'hero.badge': '✦ Frontend Dev',
    'hero.roles': ['Frontend Developer','Blockchain Enthusiast','Problem Solver','42 Student'] as unknown as string,

    'about.label': 'About me',
    'about.title': 'Who am I?',
    'about.p1':    "I'm a frontend developer passionate about building beautiful and functional interfaces. Trained at 42, I have experience with the most modern technologies.",
    'about.p2':    'I love challenges, learn fast and adapt easily to new environments and technologies. Currently exploring the world of blockchain and Web3.',
    'about.p3':    "When I'm not coding, I'm exploring design, playing video games or learning something completely new.",
    'about.stat1': 'School 42',
    'about.stat2': 'Completed projects',
    'about.stat3': 'Languages',
    'about.stat4': 'Curiosity',

    'skills.label':      'Skills',
    'skills.title':      'What I can do',
    'skills.frontend':   'Frontend',
    'skills.mobile':   'Mobile',
    'skills.backend':    'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.tools':      'Tools',

    'projects.label':   'Work',
    'projects.title':   'Featured projects',
    'projects.demo':    'Demo',
    'projects.private': 'Private',
    'projects.github':  'GitHub',

    'contact.label':   'Contact',
    'contact.title':   "Let's talk",
    'contact.desc':    "I'm open to new opportunities, collaborations or just a good conversation about technology. Don't hesitate to reach out!",
    'contact.name':    'Name',
    'contact.email':   'Email',
    'contact.message': 'Message',
    'contact.send':    'Send message',
    'contact.sent':    'Sent!',

    'footer.copy': '© 2026 Your Name. Made with ♥',
    'footer.top':  '↑ Top',
  },
  es: {
    'nav.about':    'Sobre mí',
    'nav.skills':   'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.contact':  'Contacto',

    'hero.label': 'Desarrolladora Frontend',
    'hero.name':  'Melzira Ebo',
    'hero.desc':  'Desarrolladora frontend apasionada por crear experiencias digitales modernas, accesibles y memorables.',
    'hero.cta1':  'Ver proyectos',
    'hero.cta2':  'Hablar conmigo',
    'hero.badge': '✦ Frontend Dev',
    'hero.roles': ['Desarrolladora Frontend','Entusiasta Blockchain','Problem Solver','Estudiante 42'] as unknown as string,

    'about.label': 'Sobre mí',
    'about.title': '¿Quién soy?',
    'about.p1':    'Soy una desarrolladora frontend apasionada por crear interfaces bonitas y funcionales. Formada en la 42, tengo experiencia con las tecnologías más modernas.',
    'about.p2':    'Me encantan los desafíos, aprendo rápido y me adapto fácilmente a nuevos entornos y tecnologías. Actualmente explorando el mundo del blockchain y Web3.',
    'about.p3':    'Cuando no estoy programando, estoy explorando diseño, jugando videojuegos o aprendiendo algo completamente nuevo.',
    'about.stat1': 'Escuela 42',
    'about.stat2': 'Proyectos completados',
    'about.stat3': 'Idiomas',
    'about.stat4': 'Curiosidad',

    'skills.label':      'Habilidades',
    'skills.title':      'Lo que sé hacer',
    'skills.frontend':   'Frontend',
    'skills.mobile':   'Mobile',
    'skills.backend':    'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.tools':      'Herramientas',

    'projects.label':   'Trabajos',
    'projects.title':   'Proyectos destacados',
    'projects.demo':    'Demo',
    'projects.private': 'Privado',
    'projects.github':  'GitHub',

    'contact.label':   'Contacto',
    'contact.title':   'Hablemos',
    'contact.desc':    'Estoy abierta a nuevas oportunidades, colaboraciones o solo una buena conversación sobre tecnología.',
    'contact.name':    'Nombre',
    'contact.email':   'Email',
    'contact.message': 'Mensaje',
    'contact.send':    'Enviar mensaje',
    'contact.sent':    '¡Enviado!',

    'footer.copy': '© 2026 Tu Nombre. Hecho con ♥',
    'footer.top':  '↑ Arriba',
  },
}

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; roles: () => string[] }
const I18nCtx = createContext<Ctx | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')
  const t = (k: string) => {
    const v = translations[lang][k]
    return Array.isArray(v) ? v.join(', ') : (v as string) ?? k
  }
  const roles = () => translations[lang]['hero.roles'] as unknown as string[]
  return <I18nCtx.Provider value={{ lang, setLang, t, roles }}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be inside I18nProvider')
  return ctx
}
