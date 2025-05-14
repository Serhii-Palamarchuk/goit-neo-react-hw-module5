import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError('Movie not found');
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return error ? <p>{error}</p> : <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.back}>
        ← Go back
      </Link>

      <div className={styles.details}>
        {movie.poster_path && (
          <img
            className={styles.poster}
            src={`${IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <div>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div className={styles.links}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
