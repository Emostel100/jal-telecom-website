# JAL TELECOM — Connecting the future

A custom, responsive English corporate website for a telecommunications company in Luanda, Angola. Built with semantic HTML, modern CSS and small progressive JavaScript enhancements. No runtime framework or package dependencies.

**Live client preview:** https://jal-telecom-preview.scenichippo.chatgpt.site

**Source:** https://github.com/Emostel100/jal-telecom-website

## Run locally

Requires Node.js 20 or later.

```sh
node build.mjs
node check.mjs
node server.mjs
```

Open `http://127.0.0.1:4173/dist/` for the website or `http://127.0.0.1:4173/design.html` for the initial visual concept.

## What is included

- Original visual concept and design rationale in `design.html` and `DESIGN.md`
- English homepage with three dissolving hero scenes, pause and manual controls
- About page with supplied leadership names
- Seven detailed service pages and a service overview
- Interactive infrastructure illustration
- Filterable field photo gallery with keyboard-accessible native dialog viewer
- Contact page with validated enquiry preparation, email, WhatsApp and copy actions
- Responsive navigation, reduced motion, keyboard focus and static content fallback
- Page metadata, social sharing metadata, structured organisation data, sitemap and 404
- No analytics, advertising cookies, embedded maps or enquiry storage

## Source structure

`content.mjs` contains company details, service descriptions and photo captions. `build.mjs` generates the static pages. `styles.css` defines the design system and layouts. `app.js` adds interactions. `dist/assets/` holds website assets. The complete deployment output is `dist/`.

## Contact behaviour

The form prepares a message locally. It does not send email or claim successful delivery. Visitors review the prepared enquiry and complete sending in their email or WhatsApp application. No credentials or backend service is needed for this MVP. A server-side form service can be introduced later with an appropriate privacy notice and spam protection.

## Content and imagery

Contact details, leadership names, brand colours and supplied photographs came from the project brief. Service categories came from the supplied branding sheet. Service descriptions are draft copy for business review. No unverified customer logos, statistics, testimonials, accreditations or project outcomes are included. Field photographs do not establish a named project contract or endorsement.

The cinematic hero is an original AI-created conceptual illustration made with the built-in ImageGen tool. It is not a JAL project photograph. The supplied branding sheet is displayed through a CSS viewport for the header logo; a clean transparent SVG/PNG from the company should replace it later. The favicon is an interim code-drawn J motif.

The company's photographs and branding remain the property of their respective rights holders. Do not reuse them as an open-source asset library. This portfolio implementation does not grant third-party branding or photo rights.

## Client preview and production launch

The preview intentionally includes `noindex, nofollow` and a disallow-all `robots.txt`. Before the final company launch:

1. Confirm all service wording, address spelling, leadership details and image permissions with the client.
2. Replace the logo sheet with a clean approved logo asset and confirm the favicon.
3. Set `SITE_ORIGIN` to the final domain, remove preview indexing restrictions and rebuild.
4. Configure hosting to serve `dist/` and use `404.html` for missing pages.
5. Verify the company's existing email DNS and mail-client settings before changing any website DNS. Preserve the existing email service.
6. Review the privacy notice against the final hosting, enquiry and analytics configuration.
7. Add professionally reviewed Portuguese content as a separate locale and introduce the language switch only when it works.

## Hostinger deployment

This is a portable static website. Upload the contents of `dist/` to the selected website document root after the hosting and DNS arrangement is confirmed. No Node.js server is needed in production. Do not upload the source helper configuration or change the existing email configuration as part of a routine static upload.

## Portfolio focus

The work demonstrates original visual direction, brand interpretation, information architecture, responsive frontend implementation, accessible interactions, progressive enhancement, content modelling and static delivery. The portfolio should describe the work as a preview/MVP until the company approves the content and launches the final site.
