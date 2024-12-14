import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { columns,StudentButtons } from '../../utils/StudentHelper'
import DataTable from 'react-data-table-component';
import axios from 'axios';

const StudentList = () =>{
    const [students,setStudents] = useState([])
    const [stuLoading,setStuLoading] = useState(false)
    const [filteredStudent, setFilteredStudent] = useState([])
    useEffect(() => {
        const fetchStudents = async () => {
            setStuLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert('Please log in to view departments.');
                    setDepLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/student", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)

                if (response.data.success) {
                    const data = response.data.students.map((stu, index) => ({
                        _id: stu._id,
                        sno: index + 1,
                        dep_name: stu.department.dep_name,
                        name:stu.name,
                        regNo:stu.regNo,
                        dob:stu.dob,
                        action: (<StudentButtons Id={stu._id}/>),
                    }));
                    setStudents(data);
                    setFilteredStudent(data)
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    console.error('Error fetching departments:', error.message);
                    alert('Something went wrong while fetching departments.');
                }
            } finally {
                setStuLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleFilter = () =>{
        const records = students.filter((stu) => (
            stu.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredStudent(records)
    }

    return(
        <div className = "p-6">
            <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Students</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="text" 
                        placeholder="Search by Dep Name" 
                        className="px-4 py-0.5 border" />
                        <Link to="/admin-dashboard/add-student"
                         className="px-4 py-1 bg-teal-600 text-white rounded no-underline"
                         onChange={handleFilter}
                         >
                            Add New Student
                        </Link>
                    </div>
                    <div className = "mt-6">
                        <DataTable columns={columns} data={filteredStudent} pagination/>
                    </div>
        </div>
    )
}
export default StudentList;