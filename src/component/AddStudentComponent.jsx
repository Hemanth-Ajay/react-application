import React, { useState } from "react";
import studentSerivce from "../service/StudentService";
import { useNavigate } from "react-router-dom";

const AddStudentComponent = () => {
  const [studentData, setStudentData] = useState({
    firstName: "",
    dob: "",
    addressDto: {
      streetName: "",
      state: "",
    },
  });
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    studentSerivce.addStudent(studentData).then((response) => {
      navigate("/students");
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-2">Add New Student</h2>
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
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentComponent;
