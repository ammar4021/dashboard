import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>Student Dashboard</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Student</Link>
      </nav>
    </header>
  );
};

export default Header;
