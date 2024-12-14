import mongoose from "mongoose";
import {Schema} from "mongoose";



const studentSchema = new mongoose.Schema({
    userId: {type : Schema.Types.ObjectId, ref:"User", required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    regNo: {type : String, required:true,unique:true},
    dob: {type:Date},
    gender:{type:String},
    department : {type : Schema.Types.ObjectId,ref:"Department", required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

const Student = mongoose.model("Student",studentSchema)

export default Student;