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
import Helmett from '../../../components/utilities/helmet';

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
    <Layout title={name}>
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
              <div>@{res.users.name}</div>
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
        <div className='flex justify-center items-center'>
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Post"  defaultChecked/>
  <div role="tabpanel" className="tab-content rounded-box p-6">
  <div className='flex flex-col p-5 gap-4'>
          {res.dataPost.count > 0 ? <PostMap api={res.dataPost}/> : <b className='text-2xl '>No Content</b>}
        </div>
  </div>

  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab"
    aria-label="Tab" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    Tab content 2
  </div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    Tab content 3
  </div>
</div>
        </div>
      </section>
      <ModalFollowers/>
      <ModalFollowing/>
    </Layout>
  )
}
