"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  )
}