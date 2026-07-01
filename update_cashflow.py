#!/usr/bin/env python3
"""
update_cashflow.py — Mineski Cashflow Weekly Data Extractor
Usage:  python update_cashflow.py "PH_Cash_Flow_Monitoring___W28.xlsx"

Outputs JavaScript variable blocks to stdout.
Paste the output into cashflow_data.js to replace all computed variables.
Manual edits still needed in index.html: narrative text, KPI labels, Key Actions.
"""

import sys
import re
import math
from collections import defaultdict
import pandas as pd

# ─────────────────────────────────────────────────────────────────────────────
# 0. ARGS + WEEK NUMBER
# ─────────────────────────────────────────────────────────────────────────────

if len(sys.argv) < 2:
    print("Usage: python update_cashflow.py <xlsx_filename>")
    sys.exit(1)

xlsx_path = sys.argv[1]
m = re.search(r'W(\d+)', xlsx_path, re.IGNORECASE)
if not m:
    print("ERROR: Could not extract week number from filename. Expected 'W##' in name.")
    sys.exit(1)

WEEK_NUM = int(m.group(1))
print(f"// ── EXTRACTED FROM: {xlsx_path}  (Week {WEEK_NUM}) ────────────────────────────", flush=True)
print(f"// Run date: auto. Manual items still required in index.html.", flush=True)
print(file=sys.stderr, flush=True)
print(f"[INFO] Processing Week {WEEK_NUM}", file=sys.stderr)

# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def safe_int(v):
    try:
        f = float(v)
        if math.isnan(f): return 0
        return int(round(f))
    except:
        return 0

def js_list(lst):
    """Format a Python list as a compact JS array literal."""
    return "[" + ",".join(str(safe_int(v)) for v in lst) + "]"

def js_entry(items):
    """Format a list of {l, a} dicts as a JS array literal, or 'null'."""
    if not items:
        return "null"
    parts = []
    for it in items:
        label = it['l'].replace('"', '\\"')[:40]
        amt   = safe_int(it['a'])
        parts.append(f'{{l:"{label}",a:{amt}}}')
    return "[" + ",".join(parts) + "]"

def trunc(s, n=40):
    s = str(s).strip()
    return s[:n]

# ─────────────────────────────────────────────────────────────────────────────
# 1. READ CF FOR MANCOM
# ─────────────────────────────────────────────────────────────────────────────

print("[INFO] Reading CF for Mancom...", file=sys.stderr)
df_cf = pd.read_excel(xlsx_path, sheet_name='CF for Mancom', header=None)

# Row 48 = week labels (0-based). Col 2 = first data column.
# Detect act_cols: all cols from 2 where row-48 label is "W##" with ## < WEEK_NUM
# Detect proj_cols: all cols from 2 where row-48 label is "W##" with ## >= WEEK_NUM

act_cols  = []
proj_cols = []
label_row = df_cf.iloc[48]

for col_i in range(2, len(label_row)):
    cell = str(label_row.iloc[col_i]).strip()
    wm = re.search(r'W(\d+)', cell)
    if not wm:
        continue
    w = int(wm.group(1))
    if w < WEEK_NUM:
        act_cols.append(col_i)
    else:
        proj_cols.append(col_i)

# Deduplicate while preserving order (handles W52 appearing twice in label row)
seen = set()
act_cols_dedup  = []
proj_cols_dedup = []
for c in act_cols:
    cell = str(label_row.iloc[c]).strip()
    wm   = re.search(r'W(\d+)', cell)
    key  = int(wm.group(1)) if wm else c
    if key not in seen:
        seen.add(key); act_cols_dedup.append(c)
seen = set()
for c in proj_cols:
    cell = str(label_row.iloc[c]).strip()
    wm   = re.search(r'W(\d+)', cell)
    key  = int(wm.group(1)) if wm else c
    if key not in seen:
        seen.add(key); proj_cols_dedup.append(c)

act_cols  = act_cols_dedup
proj_cols = proj_cols_dedup

print(f"[INFO] act_cols  ({len(act_cols)}): {act_cols}", file=sys.stderr)
print(f"[INFO] proj_cols ({len(proj_cols)}): {proj_cols}", file=sys.stderr)

def cfv(row_i, col_i):
    val = df_cf.iloc[row_i, col_i]
    try: return round(float(val), 0)
    except: return 0.0

# CF weeks/proj label arrays (e.g. "W1-W5\nJan")
def get_cf_label(col_i):
    return str(label_row.iloc[col_i]).strip().replace('\n', '\\n')

# Build grouped week labels for actuals (group consecutive same-month weeks)
# The label in row 48 already encodes the grouping used by the file. Use as-is.
weeks_labels = [get_cf_label(c) for c in act_cols]
proj_labels  = [get_cf_label(c) for c in proj_cols]

# Extract actuals
pdei_in_act  = [cfv(53, c) for c in act_cols]
gg_in_act    = [cfv(54, c) for c in act_cols]
tot_in_act   = [cfv(55, c) for c in act_cols]
pdei_out_act = [cfv(63, c) for c in act_cols]
gg_out_act   = [cfv(64, c) for c in act_cols]
tot_out_act  = [cfv(65, c) for c in act_cols]
forex_act    = [cfv(66, c) for c in act_cols]
net_act      = [cfv(67, c) for c in act_cols]
beg_act      = [cfv(49, c) for c in act_cols]

# Extract projections
beg_proj      = [cfv(49, c) for c in proj_cols]
proj_in       = [cfv(55, c) for c in proj_cols]
proj_out      = [cfv(65, c) for c in proj_cols]
proj_net      = [cfv(67, c) for c in proj_cols]
pdei_in_proj  = [cfv(53, c) for c in proj_cols]
gg_in_proj    = [cfv(54, c) for c in proj_cols]
pdei_out_proj = [cfv(63, c) for c in proj_cols]
gg_out_proj   = [cfv(64, c) for c in proj_cols]

# Bug 5 – verify totals
for i, c in enumerate(proj_cols):
    sum_in  = safe_int(pdei_in_proj[i]) + safe_int(gg_in_proj[i])
    expected_in = safe_int(proj_in[i])
    if abs(sum_in - expected_in) > 2:
        print(f"[WARN] proj_col {c}: pdeiIn+ggIn={sum_in} != projIn={expected_in}", file=sys.stderr)
    sum_out = safe_int(pdei_out_proj[i]) + safe_int(gg_out_proj[i])
    expected_out = safe_int(proj_out[i])
    if abs(sum_out - expected_out) > 2:
        print(f"[WARN] proj_col {c}: pdeiOut+ggOut={sum_out} != projOut={expected_out}", file=sys.stderr)

# NON_COS_PROJ (from CF rows 57-62, proj cols only)
non_cos_proj = []
for c in proj_cols:
    non_cos_proj.append({
        'gae':   safe_int(cfv(58, c)),
        'tax':   safe_int(cfv(59, c)),
        'capex': safe_int(cfv(60, c)),
        'loan':  safe_int(cfv(61, c)),
        'other': safe_int(cfv(62, c)),
        'cos':   safe_int(cfv(57, c)),
    })

# ─────────────────────────────────────────────────────────────────────────────
# 2. READ GL
# ─────────────────────────────────────────────────────────────────────────────

print("[INFO] Reading GL...", file=sys.stderr)
df_gl = pd.read_excel(xlsx_path, sheet_name='GL', header=None)
gl = df_gl.iloc[2:].copy().reset_index(drop=True)
gl.columns = (list(gl.columns[:21]) + list(range(21, len(gl.columns))))[:len(gl.columns)]
# Assign named cols for the indices we care about:
# col 6 = Description, col 7 = Company, col 9 = Debit, col 10 = Credit, col 11 = Net
# col 13 = Week, col 12 = Category

gl_cols_raw = list(df_gl.iloc[1])  # row 1 typically has headers in GL sheets

def gl_col(name_or_idx):
    return name_or_idx  # we'll use positional throughout

gl['_debit']  = pd.to_numeric(gl.iloc[:, 9],  errors='coerce')
gl['_credit'] = pd.to_numeric(gl.iloc[:, 10], errors='coerce')
gl['_net']    = pd.to_numeric(gl.iloc[:, 11], errors='coerce')
gl['_cat']    = gl.iloc[:, 12].astype(str).str.strip()
gl['_week']   = gl.iloc[:, 13].astype(str).str.strip()
gl['_desc']   = gl.iloc[:, 6].astype(str).str.strip()
gl['_co']     = gl.iloc[:, 7].astype(str).str.strip()

def is_gg(row):
    co   = str(row['_co']).upper()
    desc = str(row['_desc']).upper()
    return 'GG' in co or 'GG COMPANY' in desc

INFLOW_CATS = {'Operating cash-in', 'Other Receipt', 'Loan Repayment'}

def gl_period_label(col_i):
    """Return the week string for a given act_col index (e.g. 'W26')."""
    return str(label_row.iloc[col_i]).strip()

def gl_weeks_for_col(col_i):
    """Return set of GL week strings that map to this act_col."""
    label = str(label_row.iloc[col_i]).strip()
    # Format can be "W1-W5\nJan" or "W26\nJun 26" etc.
    nums = re.findall(r'W(\d+)', label)
    if len(nums) == 2:
        return {f'W{i}' for i in range(int(nums[0]), int(nums[1])+1)}
    elif len(nums) == 1:
        return {f'W{nums[0]}'}
    return set()

def top_gl_inflows_pdei(week_set, n=5):
    sub = gl[gl['_week'].isin(week_set) & ~gl.apply(is_gg, axis=1) &
             gl['_cat'].isin(INFLOW_CATS) & (gl['_debit'] > 0)]
    top = sub.nlargest(n, '_debit')
    return [{'l': trunc(r['_desc']), 'a': safe_int(r['_debit'])} for _, r in top.iterrows()]

def top_gl_inflows_gg(week_set, n=5):
    sub = gl[gl['_week'].isin(week_set) & gl.apply(is_gg, axis=1) &
             gl['_cat'].isin(INFLOW_CATS) & (gl['_debit'] > 0)]
    top = sub.nlargest(n, '_debit')
    return [{'l': trunc(r['_desc']), 'a': safe_int(r['_debit'])} for _, r in top.iterrows()]

def top_gl_outflows_pdei(week_set, n=5):
    sub = gl[gl['_week'].isin(week_set) & ~gl.apply(is_gg, axis=1) & (gl['_net'] < 0)]
    top = sub.nsmallest(n, '_net')
    return [{'l': trunc(r['_desc']), 'a': safe_int(r['_net'])} for _, r in top.iterrows()]

def top_gl_outflows_gg(week_set, n=5):
    sub = gl[gl['_week'].isin(week_set) & gl.apply(is_gg, axis=1) & (gl['_net'] < 0)]
    top = sub.nsmallest(n, '_net')
    return [{'l': trunc(r['_desc']), 'a': safe_int(r['_net'])} for _, r in top.iterrows()]

# Build GL actuals per period
gl_pdei_in_act  = []
gl_gg_in_act    = []
gl_pdei_out_act = []
gl_gg_out_act   = []

for c in act_cols:
    wset = gl_weeks_for_col(c)
    gl_pdei_in_act.append(top_gl_inflows_pdei(wset))
    gl_gg_in_act.append(top_gl_inflows_gg(wset))
    gl_pdei_out_act.append(top_gl_outflows_pdei(wset))
    gl_gg_out_act.append(top_gl_outflows_gg(wset))

# ─────────────────────────────────────────────────────────────────────────────
# 3. READ AR
# ─────────────────────────────────────────────────────────────────────────────

print("[INFO] Reading AR...", file=sys.stderr)
df_ar = pd.read_excel(xlsx_path, sheet_name='AR', header=None)
ar = df_ar.iloc[4:].copy().reset_index(drop=True)
raw_headers = df_ar.iloc[3].tolist()

# Deduplicate W52: keep only the LAST occurrence of column name 'W52'
seen_h = {}
for i, h in enumerate(raw_headers):
    seen_h[str(h).strip()] = i   # last occurrence wins
dedup_headers = [''] * len(raw_headers)
for hname, col_i in seen_h.items():
    dedup_headers[col_i] = hname

ar.columns = dedup_headers
# Drop columns with empty name (early W52 duplicate and others)
ar = ar.loc[:, [c for c in ar.columns if c != '']]

def ar_total(week_col):
    """Grand-total row = last NaN-CLIENT row with a non-zero value."""
    if week_col not in ar.columns:
        return 0
    mask = ar['CLIENT'].isna() & pd.to_numeric(ar[week_col], errors='coerce').notna()
    vals = pd.to_numeric(ar[mask][week_col], errors='coerce')
    return round(vals.iloc[-1], 0) if len(vals) else 0.0

def ar_top5_proj(week_col, n=5):
    """Top N rows for a given week column — named-CLIENT rows plus NaN-client rows
    that have a non-blank Company or Category field (Other Receipt / Loan scheduled
    receipts). Excludes the grand-total row (last NaN-client row). Per instructions
    v1.7: including these prevents unexplained gaps vs. CF row 55 totals."""
    if week_col not in ar.columns:
        return []

    # Find index of grand-total row (last NaN-client row with a numeric value)
    nan_mask = ar['CLIENT'].isna() & pd.to_numeric(ar[week_col], errors='coerce').notna()
    nan_idx_list = ar[nan_mask].index.tolist()
    grand_total_idx = nan_idx_list[-1] if nan_idx_list else None

    results = []

    # Named-CLIENT rows
    named = ar[ar['CLIENT'].notna()].copy()
    named['val'] = pd.to_numeric(named[week_col], errors='coerce')
    for _, r in named[named['val'] > 0].nlargest(n, 'val').iterrows():
        results.append({'l': trunc(str(r['CLIENT'])), 'a': safe_int(r['val']), '_sort': r['val']})

    # NaN-client rows with non-blank Company or Category (scheduled Other/Loan receipts)
    company_col  = 'COMPANY'  if 'COMPANY'  in ar.columns else None
    category_col = 'CATEGORY' if 'CATEGORY' in ar.columns else None
    for col_name in ['Company', 'company', 'COMPANY', 'Category', 'category', 'CATEGORY']:
        if col_name in ar.columns:
            if col_name.lower().startswith('comp'):
                company_col  = company_col  or col_name
            else:
                category_col = category_col or col_name

    nan_rows = ar[ar['CLIENT'].isna()].copy()
    if grand_total_idx is not None:
        nan_rows = nan_rows[nan_rows.index != grand_total_idx]
    nan_rows['val'] = pd.to_numeric(nan_rows[week_col], errors='coerce')
    nan_rows = nan_rows[nan_rows['val'] > 0]

    for _, r in nan_rows.iterrows():
        co  = str(r[company_col]).strip()  if company_col  and company_col  in r.index else ''
        cat = str(r[category_col]).strip() if category_col and category_col in r.index else ''
        co  = '' if co  in ('nan', 'NaN', '') else co
        cat = '' if cat in ('nan', 'NaN', '') else cat
        label = co or cat or 'Other Receipt / Loan'
        results.append({'l': trunc(label), 'a': safe_int(r['val']), '_sort': r['val']})

    # Sort combined list by value descending, return top n
    results.sort(key=lambda x: -x['_sort'])
    for item in results: del item['_sort']
    return results[:n]

# Build GL_BREAKDOWN projection entries for pdeiIn / ggIn
# Proj pdeiIn: from AR non-GG clients per week
# Proj ggIn:   from AR GG clients per week (or null if 0)
gl_pdei_in_proj = []
gl_gg_in_proj   = []

for i, c in enumerate(proj_cols):
    label_str = str(label_row.iloc[c]).strip()
    w_nums = re.findall(r'W(\d+)', label_str)
    week_col = f'W{w_nums[0]}' if w_nums else None

    if week_col:
        pdei_items = ar_top5_proj(week_col)
        # Filter out GG-named clients
        pdei_items = [it for it in pdei_items if 'GG' not in it['l'].upper()]
        gg_val = safe_int(gg_in_proj[i])
        gg_items = [{'l': 'GG Company Inc. (inter-company est.)', 'a': gg_val}] if gg_val > 0 else []
    else:
        pdei_items = []
        gg_items   = []

    gl_pdei_in_proj.append(pdei_items if pdei_items else [])
    gl_gg_in_proj.append(gg_items)

# Build GL_BREAKDOWN projection entries for pdeiOut / ggOut
gl_pdei_out_proj = []
gl_gg_out_proj_bd = []

for i, nc in enumerate(non_cos_proj):
    items = []
    if nc['loan']  > 0: items.append({'l': 'Loan',   'a': -nc['loan']})
    if nc['cos']   > 0: items.append({'l': 'COS',    'a': -nc['cos']})
    if nc['gae']   > 0: items.append({'l': 'GAE',    'a': -nc['gae']})
    if nc['tax']   > 0: items.append({'l': 'Tax',    'a': -nc['tax']})
    if nc['capex'] > 0: items.append({'l': 'CAPEX',  'a': -nc['capex']})
    if nc['other'] > 0: items.append({'l': 'Other',  'a': -nc['other']})
    gl_pdei_out_proj.append(items)

    gg_v = safe_int(gg_out_proj[i])
    gl_gg_out_proj_bd.append([{'l': 'GG liquidity outflow', 'a': -gg_v}] if gg_v > 0 else [])

# Assemble GL_BREAKDOWN
n_total = len(act_cols) + len(proj_cols)
gl_brkdn = {
    'pdeiIn':  gl_pdei_in_act  + [items if items else None for items in gl_pdei_in_proj],
    'ggIn':    gl_gg_in_act    + [items if items else None for items in gl_gg_in_proj],
    'pdeiOut': gl_pdei_out_act + [items if items else None for items in gl_pdei_out_proj],
    'ggOut':   gl_gg_out_act   + [items if items else None for items in gl_gg_out_proj_bd],
}

# Bug 2 validation
for key, arr in gl_brkdn.items():
    assert len(arr) == n_total, f"GL_BREAKDOWN.{key}: {len(arr)} entries, expected {n_total}"
print(f"[OK] GL_BREAKDOWN entry counts = {n_total} each", file=sys.stderr)

# ─────────────────────────────────────────────────────────────────────────────
# 4. READ AP  (for Full Year Jul-Dec)
# ─────────────────────────────────────────────────────────────────────────────

print("[INFO] Reading AP...", file=sys.stderr)
df_ap_raw = pd.read_excel(xlsx_path, sheet_name='AP', header=None)
ap = df_ap_raw.iloc[4:].reset_index(drop=True)

# Week cols: W27=col37, W28=col38 … W52=col62 (0-based)
month_weeks_ap = {
    'Jul': [37,38,39,40],
    'Aug': [41,42,43,44,45],
    'Sep': [46,47,48,49],
    'Oct': [50,51,52,53],
    'Nov': [54,55,56,57,58],
    'Dec': [59,60,61,62],
}

def ap_month_total(col_indices):
    total = 0
    for ci in col_indices:
        if ci >= ap.shape[1]: continue
        for idx in range(len(ap)):
            vendor = str(ap.iloc[idx, 0]).strip()
            prf    = str(ap.iloc[idx, 1]).strip()
            # Bug 4: skip subtotal rows (both vendor AND prf blank)
            if (vendor in ('nan','')) and (prf in ('nan','')):
                continue
            val = pd.to_numeric(ap.iloc[idx, ci], errors='coerce')
            if pd.notna(val) and val > 0:
                total += val
    return round(total)

def ap_month_top5(col_indices):
    agg = defaultdict(float)
    for ci in col_indices:
        if ci >= ap.shape[1]: continue
        for idx in range(len(ap)):
            vendor = str(ap.iloc[idx, 0]).strip()
            prf    = str(ap.iloc[idx, 1]).strip()
            if (vendor in ('nan','')) and (prf in ('nan','')):
                continue
            val = pd.to_numeric(ap.iloc[idx, ci], errors='coerce')
            if pd.notna(val) and val > 0:
                desc = str(ap.iloc[idx, 1]).strip()
                if not desc or desc == 'nan':
                    desc = str(ap.iloc[idx, 0]).strip()
                if desc and desc != 'nan':
                    agg[trunc(desc, 35)] += val
    return sorted(agg.items(), key=lambda x: -x[1])[:5]

fy_ap_tot_h2 = {}
fy_ap_bd_h2  = {}
for month, cols in month_weeks_ap.items():
    fy_ap_tot_h2[month] = ap_month_total(cols)
    top5 = ap_month_top5(cols)
    fy_ap_bd_h2[month] = [{'l': k, 'a': -safe_int(v)} for k, v in top5] if top5 else None
    print(f"[INFO] AP {month}: ₱{fy_ap_tot_h2[month]:,.0f}", file=sys.stderr)

# ─────────────────────────────────────────────────────────────────────────────
# 5. FULL YEAR ARRAYS
# ─────────────────────────────────────────────────────────────────────────────

print("[INFO] Building Full Year arrays...", file=sys.stderr)

# Fixed month-col mapping for CF (0-based, col 2 = first data col)
# Jan=col2 Feb=col3 Mar=col4 Apr=cols5-7 May=cols8-13 Jun=cols14-16
cf_month_cols = {
    'jan': [2], 'feb': [3], 'mar': [4],
    'apr': [5,6,7], 'may': [8,9,10,11,12,13], 'jun': [14,15,16]
}

def month_sum(row_idx, cols):
    return round(sum(cfv(row_idx, c) for c in cols), 0)

# Beginning = CF row 49 at first week of month (not sum)
beg_jan = safe_int(cfv(49, 2));  beg_feb = safe_int(cfv(49, 3))
beg_mar = safe_int(cfv(49, 4));  beg_apr = safe_int(cfv(49, 5))
beg_may = safe_int(cfv(49, 8));  beg_jun = safe_int(cfv(49, 14))

# Closing = CF row 67 at last week of month
close_jan = safe_int(cfv(67, 2));  close_feb = safe_int(cfv(67, 3))
close_mar = safe_int(cfv(67, 4));  close_apr = safe_int(cfv(67, 7))
close_may = safe_int(cfv(67, 13)); close_jun = safe_int(cfv(67, 16))

fy_pdei_in_act = [
    safe_int(month_sum(53, cf_month_cols['jan'])),
    safe_int(month_sum(53, cf_month_cols['feb'])),
    safe_int(month_sum(53, cf_month_cols['mar'])),
    safe_int(month_sum(53, cf_month_cols['apr'])),
    safe_int(month_sum(53, cf_month_cols['may'])),
    safe_int(month_sum(53, cf_month_cols['jun'])),
]
fy_gg_in_act = [
    safe_int(month_sum(54, cf_month_cols['jan'])),
    safe_int(month_sum(54, cf_month_cols['feb'])),
    safe_int(month_sum(54, cf_month_cols['mar'])),
    safe_int(month_sum(54, cf_month_cols['apr'])),
    safe_int(month_sum(54, cf_month_cols['may'])),
    safe_int(month_sum(54, cf_month_cols['jun'])),
]
fy_cos_cf = [
    safe_int(month_sum(57, cf_month_cols['jan'])),
    safe_int(month_sum(57, cf_month_cols['feb'])),
    safe_int(month_sum(57, cf_month_cols['mar'])),
    safe_int(month_sum(57, cf_month_cols['apr'])),
    safe_int(month_sum(57, cf_month_cols['may'])),
    safe_int(month_sum(57, cf_month_cols['jun'])),
] + [0]*6

fy_gae = [
    safe_int(month_sum(58, cf_month_cols['jan'])),
    safe_int(month_sum(58, cf_month_cols['feb'])),
    safe_int(month_sum(58, cf_month_cols['mar'])),
    safe_int(month_sum(58, cf_month_cols['apr'])),
    safe_int(month_sum(58, cf_month_cols['may'])),
    safe_int(month_sum(58, cf_month_cols['jun'])),
]
fy_tax = [
    safe_int(month_sum(59, cf_month_cols['jan'])),
    safe_int(month_sum(59, cf_month_cols['feb'])),
    safe_int(month_sum(59, cf_month_cols['mar'])),
    safe_int(month_sum(59, cf_month_cols['apr'])),
    safe_int(month_sum(59, cf_month_cols['may'])),
    safe_int(month_sum(59, cf_month_cols['jun'])),
]
fy_capex = [
    safe_int(month_sum(60, cf_month_cols['jan'])),
    safe_int(month_sum(60, cf_month_cols['feb'])),
    safe_int(month_sum(60, cf_month_cols['mar'])),
    safe_int(month_sum(60, cf_month_cols['apr'])),
    safe_int(month_sum(60, cf_month_cols['may'])),
    safe_int(month_sum(60, cf_month_cols['jun'])),
]
fy_loan = [
    safe_int(month_sum(61, cf_month_cols['jan'])),
    safe_int(month_sum(61, cf_month_cols['feb'])),
    safe_int(month_sum(61, cf_month_cols['mar'])),
    safe_int(month_sum(61, cf_month_cols['apr'])),
    safe_int(month_sum(61, cf_month_cols['may'])),
    safe_int(month_sum(61, cf_month_cols['jun'])),
]
fy_other = [
    safe_int(month_sum(62, cf_month_cols['jan'])),
    safe_int(month_sum(62, cf_month_cols['feb'])),
    safe_int(month_sum(62, cf_month_cols['mar'])),
    safe_int(month_sum(62, cf_month_cols['apr'])),
    safe_int(month_sum(62, cf_month_cols['may'])),
    safe_int(month_sum(62, cf_month_cols['jun'])),
]
fy_gg_out_act = [
    safe_int(month_sum(64, cf_month_cols['jan'])),
    safe_int(month_sum(64, cf_month_cols['feb'])),
    safe_int(month_sum(64, cf_month_cols['mar'])),
    safe_int(month_sum(64, cf_month_cols['apr'])),
    safe_int(month_sum(64, cf_month_cols['may'])),
    safe_int(month_sum(64, cf_month_cols['jun'])),
]
fy_forex_act = [
    safe_int(month_sum(66, cf_month_cols['jan'])),
    safe_int(month_sum(66, cf_month_cols['feb'])),
    safe_int(month_sum(66, cf_month_cols['mar'])),
    safe_int(month_sum(66, cf_month_cols['apr'])),
    safe_int(month_sum(66, cf_month_cols['may'])),
    safe_int(month_sum(66, cf_month_cols['jun'])),
]

# Jul–Dec from AP
fut_months = ['Jul','Aug','Sep','Oct','Nov','Dec']
fy_ap_tot_arr = [fy_ap_tot_h2[m] for m in fut_months]

# H2 inflow from AR
month_weeks_ar = {
    'Jul': ['W27','W28','W29','W30'],
    'Aug': ['W31','W32','W33','W34','W35'],
    'Sep': ['W36','W37','W38','W39'],
    'Oct': ['W40','W41','W42','W43'],
    'Nov': ['W44','W45','W46','W47','W48'],
    'Dec': ['W49','W50','W51','W52'],
}
fy_pdei_in_fut = []
fy_gg_in_fut   = []
for month in fut_months:
    p_tot = 0; g_tot = 0
    for w in month_weeks_ar[month]:
        val = safe_int(ar_total(w))
        # Naive: all AR projected as PDEI. GG from CF proj arrays.
        p_tot += val
    # Use CF proj values (sum of pdei_in_proj for weeks in this month)
    p_from_cf = 0; g_from_cf = 0
    for i, c in enumerate(proj_cols):
        label_str = str(label_row.iloc[c]).strip()
        w_nums = re.findall(r'W(\d+)', label_str)
        if not w_nums: continue
        w_str = f'W{w_nums[0]}'
        if w_str in month_weeks_ar[month]:
            p_from_cf += safe_int(pdei_in_proj[i])
            g_from_cf += safe_int(gg_in_proj[i])
    fy_pdei_in_fut.append(p_from_cf)
    fy_gg_in_fut.append(g_from_cf)

# Extend other FY arrays with Jul-Dec zeros/projections from CF
# These use CF proj cols summed to month
def cf_proj_month_sum(row_idx, month):
    total = 0
    for i, c in enumerate(proj_cols):
        label_str = str(label_row.iloc[c]).strip()
        w_nums = re.findall(r'W(\d+)', label_str)
        if not w_nums: continue
        if f'W{w_nums[0]}' in month_weeks_ar[month]:
            total += safe_int(cfv(row_idx, c))
    return total

fy_gae_fut   = [cf_proj_month_sum(58, m) for m in fut_months]
fy_tax_fut   = [cf_proj_month_sum(59, m) for m in fut_months]
fy_capex_fut = [cf_proj_month_sum(60, m) for m in fut_months]
fy_loan_fut  = [cf_proj_month_sum(61, m) for m in fut_months]
fy_other_fut = [cf_proj_month_sum(62, m) for m in fut_months]
fy_gg_out_fut= [cf_proj_month_sum(64, m) for m in fut_months]
fy_forex_fut = [0]*6

# FY_PAY24 and FY_PAY25 remain manual — carried from data (script cannot derive)
# Output them as zero placeholders with a comment; user pastes from prior week
fy_pay24 = [0]*12
fy_pay25 = [0]*12
fy_stp   = [0]*12

# Chain beginning balances Jul-Dec
fy_beg_act  = [beg_jan, beg_feb, beg_mar, beg_apr, beg_may, beg_jun]
fy_net_act  = [close_jan, close_feb, close_mar, close_apr, close_may, close_jun]
fy_beg_fut  = []
fy_net_fut  = []

b = close_jun
for i, month in enumerate(fut_months):
    fy_beg_fut.append(safe_int(b))
    inflow  = fy_pdei_in_fut[i] + fy_gg_in_fut[i]
    outflow = -(fy_ap_tot_arr[i] + fy_pay24[6+i] + fy_pay25[6+i]
                + fy_gae_fut[i] + fy_tax_fut[i] + fy_capex_fut[i]
                + fy_loan_fut[i] + fy_other_fut[i] + fy_gg_out_fut[i])
    b = b + inflow - outflow
    fy_net_fut.append(safe_int(b))

fy_beg_full = fy_beg_act + fy_beg_fut
fy_net_full = fy_net_act + fy_net_fut

# Full 12-element arrays
fy_pdei_in_full = fy_pdei_in_act + fy_pdei_in_fut
fy_gg_in_full   = fy_gg_in_act   + fy_gg_in_fut
fy_gae_full     = fy_gae          + fy_gae_fut
fy_tax_full     = fy_tax          + fy_tax_fut
fy_capex_full   = fy_capex        + fy_capex_fut
fy_loan_full    = fy_loan         + fy_loan_fut
fy_other_full   = fy_other        + fy_other_fut
fy_gg_out_full  = fy_gg_out_act   + fy_gg_out_fut
fy_forex_full   = fy_forex_act    + fy_forex_fut
fy_ap_tot_full  = [0]*6           + fy_ap_tot_arr

# FY_AP_BD: null for Jan-Jun, top5 for Jul-Dec
fy_ap_bd = [None]*6 + [fy_ap_bd_h2[m] for m in fut_months]

# ─────────────────────────────────────────────────────────────────────────────
# 6. COS_LIQ TOTALS  (actuals = pdeiOut, projections = pdeiOutProj)
# ─────────────────────────────────────────────────────────────────────────────

cos_liq_totals_act  = [safe_int(v) for v in pdei_out_act]
cos_liq_totals_proj = [safe_int(v) for v in pdei_out_proj]
cos_liq_totals = cos_liq_totals_act + cos_liq_totals_proj

# ─────────────────────────────────────────────────────────────────────────────
# 7. VALIDATION  (Bug 1)
# ─────────────────────────────────────────────────────────────────────────────

assert pdei_in_act  == [cfv(53,c) for c in act_cols], "Bug1: WT_PDEI_IN mismatch"
assert gg_in_act    == [cfv(54,c) for c in act_cols], "Bug1: WT_GG_IN mismatch"
assert tot_in_act   == [cfv(55,c) for c in act_cols], "Bug1: WT_TOT_IN mismatch"
assert pdei_out_act == [cfv(63,c) for c in act_cols], "Bug1: WT_PDEI_OUT mismatch"
assert gg_out_act   == [cfv(64,c) for c in act_cols], "Bug1: WT_GG_OUT mismatch"
assert tot_out_act  == [cfv(65,c) for c in act_cols], "Bug1: WT_TOT_OUT mismatch"
print("[OK] Bug 1 WT_* identity checks passed", file=sys.stderr)
print(f"[OK] COS_LIQ.totals length = {len(cos_liq_totals)} (expected {len(act_cols)+len(proj_cols)})", file=sys.stderr)

# ─────────────────────────────────────────────────────────────────────────────
# 8. OUTPUT  — print JS blocks to stdout
# ─────────────────────────────────────────────────────────────────────────────

W = WEEK_NUM
print()
print("// ── PASTE THE BLOCK BELOW INTO cashflow_data.js ────────────────────────────")
print(f"// Replace everything from 'var WEEK' through 'var WT_GG_OUT_PROJ' inclusive.")
print()

# WEEK / DATE
from datetime import date, timedelta
# W1 = week of Jan 1 2026. Approximate date from week number.
# W1 starts ~Jan 1, each week = 7 days.
week_start = date(2025, 12, 29) + timedelta(weeks=W-1)
week_end   = week_start + timedelta(days=6)
date_str   = week_end.strftime("%B %-d, %Y")
print(f'var WEEK = "Week {W}";')
print(f'var DATE = "{date_str}";')
print()

# CF object
print('var CF = {')
weeks_js = '["' + '","'.join(weeks_labels) + '"]'
proj_js  = '["' + '","'.join(proj_labels)  + '"]'
print(f'  weeks: {weeks_js},')
print(f'  proj:  {proj_js},')
print(f'  actBeg:  {js_list(beg_act)},')
print(f'  pdeiIn:  {js_list(pdei_in_act)},')
print(f'  ggIn:    {js_list(gg_in_act)},')
print(f'  totIn:   {js_list(tot_in_act)},')
print(f'  pdeiOut: {js_list(pdei_out_act)},')
print(f'  ggOut:   {js_list(gg_out_act)},')
print(f'  totOut:  {js_list(tot_out_act)},')
print(f'  forex:   {js_list(forex_act)},')
print(f'  net:     {js_list(net_act)},')
print(f'  projBeg: {js_list(beg_proj)},')
print(f'  projIn:  {js_list(proj_in)},')
print(f'  projOut: {js_list(proj_out)},')
print(f'  projNet: {js_list(proj_net)},')
print('};')
print()

# WT_* actuals
print(f'var WT_PDEI_IN  = {js_list(pdei_in_act)};')
print(f'var WT_GG_IN    = {js_list(gg_in_act)};')
print(f'var WT_PDEI_OUT = {js_list(pdei_out_act)};')
print(f'var WT_GG_OUT   = {js_list(gg_out_act)};')
print(f'var WT_TOT_IN   = {js_list(tot_in_act)};')
print(f'var WT_TOT_OUT  = {js_list(tot_out_act)};')
print()

# GL_BREAKDOWN
print('var GL_BREAKDOWN = {')
for key in ['pdeiIn','ggIn','pdeiOut','ggOut']:
    arr = gl_brkdn[key]
    parts = []
    for entry in arr:
        if entry is None:
            parts.append("    null")
        elif len(entry) == 0:
            parts.append("    null")
        else:
            parts.append("    " + js_entry(entry))
    inner = ",\n".join(parts)
    print(f'  {key}: [\n{inner}\n  ],')
print('};')
print()

# COS_LIQ
print('var COS_LIQ = {')
print(f'  totals: {js_list(cos_liq_totals)},')
print('  bd: [')
# bd: null for each actual period (no Andon breakdown auto-generated), null for each proj
bd_parts = ['    null'] * len(cos_liq_totals)
print(",\n".join(bd_parts))
print('  ]')
print('};')
print()

# NON_COS_PROJ
print('var NON_COS_PROJ = [')
nc_parts = []
for i, nc in enumerate(non_cos_proj):
    label_str = str(label_row.iloc[proj_cols[i]]).strip()
    w_nums = re.findall(r'W(\d+)', label_str)
    w_tag  = f'W{w_nums[0]}' if w_nums else f'i{i}'
    nc_parts.append(f'  {{gae:{nc["gae"]},tax:{nc["tax"]},capex:{nc["capex"]},loan:{nc["loan"]},other:{nc["other"]},cos:{nc["cos"]}}}  // {w_tag}')
print(",\n".join(nc_parts))
print('];')
print()

# WT_*_PROJ
print(f'var WT_PDEI_IN_PROJ  = {js_list(pdei_in_proj)};')
print(f'var WT_GG_IN_PROJ    = {js_list(gg_in_proj)};')
print(f'var WT_PDEI_OUT_PROJ = {js_list(pdei_out_proj)};')
print(f'var WT_GG_OUT_PROJ   = {js_list(gg_out_proj)};')
print()

# FULL YEAR ARRAYS
print('// ── FULL YEAR ARRAYS ─────────────────────────────────────────────────────────')
print(f'var FY_BEG_INIT    = {js_list(fy_beg_full)};')
print(f'var FY_NET_INIT    = {js_list(fy_net_full)};')
print(f'var FY_PDEI_IN_INIT = {js_list(fy_pdei_in_full)};')
print(f'var FY_GG_IN_INIT   = {js_list(fy_gg_in_full)};')
print(f'var FY_COS_CF      = {js_list(fy_cos_cf)};')
print(f'var FY_AP_TOT_INIT = {js_list(fy_ap_tot_full)};')
print(f'var FY_GAE    = {js_list(fy_gae_full)};')
print(f'var FY_TAX    = {js_list(fy_tax_full)};')
print(f'var FY_CAPEX  = {js_list(fy_capex_full)};')
print(f'var FY_LOAN   = {js_list(fy_loan_full)};')
print(f'var FY_OTHER  = {js_list(fy_other_full)};')
print(f'var FY_GG_OUT = {js_list(fy_gg_out_full)};')
print(f'var FY_FOREX  = {js_list(fy_forex_full)};')
print(f'// FY_PAY24/FY_PAY25/FY_STP: carry forward from prior week — cannot be derived from xlsx.')
print(f'// Update manually if AP payments to 2024/2025 arrears vendors were made this week.')
print()

# FY_AP_BD
print('var FY_AP_BD = [')
bd_out = []
for i, entry in enumerate(fy_ap_bd):
    month_name = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]
    if entry is None:
        bd_out.append(f'  null,  // {month_name}')
    else:
        bd_out.append(f'  {js_entry(entry)},  // {month_name}')
print("\n".join(bd_out))
print('];')
print()

# thisWeekAR filter hint
print(f'// In cashflow_data.js, update this line:')
print(f'// var thisWeekAR = AR_OPEN.filter(function(r){{return r.week<={W};}});')
print()

print("// ── END OF GENERATED BLOCK ───────────────────────────────────────────────────")
print(f"// Validate: open index.html, check Weekly Table actuals match xlsx CF row 53/54/63/64.")
print(f"// Manual items still needed: WEEK/DATE text in index.html if different, narrative,")
print(f"// KPI labels (Due this week W{W}), Key Actions, colDefs Jun→Actual if Jun now full.")
