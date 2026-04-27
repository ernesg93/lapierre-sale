# Delta for contact-channel-config

## MODIFIED Requirements

### Requirement: WhatsApp CTAs MUST use centralized configuration

The system MUST build WhatsApp URLs for relevant CTAs from centralized site configuration, MUST compose purchase prefilled messages from `siteConfig.sale`, and MUST NOT hardcode duplicate phone/base URL or product-identity literals in CTA components.
(Previously: WhatsApp CTAs used centralized channel data, but purchase-message composition did not explicitly require centralized commercial content.)

#### Scenario: Footer CTA uses centralized WhatsApp source

- GIVEN site contact configuration defines the WhatsApp channel
- WHEN the Footer CTA is rendered
- THEN its link is derived from the centralized WhatsApp source
- AND no component-local WhatsApp number/base URL literal is required

#### Scenario: Purchase CTA supports dynamic prefilled message with centralized channel

- GIVEN a purchase CTA needs a dynamic prefilled message
- WHEN the CTA URL is generated
- THEN the message parameter is composed dynamically from `siteConfig.sale`
- AND the channel base (phone/base URL) still comes from the centralized WhatsApp source

#### Scenario: Purchase configuration tests verify centralized message composition

- GIVEN automated tests cover purchase CTA links
- WHEN message templates or product identity change in `siteConfig.sale`
- THEN tests SHALL validate generated URLs via centralized builders/config
