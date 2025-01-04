import React, { useState } from "react";
import NavBar from "./NavBar";
import "./Create.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId || "No Rooom Id";
  const [username, setUsername] = useState("");

  const openEditorPage = (e) => {
    e?.preventDefault();
    if (roomId !== "No Room Id") {
      toast.success("Room Created Succesfully...!");
      navigate(`/editor/${roomId}`, { state: { username: username } });
    } else {
      console.error("Room ID is missing");
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      openEditorPage(e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="homePackageRapper">
        <div className="formRapper">
          <h4 className="mailLabel">Create room</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              value={roomId}
              readOnly
              placeholder="Room ID"
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inputBox"
              placeholder="Username"
              onKeyUp={handleInputEnter}
            />
            <button
              onClick={openEditorPage}
              className="btn btn-success createButton"
            >
              Create
            </button>
            <span className="joinInfo mt-5">
              Do you have a Room Id? &nbsp;
              <Link to="/join" className="btn btn-primary">
                Join
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
