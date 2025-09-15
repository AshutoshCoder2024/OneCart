import { useContext, useState } from "react";

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";
import Add from "./pages/Add.jsx";
import { adminDataContext } from "./context/AdminContext";

function App() {
  const { adminData } = useContext(adminDataContext);
  return (
    <>
      {!adminData ? (
        <Login></Login>
      ) : (
        <>
          {
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/add" element={<Add></Add>}></Route>
              <Route path="/lists" element={<List></List>}></Route>
              <Route path="/orders" element={<Orders></Orders>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
          }
        </>
      )}
    </>
  );
}

export default App;
