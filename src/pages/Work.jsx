"use client"
import { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "./Work.css"

const projects = [
  {
    id: 1,
    title: "Youtube Video 1",
    category: "Youtube Videos",
    description: "Long video 1.",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=0a51AewaL04&ab_channel=SNEAKERSSOCIETY",
    thumbnail: "/images/Home_page/Featured Work/Work 1.jpg",
    aspect: 1.7021,
  },
  {
    id: 2,
    title: "Youtube Video 2",
    category: "Youtube Videos",
    description: " YouTube video.",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=3p6QEgSKR9I&ab_channel=SNEAKERSSOCIETY",
    thumbnail: "/images/Home_page/Featured Work/Work 2.jpg",
    aspect: 1.7021,
  },
  {
    id: 3,
    title: "Youtube Video 3",
    category: "Youtube Videos",
    description: " YouTube video.",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=ktII4tMdN1Y&ab_channel=SNEAKERSSOCIETY",
    thumbnail: "/images/Home_page/Featured Work/Work 3.jpg",
    aspect: 1.7021,
  },
  {
    id: 4,
    title: "Youtube Video 4",
    category: "Youtube Videos",
    description: " YouTube video.",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=k0POUI8pz50&ab_channel=SNEAKERSSOCIETY",
    thumbnail: "/images/Home_page/Featured Work/Work 4.jpg",
    aspect: 1.7021,
  },
  {
    id: 5,
    title: "Youtube Video 5",
    category: "Youtube Videos",
    description: " YouTube video.",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=sZhDQgV1S7I&ab_channel=SNEAKERSSOCIETY",
    thumbnail: "/images/Home_page/Featured Work/Work 5.jpg",
    aspect: 1.7021,
  },
]

const categories = [...new Set(projects.map((p) => p.category))]
const initialCategory = categories[0] || ""

export default function Work() {
  const [filter, setFilter] = useState(initialCategory)
  const [filteredProjects, setFilteredProjects] = useState(
    projects.filter((p) => p.category === initialCategory)
  )
  const [modalVideoUrl, setModalVideoUrl] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    setFilteredProjects(projects.filter((p) => p.category === filter))
  }, [filter])

  const openModal = (url) => {
    setModalVideoUrl(url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalVideoUrl("")
  }

  return (
    <div
      className="work-page"
      style={{
        background: "#000000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: '-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,"Segoe UI",Roboto,sans-serif',
      }}
    >
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Explore Iconic Footwear</h1>
        </div>
      </div>

      <div className="recent-projects-container">
        <div className="header-section">
          <div className="gradient-bg"></div>
          <div className="header-content">
            <h1 className="main-title">
              A Deeper Look at Timeless Design <br />
            </h1>
          </div>
        </div>
      </div>

      {/* Carousel Swiper */}
      {filteredProjects.length > 0 && (
        <section className="carousel-slider-section" style={{ padding: "3rem 0" }}>
          <div id="app" style={{ position: "relative" }}>
            {/* Custom navigation buttons */}
            <button
              ref={prevRef}
              className="swiper-button-prev custom-swiper-nav"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button
              ref={nextRef}
              className="swiper-button-next custom-swiper-nav"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>

            <Swiper
              modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
                swiper.navigation.init()
                swiper.navigation.update()
              }}
              pagination={{
                el: ".custom-swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 2.5,
                slideShadows: false,
              }}
              className="swiper-carousel"
            >
              {filteredProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="custom-thumbnail-wrapper">
                    <div
                      className="youtube-thumbnail"
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${project.title}`}
                      onClick={() => openModal(project.videoUrl)}
                      onKeyDown={(e) => e.key === "Enter" && openModal(project.videoUrl)}
                    >
                      <img
                        alt={`Thumbnail for ${project.title}`}
                        className="thumbnail-img"
                        src={project.thumbnail}
                      />
                      <div className="play-button-center">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <div className="custom-swiper-pagination"></div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="video-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-label="Video Modal"
        >
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <ReactPlayer url={modalVideoUrl} playing controls width="100%" height="100%" />
            <button className="modal-close-button" onClick={closeModal} aria-label="Close Video">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
