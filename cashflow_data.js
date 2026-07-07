// ── MINESKI CASHFLOW DATA ─────────────────────────────────────────────────────
// Update this file each week. The HTML (Mineski_Cashflow_V2.html) contains
// only rendering logic and never needs editing for routine data updates.
// ─────────────────────────────────────────────────────────────────────────────

// ── WEEK / DATE ───────────────────────────────────────────────────────────────
var WEEK = "Week 28";
var DATE = "July 8, 2026";

// ── WEEKLY CASH FLOW TABLE ────────────────────────────────────────────────────
// Source: PH_Cash_Flow_Monitoring · CF for Mancom tab
// Update actBeg/pdeiIn/ggIn/totIn/pdeiOut/ggOut/totOut/forex/net each week.
// Add new projection columns to proj/projBeg/projIn/projOut/projNet arrays.
var CF = {
  weeks: ["W1-W5 (Jan)","W6-W9 (Feb)","W10-W13 (Mar)","W14-W18 (Apr)","W19-W22 (May)","W23 - W27 (Jun 5)"],
  proj:  ["W28 (Jul 10)","W29 (Jul 17)","W30 (Jul 24)","W31 (Jul 31)","W32 (Aug 7)","W33 (Aug 14)","W34 (Aug 21)","W35 (Aug 28)","W36 (Sep 4)","W37 (Sep 11)","W38 (Sep 18)","W39 (Sep 25)","W40 (Oct 2)","W41 (Oct 9)","W42 (Oct 16)","W43 (Oct 23)","W44 (Oct 30)","W45 (Nov 6)","W46 (Nov 13)","W47 (Nov 20)","W48 (Nov 27)","W49 (Dec 4)","W50 (Dec 11)","W51 (Dec 18)","W52 (Dec 25)"],
  actBeg:  [12652564,4697131,3367012,3925661,2108492,599016],
  pdeiIn:  [16323424,9067184,13219958,29063859,13433202,11501348],
  ggIn:    [20799694,3302846,23568842,2001826,1950465,7942860],
  totIn:   [37123118,12370030,36788799,31065685,15383666,19444208],
  pdeiOut: [29112421,7977406,13025942,28240666,15018159,10589209],
  ggOut:   [16398498,5723761,23187381,4650000,1883759,8019694],
  totOut:  [45510920,13701167,36213323,32890666,16901918,18608904],
  forex:   [-432368,-1019,16827,-7812,-8776,498416],
  net:     [4697131,3367012,3925661,2108492,599016,935905],
  projBeg: [935905,5378182,3609000,952080,-417656,-7181655,4820713,-3304604,-7300135,-6640425,-14576454,-17839154,-18819794,-21009794,-22305275,-26284946,-27184946,-30770916,-31463536,-35349918,-36449918,-39835888,-43828508,-47914891,-49684891],
  projIn:  [19753732,2225816,81464,2947588,0,19421093,494143,3194344,7931025,0,0,855330,0,0,0,0,0,0,0,0,0,0,0,0,3340154],
  projOut: [15311455,3994999,2738384,4317324,6763999,7418724,8619460,7189876,7271315,7936029,3262700,1835970,2190000,1295481,3979671,900000,3585970,692620,3886382,1100000,3385970,3992620,4086382,1770000,2648448],
  projNet: [5378182,3609000,952080,-417656,-7181655,4820713,-3304604,-7300135,-6640425,-14576454,-17839154,-18819794,-21009794,-22305275,-26284946,-27184946,-30770916,-31463536,-35349918,-36449918,-39835888,-43828508,-47914891,-49684891,-48993184],
};

// Actuals for weekly table (PDEI+GG split)
var WT_PDEI_IN  = [16323424,9067184,13219958,29063859,13433202,11501348];
var WT_GG_IN    = [20799694,3302846,23568842,2001826,1950465,7942860];
var WT_PDEI_OUT = [29112421,7977406,13025942,28240666,15018159,10589209];
var WT_GG_OUT   = [16398498,5723761,23187381,4650000,1883759,8019694];
var WT_TOT_IN   = [37123118,12370030,36788799,31065685,15383666,19444208];
var WT_TOT_OUT  = [45510920,13701167,36213323,32890666,16901918,18608904];

// GL breakdown data per period & category (for click-to-expand)
var GL_BREAKDOWN = {
  pdeiIn: [
    [{l:"Payment: Gamemaster Integrated Inc.",a:3409542},{l:"Payment: Cignal TV, Inc.",a:2231270},{l:"Payment: AB Leisure Exponent, Inc",a:385156},{l:"Payment: TEG HOLDING PTE. Ltd.",a:146595},{l:"Various buyers",a:115000}],
    [{l:"Dar Andrew Cayabyab",a:2000000},{l:"Dar Andrew Cayabyab",a:618821},{l:"Payment: CONTACT CENTERS ASSOCIATION OF ",a:511738},{l:"Bank Transfer from Security Bank_DTC_856",a:500000},{l:"Payment: JOBSTREET.COM PHILIPPINES INC",a:447815}],
    [{l:"Dar Andrew Cayabyab",a:3000000},{l:"Payment: DIGITAL TRIGGER DIGITAL MEDIA I",a:509006},{l:"Bank Transfer from Security Bank  (PHP) ",a:500000},{l:"Payment: FEDERAL LAND, INC.",a:338215},{l:"Payment: LAND REGISTRATION SYSTEM INC",a:239518}],
    [{l:"Payment: Moonton Philippines Technology ",a:22240523},{l:"Infinitech Digital Gaming Corporation",a:1801348},{l:"Payment: Alianza Grande Technologia Inc.",a:1486607},{l:"Dar Andrew Cayabyab",a:1200000},{l:"Payment: Infinitech Digital Gaming Corpo",a:885033}],
    [{l:"Dar Andrew Cayabyab",a:3500000},{l:"Payment: SM Prime Holdings Inc.",a:2906285},{l:"Slash Money in SBC 6765",a:1600999},{l:"Dar Andrew Cayabyab",a:1500000},{l:"Dar Andrew Cayabyab",a:1000000}],
    [{l:"Dar Andrew Cayabyab",a:2500000},{l:"Dar Andrew Cayabyab",a:500000},{l:"Payment: Moonton Philippines Technology ",a:319088},{l:"Payment: JOBSTREET.COM PHILIPPINES INC",a:298543},{l:"Payment: PILIPINAS E-SPORTS ORGANIZATION",a:101612}],
    [{l:"Moonton Philippines Technology Inc.",a:9531653},{l:"TOTAL GAMEZONE XTREME INCORPORATED",a:9222080}],
    [{l:"Moonton Philippines Technology Inc.",a:2225816}],
    [{l:"TEG HOLDING PTE. Ltd.",a:81464}],
    [{l:"New Marketing",a:1050000},{l:"SIGMA VENTURES HOLDINGS CORPORATION",a:1017681},{l:"New Marketing",a:300000},{l:"Mineski Global (Malaysia) SDN. BHD",a:138336},{l:"TEG HOLDING PTE. Ltd.",a:122458}],
    null,
    [{l:"PSI SPORTS INTERNATIONAL SDN. BHD.",a:489831}],
    null,
    null,
    [{l:"PILIPINAS E-SPORTS ORGANIZATION INC.",a:303421}],
    null,
    null,
    [{l:"Infinitech Digital Gaming Corporation",a:756566},{l:"TEG HOLDING PTE. Ltd.",a:98764}],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [{l:"V5 Technologies Inc",a:1376060},{l:"Minotaur Advertising Inc",a:489969},{l:"V5 Technologies Inc",a:467491},{l:"Minotaur Advertising Inc",a:220202},{l:"Minotaur Advertising Inc",a:209987}]
  ],
  ggIn: [
    [{l:"GG Company Inc.",a:10000000},{l:"GG Company Inc.",a:10072},{l:"GG Company Inc.",a:9527}],
    [{l:"GG Company Inc.",a:3000000},{l:"GG Company Inc.",a:1000000},{l:"GG Company Inc.",a:500000},{l:"GG Company Inc.",a:137995},{l:"GG Company Inc.",a:10072}],
    [{l:"GG Company Inc.",a:3000000},{l:"GG Company Inc.",a:2400000},{l:"GG Company Inc.",a:2000000},{l:"GG Company Inc.",a:1000000},{l:"GG Company Inc.",a:600000}],
    [{l:"GG Company Inc.",a:12920},{l:"GG Company Inc.",a:12101}],
    [{l:"GG Company Inc.",a:15863},{l:"GG Company Inc.",a:12616}],
    [{l:"GG Company Inc.",a:2500000},{l:"GG Company Inc.",a:2500000},{l:"GG Company Inc.",a:1209336},{l:"GG Company Inc.",a:500000},{l:"GG Company Inc.",a:15351}],
    [{l:"GG Company Inc. (inter-company est.)",a:1000000}],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [{l:"GG Company Inc. (inter-company est.)",a:2283610}]
  ],
  pdeiOut: [
    [{l:"Payment: Lilith Network HK Limited",a:-10624928},{l:"Dar Andrew Cayabyab",a:-10000000},{l:"Payment: Payroll",a:-1388932},{l:"Payroll",a:-1255026},{l:"Bank Transfer from Pillar Digital E- Com",a:-917078}],
    [{l:"Payment: Payroll",a:-1399383},{l:"Payment: Payroll",a:-1383552},{l:"Payment: Lilith Network HK Limited",a:-841811},{l:"Bank Transfer from PDEI - PBB ( USD) to ",a:-607836},{l:"Bank Transfer from Security Bank_DTC_856",a:-500000}],
    [{l:"Payment: RED APPLE ENTERTAINMENT PRODUCT",a:-2535500},{l:"Payment: STAGE ONE EVENT SERVICES CORP.",a:-1925000},{l:"Payment: Payroll",a:-1437959},{l:"Payment: Payroll",a:-1431134},{l:"Bank Transfer from Security Bank  (PHP) ",a:-1192158}],
    [{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-22240000},{l:"Dar Andrew Cayabyab",a:-3200000},{l:"Dar Andrew Cayabyab",a:-3070000},{l:"Dar Andrew Cayabyab",a:-3000000},{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-1700000}],
    [{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-3650000},{l:"Slash Money in SBC 6765",a:-1600999},{l:"Payment: Payroll",a:-1544958},{l:"Payment: Payroll",a:-1539244},{l:"Payment: Lilith Network HK Limited",a:-895135}],
    [{l:"Payment: Payroll",a:-1529536},{l:"Payment: Payroll",a:-1513315},{l:"Payment: Lilith Network HK Limited",a:-884430},{l:"Bank Transfer from Security Bank  (PHP) ",a:-593000},{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-450000}],
    [{l:"Loan",a:-10748490},{l:"COS",a:-1100927},{l:"GAE",a:-1352489},{l:"CAPEX",a:-53349},{l:"Other",a:-1666200}],
    [{l:"COS",a:-535000},{l:"GAE",a:-1712700},{l:"Tax",a:-1487299},{l:"Other",a:-60000}],
    [{l:"COS",a:-1000000},{l:"GAE",a:-728000},{l:"Tax",a:-800000}],
    [{l:"COS",a:-500000},{l:"GAE",a:-2561737},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"COS",a:-4391428},{l:"GAE",a:-1919951}],
    [{l:"COS",a:-3745042},{l:"GAE",a:-2650000},{l:"Tax",a:-800000}],
    [{l:"COS",a:-7106760},{l:"GAE",a:-312700},{l:"Tax",a:-1000000}],
    [{l:"COS",a:-3696646},{l:"GAE",a:-2427260},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"COS",a:-6678694},{l:"GAE",a:-340000}],
    [{l:"COS",a:-5482674},{l:"GAE",a:-1229673},{l:"Tax",a:-800000}],
    [{l:"GAE",a:-2062700},{l:"Tax",a:-1000000}],
    [{l:"GAE",a:-770000},{l:"Other",a:-855586}],
    [{l:"GAE",a:-1990000}],
    [{l:"Loan",a:-52620},{l:"GAE",a:-900000}],
    [{l:"GAE",a:-2392373},{l:"Tax",a:-1487299}],
    [{l:"Tax",a:-800000}],
    [{l:"GAE",a:-2420000},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"GAE",a:-340000}],
    [{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],
    [{l:"Tax",a:-1000000}],
    [{l:"GAE",a:-2420000},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"GAE",a:-3840000}],
    [{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],
    [{l:"GAE",a:-770000},{l:"Tax",a:-1000000}],
    [{l:"GAE",a:-1650000},{l:"Other",a:-855586}]
  ],
  ggOut: [
    [{l:"GG Company Inc.",a:-10072},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-137995},{l:"GG Company Inc.",a:-10072},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-10384},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-1000000},{l:"GG Company Inc.",a:-500000},{l:"GG Company Inc.",a:-350000},{l:"GG Company Inc.",a:-50000},{l:"GG Company Inc.",a:-50000}],
    [{l:"GG Company Inc.",a:-600000},{l:"GG Company Inc.",a:-15863},{l:"GG Company Inc.",a:-12616}],
    [{l:"GG Company Inc.",a:-15351},{l:"GG Company Inc.",a:-12937}],
    [{l:"GG liquidity outflow",a:-390000}],
    [{l:"GG liquidity outflow",a:-200000}],
    [{l:"GG liquidity outflow",a:-210384}],
    [{l:"GG liquidity outflow",a:-400000}],
    [{l:"GG liquidity outflow",a:-400000}],
    [{l:"GG liquidity outflow",a:-223682}],
    [{l:"GG liquidity outflow",a:-200000}],
    [{l:"GG liquidity outflow",a:-210384}],
    [{l:"GG liquidity outflow",a:-200000}],
    [{l:"GG liquidity outflow",a:-423682}],
    [{l:"GG liquidity outflow",a:-200000}],
    [{l:"GG liquidity outflow",a:-210384}],
    [{l:"GG liquidity outflow",a:-200000}],
    [{l:"GG liquidity outflow",a:-342861}],
    [{l:"GG liquidity outflow",a:-100000}],
    [{l:"GG liquidity outflow",a:-100000}],
    [{l:"GG liquidity outflow",a:-310384}],
    [{l:"GG liquidity outflow",a:-300000}],
    [{l:"GG liquidity outflow",a:-123682}],
    [{l:"GG liquidity outflow",a:-100000}],
    [{l:"GG liquidity outflow",a:-110384}],
    [{l:"GG liquidity outflow",a:-100000}],
    [{l:"GG liquidity outflow",a:-323682}],
    null,
    [{l:"GG liquidity outflow",a:-142861}]
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
  {account:"MOONTON",project:"MPL S17 FP",amount:8254507.65,status:"For Invoicing",pic:"Marcus",target:"07.10",aging:"slipped from W27",week:28,priority:"high",year:2026},
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
  {account:"TOTAL GAMEZONE XTREME INCORPORATED",project:"GTCC 2025: September Arena",amount:9222080,status:"For Invoicing",pic:"Iggy",target:"07.10",aging:"slipped from W27",week:28,priority:"high",year:2025},
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
var thisWeekAR     = AR_OPEN.filter(function(r){return r.week<=28;});
var thisWeekTotal  = thisWeekAR.reduce(function(s,r){return s+r.amount;},0);

// ── FULL YEAR PROJECTION DATA ─────────────────────────────────────────────────
// Arrays marked _INIT are mutable inside FullYear (cloned via .slice() each render).
// Non-suffixed arrays are read-only and used directly as globals.
// Source: CF for Mancom (Jan–Jun actuals) + AP sheet (Jul–Dec projections)

// Jan–Dec opening balance and closing net (months 6–11 overwritten by chain IIFE)
var FY_BEG_INIT    = [12652564,4697131,3367012,3925661,2108492,599016,935905,63688281,119020742,148582995,164646440,189117874];
var FY_NET_INIT    = [4697131,3367012,3925661,2108492,599016,935905,63688281,119020742,148582995,164646440,189117874,216962383];

// Inflow: Jan–Jun from CF rows 53/54; Jul–Dec from AM BD Universe Collections CSV
var FY_PDEI_IN_INIT = [16323424,9067184,13219958,29063859,13433202,11501348,21061012,26057168,8786355,0,0,1056544];
var FY_GG_IN_INIT   = [20799694,3302846,23568842,2001826,1950465,7942860,1000000,0,0,0,0,2283610];

// Inflow breakdowns for projection months (Jul–Dec) — from AM BD Universe CSV
var FY_PDEI_IN_BD_INIT = [
  null,null,null,null,null,
  [{l:"W23 Jun 5 (Dar/TEG/misc)",a:2556563},{l:"W24 Jun 12 (GG interco/Bounce/Jobstreet)",a:2677734},{l:"W25 Jun 19 (Dar/GG/CA Liq.)",a:1532148},{l:"W26 Jun 26 (Jobstreet/Moonton/PESO/misc)",a:4682747}],  // Jun
  [{l:"Gamezone Xtreme – GTCC S9 Arena (W28)",a:9222080},{l:"Moonton Phil. – MPL S17 FP (W28)",a:9531653},{l:"Moonton Phil. – MPL S17 Add.2 (W28)",a:2225816},{l:"Moonton Phil. – TTRacing x MPL (W28)",a:206250},{l:"TEG Holdings – MCGG Rising Stars S4 (W30)",a:81446}],  // Jul
  [{l:"W31 scheduled AR collections",a:434347},{l:"PSI Sports – GOSH Live Streamers / FIFA WC (W33)",a:489723}],  // Aug
  [{l:"PESO – ENC Social Media Campaign (W36)",a:303421},{l:"Infinitech – SportsPlus MPBL Roadtrip (W39)",a:756566},{l:"TEG – MCGG S6 Crew Clash (W39)",a:98742}],  // Sep
  null,  // Oct
  null,  // Nov
  [{l:"V5 Technologies Inc.",a:1843551},{l:"Minotaur Advertising (Cobra Core)",a:920158},{l:"Alika Company (Ragnarok Phase 8)",a:134674}],  // Dec
];
var FY_GG_IN_BD_INIT = [
  null,null,null,null,null,
  [{l:"W24 Jun 12: GG Company Inc. (inter-company)",a:4162966},{l:"W26 Jun 26: GG Company Inc. (inter-company)",a:3779893}],  // Jun
  null,  // Jul
  null,  // Aug
  null,  // Sep
  null,  // Oct
  null,  // Nov
  [{l:"GG Company Inc. (inter-company est.)",a:2283610}],  // Dec
];

// Outflow: Jan–Jun from CF rows 57–62; Jul–Dec base (overwritten by AP injection)
var FY_PAY24_INIT  = [0,0,0,0,0,0,0,0,0,0,0,-9374560];
var FY_PAY25_INIT  = [-7099389,0,0,-3662227,0,0,0,0,0,0,0,0];
var FY_COS_CF      = [702891,1667769,6495491,6928066,7391448,3786585,0,0,0,0,0,0];
var FY_AP_TOT_INIT = [0,0,0,0,0,0,6827406,0,0,0,0,0];

// Non-mutated outflow arrays (used directly as globals inside FullYear)
var FY_GAE    = [6381246,5101931,4530559,7365918,5298788,5393572,3793189,9871648,4402373,5282373,8142700,9222700];
var FY_TAX    = [1333356,147567,107781,1683897,652788,430449,2287299,1800000,1800000,2287299,1800000,1800000];
var FY_CAPEX  = [0,154206,38400,0,0,31050,53349,0,0,0,0,0];
var FY_LOAN   = [10000000,0,0,9270000,0,0,10748490,52620,52620,52620,52620,52620];
var FY_OTHER  = [10694928,905934,1853711,2992785,1675135,947554,1726200,1711172,855586,0,1711172,855586];
var FY_STP    = [-4393741,3017213,0,0,0,0,0,0,0,0,0,0];
var FY_FOREX  = [-432368,-1019,16827,-7812,-8776,498416,0,0,0,0,0,0];
var FY_GG_OUT = [16398498,5723761,23187381,4650000,1883759,8019694,800384,1434066,1034066,742861,944450,566543];

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

// ── WEEKLY TABLE LIQUIDITY ────────────────────────────────────────────────────
// COS outflows per period (actuals: Andon Board filed+unfiled; projections: CF PDEI_OUT)
// Indices 0-8 = actual periods (W1-W5 through W26); 9-34 = W27-W52 projections.
var COS_LIQ = {
  totals: [29112421,7977406,13025942,28240666,15018159,10589209,14921455,3794999,2528000,3917324,6363999,7195042,8419460,6979492,7071315,7512347,3062700,1625586,1990000,952620,3879671,800000,3275586,392620,3762700,1000000,3275586,3892620,3762700,1770000,2505586],
  bd: [
    [{"l":"MPL PH S15 – Lights/Sounds Truss Rental","a":4389000,"t":"filed"},{"l":"GTCC Summer Showdown – Technical Svcs","a":1456000,"t":"filed"},{"l":"KIC Rebroadcast – Booth Rental/Fabrication","a":135520,"t":"filed"},{"l":"realme Cup – LED Rental/Logistics","a":127680,"t":"filed"}],
    [{"l":"SM Cyberzone TCG – Stage/Booth Fabrication","a":400000,"t":"filed"},{"l":"KIC 2025 GS&K – GO Wifi Business OTC","a":352240,"t":"filed"},{"l":"PKL Spring – Booth & Players Area Rental","a":220000,"t":"filed"},{"l":"SM Cyberzone TCG – Tech Svcs","a":200000,"t":"filed"}],
    [{"l":"KIC 2025 GS&K – Outsourced Tech Svcs","a":7350000,"t":"filed"},{"l":"KIC 2025 Playoffs – Asset Rental/Svcs","a":5400967,"t":"filed"},{"l":"MPL PH S17 – Outsourced Tech Svcs","a":5163200,"t":"filed"},{"l":"KIC 2025 Playoffs – Outsourced Tech Svcs","a":4900000,"t":"filed"}],
    [{"l":"PUBG Mobile 8th Anniv – Venue Rental Ayala","a":252000,"t":"filed"},{"l":"PUBG Mobile 8th Anniv – Venue Rental Veranda","a":50400,"t":"filed"},{"l":"Sportsplus MPBL – Basketball Arcade Machine","a":40000,"t":"filed"},{"l":"PKL Spring – Logistics Associates","a":17000,"t":"filed"}],
    [{"l":"Sportsplus MPBL FZ – Lights & Audio Rental","a":87500,"t":"filed"},{"l":"PKL Spring – Outsourced Manpower","a":73366,"t":"filed"},{"l":"PKL Spring – Photography & Videography","a":62000,"t":"filed"},{"l":"Sportsplus MPBL – Tote Bag Materials","a":60000,"t":"filed"}],
    // Jun (W23–W27 merged) — union of the last-filed Andon breakdown for W23/W24/W25 (no fresher Andon Board file provided this week; W26/W27 detail not available)
    [{"l":"BingoPlus Music Fest – Agency Fee","a":324613,"t":"filed"},{"l":"MPL PH S17 – Direct Internet 500Mbps","a":280000,"t":"filed"},{"l":"MPL PH S17 – Show Director","a":77800,"t":"filed"},{"l":"Sportsplus MPBL FZ – Lights & Audio","a":52500,"t":"filed"},{"l":"MPL PH S17 (unfiled balance ÷6 wks)","a":3543638,"t":"unfiled"},{"l":"PKL Spring – unfiled balance (ended W13)","a":3432208,"t":"unfiled"},{"l":"PUBG 8th Anniv – unfiled balance (ended W13)","a":1716975,"t":"unfiled"},{"l":"SM Cyberzone TCG – unfiled balance (ends W16)","a":1118126,"t":"unfiled"},{"l":"Sportsplus MPBL Fan Zone – unfiled (ended W15)","a":863892,"t":"unfiled"},{"l":"Jobstreet LU v2 – unfiled balance (ended W14)","a":557006,"t":"unfiled"},{"l":"PKL Spring – Photography & Videography","a":62000,"t":"filed"},{"l":"MPL PH S17 – API Engineer","a":33400,"t":"filed"},{"l":"PKL Spring – Outsourced Manpower","a":30350,"t":"filed"},{"l":"MPL PH S17 – Show Producer","a":30000,"t":"filed"},{"l":"Sportsplus MBPL Roadtrip – unfiled ÷5 wks","a":407598,"t":"unfiled"},{"l":"PKL Addendum – Talent/Caster","a":36533,"t":"filed"},{"l":"PKL Addendum – Talent/Caster OSX","a":29166,"t":"filed"}],
    // W28-W52 projections — no Andon Board breakdown
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
  ]
};

// Non-COS projection outflows (GAE, Tax, CAPEX, Loan, Other) — one entry per CF.proj week (W27-W52)
var NON_COS_PROJ = [
  {gae:1352489,tax:0,capex:53349,loan:10748490,other:1666200,cos:1100927},  // W28
  {gae:1712700,tax:1487299,capex:0,loan:0,other:60000,cos:535000},  // W29
  {gae:728000,tax:800000,capex:0,loan:0,other:0,cos:1000000},  // W30
  {gae:2561737,tax:0,capex:0,loan:0,other:855586,cos:500000},  // W31
  {gae:1919951,tax:0,capex:0,loan:52620,other:0,cos:4391428},  // W32
  {gae:2650000,tax:800000,capex:0,loan:0,other:0,cos:3745042},  // W33
  {gae:312700,tax:1000000,capex:0,loan:0,other:0,cos:7106760},  // W34
  {gae:2427260,tax:0,capex:0,loan:0,other:855586,cos:3696646},  // W35
  {gae:340000,tax:0,capex:0,loan:52620,other:0,cos:6678694},  // W36
  {gae:1229673,tax:800000,capex:0,loan:0,other:0,cos:5482674},  // W37
  {gae:2062700,tax:1000000,capex:0,loan:0,other:0,cos:0},  // W38
  {gae:770000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W39
  {gae:1990000,tax:0,capex:0,loan:0,other:0,cos:0},  // W40
  {gae:900000,tax:0,capex:0,loan:52620,other:0,cos:0},  // W41
  {gae:2392373,tax:1487299,capex:0,loan:0,other:0,cos:0},  // W42
  {gae:0,tax:800000,capex:0,loan:0,other:0,cos:0},  // W43
  {gae:2420000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W44
  {gae:340000,tax:0,capex:0,loan:52620,other:0,cos:0},  // W45
  {gae:2962700,tax:800000,capex:0,loan:0,other:0,cos:0},  // W46
  {gae:0,tax:1000000,capex:0,loan:0,other:0,cos:0},  // W47
  {gae:2420000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W48
  {gae:3840000,tax:0,capex:0,loan:52620,other:0,cos:0},  // W49
  {gae:2962700,tax:800000,capex:0,loan:0,other:0,cos:0},  // W50
  {gae:770000,tax:1000000,capex:0,loan:0,other:0,cos:0},  // W51
  {gae:1650000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W52
];

// ── WEEKLY TABLE COMBINED — PROJECTION ARRAYS ─────────────────────────────────
// One entry per CF.proj week (W27-W52). Rebuilt from CF for Mancom every week.
var WT_PDEI_IN_PROJ  = [18753732,2225816,81464,2947588,0,19421093,494143,3194344,7931025,0,0,855330,0,0,0,0,0,0,0,0,0,0,0,0,1056544];
var WT_GG_IN_PROJ    = [1000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2283610];
var WT_PDEI_OUT_PROJ = [14921455,3794999,2528000,3917324,6363999,7195042,8419460,6979492,7071315,7512347,3062700,1625586,1990000,952620,3879671,800000,3275586,392620,3762700,1000000,3275586,3892620,3762700,1770000,2505586];
var WT_GG_OUT_PROJ   = [390000,200000,210384,400000,400000,223682,200000,210384,200000,423682,200000,210384,200000,342861,100000,100000,310384,300000,123682,100000,110384,100000,323682,0,142861];
