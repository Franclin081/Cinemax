import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos } from '../../services/tmdb';
import type { Movie } from '../../services/tmdb';
import styles from './styles.module.css';
import BackButton from '../../components/BackButton';


function MovieDetails() {
  const { id } = useParams(); //Constante que pega o ID do filme. 
  const navigate = useNavigate(); //Constante para navegação. 
  const [movie, setMovie] = useState<Movie | null>(null); //Constante que acessa o Filme da API.
  const [loading, setLoading] = useState(true); 
  const [trailerKey, setTrailerKey] = useState<string | null>(null); //Constante que pega a chave ID do trailer. 

  useEffect(() => {
    if (id) {
      fetchMovieDetails(Number(id))
        .then((data) => {
          setMovie(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
//Encontra o vídeo do trailer pelo id e acessa no youtube.

      fetchMovieVideos(Number(id))
        .then((videos) => {
          const trailer = videos.find(
            (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
          );
          if (trailer) {
            setTrailerKey(trailer.key);
          }
        })
        .catch((err) => {
          console.error('Erro ao buscar trailer', err);
        });
    }
  }, [id]);

  if (loading) return <p className={styles.message}>Carregando...</p>;
  if (!movie) return <p className={styles.message}>Filme não encontrado.</p>;

  const horarios = ['14:00', '16:30', '19:00', '21:30'];

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <h2 className={styles.posterTitle}>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
      
          {trailerKey && (
           <a    
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.trailerButton}
            >
              ▶ Assistir Trailer
            </a>
          )}
        </div>
      
        <div className={styles.details}>
          <h1>Sinopse:</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <h3>Escolha um horário:</h3>
          <div className={styles.horarios}>
            {horarios.map((hora) => (
              <button
                key={hora}
                onClick={() => navigate('/checkout', { state: { movie, horario: hora } })}
                className={styles['horario-btn']}
              >
                {hora}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;