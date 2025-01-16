import React, { useEffect, useState } from "react";
import StudentService from "../service/StudentService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    StudentService.getStudents().then((response) => {
      setStudents(response.data);
    });
  }, []);

  const navigateToAddStudent = () => {
    navigate("/add-student");
  };

  return (
    <div className="container">
      <h1 className="container text-center">Student Details</h1>
      <table className="table table-bordered table-hover custom-table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Student Street Name</th>
            <th>Student State</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentuuid}>
              <td>{student.firstName}</td>
              <td>{student.dob}</td>
              <td>{student.addressDto.streetName}</td>
              <td>{student.addressDto.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          style={{ marginTop: 10, marginBottom: 10 }}
          onClick={navigateToAddStudent}
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentComponent;
