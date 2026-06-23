// ── MINESKI CASHFLOW DATA ─────────────────────────────────────────────────────
// Update this file each week. The HTML (Mineski_Cashflow_V2.html) contains
// only rendering logic and never needs editing for routine data updates.
// ─────────────────────────────────────────────────────────────────────────────

// ── WEEK / DATE ───────────────────────────────────────────────────────────────
var WEEK = "Week 26";
var DATE = "June 23, 2026";

// ── WEEKLY CASH FLOW TABLE ────────────────────────────────────────────────────
// Source: PH_Cash_Flow_Monitoring · CF for Mancom tab
// Update actBeg/pdeiIn/ggIn/totIn/pdeiOut/ggOut/totOut/forex/net each week.
// Add new projection columns to proj/projBeg/projIn/projOut/projNet arrays.
var CF = {
  weeks: ["W1-W5\nJan","W6-W9\nFeb","W10-W13\nMar","W14-W18\nApr","W19-W22\nMay","W23\nJun 5","W24\nJun 12","W25\nJun 19"],
  proj:  ["W26\nJun 26","W27\nJul 3","W28\nJul 10","W29\nJul 17","W30\nJul 24","W31\nJul 31","W32\nAug 7","W33\nAug 14","W34\nAug 21","W35\nAug 28","W36\nSep 4","W37\nSep 11","W38\nSep 18","W39\nSep 25","W40\nOct 2","W41\nOct 9","W42\nOct 16","W43\nOct 23","W44\nOct 30","W45\nNov 6","W46\nNov 13","W47\nNov 20","W48\nNov 27","W49\nDec 4","W50\nDec 11","W51\nDec 18","W52\nDec 25"],
  actBeg:  [12652564,4697131,3367012,3925661,2108492,599016,1890782,1707125],
  pdeiIn:  [16323424,9067184,13219958,29063859,13433202,2556563,2677734,1532148],
  ggIn:    [20799694,3302846,23568842,2001826,1950465,0,4162966,0],
  totIn:   [37123118,12370030,36788799,31065685,15383666,2556563,6840700,1532148],
  pdeiOut: [29112421,7977406,13025942,28240666,15018159,1258176,3423335,1479730],
  ggOut:   [16398498,5723761,23187381,4650000,1883759,6000,3551022,649672],
  totOut:  [45510920,13701167,36213323,32890666,16901918,1264176,6974357,2129402],
  forex:   [-432368,-1019,16827,-7812,-8776,621,50000,438994],
  net:     [4697131,3367012,3925661,2108492,599016,1890782,1707125,670877],
  projBeg: [670877,58945,-703582,5108277,-4622881,-15364028,-20961071,-26994754,-14945832,-23220559,-26438831,-26382541,-28506224,-31768924,-31980460,-34170460,-35465941,-39115939,-40015939,-42831909,-43524529,-47410912,-48510912,-51126881,-55119502,-59205884,-60205884],
  projIn:  [3779893,9678457,12282807,0,80724,1571673,0,19416647,0,3194344,7327604,0,0,854434,0,0,0,0,0,0,0,0,0,0,0,0,3337709],
  projOut: [4391825,10440983,6470948,9731157,10821871,7168716,6033683,7367724,8274728,6412616,7271315,2123682,3262700,1065970,2190000,1295481,3649999,900000,2815970,692620,3886382,1100000,2615970,3992620,4086382,1000000,2648448],
  projNet: [58945,-703582,5108277,-4622881,-15364028,-20961071,-26994754,-14945832,-23220559,-26438831,-26382541,-28506224,-31768924,-31980460,-34170460,-35465941,-39115939,-40015939,-42831909,-43524529,-47410912,-48510912,-51126881,-55119502,-59205884,-60205884,-59516623],
};

// Actuals for weekly table (PDEI+GG split)
var WT_PDEI_IN  = [16323424,9067184,13219958,29063859,13433202,2556563,2677734,1532148];
var WT_GG_IN    = [20799694,3302846,23568842,2001826,1950465,0,4162966,0];
var WT_PDEI_OUT = [29112421,7977406,13025942,28240666,15018159,1258176,3423335,1479730];
var WT_GG_OUT   = [16398498,5723761,23187381,4650000,1883759,6000,3551022,649672];
var WT_TOT_IN   = [37123118,12370030,36788799,31065685,15383666,2556563,6840700,1532148];
var WT_TOT_OUT  = [45510920,13701167,36213323,32890666,16901918,1264176,6974357,2129402];

// GL breakdown data per period & category (for click-to-expand)
var GL_BREAKDOWN = {
  pdeiIn: [
    [{l:"Gamemaster Integrated Inc.",a:3409542},{l:"Cignal TV, Inc.",a:2231270},{l:"AB Leisure Exponent (BingoPlus)",a:385156},{l:"TEG Holding Pte. Ltd.",a:146595}],
    [{l:"Dar Andrew Cayabyab",a:2618821},{l:"CCAP / Jobstreet / misc",a:1459553},{l:"Bank Transfer SB",a:500000}],
    [{l:"Dar Andrew Cayabyab",a:3000000},{l:"Digital Trigger BuzzOne",a:509006},{l:"Bank Transfer SB",a:500000},{l:"Federal Land / LARES",a:577733}],
    [{l:"Moonton MPL S17 DP",a:22240523},{l:"Infinitech Sportsplus MPBL",a:1801348},{l:"Alianza Grande / Dar",a:2686607},{l:"Infinitech addl.",a:885033}],
    [{l:"Dar Andrew Cayabyab",a:3500000},{l:"SM Prime Holdings Inc.",a:2906285},{l:"Slash Money / Dar addl.",a:3100999},{l:"Security Bank misc",a:476428}],
    [{l:"Dar Andrew Cayabyab",a:2500000},{l:"TEG Holding Pte. Ltd.",a:24959},{l:"ChinaBank misc",a:16100},{l:"Cash Adv. Liquidation",a:12240}],
    [{l:"GG Company Inc. (inter-company)",a:2547364},{l:"Bounce Marketing Inc.",a:100212},{l:"Jobstreet PH",a:30158}],  // W24 actual
    [{l:"Dar Andrew Cayabyab",a:500000},{l:"GG Company Inc. (inter-company)",a:500000},{l:"Cash Adv. Liquidations",a:32148}],  // W25 actual
    null,  // W26 proj — no PDEI inflow projected
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
    [{l:"PDEI collections (AR)",a:270878}],
    null,null,null,null,null
  ],
  ggIn: [
    [{l:"GG Company Inc. (inter-company)",a:10000000},{l:"GG misc",a:19599}],
    [{l:"GG Company Inc. (inter-company)",a:4657594}],
    [{l:"GG Company Inc. (inter-company)",a:9019911}],
    [{l:"GG Company Inc. misc",a:25021}],
    [{l:"GG Company Inc. (inter-company)",a:28479}],
    null,
    [{l:"GG Company Inc. (inter-company)",a:4162966}],  // W24 actual
    null,  // W25 actual — no GG inflow
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null
  ],
  pdeiOut: [
    [{l:"Lilith Network HK Limited",a:-10624928},{l:"Dar Andrew Cayabyab",a:-10000000},{l:"Payroll",a:-2643958},{l:"Pillar Digital E-Com",a:-917078}],
    [{l:"Payroll",a:-2782935},{l:"Lilith Network HK Limited",a:-841811},{l:"Bank Transfer SB",a:-607836}],
    [{l:"Red Apple Entertainment",a:-2535500},{l:"Stage One Event Services",a:-1925000},{l:"Payroll",a:-2869093},{l:"Bank Transfer SB",a:-1192158}],
    [{l:"Bank Transfer Chinabank",a:-22240000},{l:"Dar Andrew Cayabyab",a:-9270000},{l:"Bank Transfer Chinabank",a:-1700000}],
    [{l:"Bank Transfer Chinabank",a:-3650000},{l:"Slash Money / SBC",a:-1600999},{l:"Payroll",a:-3084202},{l:"Lilith Network HK Limited",a:-895135},{l:"XSTATIC / Kollab etc.",a:-743739}],
    [{l:"Bank Transfer SBC",a:-600000},{l:"Philhealthcare, Inc.",a:-284905},{l:"Robinsons Land Corp.",a:-239711},{l:"Sharon Robins",a:-57274}],
    [{l:"COS",a:-969435},{l:"GAE",a:-1992401},{l:"Tax",a:-430449},{l:"CAPEX",a:-31050}],  // W24 actual
    [{l:"COS",a:-961625},{l:"GAE",a:-499504},{l:"Other",a:-18600}],  // W25 actual
    [{l:"COS",a:-725000},{l:"GAE",a:-2200855},{l:"Loan",a:-500000},{l:"Other",a:-855586}],  // W26 proj
    [{l:"COS",a:-1444743},{l:"GAE",a:-756000},{l:"Loan",a:-7980240},{l:"Other",a:-60000}],  // W27 Jul3
    [{l:"COS",a:-5026349},{l:"GAE",a:-1041737},{l:"Other",a:-60000}],  // W28
    [{l:"COS",a:-4674437},{l:"GAE",a:-3369422},{l:"Tax",a:-1487299}],  // W29
    [{l:"COS",a:-9811488},{l:"Tax",a:-800000}],  // W30
    [{l:"COS",a:-4263130},{l:"GAE",a:-1650000},{l:"Other",a:-855586}],  // W31
    [{l:"COS",a:-4328814},{l:"GAE",a:-1252249},{l:"Loan",a:-52620}],  // W32
    [{l:"COS",a:-3694042},{l:"GAE",a:-2650000},{l:"Tax",a:-800000}],  // W33
    [{l:"COS",a:-6762028},{l:"GAE",a:-312700},{l:"Tax",a:-1000000}],  // W34
    [{l:"COS",a:-3696646},{l:"GAE",a:-1650000},{l:"Other",a:-855586}],  // W35
    [{l:"COS",a:-6678694},{l:"GAE",a:-340000},{l:"Loan",a:-52620}],  // W36
    [{l:"GAE",a:-900000},{l:"Tax",a:-800000}],  // W37
    [{l:"GAE",a:-2062700},{l:"Tax",a:-1000000}],  // W38
    [{l:"GAE",a:-0},{l:"Other",a:-855586}],  // W39
    [{l:"GAE",a:-1990000}],  // W40
    [{l:"GAE",a:-900000},{l:"Loan",a:-52620}],  // W41
    [{l:"GAE",a:-2062700},{l:"Tax",a:-1487299}],  // W42
    [{l:"Tax",a:-800000}],  // W43
    [{l:"GAE",a:-1650000},{l:"Other",a:-855586}],  // W44
    [{l:"GAE",a:-340000},{l:"Loan",a:-52620}],  // W45
    [{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],  // W46
    [{l:"Tax",a:-1000000}],  // W47
    [{l:"GAE",a:-1650000},{l:"Other",a:-855586}],  // W48
    [{l:"GAE",a:-3840000},{l:"Loan",a:-52620}],  // W49
    [{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],  // W50
    [{l:"Tax",a:-1000000}],  // W51
    [{l:"GAE",a:-1650000},{l:"Other",a:-855586}]  // W52
  ],
  ggOut: [
    [{l:"GG Company Inc.",a:-19599}],
    [{l:"GG Company Inc.",a:-157594}],
    [{l:"GG Company Inc.",a:-19911}],
    [{l:"GG Company Inc.",a:-1850000}],
    [{l:"GG Company Inc.",a:-628479}],
    [{l:"GG Company Inc.",a:-6000}],
    [{l:"GG liquidity outflow",a:-3551022}],  // W24 actual
    [{l:"GG liquidity outflow",a:-649672}],  // W25 actual
    [{l:"GG liquidity outflow",a:-110384}],  // W26 proj
    [{l:"GG liquidity outflow",a:-200000}],  // W27
    [{l:"GG liquidity outflow",a:-342861}],  // W28
    [{l:"GG liquidity outflow",a:-200000}],  // W29
    [{l:"GG liquidity outflow",a:-210384}],  // W30
    [{l:"GG liquidity outflow",a:-400000}],  // W31
    [{l:"GG liquidity outflow",a:-400000}],  // W32
    [{l:"GG liquidity outflow",a:-223682}],  // W33
    [{l:"GG liquidity outflow",a:-200000}],  // W34
    [{l:"GG liquidity outflow",a:-210384}],  // W35
    [{l:"GG liquidity outflow",a:-200000}],  // W36
    [{l:"GG liquidity outflow",a:-423682}],  // W37
    [{l:"GG liquidity outflow",a:-200000}],  // W38
    [{l:"GG liquidity outflow",a:-210384}],  // W39
    [{l:"GG liquidity outflow",a:-200000}],  // W40
    [{l:"GG liquidity outflow",a:-342861}],  // W41
    [{l:"GG liquidity outflow",a:-100000}],  // W42
    [{l:"GG liquidity outflow",a:-100000}],  // W43
    [{l:"GG liquidity outflow",a:-310384}],  // W44
    [{l:"GG liquidity outflow",a:-300000}],  // W45
    [{l:"GG liquidity outflow",a:-123682}],  // W46
    [{l:"GG liquidity outflow",a:-100000}],  // W47
    [{l:"GG liquidity outflow",a:-110384}],  // W48
    [{l:"GG liquidity outflow",a:-100000}],  // W49
    [{l:"GG liquidity outflow",a:-323682}],  // W50
    null,                                    // W51 — 0
    [{l:"GG liquidity outflow",a:-142861}]   // W52
  ],
};

// ── AR DATA ───────────────────────────────────────────────────────────────────
var AR_OPEN = [
  {account:"Land Registration Systems",project:"LARES Video Production DP",amount:239518,status:"Collected",pic:"Shanna",target:"03.19",aging:"6 days",week:12,priority:"low",year:2026},
  {account:"Land Registration Systems",project:"LARES Video Production FP",amount:93318.75,status:"For Invoicing",pic:"Shanna",target:"03.17",aging:"1 month early",week:12,priority:"low",year:2026},
  {account:"SM Prime Holdings",project:"SMDC Heroes Clash Mania 3 [Sun Mall]",amount:197000,status:"For Payment Follow-Up",pic:"CC",target:"05.15",aging:"5m 4d",week:20,priority:"medium",year:2025},
  {account:"SM Prime Holdings",project:"SMDC Heroes Clash Mania 3 [Light Mall]",amount:197000,status:"For Payment Follow-Up",pic:"CC",target:"05.15",aging:"5m 4d",week:20,priority:"medium",year:2025},
  {account:"SM Prime Holdings",project:"SMDC Heroes Clash Mania 3 [MPlace]",amount:196000,status:"For Payment Follow-Up",pic:"CC",target:"05.15",aging:"5m 4d",week:20,priority:"medium",year:2025},
  {account:"SM Prime Holdings",project:"SMDC Heroes Clash Mania 3 Addendum",amount:20547.30,status:"For Payment Follow-Up",pic:"CC",target:"06.05",aging:"on time",week:23,priority:"medium",year:2025},
  {account:"GAMEMASTER (GTCC)",project:"GTCC September Arena",amount:8734964.30,status:"For Invoicing",pic:"Iggy",target:"03.30",aging:"4m 27d",week:14,priority:"high",year:2025},
  {account:"MOONTON",project:"MPL S17 DP",amount:19260517.86,status:"Collected",pic:"Marcus",target:"04.10",aging:"Collected W16",week:15,priority:"high",year:2026},
  {account:"TENCENT",project:"KIC Profit Sharing",amount:2136930,status:"For Invoicing",pic:"Carla",target:"04.13",aging:"13 days",week:16,priority:"high",year:2025},
  {account:"TENCENT",project:"KIS4 IT",amount:1232352,status:"For Invoicing",pic:"Carla",target:"04.13",aging:"1m 16d",week:16,priority:"medium",year:2025},
  {account:"TENCENT",project:"PUBGM 8th Anniv. Offline Event DP",amount:2212000,status:"For Invoicing",pic:"Shanna",target:"04.17",aging:"on time",week:16,priority:"medium",year:2026},
  {account:"DIGITAL TRIGGER",project:"BuzzOne PH (C-vitt Activation) — partial",amount:597827.43,status:"Collected",pic:"Shanna",target:"04.22",aging:"7m 2d",week:17,priority:"high",year:2025},
  {account:"DIGITAL TRIGGER",project:"BuzzOne PH (C-vitt Activation) — balance",amount:597827.42,status:"For Payment Follow-Up",pic:"Shanna",target:"04.22",aging:"7m 2d",week:17,priority:"high",year:2025},
  {account:"TENCENT",project:"PKL Spring Season 2026 FP",amount:3819000,status:"For Invoicing",pic:"Carla",target:"04.30",aging:"on time",week:18,priority:"medium",year:2026},
  {account:"TENCENT",project:"PKL Fall Season Addendum",amount:1291105,status:"For Invoicing",pic:"Iggy",target:"04.30",aging:"6m 15d",week:18,priority:"high",year:2025},
  {account:"Minotaur Advertising",project:"Minotaur Jollibee DP Remaining",amount:2200831.16,status:"For Payment Follow-Up",pic:"Vince",target:"04.30",aging:"10m 25d",week:18,priority:"high",year:2025},
  {account:"GLOBE",project:"Globe x GG Truck KOW DP",amount:783936.24,status:"For Payment Follow-Up",pic:"Shanna",target:"05.25",aging:"6m 11d",week:22,priority:"high",year:2025},
  {account:"GLOBE",project:"Globe x GG Truck KOW FP",amount:335972.67,status:"For Invoicing",pic:"Shanna",target:"05.25",aging:"5m 13d",week:22,priority:"medium",year:2025},
  {account:"TENCENT",project:"PUBGM 8th Anniv. Offline Event FP",amount:948000,status:"For Invoicing",pic:"Shanna",target:"06.26",aging:"on time",week:26,priority:"low",year:2026},
  {account:"MOONTON",project:"MPL S17 FP",amount:8254507.65,status:"For Invoicing",pic:"Marcus",target:"07.01",aging:"on time",week:27,priority:"medium",year:2026},
  {account:"TENCENT",project:"PKL Spring Season Addendum",amount:0,status:"For Invoicing",pic:"Iggy",target:"06.30",aging:"on time",week:27,priority:"low",year:2025},
  {account:"MOONTON",project:"MPL S18",amount:24598214.29,status:"For Invoicing",pic:"Marcus",target:"12.07",aging:"on time",week:50,priority:"low",year:2026},
  {account:"Alika Company",project:"Jaseem - Ragnarok Phase 8",amount:133249,status:"For Payment Follow-Up",pic:"Shanna",target:"06.19",aging:"10m 14d",week:25,priority:"high",year:2025},
  {account:"Alika Company",project:"Jaseem - Ragnarok V Phase 2",amount:30284,status:"For Payment Follow-Up",pic:"Shanna",target:"06.19",aging:"10m 14d",week:25,priority:"high",year:2025},
  {account:"Alika Company",project:"Jaseem - Ragnarok Phase 9",amount:98600,status:"For Payment Follow-Up",pic:"Shanna",target:"05.04",aging:"9m 27d",week:19,priority:"high",year:2025},
  {account:"INFINITECH DIGITAL GAMING CORP",project:"Sportsplus MPBL DP",amount:1801348.50,status:"For Invoicing",pic:"Iggy",target:"04.08",aging:"on time",week:15,priority:"medium",year:2026},
  {account:"INFINITECH DIGITAL GAMING CORP",project:"Sportsplus MPBL FP",amount:772006.50,status:"For Invoicing",pic:"Iggy",target:"07.07",aging:"on time",week:28,priority:"low",year:2026},
  {account:"MOONTON",project:"MPL PH S17 Work Order Addendum (Genset Diesel)",amount:580160,status:"For Invoicing",pic:"Marcus",target:"04.10",aging:"on time",week:15,priority:"medium",year:2026},
  {account:"Minotaur Advertising",project:"Minotaur x Cobra Core Event",amount:570976,status:"For Invoicing",pic:"Vince",target:"04.30",aging:"on time",week:18,priority:"medium",year:2026},
  {account:"TENCENT",project:"PKL Spring S2 Addendum - Talent Meals",amount:56840,status:"For Invoicing",pic:"Carla",target:"04.30",aging:"on time",week:18,priority:"low",year:2026},
  {account:"TENCENT",project:"PKL Spring S2 Addendum - Playoffs",amount:587328,status:"For Invoicing",pic:"Carla",target:"04.30",aging:"on time",week:18,priority:"medium",year:2026},
  {account:"SM Prime Holdings",project:"SM Cyberzone TCG Addendum",amount:2959127,status:"For Payment Follow-Up",pic:"CC",target:"06.05",aging:"on time",week:23,priority:"medium",year:2026},
  {account:"BPI",project:"BPI PeraWise Caravan",amount:3125000,status:"For Invoicing",pic:"CC",target:"04.30",aging:"on time",week:18,priority:"medium",year:2026},
];

var COLLECTED = [
  {account:"TENCENT",project:"GG Billing 2025 (KIC) FP",amount:15811747.37},
  {account:"TENCENT",project:"KIS4 Rebroadcast",amount:3169684},
  {account:"TENCENT",project:"PKL Spring Season 2026 DP",amount:4275000},
  {account:"Federal Land",project:"Met Park: Rainy Day Tails Pet Party",amount:344364.62},
  {account:"TENCENT",project:"Crossfire Mobile Launch Addendum",amount:291238.86},
  {account:"Jobstreet",project:"Jobstreet LevelUp Tournament",amount:455956.64},
  {account:"TENCENT",project:"Crossfire Mobile Launch DP",amount:1026000},
  {account:"CCAP",project:"MLBB Tournament",amount:521042.50},
  {account:"JOYMAKER GAMES",project:"Ragnarok Online 3 CBT",amount:149570.98},
  {account:"BPI",project:"BPI Legendary Bankers Cup 2",amount:88386.63},
  {account:"TENCENT",project:"GG Billing 2025 (KIC) DP",amount:10000000},
  {account:"BingoPlus",project:"ISP x BingoPlus Caravan 2025 Addendum",amount:385155.89},
  {account:"TENCENT",project:"PKL Fall Season",amount:20831832.25},
  {account:"GAMEMASTER",project:"GTCC Summer Showdown (Feb)",amount:4850000},
  {account:"CIGNAL TV",project:"UAAP ESports S87 Peripherals Addendum",amount:2271838.22},
  {account:"Federal Land",project:"Met Park Community Run",amount:300321},
  {account:"MOONTON",project:"MLBB Project NEXT - KOL",amount:491226.75},
  {account:"TENCENT",project:"Crossfire Mobile Launch FP",amount:2394001.27},
  {account:"Land Registration Systems",project:"LARES Video Production DP",amount:243873},
  {account:"DIGITAL TRIGGER",project:"BuzzOne PH (C-vitt Activation) partial",amount:597827.43},
];

// Derived AR totals (auto-computed from arrays above)
var totalOpen      = AR_OPEN.reduce(function(s,r){return s+(r.amount||0);},0);
var totalCollected = COLLECTED.reduce(function(s,r){return s+r.amount;},0);
var highPriority   = AR_OPEN.filter(function(r){return r.priority==="high";});
var totalHigh      = highPriority.reduce(function(s,r){return s+r.amount;},0);
var thisWeekAR     = AR_OPEN.filter(function(r){return r.week<=20;});
var thisWeekTotal  = thisWeekAR.reduce(function(s,r){return s+r.amount;},0);

// ── FULL YEAR PROJECTION DATA ─────────────────────────────────────────────────
// Arrays marked _INIT are mutable inside FullYear (cloned via .slice() each render).
// Non-suffixed arrays are read-only and used directly as globals.
// Source: CF for Mancom (Jan–Jun actuals) + AP sheet (Jul–Dec projections)

// Jan–Dec opening balance and closing net (months 6–11 overwritten by chain IIFE)
var FY_BEG_INIT = [12652564,4697131,3367012,3925661,2108492,599016,-3607826,-8610434,-13374606,-20419578,-15816036,-26926978];
var FY_NET_INIT = [4697131,3367012,3925661,2108492,599016,670877,-8610434,-13374606,-20419578,-15816036,-26926978,-36365967];

// Inflow: Jan–Jun from CF rows 53/54; Jul–Dec from AM BD Universe Collections CSV
var FY_PDEI_IN_INIT = [16323424,9067184,13219958,29063859,13433202,6766445,13772169,131000,250800,0,0,2601597];
var FY_GG_IN_INIT   = [20799694,3302846,23568842,2001826,1950465,4162966,0,3549000,0,0,0,0];

// Inflow breakdowns for projection months (Jul–Dec) — from AM BD Universe CSV
var FY_PDEI_IN_BD_INIT = [
  null,null,null,null,null,null,
  [{l:"Moonton – MPL PH S17 FP",a:9704956},{l:"Infinitech – SportsPlus MPBL DP (70%)",a:885033},{l:"Globe Telecom – KOW FP",a:783936},{l:"Minotaur – Cobra Core Event FP",a:489969},{l:"Infinitech – SportsPlus MPBL FP (30%)",a:379300},{l:"Moonton – MPL S17 Addendum (Genset)",a:324890},{l:"Jobstreet – LevelUp Tournament S2",a:303971},{l:"Minotaur – Cobra Core Event DP",a:209987},{l:"Mineski ID – Crossfire Caster Sourcing",a:128781},{l:"PESO – NGP Caloocan FP",a:103459},{l:"PESO – NGP Caloocan DP",a:103459},{l:"Jobstreet – LevelUp Tournament Add.",a:103040},{l:"Minotaur – Cobra Core Addendum",a:87181},{l:"Mineski TH – MCGG Rising Stars S4",a:75837},{l:"Jobstreet – Umbrella Production",a:57664},{l:"Jobstreet – Add. (Parking/Boosting)",a:30706}],
  [{l:"Mineski ID – Crossfire Caster FP",a:131000}],
  [{l:"Alika – The Ragnarok Phase 8",a:125400},{l:"Alika – The Ragnarok Phase 9",a:96900},{l:"Alika – Ragnarok V Phase 2",a:28500}],
  null,
  null,
  [{l:"Minotaur – Minotaur x Jollibee GameJoy",a:2145599},{l:"GOSH Live – FIFA World Cup Streamers",a:455998}],
];
var FY_GG_IN_BD_INIT = [
  null,null,null,null,null,null,
  null,
  [{l:"Level Infinite – PUBGM 8th Anniv. Event FP",a:3160000},{l:"Level Infinite – PUBGM 8th Anniv. Add-Ons",a:389000}],
  null,null,null,null,
];

// Outflow: Jan–Jun from CF rows 57–62; Jul–Dec base (overwritten by AP injection)
var FY_PAY24_INIT  = [0,0,0,0,0,0,0,0,0,0,0,-9374560];
var FY_PAY25_INIT  = [-7099389,0,0,-3662227,0,0,0,0,0,0,0,0];
var FY_COS_CF      = [702891,1667769,6495491,6928066,7391448,2593300,0,0,0,0,0,0];
var FY_AP_TOT_INIT = [0,0,0,0,0,0,6827406,0,0,0,0,0];

// Non-mutated outflow arrays (used directly as globals inside FullYear)
var FY_GAE    = [6381246,5101931,4530559,7365918,5298788,3087841,5094437,4952700,3302700,4952700,6602700,8452700];
var FY_TAX    = [1333356,147567,107781,1683897,652788,430449,2287299,1800000,1800000,2287299,1800000,1800000];
var FY_CAPEX  = [0,154206,38400,0,0,31050,0,0,0,0,0,0];
var FY_LOAN   = [10000000,0,0,9270000,0,0,7980240,52620,52620,52620,52620,52620];
var FY_OTHER  = [10694928,905934,1853711,2992785,1675135,18600,915586,855586,855586,0,1711172,855586];
var FY_STP    = [-4393741,3017213,0,0,0,0,0,0,0,0,0,0];
var FY_FOREX  = [-432368,-1019,16827,-7812,-8776,489615,0,0,0,0,0,0];
var FY_GG_OUT = [16398498,5723761,23187381,4650000,1883759,4206694,1353245,1034066,1034066,742861,944450,566544];

// ── FORECAST PROJECTS ─────────────────────────────────────────────────────────
// Add upcoming signed deals here; they auto-inject into Full Year inflow + COS.
var FORECAST_PROJECTS = []; // populated from Supabase at runtime

// ── AP COS VENDORS (Arrears Tab) ──────────────────────────────────────────────
var AP_COS_VENDORS = [
  {n:"APEX Franchise Ventures OPC",     a:8085146, note:"W12 overdue + W30 scheduled"},
  {n:"Procurement Budget",              a:3785237, note:"W24–W27 scheduled"},
  {n:"STAGE ONE Event Services Corp.",  a:344732,  note:"W27 scheduled"},
  {n:"Innove Communications Inc.",      a:210568,  note:"W24 current"},
  {n:"Ziegfred Perez Domingo",          a:21600,   note:"W12 overdue"},
  {n:"Sharon Robins",                   a:4195,    note:"W24 current"},
];

// ── AP PAYABLES ───────────────────────────────────────────────────────────────
// dueMonth = 0–11 (Jan–Dec 2026 expected payment month). null = TBD.
// Only months 6–11 (Jul–Dec) are injected into Full Year projections.
// Months 0–5 are already captured in CF for Mancom actuals.
var AP_PAYABLES = [
  // ── PDEI 2024 ── (due dates are 2026; all Sep–Dec = future as of Jun 15, 2026)
  {entity:"PDEI",year:2024,project:"MPL S13 Playoffs",                       vendor:"Stage Riggers, Inc.",            amount:557760,  terms:"One-Time (100%)",      originalDue:"Oct 25, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"Converge ICT Solutions, Inc.",   amount:156800,  terms:"One-Time (100%)",      originalDue:"Oct 25, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"Inex Stagesystems Corp.",        amount:400000,  terms:"Final Term (9%)",      originalDue:"Oct 25, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:200000,  terms:"Second Term (8%)",     originalDue:"Sep 20, 2026", dueMonth:8,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Third Term (8%)",      originalDue:"Sep 27, 2026", dueMonth:8,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Fourth Term (8%)",     originalDue:"Oct 4, 2026",  dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Fifth Term (8%)",      originalDue:"Oct 11, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Sixth Term (8%)",      originalDue:"Oct 18, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Seventh Term (8%)",    originalDue:"Oct 25, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Eighth Term (8%)",     originalDue:"Oct 31, 2026", dueMonth:9,  classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"Ninth Term (8%)",      originalDue:"Nov 8, 2026",  dueMonth:10, classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"10th Term (8%)",       originalDue:"Nov 15, 2026", dueMonth:10, classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:700000,  terms:"11th Term (8%)",       originalDue:"Nov 22, 2026", dueMonth:10, classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14",                             vendor:"XSTATIC Event System Inc.",      amount:800000,  terms:"Final Term (9%)",      originalDue:"Dec 6, 2026",  dueMonth:11, classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"MPL PH S14 Addendum",                    vendor:"XSTATIC Event System Inc.",      amount:330000,  terms:"One-Time (100%)",      originalDue:"Nov 8, 2026",  dueMonth:10, classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"NBA2K APAC Invitational",                vendor:"Maxi One Production Inc.",       amount:50000,   terms:"Final Term (50%)",     originalDue:"Dec 20, 2026", dueMonth:11, classification:"Cost of Sales"},
  {entity:"PDEI",year:2024,project:"CFS 2024: PH Masters & Regional Finals", vendor:"Maxi One Production Inc.",       amount:45000,   terms:"Final Term (50%)",     originalDue:"Oct 18, 2026", dueMonth:9,  classification:"Cost of Sales"},
  // ── PDEI 2025 ──
  {entity:"PDEI",year:2025,project:"1xbet CE 2025",                          vendor:"APEX Franchise Ventures OPC",              amount:82867,    terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"Adtechinno QRoad MMOARPG PR Campaign",   vendor:"UnGeek Media, Inc.",                       amount:92400,    terms:"Final Term · On-Hold",  dueMonth:null, classification:"GAE"},
  {entity:"PDEI",year:2025,project:"Adtechinno QRoad MMOARPG PR Campaign",   vendor:"Yugen Media Incorporated",                 amount:56000,    terms:"Final Term · On-Hold",  dueMonth:null, classification:"GAE"},
  {entity:"PDEI",year:2025,project:"GTCC 2025: September Arena",             vendor:"STAGE ONE Event Services Corp.",           amount:640000,   terms:"Final Term (40%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC 2025: September Arena",             vendor:"Ryan Matias",                              amount:197680,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC 2025: September Arena",             vendor:"Serial Kitten Event Management",           amount:134736,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC CE Summer Showdown",                vendor:"APEX Franchise Ventures OPC",              amount:1227260,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC September",                         vendor:"APEX Franchise Ventures OPC",              amount:637128,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC September Tech",                    vendor:"APEX Franchise Ventures OPC",              amount:1500000,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC Summer Showdown",                   vendor:"STAGE ONE Event Services Corp.",           amount:665000,   terms:"Final + One-Time",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"GTCC Summer Showdown CE Greensun",       vendor:"APEX Franchise Ventures OPC",              amount:1456000,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"HOK Invitational S3",                    vendor:"STAGE ONE Event Services Corp.",           amount:1120000,  terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"HOK Invitational S3",                    vendor:"PALARUAN Corp.",                           amount:78400,    terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"HOK Invitational S3",                    vendor:"GAJA Kitchen Stories Inc.",                amount:14585,    terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"Jobstreet Umbrella Production",          vendor:"APEX Franchise Ventures OPC",              amount:52421,    terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MDL PH S5 Playoffs",                     vendor:"STAGE ONE Event Services Corp.",           amount:806000,   terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"Mineski Socials Night",                  vendor:"APEX Franchise Ventures OPC",              amount:864725,   terms:"3 payments",            dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"Minotaur x Jollibee GameJoy",           vendor:"XSTATIC Event System Inc.",                amount:25909,    terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL Media CE 2025",                      vendor:"APEX Franchise Ventures OPC",              amount:119080,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S15",                             vendor:"Inex Stagesystems Corp.",                  amount:601520,   terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S15",                             vendor:"XSTATIC Event System Inc.",                amount:3360000,  terms:"Final Term (30%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Playoffs",                    vendor:"JEROME T. Capoquian",                      amount:230000,   terms:"One-Time + Final",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Playoffs",                    vendor:"STAGE ONE Event Services Corp.",           amount:351000,   terms:"Final Term (30%)",      dueMonth:6,    classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Regular Season",              vendor:"APEX Franchise Ventures OPC",              amount:10286195, terms:"3 BRFs",                dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Regular Season",              vendor:"JEROME T. Capoquian",                      amount:46000,    terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Addendum",                    vendor:"Power Plant Generator Rentals",            amount:185440,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL S15 Xstatic Cover",                  vendor:"APEX Franchise Ventures OPC",              amount:4389000,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL S16",                                vendor:"APEX Franchise Ventures OPC",              amount:4194600,  terms:"One-Time",              dueMonth:6,    classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL S16 Playoffs",                       vendor:"APEX Franchise Ventures OPC",              amount:1426668,  terms:"One-Time",              dueMonth:6,    classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"RMC CE 2025",                            vendor:"APEX Franchise Ventures OPC",              amount:127680,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"WCG 2025 Creator Rumble",                vendor:"Federal Land, Inc.",                       amount:35900,    terms:"One-Time",              dueMonth:null, classification:"GAE"},
  // ── GG 2025 ──
  {entity:"GG",  year:2025,project:"KIC 2025 Group Stage & Knockouts",       vendor:"STAGE ONE Event Services Corp.",           amount:916496,   terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"KIC 2025 Media Day",                     vendor:"DCAM Film Gear Rental",                    amount:775399,   terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"KIC 2025 Playoffs",                      vendor:"Ryan Matias",                              amount:281720,   terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"KIC 2025 Playoffs",                      vendor:"STAGE ONE Event Services Corp.",           amount:975000,   terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"HOK PH Kings League – Fall Season",      vendor:"Bescost Digital Marketing Services",       amount:41926,    terms:"One-Time",              originalDue:"Feb 20, 2026", dueMonth:11,   classification:"GAE"},
  {entity:"GG",  year:2025,project:"KIC Addendum",                           vendor:"SPE Events Management",                    amount:128250,   terms:"One-Time",              originalDue:"Mar 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"KIC 2025 Group Stage & Knockouts",       vendor:"APEX Franchise Ventures OPC",              amount:4060752,  terms:"One-Time",              originalDue:"Mar 20, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"KIC 2025 Playoffs",                      vendor:"Bescost Digital Marketing Services",       amount:29939,    terms:"One-Time",              originalDue:"Feb 27, 2026", dueMonth:11,   classification:"GAE"},
  {entity:"GG",  year:2025,project:"KIC 2025 Playoffs",                      vendor:"APEX Franchise Ventures OPC",              amount:3197016,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"GG",  year:2025,project:"HOK PH Kings League – Fall Season",      vendor:"APEX Franchise Ventures OPC",              amount:1602689,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  // ── PDEI 2026 ── (May dates passed as of Jun 15; Jun 5 & Jun 12 also passed → Dec)
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"STAGE ONE Event Services Corp.",           amount:280000,   terms:"Final Term (10%)",      originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"Red Apple Entertainment Production",       amount:2581600,  terms:"2nd + Final Term",      originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"Escapeboss Marketing Campaign Services",   amount:40000,    terms:"Fifth Term (50%)",      originalDue:"May 22, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"Confetti Effects, Inc.",                   amount:19470,    terms:"Final Term (50%)",      originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"APEX Franchise Ventures OPC",              amount:593600,   terms:"One-Time",              originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"Converge ICT Solutions, Inc.",             amount:302400,   terms:"One-Time",              originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17",                             vendor:"Truckrentalph Transport Logistics",        amount:39740,    terms:"One-Time",              originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17 Addendum",                    vendor:"Red Apple Entertainment Production",       amount:125440,   terms:"First Term (25%)",      originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"MPL PH S17 Addendum 2",                  vendor:"Red Apple Entertainment Production",       amount:150000,   terms:"1st + Final (50%)",     originalDue:"Jun 12, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"SportsPlus MPBL Fan Zone",               vendor:"GTOG Non-Containerized Cargo",             amount:16200,    terms:"Final Term (50%)",      originalDue:"May 22, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"SM Cyberzone Game Fest 2026",            vendor:"Jeric Angelo C. Asinas",                   amount:96320,    terms:"One-Time + 1st + Final",originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"SM Cyberzone Game Fest 2026",            vendor:"Michelle Francine G. Manuntag",            amount:26312,    terms:"One-Time",              originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"CRIF VIA Vendor Fair 2026",              vendor:"APEX Franchise Ventures OPC",              amount:72000,    terms:"One-Time",              originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"BingoPlus Night Barangay Roadshow",      vendor:"GNA Foodcart",                             amount:240000,   terms:"2× Final (50%)",        originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"BingoPlus Night Barangay Roadshow",      vendor:"EFXPRO Enterprises",                       amount:75000,    terms:"Final Term (50%)",      originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"BingoPlus Night Barangay Roadshow",      vendor:"Banda Pilipinas",                          amount:162500,   terms:"Final Term (50%)",      originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"BingoPlus Night Barangay Roadshow",      vendor:"SPE Events Management",                    amount:45304,    terms:"Final Term (50%)",      originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"BingoPlus Night Barangay Roadshow",      vendor:"Michelle Francine G. Manuntag",            amount:79920,    terms:"One-Time",              originalDue:"Jun 5, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"PDEI",year:2026,project:"SportsPlus MPBL Roadtrip 2026",          vendor:"Pangilinan Fabric and Leather Supply",     amount:30000,    terms:"One-Time",              originalDue:"Jun 12, 2026", dueMonth:11,   classification:"Cost of Sales"},
  // ── GG 2026 ── (all Apr/May passed → Dec)
  {entity:"GG",  year:2026,project:"Philippine Kings League Spring 2026",     vendor:"ACE88 Event Security Management",          amount:74300,    terms:"2 payments",            originalDue:"Apr 24, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"GG",  year:2026,project:"KIC 2025 Playoffs",                      vendor:"Innove Communications, Inc.",              amount:195474,   terms:"One-Time",              originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
  {entity:"GG",  year:2026,project:"PUBG Mobile 8th Anniversary Event",      vendor:"JEROME T. Capoquian",                      amount:22000,    terms:"One-Time",              originalDue:"May 1, 2026",  dueMonth:11,   classification:"Cost of Sales"},
  {entity:"GG",  year:2026,project:"PUBG Mobile 8th Anniversary Event",      vendor:"Ayala Land, Inc.",                         amount:361452,   terms:"One-Time",              originalDue:"May 29, 2026", dueMonth:11,   classification:"Cost of Sales"},
];

// ── AP INJECTION PRE-COMPUTATION ─────────────────────────────────────────────
// Runs once at page load (global scope) — results are cloned into FullYear each render.
var _AP_PAY24 = [0,0,0,0,0,0,0,0,0,0,0,0];
var _AP_PAY25 = [0,0,0,0,0,0,0,0,0,0,0,0];
var _AP_TOT   = [0,0,0,0,0,0,0,0,0,0,0,0];
var _AP_BD    = [null,null,null,null,null,null,null,null,null,null,null,null];
var _AP_BD24  = [null,null,null,null,null,null,null,null,null,null,null,null];
var _AP_BD25  = [null,null,null,null,null,null,null,null,null,null,null,null];
(function(){
  AP_PAYABLES.forEach(function(r){
    var m = r.dueMonth;
    if(m===null||m===undefined||m<6) return;
    var cls = r.classification==="Cost of Sales"?"COS":r.classification;
    if(r.year===2024){
      _AP_PAY24[m] += r.amount;
      if(!_AP_BD24[m]) _AP_BD24[m]=[];
      _AP_BD24[m].push({l:r.vendor+" – "+r.project,a:r.amount,c:cls,yr:2024});
    }
    if(r.year===2025){
      _AP_PAY25[m] += r.amount;
      if(!_AP_BD25[m]) _AP_BD25[m]=[];
      _AP_BD25[m].push({l:r.vendor+" – "+r.project,a:r.amount,c:cls,yr:2025});
    }
    if(r.year===2026&&r.classification==="Cost of Sales"){
      _AP_TOT[m] += r.amount;
      if(!_AP_BD[m]) _AP_BD[m]=[];
      _AP_BD[m].push({l:r.vendor+" – "+r.project,a:r.amount,c:"COS",yr:r.year});
    }
  });
  for(var i=6;i<12;i++){
    _AP_PAY24[i] = _AP_PAY24[i]>0 ? -_AP_PAY24[i] : 0;
    _AP_PAY25[i] = _AP_PAY25[i]>0 ? -_AP_PAY25[i] : 0;
  }
})();
