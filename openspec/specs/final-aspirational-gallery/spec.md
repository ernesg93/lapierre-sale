# final-aspirational-gallery Specification

## Purpose

Define the closing gallery contract for the landing page so visual inspection increases desire without replacing the hero as the main explainer.

## Requirements

### Requirement: Gallery placement and narrative role MUST stay secondary

The system MUST render the gallery after `FAQ` and before `Footer`, and SHALL keep it as a concise aspirational closer rather than a second technical explainer.

#### Scenario: Gallery appears in the approved closing position

- GIVEN the landing page is rendered
- WHEN the closing sequence is inspected
- THEN the gallery appears after `FAQ` and before `Footer`

#### Scenario: Gallery does not compete with the hero

- GIVEN the gallery section is visible
- WHEN its purpose and copy are reviewed
- THEN it remains a short emotional closer and not a replacement for hero-led product explanation

### Requirement: Gallery copy and image set MUST be curated and capped

The system MUST use the exact approved title and subtitle, and MUST include a gallery-specific image set of at least 1 and at most 8 images.

#### Scenario: Approved copy is rendered exactly

- GIVEN the gallery section is present
- WHEN the section heading and supporting copy are read
- THEN the title is `Una bici así se entiende mejor cuando la mirás de cerca.`
- AND the subtitle is `Deslizá, abrí las fotos y terminá de verla como corresponde.`

#### Scenario: Image count stays within the allowed cap

- GIVEN the gallery asset set is configured
- WHEN the gallery is rendered
- THEN no more than 8 gallery images are shown

### Requirement: Gallery browsing MUST be restrained and image-led

The system MUST support swipe browsing and tap-to-enlarge only, MUST snap per image, and MUST NOT expose visible arrows, per-image captions, autoplay, or infinite looping.

#### Scenario: Swipe browsing snaps one image at a time

- GIVEN the user browses the gallery strip
- WHEN the user swipes horizontally
- THEN the carousel snaps to a single image position

#### Scenario: Disallowed gallery behaviors are absent

- GIVEN the gallery is visible
- WHEN the user inspects its controls and motion behavior
- THEN no visible arrows, captions, autoplay, or infinite loop behavior are present

### Requirement: Mixed aspect ratio images MUST preserve the intended viewing contract

The system MUST present horizontal and vertical gallery images inside a consistent carousel frame, and MUST preserve each image's real aspect ratio inside the lightbox while showing photo-only content.

#### Scenario: Carousel frame remains visually consistent across mixed assets

- GIVEN the gallery contains one horizontal primary image and vertical supporting images
- WHEN the user browses the carousel
- THEN each slide uses a consistent visual frame despite mixed source orientations

#### Scenario: Lightbox preserves real image proportions

- GIVEN the user opens a gallery image in the lightbox
- WHEN horizontal or vertical assets are viewed enlarged
- THEN the displayed image keeps its real aspect ratio
- AND no per-image caption is shown

### Requirement: Lightbox dismissal MUST be simple and operable

The system MUST allow lightbox dismissal by tapping outside the image, activating a close button, or pressing `Escape`.

#### Scenario: Pointer users can dismiss without navigation chrome

- GIVEN the lightbox is open
- WHEN the user taps outside the photo or activates the close button
- THEN the lightbox closes

#### Scenario: Keyboard users can dismiss with Escape

- GIVEN the lightbox is open and keyboard focus is within it
- WHEN the user presses `Escape`
- THEN the lightbox closes
