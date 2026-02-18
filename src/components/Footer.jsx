export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                        <a href="mailto:zaheer@example.com" className="footer-link">Email</a>
                    </div>
                    <p className="footer-text">
                        © {currentYear} <span className="highlight">Shaik Mohammed Zaheer</span>. Crafted with passion & code.
                    </p>
                    <p className="footer-text" style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                        Built with React + Three.js + GSAP
                    </p>
                </div>
            </div>
        </footer>
    )
}
