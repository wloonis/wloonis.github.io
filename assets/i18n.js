/* ───────────────────────── Animal Counter — i18n ─────────────────────────
   FR is the source-of-truth (in index.html). This script captures the original
   FR innerHTML on first run, and swaps to EN when the browser language is not
   French (or when the user picks EN via the switcher). Preference persists in
   localStorage ("ac-lang"). Anti-flash: <html> gets class "i18n-loading" in
   <head> (hides body via CSS); this script removes it once translations apply.
   ────────────────────────────────────────────────────────────────────────── */

const I18N_EN = {
  "banner.text": `⭐ <strong>Open source</strong> — all the code is on GitHub:`,

  "hero.tagline": `Real-time counting of <strong>animals</strong> with a fixed camera — YOLO/TensorRT detections, OC-SORT tracking with anti-ID-switch guards, and a net bidirectional counter. Built for <strong>any animal</strong> the trained model can detect: <em>pigs, sheep, cows, poultry…</em> (+1 right→left, −1 left→right).`,
  "hero.cta.code": `View the code (counting)`,
  "hero.cta.app": `Android app + companion`,

  "nav.overview": `Overview`,
  "nav.demo": `Demo`,
  "nav.boitier": `The enclosure`,
  "nav.features": `Features`,
  "nav.links": `Links`,

  "overview.h2": `Overview`,
  "overview.p": `A <strong>fixed</strong> camera points at a counting line. Each animal that crosses it is tracked by <strong>OC-SORT</strong> (with custom anti-ID-switch guards) and the system maintains a <strong>net bidirectional counter</strong>. Built for <strong>any species</strong> the trained YOLO model can detect (pigs, sheep, cows, poultry…). A video clip is recorded automatically on each detection and stops after ~2 min with no detection. Designed for daily use (powered on in the morning, counter at 0, switched off in the evening) or continuous 24/7 (the counter accumulates, resettable on demand).`,

  "pipe.cam": `<strong>Fixed camera</strong><br><small>30 fps</small>`,
  "pipe.ocsort": `<strong>OC-SORT</strong><br><small>+ anti-ID-switch guards</small>`,
  "pipe.line": `<strong>Counting line</strong><br><small>crossing</small>`,
  "pipe.counter": `<strong>Net counter</strong><br><small>+1 / −1</small>`,

  "demo.h2": `Demo in action`,
  "demo.p": `The counter running for real — the fixed camera, the (yellow) counting line, the OC-SORT tracks, and the net counter evolving on each crossing. Two species, two deployments:`,
  "demo.pig.fig": `<span class="demo-emoji">🐷</span> <strong>Pigs</strong> — 2-class model (human / pig), USB camera, vertical line. Counting right→left (+1) / left→right (−1).`,
  "demo.sheep.fig": `<span class="demo-emoji">🐑</span> <strong>Sheep</strong> — source video: <a href="https://zenodo.org/records/10400302" target="_blank" rel="noopener">Zenodo (record 10400302)</a>. <em>Detection test</em> produced by our pipeline (multi-class model sheep / goat / dog, TensorRT FP16 at imgsz=1280) on this 720p drone feed.`,
  "demo.note": `<em>Videos recorded automatically by the system on each detection.</em>`,
  "demo.video.fallback": `Your browser does not support video.`,
  "demo.pig.aria": `Pig counting`,
  "demo.sheep.aria": `Sheep counting`,

  "hw.h2": `The enclosure`,
  "hw.p": `The system core: an <strong>NVIDIA Jetson Orin Nano 8&nbsp;GB</strong> in a compact enclosure, USB-C powered, with a fixed USB camera aimed at the counting zone. The SoC is passively cooled (fanless); an <strong>additional extraction fan</strong> vents the air from the enclosure. A <strong>DS3231 RTC module</strong> keeps the time across power cycles. The system boots itself on power (K3s brings up the counting pod) — a simple on/off is all it takes. An attached <strong>touchscreen</strong> lets you drive the counting directly from the enclosure; control is also available from the <a href="#companion">Android app</a>.`,
  "hw.closed.fig": `Closed enclosure`,
  "hw.open.fig": `Open enclosure — Jetson Orin Nano + USB camera`,

  "arch.p": `The project is split across <strong>two repositories</strong> that communicate <strong>only via shared files</strong> in two hostPaths (<code>/conf</code> for config/control, <code>/files</code> for media/history) — no HTTP/RPC between the counting pod and the companion. The IPC contract is documented in <a href="https://github.com/wloonis/animal-counter/blob/main/docs/IPC_CONTRACT.md" target="_blank" rel="noopener"><code>docs/IPC_CONTRACT.md</code></a>, kept <strong>byte-identical</strong> in both repos.`,
  "arch.c1.h3": `Countingapp <small>(this repo)</small>`,
  "arch.c1.p": `The counting core: OC-SORT tracking, counting pipeline, TensorRT, the K3s <code>countingapp</code> pod (DaemonSet), and the Jetson system/K3s/RTC setup. Writes <code>counting-history.jsonl</code> + videos to <code>/files</code>, reads config from <code>/conf</code>.`,
  "arch.c1.ul": `<li>Pipeline: detection → mask zones → tracking → crossing → counter</li><li>Hot-reload <code>runtime-settings.json</code> at idle (BL-86)</li><li>Periodic JPEG snapshot to <code>/files/snapshot.jpg</code></li>`,
  "arch.c2.h3": `Companion + Android app <small>(sister repo)</small>`,
  "arch.c2.p": `The <em>Jetson companion</em> (Python systemd service on port 8090) bridges HTTP between the Android app and the shared files. The mobile app shows counters, history, and drives settings (classes, line, masks) remotely.`,
  "arch.c2.ul": `<li><code>GET/PUT /api/settings</code> → reads/writes <code>/conf</code></li><li><code>GET /api/snapshot</code> → serves the camera preview</li><li>Visual editing of mask zones (draw/move/resize)</li>`,

  "features.h2": `Features`,
  "feat1.h3": `Configurable classes (BL-78)`,
  "feat1.p": `Counts a configurable subset of the model's classes (multi-species). <strong>global = sum of sub-counters</strong>. Driven from the app, without restarting the pod.`,
  "feat2.h3": `Counting line (BL-83)`,
  "feat2.p": `Orientation <code>vertical</code> | <code>horizontal</code> + signed offset (percentage of frame), centered by default. Directional <em>UP/DOWN</em> for a horizontal line.`,
  "feat3.h3": `Mask zones (BL-87)`,
  "feat3.p": `Normalized exclusion rectangles: detections whose centroid falls in a zone are dropped before tracking (no track → no count). Generic, all species.`,
  "feat4.h3": `Idle hot-reload (BL-86)`,
  "feat4.p": `Settings in <code>/conf/runtime-settings.json</code> are reloaded <strong>in-process</strong> at the next idle window — no pod restart. Applied outside recording.`,
  "feat5.h3": `Camera snapshot (BL-88)`,
  "feat5.p": `The countingapp writes a raw JPEG (<code>/files/snapshot.jpg</code>) about every 5 s so the companion/app can show a live preview and let you draw masks on it.`,
  "feat6.h3": `Anti-ID-switch guards`,
  "feat6.p": `OC-SORT + custom guards (<code>COUNTING_GUARD_MAX_AGE</code>, re-association window, hysteresis H=0). Global counter + <code>counting-history.jsonl</code> history.`,

  "comp.h2": `The companion &amp; the Android app`,
  "comp.lede": `The operator experience happens from an Android phone. The <strong>Jetson companion</strong> (Python systemd service, port 8090) is the HTTP bridge between the app and the shared files <code>/conf</code> + <code>/files</code>. The app auto-discovers the Jetson (hotspot or home Wi-Fi) via an <code>/api/identify</code> probe — no SSID sniffing, no location permission.`,
  "comp.app.h3": `The Android app`,
  "comp.app.ul": `<li><strong>Dashboard</strong> — aggregated counters + sessions</li><li><strong>Live counter</strong> — net bidirectional counter in real time</li><li><strong>History</strong> — list of videos, download/open</li><li><strong>Boots</strong> — boot history</li><li><strong>Settings</strong> — Jetson IP, manual time sync, <strong>mask-zone editor</strong></li><li>Material 3, dark theme, FR/EN (follows locale)</li>`,
  "comp.editor.h3": `Mask-zone editor`,
  "comp.editor.p": `In Settings → <em>Mask zones</em>: capture the camera preview, then edit visually directly on the image:`,
  "comp.editor.ul": `<li><strong>Draw</strong> a zone (drag over an empty area)</li><li><strong>Move</strong> a zone (drag inside it)</li><li><strong>Resize</strong> by edges/corners (drag an edge or corner)</li><li><strong>Name</strong> each zone (editable field + label on the image)</li><li>Save via <code>PUT /api/settings</code> (strict validation)</li><li>Overlay toggle <em>Show zones on screen</em></li>`,
  "comp.editor.note": `Network resilience: the cached Jetson IP is invalidated on Wi-Fi loss + retry on network error — the home ↔ hotspot switchover is robust (PR #22).`,
  "comp.shots.title": `The app in pictures`,
  "shot.dashboard": `Dashboard`,
  "shot.counter": `Live counter`,
  "shot.session": `Session`,
  "shot.history": `Video history`,
  "shot.detail": `Clip detail`,
  "shot.settings1": `Settings (1)`,
  "shot.settings2": `Settings (2)`,
  "shot.settings3": `Settings — mask zones`,

  "val.p": `The counting logic is validated on reference videos via <code>scripts/validate_on_jetson.sh</code> → <code>validation-report.json</code>. The counted animal number is compared against the expected value derived from the filename. <strong>Standard</strong> mode (single reference video) by default; <strong><code>--full</code></strong> (priority-video manifest) only when the branch touches the counting decision code. See <a href="https://github.com/wloonis/animal-counter/blob/main/docs/06_validation.md" target="_blank" rel="noopener"><code>docs/06_validation.md</code></a>.`,
  "ph.val.label": `🎬 Validation video — coming`,
  "val.caption": `The video will show a reference run: detections, tracks, counting line, and the net counter reaching the expected value.`,


  "links.h2": `Links &amp; documentation`,
  "link1.span": `Counting core (OC-SORT, K3s, Jetson) — main repo`,
  "link2.span": `Android app + Jetson companion`,
  "link3.span": `Boot params + hot-reloaded runtime settings`,
  "link4.strong": `IPC contract`,
  "link4.span": `Shared files /conf + /files (byte-identical)`,
  "link5.strong": `Android app`,
  "link5.span": `Build, install, mask-zone editor`,
  "link6.span": `Reference videos + validation-report`,

  "footer.p": `Animal Counter · animal counting on NVIDIA Jetson Orin Nano / K3s · <a href="https://github.com/wloonis" target="_blank" rel="noopener">github.com/wloonis</a>`,
  "footer.small": `Static GitHub Pages site. Media coming to <code>assets/</code>.`
};

const I18N_TITLE = {
  fr: `Animal Counter — Comptage d'animaux sur NVIDIA Jetson Orin Nano`,
  en: `Animal Counter — Animal counting on NVIDIA Jetson Orin Nano`
};
const I18N_META = {
  fr: `Animal Counter : comptage temps réel d'animaux (cochons, moutons, vaches, volailles…) par caméra fixe sur NVIDIA Jetson Orin Nano (YOLO/TensorRT + OC-SORT), déployé en K3s. Application Android + companion Jetson. Open source.`,
  en: `Animal Counter: real-time animal counting (pigs, sheep, cows, poultry…) with a fixed camera on NVIDIA Jetson Orin Nano (YOLO/TensorRT + OC-SORT), deployed on K3s. Android app + Jetson companion. Open source.`
};

const fr = {};          // captured original FR innerHTML / aria-label
const frAria = {};

function detectLang() {
  const stored = localStorage.getItem("ac-lang");
  if (stored === "fr" || stored === "en") return stored;
  const n = (navigator.language || "en").toLowerCase();
  return n.startsWith("fr") ? "fr" : "en";   // FR only for French browsers, EN by default
}

function applyLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  document.title = I18N_TITLE[lang];
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", I18N_META[lang]);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (fr[key] === undefined) fr[key] = el.innerHTML;   // capture once
    if (lang === "en" && I18N_EN[key] !== undefined) {
      el.innerHTML = I18N_EN[key];
    } else {
      el.innerHTML = fr[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    if (frAria[key] === undefined) frAria[key] = el.getAttribute("aria-label");
    el.setAttribute("aria-label", (lang === "en" && I18N_EN[key] !== undefined) ? I18N_EN[key] : frAria[key]);
  });

  document.querySelectorAll(".lang-switch button").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === lang);
    b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
  });

  localStorage.setItem("ac-lang", lang);
  html.classList.remove("i18n-loading");   // reveal (anti-flash)
}

(function init() {
  const lang = detectLang();
  applyLang(lang);
  document.querySelectorAll(".lang-switch button").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });
})();