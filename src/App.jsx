import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants.js";
import { checkWinnerFrom } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  // Estado inicial del tablero
  const [board, setBoard] = useState(Array(9).fill(null));
  /**
   * Deviuelve un array de dos posiciones
   * Primera posicion es el estado actual
   * Segunda posicion como actualizar el estado
   * Lo del final es el valor inicial
   */
  const [turn, setTurn] = useState(TURNS.X);

  // Estado de ganador
  // nill es que no hay ganador y el false es que hay un empate
  const [winner, setWinner] = useState(null);

  // Funcion para reiniciar el juego

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  //Check winner
  const checkEndGame = (newBoard) => {
    // Si no hay mas espaxios vacios en el tablero
    // significa que se acabo el juego y hay empate
    return newBoard.every((square) => square !== null);
  };

  // Reiniciamos el estado del tablero
  const updateBoard = (index) => {
    // No actualizamos la posicion si ya tiene algo en ella
    if (board[index] || winner) return;
    // Se hace la copia del estado para evitar modificar el original
    // los estados y las porops de React son inmutables (No deben modificarse)
    //Actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Comprobamos si hay ganador al actualizar el tablero
    const newWinner = checkWinnerFrom(newBoard);

    //Pasamos new board para comprobar el ganador con el tablero mas actualizado es decir con el ultimo movimiento
    if (newWinner) {
      setWinner(newWinner);
      confetti();
      // Comprobamos que haya un empate
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <section className="game">
        {/* eL aquare es la primera posicion del map y el
        index es la manera de identificar cada cuadrado
        unico */}
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
