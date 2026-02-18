import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    const sectionRef = useRef()
    const imageRef = useRef()
    const textRef = useRef()
    const statsRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: -60 },
                {
                    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

            gsap.fromTo(textRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

            gsap.fromTo(statsRef.current.children,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="section" id="about" ref={sectionRef}>
            <div className="container">
                <span className="section-label">About Me</span>
                <h2 className="section-title">
                    Passionate about crafting <span className="gradient-text">digital experiences</span>
                </h2>

                <div className="about-grid">
                    <div className="about-image-wrapper" ref={imageRef}>
                        <div className="about-image-container">
                            <div className="about-avatar">Z</div>
                        </div>
                        <div className="about-decorator"></div>
                    </div>

                    <div className="about-text" ref={textRef}>
                        <p>
                            I'm <strong>Shaik Mohammed Zaheer</strong>, a creative Frontend Developer
                            with a passion for building beautiful, responsive, and user-centric web
                            applications. I specialize in turning complex designs into clean, efficient code.
                        </p>
                        <p>
                            With expertise in <strong>React</strong>, <strong>JavaScript</strong>,
                            and modern CSS frameworks, I create seamless user experiences that not
                            only look stunning but also perform flawlessly across all devices.
                        </p>
                        <p>
                            I believe in writing clean, maintainable code and staying up-to-date
                            with the latest frontend technologies. When I'm not coding, you'll find
                            me exploring new design trends and contributing to the developer community.
                        </p>

                        <div className="about-stats" ref={statsRef}>
                            <div className="stat-item">
                                <div className="stat-number">10+</div>
                                <div className="stat-label">Projects</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">5+</div>
                                <div className="stat-label">Technologies</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Dedication</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
