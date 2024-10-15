import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './SideBar'
import OutLayout from './OutLayout'
import Helmett from './helmet'
import { useLocation, useParams } from 'react-router-dom'
import { useBasePath } from '../../libs/params/useBasePath'

export default function Layout({title, children}) {
  const userAccounts = localStorage.getItem("userId")
  const userData = JSON.parse(userAccounts)
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
  <main className='App w-full '>
  <div className=" overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Navbar data={userData.name} />
                    <div data-accounts={`${userData.userId}`}>
                      {children}
                    </div>
                </div>
            </div>
        </main>
  </>
  )
}
