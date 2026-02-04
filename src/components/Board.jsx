import Square from "./Square"

export default function Board({ board, onSquareClick, winningCombo }) {
  return (
    <div 
      className="
        grid grid-cols-3 gap-3 mt-6 
        w-[300px] sm:w-[360px] md:w-[420px] lg:w-[480px]
      "
    >
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinning={winningCombo.includes(index)}
        />
      ))}
    </div>
  )
}
