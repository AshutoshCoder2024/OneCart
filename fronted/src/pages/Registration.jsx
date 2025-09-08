import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "../assets/logo.png";
import Google from "../assets/google.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthDataContext } from "../Context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { UserDataContext } from '../Context/UserContext';

function Registration() {
  const [show, setshow] = useState(false);

  const { serverUrl } = useContext(AuthDataContext);
  const {getCurrentUser} = useContext(UserDataContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  // Handlesignup
  const handleSignup = async (e) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        { name, email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      getCurrentUser();
            navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const googleSignup = async () => {
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
      console.log(result.data);
    } catch (error) {
        console.error("Google Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      {/* logo and name  */}
      <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
        <img
          className="w-[40px]"
          onClick={() => navigate("/")}
          src={logo}
          alt=""
        />
        <h1 className="text-[22px]" onClick={() => navigate("/")}>
          OneCart
        </h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px] ">
          {" "}
          Welcome to OneCart ,Place Your Order{" "}
        </span>
      </div>

      {/* form  */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#0000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start  gap-[20px]"
        >
          <div
            onClick={() => googleSignup()}
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
          >
            <img src={Google} alt=" " className="w-[30px] " /> Register with
            Google
          </div>

          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="UserName required"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            <input
              type="email"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email required"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <input
              type={show ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shawod-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password required"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>

            {!show && (
              <FaRegEyeSlash
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-28"
                onClick={() => setshow(!show)}
              />
            )}
            {show && (
              <FaRegEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-28"
                onClick={() => setshow(!show)}
              />
            )}

            <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Create Account
            </button>
          </div>

          <p className="flex gap-[10px]">
            {" "}
            You have any Account{" "}
            <span
              className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
