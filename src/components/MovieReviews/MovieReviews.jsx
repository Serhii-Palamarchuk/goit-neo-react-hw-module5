import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import styles from "./MovieReviews.module.css";

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
        setError("Failed to load reviews");
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews found</p>;

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <p className={styles.author}>
            Author: <strong>{review.author}</strong>
          </p>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
