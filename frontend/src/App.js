import { useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { UserContext } from './context/UserContext.js'
import './App.scss'
import { Login } from './pages/Login.js'

function App () {
  const [user, setUser] = useContext(UserContext)

  // Check user login status
  useEffect(() => {
    (async () => {
      setTimeout(() => {
        // Temp data while waiting for backend
        const user = { uid: 'uuid128char', username: 'kjafds' }

        setUser(user)
      }, 1000)
    })().catch(() => {
      console.log('ERR')
    })

    return () => {}
  }, [])

  return (
    <div className='app'>

      {JSON.stringify(user ?? 'undefined')}

      <Routes>
        <Route path='/' element={<h1>Parmesan</h1>} />
        
        <Route path='/user/login' element={<Login />}></Route>
        
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>

    </div>
  )
}

export default App
