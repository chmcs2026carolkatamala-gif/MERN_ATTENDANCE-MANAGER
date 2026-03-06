import mongoose  from "mongoose";

const attSchema= new mongoose.Schema({
    stuName:{
        type:String,
        required: true
    },
    stuId:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    lec_conducted:{
        type:Number,
        required:true
    },
    lec_attended:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    faculty:{
        type:String,
        required:true
    },
    attPercentage:{
        type:Number
    },
    attStatus:{
        type:String
    }
},
{timestamps:true})

const Attendance=mongoose.model("Attendance",attSchema)
export default Attendance