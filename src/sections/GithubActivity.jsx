import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { RepoIcon, ForkIcon } from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)

export default function GithubActivity() {
    const sectionRef = useRef()
    const contentRef = useRef()
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://api.github.com/users/iamzaheershaik/repos?sort=updated&per_page=6')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRepos(data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch repos', err)
                setLoading(false)
            })
    }, [])

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

            if (contentRef.current && contentRef.current.children.length > 0) {
                gsap.fromTo(contentRef.current.children,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [loading])

    return (
        <section className="section" id="github-activity" ref={sectionRef}>
            <div className="container">
                <span className="section-label">Open Source</span>
                <h2 className="section-title">
                    GitHub <span className="gradient-text">Activity</span>
                </h2>
                <p className="section-subtitle">
                    A look at my recent contributions, open-source projects, and coding activity. Currently working on these!
                </p>

                <div className="github-content" ref={contentRef} style={{ marginTop: '3rem' }}>

                    {/* Contribution Calendar with Tooltips */}
                    <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem', overflowX: 'auto' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Contribution Graph</h3>
                        <GitHubCalendar
                            username="iamzaheershaik"
                            colorScheme="dark"
                            theme={{
                                dark: ['var(--bg-tertiary)', 'rgba(0, 240, 255, 0.2)', 'rgba(0, 240, 255, 0.5)', 'rgba(0, 240, 255, 0.8)', 'var(--accent-cyan)']
                            }}
                            style={{ margin: '0 auto' }}
                            renderBlock={(block, activity) =>
                                React.cloneElement(block, {
                                    'data-tooltip-id': 'github-tooltip',
                                    'data-tooltip-content': `${activity.count} contribution${activity.count !== 1 ? 's' : ''} on ${new Date(activity.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`,
                                })
                            }
                        />
                        <ReactTooltip
                            id="github-tooltip"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-glass)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                padding: '0.5rem 0.75rem',
                                zIndex: 9999,
                            }}
                        />
                    </div>

                    {/* Recent Repositories */}
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Latest Repositories</h3>
                    {loading ? (
                        <p style={{ color: 'var(--text-muted)' }}>Loading repositories...</p>
                    ) : (
                        <div className="projects-grid">
                            {repos.map(repo => (
                                <a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card glass-card"
                                    style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', textDecoration: 'none', transition: 'transform 0.2s', height: '100%' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
                                >
                                    <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <RepoIcon size={20} fill="var(--accent-cyan)" />
                                        {repo.name}
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                                        {repo.description || 'No description provided.'}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {repo.language && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-violet)' }}></span>
                                                {repo.language}
                                            </span>
                                        )}
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            ⭐ {repo.stargazers_count}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <ForkIcon />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
