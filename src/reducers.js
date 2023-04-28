import { act } from "react-dom/test-utils";
import { NOT_EKLE, NOT_SIL, POST_LOADING, POST_SUCCESS } from "./actions";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
  loading: false,
  success: false,
};

const key = "s10ch";

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export const reducer = (state = baslangicDegerleri, action) => {
  switch (action.type) {
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
      localStorageStateYaz(key, updatedState);

      return updatedState;

    case NOT_SIL:
      console.log(action.payload);
      const removedState = {
        ...state,
        notlar: state.notlar.filter((not) => not.id !== action.payload),
      };
      localStorageStateYaz(key, removedState);
      return removedState;

    default:
      return state;
  }
};
