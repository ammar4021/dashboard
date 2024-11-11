
import React, { useState, useEffect } from 'react';

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState(''); // For form validation errors

  // Fetch students data from localStorage or fallback to students.json
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents)); // Load from localStorage
    } else {
      fetch('/students.json')  // Fallback to students.json
        .then((response) => response.json())
        .then((data) => setStudents(data))
        .catch((error) => console.error('Error loading students:', error)); // Error handling
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Basic form validation
    if (!name || !age || !className) {
      setError('Please fill in all fields');
      return;
    }
  
    // Clear error message
    setError('');
  
    const newStudent = {
      id: Date.now().toString(), // Unique ID for each student
      name,
      age: parseInt(age, 10), // Ensure age is a number
      class: className,
    };
  
    // Add new student and save to localStorage
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents, newStudent];
      localStorage.setItem('students', JSON.stringify(updatedStudents)); // Save to localStorage
      return updatedStudents; // Update the state
    });
  
    // Clear form fields after submission
    setName('');
    setAge('');
    setClassName('');
  };
  
  return (
    <div className="student-form">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        
        {/* Display error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Submit</button>
      </form>

      {/* Display student list (optional) */}
      <div className="student-list">
        <h3>Student List</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.age} - {student.class}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentForm;
