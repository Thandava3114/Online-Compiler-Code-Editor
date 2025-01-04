import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/insert", user);
    toast.success("User Details Saved Succesfully...!");
    navigate("/");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="addUser">
      <h3>SignUp</h3>
      <form className="addUserForm" onSubmit={(e) => onSubmit(e)}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => onInputChange(e)}
            onKeyUp={handleInputEnter}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => onInputChange(e)}
            onKeyUp={handleInputEnter}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter password"
            value={password}
            onChange={(e) => onInputChange(e)}
            onKeyUp={handleInputEnter}
          />
          <button type="submit" className="btn btn-success">
            SignUp
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an account?</p>
        <Link type="submit" to="/" className="btn btn-primary mx-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
