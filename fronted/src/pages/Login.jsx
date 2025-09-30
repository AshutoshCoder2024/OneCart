import React from 'react'
import { useNavigate } from 'react-router-dom';                    <p className='flex gap-[10px]'> You don't have an account<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/registration")}>Create one</span></p>
import { useState, useContext } from 'react';
import logo from "../assets/logo.png";
import Google from "../assets/google.png"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthDataContext } from '../Context/AuthContext';
import axios from "axios"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { UserDataContext } from '../Context/UserContext';



function Login() {
    let navigate = useNavigate();
    let { getCurrentUser } = useContext(UserDataContext)
    const [show, setshow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { serverUrl } = useContext(AuthDataContext)

    // Demo credentials for interviewers
    const DEMO_EMAIL = "user@onecart.com"
    const DEMO_PASSWORD = "user12345"

    const handlelogin = async () => {
        try {
            const result = await axios.post(serverUrl + "/api/auth/login", {
                email, password
            }, { withCredentials: true });
            console.log(result.data);
            getCurrentUser();
            navigate("/");

            // if (result.status === 201) {
            //     alert("login sucessfully ")  // Redirect to home page after successful login
            // }
            
        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please try again.");
            console.error(error);
        }
    }


    const googlelogin = async () => {
        try {
          const response = await signInWithPopup(auth, provider);
          const user = response.user;
          let name = user.displayName;
          let email = user.email;
    
          const result = await axios.post(
            serverUrl + "/api/auth/googlelogin",
            { name, email },
            { withCredentials: true }
          );
          getCurrentUser();
            navigate("/");
          console.log(result.data);
        } catch (error) {
            console.error("Google Signup Error:", error.response?.data || error.message);
        }
      };

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            {/* logo and name  */}
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' >
                <img className='w-[40px]' onClick={() => navigate("/")} src={logo} alt="" />
                <h1 className='text-[22px]' onClick={() => navigate("/")}>OneCart</h1>
            </div>

            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Login  Page</span>
                <span className='text-[16px] '> Welcome to OneCart ,Place Your Order </span>
            </div>

            {/* form  */}
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#0000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>

                <form action="" onSubmit={(e) => { e.preventDefault(); handlelogin() }} className='w-[90%] h-[90%] flex flex-col items-center justify-start  gap-[20px]'>
                    <div onClick={()=>googlelogin()} className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
                        <img src={Google} alt=" " className='w-[30px] ' /> Register with Google
                    </div>


                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]' >
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR<div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>


                    <div className='w-[90%] h-[440px] flex flex-col items-center justify-center gap-[15px] relative'>
                        {/* Demo credentials box */}
                        <div className='w-[100%] border border-[#96969635] rounded-lg p-3 text-sm text-[#e6e6e6] bg-[#0f172a66]'>
                            <div className='flex items-center justify-between'>
                                <span className='font-semibold'>Demo credentials</span>
                                <button type='button' onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); }} className='px-3 py-1 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs'>Use demo</button>
                            </div>
                            <div className='mt-2'>
                                <p>Email: <span className='font-mono'>{DEMO_EMAIL}</span></p>
                                <p>Password: <span className='font-mono'>{DEMO_PASSWORD}</span></p>
                            </div>
                        </div>
                        <input type='email' className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email required' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <div className='w-[100%] relative'>
                          <input type={show ? 'text' : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] pl-[20px] pr-[44px] font-semibold' placeholder='Password required' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                          {!show && <FaRegEyeSlash className='w-[20px] h-[20px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/2' onClick={() => setshow(!show)} />}
                          {show && <FaRegEye className='w-[20px] h-[20px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/2' onClick={() => setshow(!show)} />}
                        </div>


                        <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Log in </button>
                    </div>



                    <p className='flex gap-[10px]'> You don’t have an account<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/signup")}>Create one</span></p>




                </form>


            </div>
        </div >
    )
}

export default Login