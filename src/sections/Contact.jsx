import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ⬇️ PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE ⬇️
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHiQE-akh9TJebh45550b3JdnO2fQQB4Pw47aOAaa-a1um7p8NH4ss1QRWQHDoj1jx/exec'

export default function Contact() {
    const sectionRef = useRef()
    const formRef = useRef()
    const infoRef = useRef()
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        setError(false)

        try {
            const params = new URLSearchParams()
            params.append('name', formData.name)
            params.append('email', formData.email)
            params.append('message', formData.message)

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
            })

            // With no-cors the response is opaque, but if fetch didn't throw
            // that means the request was sent successfully
            setSubmitted(true)
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setSubmitted(false), 3000)
        } catch (err) {
            console.error('Form submission failed:', err)
            setError(true)
            setTimeout(() => setError(false), 3000)
        } finally {
            setSending(false)
        }
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
                                <div className="contact-info-value">
                                    <a href="https://mail.google.com/mail/?view=cm&to=zaheershaik0323@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>zaheershaik0323@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">📱</div>
                            <div>
                                <div className="contact-info-label">Phone</div>
                                <div className="contact-info-value">
                                    <a href="tel:+919390056219" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9390056219</a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">📍</div>
                            <div>
                                <div className="contact-info-label">Location</div>
                                <div className="contact-info-value">Surat, Gujarat</div>
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
                            <a href="https://github.com/iamzaheershaik" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                                🐙
                            </a>
                            <a href="https://www.linkedin.com/in/iamzaheershaik" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                💼
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                                🐦
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&to=zaheershaik0323@gmail.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Email">
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
                        <button type="submit" className="btn btn-primary form-submit" disabled={sending}>
                            {sending ? '⏳ Sending...' : submitted ? '✅ Message Sent!' : error ? '❌ Failed, try again' : '🚀 Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
