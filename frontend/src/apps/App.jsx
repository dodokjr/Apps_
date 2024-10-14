import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
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
import Atifity from './Atifity.jsx';
import PostUrl from './paramsApps/profile/postUrl/PostUrl.jsx';
import ViewPost from './paramsApps/profile/postUrl/ViewPost.jsx';
import instance from '../libs/axios/instance.js';
import Groups from './paramsApps/group/groups.jsx';
import CreateGroups from './paramsApps/group/createGroups.jsx';

const router = createBrowserRouter([
  {
    path: "/home",
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
    path: "/actifity/:id",
    element: <Atifity/>,
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
  path: "/upload",
  element: <PostUrl/>
 },
 {
  path: "/post/:id",
  element: <ViewPost/>
 },
 {
  path: "/group",
  element: <Groups/>
 },
 {
  path: "/group/create",
  element: <CreateGroups/>
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