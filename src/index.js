import templateFunction from './templates/template.hbs';
// const axios = require('axios').default;
import Notiflix from 'notiflix';
import { fetchGalery } from './galery-api';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// document.body.innerHTML = templateFunction();
const galeryFormEl = document.querySelector('#search-form');
const ulGaleryEl = document.querySelector('.gallery');

galeryFormEl.addEventListener('submit', handleSearchGalery);

let options = {
  params: {
    key: '34611977-1c6ac37fcf885911789ad5cb9',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
};

function handleSearchGalery(event) {
  event.preventDefault();
  options.params.q = event.target.elements.searchQuery.value.trim();
  // console.log(options);
  fetchGalery(options).then(function (data) {
    // console.log(data.data);
    console.log(data.data.hits);
    console.log(data.data.hits[0].webformatURL);
    const addImagesGalery = createImagesGalery(data.data.hits);
    ulGaleryEl.innerHTML = addImagesGalery;
    let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
    gallery.on('show.simplelightbox');
    // new SimpleLightbox('.gallery a', { captionDelay: 250 });
  });
}

function createImagesGalery(items) {
  return items.map(item => templateFunction(item)).join('');
}

// function fetchGalery (options) {
//  const BASE_URL = 'https://pixabay.com/api/'

// return axios.get(BASE_URL, options)
// .then(function (response) {
//   console.log(response);
//   return response;
// })
// .catch(function (error) {
//   console.log(error);
// })
// .finally(function () {
//   // always executed
// });
// }

// fetch(`${BASE_URL}?key=${KEY_API}&q=flowers&image_type=photo&orientation=horizontal&safesearch=true`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.warn(err);
//   });
