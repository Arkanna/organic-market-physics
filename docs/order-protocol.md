# Organic market order protocol v1

The public simulation produces a **request for preparation**, not authorization to contact a person. The UI never calls a live Hermes server.

Sample event:

```json
{
  "version": "1.0",
  "type": "prepare_outreach",
  "idempotency_key": "person-1:offer-3:0",
  "source": "organic-market-physics-demo",
  "created_at": "2026-11-18T00:00:00Z",
  "mode": "draft_only",
  "person": { "id": "person-1", "display_name": "Aster" },
  "offer": { "id": "offer-3", "name": "Partnership" },
  "context": { "trigger": "organic_collision", "simulation_day": 0.1 }
}
```

## Private adapter requirements

A private adapter can accept a validated order and translate it into a Hermes **prepare-draft** goal. Browser code must not hold API keys or call privileged endpoints directly.

1. Authenticate callers, validate input, and rate-limit.
2. Resolve only authorized pseudonymous identifiers to internal CRM records on the private server.
3. Respect consent, suppression lists, and local outreach requirements.
4. Store and enforce idempotency keys across restarts.
5. Create drafts or review tasks only. Sending requires an independent approval.
6. Log minimal metadata and exclude personal information from public diagnostics.

Use **Export orders** in the demo to download JSON and test third-party adapters.
