import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import {userProfile,user,profilepic} from '../Interface/common';
import { useNavigate } from "react-router";
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [profilepic,setProfilePic] = useState<string>("")
  const userProfile : userProfile = JSON.parse(localStorage.getItem("profile") as string);
  const navigate = useNavigate();

  const getData = async () => {
    // e.preventDefault();
    const response = await fetch(
      // `${process.env.REACT_APP_API_URL}/data/fetchdata?page=${page}&limit=${limit}`,
      `${process.env.REACT_APP_API_URL}/data/fetchdata/${userProfile.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let temp: profilepic = await response.json();
    setProfilePic(temp.image);
  };

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };
  
  useEffect(() => {
      getData();
  }, []);

  return (
    <div style ={{marginTop:"130px"}}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style ={{position: "fixed",top:"0px",width:"100%"}}>
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
            {profilepic.includes("google") ? (
                      <img
                        style={{ width: "80px", height: "70px" ,borderRadius:"100%" }}
                        src={profilepic}
                        alt="ProfilePic"
                      />
                    ) : (
                      <img
                        style={{ width: "80px", height: "70px" , borderRadius:"100%"}}
                        src={`${process.env.REACT_APP_API_URL}/uploads/${profilepic}`}
                        alt="ProfilePic"
                      />
                    )}
              {/* <img src={userProfile.picture} alt="Profile Image" className="rounded-circle" width="55px" height="55px" /> */}
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
