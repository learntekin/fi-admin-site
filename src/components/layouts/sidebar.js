import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Sidebar extends React.Component {
    render() {
        return (

            <nav class="sidebar sidebar-offcanvas" id="sidebar" style={{ background: 'linear-gradient(to bottom white 0%, #e9cef4 100%)' }}>
                <ul class="nav">
                    <li class="nav-item nav-profile">
                        <a href="#" class="nav-link">
                            <div class="nav-profile-image">
                                <img src="assets/images/faces/face1.jpg" alt="profile"></img>
                                <span class="login-status online"></span>
                            </div>
                            <div class="nav-profile-text d-flex flex-column">
                                <span class="font-weight-bold mb-2">Finance Frenzy Solutions</span>
                                <span class="text-secondary text-small">Admin</span>
                            </div>

                        </a>
                    </li>
                    <li class="nav-item" >
                        <Link to="/" class="nav-link">
                            <span class="menu-title">Dashboard</span>
                            {/* <i class="mdi mdi-home menu-icon"></i> */}
                        </Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span class="menu-title">Contact</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-comment-question-outline"></i> */}
                        </a>
                        <div class="collapse" id="ui-basic">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link to="/addContact" class="nav-link" >Add Contact</Link></li>
                                <li class="nav-item"> <Link to="/listContact" class="nav-link" >List Contact</Link></li>
                            </ul>
                        </div>
                    </li>
                   
                </ul>
            </nav>

        )
    }
}
