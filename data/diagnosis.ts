export const diagnosisEvents = [
  {
    number: "01/05",
    layer: "Plūsma",
    severity: "VISIBILITY GAP",
    title: "Reklāma sasniedz cilvēku. Cilvēks atver lapu. Kas notiek tālāk — to neviens neredz.",
    status: "POST-CLICK UNKNOWN",
    lossType: "Redzamības trūkums",
    visual: "postClickUnknown"
  },
  {
    number: "02/05",
    layer: "CRM",
    severity: "OWNER MISSING",
    title: "Pirmais kontakts. Atbilde. Klusums. Liels lead kļūst par tukšu šūnu izklājlapā.",
    status: "LEAD WITHOUT OWNER",
    lossType: "Nepārvaldīts kontakts",
    visual: "leadSilence"
  },
  {
    number: "03/05",
    layer: "Atribūcija",
    severity: "SOURCE BLIND",
    title: "Septiņas reklāmas reizē strādā. Kura no tām atveda klientu? Atbildes nav.",
    status: "SOURCE UNKNOWN",
    lossType: "Mērīšanas kļūda",
    visual: "attributionGap"
  },
  {
    number: "04/05",
    layer: "Atgūšana",
    severity: "LOOP ABSENT",
    title: "Klients neatbild — un viss. Pazaudēts paliek pazaudēts, kaut neviens neko nedarīja, lai tā būtu.",
    status: "RECOVERY MISSING",
    lossType: "Nav atgriešanas mehānisma",
    visual: "noRecovery"
  },
  {
    number: "05/05",
    layer: "Skats",
    severity: "INSIGHT GAP",
    title: "Lapā cilvēks meklē. Kur viņš aiziet, kur apstājas, kur nospiež atpakaļ — to nezina pat tas, kurš lapu uztaisīja.",
    status: "OWNER BLIND SPOT",
    lossType: "Nav vadības redzamības",
    visual: "pageBlindness"
  }
] as const;