import React, { useEffect } from "react";
import studentService from "../service/StudentService";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // Optional for validation schema

const AddStudentComponentUsingFormik = () => {
  const { studentUuid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Convert from yyyy-MM-dd to dd-MM-yyyy
  const convertToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch student data if we are in edit mode
  const initialValues = {
    firstName: "",
    dob: "",
    addressDto: {
      streetName: "",
      state: "",
    },
  };

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    addressDto: Yup.object({
      streetName: Yup.string().required("Street Name is required"),
      state: Yup.string().required("State is required"),
    }),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    if (studentUuid) {
      // Update student
      studentService.updateStudent(values, studentUuid).then(() => {
        navigate("/students");
      });
    } else {
      // Add new student
      const formattedDob = convertToDDMMYYYY(values.dob);
      const formData = {
        ...values,
        dob: formattedDob,
      };
      studentService.addStudent(formData).then(() => {
        navigate("/students");
      });
    }
  };

  // Handle cancel (go back to previous page)
  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-2">
        {studentUuid ? "Edit Student" : "Add New Student"}
      </h2>

      {/* Formik component to handle the form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Allows re-initializing form values when data is loaded
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Enter student name"
                onBlur={Formik.handleBlur}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <Field type="date" className="form-control" id="dob" name="dob" />
              <ErrorMessage
                name="dob"
                component="div"
                className="text-danger"
              />
            </div>

            <h3 className="mt-2">Address Details</h3>

            <div className="form-group">
              <label htmlFor="streetName">Street Name</label>
              <Field
                type="text"
                className="form-control"
                id="streetName"
                name="addressDto.streetName"
                placeholder="Enter street name"
              />
              <ErrorMessage
                name="addressDto.streetName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <Field
                type="text"
                className="form-control"
                id="state"
                name="addressDto.state"
                placeholder="Enter state"
              />
              <ErrorMessage
                name="addressDto.state"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              {studentUuid ? "Update Student" : "Add Student"}
            </button>

            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}
              onClick={handleCancel}
            >
              {studentUuid ? "Cancel" : "Back to Students"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudentComponentUsingFormik;
