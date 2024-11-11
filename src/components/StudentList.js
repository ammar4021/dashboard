
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Fetch students data either from localStorage 
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));  
    } else {
      fetch('/students.json')  // Fallback to JSON file if localStorage is empty
        .then((response) => response.json())
        .then((data) => {
          setStudents(data);  
        })
        .catch((error) => {
          console.error("Error fetching students:", error);  
        });
    }
  }, []);

  // Function to delete a student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));  // Save updated list to localStorage
  };

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Actions</th> {/* Add actions column for Edit/Delete */}
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <Link to={`/edit/${student.id}`}>Edit</Link> 
                  <button onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
