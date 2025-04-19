import React, { useRef } from "react";

function Statistics({ isOpen, onClose, stats }) {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const {
    gamesPlayed = 0,
    gamesWon = 0,
    currentStreak = 0,
    maxStreak = 0,
    guessDistribution = [0, 0, 0, 0, 0, 0],
  } = stats;

  const winRate =
    gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
  const maxGuesses = Math.max(...guessDistribution);

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        ref={modalRef}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Statistics</h2>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{gamesPlayed}</div>
            <div className="text-sm">Played</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{winRate}%</div>
            <div className="text-sm">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-sm">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{maxStreak}</div>
            <div className="text-sm">Max Streak</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Guess Distribution</h3>
          <div className="space-y-1">
            {guessDistribution.map((count, index) => (
              <div key={index} className="flex items-center">
                <div className="w-4 text-sm">{index + 1}</div>
                <div className="flex-1 mx-2">
                  <div
                    className="bg-green-500 h-6 rounded"
                    style={{
                      width: `${(count / maxGuesses) * 100}%`,
                      opacity: count > 0 ? 1 : 0.3,
                    }}
                  />
                </div>
                <div className="w-8 text-sm">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Statistics;
