import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import {userProfile, updateFormData} from '../Interface/common';

const Updateform = () => {

  const userProfile : userProfile = JSON.parse(localStorage.getItem("profile") as string);
  const Navigate = useNavigate();
  const [data, setData] = useState<updateFormData>({
    name: "userProfile.name",
    firstName: "userProfile.given_name",
    lastName: "userProfile.family_name",
    email: "userProfile.email",
    Mobile: "userProfile.mobile",
    DateofBirth: "userProfile.DateofBirth",
    Gender: "userProfile.Gender",
    image : "userProfile.image",
    aboutme : "userProfile.aboutme"
  });


  const getData = async (email : string) : Promise<void> => {
    
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/data/fetchdata/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let temp = await response.json();
    setData(temp);
  };

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    setData({ 
      ...data, 
      [(e.target as HTMLInputElement).name]: e.target.value
    });
  };


  const submitData = async (e:React.FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault();

    let newData = { ...data, email: userProfile.email };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/data/updatedata`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    Navigate('/home');
    return response.json();
  };

  useEffect(() => {
    getData(userProfile.email as string);
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "230px", marginBottom: "30px" }}>
        <h1>Details</h1>
      </div>
      <form onSubmit={submitData}>
        <div className="row my-2">
          <div className="col">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              value={data.firstName}
              onChange={onChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              value={data.lastName}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row my-2">
          <div className="col">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={data.name}
              onChange={onChange}
            />
           </div>
           <div className="col">
           <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={data.email}
            onChange={onChange}
            disabled
           />
           </div>
        </div>

        <div className="row my-2">
          <div className="col">
            <input
              type="text"
              name="Gender"
              className="form-control"
              placeholder="Gender"
              onChange={onChange}
              value={data.Gender}
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="DateofBirth"
              className="form-control"
              placeholder="Date of Birth"
              onChange={onChange}
              value={data.DateofBirth}
            />
          </div>
          <div className="col">
            <input
              type="integer"
              name="Mobile"
              className="form-control"
              placeholder="Mobile No."
              onChange={onChange}
              value={data.Mobile}
            />
          </div>
        </div>

        <div className="row my-2">
          <div className="col">
            <input
              style={{ height: "100px" }}
              type="text"
              name = "aboutme"
              className="form-control"
              placeholder="About me"
              onChange={onChange}
            />
          </div>
          <div className="col">
            <label htmlFor="exampleFormControlFile1">Profile Picture</label>
            <input
              type="file"
              name="image"
              className="form-control-file"
              onChange={onChange}
    
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Updateform;
