import React, { useState } from 'react';

function PlayerSelection({ player1, setPlayer1, player2, setPlayer2 }) {
  const [newPlayer, setNewPlayer] = useState('');
  const [players, setPlayers] = useState(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    return storedPlayers;
  });

  const handleAddPlayer = () => {
    if (newPlayer && !players.includes(newPlayer)) {
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
      setNewPlayer('');
    }
  };

  return (
    <div className="player-selection">
      <div className="player-input">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Add player name"
        />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <div className="player-select">
        <div className="player-select-container">
          <label htmlFor="player1">Player 1:</label>
          <select
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          >
            <option value="">Select Player 1</option>
            {players.map((player, index) => (
              <option key={index} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>
        <div className="player-select-container">
          <label htmlFor="player2">Player 2:</label>
          <select
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          >
            <option value="">Select Player 2</option>
            {players
              .filter(player => player !== player1)
              .map((player, index) => (
                <option key={index} value={player}>
                  {player}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default PlayerSelection;