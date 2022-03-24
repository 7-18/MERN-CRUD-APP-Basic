import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentService } from "../services/student.services";

let EditStudent = () => {
  let [state, setState] = useState({
    student: {
      name: "",
      email: "",
      rollno: "",
      phone: "",
    },
    errorMessage: "",
  });

  let { _id } = useParams();

  useEffect(async () => {
    try {
      setState({ ...state });
      let response = await StudentService.getStudent(_id);
      setState({
        ...state,
        student: response.data.studentFind,
      });
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
    }
  }, []);

  const updateStudent = (event) => {
    setState({
      ...state,
      student: {
        ...state.student,
        [event.target.name]: event.target.value,
      },
    });
  };

  const navigate = useNavigate();

  const submitUpdate = async (event) => {
    event.preventDefault();
    try {
      let response = await StudentService.updateStudent(state.student, _id);
      if (response) {
        navigate("/list-students", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/edit-student/${_id}`, { replace: false });
    }
  };

  let { student, errorMessage } = state;

  return (
    <>
      <Container className="p-5 edit-student">
        <Row>
          <Col>
            <h3 className="text-warning fs-1">Edit Student!</h3>
          </Col>
        </Row>
      </Container>
      <Container className="edit-student-image p-5 pt-0">
        <Row>
          <Col className="col-md-4">
            <div className="form-wrapper">
              <form onSubmit={submitUpdate}>
                <Form.Group controlId="Name" className="mb-1">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={student.name}
                    name="name"
                    onChange={updateStudent}
                    required="true"
                  />
                </Form.Group>
                <Form.Group controlId="Email" className="mb-1">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={student.email}
                    name="Email"
                  />
                </Form.Group>
                <Form.Group controlId="RollNo" className="mb-1">
                  <Form.Control
                    type="number"
                    placeholder="Roll No."
                    value={student.rollno}
                    name="rollno"
                    onChange={updateStudent}
                    required="true"
                  />
                </Form.Group>
                <Form.Group controlId="Phone" className="mb-1">
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={student.phone}
                    name="phone"
                    onChange={updateStudent}
                    required="true"
                  />
                </Form.Group>
                <Row className="mt-3">
                  <Col>
                    <input
                      type="submit"
                      className="btn btn-warning text-white"
                      value="Update"
                    />
                    <Link to={"/list-students"} className="btn btn-danger ms-2">
                      Cancel
                    </Link>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
          <Col className="col-md-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/194/194931.png"
              className="img-student"
              alt="student"
              loading="lazy"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditStudent;
