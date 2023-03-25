import { useContext } from 'react'
import { UserContext } from '../../context/UserContext.js'
import '../../styles/components/Header.scss'

import { Link } from 'react-router-dom'

export function Header () {
  const user = useContext(UserContext)[0]
  return (
    <header>
      <nav>
        <ol>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/recipes'>Recipes</Link></li>
          <li><Link to={user ? `/user/${user.username}` : '/user/login'}>My Profile</Link></li>
        </ol>
      </nav>
    </header>
  )
}
