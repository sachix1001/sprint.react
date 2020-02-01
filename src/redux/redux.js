import { createStore } from "redux";

const initialState = {
  view: "AllPhotos",
  photos: [],
  selected: "",
  update: ""
};

export const changeView = view => {
  return {
    type: "CHANGE_VIEW",
    view
  };
};
export const setPhotos = photos => {
  return {
    type: "SET_PHOTOS",
    photos
  };
};
export const chosePhoto = selected => {
  return {
    type: "SELECT_PHOTO",
    selected
  };
};

export const updatePhoto = update => {
  return {
    type: "UPDATE_PHOTO",
    update
  };
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CHANGE_VIEW": {
      console.log(action.view);
      return { ...state, view: action.view };
    }
    case "SET_PHOTOS": {
      return { ...state, photos: action.photos };
    }
    case "SELECT_PHOTO": {
      return { ...state, selected: action.selected };
    }
    case "UPDATE_PHOTO": {
      return { ...state, update: action.update };
    }
  }
  return state;
};

export const store = createStore(reducer);
