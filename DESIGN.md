# Project Wingman — Design decisions

Last updated: 2026-10-26 · Status: Applied to the landing page

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
| Example interfaces | The examples follow the site theme; only Muse stays dark in both (dark by design) | Bright examples on a dark page felt off, and real products ship a dark mode too. Every example color is a `light-dark()` pair (Wave uses iOS's own light and dark system colors), and the balloons show color values for the theme in use, so what they explain always matches what's on screen. |
| Inspection model | Like “Inspect element” in browser developer tools | Nearly every element can explain itself, and adding a new one takes a single `data-inspect` attribute. |
| Pages and routing | `/` landing page, `/sign-in`, `/sign-up`, `/app` (signed-in workspace). A tiny router on the History API instead of a library | Four routes don't justify a dependency; links stay real `<a href>` elements, so opening in a new tab works. |
| Auth | No backend yet. The session lives in `localStorage`; the sign-in functions already have the shape a real provider will need | The pages won't change when a provider (Supabase, Firebase, Clerk…) is connected. Until then, a development-only account opens the workspace. |
| Scrolling in the example sites | No scrolling inside the frames. As on Apple's product pages, the window pins and page scrolling scrolls the site inside it | Nested scrolling (a window that scrolls inside the page) trapped the cursor and made the page harder to use. |

## Page structure (information architecture)

```
Header        Logo · Examples · Features · Pricing ········ Theme · Sign in   (sticky)
Hero          [ PROJECT WINGMAN ] · “Every PM needs a wingman.” · See examples / Get started
[01] Examples Acme (marketing) · Orbit (analytics dashboard) · Wave (habits) · Muse (AI) · Stride (shopping)
[02] Features A slowly moving marquee (with a pause button)
[03] Pricing  Free · Pro · Team (placeholder prices)
Footer        Text links · Back to top
```

Other pages: `/sign-in` and `/sign-up` (the header's Sign in and the plans' buttons lead here) and the signed-in library: `/app/mobile`, `/app/web` and one page per example at `/app/<platform>/<id>`. Once signed in, Sign in becomes Workspace in the header and the footer. Under the landing page's examples, “Explore the library” leads in.

- **The header isn't a bar, but it's sticky:** Fully transparent at the top of the page; as you scroll down it takes on a borderless frosted-glass background. Links go to sections, the logo goes back to the top, and the link of the section in view gets darker. Sections stop below the header thanks to `scroll-margin-top`.
- **Footer:** Not a bar; text links sitting on the page background.
- **The home page shows only five example projects:** The full library and the signed-in areas come in a later phase.
- **Example layout:**
  - Sites (Acme, Orbit): Each in its own scroll scene, full page width, one after another.
    - The window pins below the header. The scene grows by as much as the content overflows, and page scrolling is passed one to one into the window.
    - Users never scroll inside the window. Because the content really scrolls (`overflow: hidden` + `scrollTop`), Acme's sticky glass navbar keeps working.
  - Phones: All three in one row at every width. If they don't fit, they shrink together (`--phone-scale`; ~0.35 on a phone). In a narrow row, each heading keeps only the index and the name.

## Inspection interaction

| Input | Behavior |
| --- | --- |
| Mouse | On hover, the green outline and the name tag appear at once; after a 280 ms dwell, a summary balloon. While a preview is open, moving to another element updates the balloon without waiting. A click pins the full explanation. |
| Touch | A tap opens the full explanation; tapping another element switches to it; tapping outside closes it, scrolling doesn't. |
| Keyboard | Each example is a single tab stop. Arrow keys and Home/End move between elements, Enter pins, Esc closes. A live region reads the element's name and summary to screen readers. In the sites, if the selected element isn't visible in the window, the page scrolls to where it shows. |

The balloon is narrow in preview (name, summary, term chips) and wide when pinned (everyday names, plain-language explanations of each concept). It flips above the element when there's no room below, and since it's drawn on a shared layer that covers every frame, it never gets clipped at a frame's edge.

In the scaled-down phones and in windows settling into place, the outline and the name tag are drawn at the inverse scale: the outline stays thin and the tag stays readable.

**Animated demos pause while inspected.** Muse's dropdown opens and closes on its own when idle. It holds still while the pointer is over the example, keyboard focus is inside it or a balloon is open, so the menu itself can be inspected too. Demos read this state with `useInspectActivity()`.

## Library

- **Two tabs, Mobile and Web,** in a pill-shaped segmented control with the count of examples. Like a pattern gallery (Mobbin): category chips, and a search that matches names, inspirations and every element's name, aliases and terms (“bottom sheet” finds the apps that have one).
- **Examples are fictional products** built from the patterns of well-known ones; real names only appear as “Inspired by”. No real logos or brands inside the demos.
- **Mobile grid:** phones scale to their column and can be inspected right there, like on the landing page. Each card's heading stays on one line so phones in a row line up.
- **Web grid:** a still, scaled-down picture of each site at desktop width (1280 px); the whole card opens the site's page. Previews can't be focused or inspected.
- **Example page:** the example at full size and all of its elements written out as a glossary: name, tag, variant, summary, “also called”, and each concept with its term and value (for the theme in use). Phones stay in view on the left while the list scrolls; sites use the scroll scene, with the glossary below. Previous/next links walk through the tab.
- The library loads separately from the landing page, so the public page stays light.

## Sign-in and sign-up

- **Layout:** A minimal header (logo and theme toggle), the hero's line art faint behind, and the form in a 400 px card. The card opens like a landing section: a mono `[ SIGN IN ]` label, a large light heading (“Welcome back.”), a muted lead.
- **Fields:** 46 px tall with 12 px corners. On focus the field's own border turns signal green with a soft ring. An error appears under the field in `--color-danger` and is read out by screen readers. Passwords have a show/hide button.
- **Buttons:** The main action is the primary pill. “Continue with Google” follows Google's button colors: white, a `#747775` border and `#1F1F1F` text in light mode; `#131314`, `#8E918F` and `#E3E3E3` in dark mode. It uses the four-color G, in our pill shape (Roboto 500 is Google's own button font).
- **Messages:** A form-level message is neutral when something isn't connected yet (Google, sign-ups) and red when the input was wrong (email and password don't match).
- **Workspace:** Unlike the landing page, the app header is a bar (hairline border, frosted glass): it frames a working area rather than a story. The avatar shows the user's initial.
- **Dev account (development builds only):** A dashed note under the sign-in card with the credentials and a “Fill in” shortcut, and a dashed banner in the workspace. Both disappear from production builds and are removed before launch.

## Mobile demos

- **Wave:** The classic iOS language. Grouped background, list rows, toggle switches, a FAB and a bottom tab bar. In dark mode it uses iOS's dark system colors: black background, `#1c1c1e` cells, darker separators and the brighter `#30d158` switch.
- **Muse:** A newer kind of app: an AI assistant in the Liquid Glass style. A glass navbar floating over a dark, colorful background, a glass dropdown that opens and closes on its own, chat bubbles, a typing indicator, glass suggestion chips, a glass composer and a voice button with a color ring.
  - Liquid Glass recipe: `backdrop-filter: blur() saturate(180%)`, a translucent white background, a thin white border and a highlight along the top edge made with an inset shadow.
- **Stride:** A shopping product page. A must-have in the collection, because it gathers the elements PMs most often look up by name on a single screen:
  - Photo gallery and pagination dots.
  - Count badge, favorite button, discount badge and struck-through price.
  - Star rating, color and size pickers (including a sold-out size).
  - Quantity stepper and a sticky buy bar.
  - A toast that comes and goes on its own (stays visible while inspected).
  - In dark mode: a warm dark gallery behind the coral shoe, a dark details panel, and the selections (size, color ring, Add to bag) flip to light.

## Color tokens

All of them live in `src/styles/tokens.css` and are defined with `light-dark(light, dark)`; components use tokens only.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--color-bg` | `#fcfcfc` | `#141414` | Page background |
| `--color-surface` | `#ffffff` | `#1a1a1a` | Cards, plans |
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
  - The inspection outline slides between elements in 120 ms.
  - Theme changes cross-fade smoothly with View Transitions where supported.
  - With `prefers-reduced-motion`, the lines stay still and no shooting star appears, Muse's menu stays open, the Features marquee doesn't move (the cards sit in rows) and windows don't grow into place; other animations and smooth scrolling stop too. In the site scenes the content still moves with the page, at the same speed as normal scrolling.

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
