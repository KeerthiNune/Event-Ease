import React, { useState } from "react";
import {useAuth} from "../../context/authContext"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const StudentRequestForm = () => {
    const {user} = useAuth()
  const [students, setStudents] = useState([{ name: "", regNo: "" }]);
  const [formData, setFormData] = useState({
    userId: user._id,
    fromDate: "",
    toDate: "",
    purpose: "",
  });

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({...prevState,[name]: value }));
  };
  console.log(formData)

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };
  console.log(students)

  const addStudent = () => {
    if (students.length < 7) {
      setStudents([...students, { name: "", regNo: "" }]);
    } else {
      alert("You can add up to 7 students only.");
    }
  };

  const removeStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const areStudentsFromSameDepartment = () => {
    const departmentCode = students[0].regNo.slice(6, 8);
    return students.every((student) => student.regNo.slice(6, 8) === departmentCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fromDate || !formData.toDate || !formData.purpose) {
      alert("Please fill in all required fields.");
      return;
    }

    if (students.some((student) => !student.name || !student.regNo)) {
      alert("Please fill in all student details.");
      return;
    }

    if (!areStudentsFromSameDepartment()) {
      alert("All students must be from the same department.");
      return;
    }
     const payload = {
      ...formData,
      students
     }
        try {
            const response = await axios.post(`http://localhost:5000/api/request/add`, payload,{
                   headers: {
                       Authorization: `Bearer ${localStorage.getItem("token")}`
                   }
               });

               if (response.data.success) {
                    navigate(`/student-dashboard/requests/${user._id}`)
            }
           } catch (error) {
               if (error.response && error.response.data && !error.response.data.success) {
                   alert(error.response.data.error);
               } else {
                   console.error('Error fetching departments:', error.message);
                   alert('Something went wrong while submitting request.');
               }
           } 
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Student Attendance Request Form</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">From Date</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">To Date</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Purpose</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>
      </div>

      <h3 className="text-lg font-semibold mb-2">Students Attending</h3>
      {students.map((student, index) => (
        <div key={index} className="mb-4 border p-2 rounded">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Student Name</label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => handleStudentChange(index, "name", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-medium">Roll Number</label>
            <input
              type="text"
              value={student.regNo}
              onChange={(e) => handleStudentChange(index, "regNo", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => removeStudent(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {students.length < 7 && (
        <button
          type="button"
          onClick={addStudent}
          className="text-blue-500 hover:underline mb-4"
        >
          + Add Another Student
        </button>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
      >
        Submit Request
      </button>
    </form>
  );
};

export default StudentRequestForm;
