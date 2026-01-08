// Pain Points Focus Animation
(function() {
  const painPoints = document.querySelectorAll('.pain-point');
  const titleSections = document.querySelectorAll('.global-title-section');
  const allFocusElements = [...painPoints, ...titleSections];
  const marbles = document.querySelectorAll('.glass-marble');
  
  if (allFocusElements.length === 0) return;
  
  console.log('Marbles found:', marbles.length);

  let scrollY = 0;
  let ticking = false;

  function updateFocusState() {
    const viewportCenter = window.innerHeight / 2;
    let closestElement = null;
    let closestDistance = Infinity;

    allFocusElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestElement = element;
      }
    });

    // Remove active class from all elements
    allFocusElements.forEach(element => element.classList.remove('active'));

    // Add active class to closest element (no marble activation)
    if (closestElement) {
      closestElement.classList.add('active');
    }
  }

  function updateParallax() {
    const section = document.querySelector('.vial-mirror-section');
    if (!section || marbles.length === 0) return;
    
    const sectionRect = section.getBoundingClientRect();
    const sectionScrollProgress = -sectionRect.top;
    
    marbles.forEach((marble, index) => {
      const speed = parseFloat(marble.getAttribute('data-speed')) || 0.4;
      
      // Parallax: marbles move 60% slower than normal scroll
      const parallaxOffset = sectionScrollProgress * speed;
      
      // Create subtle wobble effect based on scroll position
      const wobbleSpeed = [0.006, 0.005, 0.007, 0.0055][index];
      const wobbleAmplitude = 10; // Max 10 degrees of rotation
      
      const wobbleRotation = Math.sin(scrollY * wobbleSpeed) * wobbleAmplitude;
      
      // Additional floating motion
      const floatX = Math.sin(scrollY * wobbleSpeed * 0.5) * 15;
      const floatY = Math.cos(scrollY * wobbleSpeed * 0.3) * 10;
      
      // Base rotation values
      const baseRotations = [120, -80, 200, -140];
      const baseRot = baseRotations[index];
      
      // Apply transforms (all marbles stay at 0.7 scale with wobble)
      const transform = `translate(${floatX}px, ${parallaxOffset + floatY}px) scale(0.7) rotateZ(${baseRot + wobbleRotation}deg)`;
      marble.style.transform = transform;
    });
  }

  function onScroll() {
    scrollY = window.pageYOffset;
    updateFocusState();
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Update on scroll
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial state
  updateFocusState();
  updateParallax();
})();

// Unified Theme Transition System
(function() {
  const pivotSection = document.getElementById('pivot-manifesto');
  const reversePivotSection = document.getElementById('reverse-pivot-section');
  
  if (!pivotSection && !reversePivotSection) return;

  function interpolateColor(color1, color2, progress) {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    
    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;
    
    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;
    
    const r = Math.round(r1 + (r2 - r1) * progress);
    const g = Math.round(g1 + (g2 - g1) * progress);
    const b = Math.round(b1 + (b2 - b1) * progress);
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  function applyTheme(bgColor, textColor, mutedColor) {
    document.documentElement.style.setProperty('--bg-core', bgColor);
    document.documentElement.style.setProperty('--text-main', textColor);
    document.documentElement.style.setProperty('--text-muted', mutedColor);
    
    document.body.style.color = textColor;
    document.body.style.backgroundColor = bgColor;
    
    document.querySelectorAll('section').forEach(section => {
      section.style.backgroundColor = bgColor;
    });
    
    document.querySelectorAll('.global-title-section').forEach(section => {
      section.style.backgroundColor = bgColor;
    });
    
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      heading.style.color = textColor;
    });
    
    document.querySelectorAll('p, span, li').forEach(element => {
      element.style.color = mutedColor;
    });
  }

  function updateTheme() {
    // Dark theme colors
    const darkBg = '#000000';
    const darkText = '#FFFFFF';
    const darkMuted = '#A1A1A1';
    
    // Light theme colors
    const lightBg = '#FFFFFF';
    const lightText = '#000000';
    const lightMuted = '#666666';
    
    // Default to dark theme
    let finalBg = darkBg;
    let finalText = darkText;
    let finalMuted = darkMuted;
    
    // Determine scroll position relative to both sections
    let pivotCompleted = false;
    let reversePivotCompleted = false;
    
    // Check forward pivot transition (dark → light)
    if (pivotSection) {
      const pivotRect = pivotSection.getBoundingClientRect();
      const pivotTop = pivotRect.top;
      const pivotHeight = pivotRect.height;
      
      const animationStart = -(2 / 5) * pivotHeight;
      const animationEnd = -(4 / 5) * pivotHeight;
      
      let progress = 0;
      
      if (pivotTop <= animationStart && pivotTop > animationEnd) {
        // Currently animating through pivot
        progress = (animationStart - pivotTop) / (animationStart - animationEnd);
        progress = Math.max(0, Math.min(1, progress));
        finalBg = interpolateColor(darkBg, lightBg, progress);
        finalText = interpolateColor(darkText, lightText, progress);
        finalMuted = interpolateColor(darkMuted, lightMuted, progress);
      } else if (pivotTop <= animationEnd) {
        // Pivot animation complete - we're in light theme zone
        pivotCompleted = true;
        finalBg = lightBg;
        finalText = lightText;
        finalMuted = lightMuted;
      }
    }
    
    // Check reverse pivot transition (light → dark)
    // Only apply this if we've completed the forward pivot
    if (reversePivotSection && pivotCompleted) {
      const reversePivotRect = reversePivotSection.getBoundingClientRect();
      const reversePivotTop = reversePivotRect.top;
      const reversePivotHeight = reversePivotRect.height;
      
      const animationStart = -(2 / 5) * reversePivotHeight;
      const animationEnd = -(4 / 5) * reversePivotHeight;
      
      let progress = 0;
      
      if (reversePivotTop <= animationStart && reversePivotTop > animationEnd) {
        // Currently animating through reverse pivot
        progress = (animationStart - reversePivotTop) / (animationStart - animationEnd);
        progress = Math.max(0, Math.min(1, progress));
        finalBg = interpolateColor(lightBg, darkBg, progress);
        finalText = interpolateColor(lightText, darkText, progress);
        finalMuted = interpolateColor(lightMuted, darkMuted, progress);
      } else if (reversePivotTop <= animationEnd) {
        // Reverse pivot animation complete - back to dark theme
        reversePivotCompleted = true;
        finalBg = darkBg;
        finalText = darkText;
        finalMuted = darkMuted;
      }
    }
    
    applyTheme(finalBg, finalText, finalMuted);
  }

  window.addEventListener('scroll', updateTheme, { passive: true });
  updateTheme();
})();

// FAQ Toggle Animation
(function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
})();
