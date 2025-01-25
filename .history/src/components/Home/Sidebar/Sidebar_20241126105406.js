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


      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
                {/* Button to toggle sidebar on mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"} Sidebar
      </button>
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
