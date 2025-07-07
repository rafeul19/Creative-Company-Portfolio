"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoHero from "../components/VideoHero"
import Timeline from "../components/Timeline"
import Code2 from "../components/ReelsMain/recent-projects"
import Markrun from "../components/Markrun"
import Work from "./Work"
import "./Home.css"
import FeaturedWorkSection from "../components/FeaturedWorkSection"
import Thumbnail from "../components/thumbnail/thumbnail"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Analytics } from "@vercel/analytics/react"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const sectionsRef = useRef([])
  const workGridRef = useRef(null)
  const workSectionRef = useRef(null)

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return
      gsap.fromTo(
        section.querySelectorAll(".animate-in"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    })
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Marquee animation for Featured Work
  useEffect(() => {
    const grid = workGridRef.current
    if (!grid) return

    // Reset transform in case of hot reloads
    gsap.set(grid, { x: 0 })

    // Get width of half (original) content
    const firstHalf = grid.children.length / 2
    let distance = 0
    for (let i = 0; i < firstHalf; i++) {
      distance += grid.children[i].offsetWidth
    }

    gsap.to(grid, {
      x: -distance,
      duration: 20,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % -distance)
      }
    })
  }, [])

  // Duplicate items for seamless scroll
  const workItems = [1, 2, 3, 4, 5, 6]
  const marqueeItems = [...workItems, ...workItems]

  return (
    <div className="home">
      <VideoHero />
      <Markrun />

      <section className="section about-section" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <h2 className="section-title animate-in">Who We Are</h2>
              <p className="section-text animate-in"style={{ textAlign: 'justify' }}>
                DIOR VUITTON , we don’t just design shoes we craft statements. Specializing in luxury footwear with cinematic elegance , we transform vision into wearable art, tailored for trendsetters, creators, and bold personalities who demand more from fashion.
              </p>
              <h1 className="section-text animate-in"style={{ textAlign: 'justify' }}>
                <strong>The DIOR VUITTON Difference</strong>
              </h1>
              <p className="section-text animate-in"style={{ textAlign: 'justify' }}>
                From sleek silhouettes and daring heels to precision-crafted soles and vibrant detailing, every pair is designed to command attention and tell a story with every step.
              </p>
              <p className="section-text animate-in" style={{ textAlign: 'justify' }}>
                <strong>Our creations blend high-impact aesthetics , uncompromising comfort , and timeless craftsmanship — made to shine across TikTok, Instagram, YouTube, and beyond. Because at DIOR VUITTON, style isn’t just seen — it’s felt. </strong>
              </p>
              <Link to="/about" className="btn animate-in">
                Learn More
              </Link>
            </div>
            <div className="section-image animate-in">
              <video autoPlay muted loop playsInline>
                <source src="../../assets/About2.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="container">
          <h2 className="section-title text-center animate-in">Our Services</h2>
          <div className="services-grid">
            <div className="service-card animate-in">
              <div className="service-icon">🔮</div>
              <h3 className="service-title">Sparkling Style</h3>
              <p className="service-text"style={{ textAlign: 'justify' }}>Transforming raw footage into mesmerizing visual narratives, we combine precision cuts, seamless transitions, and creative effects to craft content that embodies the essence of fashion and sparkling sophistication .</p>
            </div>
            <div className="service-card animate-in">
              <div className="service-icon">🍁</div>
              <h3 className="service-title">Earth-Conscious Elegance</h3>
              <p className="service-text"style={{ textAlign: 'justify' }}>Handcrafted with premium, sustainable materials — because true luxury respects both beauty and the planet.</p>
            </div>
            <div className="service-card animate-in">
              <div className="service-icon">💗</div>
              <h3 className="service-title">Luxury & Elegance</h3>
              <p className="service-text"style={{ textAlign: 'justify' }}>Our footwear is a celebration of luxurious craftsmanship , timeless silhouettes , and bold sophistication , designed for those who walk with confidence and style.</p>
            </div>
            <div className="service-card animate-in">
              <div className="service-icon">📹</div>
              <h3 className="service-title">Pulse of Fashion</h3>
              <p className="service-text"style={{ textAlign: 'justify' }}>Because in the fashion industry , it’s not just about what’s next — it’s about who dares to redefine it.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn animate-in">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <FeaturedWorkSection sectionRef={workSectionRef} workGridRef={workGridRef} />
      <Work id="work-section" />
      <Markrun />
      <Code2 />
      <Thumbnail />
      <Timeline />
      <Markrun />

      <section className="section cta-section" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title animate-in">Your World-Defined Standard in Footwear</h2>
            <p className="cta-text animate-in">
              No matter where you are in the world, DIOR VUITTON brings creativity to your doorstep. Our global team offers a full suite of premium creative services.
            </p>
            <Link to="/contact" className="btn animate-in">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
