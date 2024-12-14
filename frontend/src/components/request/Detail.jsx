import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () =>{
    const {id} = useParams();
    const [leave,setLeave] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchRequest = async () => {
            try {
             const response = await axios.get(`http://localhost:5000/api/request/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    setLeave(response.data.leave)
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    console.error('Error fetching departments:', error.message);
                    alert('Something went wrong while fetching departments.');
                }
            } 
        };

        fetchRequest();
    }, []); 
    
    const changeStatus = async (id,status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/request/${id}`, {status},{
                   headers: {
                       Authorization: `Bearer ${localStorage.getItem("token")}`
                   }
               });

               if (response.data.success) {
                   navigate("/admin-dashboard/request")
               }
           } catch (error) {
               if (error.response && error.response.data && !error.response.data.success) {
                   alert(error.response.data.error);
               } else {
                   console.error('Error fetching departments:', error.message);
                   alert('Something went wrong while fetching departments.');
               }
           } 
    }
    
    return(
        <>{leave?(
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold md-8 mb-3 text-center'> Request Details </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                <img className='rounded-full border w-72' src='https://media.istockphoto.com/id/2015429231/vector/vector-flat-illustration-in-black-color-avatar-user-profile-person-icon-profile-picture.jpg?s=612x612&w=0&k=20&c=Wu70OARg2npxWy5E22_ZLneabuTafvV_6avgYPhWOoU=' alt='img'/>
            </div>
            <div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Name:</p>
                    <p className='font-medium'>{leave.userId.name}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Student RegNo:</p>
                    <p className='font-medium'>{leave.userId.regNo}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Purpose:</p>
                    <p className='font-medium'>{leave.purpose}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>From Date:</p>
                    <p className='font-medium'>{new Date(leave.fromDate).toLocaleDateString()}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>To Date:</p>
                    <p className='font-medium'>{new Date(leave.toDate).toLocaleDateString()}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>{leave.status === "Pending" ? "Action:" : "Status:"}</p>
                    {leave.status === "Pending" ? (<div className = "flex space-x-2">
                        <button className = "px-2 py-0.5 bg-teal-300 hover:bg-teal-400" onClick = {() => changeStatus(leave._id,"Approved")}>Approve</button> 
                        <button className = "px-2 py-0.5 bg-red-300 hover:bg-red-400" onClick = {() => changeStatus(leave._id,"Rejected")}>Reject</button> 
                        </div> ):
                        <p className='font-medium'>{leave.status}</p>
                    }
                </div>
            </div>
            </div>
        </div>):<div>Loading.....</div>}</>
    );
}
export default Detail;