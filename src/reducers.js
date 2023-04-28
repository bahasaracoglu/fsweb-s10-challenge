import {
  GET_NOTES_FROM_LS,
  NOT_EKLE,
  NOT_SIL,
  POST_LOADING,
  POST_SUCCESS,
} from "./actions";
import { notify } from "./notify";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Hello!|Darkness|My old friend",
    },
  ],
  loading: false,
  success: false,
};

const key = "s10ch";

function localStorageStateYaz(key, data) {
  console.log(data);
  console.log("here");
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku() {
  //console.log(JSON.parse(localStorage.getItem(key)));
  return JSON.parse(localStorage.getItem(key));
}

//console.log(localStorageStateOku());

export const reducer = (state = baslangicDegerleri, action) => {
  console.log("statenotlar", state.notlar);
  switch (action.type) {
    case GET_NOTES_FROM_LS:
      console.log("here");
      const savedFavs = localStorageStateOku();
      console.log(savedFavs);
      if (savedFavs !== null && savedFavs.length > 0) {
        const updatedState = { ...state, notlar: savedFavs };
        return updatedState;
      } else if (savedFavs === null || savedFavs.length === 0) {
        console.log("elseif");
        localStorageStateYaz(key, state.notlar);
        return state;
      }

    case POST_SUCCESS:
      return { ...state, success: action.payload };

    case POST_LOADING:
      return { ...state, loading: action.payload };

    case NOT_EKLE:
      const updatedState = {
        ...state,
        notlar: [...state.notlar, JSON.parse(action.payload)],
        loading: false,
        success: true,
      };

      localStorageStateYaz(key, updatedState.notlar);
      return updatedState;

    case NOT_SIL:
      console.log(action.payload);
      const removedState = {
        ...state,
        notlar: state.notlar.filter((not) => not.id !== action.payload),
        success: false,
      };
      localStorageStateYaz(key, removedState.notlar);
      notify("Not silindi!");
      return removedState;

    default:
      return state;
  }
};
