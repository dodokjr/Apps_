import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login.jsx';
import Register from './Register.jsx';
import Navbar from '../components/utilities/Navbar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import ProfileApps from './paramsApps/profile/ProfileApps.jsx';
import "../assets/css/App.css"
import SettingProfile from './paramsApps/profile/SettingProfile.jsx';
import Forgotpassword from './forgotpassword.jsx';
import EditProfile from './paramsApps/profile/EditProfile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: "Hello world",
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/:name",
    element: <ProfileApps/>
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword/>
  },
  {
    path: "/account/setting",
    element: <SettingProfile/>
  },
  {
    path: "/account/edit",
    element: <EditProfile/>
  },
  {
    path: "/dashboard",
    element: [
      <Navbar/>,
      <Dashboard/>
    ]
  }
]);

export const App = () => {
  return(
    <main>
      <RouterProvider router={router}/>
    </main>
  )
}