document.querySelectorAll('.card-wrapper').forEach(wrapper => {
  const button = wrapper.querySelector('.flip-button');
  const flipContainer = wrapper.querySelector('.flip-container');

  button.addEventListener('click', () => {
    flipContainer.classList.toggle('flipped');
  });
});

