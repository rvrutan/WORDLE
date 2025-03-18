function Result(props) {
  const { result } = props;

  return (
    <div className="text-center p-4">
      {result.split("\n").map((line, index) => (
        <p className="text-xl font-semibold" key={index}>
          {line}
          {index < result.split("\n").length - 1 && <br />}
        </p>
      ))}{" "}
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
