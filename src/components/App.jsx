import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { saveObject, listObjects, getSingleObject } from "../utils/index";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const selectPhoto = selected => {
    setSelectedPhoto(selected);
    console.log(selected);
    setCurrentView("SinglePhoto");
    console.log(currentView, selectedPhoto);
  };

  const changeCurrentView = change => {
    console.log(currentView, "changed?");
    setCurrentView("AllPhotos");
  };

  const uploadPhoto = async photo => {
    const savedPhoto = await saveObject(photo);
    setPhotos([...photos, savedPhoto]);
    await console.log(savedPhoto);
  };

  const getPhotos = async () => {
    const photoObj = await listObjects();
    const photo64 = await Promise.all(
      photoObj.map(async photo => {
        return { key: photo.Key, url: await getSingleObject(photo.Key) };
      })
    );
    setPhotos(photo64);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    if (currentView === "AllPhotos") {
      setSelectedPhoto("");
    }
  }, [currentView]);

  return (
    <div className="app">
      <Navbar
        currentView={currentView}
        changeCurrentView={changeCurrentView}
        uploadPhoto={uploadPhoto}
      ></Navbar>
      {!selectedPhoto ? (
        <AllPhotos selectPhoto={selectPhoto} photos={photos}></AllPhotos>
      ) : (
        <SinglePhoto photo={selectedPhoto} photos={photos}></SinglePhoto>
      )}
      {/* <AllPhotos selectPhoto={selectPhoto} photos={photos}></AllPhotos> */}
    </div>
  );
}
