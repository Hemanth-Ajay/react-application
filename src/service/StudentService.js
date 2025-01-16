import axios from "axios";

const STUDENT_API_BASE_URL = "http://localhost:8088/api/v1";

class StudentService {
  getStudents() {
    return axios.get(STUDENT_API_BASE_URL + "/getStudentList");
  }
  addStudent(student) {
    return axios.post(STUDENT_API_BASE_URL + "/saveStudent", student);
  }
}

export default new StudentService();
