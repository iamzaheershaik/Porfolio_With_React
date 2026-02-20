import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'github-activity', label: 'Open Source' },
        { id: 'contact', label: 'Contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Determine active section
            const sections = navItems.map(item => document.getElementById(item.id))
            const scrollPos = window.scrollY + 200

            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i] && sections[i].offsetTop <= scrollPos) {
                    setActiveSection(navItems[i].id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            setMenuOpen(false)
        }
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-logo" onClick={() => scrollTo('home')}>
                    SMZ<span style={{ color: 'var(--accent-cyan)', WebkitTextFillColor: 'var(--accent-cyan)' }}>.</span>
                </div>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollTo(item.id)}
                            role="button"
                            tabIndex={0}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        className="btn btn-primary"
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                        style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                    >
                        Let's Talk
                    </a>
                </div>

                <button
                    className={`nav-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    )
}
