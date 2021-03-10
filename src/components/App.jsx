import React, { useState } from 'react'
import { Board } from './molecules/Board'
import { Navigation } from './molecules/Navigation'
import './App.scss'

export const App = () => {
  const [player, setPlayer] = useState('X');
  const [winCombination, setWinCombination] = useState([]);
  const [victory, setVictory] = useState(false);
  const [board, setBoard] = useState(() => {
    return Array(5).fill(null).map(() => Array(5).fill(null));
  });
  const [settings, setSettings] = useState({
    rows: 5,
    columns: 5,
    winPoints: 3,
  });

  const handleInputChange = (value, item) => {
    if (value > 9) setSettings(prev => ({ ...prev, [item]: 9 }));
    else if (value < 1 ) setSettings(prev => ({ ...prev, [item]: 1 }));
    else setSettings(prev => ({ ...prev, [item]: parseFloat(value) }));
  }

  const handleGenerateBoard = () => {
    setPlayer('X');
    setVictory(false);
    setWinCombination([]);
    setBoard(Array(settings.rows).fill(null).map(() => Array(settings.columns).fill(null)));
  }

  const checkHorizontal = (row, points = 0, combination = []) => {
    const { winPoints } = settings;
    board[row].forEach((r, i) => {
      if (r === player) {
        points += 1;
        combination.push(`${row}${i}`);
      } else if (points !== winPoints) {
        points = 0;
        combination = [];
      }
    });
    return {
      points: points === winPoints ? points : 0,
      combination: points === winPoints ? combination : [],
    };
  }

  const checkVertical = (column, points, combination) => {
    const { rows, winPoints } = settings;
    if (points === winPoints) return { points, combination };

    for(let i = 0; i < rows; i++) {
      if (board[i][column] === player) {
        points += 1;
        combination.push(`${i}${column}`);
      } else if (points !== winPoints) {
        points = 0;
        combination = [];
      }
    }
    return {
      points: points === winPoints ? points : 0,
      combination: points === winPoints ? combination : [],
    };
  }

  const checkXAxis = (row, column, points, combination) => {
    const { rows, columns, winPoints } = settings;
    if (points === winPoints) return { points, combination };

    let tempRow = row;
    let tempCol = column;

    while (true) {
      if (tempRow === 0 || tempCol === 0) break;
      tempRow--;
      tempCol--;
    }

    while (true) {
      if (tempRow === rows || tempCol === columns) break;

      if (board[tempRow][tempCol] === player) {
        points++;
        combination.push(`${tempRow}${tempCol}`);
      } else if (points !== winPoints) {
        points = 0
        combination = [];
      }
      tempRow++;
      tempCol++;
    }

    return {
      points: points === winPoints ? points : 0,
      combination: points === winPoints ? combination : [],
    };
  }

  const checkIncline = (row, column, points, combination) => {
    const { rows, columns, winPoints } = settings;
    if (points === winPoints) return { points, combination };

    let tempRow = row;
    let tempCol = column;

    while (true) {
      if (tempRow === rows - 1 || tempCol === 0) break;
      tempRow++;
      tempCol--;
    }

    while (true) {
      if (tempRow === -1 || tempCol === columns) break;
      if (board[tempRow][tempCol] === player) {
        points++;
        combination.push(`${tempRow}${tempCol}`);
      } else if (points !== winPoints) {
        points = 0;
        combination = [];
      }
      tempRow--;
      tempCol++;
    }

    return {
      points: points === winPoints ? points : 0,
      combination: points === winPoints ? combination : [],
    };
  }

  const checkForWinner = (row, column) => {
    let data;
    data = checkHorizontal(row);
    data = checkVertical(column, data.points, data.combination);
    data = checkXAxis(row, column, data.points, data.combination);
    data = checkIncline(row, column, data.points, data.combination);
    return data;
  }

  const handleSelectItem = (row, column) => {
    const newBoard = [...board];
    newBoard[row][column] = player;
    const { points, combination } = checkForWinner(row, column);
    setBoard(newBoard);

    if (points === settings.winPoints) {
      setWinCombination(combination);
      setVictory(true);
    } else {
      setPlayer(prev => prev === 'X' ? 'O' : 'X');
    }
  }

  return (
    <div className="container">
      <Navigation
        settings={settings}
        onChange={handleInputChange}
        onGenerate={handleGenerateBoard}
      />
      {victory && <h1 style={{ color: 'red', textAlign: 'center', flex: '0 0 100%'}}>VICTORY! Player "{player}" Won!</h1>}
      <Board
        combination={winCombination}
        victory={victory}
        board={board}
        onSelectItem={handleSelectItem}
      />
    </div>
  )
}
