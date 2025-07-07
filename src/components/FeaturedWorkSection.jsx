"use client"

import "./FeaturedWorkSection.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { FaStar } from "react-icons/fa";



// --- Testimonials Data ---
const testimonials = [
  {
    id: 1,
    name: "Emily Carter",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "Founder & Designer at VelvetStep",
    image: "/assets/review_img/user-2.webp",
    text: [
      "Zara makes shoes that feel like a dream — soft, stylish, and unforgettable.",
      ]
  },
  {
    id: 2,
    name: "James Mitchell",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "CEO & Founder at Brooklyn Sole",
    image: "/assets/review_img/user-1.webp",
    text: [
      "Brooklyn Sole feels like a hometown brand with global quality. Ethan made me a loyal fan.",
     
    ]
  },
  {
    id: 3,
    name: "Sophia Bennett",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "Founder of RioHeelz",
    image: "/assets/review_img/user-3.webp",
    text: [
      "Isabella brings Brazilian flair to footwear — sexy, colorful, and totally wearable.",
          ]
  },
  {
    id: 4,
    name: "Daniel Foster",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "Founder & Product Designer at NeoKicks",
    image: "/assets/review_img/user-4.webp",
    text: [
      "David knows how to blend futuristic design with real-world comfort. Hands down my favorite sneaker brand.",
    ]
  },
    {
    id: 5,
    name: "Olivia Ramirez",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "Founder of Maison LUXE Footwear",
    image: "/assets/review_img/user-5.webp",
    text: [
      "Lena redefines elegance. Her boots are the only ones I wear for evening events.",
    ]
  },
  {
    id: 6,
    name: "Michael Torres",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "CEO & Founder of UrbanStride Footwear",
    image: "/assets/review_img/user-6.webp",
    text: [
      "Marcus doesn’t just sell shoes — he builds confidence with every sole.",
    ]
  },
  {
    id: 7,
    name: "Ava Simmons",
    Rate: (
  <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
    Rating star - <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
  </span>
    ),
    job: "Founder & Creative Director at Luxe Sole Co.",
    image: "/assets/review_img/user-7.webp",
    text: [
      "Sarah’s vision for luxury footwear is unmatched. Every design feels like a masterpiece",
    ]
  }
]

export default function FeaturedWorkSection({ sectionRef, workGridRef }) {
  return (
    <section className="section work-section" ref={sectionRef}>
      <TestimonialsModern />
    </section>
  )
}

export function TestimonialsModern() {
  const [index, setIndex] = useState(0)
  const testimonialRef = useRef(null)

  // GSAP entrance animation
  useEffect(() => {
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
    }
  }, [])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="testimonials-modern-section" ref={testimonialRef}>
      <div className="testimonials-modern-header">
        <div className="testimonials-modern-bg"></div>
        <div className="testimonials-modern-content">
          <div className="testimonials-modern-title">
            <p className="testimonials-modern-heading">
              WHAT ARE THEY SAYING ?
            </p>
          </div>
        </div>
      </div>
      <div className="testimonials-modern-carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.98 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="testimonials-modern-card"
          >
            <div className="testimonials-modern-user-align">
              <img
                className="testimonials-modern-avatar"
                src={testimonials[index].image}
                alt={testimonials[index].name}
              />
              <div className="testimonials-modern-user">
                <p className="testimonials-modern-user-name">{testimonials[index].name}</p>
                <p className="testimonials-modern-user-job">{testimonials[index].job}</p>
                <p className="testimonials-modern-user-Rate">{testimonials[index].Rate}</p>
              </div>
            </div>
            <div className="testimonials-modern-texts">
              {testimonials[index].text.map((t, i) => (
                <p key={i} className="testimonials-modern-text">{t}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="testimonials-modern-nav">
          <button className="testimonials-modern-btn" onClick={prev} aria-label="Previous">
            <ChevronLeft size={28} />
          </button>
          <button className="testimonials-modern-btn" onClick={next} aria-label="Next">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
      {/* Glassy blurred background circle */}
      <div className="testimonials-modern-glass-bg"></div>
    </section>
  )
}