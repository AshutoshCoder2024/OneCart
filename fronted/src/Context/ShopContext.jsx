import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'


export const ShopDataContext = createContext()

function ShopContext({ children }) {

    let [products, setProduct] = useState([])
    let { serverUrl } = useContext(AuthDataContext)
    let currency = '₹'
    let delivery_fee = 49
    let [search, setSearch] = useState("")
    let [showSearch, setShowSearch] = useState(false)

    // get product 
    
    const getProduct=async()=>{
        try{
            let result=await axios.get(serverUrl + "/api/product/list")
            setProduct(result.data)
            console.log(result.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    
    useEffect(()=>{
        getProduct()
    },[])

    // Add this useEffect to monitor when products state changes
    useEffect(()=>{
        console.log("Products state updated:", products)
    },[products])

    let value={
        products,currency,delivery_fee,getProduct,
        search,setSearch,showSearch,setShowSearch
    }
    return (

        <div>
            <ShopDataContext.Provider value={value}>
                {
                    children
                }
            </ShopDataContext.Provider>
        </div>
    )
}

export default ShopContext