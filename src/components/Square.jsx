

export const Square = ({children, isSelected, updateBoard, index}) =>{
  // Podemos verificar el turno de cada jugador
  const className= `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () =>{
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

