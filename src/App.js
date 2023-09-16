import logo from './logo.svg';
import './App.css';
import PlayerForm from './component/Components/PlayerForm';
import { useState, useEffect } from 'react';

function App() {
  const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('https://www.balldontlie.io/api/v1/players')
            .then(response => response.json())
            .then(data => setPlayers(data.data));
    }, []);

    return (
        <div>
            <PlayerForm players={players} />
        </div>
    );
}

export default App;
