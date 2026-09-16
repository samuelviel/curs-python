/* =========================================================
   curs-app.js · calendari, pròxima sessió, Python al navegador
   i qüestionaris per a la web MkDocs (tema Material)
   ========================================================= */
(function () {
  "use strict";
  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

  /* ---------- utilitats de dates en valencià ---------- */
  const MESOS = ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"];
  const MESOS_CURTS = ["gen", "febr", "març", "abr", "maig", "juny", "jul", "ag", "set", "oct", "nov", "des"];
  const DIES = ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"];
  const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const deMes = (m) => (/^[aeiou]/i.test(MESOS[m]) ? "d'" : "de ") + MESOS[m];
  const fmtLong = (d) => `${DIES[d.getDay()]} ${d.getDate()} ${deMes(d.getMonth())}`;
  const fmtShort = (d) => `${d.getDate()} ${MESOS_CURTS[d.getMonth()]}`;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function isoWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  function baseUrl() {
    try {
      return JSON.parse(document.getElementById("__config").textContent).base.replace(/\/$/, "");
    } catch (e) { return "."; }
  }

  /* ---------- generació del calendari ---------- */
  let PLA = null;
  function plan() {
    if (PLA) return PLA;
    const C = window.CURS, cal = C.calendari;
    const start = parseDate(cal.primeraSessio), end = parseDate(cal.fiCurs);
    const offRanges = cal.noLectius.map(([a, b, motiu]) => [parseDate(a), parseDate(b), motiu]);
    const offReason = (d) => { const r = offRanges.find(([a, b]) => d >= a && d <= b); return r ? r[2] : null; };
    const firstTorn = Object.keys(C.torns).find((k) => C.torns[k].weekday === start.getDay());
    const otherTorn = Object.keys(C.torns).find((k) => k !== firstTorn);

    const monday = new Date(start);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const slots = [];
    for (let w = new Date(monday), k = 0; w <= end; w.setDate(w.getDate() + 7), k++) {
      const torn = cal.paritat === "alterna"
        ? (k % 2 === 0 ? firstTorn : otherTorn)
        : (isoWeek(w) % 2 === 0 ? "dj" : "dc");
      const d = new Date(w);
      d.setDate(d.getDate() + C.torns[torn].weekday - 1);
      if (d < start || d > end) continue;
      slots.push({ date: d, torn, off: offReason(d) });
    }

    const rows = [];
    let i = 0;
    for (const s of slots) {
      if (s.off) { rows.push(s); continue; }
      if (i >= C.sessions.length) break;
      const ses = C.sessions[i];
      const [h, m] = C.torns[s.torn].fi.split(":").map(Number);
      const endTime = new Date(s.date); endTime.setHours(h, m, 0, 0);
      rows.push(Object.assign({}, s, { n: i + 1, ses, end: endTime }));
      i++;
    }
    if (i < C.sessions.length) console.warn(`Calendari: falten ${C.sessions.length - i} dies de classe per a les sessions previstes.`);
    PLA = { rows, sessions: rows.filter((r) => r.ses) };
    return PLA;
  }

  function unitLink(key, text) {
    const u = window.CURS.unitats[key];
    return u ? `<a href="${baseUrl()}/${u.url}">${esc(text || u.titol)}</a>` : esc(text || "");
  }

  /* ---------- bitllet de la pròxima sessió ---------- */
  function buildTicket() {
    const el = document.getElementById("pròxima-sessio") || document.getElementById("proxima-sessio");
    if (!el) return;
    const C = window.CURS;
    const now = new Date();
    const list = plan().sessions;
    const idx = list.findIndex((s) => s.end > now);
    if (idx < 0) {
      el.innerHTML = `<div class="ticket-top"><div class="ticket-label">Tutories col·lectives</div><div class="ticket-date">Curs acabat</div></div>`;
      return;
    }
    const s = list[idx], after = list[idx + 1], t = C.torns[s.torn];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = Math.round((s.date - today) / 86400000);
    const when = days === 0 ? "Hui hi ha classe" : days === 1 ? "Pròxima classe: demà" : `Pròxima classe: d'ací ${days} dies`;
    el.innerHTML = `
      <div class="ticket-top">
        <div class="ticket-label">${when}</div>
        <div class="ticket-date">${cap(fmtLong(s.date))}</div>
        <div class="ticket-time">${t.inici}–${t.fi} · ${t.nom} · ${esc(C.aula)}</div>
      </div>
      <div class="ticket-cut" aria-hidden="true"></div>
      <div class="ticket-bottom">
        <div class="ticket-topic">S${s.n} · ${esc(s.ses.tema)}</div>
        ${s.ses.nota ? `<p>${esc(s.ses.nota)}</p>` : ""}
        <p>${s.ses.u ? unitLink(s.ses.u, "Obri els apunts") + " · " : ""}<a href="${baseUrl()}/calendari/">Calendari complet</a></p>
        ${after ? `<p class="ticket-next">Després: ${fmtLong(after.date)} (${C.torns[after.torn].nom}) · ${esc(after.ses.tema)}</p>` : ""}
      </div>`;
  }

  /* ---------- calendari complet ---------- */
  function buildCalendar() {
    const el = document.getElementById("calendari-sessions");
    if (!el) return;
    const C = window.CURS;
    const now = new Date();
    const { rows, sessions } = plan();
    const next = sessions.find((s) => s.end > now);
    const groups = C.calendari.trimestres.map(([nom, a, b]) => ({
      nom, rows: rows.filter((r) => r.date >= parseDate(a) && r.date <= parseDate(b))
    }));
    el.innerHTML = groups.filter((g) => g.rows.length).map((g) => `
      <h2 id="${g.nom.replace(/\W+/g, "-").toLowerCase()}">${g.nom}</h2>
      <ol class="cal-list">
        ${g.rows.map((r) => {
          const t = C.torns[r.torn];
          if (!r.ses) {
            return `<li class="cal-off"><span class="cal-n"></span><span class="cal-date">${cap(fmtLong(r.date))}</span><span class="cal-topic">No lectiu · ${esc(r.off)}</span></li>`;
          }
          const cls = [r.ses.examen ? "cal-exam" : "", next === r ? "cal-now" : "", r.end < now ? "cal-past" : ""].join(" ").trim();
          return `<li class="${cls}">
            <span class="cal-n">S${r.n}</span>
            <span class="cal-date">${cap(fmtLong(r.date))}<small>${t.inici} · ${t.nom}</small></span>
            <span class="cal-topic">${r.ses.u ? unitLink(r.ses.u, r.ses.tema) : esc(r.ses.tema)}
              ${r.ses.u ? `<small>${C.unitats[r.ses.u].n}</small>` : ""}
              ${r.ses.nota ? `<small class="cal-note">${esc(r.ses.nota)}</small>` : ""}</span>
          </li>`;
        }).join("")}
      </ol>`).join("");
  }

  /* ---------- sessions d'una unitat ---------- */
  function buildUnitSessions() {
    const C = window.CURS;
    document.querySelectorAll("[data-unit-chip]").forEach((el) => {
      const ss = plan().sessions.filter((s) => s.ses.u === el.dataset.unitChip);
      if (!ss.length) { el.remove(); return; }
      const a = ss[0], b = ss[ss.length - 1];
      el.textContent = ss.length === 1
        ? `S${a.n} · ${fmtShort(a.date)}`
        : `S${a.n}–S${b.n} · ${fmtShort(a.date)} – ${fmtShort(b.date)}`;
    });
    document.querySelectorAll("[data-unit-sessions]").forEach((el) => {
      const ss = plan().sessions.filter((s) => s.ses.u === el.dataset.unitSessions);
      if (!ss.length) { el.remove(); return; }
      el.innerHTML = `<table><thead><tr><th>Sessió</th><th>Data</th><th>Què fem</th></tr></thead><tbody>
        ${ss.map((s) => `<tr><td>S${s.n}</td><td>${cap(fmtLong(s.date))}, ${C.torns[s.torn].inici}</td><td>${esc(s.ses.tema)}</td></tr>`).join("")}
      </tbody></table>`;
    });
  }

  function fillConfig() {
    const C = window.CURS;
    document.querySelectorAll("[data-c]").forEach((el) => {
      const k = el.dataset.c;
      if (k === "correu") { el.textContent = C.correu; if (el.tagName === "A") el.href = "mailto:" + C.correu; }
      else if (k === "aules" && el.tagName === "A") el.href = C.aules;
      else if (C[k] != null) el.textContent = C[k];
    });
  }

  /* ---------- Python al navegador (Pyodide) ---------- */
  let pyPromise = null;
  function loadPy(status) {
    if (pyPromise) return pyPromise;
    status.textContent = "Carregant Python (només la primera vegada)…";
    pyPromise = new Promise((resolve, reject) => {
      const go = () => window.loadPyodide({ indexURL: PYODIDE_URL }).then(async (py) => {
        await py.runPythonAsync(`
import builtins, js
def _input(prompt=""):
    r = js.prompt(str(prompt))
    r = "" if r is None else str(r)
    print(str(prompt) + r)
    return r
builtins.input = _input
`);
        resolve(py);
      }).catch(reject);
      if (window.loadPyodide) return go();
      const sc = document.createElement("script");
      sc.src = PYODIDE_URL + "pyodide.js";
      sc.onload = go;
      sc.onerror = () => reject(new Error("No s'ha pogut descarregar Python. Comprova la connexió."));
      document.head.append(sc);
    });
    pyPromise.catch(() => { pyPromise = null; });
    return pyPromise;
  }

  function buildRunners() {
    document.querySelectorAll("pre.pyrun").forEach((pre) => {
      const original = pre.textContent.replace(/\s+$/, "");
      const box = document.createElement("div");
      box.className = "runner";
      const lines = original.split("\n").length;
      box.innerHTML = `
        <textarea class="runner-code" spellcheck="false" autocapitalize="off" autocomplete="off"
          aria-label="Codi Python editable" rows="${Math.min(Math.max(lines, 3), 24)}"></textarea>
        <div class="runner-bar">
          <button class="md-button md-button--primary runner-run" type="button">▶ Executa</button>
          <button class="md-button runner-reset" type="button">Restaura</button>
          <span class="runner-status" aria-live="polite">Pots editar el codi i executar-lo ací mateix.</span>
        </div>
        <pre class="runner-out" aria-live="polite"></pre>`;
      const ta = box.querySelector("textarea");
      ta.value = original;
      pre.replaceWith(box);

      const out = box.querySelector(".runner-out");
      const status = box.querySelector(".runner-status");
      const runBtn = box.querySelector(".runner-run");

      ta.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          ta.setRangeText("    ", ta.selectionStart, ta.selectionEnd, "end");
        }
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
      });

      const write = (txt, err) => {
        if (err) { const sp = document.createElement("span"); sp.className = "err"; sp.textContent = txt; out.append(sp); }
        else out.append(document.createTextNode(txt));
      };

      async function run() {
        runBtn.disabled = true;
        out.textContent = "";
        try {
          const py = await loadPy(status);
          status.textContent = "Executant…";
          py.setStdout({ batched: (s) => write(s + "\n") });
          py.setStderr({ batched: (s) => write(s + "\n", true) });
          try {
            await py.runPythonAsync(ta.value);
            if (!out.textContent) out.textContent = "(el programa no ha mostrat res per pantalla)";
            status.textContent = "Fet. Ctrl+Enter també executa.";
          } catch (err) {
            const lines = String(err.message || err).trim().split("\n");
            const where = [...lines].reverse().find((l) => /File "<exec>", line \d+/.test(l));
            write(lines[lines.length - 1] + (where ? `\n(${where.trim().replace('File "<exec>", ', "")})` : ""), true);
            status.textContent = "Error: llig el missatge, és una pista.";
          }
        } catch (loadErr) {
          out.textContent = String(loadErr.message || loadErr);
          status.textContent = "Sense Python al navegador. Usa Thonny.";
        } finally {
          runBtn.disabled = false;
        }
      }
      runBtn.addEventListener("click", run);
      box.querySelector(".runner-reset").addEventListener("click", () => {
        ta.value = original; out.textContent = ""; status.textContent = "Codi restaurat.";
      });
    });
  }

  /* ---------- qüestionaris ---------- */
  function buildQuizzes() {
    document.querySelectorAll("div.quiz").forEach((box) => {
      if (box.dataset.ready) return;
      let qs;
      try { qs = JSON.parse(box.textContent); } catch (e) { box.textContent = "Error al qüestionari: " + e.message; return; }
      box.dataset.ready = "1";
      let i = 0, score = 0, answered = false;
      box.innerHTML = `<div class="quiz-count"></div><p class="quiz-q"></p><div class="quiz-opts"></div>
        <div class="quiz-fb" aria-live="polite"></div>
        <div class="quiz-nav"><button type="button" class="md-button quiz-hint">Vull una pista</button>
        <button type="button" class="md-button md-button--primary quiz-next" disabled>Següent pregunta</button></div>`;
      const $ = (s) => box.querySelector(s);
      const nextBtn = $(".quiz-next"), hintBtn = $(".quiz-hint");
      function render() {
        answered = false;
        const q = qs[i];
        $(".quiz-count").textContent = `Pregunta ${i + 1} de ${qs.length} · encerts: ${score}`;
        $(".quiz-q").textContent = q.p;
        $(".quiz-fb").textContent = "";
        nextBtn.disabled = true;
        nextBtn.textContent = "Següent pregunta";
        hintBtn.hidden = !q.pista;
        const opts = $(".quiz-opts");
        opts.innerHTML = "";
        q.o.forEach((txt, k) => {
          const b = document.createElement("button");
          b.type = "button"; b.textContent = txt;
          b.addEventListener("click", () => {
            if (answered) return;
            answered = true;
            const ok = k === q.c;
            if (ok) score++;
            [...opts.children].forEach((x, j) => { x.disabled = true; if (j === q.c) x.classList.add("right"); });
            if (!ok) b.classList.add("wrong");
            $(".quiz-fb").textContent = (ok ? "Correcte. " : "No és correcte. ") + (q.e || "");
            $(".quiz-count").textContent = `Pregunta ${i + 1} de ${qs.length} · encerts: ${score}`;
            nextBtn.disabled = false;
            if (i === qs.length - 1) nextBtn.textContent = "Veure resultat";
          });
          opts.append(b);
        });
      }
      hintBtn.addEventListener("click", () => { $(".quiz-fb").textContent = "Pista: " + qs[i].pista; });
      nextBtn.addEventListener("click", () => {
        if (i < qs.length - 1) { i++; render(); return; }
        if (i === qs.length) { i = 0; score = 0; render(); return; }
        const pct = Math.round((score / qs.length) * 100);
        $(".quiz-count").textContent = "Resultat";
        $(".quiz-q").textContent = `Has encertat ${score} de ${qs.length} (${pct}%).`;
        $(".quiz-opts").innerHTML = "";
        $(".quiz-fb").textContent = pct >= 80 ? "Molt bé: estàs preparat per a la tasca d'Aules." : "Repassa els apartats on has fallat i torna a provar.";
        hintBtn.hidden = true;
        nextBtn.textContent = "Torna a començar";
        i = qs.length;
      });
      render();
    });
  }

  function init() {
    if (!window.CURS) return;
    fillConfig();
    buildTicket();
    buildCalendar();
    buildUnitSessions();
    buildRunners();
    buildQuizzes();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
