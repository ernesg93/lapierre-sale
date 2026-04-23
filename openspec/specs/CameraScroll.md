# Specification: CameraScroll

**Change**: camera-scroll-tests

## Requirements

### Asset Loading
- The component MUST fetch `/frames/manifest.json` on mount.
- If the manifest fetch fails, it MUST show an "Aviso del Sistema" error message.
- Images MUST be loaded in batches (as per ARCHITECTURE.md).

### Loading Progress
- While images are loading, it MUST show a progress bar.
- The progress text MUST update as images load (e.g., "Preparando experiencia... X%").

### Content Rendering
- Once progress reaches 100%, it MUST render the `CameraScrollContent`.
- The scrollytelling sequence MUST be responsive to different screen aspect ratios.
- On desktop (landscape), the bike image MUST be centered.
- On mobile (portrait), the bike image MUST be offset downwards by ~15-20% to leave space for narrative text at the top.
- Narrative overlays MUST be positioned to avoid overlapping with the bike frame on mobile.
- Overlays (Narrative blocks) MUST be visible at specific scroll points:
    - 0-15%: "Lapierre Híbrida Carbono"
    - 25-45%: Tech summary (Cuadro carbono, etc.)
    - 55-75%: Maintenance info.
    - 85-100%: CTA (Contactar por WhatsApp).

## Scenarios

### Scenario 1: Manifest Error
**Given** the manifest fetch returns a 404
**Then** it MUST show "Falta generar el manifest de imágenes"

### Scenario 2: Loading Progress
**Given** the manifest is loaded with 10 frames
**When** 5 images are loaded
**Then** it MUST show "50%" progress

### Scenario 3: Initial Overlay
**Given** loading is complete (100%)
**And** scroll progress is 0.05 (5%)
**Then** the first overlay "Lapierre Híbrida Carbono" MUST be visible

### Scenario 4: Mobile Framing
**Given** loading is complete (100%)
**And** the screen is in portrait orientation (mobile)
**Then** the bike image MUST be drawn with a vertical offset shifting it downwards.
**And** narrative overlays MUST be aligned to the top (`justify-start`) of the screen.
