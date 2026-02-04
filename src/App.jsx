import { useState } from "react";
import Status from "./components/Status";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 🔍 Trouver un coup gagnant ou bloquant
const findWinningMove = (board, player) => {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    const values = [board[a], board[b], board[c]];

    if (
      values.filter((v) => v === player).length === 2 &&
      values.includes("")
    ) {
      return combo[values.indexOf("")];
    }
  }
  return null;
};

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [mode, setMode] = useState(null); // "pvp" | "cpu"

  // 🏆 Vérifier le gagnant
  const checkWinner = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setWinningCombo(combo);
        return true;
      }
    }
    return false;
  };

  // 🤖 Robot semi-intelligent
  const robotPlay = (newBoard) => {
    let move = findWinningMove(newBoard, "O"); // gagner

    if (move === null) {
      move = findWinningMove(newBoard, "X"); // bloquer
    }

    if (move === null) {
      const emptyIndexes = newBoard
        .map((v, i) => (v === "" ? i : null))
        .filter((v) => v !== null);
      move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    }

    newBoard[move] = "O";
    setBoard([...newBoard]);
    checkWinner(newBoard);
    setCurrentPlayer("X");
  };

  // 🖱️ Clic sur une case
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard)) return;

    if (!newBoard.includes("")) {
      setIsDraw(true);
      return;
    }

    if (mode === "cpu") {
      setCurrentPlayer("O");
      setTimeout(() => robotPlay(newBoard), 600);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // 🔄 Reset total
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCombo([]);
    setIsDraw(false);
    setMode(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
        Tic Tac Toe
      </h1>

      {/* 🎮 Choix du mode */}
      {!mode && (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
  <button
    onClick={() => setMode("pvp")}
    className="
      w-full
      px-6 py-3
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      active:scale-95
      transition
      font-bold
      shadow-lg
    "
  >
    👤 Joueur vs Joueur
  </button>

  <button
    onClick={() => setMode("cpu")}
    className="
      w-full
      px-6 py-3
      rounded-xl
      bg-purple-600
      hover:bg-purple-700
      active:scale-95
      transition
      font-bold
      shadow-lg
    "
  >
    🤖 Joueur vs Robot
  </button>
</div>

      )}

      {/* 🧩 Grille */}
      {mode && (
        <>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {board.map((value, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`w-24 h-24 sm:w-28 sm:h-28 text-4xl font-bold rounded-xl
                  flex items-center justify-center transition
                  ${
                    winningCombo.includes(index)
                      ? "bg-green-500"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* 📢 Résultat */}
         <Status
            currentPlayer={currentPlayer}
            winner={winner}
            isDraw={isDraw}
            mode={mode}
          />
       

          {/* 🔄 Reset */}
          <button
            onClick={resetGame}
            className="mt-6 px-10 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition font-bold shadow-xl"
          >
            🔄 Recommencer
          </button>
        </>
      )}
    </div>
  );
}

