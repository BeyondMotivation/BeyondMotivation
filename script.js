const phaseIcons = [
  "flare",                  // Phase 1: Ignition Point
  "local_fire_department",  // Phase 2: Flow Entry
  "bolt",                   // Phase 3: Momentum Loop
  "auto_awesome"            // Phase 4: Reset & Prime
];

const phases = [
  {
    title: "Phase 1: Ignition",
    description:
      "Kick-start motivation by lifting baseline dopamine: purge high-stim distractions, claim one quick win, and add a spark of novelty. When curiosity, clarity, and reward expectation line up, action becomes the obvious next step."
  },
  {
    title: "Phase 2: Flow Entry",
    description:
      "Shift from idle to deep focus. A short cognitive warm-up, a distraction-free environment, and one laser-specific first task hand the controls to your executive brain—traction replaces hesitation."
  },
  {
    title: "Phase 3: Momentum Loop",
    description:
      "Turn progress into chemistry. Chain micro-wins, surface instant feedback, and add brief movement or hydration resets to keep glucose and dopamine balanced. Effort now fuels itself, not burnout."
  },
  {
    title: "Phase 4: Reset & Prime",
    description:
      "End on purpose: log wins, cue tomorrow’s first step, then switch to active recovery—walk, breathwork, nutrition. You close the loop with energy higher than you started, so the next ignition is effortless."
  }
];

let currentPhase = 0;

function updatePhaseCard() {
  const phase = phases[currentPhase];
  document.getElementById("phaseIcon").textContent = phaseIcons[currentPhase];
  document.getElementById("phaseTitle").textContent = phase.title;
  document.getElementById("phaseDescription").textContent = phase.description;
  document.getElementById("phaseNumber").textContent = (currentPhase + 1).toString().padStart(2, '0');
  document.getElementById("phaseLabel").textContent = `PHASE ${currentPhase + 1}`;
}

function goToNextPhase() {
  currentPhase = (currentPhase + 1) % phases.length;
  updatePhaseCard();
}

window.addEventListener("DOMContentLoaded", () => {
  updatePhaseCard();
});