# Delta for landing-section-navigation

## MODIFIED Requirements

### Requirement: FAQ anchor target MUST exist

The system MUST expose a stable FAQ section target so that header navigation to `#faq` resolves within the landing page, and related tests/docs MUST preserve this contract without contradictory API claims.
(Previously: Requirement only enforced anchor existence and uniqueness, without explicit consistency guard across tests/docs.)

#### Scenario: Header FAQ link reaches FAQ section

- GIVEN a user is on the landing page
- WHEN the user activates the header link to `#faq`
- THEN the browser location hash is `#faq`
- AND a visible FAQ section with anchor target `faq` is present in the DOM

#### Scenario: No broken anchor for FAQ

- GIVEN the landing is rendered
- WHEN navigation metadata includes a FAQ anchor link
- THEN the page MUST include exactly one matching anchor destination for `faq`

#### Scenario: FAQ contract remains consistent across docs and tests

- GIVEN docs/specs/tests reference FAQ navigation behavior
- WHEN maintainers validate the change artifacts
- THEN no artifact contradicts the `#faq` destination contract
