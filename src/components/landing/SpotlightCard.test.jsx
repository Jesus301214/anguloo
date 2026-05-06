import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpotlightCard from './SpotlightCard'

describe('SpotlightCard', () => {
  it('renders children content', () => {
    render(
      <SpotlightCard>
        <h2>Test Card</h2>
        <p>Card content</p>
      </SpotlightCard>,
    )

    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SpotlightCard className="custom-class">
        <span>Content</span>
      </SpotlightCard>,
    )

    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
