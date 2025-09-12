import "./styles.css";

const bar = document.querySelector(".progress-bar");
const queued = document.querySelector(".queued");

let loading = false;
let width = 0;
let count = 0;

function loadBar() {
  queued.innerText = ++count; //
  if (loading === false) {
    tick();
  }
}

function tick() {
  if (width > 100) {
    width = 0;
    bar.style.width = 0;
    queued.innerText = --count; //
    if (count < 1) {
      loading = false;
      return;
    }
  }

  loading = true;
  ++width;
  bar.style.width = `${width}%`;
  setTimeout(tick, 30);
}

document.getElementById("load-btn").addEventListener("click", loadBar);
