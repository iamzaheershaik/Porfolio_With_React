import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
    test('renders the copyright with name', () => {
        render(<Footer />)
        expect(screen.getByText('Shaik Mohammed Zaheer')).toBeInTheDocument()
    })

    test('renders the current year', () => {
        render(<Footer />)
        const year = new Date().getFullYear().toString()
        expect(screen.getByText((content) => content.includes(year))).toBeInTheDocument()
    })

    test('renders social links', () => {
        render(<Footer />)
        expect(screen.getByText('GitHub')).toBeInTheDocument()
        expect(screen.getByText('LinkedIn')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
    })

    test('GitHub link points to correct URL', () => {
        render(<Footer />)
        const githubLink = screen.getByText('GitHub')
        expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/iamzaheershaik')
    })

    test('links open in new tab', () => {
        render(<Footer />)
        const githubLink = screen.getByText('GitHub').closest('a')
        expect(githubLink).toHaveAttribute('target', '_blank')
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('renders tech stack text', () => {
        render(<Footer />)
        expect(screen.getByText('Built with React + Three.js + GSAP')).toBeInTheDocument()
    })
})
