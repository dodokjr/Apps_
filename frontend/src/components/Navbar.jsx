import React from 'react'
import axios from 'axios'
import { useNavigate } from"react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const Logout = async () => {
    try {
     await axios.delete("http://localhost:3100/logout", { withCredentials: true })
     navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
    
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>
          </div>
        </div>
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={Logout} className="button is-light">
                Log out
              </button>
            </div>
          </div>
        </div>
        </div>
    </nav>
  )
}
