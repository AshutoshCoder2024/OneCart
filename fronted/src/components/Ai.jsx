import React, { useContext, useState, useEffect } from 'react'
import ai from "../assets/ai.png"
import { ShopDataContext } from "../Context/ShopContext"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let {showSearch , setShowSearch} = useContext(ShopDataContext)
  let navigate = useNavigate()
  let [activeAi,setActiveAi] = useState(false)
  let [isSupported, setIsSupported] = useState(false)
  let [recognition, setRecognition] = useState(null)
  let openingSound = new Audio(open)

  function speak(message){
    let utterance = new SpeechSynthesisUtterance(message)
    utterance.rate = 0.9
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      console.log("Speech recognition not supported in this browser")
      setIsSupported(false)
      return
    }

    const recognitionInstance = new SpeechRecognition()
    
    // Configure recognition for better compatibility
    recognitionInstance.continuous = false
    recognitionInstance.interimResults = false
    recognitionInstance.lang = 'en-US'
    recognitionInstance.maxAlternatives = 1

    // Event handlers
    recognitionInstance.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      console.log("Speech recognized:", transcript);
      
      if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
        speak("opening search")
        setShowSearch(true) 
        navigate("/collection")
      }
      else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
        speak("closing search")
        setShowSearch(false) 
      }
      else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")){
        speak("opening collection page")
        navigate("/collection")
      }
      else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage") ){
        speak("opening about page")
        navigate("/about")
        setShowSearch(false) 
      }
      else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage") ){
        speak("opening home page")
        navigate("/")
        setShowSearch(false) 
      }
      else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat")){
        speak("opening your cart")
        navigate("/cart")
        setShowSearch(false) 
      }
      else if(transcript.toLowerCase().includes("contact")){
        speak("opening contact page")
        navigate("/contact")
        setShowSearch(false) 
      }
      else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")){
        speak("opening your orders page")
        navigate("/order")
        setShowSearch(false) 
      }
      else{
        toast.error("Try Again")
      }
    }

    recognitionInstance.onend = () => {
      setActiveAi(false)
    }

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setActiveAi(false);
      
      // Handle specific errors
      if (event.error === 'not-allowed') {
        toast.error("Microphone access denied. Please allow microphone access and try again.");
      } else if (event.error === 'no-speech') {
        toast.error("No speech detected. Please try again.");
      } else if (event.error === 'network') {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("Speech recognition failed. Please try again.");
      }
    }

    setRecognition(recognitionInstance)
    setIsSupported(true)
  }, [showSearch, navigate, setShowSearch])

  // Don't render if not supported
  if (!isSupported) {
    return null
  }

  const handleClick = () => {
    if (!recognition) return;
    
    try {
      recognition.start();
      openingSound.play().catch(e => console.log("Audio play failed:", e));
      setActiveAi(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast.error("Could not start speech recognition");
    }
  }
  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] ' onClick={handleClick}>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform` } style={{
        filter: ` ${activeAi?"drop-shadow(0px 0px 30px #00d2fc)":"drop-shadow(0px 0px 20px black)"}`
      }}/>
    </div>
  )
}

export default Ai
