import React from 'react'
import Navbar from './Navbar'
import Sidebar from './SideBar'
import OutLayout from './OutLayout'

export default function Layout({children}) {
  const userAccounts = localStorage.getItem("userId")
  const userData = JSON.parse(userAccounts)
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
