import templateFunction from './templates/template.hbs';
import Notiflix from 'notiflix';
import { fetchGallery } from './gallery-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import options from './options';

const galeryFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const clearAllBtnEl = document.querySelector('.clear-all');

galeryFormEl.addEventListener('submit', handleSearchGallery);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
clearAllBtnEl.addEventListener('click', clearAll);



function handleSearchGallery(event) {
  
  event.preventDefault();  

  options.params.q = event.target.elements.searchQuery.value.trim();
  options.params.page = 1;
  galleryListEl.innerHTML = '';
console.log(options.params.q.length)
  if (options.params.q.length === 0 ) {
    Notiflix.Notify.info(`you need to enter a word to search for a photo`);
    return;
  }
  

  clearAllBtnEl.classList.add('is-hidden');
  loadMoreBtnEl.classList.add('is-hidden');

  fetchGallery(options)
    .then(function ({ data }) {
      if (!data.hits.length) {
        throw new Error();
      }
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);

      addImagesGallery(data);
if (data.totalHits > options.params.per_page) {
      loadMoreBtnEl.classList.remove('is-hidden');
    } else {clearAllBtnEl.classList.remove('is-hidden');}
      
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
  // console.log(options.params.page);
  fetchGallery(options)
    .then(function ({ data }) {
      addImagesGallery(data);
      smoothScroll();
    })
    .catch(() => {
      loadMoreBtnEl.classList.add('is-hidden');
      clearAllBtnEl.classList.remove('is-hidden');
      
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      options.params.page = 1;
      clearAllBtnEl.classList.remove('is-hidden');
    });
}

function addImagesGallery(data) {
  const addImagesGalery = createImagesGallery(data.hits);
  galleryListEl.insertAdjacentHTML('beforeend', addImagesGalery);
  let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  gallery.on('show.simplelightbox');
}

function clearAll(){
  galleryListEl.innerHTML = '';
  clearAllBtnEl.classList.add('is-hidden');
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

