import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNowPlaying } from '../../services/tmdb';
import type { Movie } from '../../services/tmdb';
import styles from './styles.module.css';

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNowPlaying()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.lastReservationBtn}
          onClick={() => navigate('/reservas')}
        >
          Ver Reservas
        </button>

        <h1>CINEMAX</h1>

        <button
          className={styles.avaliacoesBtn}
          onClick={() => navigate('/avaliacoes')}
        >
          Ver Avaliações
        </button>
      </header>

    
      <div className={styles.subHeader}>
        EM CARTAZ
      </div>

  
      <main className={styles.content}>
        {loading && <p className={styles.message}>Carregando filmes...</p>}
        {error && <p className={styles.message}>Erro: {error}</p>}

        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={styles.movieCard}
              onClick={() => navigate(`/filme/${movie.id}`)}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
              ) : (
                <div className={styles.noPoster}>Sem imagem</div>
              )}
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
