// Pain Points Focus Animation
(function() {
  const painPoints = document.querySelectorAll('.pain-point');
  const titleSections = document.querySelectorAll('.global-title-section');
  const allFocusElements = [...painPoints, ...titleSections];
  
  if (allFocusElements.length === 0) return;

  function updateFocusState() {
    const viewportCenter = window.innerHeight / 2;
    const activationMargin = 1000; // Large tolerance zone to ensure no gaps
    let closestElement = null;
    let closestDistance = Infinity;
    let candidateElements = [];

    allFocusElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      // Consider elements within activation margin
      if (distance <= activationMargin) {
        candidateElements.push({ element, distance });
      }

      // Track closest overall (fallback if no candidates in margin)
      if (distance < closestDistance) {
        closestDistance = distance;
        closestElement = element;
      }
    });

    // Remove active class from all elements
    allFocusElements.forEach(element => element.classList.remove('active'));

    // Activate the closest candidate within the margin, or the overall closest
    const elementToActivate = candidateElements.length > 0 
      ? candidateElements.sort((a, b) => a.distance - b.distance)[0].element
      : closestElement;

    if (elementToActivate) {
      elementToActivate.classList.add('active');
    }
  }

  function onScroll() {
    updateFocusState();
  }

  // Update on scroll with high frequency
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

// Idle Neuro-Pulse & Section Animations
(function(){
  // Idle neuro-pulse
  let idleTimer;
  const bodyEl = document.body;
  function setIdle() { bodyEl.classList.add('idle'); }
  function clearIdle() { bodyEl.classList.remove('idle'); clearTimeout(idleTimer); idleTimer = setTimeout(setIdle, 2500); }
  ['mousemove','scroll','keydown','touchstart'].forEach(e => window.addEventListener(e, clearIdle));
  clearIdle();

  // Hero Intersection observer to trigger sledge/key animations
  const hero = document.getElementById('hero');
  if (hero) {
    // Disable all scroll-driven hero collapsing/expanding to avoid any auto-scroll feel.
    const disableHeroCollapse = true;
    if (disableHeroCollapse) {
      // Keep hero static; skip attaching observers, but allow the rest of the script to run.
    } else {
    // Debounced hide/show: hide when intentionally scrolled past, and only
    // show the hero again after a sustained in-view (avoid tiny upward nudges).
    let heroHideTimer = null;
    let heroShowTimer = null;
    let lastScrollY = window.scrollY;
    let lastScrollDirection = 0; // 1 = down, -1 = up

    // Track scroll direction briefly to avoid showing on quick flicks up
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY;
      lastScrollDirection = (y > lastScrollY) ? 1 : (y < lastScrollY ? -1 : lastScrollDirection);
      lastScrollY = y;
    }, {passive:true});

    const heroObs = new IntersectionObserver((entries)=> {
      entries.forEach(entry => {
        const outOfView = entry.intersectionRatio < 0.12 && entry.boundingClientRect.top < 0;
        if (outOfView) {
          // larger delay to ensure intentional scroll past the hero
          clearTimeout(heroShowTimer);
          clearTimeout(heroHideTimer);
          heroHideTimer = setTimeout(()=> hero.classList.add('active'), 220);
        } else {
          // Only reopen the hero when the user is effectively at the very top of the page.
          // This prevents the fullscreen hero from reanimating while scrolling up from the hook section.
          if (window.scrollY <= 16) {
            clearTimeout(heroHideTimer);
            clearTimeout(heroShowTimer);
            const extraDelay = (lastScrollDirection === -1) ? 320 : 150;
            heroShowTimer = setTimeout(()=> hero.classList.remove('active'), extraDelay);
          } else {
            hero.classList.add('active');
          }
        }
      });
    }, {threshold: [0,0.12,0.5]});
    heroObs.observe(hero);
    }
  }

  // Enforce alternating section backgrounds starting at the Hook (diagnostic-trigger)
  (function(){
    const start = document.getElementById('diagnostic-trigger');
    if (!start) return;
    start.classList.add('bg-black');
    // forward alternation
    let next = start.nextElementSibling;
    let isWhite = true;
    while(next) {
      if (next.tagName && next.tagName.toLowerCase() === 'section') {
        next.classList.remove('bg-white','bg-black');
        next.classList.add(isWhite ? 'bg-white' : 'bg-black');
        isWhite = !isWhite;
      }
      next = next.nextElementSibling;
    }
    // backward alternation
    let prev = start.previousElementSibling;
    let prevIsWhite = false;
    while(prev) {
      if (prev.tagName && prev.tagName.toLowerCase() === 'section') {
        prev.classList.remove('bg-white','bg-black');
        prev.classList.add(prevIsWhite ? 'bg-white' : 'bg-black');
        prevIsWhite = !prevIsWhite;
      }
      prev = prev.previousElementSibling;
    }
  })();

  // Vial: grid distortion, hiss overlay, mercury shake intensity
  const content = document.querySelector('.vial-content-wrapper');
  const fill = document.getElementById('vial-fill');
  const section = document.getElementById('diagnostic-trigger');
  const vialImg = document.querySelector('.vial-base-img');
  const track = document.querySelector('.mercury-track');
  const vialWrapper = document.querySelector('.vial-visual-wrapper');
  // Smoothed follow state for the vial position
  let targetVialOffset = 0;
  let currentVialOffset = 0;
  let vialRaf = null;
  function animateVial() {
    if (!vialWrapper) return;
    currentVialOffset += (targetVialOffset - currentVialOffset) * 0.16; // easing factor
    // Round for sub-pixel stability
    const rounded = Math.round(currentVialOffset * 100) / 100;
    vialWrapper.style.transform = `translateY(${rounded}px)`;
    if (Math.abs(targetVialOffset - currentVialOffset) > 0.5) {
      vialRaf = requestAnimationFrame(animateVial);
    } else {
      vialRaf = null;
    }
  }

  // Smooth fill animation state (delayed, faster acceleration)
  let currentFillPercent = 0;
  let targetFillPercent = 0;
  let fillAnimFrame = null;
  let fillAnimStart = 0;
  const fillAnimDuration = 220; // faster acceleration (ms)
  const fillAnimDelay = 160; // ms delay before starting animation
  let fillAnimTimeout = null;
  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
  function animateFillToTarget(){
    if (!fill) return;
    if (fillAnimFrame) cancelAnimationFrame(fillAnimFrame);
    const from = currentFillPercent;
    const to = Math.max(0, Math.min(100, targetFillPercent));
    if (from === to) { currentFillPercent = to; fill.style.height = to + '%'; return; }
    fillAnimStart = performance.now();
    function step(now){
      const elapsed = now - fillAnimStart;
      const progress = Math.min(1, elapsed / fillAnimDuration);
      const eased = easeOutCubic(progress);
      currentFillPercent = from + (to - from) * eased;
      fill.style.height = currentFillPercent + '%';
      if (progress < 1) fillAnimFrame = requestAnimationFrame(step); else { currentFillPercent = to; fill.style.height = to + '%'; fillAnimFrame = null; }
    }
    fillAnimFrame = requestAnimationFrame(step);
  }

  // Align the mercury track to the visible vial image bounds so it scales 1:1
  // with the artwork without changing the image's size. This computes pixel
  // offsets and writes inline styles on load/resize/image load.
  function alignMercuryTrack() {
    if (!vialImg || !track || !track.parentElement) return;
    // If the image isn't measured yet, bail (will re-run on load)
    if (vialImg.naturalWidth === 0) return;

    const imgRect = vialImg.getBoundingClientRect();
    const containerRect = track.parentElement.getBoundingClientRect(); // .vial-container

    // Offsets calibrated from the artwork: use small top/bottom margins (percent of image height)
    const topMarginPct = 0.06;   // move tube start slightly higher
    const bulbMarginPct = 0.12;  // reduce bulb margin so the bar reaches a bit lower

    // Compute positions as percentages so alignment scales with container size.
    const topPx = Math.max(0, (imgRect.top - containerRect.top + imgRect.height * topMarginPct));
    const heightPx = Math.max(12, (imgRect.height - (imgRect.height * (topMarginPct + bulbMarginPct))));
    const leftCenterPx = imgRect.left + imgRect.width / 2 - containerRect.left;

    const topPct = (topPx / containerRect.height) * 100;
    const heightPct = (heightPx / containerRect.height) * 100;
    const leftPct = (leftCenterPx / containerRect.width) * 100;

    // Use percentage width so the track scales exactly with the image width
    // increase the multiplier so the bar appears to fill the tube more fully
    // bumped to 38% of image width for a much fuller visual fill
    const trackWidthPct = Math.max(6, (imgRect.width * 0.38 / containerRect.width) * 100);

    // Apply styles using percentages for placement and percentage width for scaling
    track.style.left = leftPct + '%';
    track.style.top = topPct + '%';
    track.style.height = heightPct + '%';
    track.style.width = trackWidthPct + '%';
    track.style.bottom = 'auto';
    // ensure centering uses translateX(-50%) so leftPct denotes center
    track.style.transform = 'translateX(-50%)';
  }

  // Debounced helpers
  const debouncedAlign = (function() { let t; return function() { clearTimeout(t); t = setTimeout(alignMercuryTrack, 80); }; })();
  window.addEventListener('resize', debouncedAlign);
  window.addEventListener('orientationchange', debouncedAlign);
  window.addEventListener('load', debouncedAlign);
  if (vialImg) vialImg.addEventListener('load', alignMercuryTrack);
  // warm run
  setTimeout(alignMercuryTrack, 60);

  document.addEventListener('scroll', function() {
    if (!fill) return;
    const targetRect = (section && section.getBoundingClientRect()) || (content && content.getBoundingClientRect());
    if (!targetRect) return;
    const windowHeight = window.innerHeight;
    // Smooth progress for vial fill
    const progress = Math.min(Math.max((windowHeight - targetRect.top) / (targetRect.height + windowHeight * 0.35), 0), 1);
    const baseFill = 12;
    const percent = baseFill + progress * (100 - baseFill);

    // Schedule smooth fill animation
    targetFillPercent = percent;
    clearTimeout(fillAnimTimeout);
    fillAnimTimeout = setTimeout(animateFillToTarget, fillAnimDelay);
    // Removed legacy shake/hiss/glow logic for "Neuro-Protocol" silence.

  });

  // Pillars activation: Simple fade-in only
  const pillars = document.querySelector('.pillars-section');
  if (pillars) {
    const pillarObs = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pillars.classList.add('active');
        }
      });
    }, {threshold: 0.15});
    pillarObs.observe(pillars);
  }

  // Proof slider behaviour (Tech Spec Compare)
  const compare = document.getElementById('compare');
  const splitter = document.getElementById('splitter');
  if (compare && splitter) {
    let dragging = false;
    splitter.addEventListener('pointerdown', (e)=>{ dragging = true; compare.setPointerCapture(e.pointerId); e.preventDefault(); });
    window.addEventListener('pointermove', (e)=> {
      if (!dragging) return;
      const rect = compare.getBoundingClientRect();
      let pct = (e.clientX - rect.left) / rect.width;
      pct = Math.max(0.05, Math.min(0.95, pct));
      compare.querySelector('.compare-left').style.width = (pct*100)+'%';
      compare.querySelector('.compare-right').style.width = ((1-pct)*100)+'%';
      splitter.style.left = (pct*100)+'%';
    });
    window.addEventListener('pointerup', (e)=> { dragging = false; });
  }

  // Story activation: Simple fade
  const story = document.querySelector('.story-section');
  if (story) {
      const storyObs = new IntersectionObserver((entries)=> {
        entries.forEach(entry => {
          if (entry.isIntersecting) story.classList.add('active');
        });
      }, {threshold: 0.2});
      storyObs.observe(story);
  }

})();

// Pivot Manifesto Intersection Observer
(function() {
  const pivotSection = document.getElementById('pivot-manifesto');
  if (pivotSection) {
    const pivotObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          entry.target.classList.add('is-active');
        }
      });
    }, {
      threshold: 0.5
    });
    
    pivotObserver.observe(pivotSection);
  }
})();

// Simple Drop Fade-In Animations
document.addEventListener('DOMContentLoaded', function() {
  
  // Animate hero on load
  setTimeout(function() {
    const hero = document.querySelector('.new-hero');
    if (hero) {
      hero.classList.add('animate-in');
      console.log('Hero animated');
    }
  }, 200);
  
  // Animate sections on scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        console.log('Animated:', entry.target.id);
      }
    });
  }, observerOptions);
  
  // Observe sections
  const pivot1 = document.querySelector('#pivot-1');
  const diagnostic = document.querySelector('#diagnostic-trigger');
  
  if (pivot1) observer.observe(pivot1);
  if (diagnostic) observer.observe(diagnostic);
});

// Marquee Animation
document.addEventListener('DOMContentLoaded', function() {
  const marqueeContent = document.querySelector('.marquee-content');
  if (!marqueeContent) return;
  
  const marqueeContainer = document.querySelector('.marquee-container');
  const speed = 50; // pixels per second
  let position = 0;
  let width = marqueeContent.offsetWidth / 2; // Half width since content is duplicated
  
  function animate() {
    position -= speed / 60; // 60 fps
    
    if (Math.abs(position) >= width) {
      position = 0;
    }
    
    marqueeContent.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  
  animate();
});

// Pillars Carousel
document.addEventListener('DOMContentLoaded', function() {
  const pillarsCarousel = new Swiper('.pillars-carousel', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.pillars-next',
      prevEl: '.pillars-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1.5,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 28,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 32,
      }
    },
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      forceToAxis: true,
    }
  });
});

// Pivot Carousel (reuse same interaction pattern as pillars)
document.addEventListener('DOMContentLoaded', function() {
  const pivotCarousel = new Swiper('.pivot-carousel', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.pivot-next',
      prevEl: '.pivot-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 1.25,
        spaceBetween: 28,
      },
      1280: {
        slidesPerView: 1.5,
        spaceBetween: 32,
      }
    },
    grabCursor: true,
    keyboard: { enabled: true },
    mousewheel: { forceToAxis: true }
  });
});

// ----------------------------------------------------------------------------- 
// Offer Section: 3D Tilt Effect
// ----------------------------------------------------------------------------- 

(function() {
  const planCards = document.querySelectorAll('.plan-card, .plan-plus');
  
  if (planCards.length === 0) return;

  // 3D tilt effect on mouse move
  planCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X position within card
      const y = e.clientY - rect.top;  // Mouse Y position within card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position (-10 to +10 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });
})();
