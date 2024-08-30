import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Follow() {
  const navigate =  useNavigate()
  if(!localStorage.getItem("goRegister")){
    navigate("/register")
  }
  const { name } = useParams()
  const [image, setImage] = useState(null);
  const [postImage, setPostImage] = useState(null)


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setPostImage(event.target.files[0])
  };

  const fetchData = async (e) => {
    e.preventDefault()
    console.log(postImage)
    try {
      const formData = new FormData();
      formData.append('file', postImage);
      const r = await axios.post("http://localhost:3100/follow", {
        name: name,
        file: postImage
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      localStorage.clear("goRegister")
      navigate(`/${name}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        Logo
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Follow {name}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={fetchData} className="space-y-6">
          <div>
          <div role="alert" className="alert shadow-lg">
          {image && <img className='rounded-full' src={image} alt="Previewed image" />}
          </div>
          <div>
            <input type="file" onChange={onImageChange} className="btn"/>
            </div>
          </div>

          <div>
          <button type="submit" href="#_" class="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Button Text</span>
          </button>
          </div>
        </form>
      </div>
    </div>
    
    </>
  )
}
