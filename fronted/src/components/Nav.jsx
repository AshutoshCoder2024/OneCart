import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleSharp, IoCartSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { UserDataContext } from '../Context/UserContext'

function Nav() {
  const { userData } = useContext(UserDataContext)

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 flex items-center justify-between px-[30px] shadow'>
      {/* Logo */}
      <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer'>
        <img src={logo} alt="logo" className='w-[30px]' />
        <h1 className='text-[24px] font-semibold text-black'>OneCart</h1>
      </div>

      {/* Nav Links */}
      <div className='w-[40%]'>
        <ul className='flex items-center justify-center gap-[30px] text-[18px] font-medium text-white'>
          {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
            <li
              key={item}
              className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div className='w-[30%] flex items-center justify-end gap-[20px] relative'>
        <IoSearchCircleSharp className='w-[38px] h-[38px] text-black cursor-pointer' />

        {/* User Icon / Initial */}
        {!userData?.name ? (
          <FaUserCircle className='w-[29px] h-[29px] text-black cursor-pointer' />
        ) : (
          <div className='w-[30px] h-[30px] bg-[#080808] rounded-full flex items-center justify-center text-white font-semibold'>
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}

        {/* Cart */}
        <div className="relative">
          <IoCartSharp className='w-[38px] h-[38px] text-black cursor-pointer' />
          <span className='absolute -top-1 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px]'>
            10
          </span>
        </div>
      </div>
    </div>
  )
}

export default Nav
