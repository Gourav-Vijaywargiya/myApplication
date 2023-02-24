import React, { useEffect, useState } from "react";
import { googleLogout, } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import {user, datatype,userProfile} from '../Interface/common';
import Navbar from "./Navbar";


const Fetchdata = () => {
const userProfile : userProfile = JSON.parse(localStorage.getItem("profile") as string);
 
  const [data, setData] = useState<user[] | null>([]);
  const [page,setPage] = useState<number>(1);
  const [totalResult,setTotalResult] = useState<number>(0);
  const navigate = useNavigate();
  const [searchTitle,setSearchTitle] = useState<string | number>("");
  const limit : number = 2;


  const getData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL }/data/fetchdata?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    );

    
    let temp :datatype = await response.json();
    setData(temp.User);
    setTotalResult(Number(temp.totalResults))
  };

  const changePage = (type : string) : void => {
    if(type === "prev"){
      setPage(old => old - 1);
    }
    else if(type === "next"){
      setPage(old => old + 1);
    }
  }

  const updateData = () =>{
    navigate('/data/updatedata');
  }

  const logout =() =>{
    googleLogout();
    localStorage.clear();
    navigate('/');
    setData(null);
  }

  useEffect(() => {
    getData();
  }, [page]);



  

  return (
    <>
     {/* <Navbar/> */}
    <div className ="container mt-5" >

      <div style ={{backgroundColor : "#e29b9b96",marginLeft:"20px",width:"1295px" ,border:"1px solid"}}>
        <div className ="container d-flex justify-content-between align-items-center my-3">
        <h5>{userProfile.name}</h5>
        <h5> {userProfile.email}</h5>
       {<img src ={userProfile.picture}/>}
        </div>
      
        <div className ="container d-flex justify-content-between my-3">
      <input type = {"text" || "tel"} placeholder ="Search Here" onChange={(e)=>setSearchTitle(e.target.value)}/>
      
      <button className="btn btn-primary" onClick={updateData}>Update Profile</button>
      </div>
      </div>
      <table className ="table table-bordered table-hover " style ={{borderColor : "ActiveBorder", margin : "20px"}}>
        <thead >
          <tr  style ={{border : "2px solid", backgroundColor : "#2ffff58a"}}>
            <th scope ="col" > Name </th>
            <th  scope ="col" >First Name </th>
            <th scope ="col" >Last Name </th>
            <th scope ="col" >Image </th>
            <th scope ="col" >Email </th>
            <th scope ="col" >Mobile No. </th>
            <th scope ="col" >Gender </th>
            <th scope ="col" >Date of Birth </th>
            <th scope ="col" >About Me </th>
            <th scope ="col" >Last login time</th>
          </tr>
        </thead>
        <tbody style ={{backgroundColor : "#f9e5c77a"}}>
        {data && data.filter((value)=>{
          if(searchTitle === "") {
            return value;
          }else if(
            // value.name.toLowerCase().includes(searchTitle.toLowerCase()) || 
                   value.firstName.toLowerCase().includes(searchTitle.toString().toLowerCase()) || 
                   value.lastName.toLowerCase().includes(searchTitle.toString().toLowerCase()) || 
                   value.email.toLowerCase().includes(searchTitle.toString().toLowerCase()) ||
                   value.Mobile.toString().includes(searchTitle.toString())){
            return value;
          }
        })
        .map((item) => (
          <tr key ={item.id}>
            <td>{item.name}</td>
            <td>{item.firstName} </td>
            <td>{item.lastName} </td>
            <td><img src={item.image} alt ="ProfilePic"/></td>
            <td>{item.email} </td>
            <td>{item.Mobile}</td>
            <td>{item.Gender}</td>
            <td>{item.DateofBirth}</td>
            <td>{item.aboutme}</td>
            <td>{item.lastlogin}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className ="d-flex justify-content-between" style={{width:"100%",marginLeft:"20px"}}>
        <button className ="btn btn-primary" onClick = {e => changePage("prev")} disabled ={page === 1}>Previous</button>
            
        <button className ="btn btn-primary" onClick = {e => changePage("next")} disabled = {page+1 > Math.ceil(totalResult/limit)} >Next</button>
       
      </div>
      <button className = "btn btn-danger my-3" style={{marginLeft:"20px"}} onClick={logout}>logout</button>
    </div>
    </>
  );
};

export default Fetchdata;
