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
  const [test, setTest] = useState("loading");

  const selectPhoto = selected => {
    setSelectedPhoto(selected);
    setCurrentView("SinglePhoto");
  };

  const changeCurrentView = change => {
    setCurrentView("AllPhotos");
  };

  const uploadPhoto = async photo => {
    await saveObject(photo[0]);
    await setSelectedPhoto({
      key: photo[0].name,
      url: await getSingleObject(photo[0].name)
    });
    await setCurrentView("SinglePhoto");
  };

  const getPhotos = async () => {
    const photoObj = await listObjects();
    console.log(photoObj);
    const photo64 = await Promise.all(
      photoObj.map(async photo => {
        return { key: photo.Key, url: await getSingleObject(photo.Key) };
      })
    );
    await setPhotos(photo64);
    await setTest("finish");
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    if (currentView === "AllPhotos") {
      setSelectedPhoto("");
      getPhotos();
    }
  }, [currentView]);

  return (
    <div className="app">
      <Navbar
        currentView={currentView}
        changeCurrentView={changeCurrentView}
        uploadPhoto={uploadPhoto}
        getPhotos={getPhotos}
      ></Navbar>
      {!selectedPhoto ? (
        <AllPhotos selectPhoto={selectPhoto} photos={photos}></AllPhotos>
      ) : (
        <SinglePhoto
          photo={selectedPhoto}
          photos={photos}
          click=""
        ></SinglePhoto>
      )}
      {test === "loading" ? (
        <React.Fragment>
          <div className="loader"></div>
          <div className="loaderText">loading...</div>
        </React.Fragment>
      ) : null}
    </div>
  );
}
