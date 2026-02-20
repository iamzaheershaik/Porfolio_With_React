import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ReactIcon, JavaScriptIcon, HTML5Icon, CSS3Icon, BootstrapIcon,
    NodeIcon, ExpressIcon, MongoDBIcon,
    GitIcon, GitHubIcon, LinuxIcon, VSCodeIcon,
} from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
    {
        category: 'Frontend',
        skills: [
            { name: 'React', Icon: ReactIcon, color: '#61dafb' },
            { name: 'JavaScript', Icon: JavaScriptIcon, color: '#f7df1e' },
            { name: 'HTML5', Icon: HTML5Icon, color: '#e34c26' },
            { name: 'CSS3', Icon: CSS3Icon, color: '#264de4' },
            { name: 'Bootstrap', Icon: BootstrapIcon, color: '#7952b3' },
        ]
    },
    {
        category: 'Backend',
        skills: [
            { name: 'Node.js', Icon: NodeIcon, color: '#339933' },
            { name: 'Express.js', Icon: ExpressIcon, color: '#888888' },
            { name: 'MongoDB', Icon: MongoDBIcon, color: '#47a248' },
        ]
    },
    {
        category: 'Tools',
        skills: [
            { name: 'Git', Icon: GitIcon, color: '#f05032' },
            { name: 'GitHub', Icon: GitHubIcon, color: '#a855f7' },
            { name: 'Linux', Icon: LinuxIcon, color: '#fcc624' },
            { name: 'VS Code', Icon: VSCodeIcon, color: '#007acc' },
        ]
    },
]

export default function Skills() {
    const sectionRef = useRef()
    const gridRefs = useRef([])

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

            gridRefs.current.forEach((gridEl) => {
                if (!gridEl) return
                const heading = gridEl.previousElementSibling
                if (heading) {
                    gsap.fromTo(heading,
                        { opacity: 0, x: -30 },
                        {
                            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
                            scrollTrigger: {
                                trigger: heading,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse',
                            }
                        }
                    )
                }
                gsap.fromTo(gridEl.children,
                    { opacity: 0, y: 30, scale: 0.8 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: gridEl,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            })
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

                {skillCategories.map((cat, catIdx) => (
                    <div key={cat.category} style={{ marginTop: '3rem' }}>
                        <h3 className="skills-category-heading">{cat.category}</h3>
                        <div
                            className="skills-icon-grid"
                            ref={(el) => (gridRefs.current[catIdx] = el)}
                        >
                            {cat.skills.map((skill) => (
                                <div key={skill.name} className="skill-icon-item">
                                    <div className="skill-icon-circle" style={{ '--skill-accent': skill.color }}>
                                        <skill.Icon />
                                    </div>
                                    <span className="skill-icon-label">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
