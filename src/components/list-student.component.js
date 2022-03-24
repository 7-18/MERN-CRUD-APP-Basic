import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { StudentService } from "../services/student.services";

const StudentList = () => {
  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    students: [],
    filterStudents: [],
    errorMessage: "",
  });

  let { _id } = useParams();

  useEffect(() => {
    StudentService.getListStudents()
      .then((response) => {
        setState({
          ...state,
          students: response.data.studentList,
          filterStudents: response.data.studentList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchStudent = (event) => {
    setQuery({ ...query, text: event.target.value });
    let allStudents = state.students.filter((student) => {
      return student.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({ ...state, filterStudents: allStudents });
  };

  const studentDelete = async (_id) => {
    try {
      let response = await StudentService.deleteStudent(_id);
      if (response) {
        setState({ ...state });
        let response = await StudentService.getListStudents();
        setState({
          ...state,
          students: response.data.studentList,
          filterStudents: response.data.studentList,
        });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
    }
  };

  return (
    <>
      <Container className="student-search p-5">
        <div className="grid">
          <Row>
            <Col>
              <span className="h3 text-primary fs-1">Student List!</span>
              <Link
                to={"/register-student"}
                className="btn btn-warning text-white ms-3 mb-3"
              >
                <i className="fa fa-plus-circle me-2" />
                New
              </Link>
              <p className="fst-italic mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia temporibus, officia maiores molestias nobis inventore
                blanditiis perspiciatis, nulla suscipit pariatur in beatae.
                Vitae saepe voluptatum odit iste dolorem alias eos. Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. In hic deleniti nam
                repellat possimus optio molestiae iste, consequuntur, assumenda
                nulla eius iusto molestias veniam aliquid. Dolorum doloremque
                consectetur amet delectus?
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-6">
              <Form className="row">
                <Col>
                  <div className="mb-2">
                    <FormControl
                      type="text"
                      placeholder="Search Student"
                      name="name"
                      value={query.text}
                      onChange={searchStudent}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-outline-primary"
                      value="Search"
                    />
                  </div>
                </Col>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <Row>
          {state.filterStudents.length > 0 &&
            state.filterStudents.map((student) => {
              return (
                <Col className="col-md-6">
                  <Card key={student.id} className="me-3 mb-3">
                    <Card.Body>
                      <Row className="d-flex align-items-center justify-content-center">
                        <Col className="col-md-6">
                          <img
                            src={student.photo}
                            className="img-student"
                            alt="student"
                            loading="lazy"
                          />
                        </Col>
                        <Col className="col-md-8 mt-3">
                          <ul className="list-group text-center">
                            <li className="list-group-item list-group-item-action">
                              <span className="fw-bold">{student.name}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                             <span className="fw-bold">{student.email}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              <span className="fw-bold">{student.rollno}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                             <span className="fw-bold">{student.phone}</span>
                            </li>
                          </ul>
                        </Col>
                        <Col className="col-md-1 d-flex flex-column align-items-center justify-content-center">
                          <Link
                            to={`/edit-student:${student._id}`}
                            className="btn btn-warning text-white my-1"
                          >
                            <i className="fas fa-pen" />
                          </Link>
                          <Button
                            className="btn btn-danger my-1"
                            onClick={() => studentDelete(student._id)}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default StudentList;
