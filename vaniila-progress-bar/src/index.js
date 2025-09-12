let percentage = 0;
const progressBar = document.getElementById("testBgColor");
const progressValue = document.getElementById("progressValue");
const decrementBtn = document.getElementById("decrementBtn");
const incrementBtn = document.getElementById("incrementBtn");

function updateProgressBar() {
  console.log("percentage:", percentage);

  if (percentage > 0 && percentage < 40) {
    progressBar.style.backgroundColor = "red";
  } else if (percentage >= 40 && percentage < 80) {
    progressBar.style.backgroundColor = "orange";
  } else {
    progressBar.style.backgroundColor = "green";
  }

  progressBar.style.width = `${percentage}%`;
  progressValue.textContent = `${percentage}%`;
}

decrementBtn.addEventListener("click", () => {
  if (percentage > 0) {
    percentage -= 10;
    updateProgressBar();
  }
});

incrementBtn.addEventListener("click", () => {
  if (percentage < 100) {
    percentage += 10;
    updateProgressBar();
  }
});

updateProgressBar();
