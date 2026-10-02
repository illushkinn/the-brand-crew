/**
 * Custom Cursor Ball — Smooth Follow + Hover Interactions
 *
 * Features:
 * - Smooth elastic lag effect (lerp interpolation)
 * - Grows + changes color on hover over clickable elements
 * - Desktop only (pointer: fine media query)
 * - Performance optimized with RAF
 */

// Only run on desktop (devices with fine pointer control)
if (window.matchMedia('(pointer: fine)').matches) {
  // Cursor element
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Mouse position tracking
  let mouseX = 0;
  let mouseY = 0;

  // Current cursor position (with lag)
  let cursorX = 0;
  let cursorY = 0;

  // Hover state
  let isHovering = false;

  // Lerp factor (0-1) — controls the smoothness/lag
  // Lower = more lag, Higher = faster follow
  const LERP_FACTOR = 0.15;

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Detect hover on clickable elements
  const updateHoverState = () => {
    const hoveredElement = document.elementFromPoint(mouseX, mouseY);

    // Check if element is clickable
    const isClickable = hoveredElement && (
      hoveredElement.tagName === 'A' ||
      hoveredElement.tagName === 'BUTTON' ||
      hoveredElement.classList.contains('btn') ||
      hoveredElement.classList.contains('hamburger') ||
      hoveredElement.classList.contains('lang-btn') ||
      hoveredElement.closest('a') ||
      hoveredElement.closest('button') ||
      hoveredElement.style.cursor === 'pointer' ||
      window.getComputedStyle(hoveredElement).cursor === 'pointer'
    );

    if (isClickable !== isHovering) {
      isHovering = isClickable;
      cursor.classList.toggle('is-hovering', isHovering);
    }
  };

  // Animation loop with lerp (linear interpolation)
  const animate = () => {
    // Smooth follow with elastic lag
    cursorX += (mouseX - cursorX) * LERP_FACTOR;
    cursorY += (mouseY - cursorY) * LERP_FACTOR;

    // Update cursor position
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Check hover state
    updateHoverState();

    // Next frame
    requestAnimationFrame(animate);
  };

  // Start animation loop
  animate();

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}
