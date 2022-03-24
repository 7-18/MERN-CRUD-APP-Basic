import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollNo] = useState("");
  const [phone, setPhone] = useState(0);

  const navigate = useNavigate()

  const newStudent = () => {
    axios.post('http://localhost:3001/students/create-student', {
      name,
      email,
      rollno,
      phone,
    });
      navigate('/list-students')
  };

  return (
    <Container className="p-5">
    <Row className="pb-5">
      <Col>
        <h3 className="text-primary fs-1">Create Student!</h3>
        <p className="fst-italic mb-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At voluptas animi obcaecati culpa eum vero consequuntur enim? Esse consequuntur, harum laboriosam, quia vitae dignissimos rerum beatae officiis eius velit nam.
        </p>
      </Col>
    </Row>
    <div className="form-wrapper">
      <Form>
        <Form.Group controlId="Name" className="mb-1">
          <Form.Control type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
        </Form.Group>
        <Form.Group controlId="Email" className="mb-1">
          <Form.Control type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
        </Form.Group>
        <Form.Group controlId="RollNo" className="mb-1">
          <Form.Control type="number" placeholder="Roll No." onChange={(e) => {setRollNo(e.target.value)}}/>
        </Form.Group>
        <Form.Group controlId="Phone" className="mb-1">
          <Form.Control type="text" placeholder="Phone Number" onChange={(e) => {setPhone(e.target.value)}}/>
        </Form.Group>
        <Button variant="primary" className="mt-3 text-white w-100" size="lg" block="block" type="submit" onClick={newStudent}>
          Create Student
        </Button>
      </Form>
    </div>
    </Container>
  );
}

export default CreateStudent;
