import React from 'react'
import { useState, useEffect } from 'react'
import Background from '../components/Background'
import Hero from '../components/Hero'
import Product from './Product'
import OurPolicy from '../components/ourpolocy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'

function Home() {
    let heroData = [
        { text1: "30% OFF Limited Offers", text2: "Smart Watches" },
        { text1: "20% OFF New Arrivals", text2: "Best Headphones" },
        { text1: "15% OFF On Orders", text2: "Latest Mobiles" },
        { text1: "10% OFF Special Deals", text2: "Top Laptops" }
    ]

    let [heroCount, setHeroCount] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [])

    return (

        <div className='overflow-x-hidden relative  '>

            <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] '>
                <Background heroCount={heroCount} />
                <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
            </div>

            {/* product  */}
            <div>
                <Product></Product>
                <OurPolicy></OurPolicy>
                <NewLetterBox></NewLetterBox>
                <Footer></Footer>
            </div>
        </div>
    )
}
export default Home

