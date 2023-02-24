import React from "react";
import { googleLogout } from "@react-oauth/google";
import {userProfile} from '../Interface/common';
import { useNavigate } from "react-router";
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Navbar = () => {
  const userProfile : userProfile = JSON.parse(localStorage.getItem("profile") as string);
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <span className="navbar-brand">User Directory</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <img src={userProfile.picture} alt="Profile Image" className="rounded-circle" width="55px" height="55px" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item ><b>Hello, {userProfile.name}</b></Dropdown.Item>
              <Dropdown.Item href="/data/updatedata">Update Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/" onClick={logout} style ={{backgroundColor: "red"}}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  );
};

export default Navbar;
