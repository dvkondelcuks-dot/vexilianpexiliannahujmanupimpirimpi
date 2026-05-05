export const collaborationPhases = [
  {
    number: "01",
    title: "Arhitektūra",
    input: "current business flow",
    work: "system blueprint",
    output: "sistēmas karte pirms būvēšanas",
    acceptance: "apstiprināts būvēšanas apjoms",
    text: "Komerciālās plūsmas dizains, datu modelis, CRM struktūra, integrāciju karte un tehniskais risks."
  },
  {
    number: "02",
    title: "Uzstādīšana",
    input: "blueprint",
    work: "connected system",
    output: "strādājoša komerciālā sistēma",
    acceptance: "testēta darbplūsma",
    text: "Vietne, formas, CRM, atribūcijas slānis, atgūšanas trigeri un live panelis tiek savienoti vienā plūsmā."
  },
  {
    number: "03",
    title: "Nodošana + optimizācija",
    input: "working system",
    work: "team-owned system",
    output: "sistēma, ko komanda var lietot un vadība var redzēt",
    acceptance: "pirmais atskaites cikls",
    text: "Komandas apmācība, dokumentācija, pirmais atskaites cikls un turpmākais ikmēneša uzlabojumu ritms."
  }
] as const;

export const commercialStrip = [
  { label: "Sākotnējais grafiks", value: "21–35 dienas" },
  { label: "Cenu diapazons", value: "€8 000 – €24 000" },
  { label: "Apmaksa", value: "50 / 30 / 20" },
  { label: "Pēc nodošanas", value: "ikmēneša optimizācija" }
] as const;