import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login.jsx';
import Register from './Register.jsx';
import path from 'path';
import Navbar from '../components/utilities/Navbar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import ProfileApps from './paramsApps/profile/ProfileApps.jsx';
import "../assets/css/App.css"
import SettingProfile from './paramsApps/profile/SettingProfile.jsx';
import Forgotpassword from './forgotpassword.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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
    path: "/dashboard",
    element: [
      <Navbar/>,
      <Dashboard/>
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,

)