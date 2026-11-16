# How to write a review finding

A finding is useful when the author can act on it without asking a question.

## One finding

```
[Major] tenant id taken from the request body
  src/orders/export.ts:42, src/orders/export.ts:77, src/reports/daily.ts:15
  The export query filters by `body.tenantId`. A signed-in user of tenant A who sends
  `tenantId: B` receives B's orders.
  Evidence: test `export rejects foreign tenant` (scratch) fails: 200 with 14 rows instead of 403.
  Fix: take the tenant from the session (`ctx.tenant.id`) and drop the field from the body schema.
```

- **Severity** first, then a **class name** of a few words: the reader should be able to search for the pattern.
- **Every place** of the class, as `file:line`.
- **What goes wrong** with a concrete input, not "may be unsafe".
- **Evidence**: the command and its output, a failing test, or the line of the task the code does not meet.
- **The smallest fix**. Not a rewrite of the module.

## Words

- Write what the code does, not what the author "forgot" or "should know".
- No "probably", "seems" without saying what you did not check. If you did not run it, say "not run".
- No praise and no blame. The "Confirmed" section says what is good, with evidence.

## Not a finding

- A preference with no effect on behaviour, safety or maintenance: mark it **Nit** or leave it out.
- A problem that exists before the change and is not made worse by it: list it once under "Outside this change".
- A rule of a style guide the project does not use.

## The project profile

The reviewer reads `.claude/review-profile.md` (or `REVIEW.md`) in the project. A short profile is enough:

```markdown
# Review profile
## Commands
lint: npm run lint · types: npm run typecheck · tests: npm test -- <path>
## Risky areas
billing/ (money), migrations/ (Postgres, zero-downtime deploys), auth/
## Multi-tenant
yes: every table has `tenant_id`; the tenant comes from the session only
## Conventions
money in integer minor units; no floats; ledger entries are append-only
## Decisions
we do not test generated clients in src/gen/
```
