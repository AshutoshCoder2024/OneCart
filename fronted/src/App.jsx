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
import Contact from "./pages/Contact"


function App() {
  let { userData } = useContext(UserDataContext)
  let location = useLocation()

  return (
    <>
      {userData && <Nav />}
      {/* <Nav /> */}

      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Login />
            )
          }
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        {/* About Route */}
        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to={location.state?.from || "/"} />

            )
          }
        />

        {/* Collection Route */}
        <Route
          path="/collection"
          element={
            userData ? (
              <Collection />
            ) : (

              <Navigate to={location.state?.from || "/"} />
            )
          }
        />

        {/* Contact Route */}
        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
      </Routes>


    </>

  )
}

export default App
