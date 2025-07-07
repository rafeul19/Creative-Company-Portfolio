"use client"

import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Preloader from "./components/Preloader"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import Work from "./pages/Work"
import RecentProjects from "./components/ReelsMain/recent-projects"
import CustomCursor from "./components/CustomCursor"
import Thumbnail from "./components/thumbnail/thumbnail"
import ScrollToTop from "./components/ScrollToTop"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for preloader
    const timer = setTimeout(() => {
      setLoading(false)
      // Dispatch event to notify other components that preloader is done
      window.dispatchEvent(new Event("preloaderComplete"))
      // Add a class to body to indicate preloader is done
      document.body.classList.add("preloader-done")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollToTop />
      {loading && <Preloader />}
      <CustomCursor />
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work" element={<Work />} />
          <Route path="/recent-projects" element={<RecentProjects />} />
          <Route path="/Thumbnail" element={<Thumbnail />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
