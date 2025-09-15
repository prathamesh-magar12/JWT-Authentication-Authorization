import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyinfo = { ...signupInfo };
    copyinfo[name] = value;
    setSignupInfo(copyinfo);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      // console.log(result);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("./login");
        }, 2000);
      } else if (error) {
        handleError(error.details[0].message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <>
      <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
            />
          </div>
          <button>Signup</button>
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
