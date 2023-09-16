import React, { useState, useEffect } from 'react';
import PlayerCards from '../Card/PlayerCards';
import axios from 'axios';

function PlayerForm ({players}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [player, setPlayer] = useState(null);
    const [season, setSeason] = useState(null)
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
    e.preventDefault();
    getData()
    const foundPlayer = players.find(p => 
        p.first_name.toLowerCase() === firstName.toLowerCase() &&
        p.last_name.toLowerCase() === lastName.toLowerCase()
    );

    if (!foundPlayer) {
        setError('Player not found');
        return;
    }
    
    }
    const statsURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${foundPlayer.id}&season=${season}`;
    const getData = () => { 
        axios.get(statsURL)
        .then(response => response.json())
        .then(statsData => {
            if (!statsData || !statsData.data || statsData.data.length === 0) {
                setError('Stats not available for the given season');
                return;
            }
            setPlayer(statsData.data[0]);
        })
        .catch(error => {
            setError(error.message || 'Stat not available');
        });
    }

    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="YYYY"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                />          

                <button type="submit">Search</button>
            </form>

            <PlayerCards player={player} season={season}/>

        </div>
    );
}

export default PlayerForm;