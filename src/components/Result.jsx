function Result({ result, onNewGame, shareString }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Wordle Result',
          text: shareString
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareString);
        alert('Result copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard if sharing fails
      try {
        await navigator.clipboard.writeText(shareString);
        alert('Result copied to clipboard!');
      } catch (clipboardError) {
        alert('Failed to share result. Please try again.');
      }
    }
  };

  return (
    <div className="text-center p-4">
      {result.split("\n").map((line, index) => (
        <p className="text-xl font-semibold" key={index}>
          {line}
          {index < result.split("\n").length - 1 && <br />}
        </p>
      ))}
      <div className="mt-4 space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          New Game
        </button>
      </div>
      <button
          className="text-white px-4 py-4 rounded"
          onClick={handleShare}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/></svg>
        </button>

    </div>
  );
}

export default Result;
