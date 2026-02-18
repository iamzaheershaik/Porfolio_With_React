import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
    {
        name: 'React',
        level: 90,
        icon: '⚛️',
        color: 'linear-gradient(135deg, #61dafb, #00b4d8)',
    },
    {
        name: 'JavaScript',
        level: 92,
        icon: '⚡',
        color: 'linear-gradient(135deg, #f7df1e, #f0c000)',
    },
    {
        name: 'HTML5',
        level: 95,
        icon: '🌐',
        color: 'linear-gradient(135deg, #e34c26, #f06529)',
    },
    {
        name: 'CSS3',
        level: 93,
        icon: '🎨',
        color: 'linear-gradient(135deg, #264de4, #2965f1)',
    },
    {
        name: 'Bootstrap',
        level: 88,
        icon: '🅱️',
        color: 'linear-gradient(135deg, #7952b3, #a855f7)',
    },
]

export default function Skills() {
    const sectionRef = useRef()
    const cardsRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
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

            // Animate cards
            const cards = cardsRef.current.children
            gsap.fromTo(cards,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    onComplete: () => {
                        // Animate the skill bars after cards appear
                        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                            bar.classList.add('animated')
                        })
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="section" id="skills" ref={sectionRef}>
            <div className="container">
                <span className="section-label">Skills & Expertise</span>
                <h2 className="section-title">
                    My <span className="gradient-text">tech stack</span>
                </h2>
                <p className="section-subtitle">
                    Technologies I work with to build modern, responsive, and performant web applications.
                </p>

                <div className="skills-grid" ref={cardsRef}>
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="skill-card glass-card"
                            style={{ '--skill-color': skill.color }}
                        >
                            <div className="skill-icon">{skill.icon}</div>
                            <div className="skill-name">{skill.name}</div>
                            <div className="skill-bar-track">
                                <div
                                    className="skill-bar-fill"
                                    style={{ '--skill-level': `${skill.level}%` }}
                                ></div>
                            </div>
                            <div className="skill-level-text">{skill.level}%</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
