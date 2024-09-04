import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Atifity() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [msg, setMsg] = useState('')
    const clik = async (e) => {
        e.preventDefault();
        try {
            const r = await axios.get(`http://localhost:3100/v1/f/activate/${id}`)
            navigate("/login")
        } catch (error) {
            setMsg(error.response.data.message)
        }
    }
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        Logo
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        {msg ? <span className='text-red-600'>{msg}</span> : <div>Actifity your account {id}</div>}
        </h2>
      </div>
        <div className='p-3'>
          <button type="submit" onClick={clik} className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Send Your Actifity <strong>{id}</strong></span>
          </button>
          </div>
    </div>
  )
}
