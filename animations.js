// Rubber Band Animation
(function() {
  const svgContainer = document.createElement('div');
  svgContainer.id = 'rubber-band-container';
  svgContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
  `;
  document.body.insertBefore(svgContainer, document.body.firstChild);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  `;
  svgContainer.appendChild(svg);

  // Create a TicTac-shaped rubber band (rounded rectangle with straight center)
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#FFFFFF');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);

  // Configuration
  const config = {
    minHeight: 60, // Height of the ellipse (constant)
    maxWidth: null, // Will be set to window width on init
    minWidth: 200, // Final collapsed width (TicTac shape)
    collapseStartScroll: 0, // Start immediately at scroll 0
    collapseEndScroll: null, // Will be calculated from hook section
    hookTitleOffset: null, // Y position of hook title
  };

  function initConfig() {
    config.maxWidth = window.innerWidth - 50;
    
    // Find the hook section title
    const hookSection = document.getElementById('diagnostic-trigger');
    const globalTitleSection = hookSection?.querySelector('.global-title-section');
    
    if (globalTitleSection) {
      const titleRect = globalTitleSection.getBoundingClientRect();
      const titleBottomY = window.scrollY + titleRect.bottom;
      
      // Start collapsing from scroll position 0
      config.collapseStartScroll = 0;
      
      // End animation when user is about midway through the hook section
      // This is approximately 1 viewport height worth of scrolling from the title
      config.collapseEndScroll = titleBottomY + window.innerHeight - 1600;
      
      // Store the hook title's bottom position for fixed positioning
      config.hookTitleOffset = titleBottomY;
    } else {
      config.collapseStartScroll = 0;
      config.collapseEndScroll = window.innerHeight * 2;
      config.hookTitleOffset = window.innerHeight;
    }
  }

  function updateEllipse() {
    const scrollY = window.scrollY;
    
    // Calculate progress from 0 to 1 over the scroll range    config.collapseEndScroll = titleBottomY + window.innerHeight * 0.5;
    const progress = Math.max(0, Math.min(1, 
      (scrollY - config.collapseStartScroll) / 
      (config.collapseEndScroll - config.collapseStartScroll)
    ));
    
    // Interpolate width from maxWidth to minWidth
    const currentWidth = config.maxWidth - (config.maxWidth - config.minWidth) * progress;
    
    // Calculate the Y position: keep it at the hook title + a fixed offset
    const hookTitleBottomY = config.hookTitleOffset - window.scrollY;
    const ellipseY = hookTitleBottomY + 30; // 30px below the title
    
    // Only show ellipse while we're before/during the animation
    if (scrollY <= config.collapseEndScroll + window.innerHeight) {
      svg.style.opacity = 1;
    } else {
      svg.style.opacity = 0;
      svg.style.pointerEvents = 'none';
    }
    
    // Create TicTac shape: rounded rectangle with straight sides
    const radius = config.minHeight / 2; // Corner radius
    const halfHeight = config.minHeight / 2;
    
    const left = (window.innerWidth - currentWidth) / 2;
    const right = left + currentWidth;
    const top = hookTitleBottomY + 30 - halfHeight;
    const bottom = hookTitleBottomY + 30 + halfHeight;
    
    // Build path: M = move, L = line, Q = quadratic curve
    const pathData = [
      `M ${left + radius} ${top}`,                    // Start at top-left curve
      `L ${right - radius} ${top}`,                   // Top line
      `Q ${right} ${top} ${right} ${top + radius}`,   // Top-right curve
      `L ${right} ${bottom - radius}`,                // Right line
      `Q ${right} ${bottom} ${right - radius} ${bottom}`, // Bottom-right curve
      `L ${left + radius} ${bottom}`,                 // Bottom line
      `Q ${left} ${bottom} ${left} ${bottom - radius}`, // Bottom-left curve
      `L ${left} ${top + radius}`,                    // Left line
      `Q ${left} ${top} ${left + radius} ${top}`,     // Top-left curve
      'Z'                                              // Close path
    ].join(' ');
    
    path.setAttribute('d', pathData);
  }

  function handleResize() {
    initConfig();
    updateEllipse();
  }

  function handleScroll() {
    updateEllipse();
  }

  // Initialize
  window.addEventListener('load', handleResize);
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial setup
  setTimeout(initConfig, 100);
  updateEllipse();
})();

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

  // Update on scroll
  window.addEventListener('scroll', updateFocusState, { passive: true });
  
  // Initial state
  updateFocusState();
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
