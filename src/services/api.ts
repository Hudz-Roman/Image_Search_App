import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const apiKey = import.meta.env.VITE_API_KEY;
interface UnsplashResponse<T> {
  results: T;
  total: number;
  total_pages: number;
}

async function fetchImages<T>(query: string, page: number): Promise<T> {
  const resp = await axios.get<UnsplashResponse<T>>('search/photos', {
    params: {
      client_id: apiKey,
      query,
      page,
      per_page: 18,
    },
  });
  return resp.data.results;
}

export default fetchImages;
