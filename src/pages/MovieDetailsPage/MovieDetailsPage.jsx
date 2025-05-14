import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

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
      <h2>{movie.title}</h2>
      <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>

      <div className={styles.links}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
