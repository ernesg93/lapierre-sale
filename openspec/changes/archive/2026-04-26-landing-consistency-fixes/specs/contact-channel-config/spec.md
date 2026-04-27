# contact-channel-config Specification

## Purpose

Asegurar una sola fuente de verdad para WhatsApp en CTAs relevantes de la landing.

## Requirements

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
- THEN the message parameter is composed dynamically
- AND the channel base (phone/base URL) still comes from the centralized WhatsApp source
