// Button → Progress Bars with Concurrency Limit

// Prompt: Create a UI where clicking a button spawns a progress bar that fills over some time (e.g. 3–5 seconds). If more clicks happen than a concurrency limit (say 3), extra bars should wait (queue) until earlier ones finish.

// Skills: queueing, promise handling, UI updates, scheduling, event control.
 import React, { useState } from "react";

// concurrency scheduler (your code)
async function scheduleTasks(functions, limit) {
  const results = new Array(functions.length);
  let currentIndex = 0;

  async function worker() {
    if (currentIndex >= functions.length) return;
    const index = currentIndex++;

    try {
      results[index] = await functions[index]();
    } catch (err) {
      results[index] = err;
    } finally {
      if (currentIndex < functions.length) {
        await worker();
      }
    }
  }

  const workers = Array(Math.min(limit, functions.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

// helper to simulate async progress bar
function createProgressTask(id, setBars) {
  return () =>
    new Promise((resolve) => {
      let progress = 0;
      const duration = 3000 + Math.random() * 2000; // 3–5s
      const interval = 100;

      const timer = setInterval(() => {
        progress += (interval / duration) * 100;
        setBars((prev) =>
          prev.map((bar) =>
            bar.id === id ? { ...bar, progress: Math.min(progress, 100) } : bar
          )
        );

        if (progress >= 100) {
          clearInterval(timer);
          resolve(`Bar ${id} done`);
        }
      }, interval);
    });
}

export default function ProgressBarsDemo() {
  const [bars, setBars] = useState([]);
  const concurrencyLimit = 3;

  async function handleClick() {
    const newId = Date.now();
    const newBar = { id: newId, progress: 0 };
    setBars((prev) => [...prev, newBar]);

    // prepare a batch of all current unfinished bars as tasks
    const tasks = bars
      .filter((b) => b.progress < 100)
      .map((b) => createProgressTask(b.id, setBars));

    // also include this new one
    tasks.push(createProgressTask(newId, setBars));

    // schedule all tasks under concurrency limit
    scheduleTasks(tasks, concurrencyLimit);
  }

  return (
    <div style={{ padding: "20px", maxWidth: 400 }}>
      <button onClick={handleClick}>Add Progress Bar</button>
      <div style={{ marginTop: "20px" }}>
        {bars.map((bar) => (
          <div
            key={bar.id}
            style={{
              height: "20px",
              width: "100%",
              background: "#eee",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${bar.progress}%`,
                background: "#4caf50",
                transition: "width 0.1s linear",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
