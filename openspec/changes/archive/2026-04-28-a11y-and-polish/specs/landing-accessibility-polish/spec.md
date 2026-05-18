# landing-accessibility-polish Specification

## Purpose

Definir mínimos verificables de accesibilidad para foco visible, salto al contenido principal y reducción básica de movimiento en la landing.

## Requirements

### Requirement: Interactive controls MUST expose consistent visible focus

The system MUST provide a consistent `focus-visible` indicator for primary interactive controls in header navigation, key CTA controls, and FAQ toggle controls.

#### Scenario: Keyboard focus is visibly perceivable on key controls

- GIVEN a keyboard-only user tabs through header links, primary CTA controls, and FAQ toggles
- WHEN each control receives keyboard focus
- THEN each focused control shows a visible focus style with sufficient contrast against its local background

#### Scenario: Hidden CTA states do not trap or receive keyboard focus

- GIVEN a CTA is visually hidden as part of scroll or animation state
- WHEN the user navigates with keyboard
- THEN the hidden CTA is not reachable by Tab
- AND focus order continues to the next visible interactive element

### Requirement: Skip link MUST provide direct keyboard access to main content

The system MUST expose a skip link as the first keyboard-focusable control that moves the user directly to the main content landmark.

#### Scenario: Skip link moves focus to main content

- GIVEN the landing page is loaded
- WHEN the user presses Tab from the browser chrome and activates the skip link
- THEN focus lands on the main content landmark target
- AND the user can continue tabbing through main-content controls in natural order

### Requirement: Reduced-motion preference MUST preserve functional experience

The system MUST provide a reduced-motion branch for scrollytelling-related motion so users with `prefers-reduced-motion: reduce` can access the same content and calls to action without depending on heavy animated transitions.

#### Scenario: Reduced-motion users access core content and CTA

- GIVEN the user preference is `prefers-reduced-motion: reduce`
- WHEN the landing scrollytelling area is rendered
- THEN core narrative content and at least one CTA remain accessible and operable
- AND interaction does not require high-amplitude continuous motion to progress
