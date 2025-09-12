import React, { useState, useRef } from "react";

export default useWatch = () => {
  const [seconds, setSeconds] = useState(0);
  let timer = useRef(null);

  const onStart = () => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setSeconds((secs) => secs + 1);
    }, 1000);
  };

  const onStop = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  const onReset = () => {
    setSeconds(0);
    clearTimeout(timer.current);
    timer.current = null;
  };

  return { seconds, onStart, onStop, onReset };
};
