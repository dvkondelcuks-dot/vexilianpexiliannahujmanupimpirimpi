export const signalStates = [
  "NEZINĀMS APMEKLĒTĀJS",
  "KONTAKTA PUNKTS",
  "STRUKTURĒTS MARŠRUTS",
  "PIEPRASĪJUMA IERAKSTS",
  "PIESĀISTS PIEPRASĪJUMS",
  "ATGŪSTAMS PIEPRASĪJUMS",
  "REDZAMS BIZNESA SIGNĀLS"
];

export const layers = [
  {
    number: "01/06",
    title: "Forma · Saturs · Vietne",
    subtitle: "Pirmā tiešā saskare ar zīmolu",
    text: "Vietne, formas, satura plūsma un vizuālais materiāls. Tā ir telpa, kurā cilvēks pirmoreiz tieši satiek uzņēmumu.",
    includes: ["Next.js vietne", "formas ar telemetriju", "satura struktūra", "CTA loģika"],
    visual: ["APMEKLĒTĀJS", "LAPA", "FORMA"]
  },
  {
    number: "02/06",
    title: "Klientu plūsma",
    subtitle: "Ceļš no intereses līdz kontaktam",
    text: "Skaidrs ceļš no reklāmas līdz formai, no formas līdz cilvēkam, no cilvēka līdz nākamajam solim.",
    includes: ["lapu plūsmas", "daudzvalodu maršruti", "tracking", "konversijas punkti"],
    visual: ["REKLĀMA", "LAPA", "CTA", "KONTAKTS"]
  },
  {
    number: "03/06",
    title: "CRM",
    subtitle: "Viena vieta katram kontaktam",
    text: "Kontakti, sarunas, lēmumi un statusi vienā vietā. Bez izklājlapām kā galvenās sistēmas. Bez pazudušiem pavedieniem.",
    includes: ["kontaktu vēsture", "stage pipeline", "komandas redzamība", "atbildības īpašnieks"],
    visual: ["JAUNS", "KVALIFICĒTS", "AKTĪVS", "IEGŪTS"]
  },
  {
    number: "04/06",
    title: "Atribūcija",
    subtitle: "Kura reklāma atveda klientu",
    text: "Beidzot redzams, kurš kanāls, kura reklāma, kurš ieraksts vai kurš ceļš atveda cilvēku līdz pieprasījumam.",
    includes: ["UTM disciplīna", "multi-touch piesaiste", "kanālu izmaksu skats", "cohort analīze"],
    visual: ["META", "GOOGLE", "ORGĀNIKA", "KLIENTA IERAKSTS"]
  },
  {
    number: "05/06",
    title: "Atgūšana",
    subtitle: "Pazaudētie atgriežas plūsmā",
    text: "Klusums vairs nav beigu punkts. Sistēma atceras neatbildētos, nepabeigtos un neizmantotos kontaktus.",
    includes: ["trigeru sekvences", "e-pasts + SMS", "re-engagement loģika", "atgūšanas statuss"],
    visual: ["NAV ATBILDES", "TRIGERIS", "E-PASTS / SMS", "ATPAKAĻ PLŪSMĀ"]
  },
  {
    number: "06/06",
    title: "Skats",
    subtitle: "Vadības panelis tagad, ne pēc mēneša",
    text: "Vienots panelis komandai un vadībai. Pieprasījumi, avoti, statuss, atgūšana un ieņēmumu signāli redzami vienā vietā.",
    includes: ["live panelis", "nedēļas atskaites", "vadības KPI", "lēmumu skats"],
    visual: ["PIEPRASĪJUMI", "AKTĪVI", "IEŅĒMUMI", "AVOTS"]
  }
] as const;