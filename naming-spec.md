# Discourse CSS variable naming: draft spec

Status: draft, 2026-10-07. Source of truth for the naming scheme. Rules marked
**settled** were agreed in the thread or by the team; everything marked **proposed**
is a default put forward for review. Questions the draft does not answer yet are in §9.

Verified against core at `68ad0815c02` (Oct 2026): 686 custom properties defined in
`app/assets/stylesheets`, 192 more in bundled plugins.

## 1 · Goals

1. **Consistency for agents.** One grammar for every token. An agent can build a name
   from intent ("muted text", "DButton primary background on hover") without searching.
2. **Performance for agents.** A small, closed vocabulary that fits in a few hundred lines
   of context (`vocabulary.json`) and is cheap to validate.
3. **Transparency for reviewers.** A name shows its layer, its owner, its purpose and
   whether it is public, so a change can be judged without opening core CSS.

Design consequences that follow from these goals and apply everywhere:

- **Closed lists.** Every slot has a fixed word list. A word that is not on the list is a
  lint error, not a style choice.
- **Fixed order.** Slots may be omitted but never reordered.
- **Parseable without context.** Casing marks the owner, closed lists mark everything
  else, so a name can be split into slots by a script (and by a reviewer) without
  knowing the CSS behind it.

## 2 · Layers and prefixes

| Layer | Prefix | Owner segment | Visibility | Status |
|---|---|---|---|---|
| System (semantic) | `--d-sys-` | Core (implied by `--d-`, no segment) | public | settled |
| Core component | `--d-comp-` | `{Component}` | public | settled |
| Theme | `--t-` | `{ThemeName}` | public | settled |
| Theme component | `--tc-` | `{ComponentName}` | public | settled |
| Plugin | `--p-` | `{PluginName}` | public | settled |
| Base (palette, raw scales) | open, no prefix proposed (§9) | Core | not public | open |

- `--d-` is reserved for core. Extensions may **set** public `--d-sys-` and `--d-comp-`
  tokens (that is the customization contract) but never **define** new names under `--d-`.
- Every name in these layers is public: documented, stable across releases, renames go
  through the renaming framework with the old name kept resolving. There is no private
  marker; the base layer is the only part that is not public.

## 3 · Grammar

### 3.1 Slot table

| Slot | Casing | Hyphenated words | Required | Vocabulary |
|---|---|---|---|---|
| `prefix` | lowercase | no | yes | §2 |
| `Owner` | PascalCase | no | yes, except in sys | derived, §5 / §6 |
| `Component` | PascalCase | no | no, extensions only | derived, §6 |
| `part` | lowercase | no | no, max one, not in sys | free word, not on any other list |
| `category` | lowercase | no | yes | §4.1 |
| `property` | lowercase | yes (`line-height`, `max-inline`) | per category | §4.2 |
| `role` | lowercase | yes (`inline-end`) | per property | §4.3 |
| `variant` | lowercase | no | per property | §4.4 |
| `state` | lowercase | no | no, max two | §4.5 |

PascalCase marks the owner; everything else is lowercase.

### 3.2 EBNF

```ebnf
token        = "--" , ( sys-body | comp-body | ext-body ) ;

sys-body     = "d-sys-" , tail ;
comp-body    = "d-comp-" , Owner , [ "-" , part ] , "-" , tail ;
ext-body     = ( "t" | "tc" | "p" ) , "-" , Owner ,
               [ "-" , Component ] , [ "-" , part ] , "-" , tail ;

tail         = category , [ "-" , property ] , [ "-" , role ] ,
               [ "-" , variant ] , [ "-" , state , [ "-" , state ] ] ;

Owner        = pascal ;
Component    = pascal ;
pascal       = upper , { upper | lower | digit } ;
part         = lower , { lower | digit } ;                     (* single word *)

category     = "color" | "font" | "shadow" | "space" | "size"
             | "border" | "outline" | "opacity" | "motion" ;
property     = ? per category, §4.2 ? ;
role         = ? per property, §4.3 ? ;
variant      = size | strength | weight ;
size         = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl"
             | "2xl" | "3xl" | "4xl" | "5xl" ;
strength     = "subtlest" | "subtle" | "bold" ;
weight       = "regular" | "medium" | "semibold" | "bold" ;
state        = condition-state | interaction-state ;
condition-state   = "selected" | "checked" | "current" | "expanded"
                  | "disabled" | "invalid" | "visited" | "read" ;
interaction-state = "hovered" | "pressed" | "focused" ;
```

Combination rules the EBNF does not express:

- `property`, `role` and `variant` are only allowed where §4 lists them for that category.
- Two states: condition first, interaction second (`selected-hovered`, never `hovered-selected`).
- `part` must not be a word from any closed list (so `border` or `control` can never be a part).
- Hyphenated vocabulary entries (`line-height`, `inline-end`) count as one slot, so
  `font-line-height-body` has four segments but three slots.

### 3.3 How a name is parsed

1. Prefix tells the layer.
2. PascalCase segments are owners and components. The case change is the boundary, so
   `TopicListItem` never needs a rule about where the component name ends.
3. The first lowercase segment is a `category` if it is on the category list, otherwise
   it is a `part`.
4. The remaining segments are matched left to right against the lists allowed for that
   category. Role and variant lists do not overlap: `muted`/`faint` are neutral roles,
   `subtle`/`subtlest` are only strength variants after an intent.

## 4 · Vocabulary (system tier)

### 4.1 Categories (settled)

`color` · `font` · `shadow` · `space` · `size` · `border` · `outline` · `opacity` · `motion`

### 4.2 Properties per category

| Category | Properties | Notes |
|---|---|---|
| `color` | `text`, `icon`, `background`, `border`, `outline` | proposed: `background` not `surface`; elevation is a role |
| `font` | `family`, `size`, `weight`, `line-height`, `letter-spacing` | settled grouping (07, Option 2) |
| `shadow` | none | role follows the category directly |
| `space` | `gap`, `padding`, `margin` | settled grouping |
| `size` | `icon`, `avatar`, `control`, `container` | proposed |
| `border` | `radius`, `width`, `style` | settled grouping (radius under border) |
| `outline` | `width`, `offset`, `style` | focus ring only |
| `opacity` | none | state or role follows directly |
| `motion` | `duration`, `easing` | |

### 4.3 Roles

A role is *what the value is for*. Rule (proposed): **if a property has roles, the role
slot is always filled, and the neutral one is spelled `default`.** Properties that are
pure scales (font size, space, radius) have no role and go straight to the variant.

| Category · property | Roles |
|---|---|
| `color-text` | `default`, `muted`, `faint`, `inverse`, `link`, `accent`, `danger`, `success`, `warning`, `info` |
| `color-icon` | `default`, `muted`, `faint`, `inverse`, `accent`, `danger`, `success`, `warning`, `info`, `love` |
| `color-background` | `default`, `raised`, `sunken`, `overlay`, `input`, `inverse`, `backdrop`, `highlight`, `accent`, `danger`, `success`, `warning`, `info`, `love` |
| `color-border` | `default`, `muted`, `strong`, `input`, `accent`, `danger`, `success`, `warning` |
| `color-outline` | `default`, `danger` |
| `font-family` | `body`, `heading`, `monospace` |
| `font-line-height` | `none`, `heading`, `body`, `prose` |
| `font-letter-spacing` | `default`, `heading` |
| `shadow` | `overflow`, `raised`, `overlay`, `dialog` (lightest to strongest) |
| `space-*` | none; axes only in component tokens (§5.2) |
| `size-*` | none |
| `border-style`, `outline-width/offset/style` | `default` |
| `opacity` | `backdrop`, optional: a state may follow the category directly (`opacity-disabled`) |
| `motion-easing` | `standard`, `enter`, `exit` |

Roles fall into these groups:

| Group | Words | Used for |
|---|---|---|
| Prominence | `default` `muted` `faint` `strong` | how prominent neutral text, icons and borders are |
| Intent | `accent` `danger` `success` `warning` `info` `highlight` `love` | meaning; the only roles that take strength variants |
| Surface | `raised` `sunken` `overlay` `inverse` `backdrop` | background levels and special surfaces |
| Purpose | `link` `input` | specific jobs that need their own value |
| Shadow level | `overflow` `raised` `overlay` `dialog` | elevation, lightest to strongest |
| Type style | `body` `heading` `prose` `monospace` `none` | font family, line height, letter spacing |
| Motion | `standard` `enter` `exit` | easing curves |
| Components only | kinds (`primary`, `flat` …), axes (`inline`, `block-end` …) | the component's variant, or the side of a spacing value |

Intent words (proposed): `accent`, `danger`, `success`, `warning`, `info`,
`highlight`, `love`. `accent` replaces `tertiary`; `warning` and `info`
have no color of their own in core yet: today warnings borrow the highlight color
(`--highlight-bg`) and info borrows the accent (`--tertiary-low`). Their tokens can start
with those values and get their own colors when the base colors are redesigned. `love` stays because likes are a Discourse concept.

A system token always describes a purpose or level, never a UI component (proposed):
`shadow-overlay`, not `shadow-dropdown`. The one exception is `input`, because form fields
share one look across every component that has them.

A color token always holds a full color. There are no `-rgb` twins (`--secondary-rgb` and
similar, which exist today only to add transparency). Apply transparency with
`color-mix()`: `color-mix(in srgb, var(--d-sys-color-background-default) 80%, transparent)`.

### 4.4 Variants

| Kind | Words | Used by |
|---|---|---|
| size | `3xs` `2xs` `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `5xl` | font-size, size, border-radius (plus `full`), border-width, motion-duration |
| step | `half` `1` … `12` | space (counts 4px units: `2` = 8px, `5` = 20px) |
| strength | `subtlest` `subtle` `bold` | intent roles on `color-*` |
| weight | `regular` `medium` `semibold` `bold` | font-weight only |

Rules (proposed): one size scale for everything except spacing, short form only (`lg`, never
`large`); `md` is the default step of a scale; scales never use `default`.

Strength steps, faintest to strongest:

| Step | Looks like | Example | Today |
|---|---|---|---|
| `subtlest` | faintest tint | `--d-sys-color-background-accent-subtlest` | `--tertiary-very-low` |
| `subtle` | light tint, e.g. a banner background | `--d-sys-color-background-danger-subtle` | `--danger-low` |
| | the standard intent color, no suffix | `--d-sys-color-background-danger` | `--danger` |
| `bold` | strongest, solid fill | `--d-sys-color-background-accent-bold` | `--token-color-background-accent-bolder` |

Only accent has a near-complete ramp in core today (`--tertiary-very-low` … `-very-high`,
plus `-25` … `-900`). Danger and success have about two steps (`-low`, `-medium`,
`-low-mid`), love has one (`-low`). `warning` and `info` have no ramp of their own; they borrow
highlight and accent steps. The grid stays
complete so names are predictable, but a token is only published when it has a value.

### 4.5 States

Proposed: past participle, rest state never spelled, `active` is not
allowed: use `pressed`, `current` or `selected`.

| Kind | Words |
|---|---|
| interaction | `hovered`, `pressed`, `focused` |
| condition | `selected`, `checked`, `current`, `expanded`, `disabled`, `invalid`, `visited`, `read` |

`disabled` is a state, not a role: `color-text-default-disabled`, `opacity-disabled`.

## 5 · Component tier

### 5.1 Component name (Owner)

Proposed rule: **the Owner is derived from the component's file path**, not its class name,
because class names in core are not reliable (`topic-list/item.gjs` exports `Item`,
`topic-list/header.gjs` exports nothing named, `header.gjs` exports `GlimmerHeader`).

Derivation: path below `app/components/` or `app/ui-kit/`, drop the extension, split on
`/` and `-`, capitalize each word, join.

| File | Owner |
|---|---|
| `ui-kit/d-button.gts` | `DButton` |
| `ui-kit/d-modal.gts` | `DModal` |
| `ui-kit/d-toggle-switch.gjs` | `DToggleSwitch` |
| `sidebar.gjs` | `Sidebar` |
| `sidebar/section-link.gjs` | `SidebarSectionLink` |
| `topic-list/item.gjs` | `TopicListItem` |
| `topic-list/header.gjs` | `TopicListHeader` |
| `header/home-logo.gjs` | `HeaderHomeLogo` |
| `post/menu.gjs` | `PostMenu` |

The `D` prefix comes for free from the `d-` file names in `ui-kit/`. Caveat: eight
non-ui-kit components also start with `d-` (`d-navigation`, `d-section`,
`d-segmented-control`, …), so `D` alone does not prove ui-kit.

Styles with no component file (global `input` styling, `.nav-pills`, tables) use a
registered **pattern name** in PascalCase (`Input`, `NavPills`, `Table`), listed in
`vocabulary.json` with `kind: "pattern"`.

### 5.2 Component tail

```
--d-comp-{Owner}[-{part}]-{category}[-{property}][-{role}][-{variant}][-{state}][-{state}]
```

- **Same shape as system tokens.** After the owner and an optional part, a component token
  follows the system grammar (same categories, properties, variants and states), so one can
  be read from the other: `--d-sys-color-text-muted` and
  `--d-comp-TopicListItem-color-text-muted`.
- **Kinds go in the role slot.** A component's kind takes the position of the role
  (DButton: `default`, `primary`, `danger`, `success`, `flat`, `transparent`):
  `--d-comp-DButton-color-background-primary-hovered`. Omitted when the component has no
  kinds. Survey systems put the kind right after the component instead, but there a kind
  cannot be told apart from a part.
- **Part** (bounded flexibility): one lowercase word for an element inside the component
  that has no component file of its own (`DModal-header`, `PostMenu-button`). If the
  element has its own file, use that Owner instead.
- A part is also used for a style the owner applies to many child components at once:
  `PostMenu-button` styles all 13 post menu buttons, which each have their own file. Use a
  child's own Owner only for tokens that apply to that one child.
- **Property additions for comp**: components may use CSS-like properties the system
  tier does not publish, as long as they sit in a listed category: `size-inline`,
  `size-block`, `size-min-inline`, `size-max-inline`, `size-min-block`, `size-max-block`,
  `motion-transition`, `space-padding-inline`, `space-padding-block`, `font-align`.
  Sizes use logical axes like CSS `inline-size` and `block-size`: `inline` is the width and
  `block` the height in horizontal text, so `--d-comp-DModal-size-max-inline` is the
  modal's max width. This keeps every token inside a category without `size-width`
  repeating itself, and uses the same axis words as spacing.

## 6 · Extension tier

```
--{t|tc|p}-{Owner}[-{Component}][-{part}]-{category}[-{property}][-{role}][-{variant}][-{state}]
```

- **Owner** (proposed): PascalCase of the theme or component `name` in `about.json`, or of
  `# name:` in `plugin.rb` with a leading `discourse-` removed. Words are split on space,
  `-` and `_`; first letter capitalized, the rest kept as written:
  `Horizon`, `DiscoverySidebar`, `Chat`, `Ai` (from `discourse-ai`), `Reactions`.
- **Component** (optional): the extension's own component, derived like §5.1 from its
  `components/` path: `--p-Chat-ChatMessage-…`.
- Extensions read public `--d-sys-` / `--d-comp-` tokens and may override them (globally
  or in a scope). They do not define names under `--d-`.
- Bundled plugins count as plugins: chat's `--d-chat-input-*` becomes `--p-Chat-…`.

## 7 · Declaration and modes

- System tokens are declared on `:root` (settled in practice).
- All component tokens are declared on `:root` too (settled 2026-10-06), so that a theme
  can override any public token with a single `:root` block, and so an agent knows where
  to look. Scoped overrides on component selectors stay allowed.
- Light/dark is never in a name (proposed): values use `light-dark()` or are swapped per
  color scheme. `--d-sys-color-text-default` is one name in both modes.

## 8 · Example lists

### 8.1 System tier (proposed complete set)

**Color, text**
```
--d-sys-color-text-default
--d-sys-color-text-muted
--d-sys-color-text-faint
--d-sys-color-text-default-disabled
--d-sys-color-text-inverse
--d-sys-color-text-link
--d-sys-color-text-link-hovered
--d-sys-color-text-link-visited
--d-sys-color-text-accent
--d-sys-color-text-accent-bold
--d-sys-color-text-danger
--d-sys-color-text-success
--d-sys-color-text-warning
--d-sys-color-text-info
```

**Color, icon**
```
--d-sys-color-icon-default
--d-sys-color-icon-muted
--d-sys-color-icon-faint
--d-sys-color-icon-inverse
--d-sys-color-icon-accent
--d-sys-color-icon-danger
--d-sys-color-icon-success
--d-sys-color-icon-warning
--d-sys-color-icon-info
--d-sys-color-icon-love
```

**Color, background**
```
--d-sys-color-background-default
--d-sys-color-background-default-hovered
--d-sys-color-background-default-pressed
--d-sys-color-background-default-selected
--d-sys-color-background-default-selected-hovered
--d-sys-color-background-raised
--d-sys-color-background-sunken
--d-sys-color-background-overlay
--d-sys-color-background-input
--d-sys-color-background-input-disabled
--d-sys-color-background-inverse
--d-sys-color-background-backdrop
--d-sys-color-background-highlight
--d-sys-color-background-accent
--d-sys-color-background-accent-hovered
--d-sys-color-background-accent-pressed
--d-sys-color-background-accent-subtlest
--d-sys-color-background-accent-subtle
--d-sys-color-background-accent-subtle-hovered
--d-sys-color-background-accent-bold
--d-sys-color-background-accent-bold-hovered
--d-sys-color-background-danger
--d-sys-color-background-danger-hovered
--d-sys-color-background-danger-subtle
--d-sys-color-background-danger-bold
--d-sys-color-background-success
--d-sys-color-background-success-subtle
--d-sys-color-background-warning-subtle
--d-sys-color-background-info-subtle
--d-sys-color-background-love-subtle
```

**Color, border and outline**
```
--d-sys-color-border-default
--d-sys-color-border-muted
--d-sys-color-border-strong
--d-sys-color-border-input
--d-sys-color-border-input-focused
--d-sys-color-border-input-invalid
--d-sys-color-border-accent
--d-sys-color-border-danger
--d-sys-color-border-success
--d-sys-color-border-warning
--d-sys-color-outline-default
--d-sys-color-outline-danger
```

**Font**
```
--d-sys-font-family-body
--d-sys-font-family-heading
--d-sys-font-family-monospace
--d-sys-font-size-2xs        (font-down-3)
--d-sys-font-size-xs         (font-down-2)
--d-sys-font-size-sm         (font-down-1)
--d-sys-font-size-md         (font-0)
--d-sys-font-size-lg         (font-up-1)
--d-sys-font-size-xl         (font-up-2)
--d-sys-font-size-2xl        (font-up-3)
--d-sys-font-size-3xl        (font-up-4)
--d-sys-font-size-4xl        (font-up-5)
--d-sys-font-size-5xl        (font-up-6)
--d-sys-font-weight-regular
--d-sys-font-weight-medium
--d-sys-font-weight-semibold
--d-sys-font-weight-bold
--d-sys-font-line-height-none     (line-height-small, 1)
--d-sys-font-line-height-heading  (line-height-medium, 1.2)
--d-sys-font-line-height-body     (line-height-large, 1.4)
--d-sys-font-line-height-prose    (cooked-line-height, 1.5)
--d-sys-font-letter-spacing-default
--d-sys-font-letter-spacing-heading
```

**Shadow**
```
--d-sys-shadow-overflow  (shadow-header, shadow-footer-nav): an edge where content scrolls under
--d-sys-shadow-raised    (shadow-card): lifted off the page
--d-sys-shadow-overlay   (shadow-dropdown, shadow-menu-panel): floating above content
--d-sys-shadow-dialog    (shadow-modal, shadow-composer): blocks the page
```

**Space** (4px steps, same counting as core's `--space-N` today)
```
--d-sys-space-gap-half ... --d-sys-space-gap-12
--d-sys-space-padding-half ... --d-sys-space-padding-12
--d-sys-space-margin-half ... --d-sys-space-margin-12
```

Spacing counts 4px units instead of using size words: spacing needs finer steps than
t-shirt sizes give (`lg` for 20px next to `md` for 16px reads wrong), and most larger
systems (Tailwind, Polaris, Atlassian, Primer) use numbers for spacing. Every current
value keeps a step.

| Step | px | Uses today | Replaces |
|---|---:|---:|---|
| `half` | 2 | 28 | `--space-half` |
| `1` | 4 | 259 | `--space-1` |
| `2` | 8 | 432 | `--space-2` |
| `3` | 12 | 131 | `--space-3` |
| `4` | 16 | 264 | `--space-4` |
| `5` | 20 | 32 | `--space-5` |
| `6` | 24 | 41 | `--space-6` |
| `7` | 28 | 1 | `--space-7` |
| `8` | 32 | 32 | `--space-8` |
| `9` | 36 | 8 | `--space-9` |
| `10` | 40 | 4 | `--space-10` |
| `11` | 44 | 0 | `--space-11` |
| `12` | 48 | 8 | `--space-12` |

**Size, border, outline, opacity, motion**
```
--d-sys-size-icon-sm / -md / -lg
--d-sys-size-avatar-xs / -sm / -md / -lg / -xl
--d-sys-size-control-sm / -md / -lg
--d-sys-size-container-sm    (topic-body-width)
--d-sys-size-container-md    (d-max-width)
--d-sys-border-radius-sm     (token-radius-small, 2px)
--d-sys-border-radius-md     (d-border-radius, 4px)
--d-sys-border-radius-lg     (d-border-radius-large, 8px)
--d-sys-border-radius-full   (d-border-radius-pill, token-radius-full)
--d-sys-border-width-sm      (1px)
--d-sys-border-width-md      (2px)
--d-sys-border-style-default
--d-sys-outline-width-default
--d-sys-outline-offset-default
--d-sys-outline-style-default
--d-sys-opacity-disabled
--d-sys-opacity-backdrop
--d-sys-motion-duration-sm
--d-sys-motion-duration-md
--d-sys-motion-duration-lg
--d-sys-motion-easing-standard
--d-sys-motion-easing-enter
--d-sys-motion-easing-exit
```

### 8.2 Component tier (real components, real current names)

**DButton** (`ui-kit/d-button.gts`, ~50 tokens today)
```
--d-comp-DButton-color-background-default            (--d-button-default-bg-color)
--d-comp-DButton-color-background-default-hovered    (--d-button-default-bg-color--hover)
--d-comp-DButton-color-text-primary                  (--d-button-primary-text-color)
--d-comp-DButton-color-icon-primary-hovered          (--d-button-primary-icon-color--hover)
--d-comp-DButton-color-background-danger-hovered     (--d-button-danger-bg-color--hover)
--d-comp-DButton-color-text-flat-disabled            (--d-button-flat-text-color--disabled)
--d-comp-DButton-color-border-success                (--d-button-success-border)
--d-comp-DButton-border-radius                       (--d-button-border-radius)
--d-comp-DButton-motion-transition                   (--d-button-transition)
```

**Sidebar family**
```
--d-comp-Sidebar-size-inline                         (--d-sidebar-width)
--d-comp-Sidebar-color-background                    (--d-sidebar-background)
--d-comp-Sidebar-color-border                        (--d-sidebar-border-color)
--d-comp-Sidebar-motion-duration                     (--d-sidebar-animation-time)
--d-comp-Sidebar-motion-easing                       (--d-sidebar-animation-ease)
--d-comp-SidebarSectionLink-color-text               (--d-sidebar-link-color)
--d-comp-SidebarSectionLink-color-background-current (--d-sidebar-active-background)
--d-comp-SidebarSectionLink-font-weight-current      (--d-sidebar-active-font-weight)
--d-comp-SidebarSectionLink-size-block               (--d-sidebar-row-height)
--d-comp-SidebarSectionLink-space-padding-inline     (--d-sidebar-row-horizontal-padding)
--d-comp-SidebarSectionLinkPrefix-size-inline       (--d-sidebar-section-link-prefix-width; own file)
--d-comp-SidebarSectionLink-space-gap                (--d-sidebar-section-link-prefix-margin-right; used as gap)
```

**Topic list, header, post menu, modal, toggle switch**
```
--d-comp-TopicListHeader-color-text                  (--d-topic-list-header-text-color)
--d-comp-TopicListHeader-color-background            (--d-topic-list-header-background-color)
--d-comp-TopicListItem-color-text-read               (--title-color--read)
--d-comp-TopicListItem-color-background-visited      (Horizon: --topic-list-item-background-color--visited)
--d-comp-HeaderHomeLogo-size-block                   (--d-logo-height)
--d-comp-PostMenu-button-color-background-hovered    (--d-post-control-background--hover)
--d-comp-PostMenu-button-color-icon                  (--d-post-control-icon-color)
--d-comp-DModal-size-max-inline                      (--modal-max-width)
--d-comp-DToggleSwitch-size-inline                   (--toggle-switch-width)
--d-comp-DToggleSwitch-size-block                    (--toggle-switch-height)
```

**Patterns (no component file)**
```
--d-comp-Input-color-background-disabled             (--d-input-bg-color--disabled)
--d-comp-Input-border-radius                         (--d-input-border-radius)
--d-comp-NavPills-color-text-current                 (--d-nav-color--active)
--d-comp-NavPills-underline-size-block               (--d-nav-underline-height)
--d-comp-Table-color-border                          (--table-border-color)
```

### 8.3 Extension tier

```
--t-Horizon-color-background-raised                  (theme-wide surface)
--t-Horizon-TopicCard-shadow                         (--topic-card-shadow)
--tc-DiscoverySidebar-size-inline
--tc-DiscoverySidebar-color-background
--p-Chat-ChatComposer-color-background               (--d-chat-input-bg-color)
--p-Chat-ChatComposer-color-border                   (--d-chat-input-border-color)
--p-Chat-ChatHeader-size-block                       (--chat-header-offset, if it is a height)
--p-Poll-bar-color-background                        (--poll-bar-color)
--p-Poll-bar-color-background-selected               (--poll-bar-color--chosen)
--p-Ai-color-background-success                      (--d-sentiment-report-positive-rgb; no -rgb twin, see §4.3)
```


## 9 · Open questions

Only questions the draft does not answer yet.

| Topic | Situation | To decide |
|---|---|---|
| Base layer | Which prefix the palette and raw scales get, and whether they are exposed as custom properties at all. | Whatever it becomes, `--primary` and the other old names keep resolving as aliases. |
| Strength gaps | Danger has `-medium` (14 uses) and `-low-mid` (8 uses), which have no strength step. | Map them to `subtle` or the base, or add a step. |
| Runtime values | JavaScript writes about 15 variables while the page runs: layout measurements (`--header-offset`, `--composer-height`), per-element values (`--slider-x`) and category colors (`--category-badge-color`). They are not design decisions and themes cannot override them, so they stay outside the token scheme. | A dedicated prefix such as `--d-rt-` would only be needed to recognize them without the list. |
| Component kinds | The checker accepts any word as a component kind (`DButton` `primary`), so typos pass. | List each component's kinds in `vocabulary.json` for the checker and lint rule. |
