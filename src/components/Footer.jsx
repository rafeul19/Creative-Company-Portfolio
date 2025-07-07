import { Link } from "react-router-dom"
import { FaFacebook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-brand-flex">
              
              <div>
                <h3 className="footer-logo">DIOR VUITTON</h3>
                <p className="footer-tagline">Full suite of premium services</p>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact">
                <li>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <FaEnvelope style={{ marginRight: "8px" }} />
                    Email: <a href="mailto:DIORVUITTON@email.com" className="footer-email-link" style={{ marginLeft: "4px" }}>DIORVUITTON@email.com</a>
                  </span>
                </li>
                <li>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                    Address:  Dhaka, Bangladesh
                  </span>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h4 className="footer-heading">Follow Us</h4>
              <ul className="footer-social">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <FaFacebook style={{ marginRight: "8px" }} />
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DIOR VUITTON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
