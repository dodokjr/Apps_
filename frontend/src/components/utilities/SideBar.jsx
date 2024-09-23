import { useState } from "react";
import { FaHome, FaCompass } from "react-icons/fa";
import { IoIosNotifications, IoMdClose } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const params = useLocation()
    const userAccounts = localStorage.getItem("userId")
    const userData = JSON.parse(userAccounts)
    const Menus = [
      { title: "home", Icons: <FaHome size={25}/>, link: "/home", params: params},
      { title: "Explore", Icons: <FaCompass size={25}/>, link:"/#" },
      { title: "NotifiCations", Icons: <IoIosNotifications size={25}/>, link:"/#" },
      {title: "Upload", Icons: <IoAddCircleOutline size={25}/>, link: "/upload", params: params},
      {title: userData.name, Icons: <CgProfile size={25}/>, link: `/${userData.name}`, params: params}
    ];
  return (
        <div className="flex bottom-full h-full">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-black h-screen p-5  pt-8 relative duration-300`}
      >
        <a
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >{!open ? <GiHamburgerMenu size={25}/> : <IoMdClose size={25}/>}</a>
        <div className="flex gap-x-4 items-center">
          <a
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          >Close</a>
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Los Root
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <NavLink to={Menu.link} className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } ${params.pathname == Menu.link && "bg-slate-700"}`}>
              {Menu.Icons}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Sidebar