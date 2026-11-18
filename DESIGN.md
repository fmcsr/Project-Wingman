# Project Wingman — Design decisions

Last updated: 2026-10-28 · Status: Applied to the landing page

## Decisions

| Topic | Decision | Why |
| --- | --- | --- |
| Product name | Project Wingman | One name across the UI, the repo and the docs. |
| Language | English | A paid product with an international audience. Developer docs (this file, the README, code comments) are in English too. |
| Theme | Light and dark. Defaults to the system setting; the header toggle picks one and remembers it | Tokens are defined once with `light-dark()`; the toggle overrides `color-scheme` through `<html data-theme>`. The choice is kept in `localStorage`, and a tiny script in `index.html` applies it before the first paint. |
| Visual direction | **Signal**: LayerZero's gray simplicity in light mode, Stargate's depth in dark mode | The two references share a language (neutral base, one accent, flat surfaces) that fits the light/dark pair. |
| Accent color | One color, signal green, **only for learning moments** | Inspection outline, name tag, term chips, focus ring. Not used anywhere else. |
| Typography | Roboto + Roboto Mono, the same as LayerZero | LayerZero's typefaces; both are open source (OFL). Self-hosted via Fontsource. Heading and label metrics are taken from LayerZero too. |
| Signature visual | LayerZero's hero line art (`src/brand/HorizonLines.tsx`): every line is a circle that touches the horizon at the centre point, so from the sides they look like rays converging and flattening into one line; the whole field drifts slowly upward. Every so often a shooting star passes: 2–5 beams come in along different lines on the left and meet at the centre point, and the merged beam leaves along another line on the right | The geometry, spacing, opacity and speed were measured from LayerZero's canvas. One deliberate change: on wide screens their outer lines (the wings) faded too soon and the hero looked bland on landscape screens, so ours stay stronger further out. The metaphor: scattered ideas meet in one clear term and open up again from there. The shooting star (our own addition) animates that meeting. |
| Logo | Two square brackets facing each other, empty inside, next to the name (`src/brand/BrandMark.tsx`); the favicon is the same mark | The site's `[ ]` label motif (as in `[ PROJECT WINGMAN ]`) made into a mark. Square ends and corners like the bracket glyphs, drawn on whole pixels so it stays crisp. |
| Example interfaces | The examples follow the site theme; products that are dark by design (a full-screen video feed, a swipe deck, a media player) stay dark in both | Bright examples on a dark page felt off, and real products ship a dark mode too. Every example color is a `light-dark()` pair (Wave uses iOS's own light and dark system colors), and the balloons show color values for the theme in use, so what they explain always matches what's on screen. |
| Inspection model | Like “Inspect element” in browser developer tools | Nearly every element can explain itself, and adding a new one takes a single `data-inspect` attribute. |
| Pages and routing | `/` landing page, `/sign-in`, `/sign-up`, `/app` (signed-in workspace). A tiny router on the History API instead of a library | Four routes don't justify a dependency; links stay real `<a href>` elements, so opening in a new tab works. |
| Auth | No backend yet. The session lives in `localStorage`; the sign-in functions already have the shape a real provider will need | The pages won't change when a provider (Supabase, Firebase, Clerk…) is connected. Until then, a development-only account opens the workspace. |
| Brief | The elements a user picks become Markdown for AI coding tools, put together from the element descriptions; no LLM yet. Kept in `localStorage` | The descriptions already hold the terms, values and behaviors a coding tool needs, so the brief works today without a backend. Writing it from a plain description (the LLM step) comes later. |
| Scrolling in the example sites | No scrolling inside the frames. As on Apple's product pages, the window pins and page scrolling scrolls the site inside it | Nested scrolling (a window that scrolls inside the page) trapped the cursor and made the page harder to use. |

## Page structure (information architecture)

```
Header        Logo · Examples · Features · Support ········ Theme · Sign in   (sticky)
Hero          [ PROJECT WINGMAN ] · “Every PM needs a wingman.” · See examples / Get started free
[01] Examples Before/after: Acme (marketing) · Orbit (analytics dashboard) · Wave (habits) · Muse (AI) · Stride (shopping)
[02] Features A slowly moving marquee (with a pause button)
[03] Support  A free account · Sponsor on GitHub
Footer        Text links · Back to top
```

Other pages: `/sign-in` and `/sign-up` (the header's Sign in and the free-account buttons lead here) and the signed-in library: `/app/mobile`, `/app/web`, `/app/watch` and one page per example at `/app/<platform>/<id>`, plus the brief at `/app/brief`. Once signed in, Sign in becomes Workspace in the header and the footer. Under the landing page's examples, “Explore the library” leads in.

- **The header isn't a bar, but it's sticky:** Fully transparent at the top of the page; as you scroll down it takes on a borderless frosted-glass background. Links go to sections, the logo goes back to the top, and the link of the section in view gets darker. Sections stop below the header thanks to `scroll-margin-top`.
- **Footer:** Not a bar; text links sitting on the page background.
- **The home page shows only five example projects:** The full library opens after sign-in.
- **Example layout:**
  - Sites (Acme, Orbit): Each in its own scroll scene, full page width, one after another.
    - The window pins below the header. The scene grows by as much as the content overflows, and page scrolling is passed one to one into the window.
    - Users never scroll inside the window. Because the content really scrolls (`overflow: hidden` + `scrollTop`), Acme's sticky glass navbar keeps working.
  - Phones: All three in one row at every width. If they don't fit, they shrink together (`--phone-scale`; ~0.35 on a phone). In a narrow row, each heading keeps only the index and the name.
- **Before/after:** every example is a comparison (`src/showcase/Compare.tsx`), the story of the product in one gesture.
  - The AI slop version a vague prompt produces (`src/demos/slop/`) lies on top of the Wingman version and is cut at a vertical line. Drag the line right and the slop grows; drag it left and the Wingman version grows. It starts in the middle and sways once when it first comes into view (not with reduced motion).
  - The line is white with a soft shadow, so it reads on any content. Its round knob is a slider: arrow keys move it by 5%, Page Up/Down by 20%, Home and End go to the edges. Small "AI slop" and "With Wingman" pills ride on each side of the knob, so they never cover an app's corners, and fade when their side gets narrow.
  - Both sides are inspectable, each as its own example (its own tab stop) with its own descriptions (`src/catalog/slopSites.ts`, `slopPhones.ts`). Slop elements carry the same names as their Wingman counterparts where the element is the same, so the two can be compared, and their concepts say what makes each one read as AI slop. Only the Wingman side counts toward the elements number in the project header. In the sites both versions scroll together, and the line stays put over the window.
  - Above each site (and under each phone), the vague prompt behind its slop side.
- **Support:** Wingman is free with an account (the library and the brief builder); a second card asks people who find it useful to sponsor it on GitHub, one-time or monthly.

## Inspection interaction

| Input | Behavior |
| --- | --- |
| Mouse | On hover, the dashed green outline and the name tag appear at once; after a 2 s dwell, the summary balloon unrolls. Passing over the example only names things; resting on one explains it. While a preview is open, moving to another element updates the balloon without waiting. A click pins the full explanation, which unrolls the same way. |
| Touch | A tap opens the full explanation; tapping another element switches to it; tapping outside closes it, scrolling doesn't. |
| Keyboard | Each example is a single tab stop. Arrow keys and Home/End move between the elements showing (a part a demo has put away for the moment, such as a closed menu, is skipped, as it is on hover), Enter pins, Esc closes. A live region reads the element's name and summary to screen readers. In the sites, if the selected element isn't visible in the window, the page scrolls to where it shows. |

The balloon is narrow in preview (name, summary, term chips) and wide when pinned (everyday names, plain-language explanations of each concept). It opens below the element, or above when there's no room below, and always stays on screen under the sticky page header. A tall balloon that fits on neither side takes the roomier side and scrolls inside; if even that side is short (a tall element in the middle of the screen), it covers part of the element instead, without an arrow. Since it's drawn on a shared layer that covers every frame, it never gets clipped at a frame's edge. It unrolls like a dropdown menu from the edge next to its element, arrow first (460 ms, an even slow-quick-slow ease); a click on a preview unrolls the details again.

The name tag is drawn on the same shared layer, so a phone screen or a browser window never cuts it off: a long name by the edge of a phone runs past the phone and stays readable. It sits above the element, or below it when there's no room above in the visible part of the frame (clipping inside the demo, such as a card's rounded corners, doesn't count). The outline stays inside the frame, around the element, and in the scaled-down phones and windows settling into place it's drawn at the inverse scale so it stays thin.

**Moving parts hold still while inspected.** The landing examples move (see Motion) through `useDemoMotion()` in `src/demos/motion.ts`, one call per moving part:
- Entrances (a chart drawing in, a figure counting up) play once, the first time the part comes into view.
- Ongoing motion (live rows, a carousel, a loop) runs while the part is in view and holds while it's being inspected: while the element under the pointer, or the one whose balloon is open, is in that part. Pointing elsewhere doesn't stop it, so a site keeps moving while the pointer rests on it during a scroll, and the outline and the balloon never sit on something that moves.
- With reduced motion, and in the library's still site previews, the demos show their finished state.

Older library demos use `useInspectActivity()`, which holds the whole example: Chatter's typing dots and Flick's spinning sound disc stop while the pointer is over the example, keyboard focus is inside it or a balloon is open. Muse uses it to open its model menu when the pointer reaches the model name; the menu stays open until the inspection ends, so it can be inspected too.

## Library

- **Three tabs, Mobile, Web and Watch,** in a pill-shaped segmented control with the count of examples. Like a pattern gallery (Mobbin): category chips, and a search that matches names, inspirations and every element's name, aliases and terms (“bottom sheet” finds the apps that have one).
- **Examples are fictional products** built from the patterns of well-known ones; real names only appear as “Inspired by”. No real logos or brands inside the demos.
  - Each one follows one familiar product's real screen closely, using Mobbin's screenshots as the reference: the same layout, type scale, color scheme and component shapes, so people recognize the design type at a glance. The name, logo, accent hue, icons, copy and data are our own, and so are the photos (free-license Unsplash photos, credited in each example's `photos/CREDITS.md`). People learn an element's name faster on a screen that looks like an app they use every day.
  - The library's footnote and each example's “Inspired by” line say the examples are fictional and not affiliated with those products.
- **Mobile and Watch grids:** phones and watches scale to their column and can be inspected right there, like on the landing page. Each card's heading stays on one line so devices in a row line up. The watch is a 46 mm Apple Watch case (208 × 248 screen) with the Digital Crown and side button (`src/showcase/WatchFrame.tsx`).
- **Web grid:** a still, scaled-down picture of each site at desktop width (1280 px); the whole card opens the site's page. Previews can't be focused or inspected.
- **Example page:** the example at full size and all of its elements written out as a glossary: name, tag, variant, summary, “also called”, and each concept with its term and value (for the theme in use). Phones and watches stay in view on the left while the list scrolls; sites use the scroll scene, with the glossary below. Previous/next links walk through the tab (hidden when the tab holds a single example).
- The library loads separately from the landing page, so the public page stays light.

## Brief

- **Collecting:** Every element in the library can go into the brief: **Add to brief** sits at the bottom of the pinned balloon (in the library only, not on the landing page) and on every glossary entry. It's a gray pill that fills in as “Added to brief”; pressing it again takes the element out. The app header's Brief link shows how many elements are in.
- **The page:** The editor on the left: what you're building, then the elements in order, each with an optional note, arrows to reorder, a remove button and a “Clear brief” that asks first. The Markdown on the right stays in view while the list scrolls, with Copy brief and Download .md. On phones the two stack.
- **The Markdown:** Written for an AI coding tool, in English:
  - The goal, then one instruction: match the look and behavior, and use the project's own components and design tokens where they exist.
  - Each element: name, HTML tag, variant, summary, what people also call it, then its Look and Behavior terms with the example's values. A color that differs by theme gives both values. The user's note follows.
  - Acceptance criteria: each behavior, each note, and a line on light and dark mode when colors differ.
- **Storage:** The brief lives in `localStorage` (`pw-brief`) and follows along in other tabs. Items point at an element of an example rather than copying it, so descriptions stay current; items whose element no longer exists drop out. It moves to the account once there's a backend.

## Sign-in and sign-up

- **Layout:** A minimal header (logo and theme toggle), the hero's line art faint behind, and the form in a 400 px card. The card opens like a landing section: a mono `[ SIGN IN ]` label, a large light heading (“Welcome back.”), a muted lead.
- **Fields:** 46 px tall with 12 px corners. On focus the field's own border turns signal green with a soft ring. An error appears under the field in `--color-danger` and is read out by screen readers. Passwords have a show/hide button.
- **Buttons:** The main action is the primary pill. “Continue with Google” follows Google's button colors: white, a `#747775` border and `#1F1F1F` text in light mode; `#131314`, `#8E918F` and `#E3E3E3` in dark mode. It uses the four-color G, in our pill shape (Roboto 500 is Google's own button font).
- **Messages:** A form-level message is neutral when something isn't connected yet (Google, sign-ups) and red when the input was wrong (email and password don't match).
- **Workspace:** Unlike the landing page, the app header is a bar (hairline border, frosted glass): it frames a working area rather than a story. The Brief link with its count comes first among the actions, and the avatar shows the user's initial. On phones the product's name and the user's name hide, leaving the mark and the avatar.
- **Dev account (development builds only):** A dashed note under the sign-in card with the credentials and a “Fill in” shortcut, and a dashed banner in the workspace. Both disappear from production builds and are removed before launch.

## Mobile demos

- **Wave:** A habit tracker's Today screen in the iOS idiom. A large title, a day/week segmented control, a summary card with a segmented progress ring and the streak, habit rows under two section headers, Tonight and Done (icon badge, week dots, check button), a glass tab bar and an add button.
  - iOS's grouped surfaces: a gray page with white cards in light mode, black with `#1c1c1e` cards in dark mode, in the iOS system font.
  - The chrome stays neutral; color belongs to the habits. Each takes the color of its time of day, from dawn coral to night indigo: six OKLCH hues with the same lightness and chroma, so none shouts louder than another.
  - The tab bar and the add button share one quiet glass with an ink glyph and a light shadow. A solid black (white in dark mode) button was the loudest thing on the screen and pulled the eye away from the habits.
  - Motion: the ring's segments sweep in and "4 of 6" counts up; then a short story loops: Drink water gets its last two glasses, its check fills, the ring reaches 5 of 6, "2 to go" becomes "1 to go", the streak goes from 4 to 5 and today's dot fills. Every number stays consistent with the rest of the screen.
- **Muse:** An AI assistant built like the best chat apps on the phone. A calm page, the user's message in a soft gray bubble, and the answer set as text without a bubble: a heading, a reasoning disclosure, a cited source, a small table, a checklist, then message actions and follow-up suggestions. A model menu, a composer and a voice button.
  - The top bar follows iOS 26's Liquid Glass: no bar of its own, just round glass buttons floating over the conversation, which fades out beneath them. Recipe: `backdrop-filter: blur() saturate(180%)`, a translucent background, a thin border and a highlight along the top edge made with an inset shadow.
  - One accent, saffron, belongs to Muse itself: its mark, the highlighted figure, the done checkbox and the voice button, always with near-black glyphs on it.
  - Motion: the reply streams in once, like a real chat app. "Thinking…" shimmers for a second and settles into "Thought for 9s", the text arrives word by word (~18 words a second, each fading in), the table rows and checklist items one by one, then the actions and the suggestions. About five and a half seconds; at rest the layout is exactly the static one.
- **Stride:** A sneaker's product page, laid out like the Nike app's. It gathers the elements PMs most often look up by name on a single screen:
  - A full-width product photo on a pale gray studio backdrop with page dots, a navigation bar with back, share and search buttons, and a badge.
  - The product title, the sale price with the struck-through original, photo swatches of the other colors and a size grid with sold-out sizes.
  - A size-guide text link and two stacked pill buttons (Add to Bag, Favorite).
  - Color comes from the photos; the one accent, a cobalt blue, marks the saving. The photo looks the same in both themes, so the page dots drawn on it stay dark in both.
  - Motion: every 5 seconds the photo slides on to the next colorway (five, recolored from the one product photo), and the page dots, the color picker's ring and the colorway name in the category line follow, so the gallery and the picker tell one story.

## Color tokens

All of them live in `src/styles/tokens.css` and are defined with `light-dark(light, dark)`; components use tokens only.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-bg` | `#fcfcfc` | `#141414` | Page background |
| `--color-surface` | `#ffffff` | `#1a1a1a` | Cards |
| `--color-surface-2` | `#f5f5f5` | `#1c1c1c` | Feature cards, window title bar |
| `--color-text` | `#171717` | `#fafafa` | Body text |
| `--color-text-muted` | `#5c5c5c` | `#a3a3a3` | Supporting text |
| `--color-text-subtle` | `#6b6b6b` | `#8f8f8f` | Labels, nav links |
| `--color-text-faint` | `#7a7a7a` | `#6b6b6b` | Only the second half of two-tone large headings |
| `--color-border` | `#e5e5e5` | `#262626` | Hairlines |
| `--color-primary` | `#171717` | `#fafafa` | Primary button (inverted in dark mode) |
| `--color-fill-secondary` | black 6% | white 8% | Secondary button (LayerZero's gray button) |
| `--color-accent` | `#0a8f65` | `#0fb983` | Non-text accent |
| `--color-accent-text` | `#087a56` | `#0fb983` | Accent text |
| `--color-inspect` | `#0a8f65` | `#0fb983` | Inspection outline and name tag; brighter in dark mode to stand out on dark examples |
| `--color-on-inspect` | `#ffffff` | `#04281c` | Text on the name tag |
| `--color-danger` | `#b42318` | `#f97066` | Form errors (≥6:1 against the surfaces) |

The explainer balloon uses an inverted surface in light mode (`#171717`) and a surface one step up in dark mode (`#202020`).

## Typography

Typefaces and metrics are taken one to one from LayerZero.

- **Hero headline:** Roboto 400, line height 1.08, letter spacing `-0.048em` (LayerZero h1: 52/56, −2.5 px). A one-line promise.
- **Section titles:** Roboto 400, 1.2, `-0.05em` (LayerZero h2: 40/48, −2 px). Two-tone: the first part in `--color-text`, the rest in `--color-text-faint`. A mono `[01] EXAMPLES` label above.
- **Card titles:** Roboto 400, 20/28, `-0.025em`.
- **Body:** Roboto 400, 16 px / 1.5.
- **Mono:** Roboto Mono 400, 12/16, normal letter spacing. The `[ PROJECT WINGMAN ]` label, indexes, technical terms, counters.

## Shape, surface and motion

- **Corners:** Buttons are fully rounded (pills); the theme toggle and the pause button are circles. Cards 8–12 px; chips and badges fully rounded.
- **Flat surfaces:** No shadows; hairlines separate things. Only floating elements (balloon, phone, browser window) get a shadow.
- **Motion:**
  - Hero lines, as measured on LayerZero:
    - A line at angle φ is a circle of radius (hero height ÷ 2) ÷ tan φ, touching the horizon at the centre point. The horizon sits 40 px below the hero's middle (60 px under 768 px wide).
    - Lines are 3.6° apart (6° under 768 px) and 1 px wide. Every angle grows at the same rate, so lines rise from below, flatten into the horizon and curl away above: 1.7°/s from 1440 px wide, faster on narrower screens (6.5°/s at 390 px).
    - Opacity grows linearly with a line's radius: clear at 141 px, full at 1889 px under 768 px, as on LayerZero. On wide screens it's clear at 270 px and full at 2800 px, and lines fade out over the outer 12% of the width on each side (LayerZero: 440–5480 px and the outer quarter, which left the wings faint). The field is at most 1920 px wide.
  - The shooting star is rare: the first one after ~3 seconds, then at random 8–14 second intervals.
    - Path: 2–5 beams (random each time) speed in from lines far apart on the left and meet at the centre point at the same moment (a short, soft flash). The merged beam slows down as it leaves along a line on the right, at a different angle than the last one, and fades as it nears the edge. Beams only ride clearly visible lines and move with them as the field drifts, so they never leave their line.
    - Shape: A teardrop. A full, round head with a single tapering, fading tail; no dotted trail. A short drop when slow, a long beam as it passes the centre point. Same color as the lines, so it follows the theme; the glow around the head is dimmed in light mode.
  - Site scenes: The window grows from 92% to 100% as it reaches its pinned position. Once pinned, there's a short hold before the content starts scrolling and before the window is released (~12% of the viewport height, at most 120 px). While scrolling, a thin macOS-style scrollbar appears on the right.
  - Features marquee: Two identical groups sit end to end and drift left by one group's width every 80 seconds (~25–30 px/s); the edges fade out softly. It stops under the pointer or with the button.
  - Examples (the Wingman sides; the slop sides stay still apart from Muse's thinking dots): entrances last 0.5–1.2 s with ease-out and a light stagger; ongoing changes come every 5–7 s, one at a time.
    - Acme: the product screenshot's roadmap bars grow into place and the Today line drops in; then every 6 s one small change (progress fills, a teammate joins, an item ships with a soft green flash), looping back after four. The logo strip drifts in a 70 s marquee, with a second row going the other way where the logos would wrap. The announcement badge catches a soft sheen every 6 s. The feature pictures grow in and "18%" counts up.
    - Orbit: the KPI figures count up and their sparklines draw in; the MRR chart wipes in from the left, and the launch flag, the crosshair and the tooltip fade in as the line reaches them; the bar lists grow from the left. Every 6.5 s a new payment slides in at the top of the table, the oldest leaves, Collected tweens to the new sum of paid rows and the page reads "Updated just now".
    - Wave, Muse and Stride: see Mobile demos.
  - The inspection outline slides between elements in 120 ms.
  - Theme changes cross-fade smoothly with View Transitions where supported.
  - With `prefers-reduced-motion`, the lines stay still and no shooting star appears, the before/after line doesn't sway, the examples show their finished state, the Features marquee doesn't move (the cards sit in rows) and windows don't grow into place; other animations and smooth scrolling stop too. In the site scenes the content still moves with the page, at the same speed as normal scrolling.

## Accessibility notes

- In light mode, green text uses `#087a56` (~5.2:1); `#0a8f65` (~4:1) is only for borders and icons.
- The gray part of two-tone headings meets the large-text rule: ~4.2:1 in light mode, ~3.5:1 in dark mode.
- The example demos are hidden from screen readers (`aria-hidden`); instead, each example is a single focusable region and the element being browsed is announced through a live region.
- Demos contain no real links or buttons (`<a>` without `href`, `<span>`), so the tab order stays intact.
- Because the Features marquee moves on its own, it has a visible pause button (WCAG 2.2.2). The second copy added for the loop is hidden from screen readers.

## References

- [layerzero.network](https://layerzero.network): light theme, monochrome, converging rays in the hero, `[ ]` labels, two-tone headings, gray secondary buttons, typefaces (Roboto, Roboto Mono) and type metrics.
- [apple.com](https://www.apple.com) product pages: scenes that pin and change as you scroll.
- [stargate.finance/overview](https://stargate.finance/overview): dark theme, a single emerald accent, flat bordered cards, Geist.
