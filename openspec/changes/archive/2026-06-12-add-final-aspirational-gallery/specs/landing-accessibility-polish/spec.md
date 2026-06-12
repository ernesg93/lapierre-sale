# Delta for landing-accessibility-polish

## ADDED Requirements

### Requirement: Gallery lightbox MUST preserve focus visibility and dismissal recovery

The system MUST expose visible keyboard focus for gallery triggers and lightbox controls, MUST move focus into the lightbox when it opens, and MUST return focus to the invoking gallery item when the lightbox closes.

#### Scenario: Gallery trigger has visible keyboard focus

- GIVEN a keyboard-only user tabs into the gallery
- WHEN a gallery image trigger receives focus
- THEN the focused trigger shows a visible focus indicator against its local background

#### Scenario: Lightbox opening moves focus to an operable control

- GIVEN a keyboard user opens a gallery image
- WHEN the lightbox appears
- THEN focus lands on a visible control inside the lightbox
- AND keyboard dismissal remains operable with `Escape`

#### Scenario: Dismissal returns focus to the invoking image

- GIVEN the user closes the lightbox by outside tap, close button, or `Escape`
- WHEN the overlay is dismissed
- THEN focus returns to the gallery item that opened it

## MODIFIED Requirements

### Requirement: Interactive controls MUST expose consistent visible focus

The system MUST provide a consistent `focus-visible` indicator for primary interactive controls in header navigation, key CTA controls, FAQ toggle controls, gallery image triggers, and the lightbox close control.

(Previously: Applied only to header navigation, key CTA controls, and FAQ toggle controls.)

#### Scenario: Keyboard focus is visibly perceivable on key controls

- GIVEN a keyboard-only user tabs through header links, primary CTA controls, FAQ toggles, gallery image triggers, and the lightbox close control
- WHEN each control receives keyboard focus
- THEN each focused control shows a visible focus style with sufficient contrast against its local background

#### Scenario: Hidden CTA states do not trap or receive keyboard focus

- GIVEN a CTA is visually hidden as part of scroll or animation state
- WHEN the user navigates with keyboard
- THEN the hidden CTA is not reachable by Tab
- AND focus order continues to the next visible interactive element

### Requirement: Reduced-motion preference MUST preserve functional experience

The system MUST provide a reduced-motion branch for scrollytelling-related motion so users with `prefers-reduced-motion: reduce` can access the same content and calls to action without depending on heavy animated transitions, autoplay, or looping motion, including within the final aspirational gallery.

(Previously: Covered scrollytelling-related motion only.)

#### Scenario: Reduced-motion users access core content and CTA

- GIVEN the user preference is `prefers-reduced-motion: reduce`
- WHEN the landing scrollytelling area is rendered
- THEN core narrative content and at least one CTA remain accessible and operable
- AND interaction does not require high-amplitude continuous motion to progress

#### Scenario: Gallery remains restrained for reduced-motion users

- GIVEN the user preference is `prefers-reduced-motion: reduce`
- WHEN the final gallery and lightbox are used
- THEN image browsing and enlargement remain fully operable
- AND the experience does not depend on autoplay, infinite looping, or motion-heavy dismissal
