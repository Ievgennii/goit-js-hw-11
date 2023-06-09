import templateFunction from './templates/template.hbs';
import Notiflix from 'notiflix';
import { fetchGallery } from './js/gallery-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {options} from './js/options';

const galeryFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load');
const clearAllBtnEl = document.querySelector('.clear-all');


galeryFormEl.addEventListener('submit', handleSearchGallery);

clearAllBtnEl.addEventListener('click', clearAll);
window.addEventListener('scroll', endlessScroll);

async function handleSearchGallery(event) {
  try {
    window.addEventListener('scroll', endlessScroll);
    event.preventDefault();
    options.params.q = event.target.elements.searchQuery.value.trim();
    options.params.page = 1;
    galleryListEl.innerHTML = '';
    
    clearAllBtnEl.classList.add('is-hidden');
    loadMoreBtnEl.classList.add('is-hidden');

    const { data } = await fetchGallery(options);
    if (data.totalHits === 0 || options.params.q.length === 0) {
      console.log(data.totalHits)
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    
    addImagesGallery(data);
    
    checkBtnClasses(data, options);
  } catch (error) {
    loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } finally {
    galeryFormEl.reset();
  }
}

function createImagesGallery(items) {
  return items.map(item => templateFunction(item)).join('');
}



function addImagesGallery(data) {
  const addImagesGalery = createImagesGallery(data.hits);
  galleryListEl.insertAdjacentHTML('beforeend', addImagesGalery);
  let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  gallery.on('show.simplelightbox');
}

function clearAll() {
  galleryListEl.innerHTML = '';
  clearAllBtnEl.classList.add('is-hidden');
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function checkBtnClasses(data, options) {
  if (data.totalHits > options.params.per_page) {
    loadMoreBtnEl.classList.remove('is-hidden');
  } else {
    clearAllBtnEl.classList.remove('is-hidden');
  }
}

function endlessScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 150){
    handleLoadMoreScroll()
  }
  // handleLoadMoreScroll()
}

async function handleLoadMoreScroll() {
  try {    
    options.params.page += 1;
    const { data } = await fetchGallery(options);    
    if (!data.hits.length) {
      throw new Error();
    }
    addImagesGallery(data);
    // gallery.refresh('show.simplelightbox');
    smoothScroll();
  } catch (error) {
    window.removeEventListener('scroll', endlessScroll);
    loadMoreBtnEl.classList.add('is-hidden');
    clearAllBtnEl.classList.remove('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    options.params.page = 1;
    clearAllBtnEl.classList.remove('is-hidden');
    
  }
}