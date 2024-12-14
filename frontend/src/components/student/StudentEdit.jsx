import React, { useEffect, useState} from 'react';
import { fetchDepartments } from '../../utils/StudentHelper';
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'

const StudentEdit = () =>{

    const [student,setStudent] = useState({name:"",department:""})
    const [departments,setDepartments] = useState([])

    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        const getDepartments = async () =>{
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments();
    },[])
    
    useEffect(() => {
        const fetchStudent = async () => {
            try {
             const response = await axios.get(`http://localhost:5000/api/student/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    const student = response.data.student
                    setStudent((prev) => ({...prev, name: student.name, department : student.department.dep_name}))
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
    },[])

    const handleChange = (e) =>{
        const {name,value} = e.target
        setStudent((prevData) => ({...prevData,[name] : value}))
    }
  
    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const response = await axios.put(`http://localhost:5000/api/student/${id}`,student,{
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
        <>{departments && student?(
        <div className = "max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className = "text-2xl font-bold mb-6">Edit Student</h2>
            <form onSubmit = {handleSubmit}>
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className = "block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input type = "text" name = "name" placeholder = "Enter Name" onChange = {handleChange} value = {student.name}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required />
                    </div>

                    <div className = "col-span-2">
                        <label className = "block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select name = "department" onChange = {handleChange} value = {student.department.dep_name}
                        className = "mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        required>

                        <option value = "">Select Department</option>
                        {departments.map(dep => (
                            <option key = {dep._id} value = {dep._id}>{dep.dep_name}</option>
                        ))}
                        </select>
                    </div>

                </div>
                <button type = "submit"
                        className = "w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded">
                            Edit Student
                </button>
            </form>
        </div>
    ):<div>Loading</div>}</>
    )
}
export default StudentEdit;