window.onload = () => {
    const button = document.getElementById("breakButton");
  
    if (button) {
      button.addEventListener("click", () => {
        document.body.classList.add("breaking");
  
        const blocker = document.querySelector('.fade-blocker');
  
        if (blocker) {
          // Wait for the fade-blocker to fully fade in
          blocker.addEventListener('transitionend', () => {
            window.location.href = "SalesPage.html"; // or your next page
          });
        }
      });
    }
  };
  

  /*pizzapugparty3@gmail.com*/