import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './SideBar'

export default function Layout({children}) {
  const userAccounts = localStorage.getItem("users")
  return (
    <>
  <main className='App w-full '>
  <div className=" overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Navbar data={userAccounts}/>
                    <div>
                      {children}
                    </div>
                </div>
            </div>
        </main>
  </>
  )
}
