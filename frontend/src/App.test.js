import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders basic app', () => {
  render(<App />)
  const linkElement = screen.getByText(/Parmesan/i)
  expect(linkElement).toBeInTheDocument()
})
