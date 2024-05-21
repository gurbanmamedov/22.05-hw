import "../css/style.css";
import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const player = new Player(document.getElementById("vimeo-player"));

const LOCAL_STORAGE_KEY = "videoplayer-current-time";

const saveCurrentTime = throttle(async () => {
  const time = await player.getCurrentTime();
  localStorage.setItem(LOCAL_STORAGE_KEY, time.toString());
}, 1000);

player.on("timeupdate", saveCurrentTime);

document.addEventListener("DOMContentLoaded", async () => {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTime !== null) {
    await player.setCurrentTime(parseFloat(savedTime));
  }
});
