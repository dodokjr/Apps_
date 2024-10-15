import React, { useEffect, useState } from 'react'
import Layout from '../../../components/utilities/layout';
import { FaUserGroup } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";
import axios from 'axios'

export default function Groups() {
    const [data, setData] = useState('')
    const userId = localStorage.getItem("userId")
    const userData = JSON.parse(userId);

    const response = async () => {
        const r = await axios.get("http://localhost:3100/v1/group/")
        if(r) {
            setData(r.data.data)
        } else {
            console.log("tidak ada data bos!")
        }
    }

    useEffect(() => {
        response()
    }, [])
  return (
    <Layout title={"Groups"}>
        <h1 className='flex justify-center text-xl'>Groups {data.count}</h1>
        <div className='flex justify-center items-center'>
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <a>
        <FaUserGroup size={19}/>
      My Gruops
    </a>
  </li>
  <li>
    <a href='group/create'>
    <MdGroupAdd size={19}/>
      Create Groups
    </a>
  </li>
  <li>
    <a>
      Stats
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
        </div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name Group</th>
        <th>Description</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {data.rows && data.rows.map((r, i) => {
        return(
            <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={r.photoGroup}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{r.nameGroup}</div>
              <div className="text-sm opacity-50">{r.OwnerGrup}</div>
            </div>
          </div>
        </td>
        <td>
          {r.descriptionGroup}
        </td>
        <td>{r.isPrivate == true ? "Private" : "public"}</td>
        <th>
          {r.OwnerGrup === userData.name? <button className="btn btn-ghost btn-xs">My Group</button> : <button className="btn btn-ghost btn-xs">Gabung Group</button>}
        </th>
      </tr>
        )
      })}
    </tbody>
  </table>
</div>
    </Layout>
  )
}
