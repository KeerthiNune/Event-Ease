import Leaves from "../models/Request.js"
import Student from "../models/Student.js"
const addRequest = async (req,res) => {

    try{
        const {userId,fromDate,toDate,purpose,students} = req.body
        
        console.log(userId,fromDate,toDate,purpose,students)

        const newRequest = new Leaves({
            userId,
            fromDate,
            toDate,
            purpose,
            students
        })
        console.log(newRequest)
        await newRequest.save()
        return res.status(200).json({success:true})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}


const getRequest = async (req,res) => {
    try{
        const {id} = req.params;
    const requests = await Leaves.findOne({userId:id})
        console.log("requests",requests)
        if(!requests){
            const student = await Student.findOne({userId: id})
            console.log(student)
            requests = await Leaves.find({regNo:student._id})
        }
        return res.status(200).json({success:true,requests})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}

const getRequests = async (req,res) => {
    try{
        const leaves = await Leaves.find().populate({
            path:"userId",
        })
        console.log(leaves)
        return res.status(200).json({success:true,leaves})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}

const getRequestDetail = async (req,res) => {
    try{
        const {id} = req.params;
        const leave = await Leaves.findById({_id: id}).populate({
            path:"userId",
        })
        console.log(leave)
        return res.status(200).json({success:true,leave})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request add server error${error}`})
    }
}

const updateRequest = async (req,res) => {
    try{
        const {id} = req.params
        const leave = await Leaves.findByIdAndUpdate({_id: id}, {status : req.body.status})
        if(!leave){
            return res.status(404).json({success:false, error: "Request not founded"})
        }

        return res.status(200).json({success:true})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false, error: `Request update server error${error}`})
    }
}

export {addRequest,getRequest,getRequests, getRequestDetail,updateRequest}