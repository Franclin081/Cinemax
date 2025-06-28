import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './styles.module.css';
import trashIcon from '../../assets/lixo.png';

type Avaliacao = {
  movieTitle: string;
  nome: string;
  comentario: string;
};

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('avaliacoes');
    if (saved) {
      try {
        setAvaliacoes(JSON.parse(saved));
      } catch {
        setAvaliacoes([]);
      }
    }
  }, []);

  function handleDeleteAvaliacao(index: number) {
    const confirmacao = window.confirm('Deseja realmente excluir esta avaliação?');
    if (!confirmacao) return;

    const novaLista = avaliacoes.filter((_, i) => i !== index);
    setAvaliacoes(novaLista);
    localStorage.setItem('avaliacoes', JSON.stringify(novaLista));
    alert('Avaliação excluída com sucesso!');
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Avaliações dos Filmes</h1>

      {avaliacoes.length === 0 ? (
        <p className={styles.message}>Nenhuma avaliação encontrada.</p>
      ) : (
        <ul className={styles.lista}>
          {avaliacoes.map((avaliacao, idx) => (
            <li key={idx} className={styles.avaliacaoItem}>
              <div className={styles.movieTitle}>{avaliacao.movieTitle}</div>
              <div className={styles.autor}>Avaliado por: {avaliacao.nome}</div>
              <p className={styles.comentario}>{avaliacao.comentario}</p>

             
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteAvaliacao(idx)}
                aria-label="Excluir avaliação"
                title="Excluir esta avaliação"
              >
                <img src={trashIcon} alt="Excluir" className={styles.deleteIcon} />
              </button>
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
