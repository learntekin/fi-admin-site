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
      {/* Button to toggle sidebar on mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"} Sidebar
      </button>

      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/career">Careers</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
