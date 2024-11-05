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
import GroupById from './paramsApps/group/groupById.jsx';
import Home from './components_Apps/Home.jsx';
import Exprolers from './components_Apps/Exprolers.jsx';
import NotifiCations from './components_Apps/NotifiCations.jsx';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/exprolers",
    element: <Exprolers/>
  },
  {
    path: "/notif",
    element: <NotifiCations/>
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
    path: "/p/:name",
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
  path: "/group/:id",
  element: <GroupById/>
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