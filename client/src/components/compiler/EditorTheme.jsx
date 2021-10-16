import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/yeti.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import socket from "../../socket";

const Editor = ({ value, onChange }) => {
  const [editorTheme, setEditorTheme] = useState("material");

  const handleChange = (editor, data, value) => {
    onChange(value);
    socket.emit('write-text', value);
  };

  const handleTheme = (e) => {
    setEditorTheme(e.target.value);
    console.log(editorTheme);
  };

  return (
    <div>
      <p>
        {" "}
        Select Theme -{" "}
        <select onChange={handleTheme} id="theme">
          <option defaultValue value="material">
            material
          </option>
          <option value="blackboard">blackboard</option>
          <option value="cobalt">cobalt</option>
          <option value="dracula">dracula</option>
          <option value="eclipse">eclipse</option>
          <option value="monokai">monokai</option>
          <option value="neo">neo</option>
          <option value="panda-syntax">panda-syntax</option>
          <option value="solarized dark">solarized dark</option>
          <option value="solarized light">solarized light</option>
          <option value="yeti">yeti</option>
        </select>
      </p>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          theme: editorTheme,
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Editor;
