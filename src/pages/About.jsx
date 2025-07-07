"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Set up animations for sections
    sectionsRef.current.forEach((section) => {
      if (!section) return;

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
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="about-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Who We Are</h1>
        </div>
      </div>

      <section
        className="section story-section"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="container">
          <div className="section-grid">
            <div className="section-content">
              <h2 className="section-title animate-in">Our Story</h2>
              <p
                className="section-text animate-in"
                style={{ textAlign: "justify" }}
              >
                Vestibulum et sem id lectus eleifend congue. Donec pretium
                mauris nec ultricies dictum. Phasellus vel interdum lectus.
                Nulla quis accumsan leo. Vestibulum ac leo risus. Nullam lacinia
                nibh eget interdum efficitur. Curabitur interdum nisi id porta
                fermentum.
              </p>
              <p
                className="section-text animate-in"
                style={{ textAlign: "justify" }}
              >
                Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec
                dignissim mi. In pellentesque massa vel malesuada lobortis.
                Praesent ultricies erat placerat aliquam finibus. Pellentesque
                consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor.
                Nunc suscipit ornare neque, a tincidunt neque auctor nec.
              </p>
            </div>
            <div className="section-image animate-in">
              {/* ✅ Changed from img to video */}
              <video
                src="../../assets/About2.mp4"
                type="video/mp4"
                autoPlay
                muted
                loop
                playsInline
                className="service-media"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section mission-section"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="container">
          <div className="section-grid reverse">
            <div className="section-image animate-in">
              {/* ✅ Changed from img to video */}
              <video
                src="../../assets/About2.mp4"
                type="video/mp4"
                autoPlay
                muted
                loop
                playsInline
                className="service-media"
              />
            </div>
            <div className="section-content">
              <h2 className="section-title animate-in">Our Mission</h2>
              <p
                className="section-text animate-in"
                style={{ textAlign: "justify" }}
              >
                Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec
                dignissim mi. In pellentesque massa vel malesuada lobortis.
                Praesent ultricies erat placerat aliquam finibus. Pellentesque
                consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor.
                Nunc suscipit ornare neque, a tincidunt neque auctor nec.
              </p>
              <p
                className="section-text animate-in"
                style={{ textAlign: "justify" }}
              >
                Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec
                dignissim mi. In pellentesque massa vel malesuada lobortis.
                Praesent ultricies erat placerat aliquam finibus. Pellentesque
                consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor.
                Nunc suscipit ornare neque, a tincidunt neque auctor nec.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section values-section"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="container">
          <h2 className="section-title text-center animate-in">Our Values</h2>
          <div className="values-grid">
            <div className="value-card animate-in">
              <div className="value-icon">✨</div>
              <h3 className="value-title">Simplicity</h3>
              <p className="value-text">
Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec dignissim mi. In pellentesque massa vel malesuada lobortis. Praesent ultricies erat placerat aliquam finibus. Pellentesque consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor. Nunc suscipit ornare neque, a tincidunt neque auctor nec.


              </p>
            </div>
            <div className="value-card animate-in">
              <div className="value-icon">🌿</div>
              <h3 className="value-title">Nature</h3>
              <p className="value-text">
Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec dignissim mi. In pellentesque massa vel malesuada lobortis. Praesent ultricies erat placerat aliquam finibus. Pellentesque consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor. Nunc suscipit ornare neque, a tincidunt neque auctor nec.


              </p>
            </div>
            <div className="value-card animate-in">
              <div className="value-icon">🔍</div>
              <h3 className="value-title">Attention to Detail</h3>
              <p className="value-text">
 Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec dignissim mi. In pellentesque massa vel malesuada lobortis. Praesent ultricies erat placerat aliquam finibus. Pellentesque consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor. Nunc suscipit ornare neque, a tincidunt neque auctor nec.


              </p>
            </div>
            <div className="value-card animate-in">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Collaboration</h3>
              <p className="value-text">
Nullam nec lectus nec velit imperdiet auctor in ut sem. In nec dignissim mi. In pellentesque massa vel malesuada lobortis. Praesent ultricies erat placerat aliquam finibus. Pellentesque consectetur nunc eu viverra laoreet. Aliquam vitae ornare dolor. Nunc suscipit ornare neque, a tincidunt neque auctor nec.


              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
