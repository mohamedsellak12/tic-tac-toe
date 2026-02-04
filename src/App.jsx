import { useState } from "react"
import Board from "./components/Board"
import Status from "./components/Status"

// Combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
  [0, 4, 8], [2, 4, 6]             // diagonales
]

export default function App() {
  // Plateau
  const [board, setBoard] = useState(Array(9).fill(""))

  // Joueur actuel
  const [currentPlayer, setCurrentPlayer] = useState("X")

  // Gagnant
  const [winner, setWinner] = useState(null)

  const [winningCombo, setWinningCombo] = useState([]) 

  const [isDraw, setIsDraw] = useState(false)

  // Fonction pour vérifier le gagnant
  function checkWinner(board) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], combo } // retour du gagnant + indices
    }
  }
  return null
}


  // Fonction appelée au clic
  function handleClick(index) {
    // 1️⃣ Si case remplie ou jeu terminé → rien
    if (board[index] !== "" || winner) return

    // 2️⃣ Copier le plateau
    const newBoard = [...board]

    // 3️⃣ Mettre X ou O
    newBoard[index] = currentPlayer

    // 4️⃣ Mettre à jour le plateau
    setBoard(newBoard)

    // 5️⃣ Vérifier le gagnant
    const gameWinner = checkWinner(newBoard)

    if (gameWinner) {
     setWinner(gameWinner.player)
  setWinningCombo(gameWinner.combo)
  } else if (!newBoard.includes("")) {
    // ✅ Toutes les cases sont remplies → match nul
    setIsDraw(true)
  } else {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      <button
         onClick={() => {
           setBoard(Array(9).fill(""))
    setCurrentPlayer("X")
    setWinner(null)
    setIsDraw(false)
    setWinningCombo([])
  }}
  className="
    mt-6 px-6 py-3
    bg-gradient-to-r from-green-400 to-blue-500
    text-white font-bold text-lg
    rounded-lg shadow-lg
    hover:scale-105 hover:shadow-2xl transition-all duration-300
    active:scale-95 active:shadow-inner
    border-2 border-gray-700
    "
>
  Recommencer
</button>


      <Status currentPlayer={currentPlayer} winner={winner} isDraw={isDraw} />

      <Board board={board} onSquareClick={handleClick} winningCombo={winningCombo} />
    </div>
  )
}

