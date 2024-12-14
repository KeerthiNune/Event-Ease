import Student from "../models/Student.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import Department from "../models/Department.js"


const addStudent = async (req,res) =>{
    try{
    const {
        name,
        email,
        regNo,
        dob,
        gender,
        department,
        password,
        role
    } = req.body;
   

    const user = await User.findOne({regNo})
    if(user){
        return res.status(400).json({success:false, error: "user already registered in user"});
    }

    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new User({
        regNo, 
        name,
        password : hashPassword, 
        role, 
    })
    const savedUser = await newUser.save()

    const newStudent = new Student({
        userId: savedUser._id,
        name,
        email,
        regNo,
        dob,
        gender,
        department
    })
    console.log(newStudent)

    const savedStudent = await newStudent.save()
    return res.status(200).json({success:true, message: "Student Created"})
}catch(error){
    console.log(error.message);
    return res.status(500).json({success:false, error:"Server Error in adding Student"})
}

}


const getStudents = async (req,res) =>{
    try{
        const students = await Student.find().populate('userId',{password:0}).populate('department')
        return res.status(200).json({success:true,students})
    }
    catch(error){
        return res.status(500).json({success:false,error:"get students server error"})
    }
}

const getStudent = async (req,res) =>{
    const {id} = req.params;
    try{
        let student;
        student = await Student.findById({_id:id}).populate('userId',{password:0}).populate('department')
        if(!student){
            student = await Student.findOne({userId:id}).populate('userId',{password:0}).populate('department')
        }
        return res.status(200).json({success:true,student})
    }
    catch(error){
        return res.status(500).json({success:false,error:"get students server error"})
    }
}

const updateStudent = async (req,res) => {
    try{
        const {id} = req.params;
        const {
            name,
            department,
        } = req.body;

        const student = await Student.findById({_id:id})
        if(!student){
            return res.status(404).json({success:false,error:"student not found"})
        }
        const user = await User.findById({_id:student.userId})
        if(!user){
            return res.status(404).json({success:false,error:"user not found"})
        }
        
        const updateUser = await User.findByIdAndUpdate({_id:student.userId},{name})
        const updateStudent = await Student.findByIdAndUpdate({_id:id},{department})

        if(!updateStudent || !updateUser) {
            return res.status(404).json({success:false,error:"document not found"})
        }
        return res.status(200).json({success:true, message:"Student details updated"})
    }catch(error){
        return res.status(500).json({success:false,error:"update students server error"})
    }
}

export {addStudent,getStudents,getStudent,updateStudent};