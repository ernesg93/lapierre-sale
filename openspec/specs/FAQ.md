# Specification: FAQ Component

**Change**: faq-tests

## Requirements
- The component MUST render a list of questions provided in the `faqs` constant.
- Initially, all answers MUST be hidden.
- Clicking a question MUST show its corresponding answer.
- Clicking the same question again MUST hide the answer.
- Clicking a different question while one is open MUST show the new answer and hide the previous one (exclusive toggle).

## Scenarios

### Scenario 1: Initial Render
**Given** the FAQ component is rendered
**Then** it MUST show 3 questions
**And** it MUST show the title "Preguntas Frecuentes"
**And** all answers MUST be hidden (collapsed)

### Scenario 2: Toggle Answer
**Given** the FAQ component is rendered
**When** the user clicks the first question
**Then** the first answer MUST be visible
**And** the icon MUST rotate 180 degrees

### Scenario 3: Exclusive Toggle
**Given** the first FAQ answer is open
**When** the user clicks the second question
**Then** the second answer MUST be visible
**And** the first answer MUST be hidden
