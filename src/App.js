import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import CreateStudent from "./components/create-student.component.js";
import StudentList from "./components/list-student.component.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";
import EditStudent from "./components/edit-student.component";

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<CreateStudent />} />
          <Route path={"/register-student"} element={<CreateStudent />} />
          <Route path={"/list-students"} element={<StudentList />} />
          <Route path={"/edit-student:studentId"} element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
