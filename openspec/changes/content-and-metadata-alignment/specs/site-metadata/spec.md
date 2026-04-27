# Delta for site-metadata

## ADDED Requirements

### Requirement: SEO/OG metadata MUST align with centralized commercial identity

The system MUST derive SEO, Open Graph, and Twitter identity fields from `siteConfig.sale` so metadata cannot diverge from landing commercial content.

#### Scenario: Metadata uses centralized title and description

- GIVEN `siteConfig.sale` defines commercial title and description
- WHEN root metadata is generated
- THEN metadata title/description for SEO, Open Graph, and Twitter SHALL match centralized values

#### Scenario: OG identity stays aligned with landing product identity

- GIVEN `siteConfig.sale` defines product identity and OG image
- WHEN Open Graph metadata is emitted
- THEN `siteName`, image alt, and image URL MUST come from centralized identity fields

#### Scenario: Metadata tests verify centralized alignment

- GIVEN tests cover metadata generation
- WHEN title/description/OG identity change only in `siteConfig.sale`
- THEN tests SHALL assert metadata outputs derived from centralized values
