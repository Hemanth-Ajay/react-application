import React, { useEffect, useState } from "react";
import StudentService from "../service/StudentService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmationModal from "../common-functions/DeleteConfirmationModal";

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [studentUuidToDelete, setStudentUuidToDelete] = useState(null);

  const fetchStudents = () => {
    StudentService.getStudents()
      .then((response) => {
        setStudents(response.data); // Assuming the API returns the student list as `data`
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const navigateToAddStudent = () => {
    navigate("/add-student");
  };

  const handleEdit = (student) => {
    // Navigate to the edit student page with the student data
    navigate(`/edit-student/${student.studentuuid}`, {
      state: { studentData: student },
    });
  };

  const handleDelete = (studentuuid) => {
    // Confirm deletion and call the delete handler
    StudentService.deleteStudent(studentuuid).then(() => {
      // Fetch the updated list of students
      fetchStudents();
      setShowModal(false); // Close the modal
    });
  };
  const handleShowModal = (studentUuid) => {
    setStudentUuidToDelete(studentUuid);
    setShowModal(true); // Show the confirmation modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the confirmation modal
    setStudentUuidToDelete(null); // Reset the student UUID
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentuuid}>
              <td>{student.firstName}</td>
              <td>{student.dob}</td>
              <td>{student.addressDto.streetName}</td>
              <td>{student.addressDto.state}</td>
              <td>
                {/* Edit and Delete buttons */}
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleShowModal(student.studentuuid)}
                >
                  Delete
                </button>
              </td>
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
      <DeleteConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onDelete={handleDelete}
        studentUuid={studentUuidToDelete}
      />
    </div>
  );
};

export default StudentComponent;
