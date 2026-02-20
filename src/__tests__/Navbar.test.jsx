import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/Navbar'

// Mock window.scrollTo and scrollIntoView
beforeAll(() => {
    window.scrollTo = jest.fn()
    Element.prototype.scrollIntoView = jest.fn()
})

describe('Navbar', () => {
    test('renders the logo text', () => {
        render(<Navbar />)
        expect(screen.getByText('SMZ')).toBeInTheDocument()
    })

    test('renders all navigation links', () => {
        render(<Navbar />)
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('Skills')).toBeInTheDocument()
        expect(screen.getByText('Open Source')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    test('renders the CTA button', () => {
        render(<Navbar />)
        expect(screen.getByText("Let's Talk")).toBeInTheDocument()
    })

    test('toggle menu button exists', () => {
        render(<Navbar />)
        const toggleBtn = screen.getByLabelText('Toggle menu')
        expect(toggleBtn).toBeInTheDocument()
    })

    test('clicking toggle button opens/closes menu', () => {
        render(<Navbar />)
        const toggleBtn = screen.getByLabelText('Toggle menu')

        fireEvent.click(toggleBtn)
        // After clicking, the nav-links should have 'open' class
        const navLinks = document.querySelector('.nav-links')
        expect(navLinks.classList.contains('open')).toBe(true)

        fireEvent.click(toggleBtn)
        expect(navLinks.classList.contains('open')).toBe(false)
    })
})
