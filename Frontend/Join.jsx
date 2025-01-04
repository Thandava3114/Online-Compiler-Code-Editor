import React, { useState } from "react";
import NavBar from "./NavBar";
import { v4 as uuidV4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

const Join = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    navigate("/create", { state: { roomId: id } });
  };

  const openEditorPage = (e) => {
    e?.preventDefault();
    if (roomId) {
      navigate(`/editor/${roomId}`, {
        state: {
          username,
        },
      });
    } else {
      console.error("Room ID is required");
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
          <h4 className="mailLabel">Join room</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={handleInputEnter}
            />
            <button
              onClick={openEditorPage}
              className="btn btn-success createButton"
            >
              Join
            </button>
            <span className="joinInfo">
              Don't you have Room Id? &nbsp;
              <Link
                to="/create"
                onClick={createNewRoom}
                className="btn btn-primary"
              >
                Create
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
