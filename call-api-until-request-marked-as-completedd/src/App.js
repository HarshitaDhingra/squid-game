import "./styles.css";
import { usePollAsync } from "./usePollAsync";

function asyncFunc() {
  const val = Math.random();
  console.log("value:", val);
  return new Promise((res) => {
    if (val > 0.9) res({ completed: true });
    else res({ completed: false });
  });
}

export default function App() {
  const { data, loading, error, start, cancel } = usePollAsync(
    asyncFunc,
    2000,
    5
  );

  return (
    <div>
      <button onClick={start}>Start Polling</button>
      <button onClick={cancel}>Cancel</button>
      {loading && <p>Loading...</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
}
