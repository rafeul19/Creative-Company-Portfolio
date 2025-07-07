"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import "./Markrun.css"

export default function Markrun() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".markrun-motion", {
        x: "-50%", // Continually moves the text from right to left
        repeat: -1, // Endless scrolling
        duration: 20, // Speed of the scrolling
        ease: "linear", // Smooth linear scroll
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="markrun-container" ref={marqueeRef}>
      <div className="gradient-overlay" />
      <div className="markrun-motion">
        {[...Array(2)].map((_, loopIndex) => (
          <div className="markrun-group" key={loopIndex}>
            {[...Array(20)].map((_, index) => (
              <div key={index} className="markrun-item">
                <span className="markrun-text">DIOR  VUITTON</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
