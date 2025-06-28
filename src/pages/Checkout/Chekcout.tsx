import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import type { Movie } from '../../services/tmdb';
import styles from './styles.module.css';
import BackButton from '../../components/BackButton';

type LocationState = {
  movie: Movie;
  horario: string;
};

type Reservation = {
  movieTitle: string;
  horario: string;
  assentos: string[];
  nome: string;
  tipoIngresso: string;
  total: number;
};

const ROWS = 8;
const COLS = 12;

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = useMemo(() => location.state as LocationState | undefined, [location.state]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [nome, setNome] = useState('');
  const [tipoIngresso, setTipoIngresso] = useState<'Inteira' | 'Meia'>('Inteira');
  const [confirmado, setConfirmado] = useState(false);
  const [ocupados, setOcupados] = useState<Set<string>>(new Set());

  const precoUnitario = tipoIngresso === 'Inteira' ? 50 : 25;
  const precoTotal = selectedSeats.length * precoUnitario;

  useEffect(() => {
    if (!state) return;

    const reservasStr = localStorage.getItem('reservas');
    const reservas: Reservation[] = reservasStr ? JSON.parse(reservasStr) : [];

    const reservasDoFilme = reservas.filter(
      reserva => reserva.movieTitle === state.movie.title && reserva.horario === state.horario
    );

    const assentosOcupados = new Set<string>();
    reservasDoFilme.forEach(reserva => {
      reserva.assentos.forEach(assento => {
        assentosOcupados.add(assento);
      });
    });

    setOcupados(assentosOcupados);
  }, [state]);

  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  function toggleSeat(seatId: string) {
    if (ocupados.has(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  }

  function confirmar() {
    if (!state) {
      alert('Erro: dados da reserva não encontrados.');
      return;
    }
    if (nome.trim() === '') {
      alert('Por favor, informe seu nome.');
      return;
    }
    if (selectedSeats.length === 0) {
      alert('Por favor, selecione pelo menos um assento.');
      return;
    }

    const novaReserva: Reservation = {
      movieTitle: state.movie.title,
      horario: state.horario,
      nome,
      tipoIngresso,
      assentos: selectedSeats,
      total: precoTotal,
    };

    const reservasStr = localStorage.getItem('reservas');
    const reservas: Reservation[] = reservasStr ? JSON.parse(reservasStr) : [];

    reservas.push(novaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    const novosOcupados = new Set(ocupados);
    selectedSeats.forEach(assento => {
      novosOcupados.add(assento);
    });
    setOcupados(novosOcupados);

    setConfirmado(true);
  }

  if (confirmado) {
    return (
      <div className={styles.container}>
        <BackButton />
        <h2 className={styles.title}>Reserva Confirmada!</h2>
        <p>
          Obrigado, <strong>{nome}</strong>! Sua reserva para <strong>{state.movie.title}</strong> às{' '}
          <strong>{state.horario}</strong> foi realizada.
        </p>
        <p>Assentos: {selectedSeats.join(', ')}</p>
        <p>Tipo de ingresso: {tipoIngresso}</p>
        <p>Total pago: <strong>R$ {precoTotal.toFixed(2)}</strong></p>
        <button className={styles.backHomeBtn} onClick={() => navigate('/')}>
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BackButton />

      <h2 className={styles.title}>Confirmar Reserva</h2>
      <h3 className={styles.movieTitle}>{state.movie.title}</h3>
      <p className={styles.horario}>Horário escolhido: {state.horario}</p>
      <img
        src={`https://image.tmdb.org/t/p/w200${state.movie.poster_path}`}
        alt={state.movie.title}
        className={styles.poster}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          confirmar();
        }}
        className={styles.form}
      >
        <label className={styles.label}>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
            placeholder="Digite seu nome"
          />
        </label>

        <label className={styles.label}>
          Tipo de ingresso:
          <select
            value={tipoIngresso}
            onChange={(e) => setTipoIngresso(e.target.value as 'Inteira' | 'Meia')}
            className={styles.select}
          >
            <option value="Inteira">
              Inteira - R$ 50,00
            </option>
            <option value="Meia">
              Meia - R$ 25,00
            </option>
          </select>
        </label>

        <h3>Selecione os assentos:</h3>
        <div className={styles.seatsContainer}>
          {[...Array(ROWS)].map((_, row) => (
            <div key={row} className={styles.seatRow}>
              {[...Array(COLS)].map((_, col) => {
                const seatId = `${row + 1}-${col + 1}`;
                const isOccupied = ocupados.has(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    type="button"
                    className={`${styles.seat} ${
                      isOccupied
                        ? styles.occupied
                        : isSelected
                        ? styles.selected
                        : styles.available
                    }`}
                    onClick={() => toggleSeat(seatId)}
                    disabled={isOccupied}
                    aria-label={`Assento ${seatId} ${isOccupied ? '(Ocupado)' : ''}`}
                    title={`Assento ${seatId} ${isOccupied ? '(Ocupado)' : 'Disponível'}`}
                  >
                    {seatId}
                  </button>
                );
              })}
            </div>
          ))}
          <div className={styles.screen}>T E L A</div>
        </div>

        <p className={styles.total}>
          Total: <strong>R$ {precoTotal.toFixed(2)}</strong>
        </p>

        <button type="submit" className={styles.confirmBtn}>
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}

export default Checkout;