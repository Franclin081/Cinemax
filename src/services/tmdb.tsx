const TMDB_API_KEY = '39847edbfca3dbde51d4ad64287be6dd';
const BASE_URL = 'https://api.themoviedb.org/3';


export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
}

export async function fetchNowPlaying(): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar filmes em cartaz');
  }

  const data = await response.json();
  return data.results; // retorna o array de filmes
}

// 🔍 Busca os detalhes de UM filme, dado o id
export async function fetchMovieDetails(id: number): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar detalhes do filme');
  }

  return response.json(); // retorna os detalhes do filme
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export async function fetchMovieVideos(id: number): Promise<Video[]> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar vídeos do filme');
  }

  const data = await response.json();
  return data.results;
}