import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width:'100px'
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
         width:'120px'
    },
    {
        name: "Reg No",
        selector: (row) => row.regNo,
        sortable: true,
         width:'170px'
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
         width:'170px'
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center:"true"
    },
]

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get("http://localhost:5000/api/department",
            {
             headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && error.response.data && !error.response.data.success) {
            alert(error.response.data.error);
        } else {
            console.error('Error fetching departments:', error.message);
            alert('Something went wrong while fetching departments.');
        }
    }
    return departments
};


export const StudentButtons = ({Id}) =>{
    const navigate = useNavigate();

     return(
        <div className = "flex space-x-3">
            <button className = "px-4 py-1 bg-teal-600 text-white"
            onClick = {() =>navigate(`/admin-dashboard/student/${Id}`)}>View</button>
            <button className = "px-4 py-1 bg-yellow-600 text-white"
            onClick = {() =>navigate(`/admin-dashboard/student/edit/${Id}`)}>Edit</button>
            <button className = "px-4 py-1 bg-red-600 text-white"
            onClick = {() => navigate(`/admin-dashboard/students/request/${Id}`)}>Requests</button>
        </div>
    )
}

