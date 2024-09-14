import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import OutLayout from './OutLayout'

export default function NotFound() {
  const params = useLocation()
  const navigate = useNavigate()
  console.log(params)
  useEffect(() => {
    if(params.pathname == "/") {
      navigate("/home")
    }
  })
  return (
      <OutLayout>
        <div className='px-9 py-8' >
          <div className="text-center">
      <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
      <p className="mb-4 text-lg text-white">What you mean by {params.pathname} doesn't exist</p>
      <div className="animate-bounce">
        <svg className="mx-auto h-16 w-16 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </div>
      <p className="mt-4 text-yellow-50">Let's get you back <a href="/" className="text-blue-500 underline hover:text-warning">home</a>.</p>
    </div>
      </div>
      </OutLayout>
  )
}