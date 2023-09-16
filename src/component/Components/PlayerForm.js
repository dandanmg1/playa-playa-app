import React, { useState, useEffect } from 'react';

function PlayerForm ({players}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [player, setPlayer] = useState(null);
    const [season, setSeason] = useState(null)
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
    e.preventDefault();

    const foundPlayer = players.find(p => 
        p.first_name.toLowerCase() === firstName.toLowerCase() &&
        p.last_name.toLowerCase() === lastName.toLowerCase()
    );

    if (!foundPlayer) {
        setError('Player not found');
        return;
    }

    const statsURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${foundPlayer.id}&season=${season}`;
    
    fetch(statsURL)
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

{player && (
    <div>
        <h1>{player.player.first_name} {player.player.last_name}</h1>
        <h2>Season: {season}</h2>

        <p><strong>Games Played:</strong> {player.games_played}</p>
        <p><strong>Field Goals Made (FGM):</strong> {player.fgm}</p>
        <p><strong>Field Goals Attempted (FGA):</strong> {player.fga}</p>
        <p><strong>Three-Point Field Goals Made (3PM):</strong> {player.fg3m}</p>
        <p><strong>Three-Point Field Goals Attempted (3PA):</strong> {player.fg3a}</p>
        <p><strong>Free Throws Made (FTM):</strong> {player.ftm}</p>
        <p><strong>Free Throws Attempted (FTA):</strong> {player.fta}</p>
        <p><strong>Rebounds (REB):</strong> {player.reb}</p>
        <p><strong>Assists (AST):</strong> {player.ast}</p>
        <p><strong>Steals (STL):</strong> {player.stl}</p>
        <p><strong>Blocks (BLK):</strong> {player.blk}</p>
        <p><strong>Turnovers:</strong> {player.turnover}</p>
        <p><strong>Field Goal Percentage (FG%):</strong> {(player.fg_pct * 100).toFixed(2)}%</p>
        <p><strong>Three-Point Percentage (3P%):</strong> {(player.fg3_pct * 100).toFixed(2)}%</p>
        <p><strong>Free Throw Percentage (FT%):</strong> {(player.ft_pct * 100).toFixed(2)}%</p>
    </div>
)}

        </div>
    );
}

export default PlayerForm;
