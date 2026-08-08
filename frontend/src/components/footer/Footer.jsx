import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
        <p className="footer-subtitle">Built with ❤️ for productivity.</p>
      </div>
    </footer>
  )
}

export default Footer