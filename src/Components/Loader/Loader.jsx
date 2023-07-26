import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loader.css";

export const Loader = (isLoading) => {
  return (
    <div className="Loader">
      <ClipLoader
        className="Spinner"
        loading={isLoading}
      />
      <div className="Text">Plaese wait while data is fetching.</div>
    </div>
  );
};
