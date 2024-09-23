import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../components/utilities/layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import instance from '../../../libs/axios/instance';
import { ModalFollowers, ModalFollowing } from '../../../components/profile/modal/modal';
import { ButtonFollow } from '../../../components/profile/assets/ButtonAx';
import {PostMap} from '../../../components/profile/post/post'
import NotFound from '../../../components/utilities/Notfound';
import Loding from '../../../components/utilities/loding';

export default function ProfileApps() {
  const {name} = useParams()
  const [res, setRes] = useState('')
  const userId = localStorage.getItem("userId")
  const userData = JSON.parse(userId);

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
      setRes(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  if(!res) {
    return (
      <Layout>
        <Loding/>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <section className='section'>
        <div className='flex flex-col p-5 gap-4'>
      <div className='grid grid-rows-3 grid-flow-col gap-4'>
      <div className=" row-span-3">
        {/* image */}
        {res.users.isLogin == 1 && <div className="avatar online ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
        <img src={res.users.image_profile ? res.users.image_profile : 'http://localhost:3100/photoProfile/pp.jpg'} alt="" className='rounded-full'/>
        </div>}
        {res.users.isLogin == 0 && <div className="avatar offline ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
        <img src={res.users.image_profile ? res.users.image_profile : 'http://localhost:3100/photoProfile/pp.jpg'} alt="" className='rounded-full'/>
        </div> }
            <div className='text-2xl row-span-2 col-span-2 p-2'>
              <div>@{res.users.name} {res.users.isLogin}</div>
            </div>
        </div>
      </div>

            <ButtonFollow name={name} comName={userData.name}/>
            <div className='grid-cols-3 gap-3'>
            <span>Post {res.dataPost.count}</span>
            <a href='#' onClick={() => document.getElementById("modalFollowers").showModal()}>Followers 100 </a>
            <a href='#' onClick={() => document.getElementById("modalFollowing").showModal()}>Followed 20 </a>
            </div>
            <p>{res.users.bio}</p>
        </div>
        <div className='flex justify-center'>
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Inbox
      <span className="badge badge-sm">99+</span>
    </a>
  </li>
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Updates
      <span className="badge badge-sm badge-warning">NEW</span>
    </a>
  </li>
  <li>
    <a>
      Stats
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
        </div>
        <div className='flex flex-col p-5 gap-4'>
          <PostMap api={res.dataPost}/>
        </div>
      </section>
      <ModalFollowers/>
      <ModalFollowing/>
    </Layout>
  )
}
