import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImgApiServise from './create-img.js';
import createImageCard from './render-img';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  galleryCard: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';

const imgApiServise = new ImgApiServise();
let valueImages = 0;

refs.searchForm.addEventListener('submit', onSearchImage);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchImage(event) {
  event.preventDefault();

  refs.loadMoreBtn.style.display = 'none';

  clearContainer();

  const searchText = event.currentTarget.elements.searchQuery.value.trim();

  if (!searchText) {
    return;
  }

  imgApiServise.query = searchText;
  imgApiServise.resetPage();

  const images = await imgApiServise.axiosGetImages();

  if (images.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const renderCard = createImageCard(images.hits);

  valueImages = images.totalHits;

  Notify.success(`Hooray! We found ${valueImages} images.`);

  renderImage(renderCard);

  gallery.refresh();
  refs.loadMoreBtn.style.display = 'block';
  valueImages -= images.hits.length;
}

async function onLoadMore(event) {
  const images = await imgApiServise.axiosGetImages();

  valueImages -= images.hits.length;
  const value = valueImages - images.hits.length;

  const renderCard = createImageCard(images.hits);

  renderImage(renderCard);
  smoothPageScrolling();
  checkOnloadMore(value);
  gallery.refresh();
}

function renderImage(images) {
  refs.galleryCard.insertAdjacentHTML('beforeend', images);
}

function clearContainer() {
  refs.galleryCard.innerHTML = '';
}

function checkOnloadMore(value) {
  if (value <= 0) {
    refs.loadMoreBtn.style.display = 'none';
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function smoothPageScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
