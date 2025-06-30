
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



