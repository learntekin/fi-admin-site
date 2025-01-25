import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./Sidebar.css"; // Custom CSS for Sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to toggle sidebar on mobile using antd Button and icons */}
      <Button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
        size="large"
        shape="circle"
      />

      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
          <li>
            <Link to="/FA">Careers</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
