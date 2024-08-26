import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../components/utilities/layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import instance from '../../libs/axios/instance';
import "../../assets/css/dashboardProfile.css"

export default function ProfileApps() {
  const {name} = useParams()
  const [res, setRes] = useState('')
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const accessToken = localStorage.getItem("UsersRefreshToken")

    try {
      const res = await instance.get(`http://localhost:3100/users/profile?name=${name}`, {
        headers: {
          Authorization: `Barer  ${accessToken}`
        }
      }, { withCredentials: true })
      setRes(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Layout>
      <section className='section'>
        <div className=' has-1-cols p-3'>
        <div className="colums is-mobile center">
        <div className='title'>Hello World</div>
        <div className='image is-64x64'>
          <img src={res.image_profile} alt=""  className='is-rounded' />
        </div>
        </div>
        </div>
      </section>
    </Layout>
  )
}
