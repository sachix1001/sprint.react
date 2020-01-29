import React from "react";
import _ from "lodash";
import { PresignedPost } from "aws-sdk/clients/s3";
import "../styles/AllPhotos.css";

import SinglePhoto from "./SinglePhoto";

export default function AllPhotos(props) {
  return (
    <div className="allPhotos">
      {props.photos.map(photo => {
        console.log(photo);
        return (
          <SinglePhoto
            key={photo.key}
            photo={photo}
            click={props.selectPhoto}
          ></SinglePhoto>
        );
      })}
    </div>
  );
}
