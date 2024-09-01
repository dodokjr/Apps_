import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const getUsers = async (name) =>
{
    const accessToken = localStorage.getItem("usersToken")
    try
    {
        const res = await axios.get(`http://localhost:3100/v1/f/users/${name}`, {
            headers: {
                Authorization: `Barer ${accessToken}`
            }
        }, { withCredentials: true })
        return res
    } catch (error)
    {
        console.log(error)
    }
}

export const getLogin = async (name, password, pin) =>
{
    try
    {
        const res = await axios.post('http://localhost:3100/v1/f/login', {
            name: name,
            password: password,
            pin: pin
        }, { withCredentials: true })
        localStorage.setItem("usersToken", res.data.acessToken)
        localStorage.setItem("UserName", name)
    } catch (error)
    {
        return error.response.data.msg
    }
}