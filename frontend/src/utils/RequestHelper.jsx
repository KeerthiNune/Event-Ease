import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width:'70px'
    },
    {
        name: "Reg No",
        selector: (row) => row.regNo,
        sortable: true,
         width:'120px'
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
         width:'170px'
    },
    {
        name: "Purpose",
        selector: (row) => row.purpose,
        sortable: true,
         width:'170px'
    },
    /*{
        name: "Department",
        selector: (row) => row.dep_name,
        center:"true"
    },*/
    {
        name: "Days",
        selector: (row) => row.days,
        center:"true"
    },
    {
        name: "Satus",
        selector: (row) => row.status,
        center:"true"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center:"true"
    },
]

export const RequestButtons = ({Id}) =>{
    const navigate = useNavigate();
    const handleView = (id) =>{
        navigate(`/admin-dashboard/request/${id}`)
    }
    return(
        <button className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600" 
        onClick={() => handleView(Id)}>View</button>
    )
}