/* =========================================================
   DADES DEL CURS · Edita NOMÉS aquest fitxer per a canviar
   dates, horaris, correu o l'ordre de les sessions.
   El calendari es genera sol a partir d'aquestes regles.
   ========================================================= */

window.CURS = {
  professor: "Samuel Viel Malonda",
  // ⚠️ Posa el teu correu abans de publicar
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
  // examen: true → sessió de repàs (les dates d'examen es confirmen a Aules)
  sessions: [
    { tema: "Presentació del curs i entorn de treball", u: "entorn", nota: "Porta portàtil si en tens. Eixirem amb el primer programa funcionant." },
    { tema: "Algorismes i pensament computacional", u: "ud0", nota: "Sessió de llapis i paper." },
    { tema: "Pseudocodi, diagrames de flux i traça", u: "ud0" },
    { tema: "print, variables i tipus de dades", u: "ud1" },
    { tema: "input i conversions de tipus", u: "ud1" },
    { tema: "Operadors i f-strings", u: "ud1" },
    { tema: "Condicions: if, elif, else", u: "ud2" },
    { tema: "Bucle while", u: "ud2" },
    { tema: "Bucle for i range", u: "ud2" },
    { tema: "Control d'errors (try) i depuració", u: "ud2" },
    { tema: "Repàs del 1r trimestre", u: null, examen: true, nota: "Examen presencial de la 1a avaluació: data a Aules." },
    { tema: "Simulacre i dubtes d'examen", u: null, examen: true },
    { tema: "Funcions: def i paràmetres", u: "ud3" },
    { tema: "return i àmbit de les variables", u: "ud3" },
    { tema: "Mòduls i import", u: "ud3" },
    { tema: "Cadenes a fons", u: "ud4" },
    { tema: "Llistes", u: "ud4" },
    { tema: "Recórrer i construir llistes", u: "ud4" },
    { tema: "Repàs del 2n trimestre", u: null, examen: true, nota: "Examen presencial de la 2a avaluació: data a Aules." },
    { tema: "Diccionaris", u: "ud4" },
    { tema: "Llistes de diccionaris: un inventari", u: "ud4" },
    { tema: "Llegir i escriure fitxers", u: "ud5" },
    { tema: "Fitxers CSV", u: "ud5" },
    { tema: "Rutes i carpetes amb pathlib", u: "ud5" },
    { tema: "Scripts de sistema: arguments i ordres", u: "ud5" },
    { tema: "Classes i objectes", u: "ud6" },
    { tema: "Mètodes, __str__ i herència", u: "ud6" },
    { tema: "Projecte final: plantejament", u: "projecte" },
    { tema: "Projecte final: taller", u: "projecte" },
    { tema: "Repàs del 3r trimestre", u: null, examen: true, nota: "Examen presencial de la 3a avaluació: data a Aules." },
    { tema: "Projecte final: lliurament i dubtes", u: "projecte" },
    { tema: "Dubtes de la convocatòria ordinària", u: null, examen: true },
    { tema: "Dubtes de la convocatòria extraordinària", u: null, examen: true },
    { tema: "Tancament del curs", u: null }
  ]
};
