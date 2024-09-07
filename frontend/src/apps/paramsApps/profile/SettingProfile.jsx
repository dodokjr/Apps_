import React, { useEffect } from "react";
import Layout from "../../../components/utilities/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const SettingProfile = () => {
    const navigate = useNavigate()
    if(!localStorage.getItem("ctx.UsersAcessToken.true")) return navigate("/login")

    const Logout = async() => {
        try {
            await axios.post("http://localhost:3100/v1/f/logout" , {
                name: localStorage.getItem("UserName")
            })
            localStorage.clear("UserName")
            localStorage.clear("ctx.UsersAcessToken.true")
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Layout>
            <div className="p-2">
                <h3 className="flex justify-center">Setting</h3>
                <div className="flex">
                    <button onClick={Logout} className="btn">Logout</button>
                </div>
            </div>
        </Layout>
    )
}

export default SettingProfile;