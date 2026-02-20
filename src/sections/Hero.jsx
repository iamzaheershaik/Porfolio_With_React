import { useEffect, useRef, lazy, Suspense } from 'react'
import gsap from 'gsap'

const Scene = lazy(() => import('../components/Scene'))

export default function Hero() {
    const contentRef = useRef()
    const badgeRef = useRef()
    const nameRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()
    const buttonsRef = useRef()

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo(badgeRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
        )
            .fromTo(nameRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1 },
                '-=0.4'
            )
            .fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.5'
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.4'
            )
            .fromTo(buttonsRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
                '-=0.3'
            )

        return () => tl.kill()
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="hero" id="home">
            <div className="hero-canvas">
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </div>

            <div className="container">
                <div className="hero-content" ref={contentRef}>
                    <div className="hero-badge" ref={badgeRef}>
                        <span className="dot"></span>
                        Available for freelance work
                    </div>

                    <h1 className="hero-name" ref={nameRef}>
                        Hi, I'm{' '}
                        <span className="gradient-text">Shaik Mohammed Zaheer</span>
                    </h1>

                    <p className="hero-title" ref={titleRef}>
                        Full Stack Developer — Building <em>beautiful</em> & <em>interactive</em> web experiences
                    </p>

                    <p className="hero-description" ref={descRef}>
                        I craft pixel-perfect, responsive user interfaces with modern technologies
                        like React, Three.js, and cutting-edge CSS. Turning ideas into immersive
                        digital experiences.
                    </p>

                    <div className="hero-buttons" ref={buttonsRef}>
                        <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                            <span>🚀</span> View Projects
                        </button>
                        <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                            <span>📬</span> Contact Me
                        </button>
                        <a
                            className="btn btn-resume"
                            href="/resume.pdf"
                            download="Shaik_Mohammed_Zaheer_Resume.pdf"
                            title="Download Resume"
                        >
                            <span>📄</span> Download Resume
                        </a>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}
