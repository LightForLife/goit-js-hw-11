import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  galleryCard: document.querySelector('.gallery'),
};

console.log(refs.galleryCard);

// axios.defaults.baseURL =
//   'https://pixabay.com/api/?key=29563076-116975c46708de5d99dfe50c3';

const PER_PAGE = 40;
const DEFAULT_CURRENT_PAGE = 1;
// let currentPage = 1;
let query = 'dog';

function axiosImage() {
  return axios
    .get(
      'https://pixabay.com/api/?key=29563076-116975c46708de5d99dfe50c3&q=yellow+flowers&image_type=photo'
    )
    .then(response => {
      createImageCard(response.data.hits);
      const createImg = createImageCard(response.data.hits);
      renderImage(createImg);
      // return response.data.hits;
    });
}

console.log(axiosImage());

function createImageCard(images) {
  return images
    .map(image => {
      return `
        <div class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
              <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="gallery__info">
              <p class="gallery__info-item">
                  <b>Likes ${image.likes}</b>
              </p>
              <p class="gallery__info-item">
                  <b>Views ${image.views}</b>
              </p>
              <p class="gallery__info-item">
                  <b>Comments ${image.comments}</b>
              </p>
              <p class="gallery__info-item">
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
  // scrollZoom: false,
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
