import React from "react";
import Nav from "../components/Nav";
import Slidebar from "../components/Slidebar";

function Home() {
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative ">
      <Nav />
      <Slidebar />
    </div>
  );
}
export default Home;
