import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";
import styles from "./MovieCast.module.css";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch {
        setError("Failed to load cast info");
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>No cast info available</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.item}>
          {actor.profile_path ? (
            <img
              src={`${IMG_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className={styles.photo}
            />
          ) : (
            <div className={styles.placeholder}>
              <span>No photo</span>
            </div>
          )}

          <p>
            <strong>{actor.name}</strong>
          </p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
