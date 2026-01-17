# UI_TEST_GEMINI_STORY_QA_REPORT.md

# Story QA–Report: Nachtzug 19 (Branch `Ui-test-gemini`)

> **Test-Hinweis:** In dieser Umgebung war `npm ci`/`npm install` nicht zuverlässig ausführbar (Registry–Zugriff). Daher basiert der QA–Durchlauf auf (1) **statischem Graph–Check** (IDs/`next`/Endings/Targets) und (2) **simulierter Traversal–Engine** (Conditions/Effects) plus „Policy–Runs". Keine Commits, keine großen Umbauten.

## 1) Executive Summary (brutal ehrlich)

Die **Nachtzug–19**–Story ist technisch erstaunlich stabil: Manifest definiert 7 Kapitel, 180 Szenen, 4 reguläre Enden (Truth/Escape/Guilt/Love) plus ein temporäres Test–Ende; alle `next`–Referenzen zeigen auf existierende Szenen, keine Orphans, keine Selbst–Loops. Die Zustands–Targets in `effects` sind konsistent (keine „unknown keys" im State–Set). Außerdem gibt es echte Drift–Varianten: bereits in der Startszene sind Varianten ab `min_drift: 3` und `5` vorhanden.

Inhaltlich ist der Auftakt stark: Kapitel 1 erzeugt sofort falsche Leere und Bahnsteig–Unbehagen und koppelt das sauber an die Ticket–Mechanik (Truth/Escape/Guilt). Ab Mitte der Story kippt aber die Stabilität der Atmosphäre: Drift, Kontrolle und „Mind–Bender" werden so häufig getriggert, dass die Wirkung abstumpft. Dazu kommt, dass viele Entscheidungen im Ergebnis **nur Tickets zählen**, aber die Szene danach identisch bleibt. Das fühlt sich dann nicht wie „du entscheidest", sondern wie „du fütterst eine Endings–Scorecard".

Der größte Atmosphären–Killer ist aktuell nicht „zu wenig Mystery", sondern **zu wenig dramaturgische Luft**: Wenn alles gleichzeitig flackert, glitcht, Zeit springt und Figuren unzuverlässig sind, hat nichts davon Gewicht. Die Lösung ist nicht „mehr Text" oder „noch mehr surreal", sondern **gezielte Dosierung** und eine härtere Ton–Regie pro Kapitel.

---

## 2) Coverage & Simulation

### 2.1 Content–Inventar (gesichtet)

- Entry: `src/content/nachtzug19/manifest.ts` (Start: `c1_s01_platform`)
- Kapiteldateien: `src/content/nachtzug19/scenes/c1.ts` … `c7.ts`
- Endings: `truth_ending`, `escape_ending`, `guilt_ending`, `love_ending`

### 2.2 Graph–Check (statisch)

- **Szenen gesamt:** 180
- **Erreichbarkeit (ohne Conditions):** 180/180 erreichbar
- **`next`–Verweise:** alle zeigen auf existierende Szene–IDs
- **Self–loops:** keine
- **Station–End–Szenen:** 7 (eine pro Kapitel)
- **Control–Szenen:** 6 (K2/K3/K5 je 2)

### 2.3 Simulation (Traversal + Policies)

Vier „natürliche" Policy–Runs wurden simuliert (Entscheidungen über Ticket–Gewichtung/Drift/Attention):

- Run 1 „Unauffällig": Ende **truth_ending** (niedrige Aufmerksamkeit, pragmatischer Pfad)
- Run 2 „Risiko": Ende **love_ending** (hohe Drift/Attention)
- Run 3 „Truth–Fokus": Ende **truth_ending**
- Run 4 „Escape/Love/Guilt"–Mix: Ende variabel, random bestätigt alle vier Enden erreichbar

Random–Runs (n=20) bestätigten, dass alle Enden erreichbar sind.

### 2.4 Endings–Liste (mit Kurzbeschreibung)

- **truth_ending:** „Du bist ausgestiegen… Die Wahrheit wartet."
- **escape_ending:** „Du bleibst im Zug. Für immer…"
- **guilt_ending:** „Du steigst aus und trägst die Last…"
- **love_ending:** „Du folgst jemandem… nicht allein."

---

## 3) P0 Gamebreaker (muss sofort)

### P0–1: Ungültiger Tag `setup` in Szene `c1_s01_platform`

In `c1_s01_platform` steht `tags: ['setup']`. In den Types ist `SceneTag` aber (nach aktuellem Stand) **nicht** um `setup` erweitert. Ergebnis je nach TS–Settings:

- **Compile–Fehler** (wenn `SceneTag[]` strikt ist)
- oder: Tag wird ignoriert und Tools/Validatoren laufen aneinander vorbei

**Minimaler Fix:** `setup` entweder (a) in `SceneTag` aufnehmen **oder** (b) aus der Szene entfernen und nur über `chapter/title` arbeiten.

### P0–2: Drift wird zu früh/zu schnell „normal"

Schon im Einstieg existieren Drift–Varianten. Gleichzeitig erhöhen viele Choices `memory_drift` häufig um +1/+2 (Beispiel Kapitel 4 Spiegel–Setpiece: mehrere Choices erhöhen Drift zusätzlich). In Simulationen endet man sehr schnell in hohen Drift–Bereichen.

**Warum Gamebreaker?** Weil das zentrale Stilmittel (Unzuverlässigkeit) dann dauer–an ist. Die Atmosphäre verliert Kontrast.

**Minimaler Fix:** Drift–Inkremente reduzieren/selten machen, oder Schwellen für Varianten anheben (z. B. „erste Variation" erst ab 5 statt 3).

---

## 4) P1 Regel–/Logikfehler

### P1–1: Entscheidungen teilen zu oft denselben Ausgang

Beispiel Startszene: alle drei Choices führen auf `c1_s01a_platform_details`. Das ist am Anfang okay (Onboarding), aber das Muster setzt sich häufig fort.

**Effekt:** Entscheidungen fühlen sich wie „Score–Zähler" an, nicht wie echte Konsequenzen.

**Minimaler Fix:** Wenn mehrere Choices denselben `next` teilen, dann **mindestens**:
- spürbarer Immediate Callback in der Folgeszene (1–2 Sätze angepasst)
- oder Mini–Abzweig (eine Zwischenszene), der danach wieder zusammenführt

### P1–2: Conditions/Items sind nicht zuverlässig „verdient"

Es gibt konditionierte Pfade (z. B. `has_recorder`) im späteren Verlauf. Wenn der Item–Erhalt nicht garantiert ist, entstehen „tote" Choices im UI (sie erscheinen nie oder wirken wie Content–Lücke).

**Minimaler Fix:** pro konditioniertem Target mindestens eine **frühe, eindeutige** Erwerbs–Szene (oder ein Failover–Text: „du hast den Recorder nicht mehr" plus Alternativ–Choice).

### P1–3: Control/Attention eskaliert ohne Gegenregler

`conductor_attention` wird häufig erhöht (Start: „Versuchen zu gehen" erhöht Attention). Später wirkt Kontrolle dadurch fast zwangsläufig aggressiv.

**Minimaler Fix:** pro Kapitel 1–2 „Beruhigungs"–Momente, die Attention senken (oder soft–clamp), damit „Unauffällig" auch wirklich unauffällig bleibt.

---

## 5) P2 Story–Qualität / Sinn (kapitelweise)

> Fokus: Motivation, Konsequenz, Kontinuität, Payoff, Ton.

### Kapitel 1 – Leerer Bahnsteig

**Passt**
- Starker atmosphärischer Einstieg: falsche Leere, kaltes Licht, Uhrzeit, Erinnerungslücke.
- Mechanik–Onboarding sauber: Truth/Escape/Guilt werden früh über Choices gesetzt.

**Knirscht**
- Motivation „warum bin ich hier" ist bewusst vage, aber es fehlt ein *emotionaler Anker* (eine Person/Schuld/Versprechen), der später die Endings trägt.

**Konkreter Fix (minimal)**
- 1–2 Sätze „Fetzen" in `c1_s01_platform` ergänzen (kein Lore–Dump): Name, Geruch, Satzfragment. Nur genug, dass die Figur nicht generisch wirkt.

### Kapitel 2 – Erste Kontrolle

**Passt**
- Boy+Recorder als Mystery–Objekt und Love–Pfad ist ein guter Hook.

**Knirscht**
- Kontroll–Dramaturgie wirkt teilweise sprunghaft (Bewegung/Ort/Timing).

**Konkreter Fix (minimal)**
- In den Szenen direkt vor `*_control_*` jeweils 1–2 klare Ortsmarken („Gang", „Tür", „Abteilnummer"), damit das Kopf–Kino stabil bleibt.

### Kapitel 3 – Wagen 7

**Passt**
- Abteil–7–Teaser funktionieren als Spannungsschraube.

**Knirscht**
- Zu viele Interludes, die dasselbe Motiv wiederholen (Licht/Stille/Vibration), ohne neue Information.

**Konkreter Fix (minimal)**
- 1–2 Interludes streichen oder zu einem „Best–of" zusammenführen.

### Kapitel 4 – Spiegelungen

**Passt**
- Spiegel–Setpiece liefert wirklich gute „Unheimlich–Logik" (Spiegelbild blinzelt nicht etc.).

**Knirscht**
- Drift–Push in einem Setpiece ist doppelt und fühlt sich bestrafend an (mehrere Choices erhöhen Drift).

**Konkreter Fix (minimal)**
- pro Szene maximal **eine** Drift–Erhöhung (oder Drift–Erhöhung nur auf der „riskanteren" Choice).

### Kapitel 5 – Letzte Kontrolle

**Passt**
- „Finale Luft ist schwerer" Ton ist stimmig, funktioniert als Vorahnung.

**Knirscht**
- Item–abhängige Optionen können sehr oft fehlen (Recorder–Strang bricht gefühlt ab).

**Konkreter Fix (minimal)**
- Failover–Choice anbieten: Wenn `has_recorder` nicht, dann „du erinnerst dich an das Band, aber es ist weg" (Truth–Ticket +1) statt Option komplett zu verlieren.

### Kapitel 6 – Ende der Linie

**Passt**
- Finalitätsgefühl prinzipiell da.

**Knirscht**
- Gefahr von „Meta–Monolog": zu viel Erinnerung/Erklärung in ähnlichem Ton, zu wenig Handlung.

**Konkreter Fix (minimal)**
- 1–2 klare, physische Aktionen einbauen (Tür, Fenster, Abteil, Gleis), damit Kapitel 6 nicht nur Kopf–Text ist.

### Kapitel 7 – Entscheidung

**Passt**
- Visuelles Finale (durchsichtige Wände, Zeitschichten) trägt gut.

**Knirscht**
- Love–Ende braucht mehr Vorbereitung (Beziehung muss vorher mehr als „cooles Mysterium" sein).

**Konkreter Fix (minimal)**
- 1–2 kurze Callback–Momente früher setzen, die echte Intimität/Vertrauen zeigen (nicht neue Figuren, nur vorhandene).

---

## 6) Atmosphären–Stabilität: Wie du die Verbesserungen angehst (konkret)

Hier ist der Teil, den die meisten Story–Projekte ignorieren, bis alles nach „random KI–Poesie" riecht.

### 6.1 Definiere eine „Atmosphäre–Bibel" (1 Seite, keine Romane)

**Ziel:** Jeder Absatz muss in dieselbe Welt passen, selbst wenn er driftet.

- **3 Atmosphären–Pfeiler (Pillars)**
  1) *Kaltes Industrie–Unheimlich* (Neon, Beton, Metall, Öl, Kälte)
  2) *Zeit ist falsch* (Uhr, Wiederholung, minimale Inkonsistenzen)
  3) *Sozialer Druck* (Kontrolle, Blicke, Aufmerksamkeit)
- **Sensorik–Palette:** 5–7 wiederkehrende Reize (Geruch Öl/Kaffee, Brummen, flackerndes Licht, klebriger Boden, trockene Luft…)
- **Verbote:** keine beliebigen Metaphern–Sprünge („wie Rauch", „wie Ozean", „wie Sternenstau"), wenn nicht zuvor etabliert.

### 6.2 Drift–Regeln, die *subtil* bleiben

Drift wirkt am besten, wenn er erst „zu spät" bemerkt wird.

- **Regel A:** Pro Szene maximal **1** driftender Fakt (Zeit, Farbe, Zahl, Geräusch) bis Drift 5.
- **Regel B:** Drift–Varianten dürfen **nicht** die Canon–Aussage umwerfen, sondern nur „verschieben".
  - Gut: 23:47 → 23:46, Juni → Juli
  - Schlecht: „Du warst nie hier" vs „Du warst immer hier" in derselben Stufe.
- **Regel C:** Drift–Inkremente sind „Bühnenlicht", nicht Dauerzustand.
  - In einem Kapitel 1–2 Peaks, dazwischen Stabilisierung.

### 6.3 Control/Attention als Rhythmus, nicht als Dauerstrafe

Damit sich Atmosphäre konsistent anfühlt, braucht es Wellen:

- **Welle 1:** Ankündigung (kleine Hinweise) → **Welle 2:** Nähe (Geräusche/Schritte) → **Welle 3:** Konfrontation → **Welle 4:** Nachhall (Stille/Scham/Erleichterung)

Praktisch:
- In jeder Control–Welle mindestens 1 Scene, die Attention *senkt*, wenn man klug spielt.
- Wenn Attention nur steigt, ist die Geschichte dramaturgisch „immer Alarm". Das wird stumpf.

### 6.4 Entscheide, welche Kapitel „Surreal–Peak" sind

Du brauchst Kontrast:

- Kapitel 1–2: **realistisch–unheimlich** (alles könnte noch normal sein)
- Kapitel 3–4: **Surreal–Peak** (Spiegel, Abteil 7, Paradox)
- Kapitel 5: **kalte Eskalation** (Kontrolle wird final, nicht „mehr glitch")
- Kapitel 6–7: **Klarheit + Entscheidung** (weniger Effekte, mehr Konsequenz)

Wenn jedes Kapitel „Peak" ist, ist keins Peak.

### 6.5 Ein schlankes Rewrite–Vorgehen (ohne neue Features)

1) **Mechanik–Pass (1–2h):**
   - Drift–Inkremente reduzieren (nur in Peak–Szenen)
   - Attention bekommt Senk–Momente
   - Offensichtliche „same next"–Choices bekommen Immediate Callback

2) **Kontinuitäts–Pass (1–2h):**
   - Jede Szene beginnt mit Ortsanker (Wagen/Gang/Abteil)
   - Jede Szene endet mit Bewegungsanker (wohin jetzt)

3) **Voice–Pass (1h):**
   - Erzählerstimme: 2–3 Satzlängen–Muster festlegen
   - Figuren (Junge/Comp7/Kontrolleur) je 3 „Sprach–Eigenschaften" definieren

4) **Drift–Pass (1h):**
   - Variantencheck: pro Szene nur minimaler „Shift", keine Random–Poesie

5) **QA–Pass (30–60min):**
   - 4 Runs wie im Testplan: Unauffällig/Risiko/Truth/Escape–Mix
   - Notiere *wo* Atmosphäre kippt (Scene–ID + erster Satz)

---

## 7) Top–15 Fixes (konkret, minimal)

1. `c1_s01_platform`: `tags: ['setup']` entfernen oder `SceneTag` erweitern.
2. Drift–Schwellen: erste Variante nicht ab 3, sondern später (oder Drift–Zuwachs reduzieren).
3. `conductor_attention`: Senk–Mechanik pro Kapitel einbauen (eine Szene reicht).
4. „Same–next"–Choices: Immediate Callback–Satz in der Folgeszene ergänzen.
5. Kapitel 3/5 Interludes zusammenführen oder kürzen (Kontrast schaffen).
6. Kapitel 4 Spiegel–Setpiece: Drift–Zuwachs pro Szene auf max. 1 begrenzen.
7. Recorder–Pfad: Item–Erhalt früher/verlässlicher oder Failover–Choice, wenn Item fehlt.
8. Love–Pfad: 1–2 echte Vertrauens–Callbacks früher setzen (kein neuer Content, nur vorhandene Figuren vertiefen).
9. Guilt–Pfad: Schuld konkretisieren (1 Satz, was genau „Last" ist) damit Ending trägt.
10. Kapitel 6: mehr physische Handlung (Tür/Fenster/Abteil) statt reiner Gedankenloop.
11. Kontrolle: klare Orts–/Zeit–Anker in Pre–Control Szenen (Gang, Schritte, Tür, Nummer).
12. Drift–Varianten: nur 1 Fakt pro Szene ändern bis Drift 5 (Regel).
13. Ton–Bibel erstellen (Pillars + Sensorik + Verbote) und bei jedem Kapitel kurz prüfen.
14. UI–Meta optional: wenn Drift–Variante aktiv, dezent markieren (nur falls UI das eh vorsieht).
15. Finale (Kap 7): weniger „Effekte", mehr Konsequenz–Sprache (Entscheidung fühlt sich dann final an).
