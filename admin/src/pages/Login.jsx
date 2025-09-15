import React from 'react'
import logo from "../assets/logo.png"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
import axios from 'axios'
import { useContext } from 'react'
import { AuthDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setshow] = useState(false)
    const { serverUrl } = useContext(AuthDataContext)
    let {adminData, getAdmin} = useContext(adminDataContext)
    let navigate = useNavigate()


    const AdminLogin = async () => {
        try {
            if (!email || !password) {
                console.log("Email and password are required");
                return;
            } 
            if (!serverUrl) {
                console.error("Server URL is not configured");
                return;
            }


            const result = await axios.post(`${serverUrl}/api/auth/adminLogin`, {
                email,
                password
            }, {
                withCredentials: true
            });
            console.log("Login successful:", result.data);
            getAdmin();
            navigate("/");
        } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error("Cannot connect to server. Please ensure the backend is running.");
        } else {
            console.error("Admin Login Error:", error.response?.data?.message || error.message);
        }
    }
    }

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            {/* logo and name  */}
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' >
                <img className='w-[40px]' onClick={() => navigate("/")} src={logo} alt="" />
                <h1 className='text-[22px]' onClick={() => navigate("/")}>OneCart</h1>
            </div>

            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Login  Page</span>
                <span className='text-[16px] '> Welcome to OneCart ,Apply to Admin Login      </span>
            </div>

            {/* form  */}
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#0000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

                <form action="" onSubmit={(e) => { e.preventDefault(); AdminLogin() }} className='w-[90%] h-[90%] flex flex-col items-center justify-start  gap-[20px]'>






                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                        <input type='email' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email required' onChange={(e) => setEmail(e.target.value)}></input>
                        <input type={show ? 'text' : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password required' onChange={(e) => setPassword(e.target.value)}></input>

                        {!show && <FaRegEyeSlash className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-50' onClick={() => setshow(!show)} />
                        }
                        {show && <FaRegEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-50' onClick={() => setshow(!show)} />
                        }


                        <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Log in </button>
                    </div>







                </form>


            </div>
        </div >
    )
}

export default Login