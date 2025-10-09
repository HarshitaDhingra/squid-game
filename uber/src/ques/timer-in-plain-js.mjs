document.addEventListener("DOMContentLoaded", () => {
  let seconds = 0;
  let timer = null;

  const timeDisplay = document.getElementById("time");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const resetBtn = document.getElementById("reset");

  function updateTime() {
    timeDisplay.textContent = seconds;
  }

  // Ensure display is correct on load
  updateTime();

  startBtn.addEventListener("click", () => {
    if (timer) return; // Prevent multiple intervals
    timer = setInterval(() => {
      seconds++;
      updateTime();
    }, 1000);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    updateTime();
  });
});
