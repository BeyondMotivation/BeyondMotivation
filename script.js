
const phases = [
 {
    title: "Phase 1: Ignition Point",
    description:
      "Re-arm the brain’s reward system before work begins: clear one micro-goal, detach from high-stim distractions, and inject novelty so your nervous system chooses effort over escape. When clarity, curiosity, and perceived payoff align, the engine fires."
  },
  {
    title: "Phase 2: Flow Entry",
    description:
      "Guide the mind from stillness to traction. Use a 3-minute warm-up script, environmental anchors, and a single ultra-specific first action to lock attention. Distractions are quarantined; the prefrontal cortex takes the wheel and momentum starts to build."
  },
  {
    title: "Phase 3: Momentum Loop",
    description:
      "Convert progress into self-fueling chemistry. Stack micro-wins, surface visible feedback, and cycle brief movement or hydration resets to keep glucose and dopamine balanced. The work now rewards itself, stretching focus far past the old burnout line."
  },
  {
    title: "Phase 4: Reset & Prime",
    description:
      "Close the session in a way that raises baseline energy for next time. Log what worked, plant tomorrow’s first micro-task, and step into active recovery (walk, breathwork, nutrition). You finish proud, not drained—so re-ignition is effortless."
  }
];

let currentPhase = 0;

// ---- Draws the phase number on canvas ----
function drawPhaseNumber(num) {
  const canvas = document.getElementById("phaseCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw shadowed large number (background watermark style)
  ctx.font = "bold 120px Helvetica, Arial, sans-serif";
  ctx.globalAlpha = 0.09;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(num, canvas.width / 2, canvas.height / 2);
  ctx.globalAlpha = 1;
}

// ---- Update Card (number, title, description) ----
function updatePhaseCard() {
  const phase = phases[currentPhase];
  document.getElementById("phaseTitle").textContent = phase.title;
  document.getElementById("phaseDescription").textContent = phase.description;
  let displayNum = (currentPhase + 1).toString().padStart(2, '0');
  drawPhaseNumber(displayNum);
}

// ---- Next Button Handler ----
function goToNextPhase() {
  currentPhase = (currentPhase + 1) % phases.length;
  updatePhaseCard();
}

// ---- Init on Load ----
window.addEventListener("DOMContentLoaded", () => {
  updatePhaseCard();
});