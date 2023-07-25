import React, { useState, useRef, useEffect } from "react";
import "./Uploader.css";
import {
  uploadServer,
  uploadImage,
  uploadSkrull,
  searchSkrull,
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
  const [upSkrull, setUpSkrull] = useState([]);
  const [schSkrull, setSchSkrull] = useState(null);

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
        .then((response) => console.log("uploadImage", response.data))
        .catch((error) => console.error(error));
    }
  }, [signedUrl]);

  const onUploadSkrull = (event) => {
    console.log("onUploadSkrull clicked");

    const data = {
      id: generateId(),
      url: `${signedUrl.resourceUrl}`,
    };

    console.log("data", data);

    uploadSkrull(data)
      .then((response) => setUpSkrull(response))
      .catch((error) => console.error(error));
    console.log("post onUploadSkrull clicked", upSkrull);
  };

  const onSearchSkrull = (event) => {
    console.log("onSearchSkrull clicked");

    const data = {
      id: generateId(),
      url: `${signedUrl.resourceUrl}`,
    };

    console.log("data", data);

    searchSkrull(data)
      .then((response) => setSchSkrull(response.data))
      .catch((error) => console.error(error));
    console.log("post onSearchSkrull clicked", schSkrull);
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
        {!signedUrl ? (
          <div className="Buttons">
            <div className="Buttons_Container" onClick={onUpload}>
              Upload to Server
            </div>
          </div>
        ) : (
          <div className="Buttons">
            <div className="Buttons_Container" onClick={onUploadSkrull}>
              Upload to Skrull
            </div>
            <div className="Buttons_Container" onClick={onSearchSkrull}>
              Search from Skrull
            </div>
          </div>
        )}
      </div>
      <div className="Response">
        {upSkrull.data && upSkrull.data.length > 0 ? (
          <div className="uploadData">
            <div className="uploadHead">
              <div>Message : </div>
              <div>{upSkrull.message}</div>
            </div>
            {upSkrull.data.map((index) => (
              <div className="uploadIndex">
                <div className="uploadItem">
                  <div>Student Id : </div>
                  <div> {index.student_id}</div>
                </div>
                <div className="uploadItem">
                  <div>Order Id : </div>
                  <div>{index.order_id}</div>
                </div>
                <div className="uploadItem">
                  <div>Message : </div> <div>{index.message}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="responseData">Loading</div>
        )}

        {schSkrull && schSkrull.length > 0 ? (
          schSkrull.map((index) => (
            <div className="searchData" >
              <img className="searchImage" src={index.image_url} alt="studentImage"/>
              <div className="searchIndex">
              <div className="searchItem">
                  <div>Order Id : </div>
                  <div> {index._id}</div>
                </div>
                <div className="searchItem">
                  <div>Student Id : </div>
                  <div>{index.student_id}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="responseData">Loading</div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
