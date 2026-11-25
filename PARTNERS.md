Partner carousel

`content.mjs` exports `partnerBrands`. Add each future logo once to that array with its name, asset filename and optional card class. Place the optimised asset under `assets-updated/` and run `node build.mjs`. Both homepage and About pages, in English and Portuguese, use the same list.

The carousel shows one complete card through 720px and two above 720px. Its scroll-snap track supports touch scrolling without JavaScript. JavaScript adds wrapping previous/next controls, keyboard arrows, position buttons and a two-second rotation interval. The pause button alone changes the visitor's paused state: hover, focus and manual navigation do not pause rotation. Background tabs suspend their timer and resume when visible. A 160ms fade-out leads into a 440ms fade-and-slide entrance, with a two-second progress line anticipating the next group. Reduced/global motion settings remove the transition and progress animation while preserving the selected autoplay state. Status announcements occur only on manual navigation.

The current partner list is Nokia, Africell and Digis². The Digis restoration master and prompt notes are under `logo-restoration/`; the production WebP is approximately 35 KB.
