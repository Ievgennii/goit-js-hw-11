import templateFunction from './templates/template.hbs';
// const axios = require('axios').default;
import Notiflix from 'notiflix';
import { fetchGallery } from './gallery-api';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// document.body.innerHTML = templateFunction();
const galeryFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

galeryFormEl.addEventListener('submit', handleSearchGallery);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

let options = {
  params: {
    key: '34611977-1c6ac37fcf885911789ad5cb9',
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
  },
};

function handleSearchGallery(event) {
  event.preventDefault();
  options.params.q = event.target.elements.searchQuery.value.trim();
  console.log(options.params.q);
  // console.log(options);
  fetchGallery(options)
    .then(function ({ data }) {
      // console.log(data.data);
      // console.log(data.data.hits);
      // console.log(data.data.hits[0].webformatURL);
      if (!data.hits.length) {
        throw new Error();
      }
      addImagesGallery(data);
      if (data.totalHits === options.params.page) {
        return;
      }
      loadMoreBtnEl.classList.remove('is-hidden');

      // let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
      // gallery.on('show.simplelightbox');
      // new SimpleLightbox('.gallery a', { captionDelay: 250 });
      galeryFormEl.reset()
    })
    .catch(() => {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      galeryFormEl.reset()
    });
}

function createImagesGallery(items) {
  return items.map(item => templateFunction(item)).join('');
}

function handleLoadMoreBtnClick() {
  options.params.page += 1;
  console.log(options.params.page);
  fetchGallery(options)
    .then(function ({ data }) {
      addImagesGallery(data);
    })
    .catch(() => {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      options.params.page = 1;
    });
}

function addImagesGallery(data) {
  const addImagesGalery = createImagesGallery(data.hits);
  galleryListEl.innerHTML = addImagesGalery;

  let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
      gallery.on('show.simplelightbox');
}
