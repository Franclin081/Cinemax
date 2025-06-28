// src/components/BackButton/BackButton.tsx
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.backBtn}
      onClick={() => navigate(-1)}
      aria-label="Voltar para a página anterior"
      type="button"
    >
      ← Voltar
    </button>
  );
}
