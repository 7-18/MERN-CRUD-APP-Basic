import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateStudent from "./create-student.component";
import EditStudent from "./edit-student.component";
import StudentList from "./list-student.component";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<CreateStudent />} />
        <Route path={"/register-student"} element={<CreateStudent />} />
        <Route path={"/list-students"} element={<StudentList />} />
        <Route path={"/edit-student/:_id"} element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
