import React from 'react'

export const Board = ({ board, onSelectItem, combination, victory }) => {
  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, i) => (
          <div key={`${i}_${Math.random()}`} className="board-row">{
            row.map((col, j) => (
              <div
                style={{ backgroundColor: combination?.includes(`${i}${j}`) ? 'yellow' : 'olivedrab'}}
                key={`${j}_${Math.random()}`}
                onClick={() => col || victory ? () => {} : onSelectItem(i, j)}
                className='board-column'
              >
                {col ? col : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
