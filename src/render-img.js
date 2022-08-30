export default function createImageCard(images) {
  return images
    .map(image => {
      return `
        <div class="gallery-item">
        <a class="gallery-link" href=${image.largeImageURL}>
          <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
            loading="lazy"
          />
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
      </div>
  `;
    })
    .join('');
}
