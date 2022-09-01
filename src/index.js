import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImgApiServise from './create-img.js';
import createImageCard from './render-img';

const refs = {
  galleryCard: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  // loadMoreBtn: document.querySelector('.load-more'), // for loadMore button
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// refs.loadMoreBtn.style.display = 'none'; // for use loadMore button

const imgApiServise = new ImgApiServise();
let valueImages = 0;

refs.searchForm.addEventListener('submit', onSearchImage);
// refs.loadMoreBtn.addEventListener('click', onLoadMore); // for use loadMore button

async function onSearchImage(event) {
  event.preventDefault();

  // refs.loadMoreBtn.style.display = 'none'; // for use loadMore button

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
  // refs.loadMoreBtn.style.display = 'block'; // for use loadMore button
  valueImages -= images.hits.length;
  installTargetOnLastChild();
}

// ======== Infinite scrolling ==============

const options = {
  threshold: 0.15,
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    const { target, isIntersecting, intersectionRatio } = entry;
    if (isIntersecting) {
      onLoadMore();
      // target.style.color = 'red';
      // console.log('сработала loadmore');
      observer.unobserve(entry.target);
    } else {
      // console.log('ничего не делаем');
    }
  });
};

const infiniteObserver = new IntersectionObserver(callback, options);

async function onLoadMore() {
  const images = await imgApiServise.axiosGetImages();
  valueImages -= images.hits.length;
  const value = valueImages - images.hits.length;
  const renderCard = createImageCard(images.hits);

  renderImage(renderCard);
  // smoothPageScrolling();

  gallery.refresh();
  installTargetOnLastChild();
  checkOnloadMore(value);
}

// =======================================

function installTargetOnLastChild() {
  // const cardImage = document.querySelector('.gallery');
  const lastChild = refs.galleryCard.lastElementChild;
  // console.log('last child', lastChild);

  if (lastChild) {
    infiniteObserver.observe(lastChild);
  }
}

// ======== Load more button ============== // for use loadMore button

// async function onLoadMore(event) {
//   const images = await imgApiServise.axiosGetImages();

//   valueImages -= images.hits.length;
//   const value = valueImages - images.hits.length;

//   const renderCard = createImageCard(images.hits);

//   renderImage(renderCard);
//   smoothPageScrolling();
//   checkOnloadMore(value);
//   gallery.refresh();
// }

// =======================================

function renderImage(images) {
  refs.galleryCard.insertAdjacentHTML('beforeend', images);
}

function clearContainer() {
  refs.galleryCard.innerHTML = '';
}

function checkOnloadMore(value) {
  if (value <= 0) {
    // refs.loadMoreBtn.style.display = 'none'; // for use loadMore button
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

// ======================================= // for use loadMore button
// if use load more button

// function smoothPageScrolling() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
// =======================================
