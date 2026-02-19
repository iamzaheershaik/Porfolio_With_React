import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// MUI Icons
import CodeIcon from '@mui/icons-material/Code'
import JavascriptIcon from '@mui/icons-material/Javascript'
import HtmlIcon from '@mui/icons-material/Html'
import CssIcon from '@mui/icons-material/Css'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import DnsIcon from '@mui/icons-material/Dns'
import ApiIcon from '@mui/icons-material/Api'
import StorageIcon from '@mui/icons-material/Storage'
import MergeIcon from '@mui/icons-material/MergeType'
import GitHubIcon from '@mui/icons-material/GitHub'

gsap.registerPlugin(ScrollTrigger)

const categories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: [
            { name: 'React', level: 90, Icon: CodeIcon, color: '#61dafb' },
            { name: 'JavaScript', level: 92, Icon: JavascriptIcon, color: '#f7df1e' },
            { name: 'HTML5', level: 95, Icon: HtmlIcon, color: '#f06529' },
            { name: 'CSS3', level: 93, Icon: CssIcon, color: '#2965f1' },
            { name: 'Bootstrap', level: 88, Icon: ViewQuiltIcon, color: '#7952b3' },
        ],
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', level: 82, Icon: DnsIcon, color: '#68a063' },
            { name: 'Express.js', level: 80, Icon: ApiIcon, color: '#888888' },
            { name: 'MongoDB', level: 78, Icon: StorageIcon, color: '#47a248' },
        ],
    },
    {
        title: 'Tools',
        icon: '🔧',
        skills: [
            { name: 'Git', level: 85, Icon: MergeIcon, color: '#f05032' },
            { name: 'GitHub', level: 87, Icon: GitHubIcon, color: '#a855f7' },
        ],
    },
]

export default function Skills() {
    const sectionRef = useRef()
    const groupsRef = useRef()

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

            // Animate each category group
            sectionRef.current.querySelectorAll('.skills-category').forEach((group) => {
                gsap.fromTo(group,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: group,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )

                gsap.fromTo(group.querySelectorAll('.skill-card'),
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: group,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                        onComplete: () => {
                            group.querySelectorAll('.skill-bar-fill').forEach(bar => {
                                bar.classList.add('animated')
                            })
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

                <div className="skills-categories" ref={groupsRef}>
                    {categories.map((cat) => (
                        <div key={cat.title} className="skills-category">
                            <h3 className="skills-category-title">
                                <span className="skills-category-icon">{cat.icon}</span>
                                {cat.title}
                            </h3>
                            <div className="skills-grid">
                                {cat.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="skill-card glass-card"
                                        style={{ '--skill-accent': skill.color }}
                                    >
                                        <div className="skill-icon" style={{ color: skill.color }}>
                                            <skill.Icon fontSize="inherit" />
                                        </div>
                                        <div className="skill-details">
                                            <div className="skill-header">
                                                <span className="skill-name">{skill.name}</span>
                                                <span className="skill-level-text">{skill.level}%</span>
                                            </div>
                                            <div className="skill-bar-track">
                                                <div
                                                    className="skill-bar-fill"
                                                    style={{
                                                        '--skill-level': `${skill.level}%`,
                                                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
