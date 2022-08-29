import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  galleryCard: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('load-more'),
};

refs.searchForm.addEventListener('submit', onSearchImage);
// refs.loadMoreBtn.addEventListener("click")

function onSearchImage(event) {
  refs.galleryCard.innerHTML = '';
  event.preventDefault();
  const searchText = event.currentTarget.elements.searchQuery.value.trim();
  console.log(searchText);
  axiosImage(searchText);
}

// const PER_PAGE = 40;
const DEFAULT_CURRENT_PAGE = 1;
// let currentPage = 1;

const params = {
  key: '28415242-e0e8b03e245983e2ec7e6c358',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

function axiosImage(query) {
  const url = `https://pixabay.com/api/?q=${query}&page=${DEFAULT_CURRENT_PAGE}`;
  return axios.get(url, { params }).then(response => {
    createImageCard(response.data.hits);
    const createImg = createImageCard(response.data.hits);
    renderImage(createImg);
  });
}

function createImageCard(images) {
  return images
    .map(image => {
      return `
        <div class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
              <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="gallery-info">
              <p class="gallery-info-text">
                  <b>Likes ${image.likes}</b>
              </p>
              <p class="gallery-info-text">
                  <b>Views ${image.views}</b>
              </p>
              <p class="gallery-info-text">
                  <b>Comments ${image.comments}</b>
              </p>
              <p class="gallery-info-text">
                  <b>Downloads ${image.downloads}</b>
              </p>
          </div>
      </div>`;
    })
    .join('');
}

function renderImage(images) {
  refs.galleryCard.insertAdjacentHTML('beforeend', images);
}

const gallery = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});

//==================================
/* <div class="photo-card">
  <a class="gallery-item" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      alt="${description}"
      loading="lazy"
    />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
