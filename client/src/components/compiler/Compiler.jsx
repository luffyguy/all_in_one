import React, { useState, useEffect } from "react";
import axios from "axios";

let initialValues = {
  script: "",
  language: "cpp17",
  versionIndex: "0",
  clientId: "e7a314c48cf2b81623c63e8393f36ee4",
  clientSecret:
    "55792fd260d8eedf1cf01b1915fe2c14572feef794a4e810cab11a43d4189abb",
};
const Compiler = () => {
  const [program, setProgram] = useState(initialValues);
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
    console.log(initialValues.script);
  };

  const executeProgram = () => {
    console.log(program);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/compile",
      data: program,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <p>Compiler OP</p>
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          name="script"
          id="acript"
          cols="100"
          rows="20"
          style={{fontFamily: "monospace"}}
        ></textarea>
        <button onClick={executeProgram}>Run</button>
      </div>
    </div>
  );
};

export default Compiler;
