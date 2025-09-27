import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AuthContext from './Context/AuthContext.jsx';
import './index.css'
import App from './App.jsx'
import UserContext from './Context/UserContext.jsx';
import ShopContext from './Context/ShopContext.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContext>
          <App />
        </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)
