const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';

export function fetchGalery(options) {
  return axios
    .get(BASE_URL, options)
    .then(function (response) {
      console.log(response);
      return response;
    })

    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
