import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { IoSearchCircleSharp, IoCartSharp, IoSearchCircleOutline } from "react-icons/io5"
import { MdHome } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { BsFillCollectionFill } from "react-icons/bs";
import { AuthDataContext } from "../Context/AuthContext";
import axios from 'axios'
import { ShopDataContext } from "../Context/ShopContext";
import { FaUserCircle } from "react-icons/fa"
import { UserDataContext } from '../Context/UserContext'
// import Order from '../pages/Order'
// import Cart from '../pages/Cart'
import About from '../pages/About'



function Nav() {
  const { userData, getCurrentUser } = useContext(UserDataContext)
  let { serverUrl } = useContext(AuthDataContext)
  let { showSearch, setShowSearch, search, setSearch } = useContext(ShopDataContext)
  const [showprofile, setShowProfile] = useState(false)
  let navigate = useNavigate()

  // handle logout
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex  items-center justify-between px-[30px] shadow-md shadow-black '>
      
      {/* Logo */}
      <div className='w-[30%] sm:w-[25%] lg:w-[20%] flex items-center justify-start gap-[10px] cursor-pointer ' onClick={()=>navigate("/")}>
        <img src={logo} alt="logo" className='w-[30px]' />
        <h1 className='text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black'>OneCart</h1>
      </div>

      {/* Nav Links */}
      <div className='hidden md:flex w-[50%] lg:w-[40%]'>
        <ul className='flex items-center justify-center gap-[20px] lg:gap-[30px] text-[15px] md:text-[16px] font-medium text-white'>
          <li className='hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] md:px-[20px] rounded-2xl' onClick={()=>navigate("/")}>HOME</li>
          <li className='hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] md:px-[20px] rounded-2xl' onClick={()=>navigate("/collection")}>COLLECTION</li>
          <li className='hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] md:px-[20px] rounded-2xl' onClick={()=>navigate("/about")}>ABOUT</li>
          <li className='hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[8px] px-[15px] md:px-[20px] rounded-2xl' onClick={()=>navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      {/* Right Side */}

      <div className='w-[40%] sm:w-[35%] md:w-[30%] flex items-center justify-end gap-[15px] sm:gap-[20px] relative'>
        {showSearch ? (
          <IoSearchCircleSharp 
            className='w-[30px] sm:w-[34px] md:w-[38px] h-[30px] sm:h-[34px] md:h-[38px] text-black cursor-pointer'
            onClick={() => {setShowSearch(!showSearch); navigate('/collection')}}
          />
        ) : (
          <IoSearchCircleOutline 
            className='w-[30px] sm:w-[34px] md:w-[38px] h-[30px] sm:h-[34px] md:h-[38px] text-black cursor-pointer'
            onClick={() => {setShowSearch(!showSearch);navigate("/collection")}}
          />
        )}

        {/* User Icon / Initial */}
        {!userData?.name ? (
          <FaUserCircle className='w-[25px] sm:w-[27px] md:w-[29px] h-[25px] sm:h-[27px] md:h-[29px] text-black cursor-pointer' onClick={() => { setShowProfile(!showprofile); }} />
        ) : (
          <div className='w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] bg-[#080808] rounded-full flex items-center justify-center text-white font-semibold cursor-pointer' onClick={() => setShowProfile(!showprofile)}>
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}

        {/* Cart */}
        <div className="relative hidden md:block" onClick={()=>navigate("/cart")}>
          <IoCartSharp className='w-[32px] sm:w-[35px] md:w-[38px] h-[32px] sm:h-[35px] md:h-[38px] text-black cursor-pointer ' />
          <p className='absolute -top-1 -right-2 w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[8px] sm:text-[9px]'>
            10
          </p>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="w-full h-[70px] sm:h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center px-[10px]">
          <input
            type="text"
            className=" lg:w-[50%] w-[80%] sm:w-[70%] md:w-[50%] h-[50%] sm:h-[60%] bg-[#233533] rounded-[30px] px-[20px] sm:px-[40px] md:px-[50px] placeholder:text-white text-white text-[14px] sm:text-[16px] md:text-[18px]"
            placeholder="Search Here" onChange={(e)=>{setSearch(e.target.value)}} value={search}
          />
        </div>
      )}

      {/* Profile */}
      {showprofile && (
        <div className='absolute w-[180px] sm:w-[200px] md:w-[220px] h-[140px] sm:h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
          <ul className='w-full h-full flex flex-col items-start justify-around py-[10px] text-[15px] sm:text-[16px] md:text-[17px] text-white'>
            {userData ? (
              <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { navigate('/login'); setShowProfile(!showprofile); handleLogout(); getCurrentUser(); }}>LogOut</li>
            ) : (
              <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { navigate('/login'); setShowProfile(!showprofile) }}>Login</li>
            )}
            <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{setShowProfile(!showprofile);navigate("/order") }}>Orders</li>
            <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{setShowProfile(!showprofile);navigate("/about") }}>About</li>
          </ul>
        </div>
      )}

      {/* Bottom Nav (Mobile) */}
      
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px]  text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-white flex items-center justify-center flex-col gap-[2px] ' onClick={()=>navigate("/")}>
          <MdHome className='w-[28px] h-[28px] text-[white] md:hidden'/>Home
        </button>
        <button className='text-white flex items-center justify-center flex-col gap-[2px] '  onClick={()=>navigate("/collection")}>
          <BsFillCollectionFill className='w-[28px] h-[28px] text-[white] md:hidden'/>Collection
        </button>
        <button className='text-white flex items-center justify-center flex-col gap-[2px] ' onClick={()=>navigate("contact")}>
          <RiContactsFill className='w-[28px] h-[28px] text-[white] md:hidden'/>Contact
        </button>
        <button className='text-white flex items-center justify-center flex-col gap-[2px] ' onClick={()=>navigate("/cart")}>
          <IoCartSharp className='w-[28px] h-[28px] text-[white] md:hidden'/>Cart
        </button>
          <p className='absolute w- [18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>10</p>
      </div>
    </div>
  )
}

export default Nav
