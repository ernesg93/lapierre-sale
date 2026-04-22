# Design: FAQ Tests

**Change**: faq-tests

## Implementation Strategy
- **Framework**: Vitest + React Testing Library (RTL).
- **Environment**: JSDOM.

### Test Cases
1. **Initial state**: Verify that questions are present using `screen.getByText`. Verify that answer containers have the `grid-rows-[0fr]` class (since `toBeVisible` might not detect the grid trick).
2. **Toggle event**: Use `fireEvent.click` on the question button. Verify the container changes to `grid-rows-[1fr]`.
3. **Exclusive state**: Click one, verify open. Click another, verify first is closed and second is open.

## File Changes
- `components/__tests__/FAQ.test.tsx` [NEW]
