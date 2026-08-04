// ── MINESKI CASHFLOW DATA ─────────────────────────────────────────────────────
// Update this file each week. The HTML (Mineski_Cashflow_V2.html) contains
// only rendering logic and never needs editing for routine data updates.
// ─────────────────────────────────────────────────────────────────────────────

// ── WEEK / DATE ───────────────────────────────────────────────────────────────
var WEEK = "Week 32";
var DATE = "August 5, 2026";

// ── WEEKLY CASH FLOW TABLE ────────────────────────────────────────────────────
// Source: PH_Cash_Flow_Monitoring · CF for Mancom tab
// Update actBeg/pdeiIn/ggIn/totIn/pdeiOut/ggOut/totOut/forex/net each week.
// Add new projection columns to proj/projBeg/projIn/projOut/projNet arrays.
var CF = {
  weeks: ["W1-W5 (Jan)","W6-W9 (Feb)","W10-W13 (Mar)","W14-W18 (Apr)","W19-W22 (May)","W23 - W27 (June)","W28-W31 (July)"],
  proj:  ["W32 (Aug 7)","W33 (Aug 14)","W34 (Aug 21)","W35 (Aug 28)","W36 (Sep 4)","W37 (Sep 11)","W38 (Sep 18)","W39 (Sep 25)","W40 (Oct 2)","W41 (Oct 9)","W42 (Oct 16)","W43 (Oct 23)","W44 (Oct 30)","W45 (Nov 6)","W46 (Nov 13)","W47 (Nov 20)","W48 (Nov 27)","W49 (Dec 4)","W50 (Dec 11)","W51 (Dec 18)","W52 (Dec 25)"],
  actBeg:  [12652564,4697131,3367012,3925661,2108492,599016,935905],
  pdeiIn:  [16323424,9067184,13219958,29063859,13433202,11501348,27041367],
  ggIn:    [20799694,3302846,23568842,2001826,1950465,7942860,1000000],
  totIn:   [37123118,12370030,36788799,31065685,15383666,19444208,28041367],
  pdeiOut: [29112421,7977406,13025942,28240666,15018159,10589209,23537741],
  ggOut:   [16398498,5723761,23187381,4650000,1883759,8019694,919003],
  totOut:  [45510920,13701167,36213323,32890666,16901918,18608904,24456744],
  forex:   [-432368,-1019,16827,-7812,-8776,498416,29014],
  net:     [4697131,3367012,3925661,2108492,599016,935905,4491514],
  projBeg: [4491514,723768,-1698616,-7216668,-13285849,-539142,-8976263,-12738963,-13919275,-16010275,-17305756,-21286519,-22186519,-25873489,-25766109,-29652492,-30752492,-34239461,-38232082,-42318464,-44288464],
  projIn:  [3500000,0,494143,3947502,29818462,0,0,855657,0,0,0,0,0,800000,0,0,0,0,0,0,3341046],
  projOut: [7267746,2422384,6012195,10016683,17071754,8437120,3762700,2035970,2091000,1295481,3980763,900000,3686970,692620,3886382,1100000,3486970,3992620,4086382,1970000,2549448],
  projNet: [723768,-1698616,-7216668,-13285849,-539142,-8976263,-12738963,-13919275,-16010275,-17305756,-21286519,-22186519,-25873489,-25766109,-29652492,-30752492,-34239461,-38232082,-42318464,-44288464,-43496865],
};

// Actuals for weekly table (PDEI+GG split)
var WT_PDEI_IN  = [16323424,9067184,13219958,29063859,13433202,11501348,27041367];
var WT_GG_IN    = [20799694,3302846,23568842,2001826,1950465,7942860,1000000];
var WT_PDEI_OUT = [29112421,7977406,13025942,28240666,15018159,10589209,23537741];
var WT_GG_OUT   = [16398498,5723761,23187381,4650000,1883759,8019694,919003];
var WT_TOT_IN   = [37123118,12370030,36788799,31065685,15383666,19444208,28041367];
var WT_TOT_OUT  = [45510920,13701167,36213323,32890666,16901918,18608904,24456744];

// GL breakdown data per period & category (for click-to-expand)
var GL_BREAKDOWN = {
  pdeiIn: [
    [{l:"Payment: Gamemaster Integrated Inc.",a:3409542},{l:"Payment: Cignal TV, Inc.",a:2231270},{l:"Payment: AB Leisure Exponent, Inc",a:385156},{l:"Payment: TEG HOLDING PTE. Ltd.",a:146595},{l:"Various buyers",a:115000}],
    [{l:"Dar Andrew Cayabyab",a:2000000},{l:"Dar Andrew Cayabyab",a:618821},{l:"Payment: CONTACT CENTERS ASSOCIATION OF ",a:511738},{l:"Bank Transfer from Security Bank_DTC_856",a:500000},{l:"Payment: JOBSTREET.COM PHILIPPINES INC",a:447815}],
    [{l:"Dar Andrew Cayabyab",a:3000000},{l:"Payment: DIGITAL TRIGGER DIGITAL MEDIA I",a:509006},{l:"Bank Transfer from Security Bank  (PHP) ",a:500000},{l:"Payment: FEDERAL LAND, INC.",a:338215},{l:"Payment: LAND REGISTRATION SYSTEM INC",a:239518}],
    [{l:"Payment: Moonton Philippines Technology ",a:22240523},{l:"Infinitech Digital Gaming Corporation",a:1801348},{l:"Payment: Alianza Grande Technologia Inc.",a:1486607},{l:"Dar Andrew Cayabyab",a:1200000},{l:"Payment: Infinitech Digital Gaming Corpo",a:885033}],
    [{l:"Dar Andrew Cayabyab",a:3500000},{l:"Payment: SM Prime Holdings Inc.",a:2906285},{l:"Slash Money in SBC 6765",a:1600999},{l:"Dar Andrew Cayabyab",a:1500000},{l:"Dar Andrew Cayabyab",a:1000000}],
    [{l:"Dar Andrew Cayabyab",a:2500000},{l:"Dar Andrew Cayabyab",a:500000},{l:"Payment: Moonton Philippines Technology ",a:319088},{l:"Payment: JOBSTREET.COM PHILIPPINES INC",a:298543},{l:"Payment: PILIPINAS E-SPORTS ORGANIZATION",a:101612}],
    [{l:"Payment: Moonton Philippines Technology ",a:9531653},{l:"Payment: TOTAL GAMEZONE XTREME INCORPORA",a:9222080},{l:"Dar Andrew Cayabyab",a:4000000},{l:"Payment: Moonton Philippines Technology ",a:2225816},{l:"Payment: SIGMA VENTURES HOLDINGS CORPORA",a:999508}],
    [{l:"MET - Philippines",a:3500000}],
    null,
    null,
    [{l:"SIGMA VENTURES HOLDINGS CORPORATION",a:428361},{l:"New Marketing",a:172292},{l:"SIGMA VENTURES HOLDINGS CORPORATION",a:107146},{l:"PT Kita Mitra Indonesia",a:45359},{l:"Riviera Golf Club, Inc.",a:13786}],
    [{l:"MET - Philippines",a:18593204},{l:"New Marketing",a:1700000},{l:"MET - Philippines",a:1512500},{l:"PILIPINAS E-SPORTS ORGANIZATION INC.",a:303421},{l:"TEG HOLDING PTE. Ltd.",a:81733}],
    null,
    null,
    [{l:"Infinitech Digital Gaming Corporation",a:756566},{l:"TEG HOLDING PTE. Ltd.",a:99091}],
    null,
    null,
    null,
    null,
    null,
    [{l:"New Marketing",a:800000}],
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
    [{l:"GG Company Inc.",a:12698}],
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
    [{l:"Dar Andrew Cayabyab",a:-9200000},{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-8900000},{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-2200000},{l:"Dar Andrew Cayabyab",a:-1687500},{l:"Payment: Payroll",a:-1538100}],
    [{l:"COS",a:-2711614},{l:"GAE",a:-4192834},{l:"Tax",a:-300000}],
    [{l:"COS",a:-750000},{l:"GAE",a:-1462000}],
    [{l:"Loan",a:-105240},{l:"COS",a:-4394254},{l:"GAE",a:-312700},{l:"Tax",a:-1000000}],
    [{l:"COS",a:-5506060},{l:"GAE",a:-3444654},{l:"Other",a:-855586}],
    [{l:"Loan",a:-7652620},{l:"COS",a:-7117508},{l:"GAE",a:-1101626},{l:"Other",a:-1000000}],
    [{l:"COS",a:-5982674},{l:"GAE",a:-1230764},{l:"Tax",a:-800000}],
    [{l:"COS",a:-500000},{l:"GAE",a:-2062700},{l:"Tax",a:-1000000}],
    [{l:"GAE",a:-970000},{l:"Other",a:-855586}],
    [{l:"GAE",a:-1891000}],
    [{l:"Loan",a:-52620},{l:"GAE",a:-900000}],
    [{l:"GAE",a:-2393464},{l:"Tax",a:-1487299}],
    [{l:"Tax",a:-800000}],
    [{l:"GAE",a:-2521000},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"GAE",a:-340000}],
    [{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],
    [{l:"Tax",a:-1000000}],
    [{l:"GAE",a:-2521000},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"GAE",a:-3840000}],
    [{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],
    [{l:"GAE",a:-970000},{l:"Tax",a:-1000000}],
    [{l:"GAE",a:-1551000},{l:"Other",a:-855586}]
  ],
  ggOut: [
    [{l:"GG Company Inc.",a:-10072},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-137995},{l:"GG Company Inc.",a:-10072},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-10384},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-1000000},{l:"GG Company Inc.",a:-500000},{l:"GG Company Inc.",a:-350000},{l:"GG Company Inc.",a:-50000},{l:"GG Company Inc.",a:-50000}],
    [{l:"GG Company Inc.",a:-600000},{l:"GG Company Inc.",a:-15863},{l:"GG Company Inc.",a:-12616}],
    [{l:"GG Company Inc.",a:-15351},{l:"GG Company Inc.",a:-12937}],
    [{l:"GG Company Inc.",a:-1000000},{l:"GG Company Inc.",a:-15627},{l:"GG Company Inc.",a:-12698}],
    [{l:"GG liquidity outflow",a:-63299}],
    [{l:"GG liquidity outflow",a:-210384}],
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
  {account:"GAMEMASTER (GTCC)",project:"GTCC September Arena",amount:8734964.30,status:"Collected",pic:"Iggy",target:"03.30",aging:"Collected W28",week:14,priority:"high",year:2025},
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
  {account:"MOONTON",project:"MPL S17 FP",amount:8254507.65,status:"Collected",pic:"Marcus",target:"07.10",aging:"Collected W28",week:28,priority:"high",year:2026},
  {account:"TENCENT",project:"PKL Spring Season Addendum",amount:0,status:"For Invoicing",pic:"Iggy",target:"06.30",aging:"on time",week:27,priority:"low",year:2025},
  {account:"MOONTON",project:"MPL S18",amount:24598214.29,status:"For Invoicing",pic:"Marcus",target:"09.04",aging:"slipped from W33",week:36,priority:"high",year:2026},
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
  {account:"TOTAL GAMEZONE XTREME INCORPORATED",project:"GTCC 2025: September Arena",amount:9222080},
  {account:"MOONTON",project:"MPL S17 FP",amount:9531653},
  {account:"MOONTON",project:"MPL S17 Addendum 2",amount:2225816},
  {account:"PSI SPORTS INTERNATIONAL",project:"GOSH Live Streamers",amount:493899},
  {account:"Mineski Global (Malaysia)",project:"Inter-company receipt",amount:139375},
  {account:"PILIPINAS E-SPORTS ORGANIZATION",project:"PESO ENC Social Media Campaign",amount:101612},
  {account:"SIGMA VENTURES HOLDINGS",project:"Sportsplus FanZone Phase (W31)",amount:999508},
  {account:"SIGMA VENTURES HOLDINGS",project:"SportsPlus MPBL Roadtrip (W31)",amount:53509},
];

// Derived AR totals (auto-computed from arrays above)
var totalOpen      = AR_OPEN.reduce(function(s,r){return s+(r.amount||0);},0);
var totalCollected = COLLECTED.reduce(function(s,r){return s+r.amount;},0);
var highPriority   = AR_OPEN.filter(function(r){return r.priority==="high";});
var totalHigh      = highPriority.reduce(function(s,r){return s+r.amount;},0);
var thisWeekAR     = AR_OPEN.filter(function(r){return r.week<=32;});
var thisWeekTotal  = thisWeekAR.reduce(function(s,r){return s+r.amount;},0);

// ── FULL YEAR PROJECTION DATA ─────────────────────────────────────────────────
// Arrays marked _INIT are mutable inside FullYear (cloned via .slice() each render).
// Non-suffixed arrays are read-only and used directly as globals.
// Source: CF for Mancom (Jan–Jun actuals) + AP sheet (Jul–Dec projections)

// Jan–Dec opening balance and closing net (months 6–11 overwritten by chain IIFE)
var FY_BEG_INIT    = [12652564,4697131,3367012,3925661,2108492,599016,935905,50282953,87137039,159212491,175080118,200755552];
var FY_NET_INIT    = [4697131,3367012,3925661,2108492,599016,935905,50282953,87137039,159212491,175080118,200755552,228802953];

// Inflow: Jan–Jun from CF rows 53/54; Jul–Dec from AM BD Universe Collections CSV
var FY_PDEI_IN_INIT = [16323424,9067184,13219958,29063859,13433202,11501348,27041367,7941645,30674119,0,800000,1057436];
var FY_GG_IN_INIT   = [20799694,3302846,23568842,2001826,1950465,7942860,1000000,0,0,0,0,2283610];

// Inflow breakdowns for projection months (Jul–Dec) — from AM BD Universe CSV
var FY_PDEI_IN_BD_INIT = [
  null,null,null,null,null,
  [{l:"W23 Jun 5 (Dar/TEG/misc)",a:2556563},{l:"W24 Jun 12 (GG interco/Bounce/Jobstreet)",a:2677734},{l:"W25 Jun 19 (Dar/GG/CA Liq.)",a:1532148},{l:"W26 Jun 26 (Jobstreet/Moonton/PESO/misc)",a:4682747}],  // Jun
  // Jul = W28–W31, now a complete actual month (GL). Jul total 27,041,367.
  [{l:"Moonton Phil. – MPL S17 FP (W28)",a:9531653},{l:"Gamezone Xtreme – GTCC S9 Arena (W28)",a:9222080},{l:"Dar Andrew Cayabyab – loan/other receipt (W31)",a:4000000},{l:"Moonton Phil. – MPL S17 Add.2 (W28)",a:2225816},{l:"SIGMA Ventures – Sportsplus FanZone (W31)",a:999508},{l:"PSI Sports – GOSH Live Streamers (W30)",a:493899},{l:"Mineski Global (Malaysia) (W30)",a:139375},{l:"TEG Holding Pte. Ltd. (W28)",a:123090},{l:"PESO – ENC Social Media (W30)",a:101612},{l:"ChinaBank (W30)",a:98834},{l:"SIGMA Ventures – MPBL Roadtrip (W31)",a:53509},{l:"Other receipts / CA liquidations (W29–W31)",a:51991}],  // Jul
  // Aug = W32–W35 projection (AR schedule). Aug total 7,941,645.
  // MPL S18 (₱18.59M) and MPL S18 Media Day (₱1.51M) moved out of Aug into W36 (Sep).
  [{l:"Other Receipt / Loan (W32)",a:3500000},{l:"SIGMA Ventures – Sportsplus FanZone (W35)",a:535507},{l:"Lapak (W35)",a:172292},{l:"PT Kita Mitra Indonesia (W35)",a:45359},{l:"Riviera Golf Club (W35)",a:13786},{l:"SAGAEVENTS Inc. (W35)",a:11200},{l:"CF collection forecast not yet in AR (W34–W35)",a:3663501}],  // Aug
  // Sep = W36–W39 projection. Sep total 30,674,119.
  [{l:"Moonton – MPL S18 (W36)",a:18593204},{l:"CF collection forecast not yet in AR (W36)",a:7627604},{l:"Monster (W36)",a:1700000},{l:"Moonton – MPL S18 Media Day (W36)",a:1512500},{l:"Infinitech – SportsPlus MPBL Roadtrip (W39)",a:756566},{l:"PESO – ENC Social Media Campaign (W36)",a:303421},{l:"TEG – MCGG S6 Crew Clash (W39)",a:99091},{l:"TEG – MCGG Rising Stars S4 (W36)",a:81733}],  // Sep
  null,  // Oct
  [{l:"Sandisk (W45)",a:800000}],  // Nov
  // Dec = W52 AR rows booked under New Marketing. Total 1,057,436.
  [{l:"Minotaur Advertising – Cobra Core Event (W52)",a:787137},{l:"Alika Company – Ragnarok Ph.8 (W52)",a:135150},{l:"Alika Company – Ragnarok Ph.9 (W52)",a:104434},{l:"Alika Company – Ragnarok V Ph.2 (W52)",a:30715}],  // Dec
];
var FY_GG_IN_BD_INIT = [
  null,null,null,null,null,
  [{l:"W24 Jun 12: GG Company Inc. (inter-company)",a:4162966},{l:"W26 Jun 26: GG Company Inc. (inter-company)",a:3779893}],  // Jun
  [{l:"GG Company Inc. (inter-company, W28)",a:1000000}],  // Jul (W28–W31 actual)
  null,  // Aug
  null,  // Sep
  null,  // Oct
  null,  // Nov
  // Dec = W52 AR rows booked under MET - Philippines. Total 2,283,610.
  [{l:"V5 Technologies Inc. (W52)",a:1843551},{l:"Minotaur Advertising (W52)",a:220202},{l:"GG inter-company balance (est.)",a:219857}],  // Dec
];

// Outflow: Jan–Jun from CF rows 57–62; Jul–Dec base (overwritten by AP injection)
var FY_PAY24_INIT  = [0,0,0,0,0,0,0,0,0,0,0,-9374560];
var FY_PAY25_INIT  = [-7099389,0,0,-3662227,0,0,0,0,0,0,0,0];
var FY_COS_CF      = [702891,1667769,6495491,6928066,7391448,3786585,3151064,0,0,0,0,0];
var FY_AP_TOT_INIT = [0,0,0,0,0,0,0,16555360,23693971,7600383,12022492,12107906];

// Non-mutated outflow arrays (used directly as globals inside FullYear)
var FY_GAE    = [6381246,5101931,4530559,7365918,5298788,5393572,5060441,9412188,5365090,5184464,8344700,9323700];
var FY_TAX    = [1333356,147567,107781,1683897,652788,430449,1606199,1300000,1800000,2287299,1800000,1800000];
var FY_CAPEX  = [0,154206,38400,0,0,31050,53349,0,0,0,0,0];
var FY_LOAN   = [10000000,0,0,9270000,0,0,10992809,105240,7652620,52620,52620,52620];
var FY_OTHER  = [10694928,905934,1853711,2992785,1675135,947554,2673880,855586,1855586,0,1711172,855586];
var FY_STP    = [-4393741,3017213,0,0,0,0,0,0,0,0,0,0];
var FY_FOREX  = [-432368,-1019,16827,-7812,-8776,498416,29014,0,0,0,0,0];
var FY_GG_OUT = [16398498,5723761,23187381,4650000,1883759,8019694,919003,684067,1034066,742861,944450,566543];

// ── FORECAST PROJECTS ─────────────────────────────────────────────────────────
// Add upcoming signed deals here; they auto-inject into Full Year inflow + COS.
var FORECAST_PROJECTS = []; // populated from Supabase at runtime

// ── AP COS VENDORS (Arrears Tab) ──────────────────────────────────────────────
var AP_COS_VENDORS = [
  {n:"Procurement Budget",              a:5950000, note:"W32–W38 scheduled"},
  {n:"APEX Franchise Ventures OPC",     a:5482674, note:"W37 scheduled"},
  {n:"STAGE ONE Event Services Corp.",  a:344732,  note:"W34 scheduled"},
  {n:"Innove Communications Inc.",      a:11614,   note:"W32 current"},
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
  // W32: AP sheet reschedules this to W34 (Aug) at ₱344,732 — PRF BRF-0126-019. Was dueMonth:6 / ₱351,000.
  {entity:"PDEI",year:2025,project:"MPL PH S16 Playoffs",                    vendor:"STAGE ONE Event Services Corp.",           amount:344732,   terms:"Final Term (30%)",      dueMonth:7,    classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Regular Season",              vendor:"APEX Franchise Ventures OPC",              amount:10286195, terms:"3 BRFs",                dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Regular Season",              vendor:"JEROME T. Capoquian",                      amount:46000,    terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Addendum",                    vendor:"Power Plant Generator Rentals",            amount:185440,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL S15 Xstatic Cover",                  vendor:"APEX Franchise Ventures OPC",              amount:4389000,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  // W32: the AP sheet now carries these two as ONE row — PRF BRF-0426-170, ₱5,482,674, scheduled W37 (Sep).
  // Was 2 rows at dueMonth:6 totalling ₱5,621,268 (₱4,194,600 + ₱1,426,668).
  {entity:"PDEI",year:2025,project:"MPL S16 / S16 Playoffs (BRF-0426-170)",  vendor:"APEX Franchise Ventures OPC",              amount:5482674,  terms:"One-Time",              dueMonth:8,    classification:"Cost of Sales"},
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
  totals: [29112421,7977406,13025942,28240666,15018159,10589209,23537741,2711614,750000,4394254,5506060,7117508,5982674,500000,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  bd: [
    [{"l":"MPL PH S15 – Lights/Sounds Truss Rental","a":4389000,"t":"filed"},{"l":"GTCC Summer Showdown – Technical Svcs","a":1456000,"t":"filed"},{"l":"KIC Rebroadcast – Booth Rental/Fabrication","a":135520,"t":"filed"},{"l":"realme Cup – LED Rental/Logistics","a":127680,"t":"filed"}],
    [{"l":"SM Cyberzone TCG – Stage/Booth Fabrication","a":400000,"t":"filed"},{"l":"KIC 2025 GS&K – GO Wifi Business OTC","a":352240,"t":"filed"},{"l":"PKL Spring – Booth & Players Area Rental","a":220000,"t":"filed"},{"l":"SM Cyberzone TCG – Tech Svcs","a":200000,"t":"filed"}],
    [{"l":"KIC 2025 GS&K – Outsourced Tech Svcs","a":7350000,"t":"filed"},{"l":"KIC 2025 Playoffs – Asset Rental/Svcs","a":5400967,"t":"filed"},{"l":"MPL PH S17 – Outsourced Tech Svcs","a":5163200,"t":"filed"},{"l":"KIC 2025 Playoffs – Outsourced Tech Svcs","a":4900000,"t":"filed"}],
    [{"l":"PUBG Mobile 8th Anniv – Venue Rental Ayala","a":252000,"t":"filed"},{"l":"PUBG Mobile 8th Anniv – Venue Rental Veranda","a":50400,"t":"filed"},{"l":"Sportsplus MPBL – Basketball Arcade Machine","a":40000,"t":"filed"},{"l":"PKL Spring – Logistics Associates","a":17000,"t":"filed"}],
    [{"l":"Sportsplus MPBL FZ – Lights & Audio Rental","a":87500,"t":"filed"},{"l":"PKL Spring – Outsourced Manpower","a":73366,"t":"filed"},{"l":"PKL Spring – Photography & Videography","a":62000,"t":"filed"},{"l":"Sportsplus MPBL – Tote Bag Materials","a":60000,"t":"filed"}],
    [{"l":"BingoPlus Music Fest – Agency Fee","a":324613,"t":"filed"},{"l":"MPL PH S17 – Direct Internet 500Mbps","a":280000,"t":"filed"},{"l":"MPL PH S17 – Show Director","a":77800,"t":"filed"},{"l":"Sportsplus MPBL FZ – Lights & Audio","a":52500,"t":"filed"},{"l":"MPL PH S17 (unfiled balance ÷6 wks)","a":3543638,"t":"unfiled"},{"l":"PKL Spring – unfiled balance (ended W13)","a":3432208,"t":"unfiled"},{"l":"PUBG 8th Anniv – unfiled balance (ended W13)","a":1716975,"t":"unfiled"},{"l":"SM Cyberzone TCG – unfiled balance (ends W16)","a":1118126,"t":"unfiled"},{"l":"Sportsplus MPBL Fan Zone – unfiled (ended W15)","a":863892,"t":"unfiled"},{"l":"Jobstreet LU v2 – unfiled balance (ended W14)","a":557006,"t":"unfiled"},{"l":"PKL Spring – Photography & Videography","a":62000,"t":"filed"},{"l":"MPL PH S17 – API Engineer","a":33400,"t":"filed"},{"l":"PKL Spring – Outsourced Manpower","a":30350,"t":"filed"},{"l":"MPL PH S17 – Show Producer","a":30000,"t":"filed"},{"l":"Sportsplus MBPL Roadtrip – unfiled ÷5 wks","a":407598,"t":"unfiled"},{"l":"PKL Addendum – Talent/Caster","a":36533,"t":"filed"},{"l":"PKL Addendum – Talent/Caster OSX","a":29166,"t":"filed"}],
    // Jul (W28-W31 merged; the prior W28/W29/W30 entries were all null) through W52
    // projections - no fresher Andon Board file provided this week
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
  ]
};

// Non-COS projection outflows (GAE, Tax, CAPEX, Loan, Other) — one entry per CF.proj week (W27-W52)
var NON_COS_PROJ = [
  {gae:4192834,tax:300000,capex:0,loan:0,other:0,cos:2711614},  // W32
  {gae:1462000,tax:0,capex:0,loan:0,other:0,cos:750000},  // W33
  {gae:312700,tax:1000000,capex:0,loan:105240,other:0,cos:4394254},  // W34
  {gae:3444654,tax:0,capex:0,loan:0,other:855586,cos:5506060},  // W35
  {gae:1101626,tax:0,capex:0,loan:7652620,other:1000000,cos:7117508},  // W36
  {gae:1230764,tax:800000,capex:0,loan:0,other:0,cos:5982674},  // W37
  {gae:2062700,tax:1000000,capex:0,loan:0,other:0,cos:500000},  // W38
  {gae:970000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W39
  {gae:1891000,tax:0,capex:0,loan:0,other:0,cos:0},  // W40
  {gae:900000,tax:0,capex:0,loan:52620,other:0,cos:0},  // W41
  {gae:2393464,tax:1487299,capex:0,loan:0,other:0,cos:0},  // W42
  {gae:0,tax:800000,capex:0,loan:0,other:0,cos:0},  // W43
  {gae:2521000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W44
  {gae:340000,tax:0,capex:0,loan:52620,other:0,cos:0},  // W45
  {gae:2962700,tax:800000,capex:0,loan:0,other:0,cos:0},  // W46
  {gae:0,tax:1000000,capex:0,loan:0,other:0,cos:0},  // W47
  {gae:2521000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W48
  {gae:3840000,tax:0,capex:0,loan:52620,other:0,cos:0},  // W49
  {gae:2962700,tax:800000,capex:0,loan:0,other:0,cos:0},  // W50
  {gae:970000,tax:1000000,capex:0,loan:0,other:0,cos:0},  // W51
  {gae:1551000,tax:0,capex:0,loan:0,other:855586,cos:0},  // W52
];

// ── WEEKLY TABLE COMBINED — PROJECTION ARRAYS ─────────────────────────────────
// One entry per CF.proj week (W27-W52). Rebuilt from CF for Mancom every week.
var WT_PDEI_IN_PROJ  = [3500000,0,494143,3947502,29818462,0,0,855657,0,0,0,0,0,800000,0,0,0,0,0,0,1057436];
var WT_GG_IN_PROJ    = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2283610];
var WT_PDEI_OUT_PROJ = [7204447,2212000,5812195,9806300,16871754,8013438,3562700,1825586,1891000,952620,3880763,800000,3376586,392620,3762700,1000000,3376586,3892620,3762700,1970000,2406586];
var WT_GG_OUT_PROJ   = [63299,210384,200000,210384,200000,423682,200000,210384,200000,342861,100000,100000,310384,300000,123682,100000,110384,100000,323682,0,142861];
