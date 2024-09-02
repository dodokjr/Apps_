import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [conformpassword, setConformPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()
    const {email} = useParams()
    
    useEffect(() => {
    if(!localStorage.getItem("resetToken")) return navigate("/login")
        validasi()
    }, [])

    const validasi = async () => {
        try {
            await axios.get(`http://localhost:3100/v1/f/email/${email}`)
        } catch (error) {
            localStorage.clear("resetToken")
            return navigate("/login")
        }
    }
    const SumbitResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3100/v1/f/forgotpasword/${email}`, {
                password: password,
                conformPassword: conformpassword
            })
            localStorage.clear("resetToken")
            return navigate("/login")
        } catch (error) {
            setMsg(error.response.data.msg)
        }
    }
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        Logo
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Reset Password And New Creat password {email}
        </h2>
      </div>
      
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>{msg}</div>
        <form onSubmit={SumbitResetPassword} className="space-y-6">

          <div>
            <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              New Password
            </label>
            </div>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              New ConformPassword
            </label>
            </div>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={conformpassword}
                onChange={(e) => setConformPassword(e.target.value)}
                required
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

      </div>
    </div>
    </>
  )
}
