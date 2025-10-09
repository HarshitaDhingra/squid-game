import React, { useState } from "react";
import "./interactive-shape-grid.css";

const boxData = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

export default function ShapeGrid() {
  const totalBoxes = boxData.flat().filter(Boolean).length;
  const [selected, setSelected] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async (row, col) => {
    if (isAnimating) return;

    const id = `${row},${col}`;
    if (selected.includes(id)) return;

    const newSelected = [...selected, id];
    setSelected(newSelected);

    // ✅ Wait one render frame to show final box as green
    if (newSelected.length === totalBoxes) {
      setIsAnimating(true);
      await new Promise((r) => setTimeout(r, 150));

      // ✅ Deselect in reverse order (like a stack)
      for (let i = 0; i < newSelected.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setSelected((prev) => prev.slice(0, -1)); // remove last clicked
        // setSelected((prev) => prev.slice(1)); // in same order
      }

      setIsAnimating(false);
    }
  };
  console.log(': ', totalBoxes, selected, isAnimating);
  return (
    <div className="shape-container">
      {boxData.map((row, rIdx) => (
        <div className="row" key={rIdx}>
          {row.map((cell, cIdx) => {
            if (cell === 0) {
              return <div className="cell empty" key={cIdx}></div>;
            }

            const id = `${rIdx},${cIdx}`;
            const isSelected = selected.includes(id);

            return (
              <div
                key={cIdx}
                className={`cell box ${isSelected ? "selected" : ""}`}
                onClick={() => handleClick(rIdx, cIdx)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
