import { Navbar }   from '@/components/Navbar'
import { Hero }     from '@/components/Hero'
import { About }    from '@/components/About'
import { Skills }   from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact }  from '@/components/Contact'
import { Footer }   from '@/components/Footer'

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--txt)', minHeight: '100vh' }}>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
