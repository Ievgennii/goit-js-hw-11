import templateFunction from './templates/template.hbs';
import Notiflix from 'notiflix';
import { fetchGallery } from './gallery-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    page: 0,
  },
};

function handleSearchGallery(event) {
  event.preventDefault();
  options.params.q = event.target.elements.searchQuery.value.trim();
  options.params.page = 1;
  galleryListEl.innerHTML = '';

  fetchGallery(options)
    .then(function ({ data }) {
      if (!data.hits.length) {
        throw new Error();
      }
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);

      addImagesGallery(data);

      loadMoreBtnEl.classList.remove('is-hidden');
      // galeryFormEl.reset();
      // smoothScroll()
    })
    .catch(() => {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
    .finally(() => {
      galeryFormEl.reset();
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
      smoothScroll();
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
  galleryListEl.insertAdjacentHTML('beforeend', addImagesGalery);
  let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  gallery.on('show.simplelightbox');
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}
