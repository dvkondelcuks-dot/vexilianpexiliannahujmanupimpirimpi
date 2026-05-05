export const diagnosisEvents = [
  {
    number: "01/05",
    layer: "Plūsma",
    severity: "REDZAMĪBAS ROBEŽA",
    title: "Reklāma sasniedz cilvēku. Cilvēks atver lapu. Kas notiek tālāk — to neviens neredz.",
    status: "PĒC-KLIKĶA NEZINĀMAIS",
    lossType: "Redzamības trūkums",
    visual: "postClickUnknown"
  },
  {
    number: "02/05",
    layer: "CRM",
    severity: "NAV ĪPAŠNIEKA",
    title: "Pirmais kontakts. Atbilde. Klusums. Liels pieprasījums kļūst par tukšu šūnu izklājlapā.",
    status: "PIEPRASĪJUMS BEZ ĪPAŠNIEKA",
    lossType: "Nepārvaldīts kontakts",
    visual: "leadSilence"
  },
  {
    number: "03/05",
    layer: "Atribūcija",
    severity: "AVOTS NEREDZAMS",
    title: "Septiņas reklāmas reizē strādā. Kura no tām atveda klientu? Atbildes nav.",
    status: "AVOTS NEZINĀMS",
    lossType: "Mērīšanas kļūda",
    visual: "attributionGap"
  },
  {
    number: "04/05",
    layer: "Atgūšana",
    severity: "NAV CIKLA",
    title: "Klients neatbild — un viss. Pazaudēts paliek pazaudēts, kaut neviens neko nedarīja, lai tā nebūtu.",
    status: "ATGŪŠANA TRŪKST",
    lossType: "Nav atgriešanas mehānisma",
    visual: "noRecovery"
  },
  {
    number: "05/05",
    layer: "Skats",
    severity: "IESKATA ROBEŽA",
    title: "Lapā cilvēks meklē. Kur viņš aiziet, kur apstājas, kur nospiež atpakaļ — to nezina pat tas, kurš lapu uztaisīja.",
    status: "ĪPAŠNIEKA AKLĀ ZONA",
    lossType: "Nav vadības redzamības",
    visual: "pageBlindness"
  }
] as const;