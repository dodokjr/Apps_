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
import Follow from './Follow.jsx';
import ResetPassword from './resetPassword.jsx';
import NotFound from '../components/utilities/Notfound.jsx';

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
    path: "/follow/:name",
    element: <Follow/>,
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
    path: "/forgotpassword/:email",
    element: <ResetPassword/>
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
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

export const App = () => {
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}