// Pain Points Focus Animation
(function() {
  const painPoints = document.querySelectorAll('.pain-point');
  const titleSections = document.querySelectorAll('.global-title-section');
  const allFocusElements = [...painPoints, ...titleSections];
  
  if (allFocusElements.length === 0) return;

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

    // Add active class to closest element
    if (closestElement) {
      closestElement.classList.add('active');
    }
  }

  function onScroll() {
    updateFocusState();
  }

  // Update on scroll
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial state
  updateFocusState();
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

// Offer Section Parallax (glass cards float subtly)
(function() {
  const offer = document.getElementById('offer-section');
  if (!offer) return;
  const cards = offer.querySelectorAll('.plan-card');
  if (cards.length === 0) return;

  function updateParallax() {
    const rect = offer.getBoundingClientRect();
    const offset = -rect.top; // positive as section scrolls up
    cards.forEach((card, i) => {
      // Move 20px max, slower than background
      const y = Math.max(-20, Math.min(20, offset * 0.05));
      card.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax);
  updateParallax();
})();

// Funnel Dots Animation
(function() {
  const canvas = document.getElementById('funnel-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const particleCount = 160;
  let particles = [];
  let animationTime = 0;
  const animationDuration = 3900; // 3.9 seconds for full cycle (30% slower)

  // Set canvas size
  function resizeCanvas() {
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }

  // Initialize particles
  function initParticles() {
    particles = [];
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const centerX = canvasWidth / 2;
    
    for (let i = 0; i < particleCount; i++) {
      // Random starting position at top (spread out, avoiding center)
      const startAngle = Math.random() * Math.PI * 2;
      const minStartRadius = canvasWidth * 0.15; // Minimum distance from center
      const maxStartRadius = canvasWidth * 0.45; // Maximum distance from center
      const startRadius = minStartRadius + Math.random() * (maxStartRadius - minStartRadius);
      const startX = centerX + Math.cos(startAngle) * startRadius;
      const startY = (canvasHeight * 0.05) + (Math.random() * canvasHeight * 0.25);
      
      // Random ending position at bottom (spread out, avoiding center)
      const endAngle = Math.random() * Math.PI * 2;
      const minEndRadius = canvasWidth * 0.15; // Minimum distance from center
      const maxEndRadius = canvasWidth * 0.45; // Maximum distance from center
      const endRadius = minEndRadius + Math.random() * (maxEndRadius - minEndRadius);
      const endX = centerX + Math.cos(endAngle) * endRadius;
      const endY = (canvasHeight * 0.70) + (Math.random() * canvasHeight * 0.25);
      
      particles.push({
        id: i,
        size: 3 + Math.random() * 4,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        offset: i / particleCount, // Each particle has a different position in the flow
      });
    }
  }

  function getParticlePosition(particle, progress) {
    // Each particle has its own offset in the animation timeline
    let particleProgress = progress + particle.offset;
    
    // Loop the animation
    particleProgress = particleProgress % 1;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let x, y;
    
    if (particleProgress < 0.5) {
      // First half: Move from random start position to center point
      // Fast at start, slow at middle - use ease-out cubic
      const phase = particleProgress * 2; // 0 to 1
      const easedPhase = 1 - Math.pow(1 - phase, 3); // Ease-out cubic
      x = particle.startX + (centerX - particle.startX) * easedPhase;
      y = particle.startY + (centerY - particle.startY) * easedPhase;
    } else {
      // Second half: Move from center point to random end position
      // Slow at middle, fast at end - use ease-in cubic
      const phase = (particleProgress - 0.5) * 2; // 0 to 1
      const easedPhase = Math.pow(phase, 3); // Ease-in cubic
      x = centerX + (particle.endX - centerX) * easedPhase;
      y = centerY + (particle.endY - centerY) * easedPhase;
    }
    
    return { x, y };
  }

  function animate() {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Update animation time
    animationTime += 16; // ~60fps
    const progress = (animationTime % animationDuration) / animationDuration;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw particles
    particles.forEach(particle => {
      const pos = getParticlePosition(particle, progress);
      
      // Draw dot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, particle.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
})();
