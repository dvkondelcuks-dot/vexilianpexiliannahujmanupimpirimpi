export const founders = [
  {
    id: "davids",
    name: "Dāvids",
    role: "Technical & Structure",
    operatorCode: "OPERATOR 01 / STRUCTURE",
    text: [
      "Dāvids atbild par tehnisko arhitektūru, sistēmas loģiku, datu plūsmu un ieviešanas struktūru.",
      "Viņa uzdevums ir panākt, lai risinājums nav tikai vizuāli pareizs, bet tehniski noturīgs: vietne, formas, CRM, datu savienojumi, atribūcija un vadības panelis strādā kā viena sistēma."
    ],
    focus: ["tehniskā arhitektūra", "datu struktūra", "CRM loģika", "integrācijas", "sistēmas stabilitāte"],
    question: "kur šis datiņš dzīvos, kas to redzēs, un kas notiks, ja cilvēks pazudīs?",
    route: ["SITE", "CRM", "DATA", "DASHBOARD"],
    tags: ["STRUCTURE", "INTEGRATIONS", "SYSTEM LOGIC"],
    visualMode: "architecture",
    layers: ["Forma", "CRM", "Atribūcija", "Skats"]
  },
  {
    id: "miks",
    name: "Miks",
    role: "Analysis & Marketing",
    operatorCode: "OPERATOR 02 / ANALYSIS",
    text: [
      "Miks atbild par komerciālo analīzi, mārketinga virzienu un to, lai sistēma kalpo reālam biznesa mērķim.",
      "Viņa darbs ir saprast, kur uzņēmums zaudē uzmanību, uzticību, pieprasījumus un darījumus. Ne pēc sajūtas, bet pēc plūsmas, signāliem un klienta ceļa."
    ],
    focus: ["audits", "klienta ceļš", "piedāvājuma skaidrība", "mārketinga loģika", "pozicionējums"],
    question: "kur cilvēks gribēja nopirkt, bet sistēma viņam nepalīdzēja?",
    route: ["TRAFFIC", "MESSAGE", "DECISION", "LOST / WON"],
    tags: ["ANALYSIS", "MARKETING", "POSITIONING"],
    visualMode: "analysis",
    layers: ["Plūsma", "Atribūcija", "Skats"]
  },
  {
    id: "edvards",
    name: "Edvards",
    role: "Growth & Communications",
    operatorCode: "OPERATOR 03 / GROWTH",
    text: [
      "Edvards atbild par izaugsmes virzienu, komunikāciju un to, lai sistēma nepaliek tikai iekšējs rīks, bet palīdz uzņēmumam skaidrāk runāt ar tirgu.",
      "Viņa darbs ir savienot komunikāciju, pārdošanas signālus un klienta uzticību vienā saprotamā valodā."
    ],
    focus: ["growth virziens", "komunikācija", "klientu attiecības", "tirgus signāli", "pārdošanas ritms"],
    question: "vai cilvēks saprot, kāpēc viņam jārīkojas tagad?",
    route: ["SIGNAL", "MESSAGE", "TRUST", "ACTION"],
    tags: ["GROWTH", "COMMUNICATION", "RELATIONSHIP"],
    visualMode: "communication",
    layers: ["Saturs", "Atgūšana", "CRM"]
  }
] as const;