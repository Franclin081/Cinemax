import { useEffect, useState } from 'react';

interface Reserva {
  nome: string;
  filme: string;
  horario: string;
  assentos: number[];
}

function Resumo() {
  const [reserva, setReserva] = useState<Reserva | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ultimaReserva');
    if (saved) {
      setReserva(JSON.parse(saved));
    }
  }, []);

  if (!reserva) {
    return <p>Nenhuma reserva encontrada.</p>;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2> Reserva Confirmada ✅ </h2>
      <p><strong>Nome:</strong> {reserva.nome}</p>
      <p><strong>Filme:</strong> {reserva.filme}</p>
      <p><strong>Horário:</strong> {reserva.horario}</p>
      <p><strong>Assentos:</strong> {reserva.assentos.join(', ')}</p>
    </div>
  );
}

export default Resumo;
