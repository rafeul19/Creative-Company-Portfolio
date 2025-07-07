"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Timeline.css"

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    
    title: "The Architect",
    description:
      "Clean lines, bold structure, minimalist elegance.Perfect for professionals who command boardrooms and brunches alike.",
    },
  {
    
    title: "The Rebel",
    description:
      "Edge meets elegance — think metallic finishes, asymmetrical cuts, and fearless color.",
  },
  {
    
    title: "The Muse",
    description:
      "Romantic silhouettes, soft textures, and timeless grace. Designed for dreamers, creators, and lovers of poetic fashion.",
  },
  {
    
    title: "The Visionary",
    description:
      "Futuristic design, eco-conscious materials, and tech-luxe details. For forward-thinkers who lead with purpose and style.",
  },
  {

    title: "The Icon",
    description:
      "Classic luxury reimagined — heritage-inspired, modernized, and made to last.",
  },

]

const FlowerIcon = ({ progress }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flower-icon"
    style={{ transform: `scale(${progress})` }}
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 8C12 8 14 10 14 12C14 14 12 16 12 16C12 16 10 14 10 12C10 10 12 8 12 8Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Optional GSAP animation for timeline events (in addition to Framer Motion)
  useEffect(() => {
    gsap.fromTo(
      ".timeline-event",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    )
  }, [])

  return (
    <section ref={containerRef} className="timeline-section">
      <div className="timeline-container">
        <motion.div
          className="timeline-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="timeline-title">Step behind the scenes of perfection.</h2>
          
        </motion.div>

        <div className="timeline-content">
          {/* Vertical line */}
          <motion.div
            className="timeline-line"
            style={{ scaleY: scaleX }}
          />

          {/* Flower icon */}
          <motion.div
            className="timeline-flower"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <FlowerIcon progress={useTransform(scrollYProgress, [0, 1], [0.5, 1])} />
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() =>
                setExpandedEvent(expandedEvent === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({ event, index, isExpanded, onToggle }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <motion.div
      ref={ref}
      className={`timeline-event ${index % 2 === 0 ? "reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="timeline-spacer" />
      <div className="timeline-icon-container">
        <div className="timeline-icon">
          <div className="timeline-icon-inner" />
        </div>
      </div>
      <motion.div
        className="timeline-event-content"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="event-card">
          <span className="event-year">{event.year}</span>
          <h3 className="event-title">{event.title}</h3>
          <p className="event-description">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="event-details"
          >
            <p>{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}