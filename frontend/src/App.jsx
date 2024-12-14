import React from "react"
import { BrowserRouter as Router,Routes ,Route,Navigate } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import HODDashboard from "./pages/HODDashboard"
import PrivateRoutes from "./utils/PrivateRoutes"
import RoleBaseRoutes from "./utils/RoleBaseRoutes"
import AdminSummary from "./components/dashboard/AdminSummary"
import DepartmentList from "./components/department/DepartmentList"
import AddDepartment from "./components/department/AddDepartment"
import EditDepartment from "./components/department/EditDepartment"
import StudentList from "./components/student/StudentList"
import AddStudent from "./components/student/AddStudent"
import StudentView from "./components/student/StudentView"
import StudentEdit from "./components/student/StudentEdit"
import Summary from "./components/studentDashboard/Summary"
import RequestList from "./components/request/List"
import StudentRequestForm from "./components/request/StudentRequestForm"
import Setting from "./components/studentDashboard/Setting"
import Table from "./components/request/Table"
import Detail from "./components/request/Detail"
function App() {

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/admin-dashboard'/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole = {["admin"]}>
            <AdminDashboard/>
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>

          <Route index element={<AdminSummary/>}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}></Route>
          <Route path='/admin-dashboard/request' element={<Table/>}></Route>
          <Route path='/admin-dashboard/request/:id' element={<Detail/>}></Route>
          <Route path='/admin-dashboard/students/request/:id' element={<RequestList/>}></Route>

          <Route path='/admin-dashboard/students' element={<StudentList/>}></Route>
          <Route path='/admin-dashboard/add-student' element={<AddStudent/>}></Route>
          <Route path='/admin-dashboard/student/:id' element={<StudentView/>}></Route>
          <Route path='/admin-dashboard/student/edit/:id' element={<StudentEdit/>}></Route>



        </Route>
        <Route path='/student-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole = {["admin","Student","HOD"]}>
              <StudentDashboard/>
            </RoleBaseRoutes>
          </PrivateRoutes>}>
          
          <Route index element={<Summary/>}></Route>
          <Route path = "/student-dashboard/profile/:id" element={<StudentView/>}></Route>
          <Route path = "/student-dashboard/requests/:id" element={<RequestList/>}></Route>
          <Route path = "/student-dashboard/add-request" element={<StudentRequestForm/>}></Route>
          <Route path = "/student-dashboard/setting" element={<Setting/>}></Route>

          
          </Route>
        <Route path='/hod-dashboard' element={<HODDashboard/>}></Route>
      </Routes>
    </Router>
   </div>
  )
}

export default App;
