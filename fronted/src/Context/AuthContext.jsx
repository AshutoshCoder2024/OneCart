import React from 'react'
import { createContext } from 'react' 

export  const  AuthDataContext = createContext()

function AuthContext({ children }) {
    const serverUrl = "https://onecart-backend-3m2d.onrender.com"
    // const serverUrl = "http://localhost:8000"

    const value = {
        serverUrl
    }
    
    return (
        
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthContext
