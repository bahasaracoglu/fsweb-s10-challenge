import axios from "axios";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_LOADING = "POST_LOADING";
export const POST_ERROR = "POST_ERROR";
export const GET_NOTES_FROM_LS = "GET_NOTES_FROM_LS";
export const TUMUNU_SIL = "TUMUNU_SIL";

export function getNotesFromLocalStorage() {
  console.log("here");
  return { type: GET_NOTES_FROM_LS };
}

export function yuklendi() {
  return { type: POST_SUCCESS, payload: false };
}

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export function tumunuSil() {
  return { type: TUMUNU_SIL };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  dispatch({ type: POST_LOADING, payload: true });
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEkle(res.data.data));
        dispatch({ type: POST_LOADING, payload: false });
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  console.log(id);
  dispatch({ type: POST_LOADING, payload: true });
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(notSil(res.data.data));
        dispatch({ type: POST_LOADING, payload: false });
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
      }
    })
    .catch((error) => console.log(error));
};
