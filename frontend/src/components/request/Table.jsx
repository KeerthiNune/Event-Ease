import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, RequestButtons } from '../../utils/RequestHelper';
import axios from "axios"


const Table = () =>{
    const [requests,setRequests] = useState([])
    const [filteredRequests, setFilteredRequests] = useState(null)

    const fetchRequests = async () =>{
        try {
           
            const response = await axios.get("http://localhost:5000/api/request", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data)

            if (response.data.success) {
                const data = response.data.leaves.map((request, index) => ({
                    _id: request.userId._id,
                    sno: index + 1,
                    regNo:request.userId.regNo,
                    name:request.userId.name,
                    purpose:request.purpose,
                 days:
                    new Date(request.toDate).getDate() - new Date(request.fromDate).getDate(),
                    status:request.status,
                    action: (<RequestButtons Id={request._id}/>),
                }));
                setRequests(data);
                setFilteredRequests(data);
            }
        } catch (error) {
            if (error.response && error.response.data && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                console.error('Error fetching departments:', error);
                alert('Something went wrong while fetching');
            }
        }
    }
    useEffect(() =>{
        fetchRequests();
    },[])

    const filterByInput = (e) => {
        const data = requests.filter(request => request.regNo
            .toLowerCase()
            .includes(e.target.value.toLowerCase()))
        setFilteredRequests(data)
    }

    const filterByButton = (status) => {
        const data = requests.filter(request => request.status
            .toLowerCase()
            .includes(status.toLowerCase()))
        setFilteredRequests(data)
    }

    return(
        <>
        {filteredRequests ? (
        <div className='p-6'>
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Requests</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" 
                placeholder="Search by Student Id" 
                className="px-4 py-0.5 border" 
                onChange = {filterByInput}/>
                <div className='space-x-3'>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick = {() => filterByButton("Pending")}>
                    Pending</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick = {() => filterByButton("Approved")}>
                    Approved</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick = {() => filterByButton("Rejected")}>
                    Rejected</button>
                </div>
            </div>
            <div className = "mt-3">
            <DataTable columns={columns} data={filteredRequests} pagination/>
            </div>
</div>) : <div>Loading</div>}
</>
    )
}
export default Table;