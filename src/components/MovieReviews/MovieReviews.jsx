import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch {
        setError('Failed to load reviews');
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews found</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(r => (
        <li key={r.id} className={styles.item}>
          <p><strong>Author:</strong> {r.author}</p>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
