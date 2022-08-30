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
  imgApiServise.axiosGetImages();

  const images = await imgApiServise.axiosGetImages();
  checkSearch(images.hits.length);
  const renderCard = createImageCard(images.hits);

  valueImages = images.totalHits;
  Notify.success(`Hooray! We found ${valueImages} images.`);
  console.log(valueImages);
  renderImage(renderCard);

  gallery.refresh();
  refs.loadMoreBtn.style.display = 'block';
  valueImages -= images.hits.length;
  // console.log(valueImages);
}

async function onLoadMore(event) {
  const images = await imgApiServise.axiosGetImages();
  // valueImages -= images.hits.length;

  // const value = valueImages - images.hits.length;
  // console.log(valueImages);

  const renderCard = createImageCard(images.hits);

  renderImage(renderCard);
  gallery.refresh();
  // console.log(value);
  // if (value < 0 || images.hits.length > valueImages) {
  //   refs.loadMoreBtn.style.display = 'none';
  //   Notify.info("We're sorry, but you've reached the end of search results.");
  //   return;
  // }
}

function renderImage(images) {
  refs.galleryCard.insertAdjacentHTML('beforeend', images);
}

function clearContainer() {
  refs.galleryCard.innerHTML = '';
}

function checkSearch(search) {
  if (search === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
