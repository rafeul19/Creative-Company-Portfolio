import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./recent-projects.css";

const projects = [
  {
    id: 1,
    title: "",
    videoUrl: "https://www.youtube.com/shorts/Wt-RvbQVJxE",
    thumbnail: "https://i.ytimg.com/vi/Wt-RvbQVJxE/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLCvZkUBqPHOYoaAaK6kDygVY5miqA",
  },
  {
    id: 2,
    title: "",
    videoUrl: "https://www.youtube.com/shorts/wru19Iu-5XU",
    thumbnail: "https://i.ytimg.com/vi/ORL1Hm-tQAw/oar2.jpg?sqp=-oaymwEoCO8EENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLAYulrRhDbX1O2EoymcorXP56_OTQ",
  },
  {
    id: 3,
    title: "",
    videoUrl: "https://www.youtube.com/shorts/QTTfz4rodKo",
    thumbnail: "https://i.ytimg.com/vi/QTTfz4rodKo/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLAZVdsllVktB2GWif-OowLpA7153Q",
  },
];

export default function RecentProjects() {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Center "Animation Project" on load
  const initialSlide = Math.max(0, projects.findIndex((p) => p.title === "Animation Project") - 1);

  // External arrow handlers
  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };
  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Disable default arrows
    autoplay: false,
    initialSlide: initialSlide,
    rtl: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="recent-projects-container" style={{position: "relative"}}>
      {/* Left Arrow */}
      <button
        className="external-arrow external-prev"
        aria-label="Previous"
        onClick={handlePrev}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 6-6 6 6 6"></path>
        </svg>
      </button>

      <div className="header-section">
        <div className="gradient-bg"></div>
        <div className="header-content">
          <h1 className="main-title">
            A Deeper Look at Timeless Design<br /> 
          </h1>
        </div>
      </div>

      <div className="slider-section right-align-slider">
        <Slider {...sliderSettings} ref={sliderRef}>
          {projects.map((item) => (
            <div key={item.id} className="slide-container">
              <div className="video-item video-item-large">
                <div className="video-wrapper">
                  <ReactPlayer
                    url={item.videoUrl}
                    width="100%"
                    height="100%"
                    playing={false}
                    loop={true}
                    muted={true}
                    controls={false}
                    light={item.thumbnail}
                    playIcon={
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          background: "rgba(0,0,0,0.5)",
                          borderRadius: "50%",
                          width: 56,
                          height: 56,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="#fff">
                          <polygon points="10,7 26,16 10,25"></polygon>
                        </svg>
                      </div>
                    }
                  />
                  <div className="video-title">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Arrow */}
      <button
        className="external-arrow external-next"
        aria-label="Next"
        onClick={handleNext}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </div>
  );
}