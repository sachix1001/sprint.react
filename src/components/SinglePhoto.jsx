import React from "react";
import "../styles/singlePhoto.css";
import { useSelector } from "react-redux";

export default function SinglePhoto() {
  const selectedPhoto = useSelector(state => state.selected);
  return (
    <div className="single-photo">
      <img className="photoImg" src={selectedPhoto} alt="single"></img>
    </div>
  );
}
