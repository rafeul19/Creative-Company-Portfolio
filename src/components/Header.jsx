"use client"

import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import { Sun, Moon, Menu, X } from "lucide-react"
import "./Header.css"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/images/Home_page/Header/logo_header.png" className="logo-img" />
        </Link>

    <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            <button className="btn-52 nav-desktop-only">
              <div className="original">Home</div>
              <div className="letters">
                <span>H</span>
                <span>O</span>
                <span>M</span>
                <span>E</span>
              </div>
            </button>
            <span className="nav-mobile-only">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            <button className="btn-52 nav-desktop-only">
              <div className="original">About</div>
              <div className="letters">
                <span>A</span>
                <span>B</span>
                <span>O</span>
                <span>U</span>
                <span>T</span>
              </div>
            </button>
            <span className="nav-mobile-only">About</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/services" className={location.pathname === "/services" ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            <button className="btn-52 nav-desktop-only">
              <div className="original">Services</div>
              <div className="letters">
                <span>S</span>
                <span>E</span>
                <span>R</span>
                <span>V</span>
                <span>I</span>
                <span>C</span>
                <span>E</span>
                <span>S</span>
              </div>
            </button>
            <span className="nav-mobile-only">Services</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={() => setIsMenuOpen(false)}>
            <button className="btn-52 nav-desktop-only">
              <div className="original">Contact - US</div>
              <div className="letters">
                <span>C</span>
                <span>O</span>
                <span>N</span>
                <span>T</span>
                <span>A</span>
                <span>C</span>
                <span>T</span>
                <span>&nbsp;</span>
                <span>-</span>
                <span>&nbsp;</span>
                <span>U</span>
                <span>S</span>
              </div>
            </button>
            <span className="nav-mobile-only">Contact-us</span>
          </Link>
        </li>
      </ul>
    </nav>
          

          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
