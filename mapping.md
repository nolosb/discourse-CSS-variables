# Variable mapping (pilot)

Generated from `mapping.csv`; edit the CSV, not this file. Core `main` at `00961e09be3`.

| Type | Rows | Meaning |
|---|---:|---|
| [rename](#rename) | 120 | Same value, one target. |
| [merge](#merge) | 23 | One target, the value changes: needs a visual check. |
| [split](#split) | 33 | Stays in the base layer too, but each use moves to a new token; candidates in notes. |
| [drop](#drop) | 33 | Removed: unused, an `-rgb` twin, or replaced by another token (see notes). |
| [base](#base) | 35 | Stays in the base layer; nothing that uses it changes. |
| [open](#open) | 3 | Not covered by the scheme yet. |

## rename

| Old | New | File | Uses | Value | Notes |
|---|---|---|---:|---|---|
| `--d-button-border-radius` | `--d-comp-DButton-border-radius` | buttons.scss | 43 | `var(--d-border-radius)` |  |
| `--d-button-transition` | `--d-comp-DButton-motion-transition` | buttons.scss | 8 | `none` |  |
| `--d-button-default-text-color` | `--d-comp-DButton-color-text-default` | buttons.scss | 6 | `var(--primary)` |  |
| `--d-button-default-text-color--hover` | `--d-comp-DButton-color-text-default-hovered` | buttons.scss | 7 | `var(--secondary)` |  |
| `--d-button-default-bg-color` | `--d-comp-DButton-color-background-default` | buttons.scss | 4 | `var(--primary-low)` | Stays a DButton token (themes change button kinds separately); its value becomes var(--d-sys-color-background-neutral). |
| `--d-button-default-bg-color--hover` | `--d-comp-DButton-color-background-default-hovered` | buttons.scss | 4 | `var(--primary-medium)` |  |
| `--d-button-default-icon-color` | `--d-comp-DButton-color-icon-default` | buttons.scss | 6 | `var(--primary-high)` |  |
| `--d-button-default-icon-color--hover` | `--d-comp-DButton-color-icon-default-hovered` | buttons.scss | 2 | `var(--primary-low)` |  |
| `--d-button-primary-text-color` | `--d-comp-DButton-color-text-primary` | buttons.scss | 5 | `var(--secondary)` |  |
| `--d-button-primary-text-color--hover` | `--d-comp-DButton-color-text-primary-hovered` | buttons.scss | 3 | `var(--secondary)` |  |
| `--d-button-primary-bg-color` | `--d-comp-DButton-color-background-primary` | buttons.scss | 2 | `var(--tertiary)` |  |
| `--d-button-primary-bg-color--hover` | `--d-comp-DButton-color-background-primary-hovered` | buttons.scss | 3 | `var(--tertiary-hover)` |  |
| `--d-button-primary-icon-color` | `--d-comp-DButton-color-icon-primary` | buttons.scss | 2 | `var(--secondary)` |  |
| `--d-button-primary-icon-color--hover` | `--d-comp-DButton-color-icon-primary-hovered` | buttons.scss | 2 | `var(--secondary)` |  |
| `--d-button-danger-text-color` | `--d-comp-DButton-color-text-danger` | buttons.scss | 1 | `var(--secondary)` |  |
| `--d-button-danger-text-color--hover` | `--d-comp-DButton-color-text-danger-hovered` | buttons.scss | 1 | `var(--secondary)` |  |
| `--d-button-danger-bg-color` | `--d-comp-DButton-color-background-danger` | buttons.scss | 1 | `var(--danger)` |  |
| `--d-button-danger-bg-color--hover` | `--d-comp-DButton-color-background-danger-hovered` | buttons.scss | 2 | `var(--danger-hover)` |  |
| `--d-button-danger-icon-color` | `--d-comp-DButton-color-icon-danger` | buttons.scss | 1 | `var(--danger-low)` |  |
| `--d-button-danger-icon-color--hover` | `--d-comp-DButton-color-icon-danger-hovered` | buttons.scss | 1 | `var(--danger-low)` |  |
| `--d-button-success-text-color` | `--d-comp-DButton-color-text-success` | buttons.scss | 1 | `var(--secondary)` |  |
| `--d-button-success-text-color--hover` | `--d-comp-DButton-color-text-success-hovered` | buttons.scss | 1 | `var(--secondary)` |  |
| `--d-button-success-bg-color` | `--d-comp-DButton-color-background-success` | buttons.scss | 1 | `var(--success)` |  |
| `--d-button-success-bg-color--hover` | `--d-comp-DButton-color-background-success-hovered` | buttons.scss | 1 | `var(--success-hover)` |  |
| `--d-button-success-icon-color` | `--d-comp-DButton-color-icon-success` | buttons.scss | 1 | `var(--success-low)` |  |
| `--d-button-success-icon-color--hover` | `--d-comp-DButton-color-icon-success-hovered` | buttons.scss | 1 | `var(--success-low)` |  |
| `--d-button-flat-text-color` | `--d-comp-DButton-color-text-flat` | buttons.scss | 0 | `var(--tertiary)` |  |
| `--d-button-flat-text-color--hover` | `--d-comp-DButton-color-text-flat-hovered` | buttons.scss | 1 | `var(--primary)` |  |
| `--d-button-flat-icon-color` | `--d-comp-DButton-color-icon-flat` | buttons.scss | 1 | `var(--primary-low-mid)` |  |
| `--d-button-flat-icon-color--hover` | `--d-comp-DButton-color-icon-flat-hovered` | buttons.scss | 1 | `var(--primary)` |  |
| `--d-button-flat-bg-color` | `--d-comp-DButton-color-background-flat` | buttons.scss | 1 | `transparent` |  |
| `--d-button-flat-bg-color--hover` | `--d-comp-DButton-color-background-flat-hovered` | buttons.scss | 2 | `var(--d-hover)` |  |
| `--d-button-flat-bg-color--focus` | `--d-comp-DButton-color-background-flat-focused` | buttons.scss | 1 | `var(--d-hover)` |  |
| `--d-button-flat-text-color--disabled` | `--d-comp-DButton-color-text-flat-disabled` | buttons.scss | 0 | `var(--primary)` |  |
| `--d-button-flat-close-text-color` | `--d-comp-DButton-color-text-close` | buttons.scss | 0 | `var(--primary-high)` |  |
| `--d-button-flat-close-bg-color` | `--d-comp-DButton-color-background-close` | buttons.scss | 3 | `transparent` |  |
| `--d-button-flat-close-icon-color` | `--d-comp-DButton-color-icon-close` | buttons.scss | 1 | `var(--primary-high)` |  |
| `--d-button-flat-close-icon-color--hover` | `--d-comp-DButton-color-icon-close-hovered` | buttons.scss | 2 | `var(--primary)` |  |
| `--d-button-transparent-text-color` | `--d-comp-DButton-color-text-transparent` | buttons.scss | 2 | `var(--primary)` |  |
| `--d-button-transparent-text-color--hover` | `--d-comp-DButton-color-text-transparent-hovered` | buttons.scss | 3 | `var(--tertiary-hover)` |  |
| `--d-button-transparent-icon-color` | `--d-comp-DButton-color-icon-transparent` | buttons.scss | 1 | `var(--primary-high)` |  |
| `--d-button-transparent-icon-color--hover` | `--d-comp-DButton-color-icon-transparent-hovered` | buttons.scss | 0 | `var(--tertiary-hover)` |  |
| `--token-color-text-default` | `--d-sys-color-text-default` | tokens.scss | 14 | `var(--primary-900)` |  |
| `--token-color-text-subtle` | `--d-sys-color-text-muted` | tokens.scss | 21 | `var(--primary-800)` |  |
| `--token-color-text-subtlest` | `--d-sys-color-text-faint` | tokens.scss | 1 | `var(--primary-600)` |  |
| `--token-color-text-accent` | `--d-sys-color-text-accent` | tokens.scss | 1 | `light-dark( var(--tertiary-800), var(--tertiary-300) )` |  |
| `--token-color-text-accent-bolder` | `--d-sys-color-text-accent-bold` | tokens.scss | 0 | `light-dark( var(--tertiary-900), var(--tertiary-200) )` |  |
| `--token-color-text-inverse` | `--d-sys-color-text-inverse` | tokens.scss | 4 | `light-dark(var(--secondary), var(--primary))` |  |
| `--token-color-icon-default` | `--d-sys-color-icon-default` | tokens.scss | 3 | `var(--primary-800)` |  |
| `--token-color-icon-subtle` | `--d-sys-color-icon-muted` | tokens.scss | 2 | `var(--primary-500)` |  |
| `--token-color-icon-subtlest` | `--d-sys-color-icon-faint` | tokens.scss | 1 | `var(--primary-400)` |  |
| `--token-color-icon-danger` | `--d-sys-color-icon-danger` | tokens.scss | 2 | `var(--danger)` |  |
| `--token-color-border-input` | `--d-sys-color-border-input` | tokens.scss | 1 | `var(--primary-300)` |  |
| `--token-color-border-default` | `--d-sys-color-border-default` | tokens.scss | 13 | `var(--primary-low)` | Same value as --content-border-color. |
| `--token-color-border-focused` | `--d-sys-color-border-input-focused` | tokens.scss | 16 | `var(--tertiary)` | Check the 16 uses are all inputs. |
| `--token-color-border-accent` | `--d-sys-color-border-accent` | tokens.scss | 2 | `var(--tertiary-400)` |  |
| `--token-color-surface` | `--d-sys-color-background-default` | tokens.scss | 6 | `var(--secondary)` |  |
| `--token-color-surface-pressed` | `--d-sys-color-background-default-pressed` | tokens.scss | 6 | `var(--primary-200)` |  |
| `--token-color-surface-focused` | `--d-sys-color-background-default-focused` | tokens.scss | 1 | `var(--primary-300)` |  |
| `--token-color-background-input` | `--d-sys-color-background-input` | tokens.scss | 6 | `var(--secondary)` |  |
| `--token-color-surface-selected` | `--d-sys-color-background-default-selected` | tokens.scss | 4 | `var(--d-selected)` | Same value as --d-selected. |
| `--token-color-background-accent-subtlest` | `--d-sys-color-background-accent-subtlest` | tokens.scss | 4 | `var(--tertiary-200)` | tertiary-200, 87%. |
| `--token-color-background-accent-subtlest-hovered` | `--d-sys-color-background-accent-subtlest-hovered` | tokens.scss | 0 | `var(--tertiary-300)` | Unused. |
| `--token-color-background-accent-subtlest-pressed` | `--d-sys-color-background-accent-subtlest-pressed` | tokens.scss | 0 | `var(--tertiary-400)` | Unused. |
| `--token-color-background-accent-subtle` | `--d-sys-color-background-accent-subtle` | tokens.scss | 2 | `light-dark( var(--tertiary-600), var(--tertiary) )` |  |
| `--token-color-background-accent-subtle-hovered` | `--d-sys-color-background-accent-subtle-hovered` | tokens.scss | 0 | `var(--tertiary-700)` | Unused. |
| `--token-color-background-accent-subtle-pressed` | `--d-sys-color-background-accent-subtle-pressed` | tokens.scss | 0 | `var(--tertiary-800)` | Unused. |
| `--token-color-background-accent-bolder` | `--d-sys-color-background-accent` | tokens.scss | 8 | `var(--tertiary)` | Value is --tertiary, the base step, not bold. |
| `--token-border-width` | `--d-sys-border-width-sm` | tokens.scss | 3 | `1px` |  |
| `--token-radius-small` | `--d-sys-border-radius-sm` | tokens.scss | 7 | `2px` |  |
| `--token-radius-normal` | `--d-sys-border-radius-md` | tokens.scss | 11 | `4px` |  |
| `--token-radius-large` | `--d-sys-border-radius-lg` | tokens.scss | 1 | `8px` |  |
| `--token-radius-full` | `--d-sys-border-radius-full` | tokens.scss | 5 | `9999px` |  |
| `--token-font-weight-bold` | `--d-sys-font-weight-bold` | tokens.scss | 4 | `650` |  |
| `--token-font-weight-semibold` | `--d-sys-font-weight-semibold` | tokens.scss | 12 | `600` |  |
| `--token-font-weight-medium` | `--d-sys-font-weight-medium` | tokens.scss | 0 | `500` |  |
| `--token-font-weight-regular` | `--d-sys-font-weight-regular` | tokens.scss | 3 | `normal` |  |
| `--d-selected` | `--d-sys-color-background-default-selected` | color_definitions.scss | 36 | `#{$selected}` |  |
| `--d-selected-text-color` | `--d-sys-color-text-default-selected` | color_definitions.scss | 10 | `var(--primary)` |  |
| `--d-selected-hover` | `--d-sys-color-background-default-selected-hovered` | color_definitions.scss | 1 | `#{$selected-hover}` |  |
| `--highlight-bg` | `--d-sys-color-background-highlight` | color_definitions.scss | 27 | `#{$highlight-bg}` | Also the warning-subtle value. |
| `--danger-low` | `--d-sys-color-background-danger-subtlest` | color_definitions.scss | 58 | `#{$danger-low}` | 90%. Also the icon color of danger buttons (DButton token). |
| `--danger-low-mid` | `--d-sys-color-background-danger-subtle` | color_definitions.scss | 12 | `#{$danger-low-mid}` | 50% with 70% opacity. |
| `--danger-hover` | `--d-sys-color-background-danger-hovered` | color_definitions.scss | 6 | `#{$danger-hover}` |  |
| `--success-very-low` | `--d-sys-color-background-success-subtlest` | color_definitions.scss | 1 | `#{$success-very-low}` | 90%. |
| `--success-medium` | `--d-sys-color-background-success-subtle` | color_definitions.scss | 7 | `#{$success-medium}` | 50%. |
| `--success-hover` | `--d-sys-color-background-success-hovered` | color_definitions.scss | 4 | `#{$success-hover}` |  |
| `--love-low` | `--d-sys-color-background-love-subtlest` | color_definitions.scss | 4 | `#{$love-low}` |  |
| `--wiki` | `--d-comp-PostMetaData-wiki-color-text` | color_definitions.scss | 2 | `#{$wiki}` | Part of PostMetaData: one rule styles the wiki edit indicator and the last-wiki-edit date (two child components). Value is the CSS keyword green; see core fixes. |
| `--hljs-attr` | `--d-comp-CodeBlock-attr-color-text` | color_definitions.scss | 2 | `#{$hljs-attr}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-attribute` | `--d-comp-CodeBlock-attribute-color-text` | color_definitions.scss | 2 | `#{$hljs-attribute}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-addition` | `--d-comp-CodeBlock-addition-color-text` | color_definitions.scss | 1 | `#{$hljs-addition}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-bg` | `--d-comp-CodeBlock-color-background` | color_definitions.scss | 1 | `#{$hljs-bg}` | Code block background (pattern CodeBlock). |
| `--inline-code-bg` | `--d-comp-InlineCode-color-background` | color_definitions.scss | 1 | `#{$inline-code-bg}` | Inline code background (pattern InlineCode). |
| `--hljs-comment` | `--d-comp-CodeBlock-comment-color-text` | color_definitions.scss | 3 | `#{$hljs-comment}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-deletion` | `--d-comp-CodeBlock-deletion-color-text` | color_definitions.scss | 1 | `#{$hljs-deletion}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-keyword` | `--d-comp-CodeBlock-keyword-color-text` | color_definitions.scss | 1 | `#{$hljs-keyword}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-title` | `--d-comp-CodeBlock-title-color-text` | color_definitions.scss | 2 | `#{$hljs-title}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-name` | `--d-comp-CodeBlock-name-color-text` | color_definitions.scss | 3 | `#{$hljs-name}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-punctuation` | `--d-comp-CodeBlock-punctuation-color-text` | color_definitions.scss | 1 | `#{$hljs-punctuation}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-symbol` | `--d-comp-CodeBlock-symbol-color-text` | color_definitions.scss | 1 | `#{$hljs-symbol}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-variable` | `--d-comp-CodeBlock-variable-color-text` | color_definitions.scss | 1 | `#{$hljs-variable}` | highlight.js token type as a part of CodeBlock. |
| `--hljs-string` | `--d-comp-CodeBlock-string-color-text` | color_definitions.scss | 2 | `#{$hljs-string}` | highlight.js token type as a part of CodeBlock. |
| `--d-link-color` | `--d-sys-color-text-link` | color_definitions.scss | 3 | `var(--tertiary)` |  |
| `--title-color--read` | `--d-comp-TopicListItem-color-text-read` | color_definitions.scss | 3 | `var(--primary-medium)` |  |
| `--content-border-color` | `--d-sys-color-border-default` | color_definitions.scss | 320 | `var(--primary-low)` | 320 uses. |
| `--table-border-color` | `--d-comp-Table-color-border` | color_definitions.scss | 7 | `var(--content-border-color)` |  |
| `--d-badge-card-background-color` | `--d-comp-DBadgeCard-color-background` | color_definitions.scss | 1 | `var(--secondary)` | ui-kit/d-badge-card.gjs. |
| `--mention-background-color` | `--d-sys-color-background-neutral` | color_definitions.scss | 1 | `var(--primary-low)` | No component token: the mention mixin (mentions and hashtags) uses the system neutral fill. |
| `--title-color` | `--d-sys-color-text-default` | color_definitions.scss | 1 | `var(--primary)` | Same value as --primary; 1 use. |
| `--title-color--header` | `--d-comp-Header-color-text-default` | color_definitions.scss | 1 | `var(--header_primary)` | Same value as --header_primary. |
| `--shadow-modal` | `--d-sys-shadow-dialog` | color_definitions.scss | 1 | `0 8px 60px rgba(0, 0, 0, #{$shadow-opacity-modal})` |  |
| `--shadow-card` | `--d-sys-shadow-raised` | color_definitions.scss | 18 | `0 4px 14px rgba(0, 0, 0, #{$shadow-opacity-card})` |  |
| `--shadow-dropdown` | `--d-sys-shadow-overlay` | color_definitions.scss | 30 | `0 2px 12px 0 rgba(0, 0, 0, #{$shadow-opacity-dropdown})` | menu-panel.scss redefines it locally with another value. |
| `--shadow-menu-panel` | `--d-sys-shadow-overlay` | color_definitions.scss | 1 | `var(--shadow-dropdown)` |  |
| `--shadow-header` | `--d-sys-shadow-overflow` | color_definitions.scss | 3 | `0 0 0 1px var(--content-border-color)` | The hairline is the overflow value. |
| `--float-kit-arrow-stroke-color` | `--d-comp-FloatKit-color-border` | color_definitions.scss | 0 | `var(--primary-low)` | Pattern FloatKit: menu and tooltip boxes and their arrow read it, so they change together. Default var(--d-sys-color-border-default). User tips set it in their scope. |
| `--float-kit-arrow-fill-color` | `--d-comp-FloatKit-color-background` | color_definitions.scss | 0 | `var(--secondary)` | Pattern FloatKit: menu and tooltip boxes and their arrow read it, so they change together. Default var(--d-sys-color-background-overlay). User tips set it in their scope. |
| `--topic-timeline-border-color` | `--d-comp-TopicTimeline-color-border` | color_definitions.scss | 1 | `#{$tertiary-low-or-tertiary-high}` |  |
| `--topic-timeline-handle-color` | `--d-comp-TopicTimelineScroller-color-background` | color_definitions.scss | 1 | `light-dark( var(--tertiary-400), var(--tertiary) )` | Handle lives in topic-timeline/scroller.gjs; check. |

## merge

| Old | New | File | Uses | Value | Notes |
|---|---|---|---:|---|---|
| `--d-button-border` | `--d-comp-DButton-border-width` | buttons.scss | 11 | `1px solid transparent` | Split: width becomes border-width (1px); the color becomes --d-comp-DButton-color-border (transparent), which the kind tokens default to. Style (solid) stays in the CSS. |
| `--d-button-default-border` | `--d-comp-DButton-color-border-default` | buttons.scss | 5 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-default-border--hover` | `--d-comp-DButton-color-border-default-hovered` | buttons.scss | 1 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-primary-border` | `--d-comp-DButton-color-border-primary` | buttons.scss | 2 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-primary-border--hover` | `--d-comp-DButton-color-border-primary-hovered` | buttons.scss | 1 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-danger-border` | `--d-comp-DButton-color-border-danger` | buttons.scss | 1 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-danger-border--hover` | `--d-comp-DButton-color-border-danger-hovered` | buttons.scss | 1 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-success-border` | `--d-comp-DButton-color-border-success` | buttons.scss | 1 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--d-button-success-border--hover` | `--d-comp-DButton-color-border-success-hovered` | buttons.scss | 1 | `var(--d-button-border)` | Holds only the color now: defaults to var(--d-comp-DButton-color-border). The CSS composes width, solid and this color. |
| `--token-color-surface-hovered` | `--d-sys-color-background-default-hovered` | tokens.scss | 18 | `var(--primary-100)` | Merges with --d-hover (different value). |
| `--token-color-background-accent-subtler` | `--d-sys-color-background-accent-subtle` | tokens.scss | 2 | `var(--tertiary-400)` | tertiary-400, 74%: falls in the subtle band. |
| `--d-hover` | `--d-sys-color-background-default-hovered` | color_definitions.scss | 53 | `#{$hover}` | Merges with --token-color-surface-hovered (different value). |
| `--tertiary-very-low` | `--d-sys-color-background-accent-subtlest` | color_definitions.scss | 40 | `#{$tertiary-very-low}` | 90%, subtlest band. |
| `--tertiary-low` | `--d-sys-color-background-accent-subtlest` | color_definitions.scss | 99 | `#{$tertiary-low}` | 85%, subtlest band; info backgrounds also use it (info-subtlest). |
| `--tertiary-medium` | `--d-sys-color-background-accent-subtle` | color_definitions.scss | 31 | `#{$tertiary-medium}` | 50%; matches the subtle token in light mode only. |
| `--tertiary-high` | `--d-sys-color-background-accent` | color_definitions.scss | 25 | `#{$tertiary-high}` | 20%, base band. |
| `--success-low` | `--d-sys-color-background-success-subtlest` | color_definitions.scss | 31 | `#{$success-low}` | 80%, subtlest band. |
| `--input-border-color` | `--d-sys-color-border-input` | color_definitions.scss | 7 | `var(--primary-400)` | primary-400 vs --token-color-border-input primary-300. |
| `--metadata-color` | `--d-sys-color-text-muted` | color_definitions.scss | 1 | `var(--primary-medium)` | Meta text is muted (settled rule); value moves from primary-medium. |
| `--excerpt-color` | `--d-sys-color-text-muted` | color_definitions.scss | 1 | `var(--primary-high)` | primary-high vs muted's primary-800. |
| `--shadow-composer` | `--d-sys-shadow-dialog` | color_definitions.scss | 2 | `0 -1px 40px rgba(0, 0, 0, #{$shadow-opacity-composer})` | 0 -1px 40px vs modal's 0 8px 60px. |
| `--shadow-footer-nav` | `--d-sys-shadow-overflow` | color_definitions.scss | 3 | `0 0 2px 0 rgba(0, 0, 0, #{$shadow-opacity-footer-nav})` | Loses its 2px blur; open question. |
| `--shadow-docked-composer` | `--d-sys-shadow-overflow` | color_definitions.scss | 1 | `0 4px 30px rgb(0, 0, 0, 0.15)` | Defined in core, used only by the AI plugin. |

## split

| Old | New | File | Uses | Value | Notes |
|---|---|---|---:|---|---|
| `--primary` |  | color_definitions.scss | 483 | `#{$primary}` | Target depends on each use: color-text-default, color-icon-default. Stays as a base alias. |
| `--secondary` |  | color_definitions.scss | 474 | `#{$secondary}` | Target depends on each use: color-background-default, color-text-inverse, color-icon-inverse. Stays as a base alias. |
| `--tertiary` |  | color_definitions.scss | 491 | `#{$tertiary}` | Target depends on each use: color-text-link, color-background-accent, color-border-accent, color-icon-accent. Stays as a base alias. |
| `--quaternary` |  | color_definitions.scss | 5 | `#{$quaternary}` | Color scheme input with no shared meaning, stays as a base alias. The themes grid placeholder keeps the raw scheme color; the engagement chart (admin dashboard), the ad plugin and the subscriptions plugin get their own tokens in the full mapping. |
| `--danger` |  | color_definitions.scss | 254 | `#{$danger}` | Target depends on each use: color-text-danger, color-icon-danger, color-background-danger, color-border-danger. Stays as a base alias. |
| `--success` |  | color_definitions.scss | 138 | `#{$success}` | Target depends on each use: color-text-success, color-icon-success, color-background-success, color-border-success. Stays as a base alias. |
| `--love` |  | color_definitions.scss | 16 | `#{$love}` | Target depends on each use: color-icon-love, color-background-love. Stays as a base alias. |
| `--header_background` |  | color_definitions.scss | 12 | `#{$header_background}` | Header color scheme input, stays as a base alias. Uses map to --d-comp-Header-color-background; footer nav, crawler layout, publish page, mini profiler and avatar rings copy the header and read that token. |
| `--header_primary` |  | color_definitions.scss | 11 | `#{$header_primary}` | Header color scheme input, stays as a base alias. Uses map to --d-comp-Header-color-text-default, --d-comp-Header-color-icon-default-hovered. |
| `--header_primary-low` |  | color_definitions.scss | 6 | `#{$header_primary-low}` | Header color scheme input, stays as a base alias. Uses map to --d-comp-Header-color-border-default; tagging and the mini profiler also use it as a background. |
| `--header_primary-low-mid` |  | color_definitions.scss | 6 | `#{$header_primary-low-mid}` | Header color scheme input, stays as a base alias. Uses map to --d-comp-Header-color-icon-default, --d-comp-Header-color-border-strong. |
| `--header_primary-medium` |  | color_definitions.scss | 10 | `#{$header_primary-medium}` | Header color scheme input, stays as a base alias. Uses map to --d-comp-Header-color-text-faint, --d-comp-Header-color-icon-default-pressed. |
| `--header_primary-high` |  | color_definitions.scss | 11 | `#{$header_primary-high}` | Header color scheme input, stays as a base alias. Uses map to --d-comp-Header-color-text-muted. |
| `--primary-very-low` |  | color_definitions.scss | 249 | `#{$primary-very-low}` | Target depends on each use: color-background-sunken, color-border-muted. Stays as a base alias. |
| `--primary-low` |  | color_definitions.scss | 448 | `#{$primary-low}` | Target depends on each use: color-border-default, color-background-neutral, color-background-default-pressed. Stays as a base alias. |
| `--primary-low-mid` |  | color_definitions.scss | 187 | `#{$primary-low-mid}` | Target depends on each use: color-text-default-disabled, color-border-strong, color-icon-faint. Stays as a base alias. |
| `--primary-medium` |  | color_definitions.scss | 773 | `#{$primary-medium}` | Target depends on each use: color-text-faint, color-icon-faint. Stays as a base alias. |
| `--primary-high` |  | color_definitions.scss | 381 | `#{$primary-high}` | Target depends on each use: color-text-muted, color-icon-muted. Stays as a base alias. |
| `--primary-very-high` |  | color_definitions.scss | 19 | `#{$primary-very-high}` | Target depends on each use: color-text-default. Stays as a base alias. |
| `--tertiary-hover` |  | color_definitions.scss | 30 | `#{$tertiary-hover}` | Target depends on each use: color-background-accent-hovered, color-text-link-hovered. |
| `--danger-medium` |  | color_definitions.scss | 22 | `#{$danger-medium}` | 30%, base band: color-text-danger, color-border-danger, color-background-danger. Light mode gets slightly darker. |
| `--primary-med-or-secondary-med` |  | color_definitions.scss | 43 | `#{$primary-med-or-secondary-med}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--primary-med-or-secondary-high` |  | color_definitions.scss | 11 | `#{$primary-med-or-secondary-high}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--primary-high-or-secondary-low` |  | color_definitions.scss | 18 | `#{$primary-high-or-secondary-low}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--primary-low-mid-or-secondary-high` |  | color_definitions.scss | 6 | `#{$primary-low-mid-or-secondary-high}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--primary-low-mid-or-secondary-low` |  | color_definitions.scss | 1 | `#{$primary-low-mid-or-secondary-low}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--highlight-low-or-medium` |  | color_definitions.scss | 4 | `#{$highlight-low-or-medium}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--tertiary-low-or-tertiary-high` |  | color_definitions.scss | 1 | `#{$tertiary-low-or-tertiary-high}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--tertiary-med-or-tertiary` |  | color_definitions.scss | 7 | `#{$tertiary-med-or-tertiary}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--secondary-or-primary` |  | color_definitions.scss | 5 | `#{$secondary-or-primary}` | Light/dark chooser: each use maps to a token whose value uses light-dark(). |
| `--gold` |  | color_definitions.scss | 2 | `#{$gold}` | Raw metal color stays as a base alias. Badge icon uses map to --d-comp-UserBadge-color-icon-gold (UserBadge kind gold); the admin dashboard trust-level labels borrow it and get their own tokens in the full mapping. |
| `--silver` |  | color_definitions.scss | 2 | `#{$silver}` | Raw metal color stays as a base alias. Badge icon uses map to --d-comp-UserBadge-color-icon-silver (UserBadge kind silver); the admin dashboard trust-level labels borrow it and get their own tokens in the full mapping. |
| `--bronze` |  | color_definitions.scss | 2 | `#{$bronze}` | Raw metal color stays as a base alias. Badge icon uses map to --d-comp-UserBadge-color-icon-bronze (UserBadge kind bronze); the admin dashboard trust-level labels borrow it and get their own tokens in the full mapping. |

## drop

| Old | New | File | Uses | Value | Notes |
|---|---|---|---:|---|---|
| `--token-color-background-accent-subtler-hovered` |  | tokens.scss | 0 | `var(--tertiary-500)` | Unused; subtler merges into subtle. |
| `--token-color-background-accent-subtler-pressed` |  | tokens.scss | 0 | `var(--tertiary-600)` | Unused; subtler merges into subtle. |
| `--token-color-background-accent-bolder-hovered` |  | tokens.scss | 0 | `var(--tertiary-high)` | Unused; value --tertiary-high is lighter than the base. |
| `--token-color-background-accent-bolder-pressed` |  | tokens.scss | 0 | `var(--tertiary-very-high)` | Unused; --tertiary-very-high is never defined. |
| `--header_background-rgb` |  | color_definitions.scss | 2 | `#{hexToRGB($header_background)}` | No -rgb twins: uses become color-mix(). |
| `--always-black-rgb` |  | color_definitions.scss | 13 | `0, 0, 0` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--primary-rgb` |  | color_definitions.scss | 15 | `#{hexToRGB($primary)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--primary-low-rgb` |  | color_definitions.scss | 3 | `#{hexToRGB($primary-low)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--primary-very-low-rgb` |  | color_definitions.scss | 1 | `#{hexToRGB($primary-very-low)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--secondary-rgb` |  | color_definitions.scss | 30 | `#{hexToRGB($secondary)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--tertiary-rgb` |  | color_definitions.scss | 16 | `#{hexToRGB($tertiary)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--highlight-rgb` |  | color_definitions.scss | 0 | `#{hexToRGB($highlight)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--success-rgb` |  | color_definitions.scss | 0 | `#{hexToRGB($success)}` | No -rgb twins: uses become color-mix() on the matching color token. |
| `--primary-or-primary-low-mid` |  | color_definitions.scss | 0 | `#{$primary-or-primary-low-mid}` | Unused light/dark chooser. |
| `--tertiary-or-tertiary-low` |  | color_definitions.scss | 0 | `#{$tertiary-or-tertiary-low}` | Unused light/dark chooser. |
| `--tertiary-or-white` |  | color_definitions.scss | 0 | `#{$tertiary-or-white}` | Unused light/dark chooser. |
| `--facebook-or-white` |  | color_definitions.scss | 0 | `#{$facebook-or-white}` | Unused light/dark chooser. |
| `--twitter-or-white` |  | color_definitions.scss | 0 | `#{$twitter-or-white}` | Unused light/dark chooser. |
| `--google` |  | color_definitions.scss | 0 | `#{$google}` | Unused brand color. |
| `--google-hover` |  | color_definitions.scss | 0 | `#{$google-hover}` | Unused brand color. |
| `--instagram` |  | color_definitions.scss | 0 | `#{$instagram}` | Unused brand color. |
| `--instagram-hover` |  | color_definitions.scss | 0 | `#{$instagram-hover}` | Unused brand color. |
| `--facebook-hover` |  | color_definitions.scss | 0 | `#{$facebook-hover}` | Unused brand color. |
| `--github-hover` |  | color_definitions.scss | 0 | `#{$github-hover}` | Unused brand color. |
| `--discord-hover` |  | color_definitions.scss | 0 | `#{$discord-hover}` | Unused brand color. |
| `--discourse_id-text` |  | color_definitions.scss | 1 | `var(--d-button-primary-text-color)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--discourse_id-text-hover` |  | color_definitions.scss | 1 | `var(--d-button-primary-text-color--hover)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--discourse_id-background` |  | color_definitions.scss | 2 | `var(--d-button-primary-bg-color)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--discourse_id-background-hover` |  | color_definitions.scss | 1 | `var(--d-button-primary-bg-color--hover)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--discourse_id-icon` |  | color_definitions.scss | 1 | `var(--d-button-primary-icon-color)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--discourse_id-icon-hover` |  | color_definitions.scss | 1 | `var(--d-button-primary-icon-color--hover)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--discourse_id-border` |  | color_definitions.scss | 1 | `var(--d-button-border)` | Points at DButton primary; the Discourse ID button uses DButton primary tokens, with a scoped override if a theme wants it different. |
| `--shadow-focus-danger` |  | color_definitions.scss | 0 | `0 0 6px 0 var(--danger)` | Unused. |

## base

| Old | New | File | Uses | Value | Notes |
|---|---|---|---:|---|---|
| `--scheme-type` |  | color_definitions.scss | 1 | `#{schemeType()}` | color-scheme keyword, not a design token. |
| `--highlight` |  | color_definitions.scss | 8 | `#{$highlight}` | Raw highlight color; backgrounds use --highlight-bg. |
| `--header_primary-very-high` |  | color_definitions.scss | 1 | `#{$header_primary-very-high}` | Header color scheme step, stays as a base alias; no header use, only the styleguide. |
| `--primary-50` |  | color_definitions.scss | 19 | `#{$primary-50}` | Numbered ramp; system tokens point at it. |
| `--primary-100` |  | color_definitions.scss | 32 | `#{$primary-100}` | Numbered ramp; system tokens point at it. |
| `--primary-200` |  | color_definitions.scss | 32 | `#{$primary-200}` | Numbered ramp; system tokens point at it. |
| `--primary-300` |  | color_definitions.scss | 54 | `#{$primary-300}` | Numbered ramp; system tokens point at it. |
| `--primary-400` |  | color_definitions.scss | 15 | `#{$primary-400}` | Numbered ramp; system tokens point at it. |
| `--primary-500` |  | color_definitions.scss | 34 | `#{$primary-500}` | Numbered ramp; system tokens point at it. |
| `--primary-600` |  | color_definitions.scss | 7 | `#{$primary-600}` | Numbered ramp; system tokens point at it. |
| `--primary-700` |  | color_definitions.scss | 20 | `#{$primary-700}` | Numbered ramp; system tokens point at it. |
| `--primary-800` |  | color_definitions.scss | 14 | `#{$primary-800}` | Numbered ramp; system tokens point at it. |
| `--primary-900` |  | color_definitions.scss | 13 | `#{$primary-900}` | Numbered ramp; system tokens point at it. |
| `--secondary-low` |  | color_definitions.scss | 7 | `#{$secondary-low}` | Uses need mapping per use. |
| `--secondary-medium` |  | color_definitions.scss | 7 | `#{$secondary-medium}` | Uses need mapping per use. |
| `--secondary-high` |  | color_definitions.scss | 11 | `#{$secondary-high}` | Uses need mapping per use. |
| `--secondary-very-high` |  | color_definitions.scss | 5 | `#{$secondary-very-high}` | Uses need mapping per use. |
| `--tertiary-25` |  | color_definitions.scss | 2 | `#{$tertiary-25}` | Numbered ramp; system tokens point at it. |
| `--tertiary-50` |  | color_definitions.scss | 8 | `#{$tertiary-50}` | Numbered ramp; system tokens point at it. |
| `--tertiary-100` |  | color_definitions.scss | 7 | `#{$tertiary-100}` | Numbered ramp; system tokens point at it. |
| `--tertiary-200` |  | color_definitions.scss | 5 | `#{$tertiary-200}` | Numbered ramp; system tokens point at it. |
| `--tertiary-300` |  | color_definitions.scss | 4 | `#{$tertiary-300}` | Numbered ramp; system tokens point at it. |
| `--tertiary-400` |  | color_definitions.scss | 7 | `#{$tertiary-400}` | Numbered ramp; system tokens point at it. |
| `--tertiary-500` |  | color_definitions.scss | 3 | `#{$tertiary-500}` | Numbered ramp; system tokens point at it. |
| `--tertiary-600` |  | color_definitions.scss | 3 | `#{$tertiary-600}` | Numbered ramp; system tokens point at it. |
| `--tertiary-700` |  | color_definitions.scss | 2 | `#{$tertiary-700}` | Numbered ramp; system tokens point at it. |
| `--tertiary-800` |  | color_definitions.scss | 3 | `#{$tertiary-800}` | Numbered ramp; system tokens point at it. |
| `--tertiary-900` |  | color_definitions.scss | 2 | `#{$tertiary-900}` | Numbered ramp; system tokens point at it. |
| `--quaternary-low` |  | color_definitions.scss | 1 | `#{$quaternary-low}` | Only the styleguide uses it. |
| `--blend-primary-secondary-5` |  | color_definitions.scss | 4 | `#{$blend-primary-secondary-5}` | Uses need mapping per use. |
| `--facebook` |  | color_definitions.scss | 1 | `#{$facebook}` | Brand color, fixed by the brand, not a design decision: base layer, not public. |
| `--cas` |  | color_definitions.scss | 2 | `#{$cas}` | Brand color, fixed by the brand, not a design decision: base layer, not public. |
| `--twitter` |  | color_definitions.scss | 4 | `#{$twitter}` | Brand color, fixed by the brand, not a design decision: base layer, not public. |
| `--github` |  | color_definitions.scss | 2 | `#{$github}` | Brand color, fixed by the brand, not a design decision: base layer, not public. |
| `--discord` |  | color_definitions.scss | 3 | `#{$discord}` | Brand color, fixed by the brand, not a design decision: base layer, not public. |

## open

| Old | New | File | Uses | Value | Notes |
|---|---|---|---:|---|---|
| `--highlight-low` |  | color_definitions.scss | 6 | `#{$highlight-low}` | Map by lightening like the other intents; formula not checked yet. |
| `--highlight-medium` |  | color_definitions.scss | 7 | `#{$highlight-medium}` | Map by lightening like the other intents; formula not checked yet. |
| `--highlight-high` |  | color_definitions.scss | 10 | `#{$highlight-high}` | Map by lightening like the other intents; formula not checked yet. |
