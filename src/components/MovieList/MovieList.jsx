import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {poster_path && (
              <img
                src={`${IMG_BASE_URL}${poster_path}`}
                alt={title}
                className={styles.poster}
              />
            )}
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
