import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"

function Background({ heroCount }) {
  
  if (heroCount === 0) {
    return <img src={back1} alt="Product 1" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
  }
  else if (heroCount === 1) {
    return <img src={back2} alt="Product 2"  className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
  }
  else if (heroCount === 2) {
    return <img src={back3} alt="Product 3" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
  }
  else if (heroCount === 3) {
    return <img src={back1} alt="Product 4" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
  }
}

  export default Background