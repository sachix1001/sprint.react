import React from "react";
import "../styles/navbar.css";
import _ from "lodash";
import Upload from "./Upload";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar-header navText" onClick={props.changeCurrentView}>
        HOME
      </div>
      <Upload upload={props.uploadPhoto}></Upload>
    </div>
  );
}
