import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './styles.module.css';
import trashIcon from '../../assets/lixo.png';
import starIcon from '../../assets/check.png'; 

type Reservation = {
  movieTitle: string;
  horario: string;
  assentos: string[];
  nome: string;
  tipoIngresso: string;
};

export default function Reservas() {
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [avaliandoIndex, setAvaliandoIndex] = useState<number | null>(null);
  const [comentarios, setComentarios] = useState<{ [index: number]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('reservas');
    if (saved) {
      try {
        setReservas(JSON.parse(saved));
      } catch {
        setReservas([]);
      }
    }
  }, []);

  function handleDelete(index: number) {
    const reservaParaExcluir = reservas[index];

    const confirmacao = window.confirm(
      `Deseja realmente excluir a reserva de "${reservaParaExcluir.movieTitle}" para ${reservaParaExcluir.nome}?`
    );

    if (!confirmacao) return;

    const novaLista = reservas.filter((_, i) => i !== index);
    setReservas(novaLista);
    localStorage.setItem('reservas', JSON.stringify(novaLista));
    alert(
      `Reserva excluída com sucesso! Os assentos ${reservaParaExcluir.assentos.join(
        ', '
      )} estão novamente disponíveis.`
    );
  }

  function iniciarAvaliacao(index: number) {
    setAvaliandoIndex(index);
  }

  function salvarComentario(index: number) {
    const comentario = comentarios[index]?.trim();

    if (!comentario) {
      alert('Por favor, escreva sua opinião antes de salvar.');
      return;
    }

    alert(`Comentário salvo para "${reservas[index].movieTitle}":\n\n${comentario}`);

    // Salvar avaliação no localStorage (chave 'avaliacoes')
    const avaliacoesSalvas = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    avaliacoesSalvas.push({
      movieTitle: reservas[index].movieTitle,
      nome: reservas[index].nome,
      comentario: comentario,
    });
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoesSalvas));

    setAvaliandoIndex(null);
    setComentarios((prev) => ({ ...prev, [index]: '' }));
  }

  function cancelarComentario() {
    setAvaliandoIndex(null);
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Últimas Reservas</h1>

      {reservas.length === 0 ? (
        <p className={styles.message}>Nenhuma reserva encontrada.</p>
      ) : (
        <ul className={styles.reservasList}>
          {reservas.map((reserva, idx) => (
            <li key={idx} className={styles.reservaItem}>
              <div className={styles.info}>
                <strong>{reserva.movieTitle}</strong> — {reserva.horario}
                <br />
                Nome: {reserva.nome} — {reserva.tipoIngresso}
                <br />
                Assentos: {(reserva.assentos || []).join(', ')}
              </div>

              {/* Botão Avaliar */}
              <button
                className={styles.reviewBtn}
                onClick={() => iniciarAvaliacao(idx)}
                aria-label="Avaliar filme"
                title="Avaliar este filme"
              >
                <img src={starIcon} alt="Avaliar filme" className={styles.reviewIcon} />
              </button>

              {/* Botão Excluir */}
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(idx)}
                aria-label="Excluir reserva"
                title="Excluir esta reserva e liberar os assentos"
              >
                <img src={trashIcon} alt="Excluir reserva" className={styles.deleteIcon} />
              </button>

              {/* Caixa de Comentário */}
              {avaliandoIndex === idx && (
                <div className={styles.comentarioBox}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Escreva sua opinião sobre o filme..."
                    value={comentarios[idx] || ''}
                    onChange={(e) =>
                      setComentarios((prev) => ({
                        ...prev,
                        [idx]: e.target.value,
                      }))
                    }
                  />
                  <div className={styles.comentarioButtons}>
                    <button className={styles.salvarBtn} onClick={() => salvarComentario(idx)}>
                      Salvar
                    </button>
                    <button className={styles.cancelarBtn} onClick={cancelarComentario}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <button className={styles.backHomeBtn} onClick={() => navigate('/')}>
        Voltar para Home
      </button>
    </div>
  );
}
