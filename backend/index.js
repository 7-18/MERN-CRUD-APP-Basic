import express from "express";
import cors from "cors";
import db from "./mongo.js";
import dotenv from "dotenv";
import studentRoute from "./routes/student.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/students", studentRoute);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);

db.dbConnection();
