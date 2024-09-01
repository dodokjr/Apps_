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
    // const [input, setInput] = useState(res.bio)
    // const [name, setName] = useState(res.name)
    const [file, setFile] = useState(null)
    const [updateImageMsg, setUpdateImageMsg] = useState('')

  const navigate = useNavigate()
  const comName = localStorage.getItem("UserName")
  
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const accessToken = localStorage.getItem("usersToken")

    try {
      const res = await axios.get(`http://localhost:3100/v1/f/users/${comName}`, {
        headers: {
          Authorization: `Barer ${accessToken}`
        }
      }, { withCredentials: true })
      setRes(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const heandelSubmit = async (e) => {
  //   console.log(file ,name, input)
  //   e.preventDefault();
  //   try {
  //       await axios.put("http://localhost:3100/users/update/edit", {
  //           _id: res.id,
  //           name: name,
  //           bio: input
  //       })

  //   } catch (error) {
  //       console.log(error)
  //   }
  // }

  const heandelSubmitUpdateImage = async (e) => {
    e.preventDefault()
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    axios.post(`http://localhost:3100/v1/f/pp/${res.userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setUpdateImageMsg(response.data.msg);
      })
      .catch((error) => {
        console.log(error)
      });
  }
    return (
    <Layout>
        <div className='p-3 flex justify-center'>
            <div className='flex flex-col gap-3'>
             <MenuEdit/>
             <div>

              <form onSubmit={heandelSubmitUpdateImage}>
                <span className='text-red-500'>{updateImageMsg}</span>
            <div role="alert" className="alert shadow-lg">
            <img src={res.image_profile} alt="img" className="rounded-full" width={70} height={70}/>
            <div>
            <h3 className="font-bold">{res.name}</h3>
            <div className="text-xs">You have 1 unread message</div>
            </div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="btn"/>
                <button className='btn'>Upload</button>
            </div>
                </form>
             
             </div>
            </div>
        </div>
    </Layout>
  )
}
