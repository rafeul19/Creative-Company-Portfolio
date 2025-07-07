"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ArrowDown } from "lucide-react"
import "./VideoHero.css"

export default function VideoHero() {
  const [preloaderActive, setPreloaderActive] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  // Handle scroll to content
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  // Add function to scroll to Work section
  const scrollToWork = () => {
    const workSection = document.querySelector('.work-section')
    if (workSection) {
      workSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  useEffect(() => {
    // Listen for preloader completion
    const handlePreloaderComplete = () => {
      setPreloaderActive(false)

      // Create a master timeline for the hero animations
      const masterTl = gsap.timeline({
        delay: 0.5,
      })

      // Animate hero section in
      if (containerRef.current) {
        masterTl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "power2.out" })
      }

      // Animate overlay with a gradient reveal
      if (overlayRef.current) {
        masterTl.fromTo(
          overlayRef.current,
          { opacity: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)" },
          {
            opacity: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=0.5",
        )
      }

      // Animate title with a split text effect
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || ""
        titleRef.current.innerHTML = ""
        titleRef.current.style.opacity = "3"

        // Split text into spans for character animation
        const chars = titleText.split("")
        chars.forEach((char, index) => {
          const span = document.createElement("span")
          span.textContent = char
          span.style.opacity = "0"
          span.style.display = "inline-block"
          titleRef.current?.appendChild(span)

          masterTl.fromTo(
            span,
            {
              opacity: 0,
              scale: 0.8,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.03, // <-- make this smaller for faster animation
              ease: "back.out(0.01)",
              delay: index * 0.001,
            },
            "-=0.001",
          )
        })
      }

      // Animate subtitle
      if (subtitleRef.current) {
        masterTl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
      }

      // Animate CTA
      if (ctaRef.current) {
        masterTl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
      }

      // Animate scroll indicator with a pulsing effect
      if (scrollIndicatorRef.current) {
        masterTl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              // Create a continuous pulse animation
              gsap.to(scrollIndicatorRef.current, {
                y: 10,
                opacity: 0.7,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              })
            },
          },
        )
      }
    }

    window.addEventListener("preloaderComplete", handlePreloaderComplete)

    // Check if preloader is already done
    if (document.body.classList.contains("preloader-done")) {
      handlePreloaderComplete()
    }

    // Handle video loading events
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded successfully")
      setIsLoaded(true)
    }

    const handleError = (e) => {
      console.error("Video loading error:", e)
      setHasError(true)
    }

    // Set up video loop
    const handleVideoEnd = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0 // Reset video to start
        videoRef.current.play() // Play again
      }
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      videoRef.current.addEventListener("error", handleError)
      videoRef.current.addEventListener("ended", handleVideoEnd) // Listen for video end
      videoRef.current.play() // Start playing the video immediately
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        videoRef.current.removeEventListener("error", handleError)
        videoRef.current.removeEventListener("ended", handleVideoEnd)
      }
      window.removeEventListener("preloaderComplete", handlePreloaderComplete)
    }
  }, [])

  return (
    <div ref={containerRef} className={`video-hero ${preloaderActive ? "opacity-0" : "opacity-100"}`}>
      {/* Video */}
      <video ref={videoRef} className="video-hero-video" muted playsInline loop preload="auto">
        <source src="../../assets/MainVideo.mp4" type="video/mp4" />
        <source src="../../assets/MainVideo.mp4" type="video/mp4" /> 
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div ref={overlayRef} className="video-hero-overlay"></div>

      {/* Content */}
      <div className="video-hero-content">
        <h1 ref={titleRef} className="video-hero-title">
          Step &nbsp; Into &nbsp; a &nbsp; World &nbsp;<span className="text-gradient creativity-fast">of &nbsp;Fashion </span>
        </h1>
        <p ref={subtitleRef} className="video-hero-subtitle">
          Crafted with Precision. Built for Purpose. <br />
          <span style={{ whiteSpace: 'nowrap' }}>We don’t just follow trends, We set style and substance.</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="video-hero-cta">
          <button className="btn" onClick={scrollToWork}>
            <span className="btn-text-bold">Discover the Art of Footwear</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="video-hero-scroll" onClick={scrollToContent}>
        <ArrowDown className="video-hero-scroll-icon" />
      </div>
    </div>
  )
}
