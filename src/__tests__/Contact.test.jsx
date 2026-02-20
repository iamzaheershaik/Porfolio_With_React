import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Contact from '../sections/Contact'

// Mock GSAP and ScrollTrigger
jest.mock('gsap', () => ({
    __esModule: true,
    default: {
        registerPlugin: jest.fn(),
        context: jest.fn((fn) => {
            fn()
            return { revert: jest.fn() }
        }),
        fromTo: jest.fn(),
    },
}))

jest.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {},
}))

describe('Contact', () => {
    test('renders section title', () => {
        render(<Contact />)
        expect(screen.getByText('work together')).toBeInTheDocument()
    })

    test('renders email info', () => {
        render(<Contact />)
        expect(screen.getByText('zaheershaik0323@gmail.com')).toBeInTheDocument()
    })

    test('renders phone number', () => {
        render(<Contact />)
        expect(screen.getByText('+91 9390056219')).toBeInTheDocument()
    })

    test('renders location text', () => {
        render(<Contact />)
        expect(screen.getByText('Surat, Gujarat')).toBeInTheDocument()
    })

    test('location links to Google Maps with correct coordinates', () => {
        render(<Contact />)
        const locationLink = screen.getByText('Surat, Gujarat').closest('a')
        expect(locationLink).toHaveAttribute('href', 'https://www.google.com/maps/@21.2423391,72.8853639,21z')
        expect(locationLink).toHaveAttribute('target', '_blank')
    })

    test('renders map iframe in popup', () => {
        render(<Contact />)
        const iframe = document.querySelector('iframe[title="My Location"]')
        expect(iframe).toBeInTheDocument()
        expect(iframe.getAttribute('src')).toContain('21.2423391')
        expect(iframe.getAttribute('src')).toContain('72.8853639')
    })

    test('renders availability status', () => {
        render(<Contact />)
        expect(screen.getByText('Available for work · Anywhere in India')).toBeInTheDocument()
    })

    test('renders the contact form', () => {
        render(<Contact />)
        expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Your Message...')).toBeInTheDocument()
    })

    test('renders submit button', () => {
        render(<Contact />)
        expect(screen.getByText('🚀 Send Message')).toBeInTheDocument()
    })

    test('renders social links', () => {
        render(<Contact />)
        const githubSocial = document.querySelector('a[title="GitHub"]')
        const linkedinSocial = document.querySelector('a[title="LinkedIn"]')
        expect(githubSocial).toBeInTheDocument()
        expect(linkedinSocial).toBeInTheDocument()
    })
})
