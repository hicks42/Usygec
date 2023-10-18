import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <Link to="/tictactoe">
        <button>Aller vers le morpion</button>
      </Link>
      <Link to="/sorting">
        <button>Aller vers la Page sorting list</button>
      </Link>
    </div>
  );
}
