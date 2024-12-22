import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const API_KEY = '274WIVsqkjCa9pYYmCFO6ryZWLZ39IBFhKQtIYxpENE';

const fetchImages = async (query, page) => {
  const resp = await axios.get('search/photos', {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 16,
    },
  });
  return resp.data.results;
};

export default fetchImages;
