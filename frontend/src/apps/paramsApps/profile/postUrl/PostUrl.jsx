import React, { useEffect, useState } from "react";
import Layout from "../../../../components/utilities/layout";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import instance from "../../../../libs/axios/instance";


const PostUrl = () => {
    const navigate = useNavigate()
    const [id, setId]= useState('')
    const [image, setImage] = useState(null);
    const [postImage, setPostImage] = useState(null)
    const [capsion, setCapsion] = useState('')
    const [msg, setMsg] = useState('')
    const name = localStorage.getItem("UserName")
    const Navigate = useNavigate();
    if(!localStorage.getItem("ctx.UsersAcessToken.true")) return navigate("/login")
    
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
          // post
        const post = async(e) => {
          e.preventDefault()
    console.log(postImage)
    try {
      const formData = new FormData();
      formData.append('file', postImage);
      const r = await axios.post(`http://localhost:3100/v1/p/post/u`, {
        file: postImage,
        name: name,
        c: capsion,
        u: id
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setMsg(r.data.msg)
      if(r.data.succes == true) {
        return Navigate(`/${name}`)
      }      
    } catch (error) {
      setMsg(error.response.data.msg)
    }
        }

        useEffect(() => {
          getUsers()
        }, [])
      
      
        const getUsers = async () => {
          const accessToken = localStorage.getItem("ctx.UsersAcessToken.true")
      
          try {
            const res = await instance.get(`http://localhost:3100/v1/f/users/${name}`, {
              headers: {
                Authorization: `Barer ${accessToken}`
              }
            }, { withCredentials: true })
            setId(res.data.data.users.userId)
            console.log(res.data.data)
          } catch (error) {
            console.log(error)
          }
        }
    return(
        <Layout>
            <div className="p-2">
            <section className='section'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Post {name} {msg}
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {image && <img className={msg.ssucces == true ? `hidden` :`w-full`} src={image} alt="Previewed image" />}
                <form className="space-y-6" onSubmit={post}>
                    <label className="block text-sm font-medium leading-6 text-white">Select Your Post</label>
                    <input type="file" onChange={onImageChange} className="file-input w-full max-w-xs" />
                    <label className="block text-sm font-medium leading-6 text-white">Select Your Capsion</label>
                    <textarea name="capsion" className="textarea textarea-primary" value={capsion} onChange={(e) => setCapsion(e.target.value)}></textarea>
                    {image && <div>
          <button type="submit" href="#_" className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Post</span>
          </button>
          </div>}
                    </form>
            </div>
            </div>
            </section>
            </div>
        </Layout>
    )
}

export default PostUrl;