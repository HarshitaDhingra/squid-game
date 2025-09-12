import React from "react";
import useWatch from "./use-watch";
import "./styles.css";

function Stopwatch() {
  const { seconds, onStart, onStop, onReset } = useWatch();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Time: {seconds}s</h1>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
