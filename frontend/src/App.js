import { Route, Routes } from 'react-router-dom'

import './App.scss'

function App () {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<h1>Parmesan</h1>} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>

    </div>
  )
}

export default App
