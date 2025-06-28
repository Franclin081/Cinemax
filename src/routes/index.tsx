import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import Checkout from '../pages/Checkout/Chekcout';
import Resumo from '../pages/Resumo/Resumo';
import Reservas from '../pages/Reservas/Reservas';
import Avaliacoes from '../pages/Avaliacao/Avaliacao'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/filme/:id',
    element: <MovieDetails />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/resumo',
    element: <Resumo />,
  },
  {
    path: '/reservas',
    element: <Reservas />,
  },
  {
    path: '/avaliacoes', 
    element: <Avaliacoes />,
  }
]);