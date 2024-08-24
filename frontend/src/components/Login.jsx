import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from"react-router-dom"

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [msg, setMsg] = useState('');
    const Navigate = useNavigate();

    const Login = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3100/login', {
                name: name,
                email: email,
                password: password,
                pin: pin
            }, { withCredentials: true })
            return Navigate(`/${name}`)
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="colums is-centered">
            <div className="colums is-4-desktop">
                <form className='box' onSubmit={ Login }>
                    <p className='is-text-centered has-text-danger'>{msg}</p>
                    <div className="field mt-5">
                        <label className="label">Your name</label>
                        <input type="text" className="input" name='name' placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <label className="label">Your Password</label>
                        <input type="password" className="input" name='name' placeholder='Your Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <label className="label">Your Pin</label>
                        <input type="number" className="input" name='name' placeholder='Your Pin' value={pin} onChange={(e) => {setPin(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <button className="button is-success is-fullwidth">Login</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
      </div>
    </section>
  )
}
