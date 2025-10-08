// In this coding challenge, we need to build an interactive feature where circles are drawn on the screen in response to user click. 
// The circles will have specific behaviors based on user interactions such as dragging, clicking, and overlapping. 
// The application should dynamically update the circle's size during a drag operation and detect when two circles overlap, 
// changing the color of the second circle in such cases. Now, functional requirements are left mouse button or primary circle, when the 
// circle clicks and drags with the left mouse button, the circle should be drawn at the initial click position. The radius of the circle 
// should adjust in real time as the user drags the mouse. Once the user releases the left mouse button, the circle should be finalized. 
// If the user left clicks without dragging, left circle should be cleared from the screen. Now right mouse button, the same functionality 
// should apply to the right mouse button, allowing the user to place the second circle by clicking and dragging. The circle should adjust in 
// real time as the user drags the mouse, and be finalized upon releasing the right mouse button. If the user right clicks without dragging, right 
// circle should be cleared from the screen. Circle overlap detection, if circle overlaps, the later circle in the sequence, the one that was created 
// second should change the color, so it should turn to blue. The overlap should be recalculated every time a circle is created or updated. Replacing circles,
//  each time the user draws a circle with the left or right mouse button, The existing circle for the button should be replaced with the new one.

import React, { useState, useEffect } from "react";

export default function CircleDrawer() {
  const [circles, setCircles] = useState([
    {
      id: "left",
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: "red",
    },
    {
      id: "right",
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: "green",
    },
  ]);

  const [currentCircleId, setCurrentCircleId] = useState(null); // "left" | "right" | null

  // helpers
  const getCircle = (id) => circles.find((c) => c.id === id);
  const updateCircle = (id, updates) => {
    setCircles((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  // Mouse down → start drawing
  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = e.button === 0 ? "left" : e.button === 2 ? "right" : null;
    if (!id) return;

    setCurrentCircleId(id);

    updateCircle(id, {
      startX: x,
      startY: y,
      x,
      y,
      width: 0,
      height: 0,
    });
  };

  // Mouse move → adjust radius dynamically
  const handleMouseMove = (e) => {
    if (!currentCircleId) return;
    const circle = getCircle(currentCircleId);
    if (!circle) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - circle.startX;
    const dy = y - circle.startY;
    const radius = Math.sqrt(dx * dx + dy * dy);

    updateCircle(currentCircleId, {
      x: circle.startX,
      y: circle.startY,
      width: radius * 2,
      height: radius * 2,
    });
  };

  // Mouse up → finalize or clear
  const handleMouseUp = (e) => {
    const id = e.button === 0 ? "left" : e.button === 2 ? "right" : null;
    if (!id) return;

    const c = getCircle(id);
    if (!c || c.width < 5) {
      // click without drag
      updateCircle(id, { width: 0, height: 0 });
    }

    setCurrentCircleId(null);
  };

  // Detect overlap
  useEffect(() => {
    const left = getCircle("left");
    const right = getCircle("right");

    if (!left.width || !right.width) {
      updateCircle("left", { backgroundColor: "red" });
      updateCircle("right", { backgroundColor: "green" });
      return;
    }

    const dx = left.x - right.x;
    const dy = left.y - right.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const overlap = dist < left.width / 2 + right.width / 2;

    if (overlap) {
      if (currentCircleId === "left") {
        updateCircle("left", { backgroundColor: "blue" });
        updateCircle("right", { backgroundColor: "green" });
      } else if (currentCircleId === "right") {
        updateCircle("right", { backgroundColor: "blue" });
        updateCircle("left", { backgroundColor: "red" });
      }
    } else {
      updateCircle("left", { backgroundColor: "red" });
      updateCircle("right", { backgroundColor: "green" });
    }
  }, [circles]);

  const handleContextMenu = (e) => e.preventDefault();

  return (
    <div style={{ textAlign: "center" }}>
      <h3>🎯 Uber Frontend Challenge — Circles (2-state version)</h3>

      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        style={{
          width: 600,
          height: 400,
          border: "2px solid #ccc",
          position: "relative",
          margin: "auto",
          cursor: "crosshair",
          userSelect: "none",
          overflow: "hidden"
        }}
      >
        {circles.map(
          (c) =>
            c.width > 0 && (
              <div
                key={c.id}
                style={{
                  position: "absolute",
                  width: c.width,
                  height: c.height,
                  borderRadius: "50%",
                  background: `${c.backgroundColor}`,
                  top: c.y - c.height / 2,
                  left: c.x - c.width / 2,
                }}
              />
            )
        )}
      </div>

      <p style={{ marginTop: 12 }}>
        🖱 Left Click + Drag → Red Circle  
        🖱 Right Click + Drag → Green Circle  
        🔵 Overlap → Later circle turns Blue  
        🧹 Click without drag → Removes that circle
      </p>
    </div>
  );
}
