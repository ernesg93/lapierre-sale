# Design: Technical Sections Tests

**Change**: technical-sections-tests

## Implementation Strategy
- Use RTL `render` and `screen`.
- Focus on `getByText` for static content.
- Use `container.querySelector` or `role` check if needed for specific iconography containers.

## File Changes
- `components/__tests__/TechSpecs.test.tsx`
- `components/__tests__/TrustSection.test.tsx`
