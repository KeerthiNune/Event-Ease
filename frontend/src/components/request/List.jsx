import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"

const List = () => {

    const [requests, setRequests] = useState([])
    const {id} = useParams()
    

    const fetchRequests = async () =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/request/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            })
            console.log(response.data)
            if(response.data.success){
                setRequests(response.data.requests)
            }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        fetchRequests();
    },[])
    if(!requests){
        return <div>Loading...</div>
    }
    console.log(requests)

    return(
        <div className = "p-6">
            <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Requests</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="text" 
                        placeholder="Search by Dep Name" 
                        className="px-4 py-0.5 border" />
                        <Link to="/student-dashboard/add-request"
                         className="px-4 py-1 bg-teal-600 text-white rounded no-underline"
                         >
                            Add New Request
                        </Link>
                    </div>

                    <table className = "w-full text-sm text-left text-gray-500">
                        <thead className = "text-xs text-gray-700 uppercase  border border-gray-200">
                            <tr>
                                <th className = "px-6 py-3">S No</th>
                                <th className = "px-6 py-3">From</th>
                                <th className = "px-6 py-3">To</th>
                                <th className = "px-6 py-3">Purpose</th>
                                <th className = "px-6 py-3">Students List</th>
                                <th className = "px-6 py-3">Applied Date</th>
                                <th className = "px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request,index) => (
                            <tr key = {request._id} className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className = "px-6 py-3">{index+1}</td>
                                <td className = "px-6 py-3">{new Date(request.fromDate).toLocaleDateString()}</td>
                                <td className = "px-6 py-3">{new Date(request.toDate).toLocaleDateString()}</td>
                                <td className = "px-6 py-3">{request.purpose}</td>
                                <td className="px-6 py-3">
                                        {request.students.map((student, idx) => (
                                            <div key={idx}>
                                                {student.name} ({student.regNo})
                                            </div>
                                        ))}
                                    </td>
                                <td className = "px-6 py-3">{new Date(request.appliedAt).toLocaleDateString()}</td>
                                <td className = "px-6 py-3">{request.status}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
        </div>
    )
}
export default List;