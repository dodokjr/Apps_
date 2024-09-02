import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from"react-router-dom"

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [msg, setMsg] = useState('');
    const Navigate = useNavigate();
    
    const Login = async(e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:3100/v1/f/login', {
          name: name,
          password: password,
          pin: pin
        }, { withCredentials: true })
        localStorage.setItem("usersToken", res.data.acessToken)
        localStorage.setItem("UserName", name)
        console.log(res.data)
        return Navigate(`/${name}`)
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg)
        }
      }
    }
    useEffect(() => {
    if(localStorage.getItem("usersToken")) {
      return Navigate(`/${name}`)
    }
  },[])
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        Logo
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={Login} className="space-y-6">
        <p className='is-text-centered has-text-danger'>{msg}</p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              UserName
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
              <div className="text-sm">
                <a href="/forgotpassword" className="font-semibold text-white hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Your Pin
            </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-white hover:text-blue-500">
                  Forgot Pin?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="Pin"
                name="pin"
                type="number"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                autoComplete="cc-number webauthn"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
          <button type="submit" href="#_" className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Button Text</span>
          </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not Accounts ?{' '}
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register Now
          </Link>
        </p>
      </div>
    </div>
    
    </>
  )
}
