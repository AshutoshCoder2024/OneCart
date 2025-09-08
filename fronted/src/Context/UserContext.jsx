import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { AuthDataContext } from './AuthContext'

export const UserDataContext = createContext();

function UserContext({ children }) {
    const [userData, setuserData] = useState(null)
    const { serverUrl } = useContext(AuthDataContext)

    const getCurrentUser = async () => {
        try {
            console.log('Fetching current user data from server...');
            const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, { 
                withCredentials: true 
            })
            setuserData(result.data)
            console.log('Current user data:', result.data);

        } catch (error) {
            console.error("Error getting current user data:", error.response?.data || error.message);
            setuserData(null)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    const value = {
        userData,
        setuserData,
        getCurrentUser
    }

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext