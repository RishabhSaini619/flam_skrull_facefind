import React, { useState, useRef } from "react";
import "./Uploader.css";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

  const onImagePicked = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUpload = (event) => {
console.log("btn clicked");  };

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
      <div className="Buttons_Container" onClick={onUpload}>
        Upload to Server
      </div>
    </div>
  );
};

export default Uploader;
