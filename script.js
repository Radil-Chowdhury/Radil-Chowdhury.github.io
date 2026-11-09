// ---- Skills data (levels only where stated on the CV) ----
// level: 1 = Familiar, 2 = Intermediate, 3 = Proficient. Omit level for no meter.
const SKILLS = [
  {
    group: "Programming & databases",
    items: [
      { name: "Python", level: 2, note: "Pandas, NumPy" },
      { name: "R" },
      { name: "SQL", note: "Query optimization, data extraction" }
    ]
  },
  {
    group: "Statistical & analytics software",
    items: [
      { name: "Microsoft Excel", level: 3, note: "Advanced formulas, pivot tables" },
      { name: "Stata", level: 2 },
      { name: "SPSS", level: 2 }
    ]
  },
  {
    group: "Data visualization",
    items: [
      { name: "Power BI", note: "Interactive dashboards, DAX" },
      { name: "Tableau" },
      { name: "Matplotlib" },
      { name: "Seaborn" }
    ]
  }
];
const LEVELS = { 1: "Familiar", 2: "Intermediate", 3: "Proficient" };

function renderSkills() {
  const grid = document.getElementById("skillGrid");
  let toolCount = 0;
  SKILLS.forEach(g => {
    const panel = document.createElement("div");
    panel.className = "panel";
    panel.innerHTML = `<h3 class="panel-title">${g.group}</h3>`;
    g.items.forEach(s => {
      toolCount++;
      const el = document.createElement("div");
      el.className = "skill";
      let html = `<div class="skill-row"><span>${s.name}</span>${s.level ? `<span class="lvl">${LEVELS[s.level]}</span>` : ""}</div>`;
      if (s.level) {
        html += `<div class="meter" aria-hidden="true">` +
          [1, 2, 3].map(n => `<i class="${n <= s.level ? "on" : ""}"></i>`).join("") + `</div>`;
      }
      if (s.note) html += `<div class="skill-note">${s.note}</div>`;
      el.innerHTML = html;
      panel.appendChild(el);
    });
    grid.appendChild(panel);
  });
  document.getElementById("kpiTools").textContent = toolCount;
}

// ---- Projects with tool filters ----
function renderProjects() {
  const projects = window.PROJECTS || [];
  const grid = document.getElementById("projectGrid");
  const filters = document.getElementById("filters");
  document.getElementById("kpiProjects").textContent = projects.length;

  const tools = [...new Set(projects.flatMap(p => p.tools || []))].sort();
  let active = "All";

  function draw() {
    const shown = projects.filter(p => active === "All" || (p.tools || []).includes(active));
    grid.innerHTML = "";
    if (!shown.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1">New projects coming soon.</div>`;
      return;
    }
    shown.forEach(p => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3></h3>
        <div class="meta"></div>
        <p></p>
        <div class="chips" style="margin-bottom:12px"></div>`;
      card.querySelector("h3").textContent = p.title;
      card.querySelector(".meta").textContent = [p.type, p.year].filter(Boolean).join(" · ");
      card.querySelector("p").textContent = p.summary;
      const chips = card.querySelector(".chips");
      (p.tools || []).forEach(t => {
        const c = document.createElement("span");
        c.className = "chip"; c.textContent = t; chips.appendChild(c);
      });
      if (p.link) {
        const a = document.createElement("a");
        a.className = "link"; a.href = p.link; a.target = "_blank"; a.rel = "noopener";
        a.textContent = (p.linkLabel || "View project") + " →";
        card.appendChild(a);
      }
      grid.appendChild(card);
    });
  }

  ["All", ...tools].forEach(t => {
    const b = document.createElement("button");
    b.className = "chip" + (t === active ? " active" : "");
    b.textContent = t;
    b.addEventListener("click", () => {
      active = t;
      filters.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      draw();
    });
    filters.appendChild(b);
  });
  draw();
}

// ---- Theme toggle (remembers choice, otherwise follows system) ----
function initTheme() {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  root.dataset.theme = saved || (prefersLight ? "light" : "dark");
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

initTheme();
renderSkills();
renderProjects();
document.getElementById("year").textContent = new Date().getFullYear();
