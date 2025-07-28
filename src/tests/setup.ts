import '@testing-library/jest-dom'

//ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../context/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'

describe('ThemeToggle', () => {
  it('renders and toggles theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    // Simulate toggle click
    fireEvent.click(button)
    fireEvent.click(button)
  })
})
