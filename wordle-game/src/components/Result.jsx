function Result(props) {
  const { result } = props;

  return (
    <div className="text-center p-4">
      <p className="text-lg font-semibold">{result}</p>
    </div>
  );
}

export default Result;
