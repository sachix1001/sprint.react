import { createStore } from "redux";

const initialState = {
  view: "AllPhotos",
  photos: [],
  selectedPhoto: ""
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
export const chosePhoto = select => {
  return {
    type: "SELECT_PHOTO",
    select
  };
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CHANGE_VIEW": {
      return { ...state, view: action.view };
    }
    case "SET_PHOTOS": {
      return { ...state, photos: action.photos };
    }
    case "SELECT_PHOTO": {
      return { ...state, selectedPhoto: action.select };
    }
  }
  return state;
};

export const store = createStore(reducer);
