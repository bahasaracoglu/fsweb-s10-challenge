import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getNotesFromLocalStorage, tumunuSil } from "../actions";

const PostList = () => {
  const loading = useSelector((store) => store.loading);
  const notlar = useSelector((store) => store.notlar);
  const dispatch = useDispatch();
  //console.log(notlar);

  useEffect(() => {
    dispatch(getNotesFromLocalStorage());
  }, []);

  return notlar.length === 0 ? (
    <div className="beyazKutu text-center p-6">Hiç notunuz yok</div>
  ) : (
    <div>
      <button
        onClick={() => dispatch(tumunuSil())}
        className=" transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white mb-3 "
      >
        Tümünü Sil
      </button>
      {notlar.map((not) => (
        <Post item={not} key={not.id} />
      ))}
      {loading && (
        <h2 className=" text-m text-black-600 mt-4 ">Not siliniyor...</h2>
      )}
    </div>
  );
};

export default PostList;
