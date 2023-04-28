import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { notSilAPI, yuklendi } from "../actions";
import { useHistory } from "react-router";

export default function Post({ item }) {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loading);
  const success = useSelector((store) => store.success);
  const history = useHistory();

  useEffect(() => {
    if (success === true) {
      dispatch(yuklendi());
    }
  }, [success, history]);

  function handleSil(e) {
    e.preventDefault();
    dispatch(notSilAPI(item.id));
    // burada ilgili eylemi dispatch edin
    // sonra toast mesajı gösterin
  }

  return (
    <div className="beyazKutu p-8 pb-6 mb-4 text-sm">
      <h1>
        {formatDistanceToNow(new Date(item.date), {
          addSuffix: true,
          locale: tr,
        })}
      </h1>

      {item.body.split("|").map((li) => (
        <p className="mt-2" key={li}>
          - {li}
        </p>
      ))}
      <div className="flex justify-between">
        <button
          disabled={loading}
          className="text-xs text-amber-600 mt-4 underline disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSil}
        >
          Bu notu sil
        </button>
      </div>
    </div>
  );
}
