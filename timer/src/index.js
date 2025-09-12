import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// write a stop watch having start, pause, and reset button.
// 1 When user click on start,  stopwatch will start.
// 2 When user click on pause , stopwatch will pause,
// 3 when user click again start it will resume where it stopped
// 4 When user click on reset, stopwatch will stop and timer
//  reset to 0 display format of timer is 00:00 -> min:sec
//  after 60 secs -> second section will go to 0 and min section will
//  increase by 1

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
