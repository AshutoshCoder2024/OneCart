import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

function Nav() {
  let navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { getAdmin } = useContext(adminDataContext);



  const handleLogout = async () => { 
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  }

  return (
    <>
    <div className="w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 left-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black  md:px-[30px] shadow">
      <div className="w-[30%] sm:w-[25%] lg:w-[20%] flex items-center justify-start gap-[10px] cursor-pointer">
        <img src={logo} alt="logo" className="w-[30px]" />
        <h1 className="text-[20px] sm:text-[22px] md:text-[24px] font-sans text-black">
          OneCart
        </h1>
      </div>
      <button className="text-[15px] hover:border-[2px] border-[#89daea] bg-[#000000ca] cursor-pointer   px-[20px] py-[10px] rounded-2xl  text-white " onClick={() => { navigate("/login"); handleLogout();}}>
      Logout
    </button>
    </div>
      
    </>
  );
}

export default Nav;
