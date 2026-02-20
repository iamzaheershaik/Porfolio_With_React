import { useEffect, useRef } from 'react'
import { Leva } from 'leva'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import GithubActivity from './sections/GithubActivity'
import Contact from './sections/Contact'
import './App.css'

function CursorGlow() {
    const glowRef = useRef()

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                glowRef.current.style.left = e.clientX + 'px'
                glowRef.current.style.top = e.clientY + 'px'
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return <div className="cursor-glow" ref={glowRef} />
}

function App() {
    return (
        <>
            {/* Leva dev controls panel */}
            <Leva collapsed hidden />

            {/* Cursor glow effect */}
            <CursorGlow />

            {/* Navigation */}
            <Navbar />

            {/* Page Sections */}
            <main>
                <Hero />
                <About />
                <Skills />
                <GithubActivity />

                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </>
    )
}

export default App
