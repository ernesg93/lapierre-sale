# Delta for CameraScroll

## MODIFIED Requirements

### Requirement: Content Rendering
Once loading progress reaches 100%, the system MUST render the `CameraScrollContent`. The scrollytelling sequence MUST be responsive to different screen aspect ratios. 
- On desktop (landscape), the bike image MUST be centered.
- On mobile (portrait), the bike image MUST be offset downwards by ~15-20% to leave space for narrative text at the top.
- Narrative overlays MUST be positioned to avoid overlapping with the bike frame on mobile.
(Previously: Content Rendering was centered regardless of aspect ratio, causing overlap on mobile.)

#### Scenario: Desktop Rendering
- GIVEN loading is complete (100%)
- AND the screen is in landscape orientation
- THEN the bike image MUST be centered vertically in the canvas.
- AND narrative overlays MUST be centered in the viewport.

#### Scenario: Mobile Rendering
- GIVEN loading is complete (100%)
- AND the screen is in portrait orientation (mobile)
- THEN the bike image MUST be drawn with a vertical offset shifting it downwards.
- AND narrative overlays MUST be aligned to the top (`justify-start`) of the screen.

#### Scenario: Narrative Visibility Sequence
- GIVEN loading is complete (100%)
- WHEN scroll progress is between 0% and 15%
- THEN the overlay "Lapierre Híbrida Carbono" MUST be visible.
- WHEN scroll progress is between 25% and 45%
- THEN the tech summary overlay MUST be visible.
- WHEN scroll progress is between 55% and 75%
- THEN the maintenance info overlay MUST be visible.
- WHEN scroll progress is between 85% and 100%
- THEN the CTA (WhatsApp) overlay MUST be visible.
