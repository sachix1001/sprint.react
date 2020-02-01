import React from "react";
// import _ from "lodash";
import "../styles/upload.css";
import { saveObject, getSingleObject } from "../utils/index";
import { useDispatch } from "react-redux";
import { changeView, chosePhoto } from "../redux/redux.js";

export default function Upload(props) {
  const dispatch = useDispatch();
  const uploadPhoto = async photo => {
    await saveObject(photo);
    await dispatch(
      chosePhoto(`data:image/png;base64,${await getSingleObject(photo.name)}`)
    );
    await dispatch(changeView("SinglePhoto"));
  };

  return (
    <div className="file-upload">
      <label htmlFor="upload" className="file-upload__label">
        Upload file
      </label>
      <input
        type="file"
        className="file-upload-input"
        onChange={event => {
          return uploadPhoto(event.target.files[0]);
        }}
      ></input>
    </div>
  );
}
