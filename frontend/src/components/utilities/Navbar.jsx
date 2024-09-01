import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from"react-router-dom"
import { FaBars, FaSearch } from "react-icons/fa";
import { ModalSearch } from './modal/modal';

export default function Navbar({
  data
}) {
  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
    </div>
    <div className="navbar-center">
      <a className="btn btn-ghost text-xl">Media Social Root</a>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost btn-circle">
        <FaSearch className="h-5 w-5" onClick={() => document.getElementById("searchBox").showModal()}/>
      </button>
      {data ? <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div>{data}</div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a href={`/${data}`}>Profile</a></li>
          <li><a href='/account/setting'>Setting</a></li>
        </ul>
      </div>: <a href='/login' role="button" className="btn btn-ghost btn-circle">Login</a>}
    </div>
    <ModalSearch/>
  </div>
  )
}
