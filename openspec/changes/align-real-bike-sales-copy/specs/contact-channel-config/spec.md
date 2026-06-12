# Delta for contact-channel-config

## MODIFIED Requirements

### Requirement: WhatsApp CTAs MUST use centralized configuration

The system MUST build WhatsApp URLs for relevant CTAs from centralized site configuration and MUST NOT hardcode duplicate phone or base URL literals in CTA components.

#### Scenario: Footer CTA uses centralized WhatsApp source

- GIVEN site contact configuration defines the WhatsApp channel
- WHEN the Footer CTA is rendered
- THEN its link is derived from the centralized WhatsApp source
- AND no component-local WhatsApp number/base URL literal is required

#### Scenario: Purchase CTA supports dynamic prefilled message with centralized channel

- GIVEN a purchase CTA needs a dynamic prefilled message
- WHEN the CTA URL is generated
- THEN the message parameter is composed dynamically for one bicycle only
- AND the channel base still comes from the centralized WhatsApp source
- AND the prefilled message MUST NOT include price text

## ADDED Requirements

### Requirement: Prefilled WhatsApp copy MUST stay within canonical sales claims

The system MUST keep prefilled WhatsApp copy aligned with the active single-bike offer and MUST NOT include bundle language or unsupported condition claims.

#### Scenario: Prefilled message stays factual and concise

- GIVEN the user opens a WhatsApp CTA
- WHEN the prefilled text is generated
- THEN it references the single Lapierre Pro Race offer concisely
- AND it omits unsupported or exaggerated claims
