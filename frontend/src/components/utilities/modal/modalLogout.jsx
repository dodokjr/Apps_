import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ModalLogout() {
    const [input, setInput] = useState('')
  const [msg, setMsg] = useState('')
    const userId = localStorage.getItem("userId")
  const userData = JSON.parse(userId);
  const Navigate = useNavigate();

  const fecthData = async (e) => {
    e.preventDefault();
    try {
      const _r = await axios.post(`http://localhost:3100/v1/f/logout`, {
        name: userData.name,
        pin: input
      }, { withCredentials: true })
      if(_r) {
        Navigate("/login")
        localStorage.clear(userId)
        localStorage.clear("ctx.UsersAcessToken.true")
      }
    } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg)
          }
    }
  }

  console.log(input)
  return (
    <dialog id="Logout" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">LogOut {userData.name} - {msg}</h3>
    <div className="p-3">
    <form onSubmit={fecthData}>
    <label className="input input-bordered flex items-center gap-2">
    <input type="number" className="grow" placeholder="Your Pin" value={input} onChange={(e) => setInput(e.target.value)} />
    <button type="submit">LogOut</button>
    </label>
    </form>
    </div>
    <div className="">
      <span></span>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  )
}
