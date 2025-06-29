const phaseIcons = [
  "flare",                  // Phase 1: Ignition Point
  "local_fire_department",  // Phase 2: Flow Entry
  "bolt",                   // Phase 3: Momentum Loop
  "auto_awesome"            // Phase 4: Reset & Prime
];

const phases = [
  {
    title: "Ignition",
  subHeader: "Your pre-work motivation level",
  description:
    "This is what most people mean by motivation: the surge of energy, curiosity, and hype you feel just before you begin—whether that means opening a laptop, stepping onto a treadmill, or picking up a paintbrush.",
  driverNote:
    "Fueled by baseline dopamine, cognitive freshness, belief alignment, and supportive habits."

    },
{
  title: "Launch Window",
  subHeader: "The first 10–30 minutes on task",
  description:
    "Here motivation either locks in or leaks out. A quick cognitive warm-up, one laser-specific first action, and a distraction-proof environment hand control to your executive brain—turning intention into real traction.",
  driverNote:
    "Stabilised by task clarity, novelty, environmental cues, and Executive-Control activation."
},
{
  title: "Sustain & Protect",
  subHeader: "Hour 1–3 of the work session",
  description:
    "Glucose dips, dopamine slopes, and decision fatigue threaten momentum. Chain micro-wins, surface instant feedback, and weave in 60-second resets so effort refuels itself instead of sliding into burnout.",
  driverNote:
    "Maintained by micro-wins, visible feedback loops, movement breaks, and balanced neurochemistry."
},
{
  title: "Close Loop & Seed Next",
  subHeader: "The final five minutes before you stop",
  description:
    "Wrap up on purpose: log today’s wins, plant tomorrow’s first step, then switch to active recovery—walk, breathwork, nutrients. You finish proud, not drained, priming an effortless next ignition.",
  driverNote:
    "Strengthens self-trust through reflection, next-step priming, and a parasympathetic reset."
}
];

let currentPhase = 0;

function updatePhaseCard() {
  const phase = phases[currentPhase];
  document.getElementById("phaseIcon").textContent = phaseIcons[currentPhase];
  document.getElementById("phaseTitle").textContent = phase.title;
document.getElementById("phaseSubtitle").textContent = phase.subHeader || '';

  document.getElementById("phaseDescription").textContent = phase.description;
  document.getElementById("phaseDriverNote").textContent = phase.driverNote || '';
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



