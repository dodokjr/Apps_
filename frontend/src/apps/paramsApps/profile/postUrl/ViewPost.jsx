import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../../../components/utilities/layout'
import { SlOptions } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Comment from '../../../../components/post/comment';

export default function ViewPost() {
    const {id} = useParams()
    const [res, setRes] = useState('')
    const [content, setContent] = useState("")
    const [msg, setMsg] = useState('')
    const name = localStorage.getItem("users")
    const Navigate = useNavigate();
    // respons Post
    const viewPost = async() => {
        try {
            const r = await axios.get(`http://localhost:3100/v1/p/post/p/${id}`)
            if(!r) {
                return(
                    <div className="skeleton h-32 w-32"></div>
                )
            }
            setRes(r.data.data)
            console.log(r.data.data)
        } catch (error) {
            console.log(error.respons)
        }
    }
    useEffect(() => {
        viewPost()
    }, [])

    const deletePost = async() => {
        try {
            const d = await axios.delete(`http://localhost:3100/v1/p/post/d/${id}`)
            if(d.data.succes == true) {
                return Navigate(`/${name.name}`)
            } else {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // post Content 
    const postComment = async (e) => {
        e.preventDefault()
        try {
            const req = await axios.post(`http://localhost:3100/v1/p/comment/p/${id}?name=${name}&c=${content}`) 
            if(req) {
                setMsg(req.data.msg)
            }
        } catch (error) {
            setMsg(error.response.data.msg)
        }
    }
  return (
    <Layout>
        <section className='section' data-token-name={`${id}`}>
        <div className='flex flex-col p-5 gap-4'>
            <div className='grid grid-cols-3 gap-3'>
            <div className='col-span-2'>
            <div className=' flex justify-end'>
            <details className="dropdown">
  <summary className="btn btn-xs"><SlOptions/></summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Update Post</a></li>
    <li><button onClick={deletePost}>Delete Post</button></li>
  </ul>
</details>
            </div>
            {res ? <img src={res.r.ContentUrl} className='w-full' width={350} height={250}/> : <div className="skeleton h-32 w-32"></div>}
            </div>
            <div className='flex flex-col'>
            <div className='grid grid-rows-3 grid-flow-col gap-2'>
            <div className=' row-span-2'>
            {res.r?.user.image_profile ? <div className="avatar ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2">
                <img src={res.r?.user.image_profile ? res.r?.user.image_profile : 'http://localhost:3100/photoProfile/pp.jpg'} alt="" className='rounded-full' width={130} height={90}/>
                </div> : <div className="skeleton rounded-full"></div>}
            </div>
                <div className='row-span-2 col-span-9'>
              {res.r?.user.name ? <div className='text-2xl'>{res.r?.user.name}</div> : <div className='skeleton'></div>}
              {res.r?.createdAt ? <div className='text-sm'>{res.r?.createdAt}</div> : <div className='skeleton'></div>}
            </div>
              <div className='row-span-1 col-span-1 text-2xl'>
              <p>{res.r?.Caption}</p>
              </div>
            </div>
            <div className='secsiont'>
                Comment {res.c?.count}
                <div className='flex flex-col flex-wrap'>
                    <div className='p-2 grid grid-cols-1'>
                {!res ? <div>Eroor</div> : res.c?.rows.map((r, i) => {
                    return(
                            <Comment key={r.commentId} r={r}/>
                    )
                })}
                </div>
                <div className='form'>
                    {msg}
                    <form onSubmit={postComment}>
                        <textarea className="textarea textarea-bordered" placeholder="Comments" value={content} onChange={(e) => setContent(e.target.value)}/>
                        {content && <button type='submit' className='btn'>Post</button>}
                    </form>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </section>
    </Layout>
  )
}
