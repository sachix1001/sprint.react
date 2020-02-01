import React from "react";
// import _ from "lodash";
// import { PresignedPost } from "aws-sdk/clients/s3";
import "../styles/AllPhotos.css";
import { useSelector, useDispatch } from "react-redux";
import { chosePhoto, changeView } from "../redux/redux";
import shortid from "shortid";

export default function AllPhotos() {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos);
  return (
    <div className="allPhotos">
      {photos.map(photo => {
        return (
          <img
            className="photoImg"
            alt="single"
            src={`data:image/png;base64,${photo.url}`}
            key={shortid.generate()}
            onClick={e => {
              dispatch(chosePhoto(e.target.src));
              dispatch(changeView("SinglePhoto"));
            }}
          ></img>
        );
      })}
    </div>
  );
}
