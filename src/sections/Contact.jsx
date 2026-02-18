import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const sectionRef = useRef()
    const formRef = useRef()
    const infoRef = useRef()
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

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

            gsap.fromTo(infoRef.current,
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

            gsap.fromTo(formRef.current,
                { opacity: 0, x: 40 },
                {
                    opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <section className="section" id="contact" ref={sectionRef}>
            <div className="container">
                <span className="section-label">Get in Touch</span>
                <h2 className="section-title">
                    Let's <span className="gradient-text">work together</span>
                </h2>
                <p className="section-subtitle">
                    Have a project in mind or want to collaborate? I'd love to hear from you!
                </p>

                <div className="contact-grid">
                    <div className="contact-info" ref={infoRef}>
                        <div className="contact-info-item">
                            <div className="contact-info-icon">📧</div>
                            <div>
                                <div className="contact-info-label">Email</div>
                                <div className="contact-info-value">zaheer@example.com</div>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">📍</div>
                            <div>
                                <div className="contact-info-label">Location</div>
                                <div className="contact-info-value">India</div>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">💼</div>
                            <div>
                                <div className="contact-info-label">Status</div>
                                <div className="contact-info-value" style={{ color: 'var(--accent-green)' }}>
                                    Available for freelance
                                </div>
                            </div>
                        </div>

                        <div className="contact-socials">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                                🐙
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                💼
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                                🐦
                            </a>
                            <a href="mailto:zaheer@example.com" className="social-link" title="Email">
                                ✉️
                            </a>
                        </div>
                    </div>

                    <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                className="form-textarea"
                                placeholder="Your Message..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary form-submit">
                            {submitted ? '✅ Message Sent!' : '🚀 Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
