import express from "express";
import Student from "../controllers/Student.js";
const router = express.Router();

router.post("/create-student", Student.createStudent);
router.get("/list-students/", Student.listStudents);
router.get("/find-student/:_id", Student.findStudent);
router.put("/update-student/:_id", Student.updateStudent);
router.delete("/delete-student/:_id", Student.deleteStudent);

export default router;
