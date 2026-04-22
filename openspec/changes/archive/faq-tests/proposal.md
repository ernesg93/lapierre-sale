# Proposal: Implement FAQ Tests

**ID**: faq-tests
**Status**: proposed
**Intent**: Ensure the FAQ component renders correctly and the interactive toggle functionality works as expected.

## Scope
- New test file: `components/__tests__/FAQ.test.tsx`
- No changes to existing source code (unless bugs are found during testing).

## Approach
- Use Vitest and React Testing Library.
- Test initial render, single toggle, and exclusive toggle (only one FAQ open at a time).

## Risks
- CSS-based transitions (`grid-rows-[0fr]`) might be tricky to test for visibility with JSDOM; will focus on presence and class changes.
