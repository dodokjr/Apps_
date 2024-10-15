import React, { useEffect, useState } from "react";
import Layout from "../../../components/utilities/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import ModalLogout from "../../../components/utilities/modal/modalLogout";



const SettingProfile = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [pin, setPin] = useState('')
    const [email, setEmail] = useState('')
    const [msgP, setMsgP] = useState('')
    const [msgPE, setMsgPE] = useState('')
    if(!localStorage.getItem("ctx.UsersAcessToken.true")) return navigate("/login")
     const userId = localStorage.getItem("userId") 
    const userData = JSON.parse(userId);

    const Logout = async() => {
            try {
                await axios.post("http://localhost:3100/v1/f/logout" , {
                name: userData.name
            })
            localStorage.clear("users")
            localStorage.clear("ctx.UsersAcessToken.true")
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const resetPassword = async(e) => {
        e.preventDefault();
        try {
            const rp = await axios.post(`http://localhost:3100/v1/f/forgotpasword/${userData.email}`,
                {
                    password: password,
                    conformPassword: confPassword
                }
            )
            setMsgP(rp.data.data.msg)
            console.log(rp.data.data.msg)
        } catch (error) {
            if(error.response){
                setMsgPE(error.response.data.msg)
              }
        }
    }
    return(
        <Layout>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                Setting account
            </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="p-2">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    New Your Password
                    </h2>
                        {msgPE ? <div>{msgPE}</div> : <div>{msgP}</div> }
                        <form onSubmit={resetPassword} className="space-y-6">
                        <label className="input input-bordered flex items-center gap-2">
                                <MdOutlinePassword className="h-4 w-4 opacity-70"/>
                                <input type="password" className="grow" value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder="new Password" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        <MdOutlinePassword className="h-4 w-4 opacity-70"/>
                                <input type="password" className="grow" value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)} placeholder="Confim New Password" />
                        </label>
                        <button type="submit" href="#_" className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Sumbit New Password</span>
          </button>
                        </form>
                    </div>
                    {/* New Pin */}
                    <div className="p-2">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        New Your Pin
                    </h2>
                    <form onSubmit={resetPassword} className="space-y-6">
                        <label className="input input-bordered flex items-center gap-2">
                            <FaKey className="h-4 w-4 opacity-40"/>
                                <input type="number" className="grow" value={pin}
                                onChange={(e) => setPin(e.target.value)} placeholder="New Pin" />
                        </label>
                        <button type="submit" href="#_" className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Sumbit New Pin</span>
          </button>
                        </form>
                    </div>
                    {/* New Email */}
                    <div className="p-2">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        New Your Email
                    </h2>
                    <form onSubmit={resetPassword} className="space-y-6">
                        <label className="input input-bordered flex items-center gap-2">
                                <IoIosMail className="h-4 w-4 opacity-70"/>
                                <input type="email" className="grow" value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder="New Email" />
                        </label>
                        <button type="submit" href="#_" className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Sumbit New Email</span>
          </button>
                        </form>
                    </div>
                </div>
                
                <div className="p-3">
                <button onClick={() => document.getElementById("Logout").showModal()} href="#_" className="relative w-full inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-800 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-red-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">LogOut</span>
          </button>
                </div>
            </div>
            <ModalLogout/>
        </Layout>
    )
}

export default SettingProfile;