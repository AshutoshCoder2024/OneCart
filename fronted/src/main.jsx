import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AuthContext from './Context/AuthContext.jsx';
import './index.css'
import App from './App.jsx'
import UserContext from './Context/UserContext.jsx';
import ShopContext from './Context/ShopContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContext>
          <App />
          <ToastContainer position="top-center" autoClose={2000} />
        </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)
