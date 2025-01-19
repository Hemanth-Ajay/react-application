import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterComponent from "./component/FooterComponent";
import HeaderComponent from "./component/HeaderComponent";
import StudentComponent from "./component/StudentComponent";
import AddStudentComponent from "./component/AddStudentComponent";
function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <br></br>
      <Routes>
        {/* for the default path when page loads */}
        <Route path="/" element={<StudentComponent />} />
        {/* to load all students*/}
        <Route path="/students" element={<StudentComponent />} />
        {/* to add new student*/}
        <Route path="/add-student" element={<AddStudentComponent />} />
        {/* to edit an student*/}
        <Route
          path="/edit-student/:studentUuid"
          element={<AddStudentComponent />}
        />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
