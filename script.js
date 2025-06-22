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







const irlpeopleCases = [
  {
    icon: "person",
    label: "CASE 1",
    title: "The Burned-Out Coder",
    desc: "Taylor worked 60-hour weeks and felt nothing but exhaustion. Realizing her 'hustle' was a response to anxiety, not passion, she rebuilt her routine using feedback loops. Now, her work gives energy instead of draining it."
  },
  {
    icon: "school",
    label: "CASE 2",
    title: "The Reluctant Student",
    desc: "Jamal procrastinated on school projects until the deadline panic hit. By breaking tasks into micro-wins and tracking dopamine rewards, he now finishes early—without all-nighters."
  },
  {
    icon: "sports_gymnastics",
    label: "CASE 3",
    title: "The On/Off Athlete",
    desc: "Sofia trained in bursts but struggled with consistency. Discovering her drop-offs were from feedback droughts, she gamified her process. Now, progress feels constant."
  },
  {
    icon: "palette",
    label: "CASE 4",
    title: "The Blocked Creative",
    desc: "Aiden blamed lack of inspiration for blank pages. By learning to induce flow with the right phase triggers, creative energy became reliable, not random."
  }
];

let currentIrlperson = 0;

function updateIrlpeopleCard() {
  const data = irlpeopleCases[currentIrlperson];
  document.getElementById("irlpeopleIcon").textContent = data.icon;
  document.getElementById("irlpeopleLabel").textContent = data.label;
  document.getElementById("irlpeopleTitle").textContent = data.title;
  document.getElementById("irlpeopleDescription").textContent = data.desc;
  document.getElementById("irlpeopleNumber").textContent = (currentIrlperson + 1).toString().padStart(2, '0');
}

function goToNextIrlperson() {
  currentIrlperson = (currentIrlperson + 1) % irlpeopleCases.length;
  updateIrlpeopleCard();
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  updateIrlpeopleCard();
});