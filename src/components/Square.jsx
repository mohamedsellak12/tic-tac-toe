export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square w-full text-4xl font-bold rounded-lg transition
        flex items-center justify-center
        ${isWinning ? "bg-green-500 text-white animate-pulse" : "bg-gray-800 hover:bg-gray-700"}
        shadow-lg hover:shadow-2xl
        text-center select-none
      `}
    >
      {value}
    </button>
  )
}

