import React, { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import "./CodeEditor.css";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Server/Actions";

const CodeEditor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("typescript");
  const onSelect = (language) => {
    setLanguage(language);
  };
  useEffect(() => {
    async function init() {
      if (!editorRef.current) {
        editorRef.current = CodeMirror.fromTextArea(
          document.getElementById("realtimeEditor"),
          {
            mode: { name: "javascript", json: true },
            theme: "rubyblue",
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
          }
        );
      }
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (
          code !== null &&
          editorRef.current &&
          editorRef.current.getValue() !== code
        ) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      if (socketRef.current) {
        // eslint-disable-next-line
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
    // eslint-disable-next-line
  }, [editorRef.current]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CLEAR_TEXT, () => {
        if (editorRef.current) {
          editorRef.current.setValue("");
        }
      });
    }
    return () => {
      if (socketRef.current) {
        // eslint-disable-next-line
        socketRef.current.off(ACTIONS.CLEAR_TEXT);
      }
    };
    // eslint-disable-next-line
  }, [socketRef.current]);

  return (
    <>
      <LanguageSelector language={language} onSelect={onSelect} />
      <textarea id="realtimeEditor" className="realtimeEditor"></textarea>
      <Output editorRef={editorRef} language={language} roomId={roomId} socketRef={socketRef}/>
    </>
  );
};

export default CodeEditor;
