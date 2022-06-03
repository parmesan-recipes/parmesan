import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import App from './App'
import { Router } from 'react-router-dom'

test('Renders basic app', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const linkElement = screen.getByText(/Parmesan/i)
  expect(linkElement).toBeInTheDocument()
})

test('Tests 404 for unknown route', () => {
  const history = createMemoryHistory()
  history.push('/ksagf/aksjfhdsf/askjd')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  const linkElement = screen.getByText(/Error/i)
  expect(linkElement).toBeInTheDocument()
})
