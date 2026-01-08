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

// Theme Transition Animation
(function() {
  const pivotSection = document.getElementById('pivot-manifesto');
  if (!pivotSection) return;

  function interpolateColor(color1, color2, progress) {
    // Convert hex colors to RGB
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    
    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;
    
    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;
    
    // Interpolate
    const r = Math.round(r1 + (r2 - r1) * progress);
    const g = Math.round(g1 + (g2 - g1) * progress);
    const b = Math.round(b1 + (b2 - b1) * progress);
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  function updateTheme() {
    const pivotRect = pivotSection.getBoundingClientRect();
    const pivotTop = pivotRect.top;
    const pivotHeight = pivotRect.height;
    
    // Animation starts at 2/5 of the way through and ends at 4/5 of the way through
    const animationStart = -(2 / 5) * pivotHeight;   // 2/5 through pivot section
    const animationEnd = -(4 / 5) * pivotHeight;     // 4/5 through pivot section
    
    let progress = 0;
    
    if (pivotTop <= animationStart && pivotTop > animationEnd) {
      // Animation is happening
      progress = (animationStart - pivotTop) / (animationStart - animationEnd);
    } else if (pivotTop <= animationEnd) {
      // Animation is complete, fully transitioned
      progress = 1;
    }
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    
    // Dark theme colors
    const darkBg = '#000000';
    const darkText = '#FFFFFF';
    const darkMuted = '#A1A1A1';
    const darkGray = '#86868b';
    const darkBorder = 'rgba(255, 255, 255, 0.15)';
    
    // Light theme colors
    const lightBg = '#FFFFFF';
    const lightText = '#000000';
    const lightMuted = '#666666';
    const lightGray = '#999999';
    const lightBorder = 'rgba(0, 0, 0, 0.15)';
    
    // Interpolate colors
    const bgColor = interpolateColor(darkBg, lightBg, progress);
    const textColor = interpolateColor(darkText, lightText, progress);
    const mutedColor = interpolateColor(darkMuted, lightMuted, progress);
    const grayColor = interpolateColor(darkGray, lightGray, progress);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--bg-core', bgColor);
    document.documentElement.style.setProperty('--text-main', textColor);
    document.documentElement.style.setProperty('--text-muted', mutedColor);
    
    // Update direct color properties
    document.body.style.color = textColor;
    document.body.style.backgroundColor = bgColor;
    
    // Update all sections
    document.querySelectorAll('section').forEach(section => {
      section.style.backgroundColor = bgColor;
    });
    
    // Update all global-title-sections
    document.querySelectorAll('.global-title-section').forEach(section => {
      section.style.backgroundColor = bgColor;
    });
    
    // Update text elements (headings)
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      heading.style.color = textColor;
    });
    
    // Update paragraphs and spans
    document.querySelectorAll('p, span, li').forEach(element => {
      element.style.color = mutedColor;
    });
    
    // Update borders in interactive elements
    const borderColor = progress < 0.5 
      ? `rgba(255, 255, 255, ${0.15 * (1 - progress / 0.5)})` 
      : `rgba(0, 0, 0, ${0.15 * ((progress - 0.5) / 0.5)})`;
    document.documentElement.style.setProperty('--border', borderColor);
  }

  // Update on scroll
  window.addEventListener('scroll', updateTheme, { passive: true });
  
  // Initial state
  updateTheme();
})();
