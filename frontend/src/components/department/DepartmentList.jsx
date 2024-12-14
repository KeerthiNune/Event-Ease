import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = async (id) =>{
        const data = departments.filter(dep => dep._id !== id)
        setDepartments(data)
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert('Please log in to view departments.');
                    setDepLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/department", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    const data = response.data.departments.map((dep, index) => ({
                        _id: dep._id,
                        sno: index + 1,
                        dep_name: dep.dep_name,
                        dep_id : dep.dep_id,
                        action: <DepartmentButtons Id = {dep._id} onDepartmentDelete={onDepartmentDelete}/>
                    }));
                    setDepartments(data);
                    setFilteredDepartments(data);
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    console.error('Error fetching departments:', error.message);
                    alert('Something went wrong while fetching departments.');
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredDepartments(records)
    }

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="p-5">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Departments</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder="Search by Dep Name" onChange = {filterDepartments} className="px-4 py-0.5 border" />
                        <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 text-white rounded no-underline">
                            Add New Department
                        </Link>
                    </div>
                    <div className = "mt-5">
                        <DataTable columns={columns} data={filteredDepartments} pagination/>

                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentList;