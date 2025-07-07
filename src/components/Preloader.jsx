"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import "./Preloader.css"

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const preloaderRef = useRef(null)
  const containerRef = useRef(null)
  const letterRefs = useRef([])
  const progressRef = useRef(null)
  const progressTextRef = useRef(null)
  const circleRef = useRef(null)
  const circleInnerRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const masterTl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ""
        setLoading(false)
        window.dispatchEvent(new Event("preloaderComplete"))
        document.body.classList.add("preloader-done")
      },
    })

    // Progress animation timeline
    const progressTl = gsap.timeline()

    // Set initial state
    if (circleRef.current) {
      gsap.set(circleRef.current, { scale: 0, opacity: 0, rotation: 0 })
    }
    if (circleInnerRef.current) {
      gsap.set(circleInnerRef.current, { rotation: 0 })
    }
    if (progressRef.current) {
      gsap.set(progressRef.current, { width: "0%" })
    }

    // Animate circle scale/opacity in
    progressTl.to(
      circleRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      },
      1,
    )

    // Animate progress bar, circle, and logo rotation together
    progressTl.to(
      progressRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          // Get current progress (0 to 1)
          const prog = this.progress()
          // Rotate both circles in sync with progress
          if (circleRef.current) gsap.set(circleRef.current, { rotation: prog * 360 })
          if (circleInnerRef.current) gsap.set(circleInnerRef.current, { rotation: prog * 360 })
        },
      },
      2.5
    )

    // Animate progress text
    let progress = { value: 0 }
    progressTl.to(progress, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(progress.value)}%`
        }
      },
    }, 2.5)

    // Text animation timeline
    const textTl = gsap.timeline()
    letterRefs.current.forEach((letter) => {
      if (!letter) return
      gsap.set(letter, { opacity: 0, y: 20, scale: 0.8 })
    })
    letterRefs.current.forEach((letter, index) => {
      if (!letter) return
      textTl.to(
        letter,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        index * 0.08,
      )
    })

    // Calculate total text animation duration
    const textAnimDuration = (letterRefs.current.length - 1) * 0.08 + 0.7

    // Animate circle and logo rotation in sync with text animation
    gsap.to([circleRef.current, circleInnerRef.current], {
      rotation: 360,
      duration: textAnimDuration,
      ease: "power3.out",
      delay: 1, // Start at the same time as textTl (see masterTl.add(textTl, 1))
    })

    // Background color animation
    const colorTl = gsap.timeline()
    colorTl
      .to(preloaderRef.current, {
        backgroundColor: "#111111",
        duration: 2,
        ease: "power2.inOut",
      })
      .to(preloaderRef.current, {
        backgroundColor: "#0a0a0a",
        duration: 2,
        ease: "power2.inOut",
      })

    // Add all timelines to master timeline
    masterTl
      .add(progressTl)
      .add(colorTl, 0)
      .add(textTl, 1)
      .to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = "none"
          }
        },
      })

    return () => {
      masterTl.kill()
      document.body.style.overflow = ""
    }
  }, [])

  if (!loading) return null

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={containerRef} className="preloader-container">
        <div ref={circleRef} className="preloader-circle">
          <div className="preloader-circle-border"></div>
          <div className="preloader-circle-top-border"></div>
          <div className="preloader-circle-inner" ref={circleInnerRef}>
            <div className="preloader-circle-inner-bg"></div>
            <img
              src="/preload.png"
              alt="Logo"
              className="preloader-logo"
              style={{
                width: "60%",
                height: "60%",
                objectFit: "contain",
                position: "absolute",
                top: "20%",
                left: "20%",
                pointerEvents: "none"
              }}
            />
          </div>
        </div>

        <h1 className="preloader-title">
          {["D","I","O","R"," ","V","U","I","T","T","O","N"].map((letter, index) => (
            <span key={index} ref={(el) => (letterRefs.current[index] = el)} className="preloader-letter">
              {letter === " " ? <span className="preloader-space"></span> : letter}
            </span>
          ))}
        </h1>

        {/* Progress bar */}
        <div className="preloader-progress">
          <div ref={progressRef} className="preloader-progress-bar"></div>
        </div>

        {/* Progress text */}
        <div ref={progressTextRef} className="preloader-progress-text">
          0%
        </div>
      </div>
    </div>
  )
}
