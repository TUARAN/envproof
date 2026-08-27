# Maintenance loop

envproof evolves from small, secret-free language fixtures.

1. A user submits a missed access pattern or false positive through the issue form.
2. A maintainer replaces all names and values with synthetic data and adds a regression test.
3. The scanner change must pass Node.js 20, 22, and 24 plus dogfooding against this repository.
4. Conventional commits feed a Release Please PR and changelog when a maintainer or scheduled Codex review starts a release cycle.
5. A human reviews and merges releases. Bots must not auto-merge or publish packages.

## Triage order

Prioritize secret exposure, crashes, false negatives in common frameworks, and false positives that block CI. New languages should arrive with representative positive and negative fixtures.

## Automation boundary

Scheduled agents may read public issues, add synthetic fixtures, improve deterministic detection, and open focused pull requests. They may not inspect real `.env` files, reproduce user secrets, merge their own PRs, publish to npm, or create credentials.
