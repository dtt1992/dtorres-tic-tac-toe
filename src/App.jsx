import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx" 
import { TURNS } from "./components/constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {

  // Creamos un estado para recrear los cuadrados del tic tac toe
  const [board, setBoard] = useState( () =>{
    // Lee solo una vez el localstorage cuando se inicializa
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
    ? JSON.parse(boardFromStorage)
    : Array(9).fill(null)

  })

  // Creamos un e stado para saber el turno
  const [turn, setTurn] = useState(() =>{
    const turnFromStage = window.localStorage.getItem('turn')
    return turnFromStage ?? TURNS.X
  })

  // Creamos un estado para saber el ganador
  // Null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  // Hacemos una funcion para reiniciar el juego
  const resetGame = () =>{
    setBoard(Array(9).fill(null)) 
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()

  }

  // Creamos una funcion para saber quien ha puesto y quien ha ganado
  const updateBoard = (index) =>{

    // No actualizamos esta posicion si ya tiene algo
    if (board[index] || winner) return

    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Si el turno es de la X pues pasa el turno al O
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    
    // Revisamos si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //Empate
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) =>{
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">

        <Square isSelected ={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected ={turn === TURNS.O}>
          {TURNS.O}
        </Square>

      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
