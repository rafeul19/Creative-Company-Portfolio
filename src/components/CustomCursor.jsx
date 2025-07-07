"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import "./CustomCursor.css"

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [clientX, setClientX] = useState(-100)
  const [clientY, setClientY] = useState(-100)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let animationFrameId

    // Mouse movement animation
    const onMouseMove = (e) => {
      setClientX(e.clientX)
      setClientY(e.clientY)
    }

    // Smooth animation loop
    const animateCursor = () => {
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: "power2.out",
      })
      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0,
      })
      animationFrameId = requestAnimationFrame(animateCursor)
    }

    // Cursor state changes
    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)
    const onMouseEnterLink = () => setIsActive(true)
    const onMouseLeaveLink = () => setIsActive(false)
    const onMouseEnterWindow = () => setIsHidden(false)
    const onMouseLeaveWindow = () => setIsHidden(true)

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseenter", onMouseEnterWindow)
    document.addEventListener("mouseleave", onMouseLeaveWindow)

    // Add event listeners to all links and buttons
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']")
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", onMouseEnterLink)
      element.addEventListener("mouseleave", onMouseLeaveLink)
    })

    // Start animation loop
    animateCursor()

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseenter", onMouseEnterWindow)
      document.removeEventListener("mouseleave", onMouseLeaveWindow)

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", onMouseEnterLink)
        element.removeEventListener("mouseleave", onMouseLeaveLink)
      })

      cancelAnimationFrame(animationFrameId)
    }
  }, [clientX, clientY])

  return (
    <>
      <div ref={cursorDotRef} className={`custom-cursor-dot ${isHidden ? "hidden" : ""}`} />
      <div ref={cursorRef} className={`custom-cursor ${isActive ? "active" : ""} ${isHidden ? "hidden" : ""}`} />
    </>
  )
}
