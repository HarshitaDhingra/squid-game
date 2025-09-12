import "./styles.css";

let inactivityTime = 0;
// const maxInactivityTime = 60 * 60 * 1000; // 60 minutes in milliseconds
const maxInactivityTime = 1 * 1 * 2000; // 2 sec in milliseconds

function resetTimer() {
  clearTimeout(inactivityTimer);
  inactivityTime = 0;
  inactivityTimer = setTimeout(logout, maxInactivityTime);
}

function logout() {
  // Perform logout actions here, e.g., clear session, redirect to login, etc.
  console.log("Logged out due to inactivity");
}

// Reset the timer on user activity
document.addEventListener("mousemove", () => {
  console.log("mouse move activity");
  resetTimer();
});
document.addEventListener("keydown", () => {
  console.log("mouse move activity");
  resetTimer();
});

// Start the timer initially
let inactivityTimer = setTimeout(logout, maxInactivityTime);
