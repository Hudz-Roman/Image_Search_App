import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const API_KEY = '274WIVsqkjCa9pYYmCFO6ryZWLZ39IBFhKQtIYxpENE';

interface UnsplashResponse<T> {
  results: T;
  total: number;
  total_pages: number;
}

async function fetchImages<T>(query: string, page: number): Promise<T> {
  const resp = await axios.get<UnsplashResponse<T>>('search/photos', {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 18,
    },
  });
  return resp.data.results;
}

export default fetchImages;
