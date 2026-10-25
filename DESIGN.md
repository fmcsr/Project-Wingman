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
| Signature visual | Symmetric rays in the hero (`src/brand/HorizonLines.tsx`): they come in from the left, narrow to a point in the middle and widen again toward the right. Every so often a shooting star passes: 2–5 beams come in along different rays on the left and meet at the focus point, and the merged beam leaves along another ray on the right | A motif inspired by LayerZero's hero. The metaphor: scattered ideas meet in one clear term and open up again from there. The shooting star animates that meeting. The flow runs left to right. |
| Example interfaces | Not affected by the site theme; each keeps its own look (Muse is dark on purpose) | The examples stand for real products; they're part of the concept being taught, not of the brand. |
| Inspection model | Like “Inspect element” in browser developer tools | Nearly every element can explain itself, and adding a new one takes a single `data-inspect` attribute. |
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

## Mobile demos

- **Wave:** The classic iOS language. Light background, list rows, toggle switches, a FAB and a bottom tab bar.
- **Muse:** A newer kind of app: an AI assistant in the Liquid Glass style. A glass navbar floating over a dark, colorful background, a glass dropdown that opens and closes on its own, chat bubbles, a typing indicator, glass suggestion chips, a glass composer and a voice button with a color ring.
  - Liquid Glass recipe: `backdrop-filter: blur() saturate(180%)`, a translucent white background, a thin white border and a highlight along the top edge made with an inset shadow.
- **Stride:** A shopping product page. A must-have in the collection, because it gathers the elements PMs most often look up by name on a single screen:
  - Photo gallery and pagination dots.
  - Count badge, favorite button, discount badge and struck-through price.
  - Star rating, color and size pickers (including a sold-out size).
  - Quantity stepper and a sticky buy bar.
  - A toast that comes and goes on its own (stays visible while inspected).

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
| `--color-inspect` | `#0a8f65` | `#0a8f65` | Inspection outline (fixed: the examples are always light) |

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
  - The rays drift left to right by one ray spacing every ~3.2 seconds; the focus point sways gently on a 16-second cycle.
  - The shooting star is rare: the first one after ~3 seconds, then at random 8–14 second intervals.
    - Path: 2–5 beams (random each time) speed in from rays far apart on the left and meet at the focus point at the same moment (a short, soft flash). The merged beam slows down as it leaves along a different ray on the right than the last one, and fades as it nears the edge. Each beam follows its ray, recomputed every frame, so it never leaves the moving line.
    - Shape: A teardrop. A full, round head with a single tapering, fading tail; no dotted trail. A short drop when slow, a long beam as it passes the focus point. Same color as the lines, so it follows the theme; the glow around the head is dimmed in light mode.
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
