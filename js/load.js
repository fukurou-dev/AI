document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    "> SYSTEM BOOT SEQUENCE INITIATED",
    "> AUTHENTICATION CHECK .... OK",
    "> SEA-EROSION MONITOR : ONLINE",
    "> DATA SYNC ................. OK",
    "> ACCESS LEVEL : INTERNAL",
    "> ACCESS GRANTED"
  ];

  const textTarget = document.getElementById("loading-text");
  const percentTarget = document.getElementById("loading-percent");
  const screen = document.getElementById("loading-screen");

  let index = 0;
  let percent = 0;
  let glitchTriggered = false;

  function triggerGlitch() {
    if (glitchTriggered) return;
    glitchTriggered = true;

    const shift =
      (Math.random() > 0.5 ? 1 : -1) *
      (Math.floor(Math.random() * 8) + 5);

    screen.style.setProperty("--shift-x", shift + "px");
    screen.classList.add("glitch-shift");

    requestAnimationFrame(() => {
      screen.classList.remove("glitch-shift");
    });
  }

  function updatePercent(target) {
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 6) + 2;

      if (percent >= target) {
        percent = target;
        clearInterval(interval);
      }

      percentTarget.textContent = percent + "%";

      if (percent >= 95 && percent < 100) {
        triggerGlitch();
      }
    }, 80);
  }

  function printLine() {
    if (index < lines.length) {
      textTarget.textContent += lines[index] + "\n";
      updatePercent(Math.floor(((index + 1) / lines.length) * 100));
      index++;
      setTimeout(printLine, 520);
    } else {
      percentTarget.textContent = "100%";
      setTimeout(() => {
        screen.classList.add("fade-out");
      }, 600);
    }
  }

  printLine();
});
