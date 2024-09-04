import React, { useEffect, useState } from 'react'
import Layout from '../../../components/utilities/layout'
import { MenuEdit } from '../../../components/profile/assets/MenuAx'
import { AlertImg } from '../../../components/profile/assets/AlertAx'
import { useNavigate } from 'react-router-dom'
import instance from '../../../libs/axios/instance'
import { InputBio } from '../../../components/profile/assets/InputAx'
import axios from 'axios'

export default function EditProfile() {
    const [res, setRes] = useState('')
    const [image, setImage] = useState(null);
    const [postImage, setPostImage] = useState(null)
    const [updateImageMsg, setUpdateImageMsg] = useState('')
    const [msgError, setMsgError] = useState('')

  const navigate = useNavigate()
  const comName = localStorage.getItem("UserName")
  
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const accessToken = localStorage.getItem("ctx.UsersAcessToken.true")

    try {
      const res = await axios.get(`http://localhost:3100/v1/f/users/${comName}`, {
        headers: {
          Authorization: `Barer ${accessToken}`
        }
      }, { withCredentials: true })
      setRes(res.data.data.users)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

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
      const r = await axios.post(`http://localhost:3100/v1/f/pp/${comName}`, {
        file: postImage
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setUpdateImageMsg(r.data.msg)
    } catch (error) {
      setMsgError(error.response.data.msg)
    }
  }

  console.log(res)
    return (
    <Layout>
        <div className='p-3 flex justify-center'>
            <div className='flex flex-col gap-3'>
             <MenuEdit/>
             <div>

              <form onSubmit={fetchData}>
                <span className='text-red-500'>{msgError ? msgError : updateImageMsg}</span>
            <div role="alert" className="alert shadow-lg">
            <img src={image ? image : res.image_profile} alt="img" className="rounded-full" width={70} height={70}/>
            <div>
            <h3 className="font-bold">{res.name}</h3>
            <div className="text-xs">You have 1 unread message</div>
            </div>
            <input type="file" onChange={onImageChange} className="btn"/>
                <button className='btn'>Upload</button>
            </div>
                </form>
             
             </div>
            </div>
        </div>
    </Layout>
  )
}
