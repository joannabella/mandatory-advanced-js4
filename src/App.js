import React, { Component, useReducer } from 'react';
import Grid from './grid';
import './App.css';

const grid = Array(7)
      .fill(null)
      .map(_ => Array(6).fill('white'));

const reducer = (state, action) => {
  switch (action.type) {
    case 'fill_cell': 
      const grid = [...state.grid];
      grid[action.rowIndex] = grid[action.rowIndex].slice(0);
      const unfilled = grid[action.rowIndex].filter((cell) => {
        return cell === 'white';
      }); 
      if (unfilled.length === 0 || state.isGameOver) {
        return state;
      }   
      grid[action.rowIndex][unfilled.length - 1] = state.currentPlayer;
      if (checkWinner(grid, '#e8cce3')) {
        return {
          ...state,
          grid: grid,
          winner: 'babypink',
          winnerColor: 'rgb(232, 188, 224)',
          isGameOver: true,
        }  
      }
      if (checkWinner(grid, '#fff9af')) {
        return {
          ...state,
          grid: grid,
          winner: 'mellow-yellow',
          winnerColor: 'rgb(255, 248, 166)',
          isGameOver: true,
        }  
      }
      if (isDraw(grid)) {
        return {
          ...state,
          grid: grid,
          isDraw: true,
          isGameOver: true,
        }  
      }
      return {
        ...state,
        grid: grid, 
        currentPlayer: state.currentPlayer === '#e8cce3' ? '#fff9af' : '#e8cce3',
      }; 
    case 'clear_image': 
      console.log('clear');
      return initialState;
  }
};    

function isDraw(grid) {
  for (let row of grid) {
    for (let cell of row) {
      if (cell === 'white') {
        return false;
      }
    }
  }
  return true;
}

function checkWinner(grid, color) {
  // Check vertical winner
  for (let row of grid) {
    let sequentialColors = 0;
    console.log(row);
    for (let cell of row) {
      if (cell === color) {
        sequentialColors++;
      }
      else {
        sequentialColors = 0;
      }
      if (sequentialColors >= 4) {
        return true;
      }
    }
  }

  // Check horizontal winner
  let maxCells = grid[0].length;
  let maxRows = grid.length;
  for (let cellIndex = 0; cellIndex < maxCells; cellIndex++) {
    let sequentialColors = 0;
    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
      if (grid[rowIndex][cellIndex] === color) {
        sequentialColors++;
      }
      else {
        sequentialColors = 0;
      }
      if (sequentialColors >= 4) {
        return true;
      }
    }
  }

  function checkLine(a,b,c,d){
    return ((color === a) && (color === b) && (color === c) && (color === d))
  }

  // Check diagonal from left winner 
  for(let c=0; c<4; c++){
    for(let r=0; r<3; r++){
      if(checkLine(grid[c][r], grid[c+1][r+1], grid[c+2][r+2], grid[c+3][r+3])){
        return true;
      }
    }
  }

  for(let c=0; c<4; c++){
    for(let r=3; r<6; r++){
      if(checkLine(grid[c][r], grid[c+1][r-1], grid[c+2][r-2], grid[c+3][r-3])){
        return true;
      }
    }
  }
}

const initialState = {
  grid: grid,
  color: 'white',
  currentPlayer: '#e8cce3',
  winner: null,
  winnerColor: null,
  isDraw: false,
  isGameOver: false,
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
    <header className='nav-header'>
      <span className='app-title'>four fun</span>
      <div className='circle-container'><div className='circle-logo'></div><div className='title-circle1'></div><div className='title-circle2'></div><div className='title-circle3'></div></div>
    </header>  
      {state.winner ? <span className='winnerMessage'>Winner is <span className='winnerColor' style={{ color: state.winnerColor, textShadow: '2px 1px 0px #00000073' }}>{state.winner}!</span></span> : null}
      {state.isDraw ? <span className='winnerMessage'>It's a draw!</span> : null}
      <Grid grid={state.grid} fill_cell={(rowIndex, cellIndex) => dispatch({ type: 'fill_cell', rowIndex, cellIndex })} />  
      {state.isGameOver ? <button className='newGameButton' onClick={() => dispatch({ type: 'clear_image' })}>New Game</button> : <button className='clearButton' type='button' onClick={() => dispatch({ type: 'clear_image' })}>Clear</button>}
    </div>
  );  
}

export default App;
