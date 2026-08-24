// Server-owned initial world seed. Clients never provide the authoritative starting snapshot.
export const PLAYABLE_COUNTRIES = new Set(['USA','CAN','MEX','BRA','ARG','GBR','FRA','ESP','DEU','ITA','POL','UKR','RUS','MAR','DZA','EGY','GRC','TUR','GEO','SYR','LBN','ISR','JOR','IRQ','SAU','YEM','ARE','OMN','IRN','AFG','PAK','IND','BGD','CHN','KAZ','MNG','PRK','KOR','JPN','MMR','THA','MYS','IDN','AUS']);

const rows = [
  ['USA',335,10,9,12,15,10,18,'واشنطن'],
  ['CAN',40,10,15,10,7,4,8,'العاصمة'],
  ['MEX',129,13,9,5,7,4,8,'العاصمة'],
  ['BRA',216,18,13,5,7,4,8,'العاصمة'],
  ['ARG',46,16,9,5,7,4,8,'العاصمة'],
  ['GBR',68,10,9,5,7,4,12,'العاصمة'],
  ['FRA',68,12,9,5,10,4,12,'باريس'],
  ['ESP',48,10,9,5,7,4,8,'العاصمة'],
  ['DEU',84,10,9,5,7,10,14,'العاصمة'],
  ['ITA',59,10,9,5,7,4,8,'العاصمة'],
  ['POL',38,10,9,5,7,7,8,'العاصمة'],
  ['UKR',37,16,9,5,7,4,8,'العاصمة'],
  ['RUS',146,10,9,18,11,12,8,'العاصمة'],
  ['MAR',38,10,9,5,7,4,8,'العاصمة'],
  ['DZA',46,10,9,14,7,4,8,'العاصمة'],
  ['EGY',112,9,9,5,7,4,8,'العاصمة'],
  ['GRC',10,10,9,5,7,4,8,'العاصمة'],
  ['TUR',86,12,9,5,7,7,8,'أنقرة'],
  ['GEO',4,10,9,5,7,4,8,'العاصمة'],
  ['SYR',23,10,9,5,7,4,8,'العاصمة'],
  ['LBN',6,10,9,5,7,4,6,'بيروت'],
  ['ISR',10,10,9,5,9,4,11,'العاصمة'],
  ['JOR',11,10,4,5,7,4,8,'العاصمة'],
  ['IRQ',46,10,9,15,7,4,8,'العاصمة'],
  ['SAU',37,10,9,20,7,4,14,'العاصمة'],
  ['YEM',34,10,9,5,7,4,8,'العاصمة'],
  ['ARE',10,10,9,14,7,4,16,'العاصمة'],
  ['OMN',5,10,9,11,7,4,8,'العاصمة'],
  ['IRN',89,10,9,16,7,8,8,'العاصمة'],
  ['AFG',43,10,9,5,7,4,8,'العاصمة'],
  ['PAK',241,10,9,5,7,4,8,'العاصمة'],
  ['IND',1420,15,9,5,7,9,8,'العاصمة'],
  ['BGD',173,10,9,5,7,4,8,'العاصمة'],
  ['CHN',1410,10,9,5,15,16,14,'بكين'],
  ['KAZ',20,10,9,13,7,4,8,'العاصمة'],
  ['MNG',3,10,9,5,7,8,8,'العاصمة'],
  ['PRK',26,10,9,5,7,4,8,'العاصمة'],
  ['KOR',52,10,9,5,12,4,15,'العاصمة'],
  ['JPN',124,10,9,5,12,4,16,'العاصمة'],
  ['MMR',55,10,9,5,7,4,8,'العاصمة'],
  ['THA',72,13,9,5,7,4,8,'العاصمة'],
  ['MYS',34,10,9,8,7,4,8,'العاصمة'],
  ['IDN',279,12,9,9,7,4,8,'العاصمة'],
  ['AUS',27,14,9,5,7,12,8,'العاصمة']
];
const coastal = new Set(['ARE', 'ARG', 'AUS', 'BGD', 'BRA', 'CAN', 'CHN', 'DZA', 'EGY', 'ESP', 'FRA', 'GBR', 'GEO', 'IDN', 'IND', 'IRN', 'ISR', 'ITA', 'JPN', 'KOR', 'LBN', 'MAR', 'MEX', 'MMR', 'MYS', 'OMN', 'PAK', 'PRK', 'SAU', 'SYR', 'THA', 'TUR', 'USA', 'YEM']);

function countryState([id,pop,food,water,fuel,power,steel,money]) {
  return {
    id, controller:`AI:${id}`, population:pop, stability:72, approval:64,
    stock:{food:75+food*2,water:75+water*2,fuel:55+fuel*2,power:65+power*2,steel:45+steel*2,money:70+money*2},
    production:{food,water,fuel,power,steel,money},
    army:{
      soldiers:6+Math.min(32,Math.round(Math.sqrt(pop)*1.2)),
      tanks:Math.max(1,Math.min(5,Math.round((steel+money)/10))),
      artillery:Math.max(1,Math.min(4,Math.round((steel+money)/12))),
      airDefense:Math.max(1,Math.min(3,Math.round((power+money)/18))),
      aircraft:Math.max(1,Math.min(4,Math.round((power+money)/12))),
      helicopters:(power+money)>=28?1:0,drones:1,recon:1,
      navy:coastal.has(id)?Math.max(1,Math.min(3,Math.round((fuel+money)/14))):0
    },
    solar:0,nuclear:0,grid:1,farms:1,foodFactories:1,civilianIndustry:1,militaryIndustry:1,
    airBases:0,navalBases:0,supplyHubs:1,supply:72,morale:70,intelligence:20,resistance:0,
    warExhaustion:0,commandPoints:6,occupationPolicy:'balanced',
    techAgriculture:0,techIndustry:0,techLogistics:0,techArmor:0,techAir:0,techIntel:0
  };
}

function sitesFor(row) {
  const [id,,,,,,,,capital] = row;
  const xs=[
    {id:`${id}_CAP`,countryId:id,name:capital,kind:'capital',dx:0,dy:0,health:100,level:1},
    {id:`${id}_FAC`,countryId:id,name:'المجمع الصناعي',kind:'factory',dx:.010,dy:.014,health:100,level:1},
    {id:`${id}_PWR`,countryId:id,name:'محطة الطاقة',kind:'power',dx:-.012,dy:.012,health:100,level:1},
    {id:`${id}_SUP`,countryId:id,name:'مركز الإمداد',kind:'supply',dx:.012,dy:-.014,health:100,level:1},
    {id:`${id}_AIR`,countryId:id,name:'القاعدة الجوية',kind:'airport',dx:-.013,dy:-.014,health:100,level:1},
  ];
  if(coastal.has(id)) xs.push({id:`${id}_PRT`,countryId:id,name:'الميناء الرئيسي',kind:'port',dx:.020,dy:.002,health:100,level:1});
  return xs;
}

export function createInitialSnapshot(countryOwners) {
  const countries=Object.fromEntries(rows.map(r=>[r[0],countryState(r)]));
  for(const country of countryOwners.keys()) if(countries[country]) countries[country].controller=`P:${country}`;
  return {
    turn:1, alliances:[], sanctions:[], tradeDeals:[], diplomaticOffers:[], countries,
    logs:['الدور 1 — بدأت المباراة الأونلاين.'], fieldArmies:[], battles:[], strategicSites:rows.flatMap(sitesFor),
    events:[], winner:null, victoryType:null
  };
}
