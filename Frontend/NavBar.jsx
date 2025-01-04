import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const NavBar = () => {
  const logoutToast = () => {
    toast.success("Logged out Succesfully...!");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Compiler & Code Editor
          </Link>
          <Link to="/" className="btn btn-outline-light" onClick={logoutToast}>
            Logout
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
