function Result(props) {
  const { result } = props;

  return (
    <div className="text-center p-4">
      <p className="text-lg font-semibold">{result}</p>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => window.location.reload()}
      >
        New Game
      </button>
    </div>
  );
}

export default Result;
