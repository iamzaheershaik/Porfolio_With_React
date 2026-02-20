import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import GithubActivity from '../sections/GithubActivity'

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

// Mock react-github-calendar
jest.mock('react-github-calendar', () => ({
    GitHubCalendar: () => <div data-testid="github-calendar">GitHub Calendar</div>,
}))

// Mock react-tooltip
jest.mock('react-tooltip', () => ({
    Tooltip: () => <div data-testid="tooltip">Tooltip</div>,
}))

// Mock fetch for repos
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve([
                    {
                        id: 1,
                        name: 'test-repo',
                        html_url: 'https://github.com/iamzaheershaik/test-repo',
                        description: 'A test repository',
                        language: 'JavaScript',
                        stargazers_count: 5,
                        forks_count: 2,
                    },
                ]),
        })
    )
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe('GithubActivity', () => {
    test('renders section title', () => {
        render(<GithubActivity />)
        expect(screen.getByText('Activity')).toBeInTheDocument()
    })

    test('renders section label', () => {
        render(<GithubActivity />)
        expect(screen.getByText('Open Source')).toBeInTheDocument()
    })

    test('renders Contribution Graph heading', () => {
        render(<GithubActivity />)
        expect(screen.getByText('Contribution Graph')).toBeInTheDocument()
    })

    test('renders the GitHub calendar component', () => {
        render(<GithubActivity />)
        expect(screen.getByTestId('github-calendar')).toBeInTheDocument()
    })

    test('renders Latest Repositories heading', () => {
        render(<GithubActivity />)
        expect(screen.getByText('Latest Repositories')).toBeInTheDocument()
    })

    test('fetches repos from GitHub API', async () => {
        render(<GithubActivity />)
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.github.com/users/iamzaheershaik/repos?sort=updated&per_page=6'
        )
    })

    test('renders fetched repos after loading', async () => {
        render(<GithubActivity />)
        const repoName = await screen.findByText('test-repo')
        expect(repoName).toBeInTheDocument()
    })

    test('shows repo description', async () => {
        render(<GithubActivity />)
        const desc = await screen.findByText('A test repository')
        expect(desc).toBeInTheDocument()
    })

    test('shows repo language', async () => {
        render(<GithubActivity />)
        const lang = await screen.findByText('JavaScript')
        expect(lang).toBeInTheDocument()
    })
})
