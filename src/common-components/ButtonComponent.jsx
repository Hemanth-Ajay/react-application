import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ButtonComponent = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      Add Student
    </button>
  );
};

export default ButtonComponent;
