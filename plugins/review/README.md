# review — a plugin of the fntasy studio catalog

An independent code reviewer with fresh eyes. It reviews one change against its task, runs the
linter, type checker and tests of the affected packages, and returns **integrate** or
**return to the author** with findings tied to `file:line`. It works for any project, with or
without a user interface.

Русская версия: [README.ru.md](README.ru.md). Catalog: [fntasy studio](../../README.md).

## Install

```
/plugin marketplace add doossee/fntasy-studio
/plugin install review@fntasy-studio
```

From a shell: `claude plugin marketplace add doossee/fntasy-studio && claude plugin install review@fntasy-studio`.

| Adds | Called as |
|---|---|
| agent `code-reviewer` | `@agent-review:code-reviewer`, or Claude delegates to it when you ask for an independent review |
| `references/review-guide.md` | how to write one finding; the agent reads it |

Without the plugin system: `cp plugins/review/agents/code-reviewer.md your-project/.claude/agents/`.

## What changed since 0.1

New plugin. In 0.1 the catalog had no code reviewer.

## How it works

- **Fresh eyes.** The agent gets the task and the diff, not the author's summary. If it is told what the author concluded, it ignores that and says so.
- **Evidence.** Every finding has `file:line`; a Critical is reproduced when possible (a failing test or a script in a scratch copy), and the output is attached.
- **The class, not one case.** One unscoped query leads to a search for all of them; the finding lists every place.
- **Checks are run.** Linter, types and tests of the affected packages, with the command and output attached. What could not be run is listed.
- **"Confirmed" is a required section**: what was checked and found correct, and how.
- **At most three rounds** on one change. After that the change is returned with a recommendation to split or redesign.
- **Read and run only** (`Read`, `Glob`, `Grep`, `Bash`): it does not edit, format, commit or install into the author's tree.

Zones checked in most projects:

| Zone | What is checked |
|---|---|
| matches the task | each acceptance criterion: where it is implemented and which test proves it |
| permissions and access | every new endpoint, query, job and action checks who may do it |
| isolation between customers | every query, cache key, job, export and file path is scoped to the tenant |
| money | posted amounts never change in place; idempotent operations; no floats |
| migrations | forward on real-shaped data, reversible, safe during deploy, no long locks |
| secrets | none in code, config, tests, fixtures or logs |
| tests | they fail without the change and check behaviour, not mocks |

Severity: **Critical**, **Major**, **Minor**, **Nit**. Any Critical, Major or failing check means *return to the author*.

## Example

```
@agent-review:code-reviewer Review branch feature/partial-refund against main.
Task: docs/tasks/REFUND-2.md (acceptance criteria at the end).
```

The answer, shortened:

```
Verdict: return to the author — one Critical (refund can exceed the paid amount).
Acceptance criteria
  1 partial refund up to the paid amount → src/refunds/service.ts:58 → test "refund up to paid" ✓
  2 refund is idempotent per request id → not implemented → —
Findings
  [Critical] refund amount not bounded by the remaining paid sum
    src/refunds/service.ts:61; src/refunds/api.ts:23
    Two requests of 60 on an order paid 100 both succeed: refunded 120.
    Evidence: scratch test "double refund" → expected 409, got 200 (output attached).
    Fix: check `amount <= paid - refunded` inside the same transaction, with a row lock.
Confirmed
  amounts are integer minor units (src/money.ts:4); tenant comes from the session (src/refunds/api.ts:12)
Checks run
  npm run lint → 0; npm run typecheck → 0; npm test -- src/refunds → 1 failed (output attached)
```

The product and the task in the example are invented.

## Project review profile

The agent reads `.claude/review-profile.md` in the project (or `REVIEW.md`, or `docs/review-profile.md`), plus
`CLAUDE.md`, `AGENTS.md` and `CONTRIBUTING.md` if present. The profile says what is special in the project; it adds to
the zones above and does not switch them off. A short profile is enough:

```markdown
# Review profile
## Commands
lint: npm run lint · types: npm run typecheck · tests: npm test -- <path>
## Risky areas
billing/ (money), migrations/ (Postgres, zero-downtime deploys), auth/
## Multi-tenant
yes: every table has `tenant_id`; the tenant comes from the session only
## Conventions
money in integer minor units; ledger entries are append-only
## Decisions
generated clients in src/gen/ are not reviewed
```

The `ux-reviewer` agent of the `design` plugin reads the same file (users, tasks, devices, risky actions):
keep both parts in one profile. Do not put secrets or personal data into it.

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
