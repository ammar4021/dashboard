
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Ensure `Routes` is imported from v6
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Header from './components/Header';

function App() {
  const [students, setStudents] = useState([]);

  // Create student
  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  // Update student
  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<StudentList students={students} deleteStudent={deleteStudent} />} />
          <Route path="/add" element={<StudentForm addStudent={addStudent} />} />
          <Route path="/edit/:id" element={<StudentForm students={students} updateStudent={updateStudent} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
