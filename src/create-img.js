import axios from 'axios';

const params = {
  key: '28415242-e0e8b03e245983e2ec7e6c358',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

export default class ImgApiServise {
  constructor() {
    this.searchQuery = '';
    this.currentPage = 1;
  }

  async axiosGetImages() {
    try {
      const url = `https://pixabay.com/api/?q=${this.searchQuery}&page=${this.currentPage}`;

      const response = await axios.get(url, { params });

      await this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async incrementPage() {
    this.currentPage += 1;
  }

  async resetPage() {
    this.currentPage = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
