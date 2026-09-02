// ── MINESKI CASHFLOW DATA ─────────────────────────────────────────────────────
// Update this file each week. The HTML (Mineski_Cashflow_V2.html) contains
// only rendering logic and never needs editing for routine data updates.
// ─────────────────────────────────────────────────────────────────────────────

// ── WEEK / DATE ───────────────────────────────────────────────────────────────
var WEEK = "Week 36";
var DATE = "September 6, 2026";

// ── WEEKLY CASH FLOW TABLE ────────────────────────────────────────────────────
// Source: PH_Cash_Flow_Monitoring · CF for Mancom tab
// Update actBeg/pdeiIn/ggIn/totIn/pdeiOut/ggOut/totOut/forex/net each week.
// Add new projection columns to proj/projBeg/projIn/projOut/projNet arrays.
// NOTE: Week 34 xlsx was never issued — this update jumps W33 → W35 directly.
var CF = {
  weeks: ["W1-W5 (Jan)","W6-W9 (Feb)","W10-W13 (Mar)","W14-W18 (Apr)","W19-W22 (May)","W23 - W27 (June)","W28-W31 (July)","W32 (Aug 7)","W33 (Aug 14)","W34 (Aug 21)","W35 (Aug 28)"],
  proj:  ["W36 (Sep 4)","W37 (Sep 11)","W38 (Sep 18)","W39 (Sep 25)","W40 (Oct 2)","W41 (Oct 9)","W42 (Oct 16)","W43 (Oct 23)","W44 (Oct 30)","W45 (Nov 6)","W46 (Nov 13)","W47 (Nov 20)","W48 (Nov 27)","W49 (Dec 4)","W50 (Dec 11)","W51 (Dec 18)","W52 (Dec 25)"],
  actBeg:  [12652564,4697131,3367012,3925661,2108492,599016,935905,4491514,5266694,3221056,3229748],
  pdeiIn:  [16323424,9067184,13219958,29063859,13433202,11501348,27041367,4058499,4198626,1500045,20594346],
  ggIn:    [20799694,3302846,23568842,2001826,1950465,7942860,1000000,0,0,0,0],
  totIn:   [37123118,12370030,36788799,31065685,15383666,19444208,28041367,4058499,4198626,1500045,20594346],
  pdeiOut: [29112421,7977406,13025942,28240666,15018159,10589209,23537741,3284035,6196595,1460476,18806802],
  ggOut:   [16398498,5723761,23187381,4650000,1883759,8019694,919003,0,24682,0,0],
  totOut:  [45510920,13701167,36213323,32890666,16901918,18608904,24456744,3284035,6221278,1460476,18806802],
  forex:   [-432368,-1019,16827,-7812,-8776,498416,29014,-717,22986,30877,-90364],
  net:     [4697131,3367012,3925661,2108492,599016,935905,4491514,5266694,3221056,3229748,5107657],
  projBeg: [5107657,2189369,-2909503,-10458938,-7880439,-15389175,-22633604,-30120457,-36560819,-43529583,-48012206,-55807174,-58784137,-65005990,-62552175,-62943421,-64731068],
  projIn:  [0,1996971,753830,7352576,7410550,0,303421,0,626792,800000,0,450000,310185,8773398,7327604,2509316,3370917],
  projOut: [2918288,7095843,8303265,4774077,14919285,7244429,7790274,6440362,7595556,5282623,7794969,3426963,6532038,6319583,7718850,4296963,3985658],
  projNet: [2189369,-2909503,-10458938,-7880439,-15389175,-22633604,-30120457,-36560819,-43529583,-48012206,-55807174,-58784137,-65005990,-62552175,-62943421,-64731068,-65345809],
};

// Actuals for weekly table (PDEI+GG split)
var WT_PDEI_IN  = [16323424,9067184,13219958,29063859,13433202,11501348,27041367,4058499,4198626,1500045,20594346];
var WT_GG_IN    = [20799694,3302846,23568842,2001826,1950465,7942860,1000000,0,0,0,0];
var WT_PDEI_OUT = [29112421,7977406,13025942,28240666,15018159,10589209,23537741,3284035,6196595,1460476,18806802];
var WT_GG_OUT   = [16398498,5723761,23187381,4650000,1883759,8019694,919003,0,24682,0,0];
var WT_TOT_IN   = [37123118,12370030,36788799,31065685,15383666,19444208,28041367,4058499,4198626,1500045,20594346];
var WT_TOT_OUT  = [45510920,13701167,36213323,32890666,16901918,18608904,24456744,3284035,6221278,1460476,18806802];

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
    [{l:"Dar Andrew Cayabyab",a:3000000},{l:"Bank Transfer from Security Bank_DTC_856",a:550000},{l:"Dar Andrew Cayabyab",a:500000},{l:"Cash Advance Liquidation: Short/Over",a:5498},{l:"Cash Advance Liquidation: Short/Over",a:1549}],
    [{l:"Payment: Moonton Philippines Technology ",a:1463000},{l:"Dar Andrew Cayabyab",a:1000000},{l:"Dar Andrew Cayabyab",a:1000000},{l:"Bank Transfer from Security Bank  (PHP) ",a:550000},{l:"Payment: MILLENNIUM COMPUTER TECHNOLOGY ",a:423012}],
    [{l:"Dar Andrew Cayabyab",a:990000},{l:"Payment: PSI SPORTS INTERNATIONAL SDN. B",a:493786},{l:"Payment: PSI SPORTS INTERNATIONAL SDN. B",a:15759},{l:"Cash Advance - Employees",a:500}],
    [{l:"Payment: Moonton Philippines Technology ",a:20563388},{l:"Bank Transfer from Security Bank  (PHP) ",a:200000},{l:"Cash Advance Liquidation: Short/Over",a:8600},{l:"ICA GOOGLE ASIA PACIFIC PTE LTD",a:6961},{l:"Cash Advance Liquidation: Short/Over",a:6515}],
    null,
    [{l:"MONSTER ENERGY SOUTHEAST ASIA SDN BHD",a:1751436}],
    [{l:"SIGMA VENTURES HOLDINGS CORPORATION",a:428361},{l:"New Marketing",a:172292},{l:"SIGMA VENTURES HOLDINGS CORPORATION",a:107146},{l:"PT Kita Mitra Indonesia",a:46032},{l:"Riviera Golf Club, Inc.",a:13786}],
    [{l:"Bank of the Philippine Islands",a:967618},{l:"Infinitech Digital Gaming Corporation",a:756566},{l:"Bank of the Philippine Islands",a:524674},{l:"TEG HOLDING PTE. Ltd.",a:100560}],
    [{l:"TEG HOLDING PTE. Ltd.",a:82945}],
    null,
    [{l:"PILIPINAS E-SPORTS ORGANIZATION INC.",a:303421}],
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
    [{l:"ROBINSONS LAND CORPORATION",a:-2438199},{l:"Bank Transfer from Security Bank_DTC_856",a:-550000},{l:"Payment: TIRADORES MEDIA PRODUCTIONS / L",a:-438300},{l:"Payment: Cash Advance - Employees",a:-55000},{l:"Payment: IT WAREHOUSE DISTRIBUTION INC.",a:-34399}],
    [{l:"Payment: Payroll",a:-1477980},{l:"Payment: STAGE ONE EVENT SERVICES CORP.",a:-834821},{l:"Payment: Reyes Tacondong & Co.",a:-720720},{l:"Bank Transfer from Security Bank  (PHP) ",a:-579283},{l:"Bank Transfer from Security Bank  (PHP) ",a:-550000}],
    [{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-1540000},{l:"Payment: Maxi One Production Inc.",a:-990000},{l:"Bank Transfer from Pillar Digital E- Com",a:-505911},{l:"Bank Transfer from Pillar Digital E- Com",a:-426558},{l:"Payment: Escapeboss Marketing Campaign S",a:-60750}],
    [{l:"Dar Andrew Cayabyab",a:-10490000},{l:"Bank Transfer from Chinabank (METPH-PHP)",a:-10060000},{l:"Payment: Payroll",a:-1501529},{l:"Payment: Lilith Network HK Limited",a:-894997},{l:"Payment: XSTATIC EVENT SYSTEM INC.",a:-885000}],
    [{l:"COS",a:-2500000},{l:"GAE",a:-404989}],
    [{l:"COS",a:-4135460},{l:"GAE",a:-2400000},{l:"Tax",a:-550000}],
    [{l:"Loan",a:-157861},{l:"COS",a:-6822321},{l:"GAE",a:-312700},{l:"Tax",a:-1000000}],
    [{l:"COS",a:-3340273},{l:"GAE",a:-367835},{l:"Other",a:-855586}],
    [{l:"COS",a:-11890932},{l:"GAE",a:-2828353}],
    [{l:"Loan",a:-52620},{l:"COS",a:-5948948},{l:"GAE",a:-900000}],
    [{l:"COS",a:-3972440},{l:"GAE",a:-2230535},{l:"Tax",a:-1487299}],
    [{l:"COS",a:-5540362},{l:"Tax",a:-800000}],
    [{l:"COS",a:-3908586},{l:"GAE",a:-2521000},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"COS",a:-4590003},{l:"GAE",a:-340000}],
    [{l:"COS",a:-3908586},{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],
    [{l:"COS",a:-2326963},{l:"Tax",a:-1000000}],
    [{l:"COS",a:-3045068},{l:"GAE",a:-2521000},{l:"Other",a:-855586}],
    [{l:"Loan",a:-52620},{l:"COS",a:-2326963},{l:"GAE",a:-3840000}],
    [{l:"COS",a:-3632468},{l:"GAE",a:-2962700},{l:"Tax",a:-800000}],
    [{l:"COS",a:-2326963},{l:"GAE",a:-970000},{l:"Tax",a:-1000000}],
    [{l:"COS",a:-1436210},{l:"GAE",a:-1551000},{l:"Other",a:-855586}]
  ],
  ggOut: [
    [{l:"GG Company Inc.",a:-10072},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-137995},{l:"GG Company Inc.",a:-10072},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-10384},{l:"GG Company Inc.",a:-9527}],
    [{l:"GG Company Inc.",a:-1000000},{l:"GG Company Inc.",a:-500000},{l:"GG Company Inc.",a:-350000},{l:"GG Company Inc.",a:-50000},{l:"GG Company Inc.",a:-50000}],
    [{l:"GG Company Inc.",a:-600000},{l:"GG Company Inc.",a:-15863},{l:"GG Company Inc.",a:-12616}],
    [{l:"GG Company Inc.",a:-15351},{l:"GG Company Inc.",a:-12937}],
    [{l:"GG Company Inc.",a:-1000000},{l:"GG Company Inc.",a:-15627},{l:"GG Company Inc.",a:-12698}],
    null,
    [{l:"GG Company Inc.",a:-13303}],
    null,
    [{l:"GG Company Inc.",a:-12202}],
    [{l:"GG liquidity outflow",a:-13299}],
    [{l:"GG liquidity outflow",a:-10384}],
    [{l:"GG liquidity outflow",a:-10384}],
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
var thisWeekAR     = AR_OPEN.filter(function(r){return r.week<=36;});
var thisWeekTotal  = thisWeekAR.reduce(function(s,r){return s+r.amount;},0);

// ── FULL YEAR PROJECTION DATA ─────────────────────────────────────────────────
// Arrays marked _INIT are mutable inside FullYear (cloned via .slice() each render).
// Non-suffixed arrays are read-only and used directly as globals.
// Source: CF for Mancom (Jan–Jun actuals) + AP sheet (Jul–Dec projections)

// Jan–Dec opening balance and closing net (months 6–11 overwritten by chain IIFE)
var FY_BEG_INIT    = [12652564,4697131,3367012,3925661,2108492,599016,935905,50282953,101340329,127324099,158281951,185344362];
var FY_NET_INIT    = [4697131,3367012,3925661,2108492,599016,935905,50282953,101340329,127324099,158281951,185344362,232031952];

// Inflow: Jan–Jun from CF rows 53/54; Jul–Dec from AM BD Universe Collections CSV
var FY_PDEI_IN_INIT = [16323424,9067184,13219958,29063859,13433202,11501348,27041367,30351516,10103377,7713971,2186977,19697625];
var FY_GG_IN_INIT   = [20799694,3302846,23568842,2001826,1950465,7942860,1000000,0,0,0,0,2283610];

// Inflow breakdowns for projection months (Jul–Dec) — from AM BD Universe CSV
var FY_PDEI_IN_BD_INIT = [
  null,null,null,null,null,
  [{l:"W23 Jun 5 (Dar/TEG/misc)",a:2556563},{l:"W24 Jun 12 (GG interco/Bounce/Jobstreet)",a:2677734},{l:"W25 Jun 19 (Dar/GG/CA Liq.)",a:1532148},{l:"W26 Jun 26 (Jobstreet/Moonton/PESO/misc)",a:4682747}],  // Jun
  // Jul = W28–W31, complete actual month (GL). Jul total 27,041,367.
  [{l:"Moonton Phil. – MPL S17 FP (W28)",a:9531653},{l:"Gamezone Xtreme – GTCC S9 Arena (W28)",a:9222080},{l:"Dar Andrew Cayabyab – loan/other receipt (W31)",a:4000000},{l:"Moonton Phil. – MPL S17 Add.2 (W28)",a:2225816},{l:"SIGMA Ventures – Sportsplus FanZone (W31)",a:999508},{l:"PSI Sports – GOSH Live Streamers (W30)",a:493899},{l:"Mineski Global (Malaysia) (W30)",a:139375},{l:"TEG Holding Pte. Ltd. (W28)",a:123090},{l:"PESO – ENC Social Media (W30)",a:101612},{l:"ChinaBank (W30)",a:98834},{l:"SIGMA Ventures – MPBL Roadtrip (W31)",a:53509},{l:"Other receipts / CA liquidations (W29–W31)",a:51991}],  // Jul
  // Aug = W32–W35, now a complete actual month (GL). Aug total 30,351,516 (was 30,320,558 at
  // W35 — small GL true-up on the same items now that all 4 weeks are actual, ~₱31K, immaterial).
  [{l:"Dar Andrew Cayabyab – loan/other receipt (W32)",a:3000000},{l:"Bank Transfer – Security Bank (W32)",a:550000},{l:"Dar Andrew Cayabyab (W32)",a:500000},{l:"CA Liquidations / misc GL items (W32)",a:8499},{l:"GL collections, various (W33)",a:4198626},{l:"Dar Andrew Cayabyab (W34)",a:990000},{l:"PSI Sports International (W34)",a:509545},{l:"Cash Advance – Employees (W34)",a:500},{l:"Moonton Phil. – MPL S18 DP (W35)",a:20563388},{l:"Other GL items / misc (W35)",a:30958}],  // Aug
  // Sep = W36–W39 projection. Sep total 10,103,377 (was 10,462,099 at W35 — Monster Energy DP
  // (W37) replaced the old SIGMA/PESO/TEG/Moonton W36 items, which dropped to $0 this week).
  [{l:"Monster Energy Southeast Asia (W37)",a:1751436},{l:"CF collection forecast not yet in AR (W37)",a:245535},{l:"AR-scheduled collections (W38)",a:753830},{l:"Bank of the Philippine Islands (W39)",a:967618},{l:"Infinitech – SportsPlus MPBL Roadtrip (W39)",a:756566},{l:"Bank of the Philippine Islands (W39)",a:524674},{l:"TEG Holding Pte. Ltd. (W39)",a:100560},{l:"CF collection forecast not yet in AR (W39)",a:5003158}],  // Sep
  [{l:"TEG Holding Pte. Ltd. (W40)",a:82945},{l:"CF collection forecast not yet in AR (W40)",a:7327605},{l:"PESO – ENC Social Media Campaign (W42)",a:303421}],  // Oct
  [{l:"CF collection forecast not yet in AR (W44)",a:626792},{l:"New Marketing (W45)",a:800000},{l:"CF collection forecast not yet in AR (W47)",a:450000},{l:"CF collection forecast not yet in AR (W48)",a:310185}],  // Nov
  // Dec = W49–W52 projection. Dec total 19,694,835 (was 1,057,436 at W33 — no named items yet, shown as CF-projection plugs).
  [{l:"CF collection forecast not yet in AR (W49)",a:8773398},{l:"CF collection forecast not yet in AR (W50)",a:7327604},{l:"CF collection forecast not yet in AR (W51)",a:2509316},{l:"CF collection forecast not yet in AR (W52)",a:1084517}],  // Dec
];
var FY_GG_IN_BD_INIT = [
  null,null,null,null,null,
  [{l:"W24 Jun 12: GG Company Inc. (inter-company)",a:4162966},{l:"W26 Jun 26: GG Company Inc. (inter-company)",a:3779893}],  // Jun
  [{l:"GG Company Inc. (inter-company, W28)",a:1000000}],  // Jul (W28–W31 actual)
  null,  // Aug
  null,  // Sep (was ₱1M inter-company est. at W35 — no longer projected as of W36)
  null,  // Oct
  null,  // Nov
  // Dec = W52 AR rows booked under MET - Philippines. Total 2,283,610.
  [{l:"V5 Technologies Inc. (W52)",a:1843551},{l:"Minotaur Advertising (W52)",a:220202},{l:"GG inter-company balance (est.)",a:219857}],  // Dec
];

// Outflow: Jan–Jun from CF rows 57–62; Jul–Dec base (overwritten by AP injection)
var FY_PAY24_INIT  = [0,0,0,0,0,0,0,0,0,0,0,-9374560];
var FY_PAY25_INIT  = [-7099389,0,0,-3662227,0,0,0,0,0,0,0,0];
var FY_COS_CF      = [702891,1667769,6495491,6928066,7391448,3786585,3151064,9066730,16798054,27352682,17779206,9722604];
var FY_AP_TOT_INIT = [0,0,0,0,0,0,0,0,9586971,14202213,12022492,12107906];

// Non-mutated outflow arrays (used directly as globals inside FullYear)
var FY_GAE    = [6381246,5101931,4530559,7365918,5298788,5393572,5060441,8279011,3485524,5958888,8344700,9323700];
var FY_TAX    = [1333356,147567,107781,1683897,652788,430449,1606199,208432,1550000,2287299,1800000,1800000];
var FY_CAPEX  = [0,154206,38400,0,0,31050,53349,58738,0,0,0,0];
var FY_LOAN   = [10000000,0,0,9270000,0,0,10992809,10490000,157861,52620,52620,52620];
var FY_OTHER  = [10694928,905934,1853711,2992785,1675135,947554,2673880,1644997,855586,0,1711172,855586];
var FY_STP    = [-4393741,3017213,0,0,0,0,0,0,0,0,0,0];
var FY_FOREX  = [-432368,-1019,16827,-7812,-8776,498416,29014,-37218,0,0,0,0];
var FY_GG_OUT = [16398498,5723761,23187381,4650000,1883759,8019694,919003,24682,244451,742861,944450,566543];

// ── FORECAST PROJECTS ─────────────────────────────────────────────────────────
// Add upcoming signed deals here; they auto-inject into Full Year inflow + COS.
var FORECAST_PROJECTS = []; // populated from Supabase at runtime

// ── AP COS VENDORS (Arrears Tab) ──────────────────────────────────────────────
var AP_COS_VENDORS = [
  {n:"Procurement Budget",              a:3500000, note:"W36–W38 scheduled"},
  {n:"APEX Franchise Ventures OPC",     a:5482674, note:"W40 scheduled"},
  {n:"STAGE ONE Event Services Corp.",  a:344732,  note:"W41 scheduled"},
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
  // W36 (revised xlsx): AP sheet now schedules this at W41 (Oct) — PRF BRF-0126-019.
  // Was W38 (Sep) as of W33/W35; briefly W34 (Aug) in the earlier W32 file. Originally dueMonth:6 / ₱351,000.
  {entity:"PDEI",year:2025,project:"MPL PH S16 Playoffs",                    vendor:"STAGE ONE Event Services Corp.",           amount:344732,   terms:"Final Term (30%)",      dueMonth:9,    classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Regular Season",              vendor:"APEX Franchise Ventures OPC",              amount:10286195, terms:"3 BRFs",                dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Regular Season",              vendor:"JEROME T. Capoquian",                      amount:46000,    terms:"Final Term (50%)",      dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL PH S16 Addendum",                    vendor:"Power Plant Generator Rentals",            amount:185440,   terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  {entity:"PDEI",year:2025,project:"MPL S15 Xstatic Cover",                  vendor:"APEX Franchise Ventures OPC",              amount:4389000,  terms:"One-Time",              dueMonth:null, classification:"Cost of Sales"},
  // W36 (revised xlsx): now scheduled W40 (Oct) — PRF BRF-0426-170. Was W37 (Sep) as of W32/W33/W35.
  // Originally 2 rows at dueMonth:6 totalling ₱5,621,268 (₱4,194,600 + ₱1,426,668), merged at W32.
  {entity:"PDEI",year:2025,project:"MPL S16 / S16 Playoffs (BRF-0426-170)",  vendor:"APEX Franchise Ventures OPC",              amount:5482674,  terms:"One-Time",              dueMonth:9,    classification:"Cost of Sales"},
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
  totals: [29112421,7977406,13025942,28240666,15018159,10589209,23537741,3284035,6196595,1460476,18806802,2500000,4135460,6822321,3340273,11890932,5948948,3972440,5540362,3908586,4590003,3908586,2326963,3045068,2326963,3632468,2326963,1436210],
  bd: [
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
    null,
    null,
    null,
    null,
    null
  ]
};

// Non-COS projection outflows (GAE, Tax, CAPEX, Loan, Other) — one entry per CF.proj week (W27-W52)
var NON_COS_PROJ = [
  {gae:404989,tax:0,capex:0,loan:0,other:0,cos:2500000},  // W36
  {gae:2400000,tax:550000,capex:0,loan:0,other:0,cos:4135460},  // W37
  {gae:312700,tax:1000000,capex:0,loan:157861,other:0,cos:6822321},  // W38
  {gae:367835,tax:0,capex:0,loan:0,other:855586,cos:3340273},  // W39
  {gae:2828353,tax:0,capex:0,loan:0,other:0,cos:11890932},  // W40
  {gae:900000,tax:0,capex:0,loan:52620,other:0,cos:5948948},  // W41
  {gae:2230535,tax:1487299,capex:0,loan:0,other:0,cos:3972440},  // W42
  {gae:0,tax:800000,capex:0,loan:0,other:0,cos:5540362},  // W43
  {gae:2521000,tax:0,capex:0,loan:0,other:855586,cos:3908586},  // W44
  {gae:340000,tax:0,capex:0,loan:52620,other:0,cos:4590003},  // W45
  {gae:2962700,tax:800000,capex:0,loan:0,other:0,cos:3908586},  // W46
  {gae:0,tax:1000000,capex:0,loan:0,other:0,cos:2326963},  // W47
  {gae:2521000,tax:0,capex:0,loan:0,other:855586,cos:3045068},  // W48
  {gae:3840000,tax:0,capex:0,loan:52620,other:0,cos:2326963},  // W49
  {gae:2962700,tax:800000,capex:0,loan:0,other:0,cos:3632468},  // W50
  {gae:970000,tax:1000000,capex:0,loan:0,other:0,cos:2326963},  // W51
  {gae:1551000,tax:0,capex:0,loan:0,other:855586,cos:1436210},  // W52
];

// ── WEEKLY TABLE COMBINED — PROJECTION ARRAYS ─────────────────────────────────
// One entry per CF.proj week (W27-W52). Rebuilt from CF for Mancom every week.
var WT_PDEI_IN_PROJ  = [0,1996971,753830,7352576,7410550,0,303421,0,626792,800000,0,450000,310185,8773398,7327604,2509316,1087307];
var WT_GG_IN_PROJ    = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2283610];
var WT_PDEI_OUT_PROJ = [2904989,7085460,8292881,4563694,14719285,6901568,7690274,6340362,7285172,4982623,7671286,3326963,6421654,6219583,7395168,4296963,3842797];
var WT_GG_OUT_PROJ   = [13299,10384,10384,210384,200000,342861,100000,100000,310384,300000,123682,100000,110384,100000,323682,0,142861];
