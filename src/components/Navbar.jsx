import React from "react";
import "../styles/navbar.css";
// import _ from "lodash";
import Upload from "./Upload";
import { useDispatch } from "react-redux";
import { changeView } from "../redux/redux";

export default function Navbar(props) {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div
        className="navbar-header navText"
        onClick={() => {
          props.getPhotos();
          dispatch(changeView("AllPhotos"));
        }}
      >
        REFRESH
      </div>
      <div
        className="navbar-header navText"
        onClick={() => {
          dispatch(changeView("AllPhotos"));
        }}
      >
        ALL PHOTOS
      </div>
      <Upload getPhotos={props.getPhotos}></Upload>
    </div>
  );
}
