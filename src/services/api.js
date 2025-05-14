import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'Bearer <твій_токен>'; // встав сюди свій API Read Access Token

const options = {
  headers: {
    Authorization: AUTH_TOKEN,
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data;
};
