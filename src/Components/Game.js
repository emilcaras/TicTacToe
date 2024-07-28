import React, { useState, useEffect } from 'react';
import Board from './Board';
import PlayerSelection from './PlayerSelection';

function Game() {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('history');
    return savedHistory ? JSON.parse(savedHistory) : [{ squares: Array(9).fill(null) }];
  });
  const [stepNumber, setStepNumber] = useState(() => {
    const savedStepNumber = localStorage.getItem('stepNumber');
    return savedStepNumber ? JSON.parse(savedStepNumber) : 0;
  });
  const [xIsNext, setXIsNext] = useState(() => {
    const savedXIsNext = localStorage.getItem('xIsNext');
    return savedXIsNext ? JSON.parse(savedXIsNext) : true;
  });
  const [player1, setPlayer1] = useState(() => {
    const savedPlayer1 = localStorage.getItem('player1');
    return savedPlayer1 ? JSON.parse(savedPlayer1) : '';
  });
  const [player2, setPlayer2] = useState(() => {
    const savedPlayer2 = localStorage.getItem('player2');
    return savedPlayer2 ? JSON.parse(savedPlayer2) : '';
  });

  useEffect(() => {localStorage.setItem('history', JSON.stringify(history));}, [history]);

  useEffect(() => {localStorage.setItem('stepNumber', JSON.stringify(stepNumber));}, [stepNumber]);

  useEffect(() => {localStorage.setItem('xIsNext', JSON.stringify(xIsNext));}, [xIsNext]);

  useEffect(() => {localStorage.setItem('player1', JSON.stringify(player1));}, [player1]);

  useEffect(() => {localStorage.setItem('player2', JSON.stringify(player2));}, [player2]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;

  if (winner) {
    status = `Winner: ${winner === 'X' ? player1 : player2}`;
  } else if (stepNumber === 9) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? player1 || 'X' : player2 || 'O'}`;
  }

  const handleRestart = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="game">
      <h1 className="app-title">Tic Tac Toe</h1>
      <PlayerSelection
        player1={player1}
        setPlayer1={setPlayer1}
        player2={player2}
        setPlayer2={setPlayer2}
      />
      <div className="game-board-container">
        <div className="status">{status}</div>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default Game;