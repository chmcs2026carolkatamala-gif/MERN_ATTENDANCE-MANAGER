import express from "express"
import { getAllStudents,getStudentsById,createAttendance,updateAttendance,deleteAttendance } from "../controllers/attController.js"

const router=express.Router()
router.get("/",getAllStudents)
router.get("/:id",getStudentsById)
router.post("/",createAttendance)
router.put("/:id",updateAttendance)
router.delete("/:id",deleteAttendance)
export default router
