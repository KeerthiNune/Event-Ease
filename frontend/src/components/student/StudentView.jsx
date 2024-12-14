import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentView = () =>{
    const {id} = useParams();
    const [student,setStudent] = useState(null)
    
    useEffect(() => {
        const fetchStudent = async () => {
            try {
             const response = await axios.get(`http://localhost:5000/api/student/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    setStudent(response.data.student)
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

        fetchStudent();
    }, []); 
    
    
    return(
        <>{student?(
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold md-8 mb-3 text-center'> Student Details </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                <img className='rounded-full border w-72' src='https://media.istockphoto.com/id/2015429231/vector/vector-flat-illustration-in-black-color-avatar-user-profile-person-icon-profile-picture.jpg?s=612x612&w=0&k=20&c=Wu70OARg2npxWy5E22_ZLneabuTafvV_6avgYPhWOoU=' alt='img'/>
            </div>
            <div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Name:</p>
                    <p className='font-medium'>{student.name}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Student RegNo:</p>
                    <p className='font-medium'>{student.regNo}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Date of Birth:</p>
                    <p className='font-medium'>{new Date(student.dob).toLocaleDateString()}</p>
                </div>
                <div className='flex space-x-3 mb-2'>
                    <p className='text-lg font-bold'>Gender:</p>
                    <p className='font-medium'>{student.gender}</p>
                </div>
                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold'>Department:</p>
                    <p className='font-medium'>{student.department.dep_name}</p>
                </div>
            </div>
            </div>
        </div>):<div>Loading.....</div>}</>
    );
}
export default StudentView;