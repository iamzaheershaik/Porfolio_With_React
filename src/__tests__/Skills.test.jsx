import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Skills from '../sections/Skills'

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

describe('Skills', () => {
    test('renders the section label', () => {
        render(<Skills />)
        expect(screen.getByText('Skills & Expertise')).toBeInTheDocument()
    })

    test('renders the section title', () => {
        render(<Skills />)
        expect(screen.getByText('tech stack')).toBeInTheDocument()
    })

    test('renders Frontend category heading', () => {
        render(<Skills />)
        expect(screen.getByText('Frontend')).toBeInTheDocument()
    })

    test('renders Backend category heading', () => {
        render(<Skills />)
        expect(screen.getByText('Backend')).toBeInTheDocument()
    })

    test('renders Tools category heading', () => {
        render(<Skills />)
        expect(screen.getByText('Tools')).toBeInTheDocument()
    })

    test('renders all Frontend skills', () => {
        render(<Skills />)
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('HTML5')).toBeInTheDocument()
        expect(screen.getByText('CSS3')).toBeInTheDocument()
        expect(screen.getByText('Bootstrap')).toBeInTheDocument()
    })

    test('renders all Backend skills', () => {
        render(<Skills />)
        expect(screen.getByText('Node.js')).toBeInTheDocument()
        expect(screen.getByText('Express.js')).toBeInTheDocument()
        expect(screen.getByText('MongoDB')).toBeInTheDocument()
    })

    test('renders all Tools skills', () => {
        render(<Skills />)
        expect(screen.getByText('Git')).toBeInTheDocument()
        expect(screen.getByText('GitHub')).toBeInTheDocument()
        expect(screen.getByText('Linux')).toBeInTheDocument()
        expect(screen.getByText('VS Code')).toBeInTheDocument()
    })

    test('renders correct number of skill items', () => {
        render(<Skills />)
        const skillItems = document.querySelectorAll('.skill-icon-item')
        // 5 frontend + 3 backend + 4 tools = 12
        expect(skillItems.length).toBe(12)
    })
})
