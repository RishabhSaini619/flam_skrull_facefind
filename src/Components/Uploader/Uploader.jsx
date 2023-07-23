import React, { useState, useRef } from "react";
import "./Uploader.css";
// import { uploadSkrull, uploadServer } from "../APIServices/APIServices";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [url, seturl] = useState(null);
  // const [skrull, setSkrull] = useState(null);
  const fileInputRef = useRef(null);

  const onImagePicked = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = (event) => {
    console.log("onUpload clicked");
    // const headers = {};
    // const formData = `${selectedFile}`;

    // uploadServer(formData, headers)
    //   .then((response) => seturl(response.data))
    //   .catch((error) => console.error(error));
  };

  const onSkrull = (event) => {
    console.log("onSkrull clicked");

    // const skrullHeaders = {};
    // const formData = `${url}`;

    // uploadSkrull(formData, skrullHeaders)
    //   .then((response) => setSkrull(response.data))
    //   .catch((error) => console.error(error));

  };
  const onViewAll = (event) => {

    console.log("onViewAll clicked");

  };

  return (
    <div className="Uploader_Body">
      <label className="Image_Container">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onImagePicked}
        />
        {!selectedFile && <div>please pick the image</div>}
        {selectedFile && (
          <div className="Image">
            <img
              className="Image"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
            />
          </div>
        )}
      </label>
      <div className="Buttons">
        <div className="Buttons_Container" onClick={onUpload}>
          Upload to Server
        </div>
        <div className="Buttons_Container" onClick={onSkrull}>
          Upload to Skrull
        </div>
        <div className="Buttons_Container" onClick={onViewAll}>
          View All
        </div>
      </div>
    </div>
  );
};

export default Uploader;
