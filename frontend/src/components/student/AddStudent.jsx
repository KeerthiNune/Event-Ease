import React, { useEffect, useState} from 'react';
import { fetchDepartments } from '../../utils/StudentHelper';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const AddStudent = () =>{

    const [departments,setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {
        const getDepartments = async () =>{
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments();
    },[])

    const handleChange = (e) =>{
        const {name,value,files} = e.target
        if(name === "image"){
            setFormData((prevData) => ({...prevData,[name] : files[0]}))
        }
        else{
            setFormData((prevData) => ({...prevData,[name] : value}))
        }
    }
  
    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:5000/api/student/add',formData,{
             headers:{
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
               "Content-Type": "application/json",   
             }
            })
            if(response.data.success){
                 navigate('/admin-dashboard/students')
            }
         }catch(error){
             if(error.response && !error.response.data.success){
                 alert(error.response.data.error)
             }
         }

    }

    return(
        <div className = "max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className = "text-2xl font-bold mb-6">Add New Student</h2>
            <form onSubmit = {handleSubmit}>
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input type = "text" name = "name" placeholder = "Enter Name" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input type = "email" name = "email" placeholder = "Enter Email" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Student RegNo
                        </label>
                        <input type = "text" name = "regNo" onChange = {handleChange} placeholder = "Enter Register Number"
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input type = "date" name = "dob" placeholder = "Enter DOB" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select name = "gender" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required >

                            <option value = "">Select Gender</option>
                            <option value = "male">Male</option>
                            <option value = "female">Female</option>
                            <option value = "other">Other</option>

                        </select>
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select name = "department" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required>

                        <option value = "">Select Department</option>
                        {departments.map(dep => (
                            <option key = {dep._id} value = {dep._id}>{dep.dep_name}</option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input type = "password" name = "password" placeholder = "***********" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required />
                    </div>

                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select name = "role" onChange = {handleChange}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required>

                            <option value = "">Select Role</option>
                            <option value = "admin">Admin</option>
                            <option value = "HOD">HOD</option>
                            <option value = "Student">Student</option>

                        </select>
                    </div>
                </div>
                <button type = "submit"
                        className = "w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded">
                            Add Student
                </button>
            </form>
        </div>
    )
}
export default AddStudent;