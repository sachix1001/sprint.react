import React, { useState } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { saveObject } from "../utils/index";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const selectPhoto = selected => {
    setSelectedPhoto("selected");
    setCurrentView("SinglePhoto");
  };

  const changeCurrentView = change => {
    setCurrentView("AllPhotos");
  };

  const uploadPhoto = async photo => {
    // console.log("uploaded!", photo);
    const savedPhoto = await saveObject(photo);
    setPhotos([...photos, savedPhoto]);
    await console.log(savedPhoto);
  };

  return (
    <div className="app">
      <Navbar
        currentView={currentView}
        changeCurrentView={changeCurrentView}
        uploadPhoto={uploadPhoto}
      ></Navbar>
      {selectedPhoto ? (
        <AllPhotos selectPhoto={selectPhoto} photos={photos}></AllPhotos>
      ) : (
        <SinglePhoto photo={selectedPhoto}></SinglePhoto>
      )}
    </div>
  );
}
