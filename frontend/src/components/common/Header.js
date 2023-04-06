import { useContext } from 'react'
import { UserContext } from '../../context/UserContext.js'
import '../../styles/components/Header.scss'
import logo from '../../images/logo.png'

import { Link } from 'react-router-dom'

export function Header () {
  const user = useContext(UserContext)[0]
  return (
    <header>
      <nav>
        <Link to="/"><img src={logo} id="logo" alt="Parmesan logo"/></Link>
        <Link to='/recipes'>Recipes</Link>
      </nav>
      {user && <Link to={`/user/${user.username}`} className="iconLink"><img src={user.icon} alt={`${user.displayName}'s icon`}/></Link>}
      {!user && (
        <div className="accountButtons">
          <Link to={`/user/login`} className="button">Login</Link>
          <Link to={`/user/register`} className="button">Register</Link>
        </div>
      )}

    </header>
  )
}
