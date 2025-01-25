import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Custom CSS for Sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to toggle sidebar on mobile with Font Awesome Icon */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? (
          <i className="fas fa-times"></i> // Close icon
        ) : (
          <i className="fas fa-bars"></i> // Open icon
        )}
      </button>

      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
