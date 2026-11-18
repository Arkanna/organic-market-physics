# Organic Market Physics

**What if sales behaved like a living organism instead of a funnel?**

An open-source playable research sandbox for emergent market interactions. Synthetic people and offers drift through a 2D world. Collisions can generate **draft-only** outreach preparation orders. Temporary immunity limits repeated contacts. Mutations change the movement rules.

**[Open the source and fork the project](https://github.com/Arkanna/organic-market-physics)**

> Experimental community demo. This version is independently packaged from the larger private Hermes Market Physics implementation and **does not include** the original Gmail, Pipedrive, CRM, inbox-wall, deployment or agent infrastructure.

## Play

**No install:** Download the repository ZIP using GitHub's **Code → Download ZIP**, extract it, and open `index.html` in a modern browser.

Or run a local server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. No account, keys, backend or build tools required.

To publish a one-click web demo, repository administrators can enable **GitHub Pages → Deploy from a branch → main / (root)** in GitHub Settings → Pages.

## How it works

- **Blue dots:** synthetic people; **orange objects:** offers.
- People and offers drift and bounce within a bounded 2D market.
- When they collide, the simulation generates an idempotent `prepare_outreach` order.
- Temporary immunity suppresses repeated orders.
- **Mutate physics** changes how randomly the particles move.
- **Export orders** downloads draft-only JSON. Nothing is transmitted or emailed.

This public sandbox simplifies the private system and is **not** a full reproduction of its actual physics and workflow.

## Hermes order protocol

See [docs/order-protocol.md](docs/order-protocol.md). The public simulator has no network calls. A third-party or private Hermes adapter may take **validated** exported orders and create internal *draft-preparation* requests. Production API credentials must stay server-side; sending outreach requires separate authorization.

## Fork, mutate, evolve

1. [Fork the repository](https://github.com/Arkanna/organic-market-physics/fork).
2. Change a single rule: motion, memory, immunity, attraction, repulsion or agent coordination.
3. Share a comparison, screenshot or short video with a pull request or [Mutation Proposal](https://github.com/Arkanna/organic-market-physics/issues/new/choose).
4. Add your variant to the [Evolution Registry](EVOLUTION.md).

The [weekly fork-discovery workflow](.github/workflows/community-forks.yml) can create an issue summarizing public forks and recent push activity. It may require GitHub Actions to be enabled, and does not automatically integrate changes.

## Roadmap

- [ ] Deterministic seeds and side-by-side physics tests
- [ ] Optional private adapter for Hermes draft preparation
- [ ] Formal order JSON schema and sandbox adapter tests
- [ ] Browser demo hosted by GitHub Pages
- [ ] Community mutation gallery

## Safety and licence

Only fictional people are included. No emails are sent. Never commit customer data, API tokens or private Hermes configurations. See [SECURITY.md](SECURITY.md).

Released under **[GNU AGPL v3.0](LICENSE)** (SPDX: `AGPL-3.0-only`). See [CONTRIBUTING.md](CONTRIBUTING.md). Forks and third-party variants do not have to submit pull requests back upstream; the community registry is voluntary.
