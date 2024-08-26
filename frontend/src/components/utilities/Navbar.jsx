import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from"react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const [isActive, setisActive] = useState(false)

  const Logout = async () => {
    try {
     await axios.delete("http://localhost:3100/logout", { withCredentials: true })
     localStorage.clear("usersAccessToken")
     navigate("/login")
    } catch (error) {
      navigate("/")
    }
  }
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
         Logo Media Social
        </a>
    
        <a onClick={() => {
            setisActive(!isActive)
          }}
          role='button'
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>
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
    
        </div>
    </nav>
  )
}
