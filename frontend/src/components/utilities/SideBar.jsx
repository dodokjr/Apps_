import { useState } from "react";
import { FaHome, FaCompass } from "react-icons/fa";
import { IoIosNotifications, IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "home", Icons: <FaHome size={25}/> },
      { title: "Explore", Icons: <FaCompass size={25}/> },
      { title: "NotifiCations", Icons: <IoIosNotifications size={25}/> }
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
              {Menu.Icons}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Sidebar