import Attendance from "../models/attModel.js"

export async function getAllStudents(_,res){
    // console.log("getAllStudents")
    // res.status(200).json("getAllStudents")
try {
        const att= await Attendance.find().sort({createdAt:-1})
        res.status(200).json(att)
    } catch (error) {
        console.error("Enter in getAllStudents controller",error)
        res.status(500).json({message:"Internal server Error1"})
    }

}

export async function getStudentsById(req,res){
    // console.log("getStudentsBystuId")
    // res.status(200).json("getStudentsBystuId")

    try {
            const att=await Attendance.findById(req.params.id)
            if (!att) return res.status(404).json({message:"Student stuId not found"})
            res.status(200).json(att)
        } catch (error) {
            console.error("Error in getStudentsBystuId controller",error)
            res.status(500).json({message: "Internal server error2"})        
        }
}
export async function createAttendance(req,res){
    // console.log("createAttendance")
    // res.status(200).json("createAttendance")
  try {
    const {stuName,stuId,year,semester,department,lec_conducted,lec_attended,date,faculty} = req.body

    const attPercentage =
      ((lec_attended / lec_conducted) * 100).toFixed(2);;

    const attStatus =
      attPercentage >= 75 ? "Eligible" : "Not Eligible";

    if (!stuName ||!stuId ||!year ||!semester ||!department ||lec_conducted == null ||lec_attended == null ||!date ||!faculty) 
        {
            return res.status(400).json({ message: "All fields are required!" })
        }
        if (lec_attended>lec_conducted){
            return res.status(400).json({message:"Number of lectures attended cannot be greater than number of lectrues conducted!"})
        }
    const att = new Attendance({stuName,stuId,year,semester,department,lec_conducted,lec_attended,date,faculty, attPercentage,attStatus})

    const savedatt = await att.save()
    res.status(201).json(savedatt)

  } catch (error) {
    console.error("Error in createAttendance Controller", error)
    res.status(500).json({ message: "Internal server Error3" })
  }
}

export async function updateAttendance(req,res){
    // console.log("updateAttendance")
    // res.status(200).json("updateAttendance")
    try {
        const{stuName, stuId, year, semester, department, lec_conducted,lec_attended, date, faculty}=req.body

            // CALCULATE PERCENTAGE
    const attPercentage = ((lec_attended / lec_conducted) * 100).toFixed(2)

    // CALCULATE STATUS
    const attStatus = attPercentage >= 75 ? "Eligible" : "Not Eligible"
        
        const updateAttendance=await
        Attendance.findByIdAndUpdate(req.params.id, {stuName, stuId, year, semester, department, lec_conducted,lec_attended, date, faculty, attPercentage,attStatus},{new:true})
        
        if(!updateAttendance) return res.status(404).json({message:"Student record not found!"})
            res.status(200).json(updateAttendance)
    } catch (error) {
        console.error("Error in updateAttendance Controller",error)
        res.status(500).json({message:"Internal server Error4"})
        
    }

}

export async function deleteAttendance(req,res){
    // console.log("deleteAttendance")
    // res.status(200).json("deleteAttendance")
    try {
        const deleteAttendance=await
        Attendance.findByIdAndDelete(req.params.id,)
        if(!deleteAttendance) return res.status(404).json({message:"Student record not found!"})
            res.status(200).json({message:"Student record deleted successfully!"})
    } catch (error) {
        
        console.error("Error in deleteAttendance Controller",error)
        res.status(500).json({message:"Internal server Error5"})
    }
    
}