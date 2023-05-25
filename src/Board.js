import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { randomBool } from "./utils";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.50 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let rows = [];
      for (let j = 0; j < ncols; j++) {
        rows.push(randomBool(chanceLightStartsOn));
      }
      initialBoard.push(rows)
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(r => r.every(c => c === true))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(r => r.map(c => c))

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell((y+1), (x), boardCopy)
      flipCell((y-1), (x), boardCopy)
      flipCell((y), (x-1), boardCopy)
      flipCell((y), (x+1), boardCopy)

      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon) {
    console.log(hasWon())
    return displayBoard()
  } else {
    return "YOU WIN!"
  }
  // TODO

  // make table board
  function displayBoard() {
    return (
      <table>
        {<tbody>
          {board.map((r, y) =>
            <tr key={y}>{r.map((bool, x) =>
              <Cell flipCellsAroundMe={flipCellsAround} coord={`${y}-${x}`} isLit={bool} key={`${y}-${x}`} />
            )}</tr>
          )}
        </tbody>}
      </table>
    )
  }
  // TODO
}

export default Board;
