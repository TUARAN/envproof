# envproof

> Your `.env.example` worked once. Does it still match the code?

`envproof` scans actual environment-variable usage and compares it with `.env.example`. It catches missing onboarding variables and stale documentation before your users do.

```text
$ npx envproof

  envproof  .env.example
  ────────────────────────────────────────────────────────
  ✓ 7 documented and used
  ✗ STRIPE_WEBHOOK_SECRET        missing  src/billing.ts:18
  ? OLD_REDIS_HOST               documented but unused

  Drift found.
```

## Use

```bash
npx envproof             # human-readable, exits 1 on drift
npx envproof . --json    # CI/editor integration
npx envproof --no-fail   # audit without failing
```

Recognizes common JavaScript/TypeScript, Python, Go, Rust, Java, Deno and shell access patterns. It never reads `.env` values, never uploads code, and has zero dependencies.

## 中文

`envproof` 扫描代码里真实使用的环境变量，对比 `.env.example`，找出“代码需要但示例没写”和“示例还写着但代码已不用”的变量。特别适合在 CI 中防止新成员按 README 配置后仍然跑不起来。

```bash
npx envproof
```

## Development

```bash
npm test
```

MIT © 2026 TUARAN
