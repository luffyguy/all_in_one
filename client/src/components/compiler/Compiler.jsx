import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../socket";

//codemirror
import "codemirror/mode/javascript/javascript";

//components
import languageCode from "../../data/compiler/data";
import Editor from "./EditorTheme";

let initialValues = {
  script: languageCode[0],
  language: "cpp17",
  versionIndex: "0",
  clientId: "e7a314c48cf2b81623c63e8393f36ee4",
  clientSecret:
    "55792fd260d8eedf1cf01b1915fe2c14572feef794a4e810cab11a43d4189abb",
};
const Compiler = () => {
  const [program, setProgram] = useState(initialValues);
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState(program.language);
  const [script, setScript] = useState(program.script);
  const [compiling, setCompiling] = useState(false);

  const handleChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
    if (e.target.name === "language") {
      setLanguage(e.target.value);
    }
    if (e.target.value === "cpp17") {
      setScript(languageCode[0]);
    } else if (e.target.value === "python3") {
      setScript(languageCode[1]);
    } else if (e.target.value === "java") {
      setScript(languageCode[2]);
    } else {
      setScript(languageCode[3]);
    }
    socket.emit("write-text", e.target.value);
  };

  useEffect(() => {
    program.script = script;
    console.log(program);
  }, [script]);

  useEffect(() => {
    socket.on("updated-text", (data) => {
      setScript(data);
    });
    socket.on("recieve-output", (data) => {
      setResult(data);
    });
  }, []);

  const executeProgram = () => {
    setCompiling(true);
    setResult("");
    console.log(program);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/compile",
      data: program,
    })
      .then((res) => {
        setCompiling(false);
        console.log(res.data.output);
        setResult(res.data.output);
        socket.emit("send-output", res.data.output);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("language", language);
  };

  return (
    <div>
      <div>
        <p>Compiler OP</p>
        <p>
          Select Language -{" "}
          <select name="language" id="language" onChange={handleChange}>
            <option value="cpp17">C++</option>
            <option value="python3">Python</option>
            <option value="java">Java</option>
            <option value="php">Php</option>
          </select>
        </p>
        <div style={{ width: "500px", border: "1px solid black" }}>
          <Editor value={script} onChange={setScript} />
        </div>
        <button onClick={executeProgram}>Run</button>
      </div>
      <div>
        {compiling ? <p>compiling...</p> : <span></span>}
        {result ? <samp className="">{result}</samp> : <span></span>}
      </div>
    </div>
  );
};
export default Compiler;
