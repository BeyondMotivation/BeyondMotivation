document.querySelectorAll('.card-wrapper').forEach(wrapper => {
  const button = wrapper.querySelector('.flip-button');
  const flipContainer = wrapper.querySelector('.flip-container');

  button.addEventListener('click', () => {
    flipContainer.classList.toggle('flipped');
  });
});

  const phases = [
    {
      title: "Phase 1",
      description: "Discover why you're stuck by identifying hidden thought loops and suppressed energy."
    },
    {
      title: "Phase 2",
      description: "Understand how dopamine, identity, and suppression affect motivation on a neurological level."
    },
    {
      title: "Phase 3",
      description: "Reprogram limiting beliefs and shift your subconscious identity using proven psychological techniques."
    },
    {
      title: "Phase 4",
      description: "Create daily systems and structures that bring your goals into motion with minimal resistance."
    }
  ];


  const irlExamples = [
    {
      title: "IRL Example 1",
      description: "Here’s a real-life scenario where someone overcame procrastination using these principles."
    },
    {
      title: "IRL Example 2",
      description: "A former athlete rediscovered motivation after understanding their identity had shifted post-career."
    },
    {
      title: "IRL Example 3",
      description: "A student learned to reprogram their study habits after seeing how dopamine shaped their routines."
    },
    {
      title: "IRL Example 4",
      description: "An entrepreneur broke through burnout by building systems instead of relying on discipline alone."
    }
  ];

  let currentIRL = 0;

  function goToNextIRL() {
    currentIRL = (currentIRL + 1) % irlExamples.length;
    document.getElementById("irlTitle").textContent = irlExamples[currentIRL].title;
    document.getElementById("irlDescription").textContent = irlExamples[currentIRL].description;

  }
  

  
