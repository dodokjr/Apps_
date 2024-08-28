import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from"react-router-dom"
import instance from '../libs/axios/instance';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  },[])


  const getUsers = async () => {
    const token = localStorage.getItem("usersAccessToken")
    try {
      const respons = await instance.get("http://localhost:3100/users", {
        headers: {
          Authorization: `Barer  ${token}`
        }
      })
      console.log(respons)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container mt-5'>
        <h1>Wallcom Back : {name}</h1>
        <button onClick={getUsers} className='button is-info'>get Tabel Users</button>
    </div>
  )
}


export default Dashboard;