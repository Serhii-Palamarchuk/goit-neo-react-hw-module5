import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDIyZTVhY2M1MWQ4Mjg4MDM4MTMxODA5NjU5MzFlOCIsIm5iZiI6MTc0NzIyNDE0OC42NjMsInN1YiI6IjY4MjQ4NjU0ZTFjMDdkNjg4OTJkMjNlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qbDA3Lws_pUAqI7yA0UsZBa9GPbCES-WkMmcWPiA8-4';

const options = {
  headers: {
    Authorization: AUTH_TOKEN,
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data;
};

export const searchMovies = async query => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
    options
  );
  return response.data;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCast = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
  return response.data;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
  return response.data;
};
