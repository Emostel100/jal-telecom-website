# MVP verification — 6 November 2026

## Passed

- Static generation: 13 English content pages and a 404 page.
- Structural checks: 14 HTML files, 509 local references, linked anchors, unique IDs, image alternative attributes, page descriptions, main landmarks, one H1 per page and parseable structured data.
- JavaScript syntax validation.
- DOM interaction checks using jsdom 30.1.3: reduced-motion hero starts paused; manual scene selection; connection explorer; mobile navigation open/close and Escape; gallery filters/counts; photograph open/close handlers; form required fields; selected service query; encoded email and WhatsApp message generation; clipboard action; invalid service query fallback.
- No messages were sent during testing.
- Initial Sites deployment succeeded and public client-preview access was confirmed by the hosting API.
- The host-generated 1200 × 750 desktop screenshot was inspected. Header, logo presentation, typography, hero image, contrast and primary actions render coherently.
- Hero re-encoding reduced the asset from 2,048,778 bytes (PNG) to 202,950 bytes (WebP), about 90% smaller. The composition was unchanged.

## Verification limits

Browser automation stopped because it could not confidently determine the active Windows browser URL. No further browser automation was used in that turn. Native browser dialog behaviour, real mobile rendering, keyboard navigation in a live browser, network performance and the final handoff into installed email/WhatsApp apps were not end-to-end tested. DOM tests verify interaction logic; they do not verify layout or replace browser accessibility testing. The host screenshot covers the first desktop viewport, not the whole website.

## Before the final company launch

- Client review of drafted services, exact address spelling, image usage and leadership details.
- Supply a clean approved logo asset; the MVP header uses the logo area of the supplied brand sheet.
- Confirm project-specific claims and case-study content before adding them.
- Review real desktop/mobile layouts and contact app handoff on target devices.
- Confirm the final production domain and preserve existing email DNS before connecting it.
- Update canonical URLs and indexing rules for the approved public launch.
- Prepare and review Portuguese content before introducing a working language switch.
