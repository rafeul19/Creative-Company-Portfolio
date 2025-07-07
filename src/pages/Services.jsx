"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et risus at justo accumsan posuere ac vitae quam. ",
    details: [
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
    ],
    icon: "",
    video: "/assets/Services_Video/Motion.mp4",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et risus at justo accumsan posuere ac vitae quam. ",
    details: [
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
    ],
    icon: "",
    video: "/assets/Services_Video/Captions.mp4",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et risus at justo accumsan posuere ac vitae quam. ",
    details: [
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
    ],
    icon: "",
    video: "/assets/Services_Video/Transition.mp4",
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et risus at justo accumsan posuere ac vitae quam. ",
    details: [
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
      "Vestibulum et sem id lectus eleifend congue.",
    ],
    icon: "",
    video: "/assets/Services_Video/reels.mp4",
  },
];

export default function Services() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Set up animations for sections
    sectionsRef.current.forEach((section, index) => {
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
    <div className="services-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Our Services</h1>
        </div>
      </div>

      {services.map((service, index) => (
        <section
          key={service.id}
          className={`section service-detail-section ${
            index % 2 === 1 ? "bg-alt" : ""
          }`}
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <div className="container">
            <div
              className={`service-detail-grid ${
                index % 2 === 1 ? "reverse" : ""
              }`}
            >
              <div className="service-detail-content">
                <div className="service-icon animate-in">{service.icon}</div>
                <h2 className="section-title animate-in">{service.title}</h2>
                <p className="section-text animate-in">{service.description}</p>

                <ul className="service-features">
                  {service.details.map((detail, i) => (
                    <li key={i} className="service-feature animate-in">
                      <span className="service-feature-icon">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="btn animate-in">
                  Inquire About This Service
                </Link>
              </div>
              <div className="service-detail-image animate-in">
                {/* ✅ Fixed: Use service.video directly */}
                <video
                  src={service.video}
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
      ))}

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title animate-in">Ready to start</h2>
            <p className="cta-text animate-in">
              Contact us to discuss how we can bring your vision to life.
            </p>
            <Link to="/contact" className="btn animate-in">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
