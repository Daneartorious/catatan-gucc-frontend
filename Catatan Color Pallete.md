---
version: alpha
name: Tax and Finance Website Design System
description: "Calm, precise design system for tax and finance tools: company lookup, VAT status checks, financial statement viewers and calculators. Navy on white, with green, amber and red reserved strictly for statuses."
colors:
  primary: "#1b2f6b"
  primary-press: "#13224f"
  on-primary: "#ffffff"
  ink: "#0a0b0d"
  body: "#5b616e"
  mute: "#6a707a"
  hairline: "#dee1e6"
  hairline-soft: "#eef0f3"
  canvas: "#ffffff"
  surface-soft: "#f5f7fa"
  label-bg: "#eef1f9"
  on-ink: "#ffffff"
  ink-line: "#23262d"
  ok: "#047a4a"
  ok-bg: "#e6f7ef"
  warning: "#8a5a00"
  warning-bg: "#fff3d6"
  error: "#c0202d"
  error-bg: "#fde9ea"
  neutral: "#5b616e"
  neutral-bg: "#eef0f3"
  chart-1: "#2a78d6"
  chart-2: "#eb6834"
  chart-3: "#1baf7a"
typography:
  display:
    fontFamily: Instrument Sans
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -1.2px
  headline-lg:
    fontFamily: Instrument Sans
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.8px
  headline-md:
    fontFamily: Instrument Sans
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: Instrument Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  label-md:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.3
  label-sm:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  number:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: tnum
  stat:
    fontFamily: Instrument Sans
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: tnum
rounded:
  card: 16px
  button: 16px
  search: 16px
  button-inner: 10px
  input: 12px
  tab: 12px
  label: 8px
  badge: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  hero: 72px
  max-width: 1240px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.button}"
    padding: 14px 24px
    height: 52px
  button-primary-press:
    backgroundColor: "{colors.primary-press}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.button-inner}"
    padding: 10px 16px
  search-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.search}"
    padding: 8px 8px 8px 24px
    height: 76px
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.input}"
    padding: 12px 16px
    height: 48px
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: 24px
  card-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: 24px
  section-label:
    backgroundColor: "{colors.label-bg}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.label}"
    padding: 6px 12px
  status-ok:
    backgroundColor: "{colors.ok-bg}"
    textColor: "{colors.ok}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.badge}"
    padding: 4px 12px
  status-warning:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.badge}"
    padding: 4px 12px
  status-error:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.badge}"
    padding: 4px 12px
  status-neutral:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.badge}"
    padding: 4px 12px
  stat:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.stat}"
  caption:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.mute}"
    typography: "{typography.label-sm}"
  nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    height: 72px
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.body-md}"
    padding: 64px 24px
  divider:
    backgroundColor: "{colors.hairline-soft}"
    height: 1px
  link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  body-text:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  search-divider:
    backgroundColor: "{colors.hairline}"
    width: 1px
  footer-divider:
    backgroundColor: "{colors.ink-line}"
    height: 1px
  chart-series-1:
    backgroundColor: "{colors.chart-1}"
    height: 3px
  chart-series-2:
    backgroundColor: "{colors.chart-2}"
    height: 3px
  chart-series-3:
    backgroundColor: "{colors.chart-3}"
    height: 3px
---

# Tax and Finance Website Design System

## Overview

A design system for tax and finance tools that people use to make a decision, not to be entertained: checking a company before paying an invoice, looking up VAT status, reading a financial statement, running a quick calculation. The page should feel like a **precise instrument, not an advertisement**: a quiet white canvas, the tool at the very top, numbers and statuses as the main characters.

It is the design system of NIP Lab (niplab.eu), a free company lookup service built on public registries. Instrument Sans has full Latin Extended coverage, so Polish and other Central European diacritics (ą, ę, ł, ż, ř, ů) render correctly in every weight.

## Colors

One brand color, and a strict monopoly of status colors.

- **Navy (#1b2f6b):** the only brand color. Primary button, links, logo, focus rings and section labels. 12.6:1 on white.
- **Status colors own green, amber and red:** OK (#047a4a on #e6f7ef), Warning (#8a5a00 on #fff3d6), Problem (#c0202d on #fde9ea), Neutral (#5b616e on #eef0f3). They are never used for decoration, headings or charts. A status always has a **symbol and a word** (✓ Active, ! Worth checking, ✕ Problem) - color is never the only signal.
- **Text:** ink (#0a0b0d) for headings and numbers, body (#5b616e) for copy, mute (#6a707a) for captions and data sources. Every text pair measures at least 4.6:1.
- **Background:** plain white; surface-soft (#f5f7fa) only as a soft gradient at the top of the page and for tiles.
- **Footer** is the only dark surface: ink background with white text only, no greys on black.
- **Charts** have their own three colors (#2a78d6, #eb6834, #1baf7a), distinct from statuses, so a chart line never pretends to be a warning.

## Typography

One typeface: **Instrument Sans**. Headlines are short, weight 600, tight tracking, never all caps. Hero H1 is 44px (38 on tablet, 30 on phones); inner tool pages use a smaller 34px H1 so long titles stay on one or two lines.

**Every number uses tabular figures** (`font-variant-numeric: tabular-nums`): amounts, tax IDs, bank account numbers and years line up in columns. Company names coming from official registries keep their original casing - that is data, not style.

## Layout

- Page container 1240px; results and tables 1060px, centered.
- **Header:** white, 72px, hairline bottom border; logo left, flat tool navigation right (no dropdowns).
- **Top of the page:** H1 and one supporting line, centered, then the **search field**, then a one-line trust note. Nothing competes with the tool above the fold.
- **Results** directly under the search, grouped under question headings: "Can I safely pay this invoice?", "Who is it?", "What is the company's financial condition?", with a company card and warnings on top.
- **Content sections** below are left-aligned and alternate types: numbered steps, a 3x2 grid of tool cards, a data sources table, FAQ accordion. The same section type never appears more than twice in a row.
- Section spacing 48px, card padding 24px, 8px grid.

## Elevation & Depth

Flat, with one exception: **the search field floats** (`0 12px 32px -12px rgba(10,11,13,.18)`). Result cards use a hairline border plus a very light shadow (`0 8px 28px rgba(10,11,13,.06)`); nothing inside cards has a shadow.

## Shapes

One radius, 16px, for cards, buttons and the search field. A button inside the search field uses 10px so the curves run parallel to the 8px inset. Form inputs 12px, tabs 12px, section labels 8px. **Pills (999px) are reserved for labels** - statuses and registry badges - never for buttons.

## Components

- **Search field (centerpiece):** one white 76px field with hairline border and shadow, split into two parts by a thin divider - "Tax ID, company or registry number" (wide) and "Status as of date" - with a navy "Check company" button on the right. Small labels above 20px/600 values.
- **Registry table:** rows of `40px round icon with 2-3 letters | registry name + data source | key number (tabular) | status pill`. The source is always named.
- **Company card:** company name, identifiers in one line, and either a list of warnings or a single green pill "No warnings in the checked registries".
- **Warning:** left border in the status color, bold title and one sentence of explanation.
- **Calculator:** white card, tabs for variants, inputs in a two-column grid, result box on surface-soft with the main value at 28px navy and step-by-step rows below.
- **Checklist:** numbered steps in bordered rows with a checkbox; a checked step turns soft grey and struck through.
- **Save as PDF button:** white, hairline border, document icon with a small red "PDF" mark - the only red outside statuses, and only inside the icon.
- **Section label:** navy text on #eef1f9, 8px radius, above an H2.
- **Explainer video frame:** short looping animation inside a browser-window frame with a written caption "In the video: ..." under it.
- **FAQ:** accordion, question 17px/600, navy "+" sign, hairline separators.
- **Footer:** ink background, white wordmark, columns Tools / Data sources / Service, white links underlined on hover.

## Do's and Don'ts

- Do put the tool at the top of every page and the result right under it.
- Do give every status a symbol, a word and a color; give every number tabular figures.
- Do name the data source next to every registry result.
- Don't use green, amber or red outside statuses - not in icons, charts or decoration.
- Don't use stock photos or banners that push the tool down.
- Don't imitate a government website: no national emblems or flag colors.
- Don't use all caps in headings.

## Responsive Behavior

Desktop first. On phones the search field breaks into two rows (field and date, then a full-width button), the registry table turns into cards (registry and status on the first line, key number on the second), calculator inputs stack into one column and wide tables drop secondary columns.
