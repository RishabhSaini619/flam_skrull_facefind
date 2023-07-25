import axios from "axios";

const signURL = "https://zingcam.dev.flamapp.com/zingcam/v1/signed-url";

const signAuth = "MIIJrTBXBgkqhkiG9w0BBQ0wSjApBgkq";

export const uploadServer = async (requestPayload) => {
  try {
    const response = await axios.post(signURL, requestPayload, {
      headers: {
        "x-api-key": signAuth,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const uploadImage = async (uploadUrl, selectedFile, header) => {
  try {
    const response = await axios.put(uploadUrl, selectedFile, header);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const skrullURL = "https://zingcam.dev.flamapp.com/scarlet/v1/upload";

const skrullAuth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOnRydWV9.Y4gTukaeBENTPhv8vXdZA29Ooc5SHBron-BJ8ev7bNU";

export const uploadSkrull = async (data) => {
  try {
    const response = await axios.post(skrullURL, data, {
      headers: {
        Authorization: skrullAuth,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
