import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers } from 'react-icons/fa'

const AdminSummary = () =>{
    return(
        <div className = "p-6">
            <h3 className = "text-2xl font-bold">Dashboard Overview</h3>
            <div className = "grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon={<FaUsers />} text = "Total Students" number = {10}  color='bg-teal-600'/>
                <SummaryCard icon={<FaUsers />} text = "Total HODs" number = {10} color='bg-teal-600'/>
                <SummaryCard icon={<FaBuilding />} text = "Total Departments" number = {10} color='bg-yellow-600'/>
            </div>
            <div className = "mt-12">
                <h4 className='text-center text-2xl font-bold'>Request Details</h4>
            <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icon={<FaFileAlt />} text = "Request Applied" number = {15}  color='bg-teal-600'/>
            <SummaryCard icon={<FaCheckCircle />} text = "Request Approved" number = {2}  color='bg-green-600'/>
            <SummaryCard icon={<FaHourglassHalf />} text = "Request Pending" number = {7}  color='bg-yellow-600'/>
            <SummaryCard icon={<FaTimesCircle />} text = "Request Rejected" number = {11}  color='bg-yellow-600'/>
            </div>
            </div>
        </div>
    )
}
export default AdminSummary