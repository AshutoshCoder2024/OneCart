import './App.css'
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { useState } from "react"
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import { useContext } from 'react'
import { UserDataContext } from './Context/UserContext'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'


function App() {
  let { userData } = useContext(UserDataContext)
  let location = useLocation()

  return (
    <>
      {userData && <Nav />}
      {/* <Nav /> */}

      <Routes>


        {/* If a user tries to open /dashboard without logging in → they get redirected to /login with
location.state = { from: "/dashboard" }.

After they log in, since userData now exists → <Navigate> sends them back to /dashboard.

If no previous page is saved, they go to /.  */}
        <Route
          path="/login"
          element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Login />)} />



        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/about" element={<About></About>} />
        <Route path="/collection" element={<Collection></Collection>} />
        <Route path="/product" element={<Product></Product>} />
      </Routes>
    </>

  )
}

export default App
