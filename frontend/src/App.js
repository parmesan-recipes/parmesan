import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { UserContext } from './context/UserContext.js'
import './App.scss'
import { Login } from './pages/Login.js'
import useAsyncEffect from 'use-async-effect'

function App () {
  const [user, setUser] = useContext(UserContext)

  // Check if user is logged in
  useAsyncEffect(async () => {
    const userReq = await fetch('/api/v1/user')
    if (userReq.ok) {
      const user = await userReq.json()
      setUser(user)
    }
  }, [])

  return (
    <div className='app'>

      {JSON.stringify(user ?? 'undefined')}

      <Routes>
        <Route path='/' element={<h1>Parmesan</h1>} />

        <Route path='/user/login' element={<Login />} />

        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>

    </div>
  )
}

export default App
