import React from "react";
import NavBar from "./NavBar";
import { v4 as uuidV4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    navigate("/create", { state: { roomId: id } });
  };
  return (
    <>
      <NavBar />
      <div className="container mt-5 text-center">
        <h2 style={{ marginBottom: "10rem" }}>
          Welcome to the Online Compiler & Code Editor
        </h2>
        <div className="d-flex justify-content-center mt-4">
          <Link
            to="/create"
            onClick={createNewRoom}
            className="btn btn-primary mx-3"
          >
            Create Room
          </Link>
          <Link to="/join" className="btn btn-secondary mx-3">
            Join Room
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
