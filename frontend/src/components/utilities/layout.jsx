import React from 'react'
import Navbar from './Navbar'
import Sidebar from './SideBar'
import OutLayout from './OutLayout'

export default function Layout({children}) {
  const userAccounts = localStorage.getItem("UserName")
  return (
    <>
  <main className='App w-full '>
  <div className=" overflow-hidden flex flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Navbar data={userAccounts} />
                    <div data-accounts={`${userAccounts}`}>
                      {children}
                    </div>
                </div>
            </div>
        </main>
  </>
  )
}
