import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { ThemeProvider } from "./context/ThemeContext"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
