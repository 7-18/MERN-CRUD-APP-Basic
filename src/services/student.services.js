import axios from "axios";

export class StudentService {
  static URL = `http://localhost:3001`;

  static getListStudents() {
    let apiURL = `${this.URL}/students/list-students`;
    return axios.get(apiURL);
  }

  static getStudent(_id) {
    _id = "623c8504432f699b11d6dd87";
    let apiURL = `${this.URL}/students/find-student/${_id}`;
    return axios.get(apiURL);
  }

  static updateStudent(student, _id) {
    let apiURL = `${this.URL}/students/update-student/${_id}`;
    return axios.put(apiURL, student);
  }

  static deleteStudent(_id) {
    let apiURL = `${this.URL}/students/delete-student/${_id}`;
    return axios.delete(apiURL);
  }
}
