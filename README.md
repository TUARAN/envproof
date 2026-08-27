# envproof

> Your `.env.example` worked once. Does it still match the code?

`envproof` scans actual environment-variable usage and compares it with `.env.example`. It catches missing onboarding variables and stale documentation before your users do.

```text
$ npx github:TUARAN/envproof

  envproof  .env.example
  ────────────────────────────────────────────────────────
  ✓ 7 documented and used
  ✗ STRIPE_WEBHOOK_SECRET        missing  src/billing.ts:18
  ? OLD_REDIS_HOST               documented but unused

  Drift found.
```

## Use

```bash
npx github:TUARAN/envproof             # human-readable, exits 1 on drift
npx github:TUARAN/envproof . --json    # CI/editor integration
npx github:TUARAN/envproof --no-fail   # audit without failing
```

Recognizes common JavaScript/TypeScript, Python, Go, Rust, Java, Deno and shell access patterns. It never reads `.env` values, never uploads code, and has zero dependencies.

## How it evolves

Found a missed access pattern or false positive? Submit a secret-free **Environment-variable detection miss** issue. Each accepted example becomes a synthetic regression fixture, runs weekly across supported Node versions, and feeds a human-reviewed release PR. See [MAINTENANCE.md](MAINTENANCE.md).

## 中文

`envproof` 扫描代码里真实使用的环境变量，对比 `.env.example`，找出“代码需要但示例没写”和“示例还写着但代码已不用”的变量。特别适合在 CI 中防止新成员按 README 配置后仍然跑不起来。

```bash
npx github:TUARAN/envproof
```

## Development

```bash
npm test
```

MIT © 2026 TUARAN
