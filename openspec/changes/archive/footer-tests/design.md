# Design: Footer Tests

**Change**: footer-tests

## Implementation Strategy
- Use RTL `render` and `screen`.
- Verify links via `screen.getAllByRole('link')` and check `href`.
- Verify buttons via `screen.getByRole('button')`.

## File Changes
- `components/__tests__/Footer.test.tsx`
