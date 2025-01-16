import React from "react";

const headerStyle = {
  backgroundColor: "#282c34",
  padding: "20px",
  color: "white",
  textAlign: "center",
  fontSize: "24px",
};

const HeaderComponent = () => {
  return (
    <header style={headerStyle}>
      <h1>Student Dashboard</h1>
    </header>
  );
};

export default HeaderComponent;
