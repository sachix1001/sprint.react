import React from "react";

export default function SinglePhoto(props) {
  return (
    <div className="single-photo">
      <img src={props.photo} alt="single" onClick={props.click}></img>
    </div>
  );
}
