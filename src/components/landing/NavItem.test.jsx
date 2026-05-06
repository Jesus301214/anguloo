import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavItem from './NavItem'

const mockItems = [
  {
    title: 'Dashboard',
    desc: 'Stats overview',
    icon: <span>📊</span>,
    href: '#dashboard',
  },
  {
    title: 'Settings',
    desc: 'Preferences',
    icon: <span>⚙️</span>,
    href: '#settings',
  },
]

describe('NavItem', () => {
  it('renders the label', () => {
    render(<NavItem label="Menu" items={mockItems} />)
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('shows dropdown items on hover', async () => {
    const user = userEvent.setup()
    render(<NavItem label="Menu" items={mockItems} />)

    const button = screen.getByText('Menu')
    await user.hover(button)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Stats overview')).toBeInTheDocument()
  })
})
