import React, { useState, useEffect } from "react";
import studentSerivce from "../service/StudentService";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AddStudentComponent = () => {
  const [studentData, setStudentData] = useState({
    firstName: "",
    dob: "",
    addressDto: {
      streetName: "",
      state: "",
    },
  });
  const { studentUuid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // If state is available (for editing), set the student data from the passed props
  useEffect(() => {
    if (location.state && location.state.studentData) {
      //console.log(location.state.studentData);
      setStudentData(location.state.studentData);
    } else if (studentUuid) {
      // Fetch the student if it is not passed via state
      console.log("fetching student");
    }
  }, [studentUuid, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "streetName" || name === "state") {
      // Update addressDto object
      setStudentData((prevData) => ({
        ...prevData,
        addressDto: {
          ...prevData.addressDto,
          [name]: value,
        },
      }));
    } else {
      // Update the root level fields
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  // Convert from yyyy-MM-dd to dd-MM-yyyy
  const convertToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    if (studentUuid) {
      // Call the update student service
      studentSerivce
        .updateStudent(studentData, studentUuid)
        .then((response) => {
          navigate("/students");
        });
      //console.log("updating student");
    } else {
      const formattedDob = convertToDDMMYYYY(studentData.dob);
      const formData = {
        ...studentData,
        dob: formattedDob,
      };
      // Call the add student service
      studentSerivce.addStudent(formData).then((response) => {
        navigate("/students");
      });
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-2">
        {studentUuid ? "Edit Student" : "Add New Student"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <h3 className="mt-2">Address Details</h3>

        <div className="form-group">
          <label htmlFor="streetName">Street Name</label>
          <input
            type="text"
            className="form-control"
            id="streetName"
            name="streetName"
            value={studentData.addressDto.streetName}
            onChange={handleChange}
            placeholder="Enter street name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={studentData.addressDto.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          {studentUuid ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudentComponent;
