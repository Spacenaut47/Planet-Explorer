import { render, screen, fireEvent } from '@testing-library/react'
import { FavoritesProvider } from '../context/FavoritesContext'
import { Toaster } from 'sonner'
import Card from '../components/Card'
import type { FavoriteItem } from '../types/context'

const mockItem: FavoriteItem = {
  id: 'toast123',
  title: 'Saturn Rings',
  url: 'https://example.com/saturn.jpg',
}

describe('Card Toast Notifications', () => {
  it('shows toast when adding and removing favorites', async () => {
    render(
      <FavoritesProvider>
        <Card item={mockItem} />
        <Toaster />
      </FavoritesProvider>
    )

    const button = screen.getByRole('button')

    // Add to favorites
    fireEvent.click(button)
    expect(await screen.findByText(/Added to Favorites/i)).toBeInTheDocument()

    // Remove from favorites
    fireEvent.click(button)
    expect(await screen.findByText(/Removed from Favorites/i)).toBeInTheDocument()
  })
})
