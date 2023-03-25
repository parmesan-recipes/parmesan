import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { UserContext } from './context/UserContext.js'
import './styles/App.scss'
import { RecipeView } from './pages/RecipeView.js'
import { Login } from './pages/Login.js'
import { Header } from './components/common/Header.js'
import useAsyncEffect from 'use-async-effect'
import { RecipesList } from './pages/RecipesList.js'

function App () {
  const setUser = useContext(UserContext)[1]

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

      {/* {JSON.stringify(user ?? 'undefined')} */}

      <Header />

      <Routes>
        <Route path='/' element={<h1>Parmesan</h1>} />

        <Route path='/recipe/:recipeId' element={<RecipeView />} />
        <Route path='/user/login' element={<Login />} />

        <Route path='/recipes' element={<RecipesList />} />

        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>

    </div>
  )
}

export default App
