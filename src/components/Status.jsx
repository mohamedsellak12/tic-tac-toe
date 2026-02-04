export default function Status({ currentPlayer, winner, isDraw, mode }) {
  const getWinnerText = () => {
    if (mode === "cpu") {
      if (winner === "X") return "🎉 Vous avez gagné !";
      if (winner === "O") return "💻 L’ordinateur a gagné !";
    }

    return `🎉 ${winner} a gagné !`;
  };

  return (
    <p className="text-xl font-semibold">
      {winner
        ? getWinnerText()
        : isDraw
        ? "🤝 Match nul !"
        : (
          mode==="pvp"&& <div className="mt-6">
            Tour de <span className="font-bold mt-6">{currentPlayer}</span>
          </div>
        )}
    </p>
  );
}

