import React, { useState, useRef, useEffect } from "react";
import "./Uploader.css";
import { uploadServer, uploadImage } from "../APIServices/APIServices";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signedUrl, setSignedUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null)
  // const [skrull, setSkrull] = useState(null);
  const fileInputRef = useRef(null);

  const onImagePicked = (event) => {
    setSelectedFile(event.target.files[0]); 
  };

  const onUpload = (event) => {
    console.log("onUpload clicked",selectedFile,selectedFile.name);

    const requestPayload = {
      filename: selectedFile.name,
      "content_type": "image/jpg" 
    }

    uploadServer(requestPayload)
      .then((response) => setSignedUrl(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(()=>{
    console.log("useEffect",signedUrl);
    if(signedUrl){
        const formData = new FormData();
        formData.append(`${selectedFile.name}`,`${selectedFile}`);
        const header = {
          'Content-Type': `${selectedFile.type}`
        }
        uploadImage(`${signedUrl.uploadUrl}`, selectedFile, header)
          .then((response) => setUploadedFile(response.data))
        .catch((error) => console.error(error));
    }
console.log("post use effect",uploadedFile);

  }, [signedUrl])

  // console.log(uploadedFile && uploadedFile.name);

  const onSkrull = (event) => {
    // console.log("onSkrull clicked", signedUrl.resourceUrl);

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
