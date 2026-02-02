document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("outlet-track");
  const clone = track.cloneNode(true);
  track.append(...clone.children);
});
