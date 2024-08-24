import React,{useEffect, useState} from 'react'
import axios from"axios"
import { useNavigate } from"react-router-dom"


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [comfPassword, setComfPassword] = useState('');
    const [pin, setpin] = useState('');
    const [msg, setMsg] = useState('')
    const Navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3100/users', {
                name: name,
                email: email,
                password: password,
                confPassword: comfPassword,
                pin: pin
            })
            return Navigate("/login");
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
                <form className='box' onSubmit={ Register }>
                <p className='has-text-denger'>
                    {msg}
                </p>
                <div className="field mt-5">
                        <label className="label">Your name</label>
                        <input type="text" className="input" name='name' placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="field mt-5">
                        <label className="label">Your Email</label>
                        <input type="text" className="input" name='Email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <label className="label">Your Password</label>
                        <input type="password" className="input" name='name' placeholder='Your Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <label className="label">Your Confirm Password</label>
                        <input type="password" className="input" name='name' placeholder='Your Password' value={comfPassword} onChange={(e) => {setComfPassword(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <label className="label">Your Pin</label>
                        <input type="number" className="input" name='name' placeholder='Your Pin' value={pin} onChange={(e) => {setpin(e.target.value)}} />
                    </div>
                    <div className="field mt-5">
                        <button className="button is-success is-fullwidth">Register</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
      </div>
    </section>
  )
}
