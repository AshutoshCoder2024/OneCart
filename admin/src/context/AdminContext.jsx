import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthDataContext } from './AuthContext'

export const adminDataContext = createContext()

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null)
  const { serverUrl } = useContext(AuthDataContext)

  const getAdmin = async () => {
    try {

      const result = await axios.get(`${serverUrl}/api/user/getadmin`, {
        withCredentials: true
      });


      setAdminData(result.data)
      console.log("Admin data set:", result.data);

    } catch (error) {
      setAdminData(null)
      console.error("Error fetching admin data:", error);
    }
  }


  useEffect(() => {
    getAdmin();
  }, [])

  
  const value = {
    adminData,
    setAdminData,
    getAdmin
  }

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  )
}

export default AdminContext 
