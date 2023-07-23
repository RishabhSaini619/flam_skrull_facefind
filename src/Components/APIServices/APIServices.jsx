import axios from 'axios';

const signURL = 'https://zingcam.dev.flamapp.com/zingcam/v1/signed-url';
const skrullURL = "https://zingcam.dev.flamapp.com/scarlet/api/scarlet/v1/upload";

export const uploadServer = {
  uploadImage: async (formData, headers ) => {
    try {
      axios.post(signURL, formData, { headers })
        .then(response => {

          console.log(response.data);
          return response.data
        })
        .catch(error => {
          throw new Error(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export const uploadSkrull = {
  uploadImage: async (formData, skrullHeaders ) => {
    try {
      axios.post(skrullURL, formData, { skrullHeaders })
        .then(response => {

          console.log(response.data);
          return response.data
        })
        .catch(error => {
          throw new Error(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  },
};






