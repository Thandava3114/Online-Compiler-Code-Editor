import React, { useRef, useState } from "react";
import Client from "./Client";
import "./EditorPage.css";
import CodeEditor from "./CodeEditor";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { initSocket } from "../Server/socket";
import ACTIONS from "../Server/Actions";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const codeRef = useRef(null);

  const [clients, setClients] = useState([]);

  const { roomId } = useParams();
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      function handleError(e) {
        console.log("socket error", e);
        toast.error("Socket Connection Failed, try again later");
        navigate("/home");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      let joinToastShown = {};

      //Joining into the Room
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (
            username !== location.state?.username &&
            !joinToastShown[username]
          ) {
            toast.success(`${username} joined`);
            joinToastShown[username] = true;
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      //Leaving from the Room
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        setClients((prev) => {
          toast.success(`${username} left`);
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [location.state?.username, roomId, navigate]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Rooom Id Copied to Clipboard");
    } catch (error) {
      toast.error("Error in copying Room Id");
      console.log(error);
    }
  };

  const leaveRoom = () => {
    toast.success("You Left the Room Succesfully...!");
    navigate("/home");
  };

  if (!location.state) {
    <Navigate to="/home" />;
  }

  return (
    <div className="mainRapper">
      <div className="sideRapper">
        <div className="sideInner">
          <div className="logo">
            <img src="/Logo.png" alt="Icon" className="logoImage" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn btn-primary" onClick={copyRoomId}>
          Copy Room Id
        </button>
        <button className="btn leaveBtn btn-danger" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorRapper">
        <CodeEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
