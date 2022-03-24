import student from "../models/Student.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const createStudent = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.rollno || !req.body.phone)
    return res.status(400).send({ message: "Incomplete data!" });

  const existingStudent = await student.findOne({
    email: req.body.email,
    rollno: req.body.rollno,
  });
  if (existingStudent)
    return res
      .status(400)
      .send({ message: "The student is already registered" });

  const studentRegister = new student({
    name: req.body.name,
    email: req.body.email,
    rollno: req.body.rollno,
    phone: req.body.phone,
    studentStatus: true,
  });

  const result = await studentRegister.save();

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          email: result.email,
          rollno: result.rollno,
          phone: result.phone,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Register error" });
  }
};

const listStudents = async (req, res) => {
  const studentList = await student
    .find({
      $and: [{ name: new RegExp(req.params["name"], "i") }],
    })
    .populate("_id")
    .exec();
  return studentList.length === 0
    ? res.status(400).send({ message: "Empty students list!" })
    : res.status(200).send({ studentList });
};

const findStudent = async (req, res) => {
  const studentFind = await student
    .findById({ _id: req.params["_id"] })
    .populate("_id")
    .exec();
  return !studentFind
    ? res.status(400).send({ message: "No search results!" })
    : res.status(200).send({ studentFind });
};

const updateStudent = async (req, res) => {
  if (!req.body.name || !req.body.email)
    return res.status(400).send({ message: "Incomplete data!" });

  const searchStudent = await student.findById({ _id: req.body._id });
  if (req.body.email !== searchStudent.email)
    return res
      .status(400)
      .send({ message: "Sorry, the email should never be changed" });

  const existingStudent = await student.findOne({
    name: req.body.name,
    email: req.body.email,
    rollno: req.body.rollno,
    phone: req.body.phone,
  });
  if (existingStudent)
    return res.status(400).send({ message: "You didn't make any changes..." });

  const studentUpdate = await student.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    rollno: req.body.rollno,
    phone: req.body.phone,
  });

  return !studentUpdate
    ? res.status(400).send({ message: "Error editing student" })
    : res.status(200).send({ message: "Student updated!" });
};

const deleteStudent = async (req, res) => {
  const studentDelete = await student.findByIdAndDelete({
    _id: req.params["_id"],
  });
  if (!studentDelete)
    return res.status(400).send({ message: "Student not found" });
  return res.status(200).send({ message: "Student deleted" });
};

export default {
  createStudent,
  listStudents,
  updateStudent,
  findStudent,
  deleteStudent,
};
