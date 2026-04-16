import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'Crack The JS INTERVIEW',
        description: 'A dedicated platform for rigorous JavaScript interview preparation via MCQs and output-based challenges. Built with pure HTML, CSS, and JS.',
        tags: ['HTML5', 'CSS3', 'JavaScript'],
        image: '/Crack_The_Js.png',
        link: 'https://crack-the-js.vercel.app/',
        gradient: 'linear-gradient(135deg, #f59e0b22, #d9770622)',
    },
    {
        title: 'Udemy Clone',
        description: 'A comprehensive Udemy-inspired e-learning platform cloning core course discovery and authentication flows.',
        tags: ['React', 'Redux', 'Firebase', 'Firestore'],
        image: '/Udemy.png',
        link: 'https://udemy-cloned.web.app',
        gradient: 'linear-gradient(135deg, #a855f722, #9333ea22)',
    },
    {
        title: 'Role-Based Admin Panel',
        description: 'Secure Admin Dashboard with strict role-based access control. Backend developed dynamically with Node.js and Express.',
        tags: ['Node.js', 'Express.js', 'React'],
        image: '/Admin Panel.png',
        link: 'https://admin-panel-omega-gold.vercel.app/',
        gradient: 'linear-gradient(135deg, #3b82f622, #2563eb22)',
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
                    {projects.map((project, i) => {
                        const isClickable = !!project.link;
                        
                        const CardInner = (
                            <>
                                <div className="project-image" style={{ background: project.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div className="project-image-placeholder">
                                            {project.emoji || '🚀'}
                                        </div>
                                    )}
                                    <div className="project-overlay">
                                        <span className="project-overlay-btn" style={{ background: 'var(--accent-violet)' }}>
                                            {isClickable ? 'Open Website' : 'Details'}
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
                            </>
                        );

                        if (isClickable) {
                            return (
                                <a
                                    key={i}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card glass-card"
                                    onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                                    onMouseLeave={(e) => resetTilt(e.currentTarget)}
                                    style={{ transition: 'transform 0.15s ease', textDecoration: 'none', color: 'inherit', display: 'block' }}
                                >
                                    {CardInner}
                                </a>
                            );
                        }

                        return (
                            <div
                                key={i}
                                className="project-card glass-card"
                                onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                                onMouseLeave={(e) => resetTilt(e.currentTarget)}
                                style={{ transition: 'transform 0.15s ease' }}
                            >
                                {CardInner}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
