import React, { useState, useRef, useEffect } from "react";
import "./Uploader.css";
import {
  uploadServer,
  uploadImage,
  uploadSkrull,
  uniqueId,
} from "../APIServices/APIServices";

function generateId() {
  var length = 16,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signedUrl, setSignedUrl] = useState(null);
  const [skrull, setSkrull] = useState(null);
  const fileInputRef = useRef(null);

  const onImagePicked = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const onUpload = (event) => {
    console.log("onUpload clicked", selectedFile, selectedFile.name);

    const requestPayload = {
      filename: selectedFile.name,
      content_type: "image/jpeg",
    };

    uploadServer(requestPayload)
      .then((response) => setSignedUrl(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log("useEffect", signedUrl);
    if (signedUrl) {
      const header = {
        "Content-Type": `${selectedFile.type}`,
      };
      uploadImage(`${signedUrl.uploadUrl}`, selectedFile, header)
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    }
  }, [signedUrl]);

  const onSkrull = (event) => {
    console.log("onSkrull clicked");

    const data = {
      id: generateId(),
      url: `${signedUrl.uploadUrl}`,
    };

    console.log("data", data);

    uploadSkrull(data)
      .then((response) => setSkrull(response.data))
      .catch((error) => console.error(error));
    console.log("post onSkrull clicked", skrull);
  };
  // const onViewAll = (event) => {
  //   console.log("onViewAll clicked");
  // };

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
        {!signedUrl && (
          <div className="Buttons_Container" onClick={onUpload}>
            Upload to Server
          </div>
        )}
        {signedUrl && (
          <div className="Buttons_Container" onClick={onSkrull}>
            Upload to Skrull
          </div>
        )}
        {/* 
        
         {!signedUrl ? (
          <div className="Buttons_Container" onClick={onUpload}>
            Upload to Server
          </div>
        ): (<div className="Buttons_Container" onClick={onSkrull}>
          Upload to Skrull
        </div>)}

        <div className="Buttons_Container" onClick={onViewAll}>
          View All
        </div> */}
      </div>
    </div>
  );
};

export default Uploader;
