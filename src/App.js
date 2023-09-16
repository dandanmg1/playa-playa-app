import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import PlayerForm from './Components/Form/PlayerForm';
import { useEffect, useState } from 'react';

function App() {
  const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('https://www.balldontlie.io/api/v1/players')
            .then(response => response.json())
            .then(data => setPlayers(data.data));
    }, []);

    return (
        <div>
          <Header />
          <PlayerForm players={players} />
        </div>
    );
}

export default App;
