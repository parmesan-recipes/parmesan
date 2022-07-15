import { UserContext } from '../context/UserContext.js'
import { useContext } from 'react'
import { LoginForm } from '../components/user/LoginForm.js'

export function Login () {
  const [user, setUser] = useContext(UserContext)

  const logout = () => {
    fetch('/api/v1/user/logout', { method: 'post' })
    setUser(undefined)
  }

  if (user) {
    return (
      <div>
        <h1>Logged in as {user.username}</h1>
        <button onClick={logout}>Logout</button>
      </div>
    )
  } else {
    return <LoginForm />
  }
}
