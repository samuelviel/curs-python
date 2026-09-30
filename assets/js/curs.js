/* =========================================================
   DADES DEL CURS · Edita NOMÉS aquest fitxer per a canviar
   dates, horaris, correu o l'ordre de les sessions.
   El calendari es genera sol a partir d'aquestes regles.
   ========================================================= */

window.CURS = {
  professor: "Samuel Viel Malonda",
  correu: "s.vielmalonda@edu.gva.es",
  aules: "https://aules.edu.gva.es/semipresencial",
  aula: "Aula 213",
  curs: "2026-2027",

  // Una classe cada setmana, alternant torn.
  torns: {
    dc: { dia: "Dimecres", nom: "torn de matí", inici: "14:20", fi: "15:15", weekday: 3 },
    dj: { dia: "Dijous", nom: "torn de vesprada", inici: "15:15", fi: "16:10", weekday: 4 }
  },

  calendari: {
    primeraSessio: "2026-09-17",   // dijous: la primera classe
    fiCurs: "2027-06-18",
    // Com es decideix el torn de cada setmana:
    //  "iso"     → setmanes ISO parelles = dijous, senars = dimecres (numeració oficial)
    //  "alterna" → s'alterna cada setmana natural des de la primera, sense mirar el número
    // Només canvia el resultat a partir de gener (2026 té 53 setmanes ISO).
    paritat: "iso",
    // Dies no lectius (Comunitat Valenciana + Gandia 2026-2027)
    noLectius: [
      ["2026-10-05", "2026-10-05", "Festiu local"],
      ["2026-10-09", "2026-10-09", "9 d'Octubre"],
      ["2026-10-12", "2026-10-12", "Festa nacional"],
      ["2026-12-07", "2026-12-08", "Pont de la Constitució"],
      ["2026-12-23", "2027-01-06", "Vacances de Nadal"],
      ["2027-03-16", "2027-03-19", "Falles"],
      ["2027-03-25", "2027-04-05", "Vacances de Pasqua"],
      ["2027-05-01", "2027-05-01", "1 de maig"]
    ],
    // Límits de trimestre (només per a agrupar el calendari)
    trimestres: [
      ["1r trimestre", "2026-09-01", "2026-12-31"],
      ["2n trimestre", "2027-01-01", "2027-04-05"],
      ["3r trimestre", "2027-04-06", "2027-06-30"]
    ]
  },

  // Exàmens presencials. Cada avaluació té dues convocatòries, una per torn.
  // El dia d'examen no hi ha classe ordinària: la sessió passa al següent dia lectiu.
  examens: [
    { av: "1a avaluació", conte: "De la S1 a la S10: entorn, UD0, UD1 i UD2.", proves: [
      { data: "2026-11-19", torn: "matí", inici: "14:00", fi: "15:50" },
      { data: "2026-11-26", torn: "vesprada", inici: "16:00", fi: "17:50" }
    ] },
    { av: "2a avaluació", conte: "UD3 i UD4 (cadenes, llistes i diccionaris), amb tot l'anterior com a base.", proves: [
      { data: "2027-02-04", torn: "matí", inici: "14:00", fi: "15:50" },
      { data: "2027-02-11", torn: "vesprada", inici: "16:00", fi: "17:50" }
    ] },
    { av: "3a avaluació", conte: "UD5 i UD6. En ser acumulatiu, cal traure almenys un 4.", proves: [
      { data: "2027-05-06", torn: "matí", inici: "14:00", fi: "15:50" },
      { data: "2027-05-13", torn: "vesprada", inici: "16:00", fi: "17:50" }
    ] }
  ],

  unitats: {
    entorn:   { n: "00",  titol: "Prepara l'entorn",               url: "unitats/entorn/" },
    ud0:      { n: "UD0", titol: "Pensament computacional",        url: "unitats/ud0/" },
    ud1:      { n: "UD1", titol: "Primers passos amb Python",      url: "unitats/ud1/" },
    ud2:      { n: "UD2", titol: "Decisions i bucles",             url: "unitats/ud2/" },
    ud3:      { n: "UD3", titol: "Funcions i mòduls",              url: "unitats/ud3/" },
    ud4:      { n: "UD4", titol: "Cadenes, llistes i diccionaris", url: "unitats/ud4/" },
    ud5:      { n: "UD5", titol: "Fitxers i scripts de sistema",   url: "unitats/ud5/" },
    ud6:      { n: "UD6", titol: "Objectes i classes",             url: "unitats/ud6/" },
    projecte: { n: "PF",  titol: "Projecte final",                 url: "unitats/projecte/" }
  },

  // Les sessions, en ordre. Cada una ocupa el següent dia lectiu del calendari.
  sessions: [
    // --- 1r trimestre, fins a l'examen de la 1a avaluació ---
    { tema: "Presentació del curs i entorn de treball", u: "entorn", nota: "Porta portàtil si en tens. Eixirem amb el primer programa funcionant." },
    { tema: "Algorismes i pensament computacional", u: "ud0", nota: "Sessió de llapis i paper." },
    { tema: "Pseudocodi, diagrames de flux i traça", u: "ud0" },
    { tema: "print, variables i tipus de dades", u: "ud1" },
    { tema: "input, conversions i f-strings", u: "ud1" },
    { tema: "Condicions: if, elif, else", u: "ud2" },
    { tema: "Bucle while", u: "ud2" },
    { tema: "Bucle for i range", u: "ud2" },
    { tema: "Control d'errors (try) i depuració", u: "ud2" },
    { tema: "Repàs i simulacre de l'examen de la 1a avaluació", u: null, repas: true },
    // --- fins a l'examen de la 2a avaluació ---
    { tema: "Funcions: def i paràmetres", u: "ud3" },
    { tema: "return i àmbit de les variables", u: "ud3" },
    { tema: "Mòduls i import", u: "ud3" },
    { tema: "Cadenes a fons", u: "ud4" },
    { tema: "Llistes", u: "ud4" },
    { tema: "Diccionaris", u: "ud4" },
    { tema: "Repàs i simulacre de l'examen de la 2a avaluació", u: null, repas: true },
    // --- fins a l'examen de la 3a avaluació ---
    { tema: "Llistes de diccionaris: un inventari", u: "ud4" },
    { tema: "Llegir i escriure fitxers", u: "ud5" },
    { tema: "Fitxers CSV", u: "ud5" },
    { tema: "Rutes i carpetes amb pathlib", u: "ud5" },
    { tema: "Scripts de sistema: arguments i ordres", u: "ud5" },
    { tema: "Classes i objectes", u: "ud6" },
    { tema: "Mètodes, __str__ i herència", u: "ud6" },
    { tema: "Repàs i simulacre de l'examen de la 3a avaluació", u: null, repas: true },
    // --- després de l'examen de la 3a avaluació ---
    { tema: "Projecte final: plantejament", u: "projecte", nota: "Porta triada l'opció de projecte." },
    { tema: "Projecte final: taller", u: "projecte" },
    { tema: "Projecte final: lliurament i dubtes", u: "projecte" },
    { tema: "Dubtes de la convocatòria ordinària", u: null, repas: true },
    { tema: "Dubtes de la convocatòria extraordinària", u: null, repas: true },
    { tema: "Tancament del curs", u: null, nota: "El curs acaba el 18 de juny de 2027." }
  ]
};
