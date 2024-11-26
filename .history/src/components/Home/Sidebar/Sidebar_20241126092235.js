import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Custom CSS for Sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
