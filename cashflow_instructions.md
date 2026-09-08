# Mineski Cashflow Weekly HTML — Update Instructions

 

**Version:** 2.3 | **Last updated:** 2026-09-13

 

**Changelog:**

- v2.3 (2026-09-13) — **Bug 11: Weekly Table's [GL] outflow tooltips were dominated by internal bank transfers, not real vendor/expense payments.** `top_gl_inflows_*()` correctly restricts inflow to 3 named categories (`Operating cash-in`, `Other Receipt`, `Loan Repayment`), which implicitly excludes the `Bank Transfers` category — but `top_gl_outflows_pdei()`/`top_gl_outflows_gg()` had **no category filter at all**, just `_net < 0`. `Bank Transfers` rows are money moved between the company's own accounts (confirmed: every row nets to ~₱0 across the whole GL — one negative "from" leg, one matching positive "to" leg) — not economic activity. Because these transfers are often the single largest negative-net line in a given week (e.g. April's actual PDEI Outflow tooltip showed "Bank Transfer from Chinabank (METPH-PHP) −₱22,240,000" as its #1 item), they were crowding real vendor payments out of the top-5 list across many weeks — found live in cashflow_data.js as 24 "Bank Transfer..." line items spread through the year's outflow breakdowns. Fixed with `EXCLUDE_OUTFLOW_CATS = {'Bank Transfers'}` applied to both outflow query functions in `update_cashflow.py`; re-running the script for the current week retroactively rebuilds every act_col's breakdown (per Bug 2's "always rebuild in full" rule), so this cleaned up the whole year in one pass, not just the new week. **Known residual:** a small number of internal transfers are inconsistently tagged in the source GL under a real category (`Tax Payment`, `Other Payment`, `Office - G&A`) instead of `Bank Transfers` — same transfer description, different category week to week. This is a source-data quality issue, not a code bug; a pattern-matching fix was deliberately not attempted (too easy to false-positive on real payments with similar descriptions). If a tooltip item looks like an internal transfer despite this fix, flag it for AP/Finance to re-tag at the source.

 

- v2.2 (2026-08-30) — **Full Year didn't reflect Weekly Table for any month that wasn't fully actual** — `FY_COS_CF` (Bug 9's rule) stayed `0` for every month still partly or fully projected, even though Weekly Table's own Liquidity view (`NON_COS_PROJ`/`COS_LIQ`, sourced from CF row 57) showed real COS spend those same weeks (Aug W35 alone: ₱3.04M silently missing from Full Year). **Bug 9 is now superseded**: `FY_COS_CF` is built the same way as GAE/Tax/CAPEX/Loan/Other/GG Outflow already were — CF row 57, actual weeks folded with remaining projected weeks, for *every* month, all year (see `update_cashflow.py`, `fy_cos_fut` next to `fy_gae_fut` etc.). The old "fully actual only, else 0, fall back to AP_PAYABLES" rule and its `[INFO] <Month> is fully actual` print are gone — nothing to check for that anymore. `AP_PAYABLES`'s 2026-dated Cost of Sales rows (APEX, STAGE ONE, Procurement Budget) are **no longer the fallback source** — they're an optional add-on the user toggles on/off in `FullYear()` ("AP 2026 schedule: ON/OFF"), since they may already be reflected inside CF's own weekly COS projection for that month. Also: **2026 Forecast tab removed from `SLIDES`/`COMPS`** (per user request — "we don't use this anymore") and its injection into Full Year permanently disabled (`fcstProjects` forced to `[]` in `FullYear()`); `ForecastTab()` and the Supabase-loading code in `App()` are untouched, just unreachable — nothing about the Forecast tab needs weekly maintenance anymore, and Step 5D below is now historical.

 

- v2.1 (2026-08-05) — **The v2.0 W31/August bucketing question is closed**: CF for Mancom consolidated W28–W31 into a single `W28-W31 (July)` actual column at W32, so the workbook itself settled it — W31 is July. No convention change was needed, and a conservation check confirms every CF column is still counted exactly once. Two new fixes, both triggered by July becoming the first fully-actual post-June month: **Bug 9** — `FY_COS_CF` hardcoded `0` for Jul–Dec, so July's real ₱3.15M COS was dropped from the Full Year while `AP_PAYABLES` still carried July-dated 2025 arrears the AP sheet had already rescheduled to W34/W37; the July column closed at ₱1.73M against CF's actual ₱4.49M. `update_cashflow.py` now emits CF row 57 for any month that is fully actual and prints an `[INFO] … is fully actual` line naming the month. **Bug 10** — `FullYear()`'s forecast injection had no month guard, so ₱9.23M of Supabase forecast DPs still dated July were being added on top of CF's July actual; injection is now restricted to projection months and stranded deals surface in a red badge instead of vanishing. Also: `colDefs` Jul → `Actual`, and the orphaned "Jul" legend swatch merged into "Actual (Jan–Jul)".

- v2.0 (2026-07-29) — Bug 8: `COS_LIQ.totals` projection entries were CF row 63 (full PDEI Outflow) while `WeeklyTableLiquidity()` adds GAE/Tax/CAPEX/Loan/Other on top — double-counting every non-COS line on the Liquidity tab (W31 showed ₱11.10M projected PDEI outflow vs CF's true ₱5.80M). Projections now come from CF row 57 (COS only); actuals stay row 63. Identity assertion added to `update_cashflow.py`. Also noted but **not** changed: the script's `month_weeks_ar` buckets W31 into **August** even though CF row 48 labels it `W31 (Jul 31)` — a fiscal-week convention (Jul = W27–W30) that disagrees with the calendar and with Bug 7's label-driven mixed-month fold. Harmless this week (conservation check confirms no double-count or gap), but it will shift ~₱5M between Jul and Aug when W31 becomes actual next week. Full Year captions reworded to state the bucketing explicitly. Needs a decision from the user before W32.

- v1.0 (2026-03-25) — Initial. Weekly Table tab only.

- v1.1 (2026-04-17) — Weekly Table (Liquidity) tab. Andon Board sources. COS_LIQ, NON_COS_PROJ, GL_BREAKDOWN objects.

- v1.2 (2026-04-17) — Project completion check. Cross-referenced unfiled estimates (must appear in BOTH Andon files). Spread by Start/End date. `savings?` flag.

- v1.3 (2026-04-24) — CF for Mancom row 47+ = single source of truth for all Weekly Table numbers. GL for breakdown only. AR grand-total deduplication. React CDN fix. GG = GG Company (separate Mineski entity).

- v1.4 (2026-04-28) — Full Year three-zone layout (Jan–May actuals, Jun partial, Jul–Dec from AP). FY Patch Mode added.

- v1.5 (2026-04-28) — AP Arrears tab (9th slide). Option A: 15% of monthly surplus → 2024/2025 unscheduled payables (56 vendors, ₱36.15M) in priority order. Ryan Matias consolidated. AR expanded to detect H2 inflow (W27–W52). Arrears recommendation output added to weekly chat summary.

- v1.7 (2026-06-17) — Bug 5: hardcoded proj arrays (`pdeiInProj`, `ggInProj`, `pdeiOutProj`, `ggOutProj`, `NON_COS_PROJ`) must mirror CF for Mancom projection cols exactly; never shift a week without rewriting all five from the xlsx.

- v1.6 (2026-05-19) — Three critical bug fixes from W20 update: (1) `WT_*` arrays must always be regenerated from CF for Mancom — never carried forward; (2) `GL_BREAKDOWN` must be freshly re-derived from GL/AR every week — never patched from prior week; (3) GG split filter must check **both** `Company` column AND `Description` field. Array-count validation added to Step 7. AP subtotal-row exclusion rule added.

- v1.9 (2026-07-19) — Bug 7: once `act_cols` extends past June — i.e. the actual/projection boundary moves into a later month (Jul this week, Aug next month, etc.) — that month becomes "mixed" (some weeks actual, some still projected). `update_cashflow.py`'s Full Year builder only ever looked for Jan–Jun in `act_cols`; the mixed month's actual-so-far weeks were silently dropped from `FY_PDEI_IN`, `FY_GG_IN`, `FY_GAE`, `FY_TAX`, `FY_CAPEX`, `FY_LOAN`, `FY_OTHER`, `FY_GG_OUT`, `FY_FOREX`, understating that month by the full actual amount (W28's ₱21.1M PDEI inflow showed as ₱82K). Fixed by detecting the mixed month dynamically and summing its actual (`act_cols`) columns together with its remaining projected (`proj_cols`) columns for those arrays — see Bug 7 section below. `FY_COS_CF`/`FY_AP_TOT` deliberately excluded from this fix (see Bug 7 section for why). Script also gained a `[INFO] Mixed month detected` stderr line.

- v1.8 (2026-07-14) — **Architecture change:** weekly data now lives in a standalone `cashflow_data.js`, loaded by `index.html` (rendering/logic only — should not need weekly edits). `update_cashflow.py` automates Step 2–3 extraction from the xlsx and prints ready-to-paste JS blocks, replacing the old manual Python-string-replacement workflow described in Steps 6–7 below. Bug 6: the script's Full Year Jan–Jun month-column mapping must be detected dynamically from CF row-48 labels (match on month name), never hardcoded column indices — CF for Mancom progressively consolidates completed weeks into a single column per month (the same way Jan–Mar already appear as one column each), so a fixed "Apr = cols 5–7, May = cols 8–13" mapping silently sums the wrong weeks into the wrong month once Apr/May/Jun complete (discovered W28 update — Apr and May actuals were being triple-counted into each other). 2026 Forecast tab: added an Include/Exclude toggle (top of the Forecast tab, persisted in `localStorage`) so forecast deals can be excluded from the Full Year projection without deleting them from Supabase. Forecast deals are stored in Supabase (`forecast_deals` table, read/written live by `index.html` — not part of the weekly xlsx update at all); the free-tier Supabase project auto-pauses after ~1 week of API inactivity — if the Forecast tab looks empty, check the Supabase dashboard for a paused project (query returns `"Project paused"`) before assuming the data was deleted.



---

 

## ⚠️ PRIME DIRECTIVE

 

> **Weekly Table = 1-to-1 mirror of CF for Mancom, row 47 downward.**

> - **PDEI** = Philippine Digital Entertainment Inc. (main operating entity)

> - **GG Company** = GG Company Inc. (separate entity, inter-company flows)

>

> All Weekly Table numbers — actuals AND projections — come from CF for Mancom only. GL = inflow drill-down only. AR = cross-check only. Never derive Weekly Table totals from GL or AR.

 

---

 

## 🔴 CRITICAL BUG FIXES (v1.6) — Read Before Every Update

 

Three failure modes discovered during the W20 update. Each caused silent wrong data in the output.

 

### Bug 1 — `WT_*` arrays must be regenerated every week, never carried forward

 

**What went wrong:** `WT_PDEI_IN`, `WT_GG_IN`, `WT_TOT_IN`, `WT_PDEI_OUT`, `WT_GG_OUT`, `WT_TOT_OUT` are standalone `var` declarations separate from the `CF` object. When `CF.pdeiIn` etc. were updated to W20's 5-period layout, the `WT_*` copies were left holding W17's stale 6-period data. The Weekly Table displayed completely wrong actuals.

 

**The rule:** `WT_*` arrays are **always identical to their CF counterpart** for the actuals. Regenerate them from scratch every week directly from CF for Mancom. Never patch in-place.

 

```python

# WT_* always = CF rows, actual cols. Same extraction, assigned twice.

WT_PDEI_IN  = [cfv(53, c) for c in act_cols]   # == CF.pdeiIn

WT_GG_IN    = [cfv(54, c) for c in act_cols]   # == CF.ggIn

WT_TOT_IN   = [cfv(55, c) for c in act_cols]   # == CF.totIn

WT_PDEI_OUT = [cfv(63, c) for c in act_cols]   # == CF.pdeiOut

WT_GG_OUT   = [cfv(64, c) for c in act_cols]   # == CF.ggOut

WT_TOT_OUT  = [cfv(65, c) for c in act_cols]   # == CF.totOut

```

 

After replacement, always verify: `WT_PDEI_IN == CF.pdeiIn`, etc. If they differ, the update is wrong.

 

---

 

### Bug 2 — `GL_BREAKDOWN` must be fully rebuilt from GL/AR every week, never patched

 

**What went wrong:** `GL_BREAKDOWN` actuals were carried forward from W17 and hand-adjusted rather than re-derived from the GL sheet. Several period breakdowns showed W17-era items and amounts. The `is_gg()` filter was also incomplete (see Bug 3 below).

 

**The rule:** `GL_BREAKDOWN` is **always rebuilt in full** from the current xlsx. Never copy it from the prior week's HTML. The cost of re-querying GL is low; the cost of wrong breakdown data is high.

 

**Structure:** `GL_BREAKDOWN` has 4 sub-arrays (`pdeiIn`, `ggIn`, `pdeiOut`, `ggOut`). Each must have exactly `len(act_cols) + len(proj_cols)` entries — one per period. Actuals come from GL queries; projections come from AR (for inflow) and NON_COS_PROJ (for outflow).

 

```python

# Entry count check — must pass before writing HTML

for key in ['pdeiIn','ggIn','pdeiOut','ggOut']:

    assert len(GL_BREAKDOWN[key]) == len(act_cols) + len(proj_cols), \

        f"GL_BREAKDOWN.{key} has wrong entry count"

```

 

**Projection inflow entries (pdeiIn, ggIn):** Pull from AR per projection week using the named-CLIENT rows (not grand-total rows). Top 3–5 items by value.

 

**Projection outflow entries (pdeiOut):** Use NON_COS_PROJ breakdown `{l:"COS", a:...}, {l:"GAE", a:...}` etc. for each proj week.

 

**Projection ggOut entries:** Use `{l:"GG liquidity outflow", a: -gg_out_proj[i]}` for each proj week. Use `null` if value is 0.

 

---

 

### Bug 3 — GG split filter must check both `Company` column AND `Description` field

 

**What went wrong:** Inter-company receipts from GG Company Inc. are sometimes booked under `Company = "MET - Philippines"` with `Description = "GG Company Inc."`. The old filter only checked the `Company` column, so those rows were classified as PDEI inflow instead of GG inflow. This contaminated the PDEI breakdown with GG transactions.

 

**The rule:** A GL row is a GG Company transaction if **either** condition is true:

 

```python

def is_gg(row):

    co   = str(row.iloc[7]).upper()   # Company column (col index 7)

    desc = str(row.iloc[6]).upper()   # Description column (col index 6)

    return 'GG' in co or 'GG COMPANY' in desc

```

 

Apply this filter to **every** GL query — inflows and outflows.

 

---

 

### Bug 5 — Hardcoded proj arrays must be fully rewritten from CF for Mancom every week

**What went wrong (W25 update):** When W24 moved from projection to actual, the shared projection arrays in `WeeklyTableCombined()` — `pdeiInProj`, `ggInProj`, `pdeiOutProj`, `ggOutProj` — and the global `NON_COS_PROJ` were not updated. They still held old W24 projected values at index 0 (₱2.6M PDEI, ₱4.1M GG). The totals rows (`CF.projIn`, `CF.projOut`, `CF.projNet`) were correct because they come from `cashflow_data.js`, but the per-entity sub-rows showed completely wrong values. The dashboard displayed ₱2.6M PDEI inflow for W25 when the xlsx showed ₱400K.

**The rule:** Every time a week shifts from projection to actual (i.e. every weekly update), these 5 arrays must be **fully rewritten from CF for Mancom projection columns**. No carrying forward, no patching index 0. Read CF rows 53, 54, 63, 64 (and 57–62 for NON_COS_PROJ) for all current projection columns and rebuild from scratch.

**Where these arrays live in the HTML:**

```javascript
// Inside WeeklyTableCombined() — lines ~544-547:
var pdeiInProj  = [/* CF row 53, all proj cols */];
var ggInProj    = [/* CF row 54, all proj cols */];
var pdeiOutProj = [/* CF row 63 − ggOutProj, per col */];
var ggOutProj   = [/* CF row 64, all proj cols */];

// Global, above WeeklyTableLiquidity() — lines ~306-336:
var NON_COS_PROJ = [
  {gae:..., tax:..., capex:..., loan:..., other:..., cos:...},
  // one entry per proj col — CF rows 58-62 and 57 (COS)
];
```

**Verification:** For every proj col index `i`:
- `pdeiInProj[i] + ggInProj[i]` must equal `CF.projIn[i]` (CF row 55)
- `pdeiOutProj[i] + ggOutProj[i]` must equal `CF.projOut[i]` (CF row 65)
- `NON_COS_PROJ[i].cos + NON_COS_PROJ[i].gae + ... + ggOutProj[i]` must equal `CF.projOut[i]` (liquidity view)

If any check fails, the display will show wrong per-entity numbers even when totals look correct.

---

### Bug 6 — Full Year Jan–Jun month-column mapping must be detected dynamically, never hardcoded

**What went wrong (W28 update):** `update_cashflow.py`'s Full Year section used a fixed column mapping — `'apr': [5,6,7], 'may': [8,9,10,11,12,13], 'jun': [14,15,16]` — based on the CF for Mancom layout at the time it was written, when Apr and May were still split into several weekly sub-columns. By W28, CF for Mancom had consolidated Apr, May, and Jun into single columns each (the same way Jan–Mar already were), shifting cols 5–16 to mean completely different weeks. The old fixed mapping silently summed **May's and June's actuals into April**, and **projection columns (W28 onward) into May** — Full Year showed a ₱54M April PDEI Inflow when the true figure was ₱29M, with no error or warning.

**The rule:** Never hardcode which CF column belongs to which month. Detect it every week from the row-48 labels themselves:

```python
# Match each act_col's label against the month name it contains — works whether
# that month is still split into several weekly sub-columns ("W14 Apr 3", "W15
# Apr 10", ...) or has already collapsed into one ("W14-W18 (Apr)").
_MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun']
cf_month_cols = {m.lower(): [] for m in _MONTH_NAMES}
for c in act_cols:
    label = get_cf_label(c)
    for m in _MONTH_NAMES:
        if m in label:
            cf_month_cols[m.lower()].append(c)
            break
```

Beginning balance = `cfv(49, cf_month_cols[month][0])` (first column of that month); Closing = `cfv(67, cf_month_cols[month][-1])` (last column). `month_sum()` sums whichever columns matched — one column once the month is consolidated, several while it's still mid-progress.

**Verification:** `FY_BEG_INIT[0:6]` must equal `CF.actBeg` and `FY_PDEI_IN_INIT[0:6]` must equal `CF.pdeiIn` exactly (same identity check as the Bug 1 `WT_*` arrays, just applied to the Full Year Jan–Jun actuals). If they don't match, the month-column mapping is wrong.

---

### Bug 7 — Full Year "current mixed month" (the month straddling the actual/projection boundary) silently dropped its actual-so-far data

**What went wrong (W29 update):** Bug 6 only ever searches `act_cols` for `Jan`–`Jun`. That was fine every week through W28, because the actual/projection boundary always sat inside June or earlier. At W29, `act_cols` grew to include column 8, labeled `"W28 (Jul 10)"` — the boundary moved into **July**. Since `"Jul"` isn't in Bug 6's `_MONTH_NAMES` list, that column matched nothing, and W28's actual PDEI Inflow (₱21.1M), GAE, Tax, CAPEX, Loan, Other, GG Outflow, and Forex were all silently excluded from the Full Year Jul column — which instead only showed the *remaining projected* weeks (W29–W30 alone), understating July's true inflow by ~₱21M (₱82K shown instead of ~₱21.2M). This will recur every time the actual/projection boundary crosses into a new month (Aug next, then Sep, …) for the rest of the year, not just this once.

**The rule:** Any month that has **both** actual (`act_cols`) and still-projected (`proj_cols`) weeks is "mixed." Detect it dynamically — don't assume it's always June:

```python
_ALL_MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
cf_month_cols_all = {m.lower(): [] for m in _ALL_MONTH_NAMES}
for c in act_cols:
    label = get_cf_label(c)
    for m in _ALL_MONTH_NAMES:
        if m in label:
            cf_month_cols_all[m.lower()].append(c)
            break
# Whichever post-June month name has a non-empty entry here is the mixed month.
```

For that mixed month, fold its actual columns (`cf_month_cols_all[month]`) into the same fut-month totals used for projections (`fy_pdei_in_fut`, `fy_gg_in_fut`, `fy_gae_fut`, `fy_tax_fut`, `fy_capex_fut`, `fy_loan_fut`, `fy_other_fut`, `fy_gg_out_fut`, `fy_forex_fut`) — i.e. sum **both** the actual weeks and the remaining projected weeks of that month into one figure, rather than picking only one side.

**Deliberately NOT touched:** `FY_COS_CF` and `FY_AP_TOT` (Cost of Sales) stay exactly as before — hardcoded `0` for Jul–Dec, driven entirely by `AP_PAYABLES`'s hand-curated `dueMonth` field. This is pre-existing, intentional design (Jan–Jun COS comes from CF; Jul–Dec COS comes from AP_PAYABLES, full stop, regardless of whether some of those weeks have since become actual). Also folding the mixed month's actual CF-row-57 COS into `FY_COS_CF` would double-count against whatever `AP_PAYABLES` already assumes for that month — nobody has verified whether `AP_PAYABLES`'s `dueMonth` entries were curated as "all of the month" or "the remainder after actuals," so don't touch it without asking the user first.

**Verification:** Manually compute `act+proj` sums for the mixed month's PDEI Inflow (CF rows 53/54) and Beginning/Closing (CF rows 49/67, using the *last projected column still in that month* — e.g. `CF.projNet` at the month's last remaining proj week — as a sanity-check closing figure) and compare against the script's `FY_PDEI_IN_INIT`/`FY_GG_IN_INIT` output for that index. The script also prints `[INFO] Mixed month detected: <Month>` — if that line is missing when a new week has just crossed into a new month, the detection didn't fire and the month needs manual fixing.

---

### Bug 9 — When a post-June month closes to actual, `FY_COS_CF` must pick it up and its `AP_PAYABLES` rows must be re-dated (SUPERSEDED v2.2 — see changelog; `FY_COS_CF` now folds actual+projected CF row 57 for every month unconditionally, kept below for history)

**What went wrong (W32 update):** `FY_COS_CF` was built as `Jan–Jun from CF row 57` + a hardcoded `[0]*6`, on the assumption that every post-June month is still projected and therefore sourced entirely from `AP_PAYABLES`. At W32 CF for Mancom consolidated W28–W31 into a single `W28-W31 (July)` **actual** column. Two things then went wrong at once:

1. July's real COS (₱3,151,064, CF row 57) was dropped from the Full Year — `FY_COS_CF[6]` stayed `0`.
2. `AP_PAYABLES` still carried three 2025 arrears rows at `dueMonth:6` (₱5,972,268 total) that the **AP sheet had already rescheduled** — STAGE ONE ₱344,732 → W34 (Aug), APEX ₱5,482,674 → W37 (Sep, and consolidated from two rows into one, PRF BRF-0426-170).

Net effect: the Full Year July column closed at ₱1,728,337 against CF's actual ₱4,491,514.

**The rule:** a post-June month is sourced from CF row 57 **iff it is fully actual** — it appears in `act_cols` *and* has no remaining weeks in `proj_cols`. Still-projected and mixed months stay `0` and remain `AP_PAYABLES`-driven, which preserves the original no-double-count guarantee that Bug 7 was protecting.

```python
_proj_month_names = {m.lower() for c in proj_cols for m in _ALL_MONTH_NAMES if m in get_cf_label(c)}
for _m in _ALL_MONTH_NAMES[6:]:
    _act = cf_month_cols_all.get(_m.lower(), [])
    fy_cos_cf.append(safe_int(month_sum(57, _act))
                     if _act and _m.lower() not in _proj_month_names else 0)
```

**Every time the script prints `[INFO] <Month> is fully actual — FY_COS_CF[<Month>] = …`, you must also check `AP_PAYABLES` for rows still dated that month.** Cross-reference the AP sheet's week columns: if the obligation was rescheduled, update `dueMonth` (and the amount — the AP sheet often revises it and sometimes merges rows); if it was genuinely paid, CF row 57 already captures it and the row should be removed. Leaving a row dated a closed month double-counts it against CF row 57.

**Verification:** for the newly-actual month M, `FY_BEG[M] + inflow + outflow` as the `FullYear()` chain computes it should equal `cfv(49,M) + cfv(55,M) − cfv(65,M) + cfv(66,M)` within ₱1. It will **not** equal CF row 67 exactly — every CF month carries an unlabelled reconciling residual (Jan −₱864,737, Jun +₱996,831, Jul +₱58,028), so row 67 differs from the sum of its own component rows. That gap is pre-existing and is not something the update introduced.

---

### Bug 10 — `FullYear()` forecast injection must skip months that have closed to actual

**What went wrong (W32 update):** the injection loop applied every `FORECAST_PROJECTS` DP/FP to `FY_PDEI_IN`/`FY_GG_IN`/`FY_AP_TOT` at `pmt.month` with no guard. Its comment claimed "projection months" but nothing enforced it. When July closed to actual, ₱9,232,994 of Supabase forecast DPs still dated July (MEGAFUNALO ₱7.0M, SM Gamefest ₱1.35M, Monster Energy ₱750K, SM Gamefest PC ₱75K, WoT HEAT ₱57,994) were added **on top of** CF's actual July inflow, inflating July by ₱9.23M and its COS by ₱7.15M.

**The rule:** derive the first projection month from `colDefs` and skip anything earlier. Never hardcode the boundary — it moves every time a month closes.

```javascript
var firstProjMonth = 0;
for(var _m=0; _m<12; _m++){ if(!colDefs[_m].isProj){ firstProjMonth = _m + 1; } }
// inside the DP/FP loop:
if(pmt.month < firstProjMonth){ if(pmt.amount) fcstStranded.push({...}); return; }
```

Skipped deals are collected into `fcstStranded` and rendered as a red badge on the Full Year tab (hover shows name/month/amount) so they get re-dated on the Forecast tab rather than silently disappearing. This never mutates Supabase — re-dating is a manual edit in the dashboard.

> ⚠️ Report the stranded list in the weekly chat summary. A deal dated in a closed month is either (a) collected — already inside CF actuals, so delete or re-date it, or (b) slipped — needs a new DP/FP month. Only the user can say which.

---

### Bug 8 — `COS_LIQ.totals` projection entries must be COS only, never the full PDEI Outflow

**What went wrong (found W31 update, present since at least W28):** `update_cashflow.py` built `cos_liq_totals_proj` from CF **row 63** (PDEI Outflow — the total). But `WeeklyTableLiquidity()` computes

```javascript
Total PDEI Outflow = COS_LIQ.totals[i] + nc.gae + nc.tax + nc.capex + nc.loan + nc.other
```

so every non-COS line was counted twice. W31 displayed a projected PDEI outflow of ₱11,103,955 against CF's true ₱5,801,978, and the projected closing-balance chain inherited the error for all 22 projection weeks.

**The rule:** projection entries in `COS_LIQ.totals` are CF **row 57** (COS) only — the same value as `NON_COS_PROJ[i].cos`. Actual entries stay CF row 63: for actual columns the component renders `COS_LIQ.totals` directly and shows `—` for the non-COS rows, so no double-count occurs there.

```python
cos_liq_totals_act  = [safe_int(v) for v in pdei_out_act]          # CF row 63 — correct
cos_liq_totals_proj = [safe_int(cfv(57, c)) for c in proj_cols]    # CF row 57 — COS only
```

**Verification** (now asserted in the script, prints `[OK] Bug 8 liquidity identity checks passed`): for every proj col,
`cos + gae + tax + capex + loan + other + ggOut == CF row 65`, within ₱1 of rounding.

---

### Bug 4 — AP sheet subtotal rows must be excluded from H2 totals

 

**What went wrong:** The AP sheet contains rows where both `VENDOR` (col 0) and `PRF No.` (col 1) are blank/NaN — these are running subtotal rows, not payables. Including them doubles the H2 monthly totals.

 

**The rule:** Skip any row where both col 0 (vendor name) and col 1 (PRF/description) are blank:

 

```python

def ap_month_total(col_indices):

    total = 0

    for ci in col_indices:

        for idx in range(len(ap)):

            vendor = str(ap.iloc[idx, 0]).strip()

            prf    = str(ap.iloc[idx, 1]).strip()

            if (vendor in ('nan','')) and (prf in ('nan','')):

                continue   # skip subtotal rows

            val = pd.to_numeric(ap.iloc[idx, ci], errors='coerce')

            if pd.notna(val) and val > 0:

                total += val

    return round(total, 0)

```

 

Named vendor rows (col 0 has a name) and budget-estimate rows (col 0 blank but col 1 has a description like "Payroll", "VAT") are both valid payables and should be included.

 

---

 

## Files Required

 

| File | Purpose |

|---|---|

| `PH_Cash_Flow_Monitoring___W##.xlsx` | CF for Mancom (WT source of truth), GL (breakdown only), AR (cross-check + H2 inflow detection), AP (FY Jul–Dec outflow + arrears obligations) |

| `index.html` | Rendering/logic only — React components (`h()`/`createElement`, no JSX). Should not need edits for a routine weekly update except the small manual items in Step 6 (KPIs, Key Actions, narrative text). |

| `cashflow_data.js` | **All weekly data lives here.** `WEEK`/`DATE`, `CF`, `WT_*`, `GL_BREAKDOWN`, `COS_LIQ`, `NON_COS_PROJ`, all `FY_*` arrays, `AR_OPEN`/`COLLECTED`, `AP_PAYABLES`/`AP_COS_VENDORS`. Loaded by `index.html` via `<script src="cashflow_data.js">`. |

| `update_cashflow.py` | Automates Step 2–3 extraction from the xlsx (`python3 update_cashflow.py "PH Cash Flow Monitoring - W##.xlsx"`). Prints ready-to-paste `var NAME = ...;` blocks for every mechanically-derivable variable in `cashflow_data.js` (see "Running the automation script" below). Does **not** touch `AR_OPEN`, `COLLECTED`, `AP_PAYABLES`, `AP_COS_VENDORS`, or `FORECAST_PROJECTS` — those stay hand-curated. |

| `MINESKI_PH_-_Andon_Board_Procurement_Order_PH_for_Claude.xlsx` | Filed POs with payment schedules |

| `MINESKI_PH_-_Andon_Board_Project_Approval_For_Claude.xlsx` | Project budgets, start/end dates, status |

 

Andon Board files: re-read only when updating the Liquidity tab. FY Patch Mode: `cashflow_data.js` only, no xlsx needed.

 

> ⚠️ **React CDN:** Replace any `./Mineski Cashflow Weekly_files/` script paths with:

> ```html

> <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>

> <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>

> ```

### Running the automation script

```bash
python3 update_cashflow.py "PH Cash Flow Monitoring  - W##.xlsx" > /tmp/w##_output.js
```

Stderr prints `[INFO]`/`[WARN]`/`[OK]` progress and the Bug 1/2/5/6 validation checks; stdout is the JS to paste in. The script prints one `var NAME = ...;` block per variable — splice each block into `cashflow_data.js` by replacing the old `var NAME = ...;` declaration wholesale (matching balanced brackets, since these are multi-line array/object literals — a plain string search-and-replace on a truncated snippet will corrupt the file). Do not hand-transcribe values from the script output; copy the generated blocks verbatim.

`COS_LIQ.bd` (the Andon-board filed/unfiled breakdown) is **not** regenerated by the script — it's hand-curated from the Andon Board files. When two or more of the script's newly-consolidated actual columns used to be separate columns with existing `bd` entries, merge those entries into the one new column (concatenate the item lists) rather than discarding them.

Known script gotcha (fixed in the current version, but check if you find an older copy): the `NON_COS_PROJ` printer must place the trailing comma *before* the `// W##` comment, not after — a comma placed after `//` lands inside the comment and silently produces a JS array with missing commas between elements (`SyntaxError` at load, easy to miss because everything above it still parses).

 

---

 

## Step 1 — Identify Current Week

 

From xlsx filename (e.g. W17): actuals = all cols up to W(current−1); projections = W(current) onward.

 

---

 

## Step 2 — Read the Three Tabs

 

### Tab A: `CF for Mancom` — PRIMARY SOURCE

 

```python

df_cf = pd.read_excel('file.xlsx', sheet_name='CF for Mancom', header=None)

# Row 48 = week labels. Data starts row 49. Col 2 = first data column.

```

 

**Key rows (0-based):**

 

| Row | Label | WT variable |

|---|---|---|

| 49 | Beginning | `CF.actBeg` / `CF.projBeg` |

| 51 | Collection | breakdown only |

| 52 | Other Receipt/Loan | breakdown only |

| 53 | PDEI Inflow | `WT_PDEI_IN` + `pdeiIn proj` |

| 54 | GG Inflow | `WT_GG_IN` + `ggIn proj` |

| 55 | Total Inflow | `WT_TOT_IN` + `CF.projIn` |

| 57 | COS | in PDEI Outflow |

| 58 | GAE | in PDEI Outflow |

| 59 | Tax Payment | in PDEI Outflow |

| 60 | CAPEX | in PDEI Outflow |

| 61 | Loan Repayment | in PDEI Outflow |

| 62 | Other Payment | in PDEI Outflow |

| 63 | PDEI Outflow | `WT_PDEI_OUT` + `pdeiOut proj` |

| 64 | GG Outflow | `WT_GG_OUT` + `ggOut proj` |

| 65 | Total Outflow | `WT_TOT_OUT` + `CF.projOut` |

| 66 | Forex effect | `CF.forex` |

| 67 | Net Cash Inflow (Outflow) | `CF.net` / `CF.projNet` |

 

```python

act_cols  = [2, 3, 4, 5, 6, 7]    # W17: cols for W1-W5 through W16

proj_cols = [8, 9, 10, 11, 12, 13] # W17: cols for W17 through W22

 

def cfv(row_i, col_i):

    val = df_cf.iloc[row_i, col_i]

    try: return round(float(val), 0)

    except: return 0.0

 

pdei_in_act  = [cfv(53, c) for c in act_cols]

gg_in_act    = [cfv(54, c) for c in act_cols]

tot_in_act   = [cfv(55, c) for c in act_cols]

pdei_out_act = [cfv(63, c) for c in act_cols]

gg_out_act   = [cfv(64, c) for c in act_cols]

tot_out_act  = [cfv(65, c) for c in act_cols]

forex_act    = [cfv(66, c) for c in act_cols]

net_act      = [cfv(67, c) for c in act_cols]

beg_act      = [cfv(49, c) for c in act_cols]

 

pdei_in_proj  = [cfv(53, c) for c in proj_cols]

gg_in_proj    = [cfv(54, c) for c in proj_cols]

tot_in_proj   = [cfv(55, c) for c in proj_cols]

pdei_out_proj = [cfv(63, c) for c in proj_cols]

gg_out_proj   = [cfv(64, c) for c in proj_cols]

tot_out_proj  = [cfv(65, c) for c in proj_cols]

beg_proj      = [cfv(49, c) for c in proj_cols]

net_proj      = [cfv(67, c) for c in proj_cols]

 

non_cos_proj = [

    {'gae': cfv(58,c), 'tax': cfv(59,c), 'capex': cfv(60,c),

     'loan': cfv(61,c), 'other': cfv(62,c)}

    for c in proj_cols

]

```

 

---

 

### Tab B: `GL` — INFLOW BREAKDOWN ONLY

 

Do not use GL totals in any Weekly Table cell. GL is for the click-through drill-down only.

 

```python

df = pd.read_excel('file.xlsx', sheet_name='GL', header=None)

gl = df.iloc[2:].copy()

gl.columns = ['_','AccountCode','Account','AccountType','Date','Reference',

              'Description','Company','ProjectCode','Debit','Credit','Net',

              'Category','Week','USD','TEG','Green','Forex','c18','c19','c20']

gl['Net_num']   = pd.to_numeric(gl['Net'],   errors='coerce')

gl['Debit_num'] = pd.to_numeric(gl['Debit'], errors='coerce')

gl['Credit_num']= pd.to_numeric(gl['Credit'],errors='coerce')

```

 

**GG split:** Apply `is_gg()` to **every GL query**. A row is GG if `Company` (col 7) contains `"GG"` **OR** `Description` (col 6) contains `"GG COMPANY"` — both checks required because inter-company receipts are sometimes booked under Company = "MET - Philippines" with Description = "GG Company Inc.":

 

```python

def is_gg(row):

    co   = str(row.iloc[7]).upper()   # Company column

    desc = str(row.iloc[6]).upper()   # Description column

    return 'GG' in co or 'GG COMPANY' in desc

```

 

> ⚠️ Using only the Company column check will misclassify GG inter-company receipts as PDEI inflow. Always use both conditions.

 

**Inflow categories:**

 

| GL Category | Label |

|---|---|

| `Operating cash-in` | Collection |

| `Other Receipt` | Other Receipt |

| `Loan Repayment` (Debit > 0) | Loan Receipt |

 

> CF for Mancom may show higher PDEI Inflow than raw GL because CF treats loan receipts as inflow. Always use CF for totals.

 

```python

# Top 5 inflows per period — non-GG rows only

top_in = sub[~sub.apply(is_gg, axis=1) &

             sub['Category'].isin(['Operating cash-in','Other Receipt','Loan Repayment']) &

             (sub['Debit_num'] > 0)].nlargest(5, 'Debit_num')

 

# Top 5 GG inflows per period — GG rows only

top_gg_in = sub[sub.apply(is_gg, axis=1) &

                sub['Category'].isin(['Operating cash-in','Other Receipt','Loan Repayment']) &

                (sub['Debit_num'] > 0)].nlargest(5, 'Debit_num')

 

# Top 5 outflows — non-GG rows, most negative Net

top_out = sub[~sub.apply(is_gg, axis=1) & (sub['Net_num'] < 0)].nsmallest(5, 'Net_num')

 

# Top 5 GG outflows — GG rows, most negative Net

top_gg_out = sub[sub.apply(is_gg, axis=1) & (sub['Net_num'] < 0)].nsmallest(5, 'Net_num')

 

# Format: {l: "Description (max 40 chars)", a: value}

```

 

> ⚠️ **GL totals will not match CF for Mancom totals** — this is expected (CF captures loan receipts that GL doesn't). GL breakdown entries are context/drill-down only. Never assert GL sum == CF value.

 

**Building GL_BREAKDOWN — full rebuild every week:**

 

`GL_BREAKDOWN` has 4 sub-arrays. Each must be fully rebuilt — never patched from the prior week. Entry count per sub-array must equal `len(act_cols) + len(proj_cols)`.

 

```python

# Structure for each sub-array: [act_period_0, act_period_1, ..., proj_period_0, proj_period_1, ...]

# Each entry is either null or a list of {l, a} items

# Actuals → from GL queries above

# Proj pdeiIn → from AR named-CLIENT rows per proj week (top 3-5 by value)

# Proj ggIn   → from AR or known GG transfer, else null

# Proj pdeiOut → from NON_COS_PROJ: [{l:"COS",a:-cos},{l:"GAE",a:-gae},...]

# Proj ggOut   → [{l:"GG liquidity outflow",a:-gg_out_proj[i]}] or null if 0

 

# After building, assert entry counts

for key in ['pdeiIn','ggIn','pdeiOut','ggOut']:

    expected = len(act_cols) + len(proj_cols)

    actual   = len(GL_BREAKDOWN[key])

    assert actual == expected, f"GL_BREAKDOWN.{key}: {actual} entries, expected {expected}"

```

 

---

 

### Tab C: `AR` — CROSS-CHECK + H2 INFLOW DETECTION

 

> ⚠️ **Deduplication:** AR has duplicate invoice rows across company tabs. Never raw-sum. Use the **grand-total row**: last row where `CLIENT` is `NaN` with a non-zero week value.

 

```python

df_ar = pd.read_excel('file.xlsx', sheet_name='AR', header=None)

ar = df_ar.iloc[4:].copy()

ar.columns = df_ar.iloc[3].tolist()

 

def ar_total(week_col):

    mask = ar['CLIENT'].isna() & pd.to_numeric(ar[week_col], errors='coerce').notna()

    vals = pd.to_numeric(ar[mask][week_col], errors='coerce')

    return round(vals.iloc[-1], 0) if len(vals) else 0.0

 

# Cross-check: ar_total('W17') ≈ cfv(55, proj_col_W17) − cfv(54, proj_col_W17)

 

# H2 inflow detection — scan W27-W52 for arrears surplus calculation

h2_inflow = {}

for w in [f'W{i}' for i in range(27, 53)]:

    val = ar_total(w)

    if val > 0:

        h2_inflow[w] = val

 

month_weeks = {

    'Jul': ['W27','W28','W29','W30'],

    'Aug': ['W31','W32','W33','W34','W35'],

    'Sep': ['W36','W37','W38','W39'],

    'Oct': ['W40','W41','W42','W43'],

    'Nov': ['W44','W45','W46','W47','W48'],

    'Dec': ['W49','W50','W51','W52'],

}

h2_monthly_inflow = {m: sum(h2_inflow.get(w,0) for w in weeks) for m, weeks in month_weeks.items()}

```

 

**AR top 5 per week (for GL_BREAKDOWN projection entries):**

```python

week_data = ar[['CLIENT','PROJECT NAME', w]].copy()

week_data['val'] = pd.to_numeric(week_data[w], errors='coerce')

top5 = week_data[week_data['CLIENT'].notna() & (week_data['val'] > 0)].nlargest(5, 'val')

```

 

---

 

## Step 3 — Build CF and GL_BREAKDOWN Objects

 

```javascript

var CF = {

  weeks: ["W1-W5\nJan","W6-W9\nFeb","W10-W13\nMar","W14\nApr 3","W15\nApr 10","W16\nApr 17"],

  proj:  ["W17\nApr 24","W18\nMay 1","W19\nMay 8","W20\nMay 15","W21\nMay 22","W22\nMay 29"],

  actBeg:  [...],  // CF row 49, actual cols

  pdeiIn:  [...],  // CF row 53, actual cols  ← NOT from GL totals

  ggIn:    [...],  // CF row 54, actual cols  ← NOT from GL totals

  totIn:   [...],  // CF row 55, actual cols

  pdeiOut: [...],  // CF row 63, actual cols

  ggOut:   [...],  // CF row 64, actual cols

  totOut:  [...],  // CF row 65, actual cols

  forex:   [...],  // CF row 66, actual cols (NaN → 0)

  net:     [...],  // CF row 67, actual cols

  projBeg: [...],  // CF row 49, proj cols

  projIn:  [...],  // CF row 55, proj cols  ← NOT raw AR sum

  projOut: [...],  // CF row 65, proj cols

  projNet: [...],  // CF row 67, proj cols

};

 

var WT_PDEI_IN  = [...];  // CF row 53, actual cols

var WT_GG_IN    = [...];  // CF row 54, actual cols

var WT_TOT_IN   = [...];  // CF row 55, actual cols

var WT_PDEI_OUT = [...];  // CF row 63, actual cols

var WT_GG_OUT   = [...];  // CF row 64, actual cols

var WT_TOT_OUT  = [...];  // CF row 65, actual cols

```

 

> ⚠️ `proj:[...]` arrays are hardcoded inside **both** `WeeklyTable()` and `WeeklyTableLiquidity()` row definitions. Update both every week — easy to miss.

 

```javascript

// Inside WeeklyTable() and WeeklyTableLiquidity() rows:

{key:"pdeiIn",  act:WT_PDEI_IN,  proj: /* CF row 53 proj cols */ [...] },

{key:"ggIn",    act:WT_GG_IN,    proj: /* CF row 54 proj cols */ [...] },

{key:"pdeiOut", act:WT_PDEI_OUT, proj: /* CF row 63 proj cols */ [...] },

{key:"ggOut",   act:WT_GG_OUT,   proj: /* CF row 64 proj cols */ [...] },

```

 

```javascript

var GL_BREAKDOWN = {

  // null | [{l:"Description (35 chars)", a:value}, ...]

  // Actuals: top 5 GL line items per period

  // Projections: top AR invoices per week (non-subtotal rows)

  pdeiIn:  [...],

  ggIn:    [...],

  pdeiOut: [...],  // proj from NON_COS_PROJ breakdown

  ggOut:   [...],

};

```

 

---

 

## Step 4 — Build Liquidity Tab Data (Andon Board)

 

### 4A — Parse Filed POs

 

**File:** `MINESKI_PH_-_Andon_Board_Procurement_Order_PH_for_Claude.xlsx`

 

| Col | Field |

|---|---|

| M | Project Code |

| W | Particulars_Price |

| AD | Supplier Details_Payment Date |

| AE | Supplier Details_Terms |

 

**Terms parsing (col AE):**

1. `100% Full Payment` → full price, date from Terms text or Payment Date col

2. Lines with `%` (e.g. `50% Down - Apr 10`) → split by %, use each line's date

3. Lines without `%` (e.g. `1st Payment - Apr 10 / Final - Apr 24`) → split equally across dated lines

4. `CONFIRMING PO` / `ALREADY DELIVERED AND PAID` → skip

5. Blank → full price on Payment Date



### 4B — Parse Project Approvals

 

**File:** `MINESKI_PH_-_Andon_Board_Project_Approval_For_Claude.xlsx`

 

| Col | Field |

|---|---|

| B | Project Code |

| F | Status (keep `Approved` and `Under Review` only) |

| Q | TOTAL ESTIMATE EXPENSES |

| X | Start Date |

| Y | End Date |

 

```python

pa_agg = pa_active.groupby('Project Code').agg(

    name=('Project Name','first'),

    total_estimate=('TOTAL ESTIMATE EXPENSES','sum'),

    start_date=('Start Date','min'),

    end_date=('End Date','max')

).reset_index()

```

 

### 4C — Cross-Reference & Compute Unfiled

 

Only include projects appearing in **both** files. Projects with no PO may be cancelled — exclude.

 

```python

po_codes = set(po['Project Code'].dropna().astype(str).unique())

pa_crossref = pa_agg[pa_agg['Project Code'].isin(po_codes)].copy()

pa_crossref['filed_po'] = pa_crossref['Project Code'].map(po_by_code).fillna(0)

pa_crossref['unfiled']  = (pa_crossref['total_estimate'] - pa_crossref['filed_po']).clip(lower=0)

```

 

### 4D — Project Completion Check

 

| End Date | GL spend? | Recent POs? | Classification | In forecast? |

|---|---|---|---|---|

| Future/current | — | — | Active → Outstanding | ✅ Spread across active weeks |

| Past | Yes | Yes | Outstanding | ✅ Full amount in current week |

| Past | Yes | No | Probably outstanding | ✅ Current week, flag `⚠ savings?` |

| Past | No | No | Savings / never spent | ❌ Exclude |

 

> Andon Board has no formal "Project Closed" status. End Date + PO recency is the best signal. Always flag ambiguous cases `⚠ savings?`.

 

**Breakdown `t` field values:** `"filed"` / `"unfiled"` / `"savings"`

 

### 4E — Spread Unfiled Across Projection Weeks

 

```python

PROJ_WEEKS = ['W17','W18','W19','W20','W21','W22']  # update each week

 

def weeks_in_range(start_dt, end_dt, target_weeks):

    return [w for w in target_weeks

            if pd.Timestamp(WEEK_DATES[w][0]) <= end_dt

            and pd.Timestamp(WEEK_DATES[w][1]) >= start_dt]

 

for _, r in pa_crossref[pa_crossref['unfiled'] > 100].iterrows():

    proj_weeks = weeks_in_range(r['start_date'], r['end_date'], PROJ_WEEKS)

    if proj_weeks:

        each = round(r['unfiled'] / len(proj_weeks), 2)

        for w in proj_weeks:

            unfiled_week[w].append({'p': name, 'a': each, 't': 'unfiled'})

    else:

        t = 'savings' if is_savings(r) else 'unfiled'

        unfiled_week[PROJ_WEEKS[0]].append({'p': name, 'a': r['unfiled'], 't': t})

```

 

### 4F — Build COS_LIQ and NON_COS_PROJ

 

```javascript

var COS_LIQ = {

  totals: [/* N actual + 6 proj */],  // actual = filed POs only; proj = filed + unfiled

  bd: [/* N+6 arrays of {l, a, t} */]

};

 

// From CF for Mancom rows 58-62, projection cols only

var NON_COS_PROJ = [

  {gae: ..., tax: ..., capex: ..., loan: ..., other: ...},  // one entry per proj week

];

```

 

**Total PDEI Outflow (Liquidity) = COS_LIQ[i] + GAE[i] + Tax[i] + CAPEX[i] + Loan[i] + Other[i]**

 

---

 

## Step 5 — Build Full Year Tab

 

**Three-zone column layout:**

 

| Zone | Months | Source | Header color |

|---|---|---|---|

| Actual | Jan–May | CF for Mancom, weeks summed to months | Dark `#2a2a2a` |

| Partial | Jun | CF for Mancom, through last available week | Blue `#1a3a5a` |

| Projection | Jul–Dec | AP sheet outflow; AR inflow if available | Yellow `#3a3520` |

 

Zone boundary: read row 48 of CF for Mancom for last available week label. Last incomplete month = `isCur:true`. All complete months = `isAct:true`. Future months = `isProj:true`.

 

### 5A — Consolidate CF Weeks to Months (Jan–Jun)

 

```python

# Col mapping (0-based, col 2 = first data col):

# Jan=col2  Feb=col3  Mar=col4  Apr=cols5-7  May=cols8-13  Jun=cols14-16

col_sets = {

    'jan': [2], 'feb': [3], 'mar': [4],

    'apr': [5,6,7], 'may': [8,9,10,11,12,13], 'jun': [14,15,16]

}

def month_sum(row_idx, cols): return round(sum(cfv(row_idx, c) for c in cols), 0)

 

# Beginning = CF row 49 at first week of month (not sum)

beg_jan=cfv(49,2); beg_feb=cfv(49,3); beg_mar=cfv(49,4)

beg_apr=cfv(49,5); beg_may=cfv(49,8); beg_jun=cfv(49,14)

 

# Closing = CF row 67 at last week of month (not sum)

close_jan=cfv(67,2); close_feb=cfv(67,3); close_mar=cfv(67,4)

close_apr=cfv(67,7); close_may=cfv(67,13); close_jun=cfv(67,16)

```

 

**CF rows → FY arrays (Jan–Jun):**

 

| FY array | CF row | Note |

|---|---|---|

| `FY_PDEI_IN` | 53 | sum of week cols |

| `FY_GG_IN` | 54 | sum of week cols |

| `FY_COS_CF` | 57 | Payables 2026 Jan–Jun |

| `FY_GAE` | 58 | |

| `FY_TAX` | 59 | |

| `FY_CAPEX` | 60 | |

| `FY_LOAN` | 61 | |

| `FY_OTHER` | 62 | |

| `FY_GG_OUT` | 64 | |

| `FY_STP` | — | From original CF model |

| `FY_FOREX` | 66 | |

| `FY_BEG` | 49 | start-of-month value, not sum |

| `FY_NET` | 67 | end-of-month (closing) value, not sum |

 

### 5B — Build Jul–Dec from AP Sheet

 

```python

df_ap = pd.read_excel('file.xlsx', sheet_name='AP', header=None)

ap = df_ap.iloc[4:].reset_index(drop=True)

# Col 1 = description, col 6 = classification

# Week cols: W27=col37, W28=col38 ... W52=col62

 

month_weeks_ap = {

    'Jul': [37,38,39,40], 'Aug': [41,42,43,44,45],

    'Sep': [46,47,48,49], 'Oct': [50,51,52,53],

    'Nov': [54,55,56,57,58], 'Dec': [59,60,61,62],

}

 

def ap_month_total(col_indices):

    total = 0

    for ci in col_indices:

        for idx in range(len(ap)):

            val = pd.to_numeric(ap.iloc[idx, ci], errors='coerce')

            if pd.notna(val) and val > 0: total += val

    return round(total, 0)

 

def ap_month_top5(col_indices):

    agg = defaultdict(float)

    for ci in col_indices:

        for idx in range(len(ap)):

            val = pd.to_numeric(ap.iloc[idx, ci], errors='coerce')

            if pd.notna(val) and val > 0:

                desc = str(ap.iloc[idx, 1]).strip()

                if desc and desc not in ('nan', ''): agg[desc[:35]] += val

    return sorted(agg.items(), key=lambda x: -x[1])[:5]

```

 

Jul–Dec inflow: set `FY_PDEI_IN` and `FY_GG_IN` to 0 unless AR has scheduled collections for W27–W52.

 

### 5C — Chain Beginning Balances

 

```python

# FY_BEG[0..5] = Jan-Jun from CF row 49 directly

# FY_BEG[6..11] = Jul-Dec chained from Jun closing

b = close_jun

for i, month in enumerate(fut_months):

    beg_fut.append(round(b, 0))

    inflow  = fy_pdei_in_fut[i] + fy_gg_in_fut[i]

    outflow = fy_ap_tot[i] + fy_pay24_fut[i] + fy_pay25_fut[i] + fy_gae_fut[i] + ...

    b += (inflow + outflow)

# FY_NET[6..11] = closing balances

```

 

### 5D — Full Year HTML Arrays

 

```javascript

var FY_BEG    = [/* 12: Jan-Jun from CF row49, Jul-Dec chained */];

var FY_NET    = [/* 12: Jan-Jun = CF row67 month-end, Jul-Dec computed */];

var FY_PDEI_IN = [/* 12 */]; var FY_GG_IN  = [/* 12 */];

var FY_PAY24  = [/* 12, mostly 0 */]; var FY_PAY25 = [/* 12 */];

var FY_COS_CF = [/* Jan-Jun from CF row57, Jul-Dec = 0 */];

var FY_AP_TOT = [/* Jan-Jun = 0, Jul-Dec from AP */];

var FY_PAY26  = FY_COS_CF.map(function(v,i){ return -(v + FY_AP_TOT[i]); });

var FY_GAE=[/*12*/]; var FY_TAX=[/*12*/]; var FY_CAPEX=[/*12*/];

var FY_LOAN=[/*12*/]; var FY_OTHER=[/*12*/]; var FY_GG_OUT=[/*12*/];

var FY_STP=[/*12*/]; var FY_FOREX=[/*12*/];

var FY_AP_BD = [null,null,null,null,null,null, /*Jul*/[...], /*Aug*/[...], ...];

```

 

```javascript

var colDefs = [

  {label:"Jan", sub:"Actual",     isAct:true,  isCur:false, isProj:false},

  {label:"Feb", sub:"Actual",     isAct:true,  isCur:false, isProj:false},

  {label:"Mar", sub:"Actual",     isAct:true,  isCur:false, isProj:false},

  {label:"Apr", sub:"Actual",     isAct:true,  isCur:false, isProj:false},

  {label:"May", sub:"Actual",     isAct:true,  isCur:false, isProj:false},

  {label:"Jun", sub:"Partial",    isAct:false, isCur:true,  isProj:false},

  {label:"Jul", sub:"Projection", isAct:false, isCur:false, isProj:true},

  // Aug-Dec same as Jul

];

```

 

---

 

## Step 5C — AP Arrears Tab

 

The **AP Arrears** tab (9th slide) implements **Option A: collection-triggered payments**. Interactive component — user enters H2 inflow, tab live-calculates vendor payment queue.

 

### Payment Rules (locked — do not change without user instruction)

 

| Rule | Value |

|---|---|

| Allocation rate | **15% of monthly surplus** |

| Surplus | Monthly inflow − COS obligation − GAE obligation |

| Trigger | Surplus > 0 only |

| Payment order | Priority vendors first, then remaining 2024/2025 arrears largest-to-smallest |

| Ryan Matias | One consolidated vendor (both entity names combined) — never split |

 

### Priority Vendors

 

| # | Vendor | Outstanding |

|---|---|---|

| P1 | XSTATIC Event System Inc. | ₱10,760,229 |

| P2 | Ryan Matias (consolidated) | ₱227,842 |

| P3 | Maxi One Production Inc. | ₱93,304 |

 

### Full Arrears Queue (as of W17 — update each week)

 

| Vendor | Outstanding | Inv | Classification |

|---|---|---|---|

| XSTATIC Event System Inc. | ₱10,760,229 | 14 | Cost of Sales |

| Ryan Matias (consolidated) | ₱227,842 | 2 | Cost of Sales |

| Maxi One Production Inc. | ₱93,304 | 2 | Cost of Sales |

| APEX Franchise Ventures OPC | ₱10,936,780 | 6 | Cost of Sales |

| Retailscapes, Inc. | ₱4,921,423 | 1 | GAE |

| STAGE ONE Event Services Corp. | ₱2,790,268 | 5 | Cost of Sales |

| Dar Andrew Cayabyab | ₱1,650,193 | 13 | GAE |

| INEX Stagesystems Corp. | ₱1,208,636 | 2 | Cost of Sales |

| TEG Holding Pte. Ltd. | ₱717,718 | 23 | GAE |

| Stage Riggers, Inc. | ₱532,860 | 1 | Cost of Sales |

| Jerome T. Capoquian | ₱500,625 | 2 | Cost of Sales |

| GariathC Corporation | ₱350,402 | 3 | Cost of Sales |

| IMMAP / Internet Mobile Mktg Assoc | ₱275,000 | 1 | Cost of Sales |

| LIVELYHOOD Enterprises Corp | ₱210,649 | 1 | Cost of Sales |

| CONVERGE ICT Solutions, Inc. | ₱157,300 | 1 | Cost of Sales |

| Cash Advance - Employees | ₱154,329 | 11 | Cost of Sales |

| Manjean F. Faldas | ₱95,913 | 4 | Cost of Sales |

| Eastern Communications | ₱77,000 | 1 | Cost of Sales |

| Various Payees | ₱73,800 | 2 | Cost of Sales |

| PALARUAN Corp. | ₱72,800 | 1 | Cost of Sales |

| Others (35 vendors < ₱50K) | ₱350,414 | 35 | Mixed |

| **TOTAL** | **₱36,148,587** | **144** | |

 

### H2 Obligations (from AP sheet — update if AP changes)

 

```javascript

var H2_COS = {Jul:4853320, Aug:9940492, Sep:5708906, Oct:7028619, Nov:9940492, Dec:10896906};

var H2_GAE = {Jul:3000700, Aug:6376700, Sep:3000700, Oct:4688700, Nov:6376700, Dec:8188700};

```

 

### Component Structure

 

`ARREARS_VENDORS`, `ARREARS_TOTAL`, and `ArrearsTab()` are defined just before `// ── APP ──`. Registered as 9th slide:

```javascript

var SLIDES = [..., "AP Arrears"];

var COMPS  = [..., ArrearsTab];

```

 

### Updating Vendor Balances Each Week

 

Check AP sheet actual columns for payments to any arrears vendor. Subtract from `a:` value; remove vendor if `a:` reaches 0; update `ARREARS_TOTAL`.

 

```python

# Example: XSTATIC paid ₱500,000 in W18

# {n:"XSTATIC Event System Inc.",a:10760229} → a:10260229

# ARREARS_TOTAL: 36148587 → 35648587

```

 

### Weekly Chat Recommendation Format

 

```

⭐ ARREARS PAYMENT RECOMMENDATION (Option A) — W##

 

  [Month]: ₱[inflow] inflow − ₱[COS] COS − ₱[GAE] GAE = ₱[surplus] × 15% = ₱[alloc]

 

  Vendor payment cascade:

    P1 XSTATIC Event System Inc.   ₱[amount]  (₱[remaining] remaining)

    P2 Ryan Matias (consolidated)  ₱[amount]  (₱[remaining] remaining)

    P3 Maxi One Production Inc.    ₱[amount]  (₱[remaining] remaining)

    ...next vendors largest-to-smallest as funds allow...

 

  Total paid this period:   ₱[total_alloc]

  Total remaining:          ₱[total_remaining]

```

 

If no new H2 inflow detected: "No new H2 collections entered — arrears tab pre-filled with ₱0. Enter expected collections in the AP Arrears tab to generate a recommendation."

---

## Step 5D — 2026 Forecast Tab & Full Year Toggle (v1.8) — HISTORICAL, tab hidden as of v2.2, no longer applies

The "2026 Forecast" slide (`ForecastTab()`) lists upcoming signed/prospective deals — name, entity, total value, GP%, DP/FP month and amount. This is **not** part of the weekly xlsx update: deals are entered by hand through the "+ Add Project" form in the live dashboard and stored in Supabase (table `forecast_deals`), not in `cashflow_data.js`. `App()` fetches them at page load (`loadProjects()`) into `FORECAST_PROJECTS`, and `FullYear()` injects each deal's DP/FP amount into `FY_PDEI_IN`/`FY_GG_IN`/`FY_AP_TOT` for its payment month.

**Include/Exclude toggle:** `App()` holds a `forecastEnabled` boolean (persisted in the browser's `localStorage` key `mineski_forecast_enabled`, defaults to `true`) and passes it plus `onToggleForecast` to every slide. The pill switch on the Forecast tab ("Included in Full Year" / "Excluded from Full Year") flips it; `FullYear()` reads `props.forecastEnabled` and skips the injection loop entirely when it's `false`, showing a yellow "2026 Forecast excluded" badge instead. This never deletes or modifies the Supabase rows — it only controls whether `FullYear()` adds them on top of the CF/AP baseline for that browser session. Nothing here needs weekly maintenance; mention it only if a Mancom member asks why Full Year projections look different from the Forecast tab's totals.

> ⚠️ **Supabase free-tier auto-pause:** if the Forecast tab shows zero projects unexpectedly, the Supabase project itself may have paused (happens automatically after ~1 week without API traffic — it does **not** delete data). Confirm before assuming data loss: a direct REST call to `https://tsxeprrdzijykuwrruhg.supabase.co/rest/v1/forecast_deals` returning the plain-text body `"Project paused. Please unpause the project before proceeding."` (rather than JSON) means the project just needs to be resumed from the Supabase dashboard — the entered deals are still there.

 

---

 

## Step 6 — Update the HTML

 

Use Python string replacement (not str_replace — strings too long):

 

1. `var WEEK` and `var DATE`

2. `var CF = { ... }` — all actuals and projections from CF for Mancom

3. `var WT_PDEI_IN` through `var WT_TOT_OUT` — **always regenerate from CF for Mancom; never carry forward from prior week** (see Bug 1)

4. `proj:[...]` arrays inside **both** `WeeklyTable()` and `WeeklyTableLiquidity()` row definitions — update both, easy to miss one

5. `var GL_BREAKDOWN = { ... }` — **always rebuild in full from GL and AR; never patch from prior week** (see Bug 2)

6. `var COS_LIQ = { ... }` and `var NON_COS_PROJ = [...]`

7. All Full Year arrays: `FY_BEG`, `FY_NET`, `FY_PDEI_IN`, `FY_GG_IN`, `FY_PAY24`, `FY_PAY25`, `FY_COS_CF`, `FY_AP_TOT`, `FY_GAE`, `FY_TAX`, `FY_CAPEX`, `FY_LOAN`, `FY_OTHER`, `FY_GG_OUT`, `FY_STP`, `FY_FOREX`, `FY_AP_BD`, `colDefs`

8. `ARREARS_VENDORS`, `ARREARS_TOTAL`, `H2_COS`, `H2_GAE`

9. Overview KPIs and key actions

10. Cash Position narrative



---

 

## Step 7 — Validate

 

```python

checks = [

    ('var WEEK = "Week ##"', True),

    ('var DATE = "Month DD, 2026"', True),

    ('cdnjs.cloudflare.com/ajax/libs/react', True),

    ('Mineski Cashflow Weekly_files', False),

    ('var GL_BREAKDOWN', True), ('var COS_LIQ', True), ('var NON_COS_PROJ', True),

    ('GL_BREAKDOWN[row.bdKey]', True),

    ('COS_LIQ.totals.slice(5)', True),

    ('nc.gae + nc.tax + nc.capex + nc.loan + nc.other', True),

    ('var FY_BEG', True), ('var FY_NET', True),

    ('var FY_AP_TOT', True), ('var FY_AP_BD', True), ('colDefs', True),

    ('var ARREARS_TOTAL', True), ('var ARREARS_VENDORS', True),

    ('function ArrearsTab', True), ('"AP Arrears"', True),

    ('Projected W## close', True), ('Actual W1–W##', True),

]

 

# Numeric checks:

# CF row 53 proj col[0] == pdeiIn proj[0] in WeeklyTable

# CF row 55/65/67 proj cols == CF.projIn/projOut/projNet

# FY_BEG[0] == cfv(49,2)  |  FY_NET[last_act_month] == cfv(67,last_act_col)

# FY_BEG[first_proj_month] == FY_NET[last_act_month]

# ARREARS_TOTAL == sum of all a: in ARREARS_VENDORS

 

# WT_* identity checks (Bug 1 prevention):

# WT_PDEI_IN  must equal CF.pdeiIn  (actuals only)

# WT_GG_IN    must equal CF.ggIn

# WT_TOT_IN   must equal CF.totIn

# WT_PDEI_OUT must equal CF.pdeiOut

# WT_GG_OUT   must equal CF.ggOut

# WT_TOT_OUT  must equal CF.totOut

 

# GL_BREAKDOWN entry-count checks (Bug 2 prevention):

# Each sub-array (pdeiIn, ggIn, pdeiOut, ggOut) must have exactly

# len(act_cols) + len(proj_cols) entries.

# Example for W20 (5 act + 7 proj): each sub-array must have 12 entries.

 

# AP subtotal check (Bug 4 prevention):

# FY_AP_TOT[Jul] should roughly equal sum of named-vendor + named-description rows

# for Jul week cols — if it doubles the expected value, subtotal rows were included.

```

 

---

 

## FY Patch Mode

 

Lightweight ad-hoc Full Year updates. HTML only — no xlsx. ~200–500 tokens vs 8,000+ for full rebuild.

 

| Use Patch | Use Full Rebuild |

|---|---|

| "Add ₱10M inflow in August" | New weekly xlsx ready |

| "₱5M collections in Oct and Nov" | Recompute actuals with updated CF |

| "Remove Sharon Robins from Sep breakdown" | Add new row to Full Year table |

 

**Patch format** (plain language):

> `FY patch: Aug PDEI_IN +10000000`

> `FY patch: Oct GG_IN = 5000000, Nov GG_IN = 5000000`

> `FY patch: Jul AP breakdown — add "New Supplier" ₱3,500,000 [GAE]`

 

**Steps:**

1. Read affected array(s) from HTML

2. Apply patch value

3. Recompute `FY_NET` and `FY_BEG` chain from patched month forward:



```python

def recompute_chain(patch_month_idx, fy_arrays):

    b = fy_arrays['FY_BEG'][patch_month_idx]

    for i in range(patch_month_idx, 12):

        inflow  = fy_arrays['FY_PDEI_IN'][i] + fy_arrays['FY_GG_IN'][i]

        outflow = (fy_arrays['FY_PAY26'][i] + fy_arrays['FY_PAY24'][i] +

                   fy_arrays['FY_PAY25'][i] + (-fy_arrays['FY_GAE'][i]) +

                   (-fy_arrays['FY_TAX'][i]) + (-fy_arrays['FY_CAPEX'][i]) +

                   (-fy_arrays['FY_LOAN'][i]) + (-fy_arrays['FY_OTHER'][i]) +

                   fy_arrays['FY_GG_OUT'][i] + fy_arrays['FY_STP'][i] +

                   fy_arrays['FY_FOREX'][i])

        net = b + inflow + outflow

        fy_arrays['FY_NET'][i] = round(net, 0)

        if i + 1 < 12: fy_arrays['FY_BEG'][i+1] = round(net, 0)

        b = net

```

 

> ⚠️ **Sign convention:** Most outflow arrays stored as positives, displayed as negatives. `FY_PAY26` already negative (`-(FY_COS_CF + FY_AP_TOT)`). Verify signs before recomputing.

 

4. `str_replace` only changed arrays: patched flow array + `FY_NET` + `FY_BEG` + `FY_AP_BD` if breakdown changed

5. Update `₱(XXX.XM) by December` footer if December closing changed materially



**Example:** "Aug has ₱10M inflow." → Set `FY_PDEI_IN[7]` += 10,000,000 → recompute `FY_NET[7..11]` and `FY_BEG[8..11]` → 3 str_replace calls.

 

---

 

## Weekly Update Checklist

 

**CF xlsx (every week):**

- [ ] Confirm week number from filename; set `act_cols` and `proj_cols` accordingly

- [ ] Read CF for Mancom rows 49–67, actual cols → regenerate all `WT_*` arrays **from scratch** (never carry forward)

- [ ] Read CF for Mancom rows 49–67, actual cols → regenerate all `CF` actuals (`actBeg`, `pdeiIn`, `ggIn`, `totIn`, `pdeiOut`, `ggOut`, `totOut`, `forex`, `net`)

- [ ] Read CF for Mancom rows 49–67, proj cols → regenerate all `CF` projections and `NON_COS_PROJ`

- [ ] **Assert `WT_PDEI_IN == CF.pdeiIn`** (and same for the other 5 pairs) — if not equal, stop and fix

- [ ] **Rewrite `pdeiInProj`, `ggInProj`, `pdeiOutProj`, `ggOutProj`** (in `WeeklyTableCombined()`) from CF for Mancom rows 53, 54, 63, 64 projection cols — **never carry forward, never patch** (see Bug 5)

- [ ] **Rewrite `NON_COS_PROJ`** from CF for Mancom rows 57–62 projection cols — same rule (see Bug 5)

- [ ] Assert `pdeiInProj[i] + ggInProj[i] == CF.projIn[i]` for all i; same for out

- [ ] Update `proj:[...]` inside `WeeklyTable()` row definitions

- [ ] Update `proj:[...]` inside `WeeklyTableLiquidity()` row definitions (separate from above — easy to miss)

- [ ] Rebuild `GL_BREAKDOWN` **in full from GL and AR** — never patch from prior week; use `is_gg()` with both Company AND Description checks

- [ ] **Assert each GL_BREAKDOWN sub-array has `len(act_cols) + len(proj_cols)` entries**

- [ ] Read AR grand-total row → cross-check CF row 55 proj values; flag mismatches > 5%

- [ ] Scan AR W27–W52 → consolidate to monthly H2 inflow → update `H2_COS`/`H2_GAE` if AP changed → reduce `ARREARS_VENDORS` balances for confirmed payments → output ⭐ Recommendation in chat

- [ ] Update Full Year tab: recompute all FY_ arrays (CF Jan–Jun, AP Jul–Dec); exclude AP subtotal rows (both col 0 and col 1 blank)

- [ ] Check if CF extends further than prior week → update `colDefs` zone boundary and `proj` week label array length

- [ ] **(Historical — Bug 9 superseded v2.2)** `FY_COS_CF` no longer needs a "fully actual" check; it folds actual+projected CF row 57 for every month automatically. Still update `colDefs` to `isAct:true` for any month that has fully closed, for the header coloring/legend.

- [ ] **Check the Full Year tab for the red stranded-forecast badge** (Bug 10) → report the deals in the chat summary so they get re-dated on the Forecast tab

- [ ] Update `WEEK`, `DATE`, Overview KPIs, Cash Position narrative



**Andon Board (when new files provided):**

- [ ] Parse PO file → filed amounts per week per project code

- [ ] Parse PA file → estimates, start/end dates, status (Approved/Under Review only)

- [ ] Cross-reference: keep only projects in **both** files

- [ ] Compute unfiled = estimate − filed POs; clip at 0

- [ ] Apply completion check (End Date + PO recency → Outstanding / Savings?)

- [ ] Spread unfiled across proj weeks by Start/End range

- [ ] Build `COS_LIQ` (N actual + len(proj_cols) proj) and `NON_COS_PROJ` (len(proj_cols) entries)

- [ ] Update `WeeklyTableLiquidity()`



**FY Patch (HTML only):**

- [ ] Identify month(s) and array(s) to patch

- [ ] Read current values from HTML; apply patch

- [ ] Recompute `FY_NET` + `FY_BEG` chain from earliest patched month

- [ ] str_replace changed arrays only

- [ ] Update December closing in footer if materially changed



**AP Arrears (every week — uses xlsx already read):**

- [ ] Scan AR W27–W52 for new H2 inflow grand totals; consolidate to monthly

- [ ] Check AP sheet actual cols for payments to arrears vendors → reduce `a:` balances

- [ ] Re-check AP H2 COS/GAE → update `H2_COS` / `H2_GAE` if changed

- [ ] Compute surplus × 15% per month; output ⭐ Recommendation in chat

- [ ] Update `ARREARS_VENDORS`, `ARREARS_TOTAL`, `H2_COS`, `H2_GAE` in HTML



**All modes:**

- [ ] Validate (Step 7) — including all new numeric and array-count assertions

- [ ] Output updated HTML



---

 

## Notes

 

- **Data lives in `cashflow_data.js`, not `index.html`.** `index.html` is rendering/logic only; every weekly-changing value is a global var loaded from `cashflow_data.js`. Use `update_cashflow.py` to generate the CF/GL/COS_LIQ/FY blocks — see "Running the automation script" above.

- **`Overview()` and `CashPosition()` are dead code.** Both functions exist in `index.html` but are not in the `SLIDES`/`COMPS` arrays that drive the app — they never render. The live slide deck is exactly: Cover, Weekly Table, AR Standard, AR Summary, Full Year, AP Payables, AP Arrears (`AR Standard`/`AR Summary`/`AP Arrears` are reachable via the ← → arrows but hidden from the tab-button row by `SLIDE_HIDDEN`). **2026 Forecast is deliberately left out of `SLIDES`/`COMPS` as of v2.2** — unreachable in the UI, `ForecastTab()` and the Supabase-loading code in `App()` are kept but dormant, and `FullYear()` never injects forecast data anymore. Don't spend time keeping `Overview()`/`CashPosition()` in sync with the weekly numbers unless they get wired back into `COMPS`.

- **Read only GL, AR, CF for Mancom, AP.** Never read other tabs. FY patch = skip xlsx entirely.

- **CF for Mancom is king.** GL totals ≠ CF totals (loan receipt classification differs). Always use CF.

- **GL for breakdown only.** Never use GL sums for Weekly Table values.

- **`WT_*` arrays are never carried forward.** They must be regenerated from CF for Mancom every week. `WT_PDEI_IN` must equal `CF.pdeiIn`, etc. If they differ, the update is wrong.

- **`GL_BREAKDOWN` is never patched.** It must be fully rebuilt from GL (actuals) and AR (proj inflow) every week. Stale breakdowns show wrong items and wrong amounts.

- **`is_gg()` checks both columns.** Filter by `Company` column containing "GG" **OR** `Description` column containing "GG COMPANY" — both conditions required. Using only `Company` misses inter-company receipts booked under MET entity.

- **AP subtotal rows.** Rows where both `VENDOR` (col 0) and `PRF No.` (col 1) are blank are running subtotals — exclude them from all AP aggregations. Budget estimate rows (col 0 blank, col 1 has a description) are valid and should be included.

- **AR grand-total row only.** Sheet has duplicates. Use last NaN-client row per week column.

- **AR projection breakdowns: include NaN-client rows.** For `GL_BREAKDOWN` projection inflow entries, pull top named-CLIENT rows *and* any NaN-client rows that have a non-blank `Company` or `Category` field (e.g. "Other Receipt" scheduled receipts, loan repayments). These correspond to CF row 52 (Other Receipt/Loan) and will otherwise leave unexplained gaps between the breakdown sum and the CF total. Label them by their Category value, e.g. `{l:"Other Receipt / Loan", a:3500000}`.

- **GG split always.** PDEI = Philippine Digital Entertainment Inc. GG Company = separate Mineski entity, inter-company flows.

- **Weekly Table beginning chain.** Each week's Beginning = prior week's Net closing (CF row 67 → row 49).

- **Full Year beginning chain.** Jan–Jun: CF row 49 start-of-month. Jul–Dec: chained from Jun closing. Any patch to month M cascades through FY_NET[M] → FY_BEG[M+1..11].

- **`pdeiInProj`, `ggInProj`, `pdeiOutProj`, `ggOutProj`, `NON_COS_PROJ` must be fully rewritten every week.** These are hardcoded arrays in `WeeklyTableCombined()` and at global scope. When a week shifts from projection to actual, index 0 changes entirely — it is never safe to shift or patch these. Read CF for Mancom projection columns fresh and rebuild all five. Assert `pdeiInProj[i] + ggInProj[i] == CF.projIn[i]` before writing the HTML. Failure mode: totals look correct but per-entity rows show the prior week's projected values. (Bug 5 — discovered W25 update.)

- **proj:[...] in two more places.** `WeeklyTable()` and `WeeklyTableLiquidity()` also have hardcoded proj arrays. Update both every week.

- **proj array length changes week to week.** When CF adds a new projection column (e.g. W26 added in W20), every proj array in `CF`, `GL_BREAKDOWN`, `COS_LIQ`, `NON_COS_PROJ`, and both `WeeklyTable()` row definitions must gain the new entry. Assert entry counts match `len(proj_cols)`.

- **HTML = vanilla React.** `React.createElement` via `h()`. No JSX, no build step.

- **Andon Board no "Closed" status.** End Date + PO recency is best signal. Flag ambiguous cases `⚠ savings?`.

- **Arrears balances are a running ledger.** Reduce `a:` for confirmed AP payments each week. Remove vendor and subtract from `ARREARS_TOTAL` when fully cleared.

- **Arrears tab is interactive.** Do not hardcode inflow values. If AR detects new H2 inflow, pre-populate that month's input `value` prop.

- **Ryan Matias = one vendor.** Both entity names are one `ARREARS_VENDORS` entry. Never split.
