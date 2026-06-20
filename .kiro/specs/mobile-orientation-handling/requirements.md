# Requirements: Mobile Orientation Handling

## Overview
Ensure the mobile UI provides a consistent, functional experience when users rotate their device between portrait and landscape orientations.

## Feature Name
`mobile-orientation-handling`

## User Stories

### 1. Portrait to Landscape Rotation
**As a** mobile user  
**I want** the UI to adapt gracefully when I rotate my phone to landscape  
**So that** I can continue browsing without layout breaking or content being cut off

**Acceptance Criteria:**
1.1. Hero section maintains readable content in landscape  
1.2. Mobile menu remains functional and properly sized in landscape  
1.3. Navbar doesn't overlap content in landscape  
1.4. All sections remain scrollable without horizontal overflow  
1.5. Typography scales appropriately for landscape viewport

### 2. Landscape to Portrait Rotation
**As a** mobile user  
**I want** the UI to restore to full portrait layout when I rotate back  
**So that** I get the optimal vertical reading experience

**Acceptance Criteria:**
2.1. All sections return to intended portrait layout  
2.2. Mobile menu clip-path animation works correctly  
2.3. Hero shapes and peep illustration position correctly  
2.4. No visual artifacts or layout jumps during rotation

### 3. Short Landscape Devices
**As a** user on a device with short landscape height (<500px)  
**I want** content to remain accessible without excessive scrolling  
**So that** I don't miss important information

**Acceptance Criteria:**
3.1. Hero section uses `auto` height instead of fixed vh  
3.2. Content padding reduces to fit more in viewport  
3.3. Font sizes remain legible  
3.4. CTA buttons remain visible and tappable

### 4. Mobile Menu in Landscape
**As a** mobile user with menu open  
**I want** the menu to adapt when I rotate to landscape  
**So that** all navigation links remain visible and accessible

**Acceptance Criteria:**
4.1. Menu links remain visible (no overflow)  
4.2. Font sizes adjust if needed for landscape  
4.3. Clip-path animation center point adjusts properly  
4.4. Spacing between links adjusts to fit shorter height

## Technical Constraints
- Must work on iOS Safari, Chrome Android
- Support devices with height 320px - 1024px in landscape
- Maintain 60fps during rotation animation
- No JavaScript required for layout adaptation (CSS only)

## Non-Functional Requirements
- Performance: Layout reflow must complete within 300ms
- Accessibility: Focus states must persist through rotation
- Browser Support: iOS 12+, Android Chrome 80+

## Out of Scope
- Tablet-specific optimizations (768px+)
- Desktop rotation handling
- Auto-rotation detection/forcing
