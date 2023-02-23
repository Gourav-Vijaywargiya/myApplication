import {
  googleLogout,
  useGoogleLogin
} from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import moment from "moment";
import { Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { googleOauthProfile, googleOauthUser } from "../Interface/common";

const Googleoauth = () => {
  const [user, setUser] = useState<googleOauthUser| null>();
  const [profile, setProfile] = useState<googleOauthProfile | null>();
  const [mobile, setMobile] = useState<number>();
  const [gender, setGender] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [aboutme, setAboutMe] = useState<string>("");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed", error),
  });
  

  const authenticate = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/data/checkuser`, {
        email: profile && profile.email,
      })
      .then((res) => {
        if (res.data.status) {
          setShow(true);
        } else {
          setShow(false);
        }
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Submit details to backend
    const userDetails = {
      mobile,
      dob,
      gender,
      aboutme,
      loginTime: moment().format("YYYY-MM-DD HH:mm:ss a"),
      ...profile,
    };

    axios.post("http://localhost:7000/data/userdetails", userDetails);
    localStorage.setItem("profile", JSON.stringify(userDetails));
    navigate("/home");
  };

  if (profile && profile.email) {
    authenticate(); // once we have the user details, we need to authenticate the user to displaye and route to the dashboard page
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  useEffect(() => {
    if (user && user.access_token) {navigate('/');
        let url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${user.access_token}`
        let authorization = `Bearer ${user.access_token}`
      axios.get(url,
          {
            headers: {
              Authorization: authorization,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((error) => {
            console.log("Wrrr" ,error);
          console.log(error);
        });
    }
  }, [user]);

  // Logout function to logged out user
  const logOut = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
    setProfile(null);
    setUser(null);
  };

  

  return (
    <div>
      {profile && profile.email ? (
        <>
          {show ? (
            navigate("/home")
          ) : (
            <div>
              <h3>Login with Google</h3>
              <img src={profile.picture} alt="Profile Picture" />
              <h3>{profile.name} LoggedIn</h3>
              <p>Name : {profile.name}</p>
              <p>Email : {profile.email}</p>
              <button className=" btn btn-danger" onClick={logOut}>
                logout
              </button>
              <br />
              <br />
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            marginLeft: "800px",
            marginTop: "400px",
            width: "250px",
            height: "45px",
          }}
        >
          <h3>Login with Google</h3>
          <br />
          <br />
          <Button
            variant="danger"
            onClick={() => login()}
            style={{ marginLeft: "15px" }}
          >
            
            <div className="d-flex justify-content-between align-items-center">
              <FaGoogle className="mx-2" />
              <span>Sign in with Google</span>
            </div>
          </Button>
        </div>
      )}
      {user && user.access_token && (
        <form onSubmit={handleSubmit}>
          <h3>Enter Required Details</h3>
          <label htmlFor="mobile">Mobile No.:</label>
          <input
            type="tel"
            name="mobile"
            value={mobile!}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMobile(Number((e.target as HTMLInputElement).value))
            }
            required
          />

          <label htmlFor="dob">Date of Birth.:</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
              setDOB(e.target.value)
            }
            required
          />

          <label htmlFor="gender"> Gender:</label>
          <input
            type="gender"
            name="gender"
            value={gender}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGender((e.target as HTMLInputElement).value)
            }
            required
          />

          <label htmlFor="aboutme"> About Me:</label>
          <input
            type="text"
            name="aboutme"
            value={aboutme}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAboutMe((e.target as HTMLInputElement).value)
            }
            required
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Googleoauth;

