import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  const renderFooter = () =>
    render(
      <BrowserRouter>
        <Footer logo="/logo.png" />
      </BrowserRouter>,
    )

  it('renders brand name', () => {
    renderFooter()
    expect(screen.getByText('ANGULO')).toBeInTheDocument()
  })

  it('renders privacy and terms links', () => {
    renderFooter()
    expect(screen.getByText('Privacidad')).toBeInTheDocument()
    expect(screen.getByText('Términos')).toBeInTheDocument()
    expect(screen.getByText('Soporte')).toBeInTheDocument()
  })

  it('renders copyright year', () => {
    renderFooter()
    expect(screen.getByText(/2026 ANGULO/)).toBeInTheDocument()
  })
})
