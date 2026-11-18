# Security and privacy

This public repository intentionally excludes production credentials, CRM adapters, Gmail integration and operational Hermes code.

- All people and offers in the demo are fictional.
- No requests are sent to third-party servers by the simulation.
- The only output is a locally generated draft-only JSON order export.
- Never commit client lists, personal email content, credentials, API keys or internal Hermes configurations.
- Do not connect an unauthenticated public simulation to a privileged Hermes endpoint.

A production integration must validate events, authenticate requesters, enforce idempotency, opt-outs and rate limits, and require a separate authorized process before sending any outreach. Please report security concerns privately to the repository maintainer rather than opening a public issue that exposes secrets.
