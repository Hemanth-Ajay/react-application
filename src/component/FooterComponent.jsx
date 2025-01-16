import React from "react";

const FooterComponent = () => {
  return (
    <footer
      className="footer bg-dark text-white py-3"
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
