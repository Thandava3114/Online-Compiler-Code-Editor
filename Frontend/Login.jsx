import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    } catch (error) {
      console.log("Error Fetching User", error);
      setError("Failed to load User");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );
    if (userFound) {
      navigate("/home");
      toast.success("Login Succesful");
    } else {
      toast.error("Enter valid Credentials");
    }
  };
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <div className="addUser">
        <h3>Login</h3>
        <form className="addUserForm" onSubmit={handleLogin}>
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="Enter your email"
              onKeyUp={handleInputEnter}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="Enter password"
              onKeyUp={handleInputEnter}
            />
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
        {/* Display error message if login fails */}
        {error && <p className="error">{error}</p>}
        <div className="login">
          <p>Don't you have an account?</p>
          <Link to="/signup" type="submit" className="btn btn-primary mx-2">
            SignUp
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
