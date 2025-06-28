# 🎬 Cinemax — Plataforma de Compra de Ingressos de Cinema

Cinemax é um site interativo e moderno para **compra de ingressos de cinema**, que integra a [TMDB API](https://www.themoviedb.org/documentation/api) para exibir os filmes em cartaz. Com uma interface fluida feita em **React + TypeScript**, permite ao usuário escolher o filme, ver o trailer, selecionar cadeiras, definir tipo de ingresso (meia ou inteira), e até visualizar e apagar reservas anteriores.

## 🛠️ Tecnologias Utilizadas

- **React** (Vite)
- **TypeScript**
- **CSS Modules**
- **React Router DOM v6**
- **TMDB API** (para dados dos filmes e trailers)
- **LocalStorage** (armazenamento de reservas)

---

## 🚀 Funcionalidades

### 🎟️ Compra de Ingressos
- Escolha entre **filmes em cartaz** obtidos via a API TMDB.
- Veja **detalhes do filme**, incluindo sinopse e trailer (YouTube).
- Selecione **horário** da sessão.
- Insira seu **nome** e escolha o tipo de ingresso: `Meia` ou `Inteira`.
- Selecione os **assentos disponíveis** no mapa visual do cinema.
- Finalize a reserva e veja um resumo com as informações.

### 💾 Histórico de Reservas
- Acesse a aba "Últimas Reservas".
- Veja todas as reservas feitas, com:
  - Filme
  - Horário
  - Nome
  - Tipo de ingresso
  - Assentos selecionados
- Remova reservas usando um botão de lixeira estilizado.

### ▶️ Trailer Integrado
- Ao visualizar os detalhes de um filme, assista ao **trailer oficial** diretamente via link do YouTube.

### 📍 Navegação
- O projeto usa **rotas** com `react-router-dom` para navegação entre:
  - Página inicial
  - Detalhes do filme
  - Checkout (reserva)
  - Últimas reservas

---

## 🖼️ Capturas de Tela

> (Você pode incluir aqui screenshots do app em funcionamento. Exemplo: Home, MovieDetails, Checkout, Reservas)

---

## 📁 Estrutura de Pastas

src/
├── assets/ # Imagens, ícones
├── components/ # Componentes reutilizáveis (Ex: BackButton)
├── pages/ # Páginas principais (Home, Checkout, MovieDetails, Reservas)
│ ├── Checkout/
│ ├── Home/
│ ├── MovieDetails/
│ └── Reservas/
├── services/ # Integração com a API TMDB
└── main.tsx # Entry point

## ⚙️ API

src/services/tmdb.ts
const TMDB_API_KEY = 'SUA_CHAVE_AQUI';
const BASE_URL = 'https://api.themoviedb.org/3';