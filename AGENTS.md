# Discourse CSS variable names: agent notes

Start from [`docs/vocabulary.json`](docs/vocabulary.json): every word a name can use.
How the words combine is explained slot by slot in [`docs/slots.html`](docs/slots.html).
Old core variables and their new names are in [`mapping.csv`](mapping.csv).

## Goals

1. **Consistency for agents.** One grammar for every token. An agent can build a name
   from intent ("muted text", "DButton primary background on hover") without searching.
2. **Performance for agents.** A small, closed vocabulary that fits in a few hundred lines
   of context (`docs/vocabulary.json`) and is cheap to validate.
3. **Transparency for reviewers.** A name shows its layer, its owner, its purpose and
   whether it is public, so a change can be judged without opening core CSS.

What follows from these goals:

- **Closed lists.** Every slot has a fixed word list, except parts, which are free words
  (known ones are listed). A word that is not on a list is a lint error, not a style choice.
- **Fixed order.** Slots may be omitted but never reordered.
- **Parseable without context.** Casing marks the owner, the lists mark everything else,
  so a name can be split into slots by a script, and by a reviewer, without knowing the
  CSS behind it.
