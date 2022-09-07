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
            <b>Likes <span class = "text-info">${image.likes}</span></b>
          </p>
          <p class="gallery-info-text">
            <b>Views <span class = "text-info">${image.views}</span></b>
          </p>
          <p class="gallery-info-text">
            <b>Comments <span class = "text-info">${image.comments}</span></b>
          </p>
          <p class="gallery-info-text">
            <b>Downloads <span class = "text-info">${image.downloads}</span></b>
          </p>
        </div>
      </div>
  `;
    })
    .join('');
}
