import axios from "axios";

const signURL = "https://zingcam.dev.flamapp.com/zingcam/v1/signed-url";

const signAuth = "MIIJrTBXBgkqhkiG9w0BBQ0wSjApBgkq"; 

export const uploadServer = async (requestPayload) => {
  try {
    const response = await axios.post(signURL, requestPayload,{
      headers: {
        "x-api-key": signAuth,
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const uploadImage = async (uploadUrl, formData) => {
  try {
    const response = await axios.put(uploadUrl, formData,{
      headers: {
        "x-api-key": signAuth,
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const skrullURL = "https://zingcam.dev.flamapp.com/scarlet/api/scarlet/v1/upload/";


export const uploadSkrull = async (formData, skrullHeaders) => {
  try {
    const response = await axios.post(skrullURL, formData, { skrullHeaders });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};


