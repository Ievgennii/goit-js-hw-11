const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';

export async function fetchGallery(options) {
   const getAxios = await axios.get(BASE_URL, options);   
   return getAxios
   
    // .then(function (res) {
      
    //    console.log(res);
    //   return res;
    // })
    
}
