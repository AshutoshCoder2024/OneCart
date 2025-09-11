import './App.css'
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import { useContext } from 'react'
import { UserDataContext } from './Context/UserContext'


function App() {
  let { userData } = useContext(UserDataContext)

  return (
    <>
    {userData && <Nav />}
    {/* <Nav /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>

  )
}

export default App
