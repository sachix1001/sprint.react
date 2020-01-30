import React from "react";
import "../styles/singlePhoto.css";

export default function SinglePhoto(props) {
  const url = `data:image/png;base64,${props.photo.url}`;
  return (
    <div className="single-photo">
      <img
        className="photoImg"
        src={url}
        alt="single"
        onClick={() => {
          if (props.click) props.click(props.photo);
        }}
      ></img>
    </div>
  );
}
