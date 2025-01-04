import React, { useState } from "react";
import "./Output.css";
import { executeCode } from "./api";
import toast from "react-hot-toast";
import ACTIONS from "../Server/Actions";

const Output = ({ socketRef, editorRef, language, roomId }) => {
  const [output, setOutput] = useState(null);

  const runCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;
    try {
      const { run: result } = await executeCode(language, code);
      setOutput(result.output);
      toast.success("Code Executed Succesfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Run Code");
    } finally {
    }
  };

  const clearText = () => {
    if (editorRef.current) {
      editorRef.current.setValue("");
      socketRef.current.emit(ACTIONS.CLEAR_TEXT, { roomId });
      toast.success("Text Cleared...!");
    } else {
      toast.error("Failed to Clear Text");
    }
  };

  const downloadCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const languageExtensions = {
        javascript: "js",
        typescript: "ts",
        java: "java",
        python: "py",
        c: "c",
        cpp: "cpp",
        csharp: "cs",
        php: "php",
      };
      const extension = languageExtensions[language] || "txt";

      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `code.${extension}`;
      link.click();

      URL.revokeObjectURL(url);

      toast.success("Code Downloaded Succesfully...!");
    } else {
      toast.error("Failed to Download Code");
    }
  };

  const saveCode = () => {};

  return (
    <>
      <div className="buttonContainer">
        <div className="buttons">
          <div className="btns">
            <button
              className="saveButton mx-2 btn btn-outline-info"
              onClick={saveCode}
            >
              Save
            </button>
            <button
              className="runButton mx-2 btn btn-outline-success"
              onClick={runCode}
            >
              Run Code
            </button>
            <button
              className="downloadButton mx-2 btn btn-outline-primary"
              onClick={downloadCode}
            >
              Download
            </button>
            <div className="clear">
              <button
                className="clearButton btn btn-outline-danger"
                onClick={clearText}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="output">
        <h5 className="outputText">Output:</h5>
        <div id="output">
          {output ? (
            output
          ) : (
            <div className="div1">
              Click{" "}
              <span className="div2" style={{ color: "green" }}>
                Run Code
              </span>{" "}
              to get the Output here
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Output;
