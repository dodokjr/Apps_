import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from"react-router-dom"

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    refreshToken()
  },[])
  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:3100/token', { withCredentials: true })
      setToken(response.data.accesstToken)
      const decode = jwtDecode(response.data.accesstToken)
      setName(decode.name)
      setExpire(decode.exp)
    } catch (error) {
      if(error.response) {
        return navigate("/login")
      }
    }
  }

  const axiosJwt = axios.create()

  axiosJwt.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime()){
      const response = await axios.get('http://localhost:3100/token', { withCredentials: true })
      config.headers.Authorization = `Barer  ${response.data.accesstToken}`;
      setToken(response.data.accesstToken)
      const decode = jwtDecode(response.data.accesstToken)
      setName(decode.name)
      setExpire(decode.exp)
    }
    return config;
  } , (error) => {
    return Promises.reject(error);
  })

  const getUsers = async () => {
    try {
      const respons = await axiosJwt.get("http://localhost:3100/users", {
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