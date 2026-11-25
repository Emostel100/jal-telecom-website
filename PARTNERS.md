Partner carousel

`content.mjs` exports `partnerBrands`. Add each future logo once to that array with its name, asset filename and optional card class. Place the optimised asset under `assets-updated/` and run `node build.mjs`. Both homepage and About pages, in English and Portuguese, use the same list.

The carousel shows one complete card through 720px and two above 720px. Its scroll-snap track supports touch scrolling without JavaScript. JavaScript adds wrapping previous/next controls, keyboard arrows, position buttons and a 5.5-second rotation interval. Rotation pauses outside the viewport, while the tab is hidden, on hover/focus, and after manual navigation. The pause control and global/reduced-motion settings are respected. Status announcements occur only on manual navigation.

The current partner list is Nokia, Africell and Digis². The Digis restoration master and prompt notes are under `logo-restoration/`; the production WebP is approximately 35 KB.
