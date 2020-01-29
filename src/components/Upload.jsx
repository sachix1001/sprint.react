import React from "react";
import _ from "lodash";
import "../styles/upload.css";

export default function Upload(props) {
  return (
    <div className="file-upload">
      <input
        type="file"
        className="file-upload-input"
        onChange={event => {
          return props.upload(event.target.files);
        }}
      ></input>
    </div>
  );
}
