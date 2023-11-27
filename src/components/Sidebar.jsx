import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Sidebar = () => {

 let  [pathnam , setPathnam] = useState()

 let handleLink =()=>{
  setPathnam(window.location.pathname)
 }

  return (
    <div className='sidebar'>
        <img src={profile} alt="profile"/>
        <div className='sidebarIcons'>
        <Link to="/page/home" onClick={handleLink}  className={window.location.pathname == "/page/home" ? "sidebaractive" : ""}>
        <FaHome className='sidebarIcon'/>
        </Link>
        <Link to="/page/massage" onClick={handleLink} className={window.location.pathname == "/page/massage" ? "sidebaractive" : ""}>
        <AiOutlineMessage className='sidebarIcon'/>
        </Link>
        <Link to="/page/notification" onClick={handleLink}  className={window.location.pathname == "/page/notification" ? "sidebaractive" : ""}>
        <IoIosNotificationsOutline className='sidebarIcon'/>
        </Link>
        <Link to="/page/setting" onClick={handleLink} className={window.location.pathname == "/page/setting" ? "sidebaractive" : ""}>
        <CiSettings className='sidebarIcon'/>
        </Link>
        <Link>
        <CiSettings className='sidebarIcon'/>
        </Link>
        </div>
    </div>
    
  )
}

export default Sidebar