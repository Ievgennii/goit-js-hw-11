const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';

export function fetchGallery(options) {
  return axios
    .get(BASE_URL, options)
    .then(function (res) {
      // if (!res.ok) {
      //   throw new Error(res.status);
      // }
       console.log(res);
      return res;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
