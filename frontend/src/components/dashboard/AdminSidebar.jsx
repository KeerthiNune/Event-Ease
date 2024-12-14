import React from 'react'
import {NavLink} from "react-router-dom"
import {FaTachometerAlt,FaUsers,FaCalendarAlt,FaBuilding,FaCogs} from 'react-icons/fa'

const AdminSidebar = ()=>{
    
    return(
        <div className = "bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className = "bg-teal-600 h-12 flex items-center justify-center">
                <h3 className = "text-2xl text-center font-pacific">Student MS</h3>
            </div>
            <div>
                <NavLink to = "/admin-dashboard"
                className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} no-underline flex items-center text-white space-x-4 py-2.5 rounded`} end> 
                 
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to = "/admin-dashboard/students"
                className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} no-underline flex items-center text-white space-x-4 py-2.5 rounded`} end> 
                    <FaUsers/>
                    <span>Students</span>
                </NavLink>
                <NavLink to = "/admin-dashboard/departments"
                className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} flex items-center text-white space-x-4  py-2.5 rounded no-underline`}> 
                    <FaBuilding />
                    <span>Department</span>
                </NavLink>
                <NavLink to = "/admin-dashboard/request"
                 className = {({isActive}) => `${isActive ? "bg-teal-500" : " "} no-underline flex items-center text-white space-x-4 py-2.5 rounded`}> 
                    <FaCalendarAlt />
                    <span>Requests</span>
                </NavLink>
                <NavLink to = "/admin-dashboard"
                className = "flex items-center text-white space-x-4  py-2.5 rounded no-underline"> 
                    <FaCogs />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}
export default AdminSidebar;