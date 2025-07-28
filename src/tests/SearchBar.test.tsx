import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

// Mock useNavigate from react-router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(<MemoryRouter><SearchBar /></MemoryRouter>)
    expect(screen.getByPlaceholderText(/search planets/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls navigate on submit with input value', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<MemoryRouter><SearchBar /></MemoryRouter>)
    const input = screen.getByPlaceholderText(/search planets/i)
    const button = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'Mars' } })
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=Mars')
  })
})


