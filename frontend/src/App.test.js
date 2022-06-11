import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import App from './App'
import { Router } from 'react-router-dom'
import UserProvider from './context/UserContext.js'


test('Renders basic app', () => {
  const history = createMemoryHistory()
  render(
    <UserProvider>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </UserProvider>
  )
  const linkElement = screen.getByText(/Parmesan/i)
  expect(linkElement).toBeInTheDocument()
})

test('Tests 404 for unknown route', () => {
  const history = createMemoryHistory()
  history.push('/ksagf/aksjfhdsf/askjd')
  render(
    <UserProvider>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </UserProvider>
  )
  const linkElement = screen.getByText(/Error/i)
  expect(linkElement).toBeInTheDocument()
})
