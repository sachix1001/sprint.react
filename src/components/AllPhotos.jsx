import React from "react";
import _ from "lodash";
import { PresignedPost } from "aws-sdk/clients/s3";

import SinglePhoto from "./SinglePhoto";

export default function AllPhotos(props) {
  return (
    <div>
      {props.photos.map(photo => (
        <SinglePhoto photo={photo} click={props.selectedPhoto}></SinglePhoto>
      ))}
    </div>
  );
}
