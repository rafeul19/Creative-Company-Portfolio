"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./thumbnail.css"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/watch?v=rGawSLRI_Oo",
    thumbnail: "/images/Home_page/Featured Work/Work 5.jpg",
    aspect: 1.7021,
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 4.jpg",
    aspect: 1.7021,
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 3.jpg",
    aspect: 1.7021,
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 2.jpg",
    aspect: 1.7021,
  },
  {
    id: 5,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 1.jpg",
    aspect: 1.7021,
  },
  {
    id: 6,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 3.jpg",
    aspect: 1.7021,
  },
  {
    id: 7,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 5.jpg",
    aspect: 1.7021,
  },
  {
    id: 8,
    videoUrl: "https://www.youtube.com/watch?v=XpunFFS-n8I",
    thumbnail: "/images/Home_page/Featured Work/Work 2.jpg",
    aspect: 1.7021,
  },
  // More video entries ...
]

const categories = [...new Set(projects.map((p) => p.category))]

function VideoThumbnail({ thumbnail, aspect, title }) {
  return (
    <div className="thumbnail-wrapper" style={{ paddingTop: `${100 / aspect}%` }}>
      <div className="youtube-thumbnail">
        <img className="thumbnail-img" src={thumbnail} alt={`Thumbnail for ${title}`} />
      </div>
    </div>
  )
}

export default function Work() {
  const [filter, setFilter] = useState(categories[0] || "")
  const [filteredProjects, setFilteredProjects] = useState([])
  const projectsRef = useRef(null)

  useEffect(() => {
    setFilteredProjects(projects.filter((p) => p.category === filter))
  }, [filter])

  useEffect(() => {
    setFilter(categories[0])
    setFilteredProjects(projects.filter((p) => p.category === categories[0]))
  }, [])

  useEffect(() => {
    if (!projectsRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(".video-marquee-track", {
        x: "-50%",
        ease: "linear",
        repeat: -1,
        duration: 30,
      })
    }, projectsRef)

    return () => ctx.revert()
  }, [filteredProjects])

  return (
    <div className="work-page">
      {/* Hero */}
      
      <div className="recent-projects-container">
      <div className="header-section">
        <div className="gradient-bg"></div>
        <div className="header-content">
          <h1 className="main-title">
            Inside the World of DIOR VUITTON <br />
          </h1>
        </div>
      </div>
      </div>
    
      {/* Horizontal Marquee */}
      <section className="video-marquee-section">
        <div className="video-marquee-container" ref={projectsRef}>
          <div className="video-marquee-track">
            {[...Array(2)].flatMap(() =>
              filteredProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="video-marquee-item"
                >
                  <VideoThumbnail
                    thumbnail={project.thumbnail}
                    aspect={project.aspect}
                    title={project.title}
                  />
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-description">{project.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
