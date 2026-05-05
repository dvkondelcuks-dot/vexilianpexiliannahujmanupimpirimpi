export const cases = [
  {
    id: "purgaili",
    name: "Purgaiļi",
    headline: "No piezīmju blociņa un zvaniem līdz automatizētai rezervāciju un komercsistēmai.",
    body:
      "Pirms Vexilian rezervācijas tika rakstītas piezīmju blociņā un kārtotas pa telefonu — katrs pieprasījums atkarīgs no tā, kurš atcerējās zvanīt atpakaļ. Mēs uzbūvējām vienotu rezervāciju un komercsistēmu: viesis aizpilda formu, dati nonāk CRM, kalendārs atjaunojas reālā laikā, īpašnieks redz visus aktīvos pieprasījumus vienā skatā un nekas vairs nepazūd starp piezīmēm un zvaniem.",
    layers: ["Plūsma", "CRM", "Atribūcija", "Atgūšana", "Skats"],
    industry: "Lauku viesmīlība",
    location: "Latvija",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Lauku viesu nama eksterjers ar siltu vakara gaismu",
    route: ["META / ORGANIKA", "ĪPAŠUMA LAPA", "REZERVĀCIJAS FORMA", "KALENDĀRS", "ĪPAŠNIEKA PANELIS"],
    modules: ["5 VALODAS", "ISTABA / MĀJA", "AVOTU UZSKAITE", "REZERVĀCIJAS STATUSS", "NĀKAMĀ IERAŠANĀS"],
    panel: ["AKTĪVI PIEPRASĪJUMI", "APSTIPRINĀTI", "KANĀLS", "SEZONAS SIGNĀLS"],
    warmth: "hospitality"
  },
  {
    id: "la-perla",
    name: "La Perla",
    headline: "30 gadus veca atsevišķa datubāze, pārbūvēta par jaunu digitalizētu komercsistēmu.",
    body:
      "La Perla 30 gadus glabāja klientu datus vecā, atsevišķā datubāzē, kas nebija savienota ne ar vietni, ne ar saturu, ne ar veikalu. Mēs to pilnībā pārbūvējām par jaunu, digitalizētu komercsistēmu — vienota klientu kartoteka, satura plūsma kas savienota ar pieprasījumiem, kampaņu signāli un skaidrs ceļš no Instagram līdz veikala apmeklējumam un pārdošanai.",
    layers: ["Saturs", "CRM", "Atribūcija", "Atgūšana", "Skats"],
    industry: "Rotaslietas, retail",
    location: "TC SAGA · Rīga",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Rotaslietu makro kadrs ar gaismu uz metāla un akmens detaļām",
    route: ["SATURA IDEJA", "PUBLIKĀCIJA", "ZIŅOJUMS", "KONTAKTS", "VEIKALA APMEKLĒJUMS", "PĀRDOŠANAS SIGNĀLS"],
    modules: ["SATURA DARBGRĀMATA", "IG PIEPRASĪJUMS", "KAMPAŅAS AVOTS", "APMEKLĒJUMA NODOMS", "PRODUKTA INTERESE"],
    panel: ["PUBLIKĀCIJA AKTĪVA", "ZIŅOJUMS SAŅEMTS", "KONTAKTS IZVEIDOTS", "ATKĀRTOTS KONTAKTS", "APMEKLĒJUMA SIGNĀLS"],
    warmth: "retail"
  }
] as const;