"use client"

import { useState } from "react"
import "./Contact.css"
import emailjs from 'emailjs-com'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Replace these with your EmailJS credentials
    const serviceID = ""
    const templateID = ""
    const userID = ""

    try {
      emailjs.send(serviceID, templateID, formData, userID)
        .then(() => {
          setIsSubmitting(false)
          setSubmitSuccess(true)
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })

          // Reset success message after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false)
          }, 5000)
        })
        .catch((err) => {
          setIsSubmitting(false)
          setSubmitError(true)
          console.error("EmailJS Error:", err)
        })
    } catch (err) {
      setIsSubmitting(false)
      setSubmitError(true)
      console.error("Unexpected error:", err)
    }
  }

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Get in touch to start your project</p>
        </div>
      </div>
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-text">
                We'd love to hear from you. Fill out the form or contact us using the information below.
              </p>
              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon">📍</div>
                  <div className="contact-detail-content">
                    <h3 className="contact-detail-title">Address</h3>
                    <p className="contact-detail-text">Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon">📧</div>
                  <div className="contact-detail-content">
                    <h3 className="contact-detail-title">Email</h3>
                    <p className="contact-detail-text">
                      <a href="mailto:DIORVUITTON@email.com" className="contact-email-link">
                        DIORVUITTON@email.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="contact-social">
                <h3 className="contact-social-title">Follow Us</h3>
                <div className="contact-social-links">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="contact-social-link">Facebook</a>

                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                {submitSuccess && (
                  <div className="form-success">
                    Your message has been sent successfully. We'll get back to you soon!
                  </div>
                )}
                {submitError && (
                  <div className="form-error">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn form-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}