export default class ApiService {
  #totalPages = 0;
  #settings = {
    BASE_URL: "https://pixabay.com/api/",
    defaultOptions: "image_type=photo&orientation=horizontal",
    page: 1,
    per_page: 12,
    key: "19030678-ed1e5f4c74f32611df53e834e",
    searchQuery: "",
  };

  constructor(settingsObj) {
    this.#settings = {
      ...this.#settings,
      ...settingsObj,
    };
  }

  #getUrl() {
    const { BASE_URL, defaultOptions, searchQuery, page, per_page, key } =
      this.#settings;
    const url = `${BASE_URL}?${defaultOptions}&q=${searchQuery}&page=${page}&per_page=${per_page}&key=${key}`;
    return url;
  }

  async #fetchImages(url) {
    try {
      const response = await fetch(url);

      return response.status !== 200
        ? null
        : this.#handleResult(await response.json());
    } catch (error) {
      console.log("Ошибка КЕЧ из apiService", error);
    }
  }

  #handleResult = ({ total: amount, hits }) => {
    this.#totalPages || (this.#totalPages = Math.ceil(amount / hits.length));
    const images = hits;
    const pagination = {
      current: this.#settings.page,
      total: this.#totalPages,
    };

    this.#settings.page += 1;

    return { images, pagination, amount };
  };

  async getImages(searchQuery) {
    searchQuery = searchQuery.trim();
    let isQueryNew = false;

    if (this.#settings.searchQuery !== searchQuery) {
      isQueryNew = true;
      this.#settings.searchQuery = searchQuery;
      this.#settings.page = 1;
      this.#totalPages = 0;
    }

    const url = this.#getUrl();
    // const url =
    // "https://pixabay.com/api/?image_tydpe=photo&orientation=horivzontal&q=ex&page=1&per_page=12&kmey=19030678-ed1e5f4c74f32611df53e834e";

    const result = await this.#fetchImages(url);

    return result ? { isQueryNew, ...result } : null;
  }
}
