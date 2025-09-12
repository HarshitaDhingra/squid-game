import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

// constants
const MAX_POSITION = 100;
const MOVE_STEP = 10;
const MIN_LIGHT_INTERVAL = 500;
const MAX_LIGHT_INTERVAL = 1000;

const LIGHTS = {
  RED: "RED",
  GREEN: "GREEN",
};

const COLORS = {
  GREEN: "#a3f7bf",
  RED: "#f96e6e",
};

const MESSAGE = {
  WINNER: "🏁 You reached the goal! You win!",
  LOSER: "💀 Caught moving during RED light! Game Over.",
};

const App = () => {
  const [position, setPosition] = useState(0);
  const [lightBack, setLight] = useState(null); // "GREEN"/"RED"
  const [user, showUser] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    const changeLight = () => {
      let randomVar = Math.random();
      setLight(randomVar < 0.5 ? "GREEN" : "RED");

      const interval =
        MIN_LIGHT_INTERVAL +
        Math.random() * (MAX_LIGHT_INTERVAL - MIN_LIGHT_INTERVAL);

      timer.current = setTimeout(changeLight, interval);
    };

    changeLight();
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (position === MAX_POSITION) {
      lightBack === "GREEN" ? showUser("winner") : showUser("loser");
    }
  }, [position, lightBack]);

  const onMove = () => {
    if (position === 100) {
      onReset();
      return;
    }
    if (lightBack === "RED") {
      showUser("loser");
      return;
    }
    const newPos = position + MOVE_STEP;
    setPosition(newPos);
  };

  const onReset = () => {
    setPosition(0);
    setLight(null);
    showUser(null);
  };

  return (
    <div
      className="container"
      data-light={lightBack}
      style={{
        backgroundColor: lightBack ? COLORS[lightBack] : "#fff", // ✅ background from light
      }}
    >
      <div className="heading">🟢🔴 Squid Game: Green Light, Red Light</div>
      <div className="progressContainer">
        <div
          className="progressBar"
          style={{
            width: `${position}%`,
            background: lightBack ? COLORS[lightBack] : "#ccc", // ✅ fix bar color
          }}
        >
          {position}%
        </div>
      </div>

      {!user ? (
        <button
          disabled={position >= MAX_POSITION}
          className="button"
          onClick={onMove}
        >
          Move
        </button>
      ) : (
        <button className="button" onClick={onReset}>
          Play Again
        </button>
      )}

      {user === "winner" && <span>{MESSAGE.WINNER}</span>}
      {user === "loser" && <span>{MESSAGE.LOSER}</span>}
    </div>
  );
};

export default App;
