// https://namastedev.com/practice/draw-circles
import React, { useState, useRef, useEffect } from "react";
import "./draw-circles.css";

function DrawCircles() {
  const [circles, setCircles] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const drawingRef = useRef(null);

  const handleDraw = (e) => {
    const rect = drawingRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCircles((prev) => [...prev, { x, y }]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (circles.length === 0) return;
    const updated = [...circles];
    const last = updated.pop();
    setCircles(updated);
    setRedoStack([...redoStack, last]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const updated = [...redoStack];
    const last = updated.pop();
    setRedoStack(updated);
    setCircles([...circles, last]);
  };

  useEffect(() => {
    const keyHandler = (e) => {
      if (e.ctrlKey && e.key === "z") handleUndo();
      if (e.ctrlKey && e.key === "y") handleRedo();
    }
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [circles, redoStack]);

  return (
    <div className="circle-drawer">
      <div
        data-testid="drawing-area"
        className="drawing-area"
        ref={drawingRef}
        onClick={handleDraw} >
        {
          circles.map((circle, index) => (
            <div
              key={index}
              className="circle"
              style={{ left: circle.x, top: circle.y }}
              data-testid="circle"
            />
          ))
        }
      </div>
      <div className="buttons">
        <button className="undo-btn" onClick={handleUndo}>
          Undo
        </button>
        <button className="redo-btn" onClick={handleRedo}>
          Redo
        </button>
      </div>
    </div>
  );
}

export default DrawCircles;
