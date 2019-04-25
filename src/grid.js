import React from 'react';
import './App.css';

function Grid({grid, fill_cell}) {
    
    function renderRow(row, rowIndex) {    
        return(
            <ul key={rowIndex} className='row'>
                {row.map((cell, cellIndex) => renderCell(cell, rowIndex, cellIndex))}
            </ul>
        );
    }

    function renderCell(cell, rowIndex, cellIndex) {
        return(
            <li key={cellIndex} className='cell' onMouseDown={() => fill_cell(rowIndex, cellIndex)} style={{backgroundColor: cell}}>
            </li>
        );
    }
    
    return(
        <div className='container'>
            {grid.map((row, rowIndex) => renderRow(row, rowIndex))}
        </div>
    );
}

export default Grid;