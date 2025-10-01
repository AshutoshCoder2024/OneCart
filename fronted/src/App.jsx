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
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Ai from './components/Ai'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


function App() {
  let { userData } = useContext(UserDataContext)
  let location = useLocation()

  return (
    <>
      <Nav />

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

        {/* Public Home Route */}
        <Route path="/" element={<Home />} />

        {/* About Route (public) */}
        <Route path="/about" element={<About />} />

        {/* Collection Route (public) */}
        <Route path="/collection" element={<Collection />} />

        {/* Contact Route (public) */}
        <Route path="/contact" element={<Contact />} />

        {/* Cart Route (public) */}
        <Route path="/cart" element={<Cart />} />

        {/* Orders Route (public) */}
        <Route path="/order" element={<Orders />} />
      </Routes>

      {userData && <Ai />}
      <ToastContainer position="top-center" autoClose={2000} />
    </>

  )
}

export default App
