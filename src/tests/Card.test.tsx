import { render, screen, fireEvent } from '@testing-library/react'
import { FavoritesProvider } from '../context/FavoritesContext'
import Card from '../components/Card'
import type { FavoriteItem } from '../types/context'

const mockItem: FavoriteItem = {
  id: 'abc123',
  title: 'Jupiter Storm',
  url: 'https://example.com/jupiter.jpg',
}

describe('Card', () => {
  it('renders title and image', () => {
    render(
      <FavoritesProvider>
        <Card item={mockItem} />
      </FavoritesProvider>
    )

    expect(screen.getByText(/Jupiter Storm/)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockItem.url)
  })

  it('toggles favorite on click', () => {
    render(
      <FavoritesProvider>
        <Card item={mockItem} />
      </FavoritesProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('🤍') // Not favorite initially

    fireEvent.click(button)
    expect(button).toHaveTextContent('❤️')

    fireEvent.click(button)
    expect(button).toHaveTextContent('🤍')
  })
})
