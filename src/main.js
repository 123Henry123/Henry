(function(){
  "use strict";

  var CONFIG = window.PORTFOLIO_CONFIG;
  if (!CONFIG){
    console.error("src/config.js did not load - make sure it is included before src/main.js in index.html");
    return;
  }

  /* ---------- helpers ---------- */
  function $(s, r){ return (r || document).querySelector(s); }
  function $all(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(v){
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function safeUrl(u){
    u = String(u || "").trim();
    if (!u) return "";
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(u)) return u;
    return "https://" + u;
  }

  var ICONS = {
    github: '<path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z"/>',
    linkedin: '<path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5H5A2.5 2.5 0 005 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.7V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z"/>',
    mail: '<path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1.6 2L12 12.2 19.4 7H4.6z"/>',
    shield: '<path d="M12 2l8 3.5V11c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5.5L12 2zm0 3.2L6 7.8v3.4c0 3.5 2.3 6.6 6 8 3.7-1.4 6-4.5 6-8V7.8l-6-2.6z"/>',
    code: '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>',
    terminal: '<path d="M3 4h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm2 3.2l4 3.8-4 3.8V7.2zm6.6 9.3h5.4v-1.6h-5.4v1.6z"/>',
    cpu: '<path d="M9 2v2H7a3 3 0 00-3 3v2H2v2h2v2H2v2h2v2a3 3 0 003 3h2v2h2v-2h2v2h2v-2h2a3 3 0 003-3v-2h2v-2h-2v-2h2V9h-2V7a3 3 0 00-3-3h-2V2h-2v2h-2V2H9zm0 6h6a1 1 0 011 1v6a1 1 0 01-1 1H9a1 1 0 01-1-1V9a1 1 0 011-1z"/>',
    flag: '<path d="M5 3a2 2 0 00-2 2v16h2v-6h12l-1.6-4L17 7H5V5a.9.9 0 011-1z"/>',
    wrench: '<path d="M21.7 5.3l-2 2-2.4-.6-.6-2.4 2-2a5 5 0 00-6.6 6.1l-8.4 8.4a2 2 0 102.8 2.8l8.4-8.4a5 5 0 006.8-5.9z"/>',
    award: '<path d="M12 2a6 6 0 00-3.2 11.1L8 22l4-2.2L16 22l-.8-8.9A6 6 0 0012 2zm0 2.6a3.4 3.4 0 110 6.8 3.4 3.4 0 010-6.8z"/>',
    external: '<path d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3zM5 5h5v2H7v10h10v-3h2v5H5V5z"/>',
    arrow: '<path d="M13.2 5l-1.4 1.4L16.4 11H3v2h13.4l-4.6 4.6L13.2 19l7-7-7-7z"/>',
    menu: '<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>',
    close: '<path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z"/>',
    sun: '<path d="M12 17a5 5 0 100-10 5 5 0 000 10zm0-13a1 1 0 011 1v1.5a1 1 0 01-2 0V5a1 1 0 011-1zm0 13a1 1 0 011 1V19.5a1 1 0 01-2 0V18a1 1 0 011-1zM4 12a1 1 0 011-1h1.5a1 1 0 010 2H5a1 1 0 01-1-1zm13 0a1 1 0 011-1h1.5a1 1 0 010 2H18a1 1 0 01-1-1zM6.3 6.3a1 1 0 011.4 0l1 1a1 1 0 01-1.4 1.4l-1-1a1 1 0 010-1.4zm9 9a1 1 0 011.4 0l1 1a1 1 0 01-1.4 1.4l-1-1a1 1 0 010-1.4zm1.4-9a1 1 0 010 1.4l-1 1A1 1 0 0116.3 7.3l1-1a1 1 0 011.4 0zm-9 9a1 1 0 010 1.4l-1 1a1 1 0 01-1.4-1.4l1-1a1 1 0 011.4 0z"/>',
    moon: '<path d="M20.7 14.3A8.5 8.5 0 019.7 3.3a8.5 8.5 0 1011 11z"/>',
    copy: '<path d="M8 2h9a2 2 0 012 2v12h-2V4H8V2zM5 6h9a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2zm0 2v12h9V8H5z"/>'
  };
  function icon(name, cls){
    var p = ICONS[name] || ICONS.code;
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + p + '</svg>';
  }

  /* ---------- nav & static chrome ---------- */
  var SECTIONS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Path" },
    { id: "achievements", label: "Proof" },
    { id: "contact", label: "Contact" }
  ];

  function buildChrome(){
    var id = CONFIG.identity;
    $("#brandMark").textContent = id.initials;
    $("#brandName").firstChild.nodeValue = id.name;
    $("#brandRole").textContent = id.role;
    $("#footName").textContent = id.name;
    $("#footYear").textContent = "© " + new Date().getFullYear();

    var navHtml = SECTIONS.map(function(s){ return '<a href="#' + s.id + '">' + esc(s.label) + "</a>"; }).join("");
    $("#navLinks").innerHTML = navHtml;
    $("#mobileNav").innerHTML = SECTIONS.map(function(s){
      return '<a href="#' + s.id + '" data-mn>' + esc(s.label) + '<span class="mono" style="color:var(--muted-2)">→</span></a>';
    }).join("");
    $("#footLinks").innerHTML = SECTIONS.map(function(s){ return '<a href="#' + s.id + '">' + esc(s.label) + "</a>"; }).join("");

    $("#themeBtn").innerHTML = themeIcon();
  }
  function themeIcon(){
    var light = document.documentElement.getAttribute("data-theme") === "light";
    return icon(light ? "moon" : "sun");
  }

  /* ---------- hero ---------- */
  function buildHero(){
    var h = CONFIG.hero;
    $("#heroKicker").textContent = h.kicker;
    $("#heroTitle").innerHTML = esc(h.greeting) + ' <span class="grad">' + esc(CONFIG.identity.name) + "</span>.";

    var acts = '<a class="btn btn-primary" href="#projects">' + icon("code", "ic") + "See my work</a>";
    acts += '<a class="btn btn-ghost" href="#contact">' + icon("mail", "ic") + "Get in touch</a>";
    if (safeUrl(CONFIG.identity.resumeUrl)) {
      acts += '<a class="btn btn-ghost" href="' + esc(safeUrl(CONFIG.identity.resumeUrl)) + '" target="_blank" rel="noopener">Download résumé</a>';
    }
    $("#heroActions").innerHTML = acts;
    $("#heroStatus").textContent = CONFIG.identity.status;
    $("#heroLead").textContent = h.lead;

    $("#tickerTrack").innerHTML = function(){
      var set = CONFIG.ticker.map(function(t){ return "<span>" + esc(t) + "</span>"; }).join("");
      return set + set;
    }();
  }

  function typeRoles(){
    var el = $("#heroRoles");
    var roles = CONFIG.hero.roles || [];
    if (!roles.length){ el.innerHTML = ""; return; }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var idx = 0, ch = 0, deleting = false;
    function render(){
      el.innerHTML = '<span class="pfx">I\'m&nbsp;</span><span id="typed"></span><span class="caret"></span>';
      $("#typed").textContent = roles[idx].slice(0, ch);
    }
    render();
    if (reduce) { ch = roles[0].length; render(); return; }
    function tick(){
      var word = roles[idx];
      if (!deleting){
        ch++;
        render();
        if (ch >= word.length){ deleting = true; return setTimeout(tick, 1500); }
        return setTimeout(tick, 62);
      }
      ch--;
      render();
      if (ch <= 0){ deleting = false; idx = (idx + 1) % roles.length; return setTimeout(tick, 260); }
      setTimeout(tick, 30);
    }
    setTimeout(tick, 700);
  }

  function buildTerminal(){
    var t = CONFIG.hero.terminal;
    $("#termTitle").textContent = t.title;
    var body = $("#termBody");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var out = "";
    function flush(count){
      body.innerHTML = out + (count < t.lines.length ? '<div class="ln"><span class="u">$</span> <span class="caret"></span></div>' : '<div class="ln"><span class="u">$</span> <span class="caret"></span></div>');
    }
    if (reduce){
      body.innerHTML = t.lines.map(function(l){
        return l.out !== undefined ? '<div class="ln ' + (l.cls || "") + '">' + esc(l.out) + "</div>"
          : '<div class="ln"><span class="u">$</span> <span class="k">' + esc(l.c) + "</span></div>";
      }).join("") + '<div class="ln"><span class="u">$</span> <span class="caret"></span></div>';
      return;
    }
    var i = 0;
    function step(){
      if (i >= t.lines.length){ flush(i); return; }
      var l = t.lines[i];
      out += l.out !== undefined
        ? '<div class="ln ' + (l.cls || "") + '">' + esc(l.out) + "</div>"
        : '<div class="ln"><span class="u">$</span> <span class="k">' + esc(l.c) + "</span></div>";
      i++;
      flush(i);
      setTimeout(step, l.out !== undefined ? 260 : 460);
    }
    setTimeout(step, 500);
  }

  /* ---------- about ---------- */
  function buildAbout(){
    var a = CONFIG.about;
    $("#aboutKicker").textContent = a.kicker;
    $("#aboutHeading").textContent = a.heading;
    $("#aboutCopy").innerHTML = a.paragraphs.map(function(p){ return "<p>" + p + "</p>"; }).join("") +
      '<div class="sig">$ whoami → ' + esc(CONFIG.identity.name) + " · " + esc(CONFIG.identity.role) + "</div>";
    $("#aboutFacts").innerHTML = a.facts.map(function(f){
      return "<div><span>" + esc(f.k) + "</span><b>" + esc(f.v) + "</b></div>";
    }).join("");
    $("#aboutChips").innerHTML = a.chips.map(function(c){ return '<span class="chip">' + esc(c) + "</span>"; }).join("");
  }

  /* ---------- stats strip (reused in about via facts? kept separate for hero) ---------- */
  function buildStats(){
    // stats are rendered as a thin row under the hero actions area if present
    var host = $("#statsRow");
    if (!host) return;
    host.innerHTML = CONFIG.stats.map(function(s){
      return '<div><b>' + esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>";
    }).join("");
  }

  /* ---------- skills ---------- */
  function buildSkills(){
    var s = CONFIG.skills;
    $("#skillsKicker").textContent = s.kicker;
    $("#skillsHeading").textContent = s.heading;
    $("#skillsIntro").textContent = s.intro;
    $("#skillGrid").innerHTML = s.groups.map(function(g){
      var rows = g.items.map(function(it){
        return '<div class="skill" data-level="' + Number(it.level) + '">' +
          '<div class="top"><span>' + esc(it.name) + '</span><span class="lvl">' + Number(it.level) + '%</span></div>' +
          '<div class="bar"><i></i></div></div>';
      }).join("");
      return '<article class="card skill-card rv"><h3>' + icon(g.icon) + esc(g.group) + "</h3>" +
        '<div class="hint">' + g.items.length + " areas</div>" + rows + "</article>";
    }).join("");
  }
  function animateBars(scope){
    $all("[data-level]", scope).forEach(function(el){
      var i = el.querySelector(".bar i");
      if (i) i.style.width = Math.max(0, Math.min(100, Number(el.getAttribute("data-level")) || 0)) + "%";
    });
  }

  /* ---------- projects ---------- */
  var activeTag = "All";
  function buildProjects(){
    var p = CONFIG.projects;
    $("#projKicker").textContent = p.kicker;
    $("#projHeading").textContent = p.heading;
    $("#projIntro").textContent = p.intro;

    var tags = ["All"];
    p.items.forEach(function(it){
      (it.tags || []).forEach(function(t){ if (tags.indexOf(t) === -1) tags.push(t); });
    });
    $("#projFilters").innerHTML = tags.map(function(t){
      return '<button class="chip' + (t === "All" ? " on" : "") + '" type="button" data-tag="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");

    renderProjects();
  }
  function renderProjects(){
    var host = $("#projGrid");
    var list = CONFIG.projects.items.filter(function(it){
      return activeTag === "All" || (it.tags || []).indexOf(activeTag) !== -1;
    });
    if (!list.length){
      host.innerHTML = '<p class="form-note" style="padding:18px 0">No projects tagged “' + esc(activeTag) + '” yet.</p>';
      return;
    }
    host.innerHTML = list.map(function(it){
      var links = "";
      if (safeUrl(it.repo)) links += '<a href="' + esc(safeUrl(it.repo)) + '" target="_blank" rel="noopener" aria-label="Source">' + icon("github") + "</a>";
      if (safeUrl(it.demo)) links += '<a href="' + esc(safeUrl(it.demo)) + '" target="_blank" rel="noopener" aria-label="Live">' + icon("external") + "</a>";
      return '<article class="card proj rv" data-proj="' + esc(it.id) + '" tabindex="0" role="button" aria-label="Open project: ' + esc(it.title) + '">' +
        '<div class="proj-top"><span class="proj-ico">' + icon(it.icon || "code") + '</span><span class="proj-year">' + esc(it.year) + "</span></div>" +
        "<h3>" + esc(it.title) + "</h3>" +
        '<p class="blurb">' + esc(it.blurb) + "</p>" +
        '<div class="tech">' + (it.tech || []).map(function(t){ return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" +
        '<div class="proj-foot"><span class="more">Read more ' + icon("arrow") + '</span><span class="links">' + links + "</span></div>" +
        "</article>";
    }).join("");
    revealIn(host);
  }

  /* ---------- timeline ---------- */
  function buildTimeline(){
    var t = CONFIG.timeline;
    $("#expKicker").textContent = t.kicker;
    $("#expHeading").textContent = t.heading;
    $("#timeline").innerHTML = t.items.map(function(it){
      return '<div class="tl rv" data-kind="' + esc(it.kind || "education") + '">' +
        '<div class="when">' + esc(it.when) + "</div>" +
        "<h3>" + esc(it.title) + "</h3>" +
        '<div class="org">' + esc(it.org) + "</div>" +
        "<p>" + esc(it.desc) + "</p></div>";
    }).join("");
  }

  /* ---------- achievements ---------- */
  function buildAchievements(){
    var a = CONFIG.achievements;
    $("#achKicker").textContent = a.kicker;
    $("#achHeading").textContent = a.heading;
    $("#certList").innerHTML = a.certifications.map(function(c){
      var prog = /progress/i.test(c.status || "");
      return '<div class="cert"><span class="ic">' + icon(prog ? "award" : "shield") + "</span>" +
        "<div><b>" + esc(c.name) + '</b><span>' + esc(c.issuer) + " · " + esc(c.year) + "</span></div>" +
        '<span class="st' + (prog ? " progress" : "") + '">' + esc(c.status) + "</span></div>";
    }).join("");
    $("#ctfList").innerHTML = a.ctf.map(function(c){
      return '<div class="ctf-row"><b>' + esc(c.name) + "</b><span>" + esc(c.detail) + "</span></div>";
    }).join("");
  }

  /* ---------- contact ---------- */
  function buildContact(){
    var c = CONFIG.contact;
    $("#contactKicker").textContent = c.kicker;
    $("#contactHeading").textContent = c.heading;
    $("#contactBlurb").textContent = c.blurb;
    $("#mailAddr").textContent = CONFIG.identity.email;
    $("#socialList").innerHTML = c.socials.map(function(s){
      return '<a class="social" href="' + esc(safeUrl(s.url)) + '" target="_blank" rel="noopener">' + icon(s.icon) + esc(s.label) + "</a>";
    }).join("");
  }

  /* ---------- modal ---------- */
  var lastFocus = null;
  function openProject(id){
    var it = CONFIG.projects.items.filter(function(p){ return p.id === id; })[0];
    if (!it) return;
    lastFocus = document.activeElement;
    $("#modalTitle").textContent = it.title;
    $("#modalMeta").textContent = [it.year, (it.tech || []).join(" · ")].filter(Boolean).join("  —  ");
    var html = "<p>" + esc(it.body || it.blurb) + "</p>";
    if ((it.highlights || []).length){
      html += "<h4>What I did / learned</h4><ul>" + it.highlights.map(function(h){ return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>";
    }
    if ((it.tags || []).length){
      html += "<h4>Tags</h4><div class=\"chips\" style=\"margin-top:0\">" + it.tags.map(function(t){ return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>";
    }
    var acts = "";
    if (safeUrl(it.repo)) acts += '<a class="btn btn-primary" href="' + esc(safeUrl(it.repo)) + '" target="_blank" rel="noopener">' + icon("github", "ic") + "Source code</a>";
    if (safeUrl(it.demo)) acts += '<a class="btn btn-ghost" href="' + esc(safeUrl(it.demo)) + '" target="_blank" rel="noopener">' + icon("external", "ic") + "Live demo</a>";
    if (acts) html += '<div class="modal-actions">' + acts + "</div>";
    $("#modalBody").innerHTML = html;
    $("#modal").classList.add("on");
    $("#scrim").classList.add("on");
    document.body.classList.add("no-scroll");
    $("#modalClose").focus();
  }
  function closeModal(){
    $("#modal").classList.remove("on");
    $("#scrim").classList.remove("on");
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg){
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove("on"); }, 2600);
  }

  /* ---------- theme ---------- */
  function currentTheme(){ return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function setTheme(mode, persist){
    document.documentElement.setAttribute("data-theme", mode);
    try { if (persist) localStorage.setItem("portfolio:theme", mode); } catch(e){}
    $("#themeBtn").innerHTML = themeIcon();
    $("#themeBtn").setAttribute("aria-label", "Switch to " + (mode === "light" ? "dark" : "light") + " theme");
    netRgb = readNetRgb();
  }
  function readNetRgb(){
    var v = getComputedStyle(document.documentElement).getPropertyValue("--net-rgb").trim();
    return v || "46,230,197";
  }
  function initTheme(){
    var saved = null;
    try { saved = localStorage.getItem("portfolio:theme"); } catch(e){}
    if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) saved = "light";
    setTheme(saved === "light" ? "light" : "dark", false);
  }

  /* ---------- hero canvas: node network ---------- */
  var netRgb = "46,230,197";
  function initNet(){
    var cv = $("#netCanvas");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], raf = null, visible = true;

    function build(){
      var n = Math.max(16, Math.min(42, Math.round(W * H / 26000)));
      pts = [];
      for (var i = 0; i < n; i++){
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
          r: Math.random() * 1.5 + .9
        });
      }
    }
    function resize(){
      var r = cv.parentElement.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw();
    }
    function draw(){
      ctx.clearRect(0, 0, W, H);
      var link = 132, i, j, a, b, dx, dy, d;
      for (i = 0; i < pts.length; i++){
        for (j = i + 1; j < pts.length; j++){
          a = pts[i]; b = pts[j];
          dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < link){
            ctx.strokeStyle = "rgba(" + netRgb + "," + (0.16 * (1 - d / link)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (i = 0; i < pts.length; i++){
        a = pts[i];
        ctx.fillStyle = "rgba(" + netRgb + ",.55)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
    }
    function step(){
      for (var i = 0; i < pts.length; i++){
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x <= 0 || p.x >= W) p.vx *= -1;
        if (p.y <= 0 || p.y >= H) p.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function start(){ if (!reduce && visible && raf === null){ raf = requestAnimationFrame(step); } }
    function stop(){ if (raf !== null){ cancelAnimationFrame(raf); raf = null; } }

    resize();
    var rt;
    window.addEventListener("resize", function(){ clearTimeout(rt); rt = setTimeout(resize, 160); });
    document.addEventListener("visibilitychange", function(){ if (document.hidden) stop(); else start(); });
    if ("IntersectionObserver" in window){
      new IntersectionObserver(function(en){ visible = en[0].isIntersecting; if (visible) start(); else stop(); }, { threshold: 0 }).observe(cv.parentElement);
    }
    start();
  }

  /* ---------- reveal ---------- */
  var io = null;
  function revealIn(scope){
    var els = $all(".rv", scope || document).filter(function(e){ return !e.classList.contains("in"); });
    if (!("IntersectionObserver" in window)){ els.forEach(function(e){ e.classList.add("in"); }); return; }
    if (!io){
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting){
            en.target.classList.add("in");
            if (en.target.id === "skillGrid" || en.target.querySelector && en.target.querySelector(".skill-card")) animateBars(en.target);
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    }
    els.forEach(function(e){ io.observe(e); });
    setTimeout(function(){ els.forEach(function(e){ e.classList.add("in"); }); }, 2800);
  }
  function skillObserver(){
    var sg = $("#skillGrid");
    if (!sg) return;
    if (!("IntersectionObserver" in window)){ animateBars(sg); return; }
    var so = new IntersectionObserver(function(en){
      if (en[0].isIntersecting){ animateBars(sg); so.disconnect(); }
    }, { threshold: 0.15 });
    so.observe(sg);
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function(e){
    var t = e.target;

    var tg = t.closest("[data-tag]");
    if (tg){
      activeTag = tg.getAttribute("data-tag");
      $all("#projFilters .chip").forEach(function(c){ c.classList.toggle("on", c === tg); });
      renderProjects();
      return;
    }
    var card = t.closest("[data-proj]");
    if (card && !t.closest("a")){ openProject(card.getAttribute("data-proj")); return; }

    if (t.closest("#themeBtn")){ setTheme(currentTheme() === "light" ? "dark" : "light", true); return; }

    if (t.closest("#burger")){
      var on = !$("#mobileNav").classList.contains("on");
      $("#mobileNav").classList.toggle("on", on);
      $("#burger").innerHTML = icon(on ? "close" : "menu");
      $("#burger").setAttribute("aria-expanded", on ? "true" : "false");
      return;
    }
    if (t.closest("[data-mn]") || t.closest(".mobile-nav a")){
      $("#mobileNav").classList.remove("on");
      $("#burger").innerHTML = icon("menu");
      $("#burger").setAttribute("aria-expanded", "false");
      return;
    }
    if (t.closest("#modalClose") || t.closest("#scrim")){ closeModal(); return; }

    if (t.closest("#copyMail")){
      var addr = CONFIG.identity.email;
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(addr).then(function(){ toast("Email copied — " + addr); }, function(){ toast(addr); });
      } else { toast(addr); }
      return;
    }
  });

  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && $("#modal").classList.contains("on")) closeModal();
    var c = e.target.closest && e.target.closest("[data-proj]");
    if (c && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); openProject(c.getAttribute("data-proj")); }
  });

  $("#msgForm").addEventListener("submit", function(e){
    e.preventDefault();
    var n = $("#fromName").value.trim(), r = $("#fromEmail").value.trim(), m = $("#fromMsg").value.trim();
    if (!n || !r || !m){ toast("Please fill in every field"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)){ toast("That email doesn't look right"); return; }
    var subject = "Portfolio enquiry from " + n;
    var body = m + "\n\n—\n" + n + "\n" + r;
    window.location.href = "mailto:" + encodeURIComponent(CONFIG.identity.email) +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    toast("Opening your mail app…");
  });

  window.addEventListener("scroll", function(){
    var y = window.pageYOffset || document.documentElement.scrollTop;
    $("#siteHead").classList.toggle("stuck", y > 10);
  }, { passive: true });

  /* ---------- boot ---------- */
  function boot(){
    initTheme();
    netRgb = readNetRgb();
    $("#burger").innerHTML = icon("menu");
    $("#modalClose").innerHTML = icon("close");
    buildChrome();
    buildHero();
    buildStats();
    buildAbout();
    buildSkills();
    buildProjects();
    buildTimeline();
    buildAchievements();
    buildContact();
    typeRoles();
    buildTerminal();
    initNet();
    skillObserver();
    revealIn(document);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();