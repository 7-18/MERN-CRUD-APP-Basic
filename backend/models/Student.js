import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name required"],
  },
  email: {
    type: String,
    required: [true, "Student email required"],
  },
  rollno: {
    type: Number,
    required: [true, "Student roll number required"],
  },
  phone: {
    type: String,
    required: [true, "Student phone number required"],
  },
  imageUrl: String,
  studentStatus: Boolean,
  registed_at: { type: Date, default: Date.now },
});
const student = mongoose.model("Student", studentSchema);
export default student;
