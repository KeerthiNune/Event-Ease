import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    regNo: {type: String, required:true,unique:true},
    name:  {type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","HOD","Student"],required:true},
    createAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
})

const User = mongoose.model("User",userSchema)

export default User;