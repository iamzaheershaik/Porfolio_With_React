import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'E-Commerce Dashboard',
        description: 'A modern, responsive admin dashboard for e-commerce platforms with real-time data visualization and interactive charts.',
        tags: ['React', 'JavaScript', 'CSS3'],
        emoji: '🛒',
        gradient: 'linear-gradient(135deg, #00f0ff22, #8b5cf622)',
    },
    {
        title: 'Weather App Pro',
        description: 'Beautiful weather application with location-based forecasts, animated weather icons, and a sleek dark-mode interface.',
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        emoji: '🌤️',
        gradient: 'linear-gradient(135deg, #f9731622, #ec489922)',
    },
    {
        title: 'Portfolio Generator',
        description: 'A drag-and-drop portfolio builder that lets developers create stunning portfolios with customizable themes and layouts.',
        tags: ['React', 'Bootstrap', 'JavaScript'],
        emoji: '🎨',
        gradient: 'linear-gradient(135deg, #8b5cf622, #ec489922)',
    },
    {
        title: 'Task Management App',
        description: 'Full-featured task management application with Kanban boards, real-time collaboration, and responsive design for all devices.',
        tags: ['React', 'CSS3', 'JavaScript'],
        emoji: '📋',
        gradient: 'linear-gradient(135deg, #22c55e22, #00f0ff22)',
    },
]

export default function Projects() {
    const sectionRef = useRef()
    const gridRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll('.section-label, .section-title, .section-subtitle'),
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

            gsap.fromTo(gridRef.current.children,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleTilt = (e, card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 15
        const rotateY = (centerX - x) / 15
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    }

    const resetTilt = (card) => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }

    return (
        <section className="section" id="projects" ref={sectionRef}>
            <div className="container">
                <span className="section-label">Featured Work</span>
                <h2 className="section-title">
                    Recent <span className="gradient-text">projects</span>
                </h2>
                <p className="section-subtitle">
                    A selection of projects I've built showcasing my frontend skills and creative problem-solving.
                </p>

                <div className="projects-grid" ref={gridRef}>
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="project-card glass-card"
                            onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                            onMouseLeave={(e) => resetTilt(e.currentTarget)}
                            style={{ transition: 'transform 0.15s ease' }}
                        >
                            <div className="project-image" style={{ background: project.gradient }}>
                                <div className="project-image-placeholder">
                                    {project.emoji}
                                </div>
                                <div className="project-overlay">
                                    <span className="project-overlay-btn">View Details</span>
                                    <span className="project-overlay-btn" style={{ background: 'var(--accent-violet)' }}>
                                        Source Code
                                    </span>
                                </div>
                            </div>

                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
