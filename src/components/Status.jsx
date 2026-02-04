export default function Status({ currentPlayer, winner, isDraw }) {
  return (
    <p className="text-xl">
      {winner
        ? <>🎉 <span className="font-bold">{winner}</span> a gagné !</>
        : isDraw
        ? "🤝 Match nul !"
        : <>Tour de <span className="font-bold">{currentPlayer}</span></>
      }
    </p>
  )
}
