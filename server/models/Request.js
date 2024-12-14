import mongoose from "mongoose";
import {Schema} from "mongoose";

const requestedStudentsSchema = new Schema({
    name:{type:String,requried:true},
    regNo:{type:String,required:true},
})
const requestSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref : "User", required:true},
    fromDate:{type:Date,required:true},
    toDate:{type:Date,required:true},
    purpose:{type:String,required:true},
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending",
    },
    students:[requestedStudentsSchema],
    appliedAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},

});

const Leaves = mongoose.model("Leaves",requestSchema);
export default Leaves;