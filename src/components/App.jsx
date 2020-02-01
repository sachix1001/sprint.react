import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { listObjects, getSingleObject } from "../utils/index";
import image from "../img/download.png";
import { setPhotos, chosePhoto } from "../redux/redux.js";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const [test, setTest] = useState("loading");

  const currentView = useSelector(state => state.view);
  const dispatch = useDispatch();

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
    }
  }, [currentView, dispatch]);

  return (
    <div className="app">
      <Navbar getPhotos={getPhotos}></Navbar>
      {currentView === "AllPhotos" ? (
        <AllPhotos></AllPhotos>
      ) : (
        <SinglePhoto></SinglePhoto>
      )}
      {test === "loading" ? (
        <img className="loaderText" src={image} alt="loading" />
      ) : null}
    </div>
  );
}
