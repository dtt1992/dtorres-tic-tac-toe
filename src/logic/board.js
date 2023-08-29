import { WINNER_COMBOS } from "../components/constants";

export const checkWinnerFrom = (boardToCheck) =>{

  for (const combo of WINNER_COMBOS){
    const [a,b,c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

// Creamos una funcion para verificar el tablero
export const checkEndGame = (newBoard) => {
  // Revisamos si hay un empate si no hay mas espacios vacios en el tablero
  return newBoard.every((square) => square !== null)
}