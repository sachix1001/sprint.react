import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { saveObject, listObjects, getSingleObject } from "../utils/index";
import image from "../img/download.png";
import { changeView, setPhotos, chosePhoto } from "../redux/redux.js";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  // const [currentView, setCurrentView] = useState("AllPhotos");
  // const [photos, setPhotos] = useState([]);
  // const [selectedPhoto, setSelectedPhoto] = useState("");
  const [test, setTest] = useState("loading");

  const currentView = useSelector(state => state.view);
  const photos = useSelector(state => state.photos);
  const selectedPhoto = useSelector(state => state.selectedPhoto);
  const dispatch = useDispatch();

  const selectPhoto = selected => {
    dispatch(chosePhoto(selected));
    dispatch(changeView("SinglePhoto"));
  };

  const changeCurrentView = change => {
    // console.log("changed")
    dispatch(changeView("AllPhotos"));
  };

  const uploadPhoto = async photo => {
    await saveObject(photo[0]);
    await dispatch(
      chosePhoto({
        key: photo[0].name,
        url: await getSingleObject(photo[0].name)
      })
    );
    await dispatch(changeView("SinglePhoto"));
    await getPhotos();
  };

  const getPhotos = async () => {
    const photoObj = await listObjects();
    const photo64 = await Promise.all(
      photoObj.map(async photo => {
        return { key: photo.Key, url: await getSingleObject(photo.Key) };
      })
    );
    await dispatch(setPhotos(photo64));
    await setTest("finish");
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    if (currentView === "AllPhotos") {
      dispatch(chosePhoto(""));
      // getPhotos();
    }
  }, [currentView, dispatch]);

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
        <img className="loaderText" src={image} alt="loading" />
      ) : null}
    </div>
  );
}
