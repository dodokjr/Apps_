import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bulma/css/bulma.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login.jsx';
import Register from './components/Register.jsx';
import path from 'path';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProfileApps from './apps/paramsApps/ProfileApps.jsx';

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