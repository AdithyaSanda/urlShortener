import React from 'react'
import Signup from './pages/signup'
import Login from './pages/login'
import { Routes, Route } from 'react-router-dom'
import UrlForm from './components/urlForm'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<UrlForm />}/>
      </Routes>
    </>
  )
}

export default App