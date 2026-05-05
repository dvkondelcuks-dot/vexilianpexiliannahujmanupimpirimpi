export const cases = [
  {
    id: "purgaili",
    name: "Purgaiļi",
    headline: "No piezīmju blociņa un zvaniem līdz automatizētai rezervāciju un komercsistēmai.",
    body:
      "Pirms Vexillian rezervācijas tika rakstītas piezīmju blociņā un kārtotas pa telefonu — katrs pieprasījums bija atkarīgs no tā, kurš atcerējās zvanīt atpakaļ. Avoti, valodas un sezonas pieprasījumi netika fiksēti, un divreiz rezervēti termiņi bija ikdiena. Mēs no nulles uzbūvējām vienotu rezervāciju un komercsistēmu: jauna piecu valodu īpašuma lapa, automatizēta rezervāciju forma, klientu kartoteka iekšējā CRM, atribūcijas slānis kas marķē avotu (Booking, Meta, organika, ieteikums), kalendāra sinhronizācija reālā laikā un atgūšanas trigeri kas atsāk sarunu ar nepabeigtajiem pieprasījumiem. Īpašnieks vienā vadības panelī redz aktīvos pieprasījumus, apstiprinātos datumus, kanāla ieguldījumu un nākamo ierašanos — bez piezīmju blociņa, bez aizmirstiem zvaniem, bez dubultām rezervācijām.",
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
      "La Perla 30 gadus glabāja klientu datus vecā, atsevišķā datubāzē, kas nebija savienota ne ar vietni, ne ar saturu, ne ar veikalu. Saziņa ar klientiem notika manuāli — Instagram ziņas, telefona zvani, papīra kartītes — un neviens nezināja, kurš saturs vai kampaņa atved cilvēku uz veikalu TC SAGA. Mēs to pilnībā pārbūvējām par jaunu, digitalizētu komercsistēmu: migrēta un sakopta klientu kartoteka jaunā CRM, satura darbgrāmata kas saista publikāciju ar avotu un produktu, atribūcijas slānis no Instagram pieprasījuma līdz veikala apmeklējumam, automatizēti atgūšanas trigeri silto kontaktu atkārtotai uzrunai un kampaņu signāli kas saliek pārdošanas plūsmu pa nedēļām. Īpašnieks tagad redz, kura publikācija atvedusi kontaktu, kurš kontakts atnācis uz veikalu un kurš pirkums no kāda avota — viens skats, viena patiesība, viena sistēma.",
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