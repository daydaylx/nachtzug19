# Nachtzug 19 – Visuelles UI-Konzept (Variante A: "Reader Noir") v1

## 0) Zielgefühl
"Reader Noir" soll wirken wie:
- **Nachtfahrt im Zug**, ruhige Spannung statt Horror.
- **Offiziell vs. falsch**: Alles sieht ordentlich aus, aber Details kippen subtil.
- **Lesen fühlt sich gut an** (wie ein E-Reader), Entscheidungen fühlen sich **verbindlich** an (wie Tickets).

Nicht-Ziele:
- keine Chatblasen / Messenger-Optik
- kein 3D-Rumlaufen
- keine aggressiven Glitch-Effekte im Text

---

## 1) Art Direction: Mood & Material
### 1.1 Mood Keywords
- kalt, leise, metallisch, neon, matte Oberflächen, Reflexion, Vibration

### 1.2 Material-Metapher
- **Reader Card**: matte "Papier/Plastik"-Fläche (wie Fahrkartenpapier oder Buchseite)
- **Background**: Zugfenster + Reflexionen, unscharf, langsam bewegte Lichtstreifen
- **Tickets/Choices**: gelochte Fahrkarten mit Stempeloptik

---

## 2) Farbwelt & Lichtführung (Palette-Logik)
### 2.1 Basis
- **Hintergrund**: sehr dunkles Blau/Anthrazit (fast schwarz), leicht kühl
- **Textflächen**: warmes Dunkelgrau (nicht reines Weiß auf Schwarz)
- **Akzent 1 (Stations-Neon)**: gedämpftes Cyan/Teal für "Zug/Technik"
- **Akzent 2 (Kontroll-Orange)**: für "Attention/Control"
- **Warnrot**: nur für echte Fehler/Endings, sehr sparsam

### 2.2 Licht
- Oben subtiler "Deckenlicht"-Gradient (als wäre Leselicht an)
- Unten etwas dunkler, damit Choice-Tray klar abgesetzt ist
- Keine harten Schatten, alles **soft depth**

---

## 3) Typografie (Reader + Borddisplay)
### 3.1 Narrative Text
- Serif oder humanistische Serif (E-Reader Feeling)
- Zeilenhöhe großzügig, Absätze sauber getrennt
- Maximal ~70 Zeichen pro Zeile (Desktop), mobil entsprechend

### 3.2 UI Labels (Technik)
- Sans (klar, neutral)
- Scene Header / "Borddisplay" wirkt technisch, klein, präzise
- Choices: Sans, größer, sehr gut lesbar

---

## 4) Screen Layout (Mobile-first)
### 4.1 Player Screen Aufbau
**A) Topbar (Zugdisplay)**
- Links: Kapitel-Kürzel (z.B. `K3`)
- Mitte: `NACHTZUG 19` oder optional Kapitelname/Stationsname
- Rechts: Uhrzeit (kann bei Drift minimal "falsch" wirken, später)

**B) Reader Area (Hauptfläche)**
- zentrale Reader Card (abgerundet, soft shadow)
- narrative Absätze, scrollbar
- optional: kleiner "Continue"-Hint am unteren Rand, wenn noch Scroll

**C) Choice Tray (Daumenbereich)**
- 1–4 "Ticket Cards" gestapelt
- große Tap-Fläche
- klare Labels, max 1–2 Zeilen
- optional: 1 kurze Unterzeile (nur wenn nötig, sonst weglassen)

**D) Microbar (optional, super klein)**
- 3 Icons: Tickets / Drift / Attention
- Tap öffnet Status Drawer
- standardmäßig kann man Microbar an/aus schalten (Player Build)

### 4.2 Desktop Anpassung
- Reader Card mittig (max width)
- Choice Tray bleibt unten, aber kann seitlich "pinnen" (optional)
- Status Drawer als rechte Sidebar statt Bottom Sheet

---

## 5) UI-Komponenten & Look

### 5.1 Reader Card
- abgerundete Ecken, "soft depth"
- sehr feine Textur (Paper/Matte Plastic), kaum sichtbar
- Rand minimal heller als Background (Separation ohne Rahmen-Kitsch)

### 5.2 Ticket Choices
- Optik: schwarze/anthrazit "Fahrkarten" mit Lochmuster am Rand
- Hover/Active (Desktop): leichte Aufhellung, kein Neon-Gewitter
- Press (Mobile): kurzer "Punch" (scale 0.98) + Lochstanzen-Klick (Animation)

### 5.3 Stationsschild Overlay (nur bei `station_end`)
- Schwarzes Schild, weiße Schrift, minimaler Rand
- "Station: <Name>" + optional Unterzeile (Gleis/Wagen)
- Animation: Fade + Slide (200ms)
- Drift-Variante: ein Detail minimal verschoben (nur Deko)

### 5.4 Durchsage Banner (optional Tag `announcement`)
- schmaler Banner oben (unter Topbar)
- Text kurz, wirkt wie "Bordansage"
- Drift kann Betonung/Detail verschieben (nicht glitchy)

### 5.5 Status Drawer
- Bottom Sheet (mobil) / Sidebar (desktop)
- enthält:
  - Tickets: truth/escape/guilt/love als Stempel (0–5)
  - Attention: Icon/Segmente (0–6)
  - Drift: Icon/Segmente (0–6)
  - Items: Recorder/Tag19 Icons
  - optional Beziehungen (rel_*), per Setting

---

## 6) Status-Visualisierung (ohne Zahlenwüste)
### 6.1 Tickets (Stempel)
- Vier Stempel: **Truth / Escape / Guilt / Love**
- Füllung 0–5 Segmente
- Tap: tooltip mit 1 Satz ("Was bedeutet das im Spiel?")
- Stempel wirkt abgenutzt, leicht rau

### 6.2 Attention (Kontrolle)
- "Badge/Auge"-Icon + 6 Segmente
- Bei hohen Werten: Akzent wird wärmer (Kontroll-Orange)
- Keine Animation außer minimaler Farbshift

### 6.3 Drift
- "Flimmer"-Icon + 6 Segmente
- Drift wirkt über UI-Deko (Card-Rand, Background), nicht über Haupttext

---

## 7) Drift-Effekte (subtil, kontrolliert, abschaltbar)
**Drift 0–1**
- praktisch neutral

**Drift 2–3**
- Background minimal kälter
- leichte Verschiebung von Deko-Elementen (1–2px)
- Station Overlay: kleiner "falscher" Untertext (nur visuell)

**Drift 4–6**
- sehr leichter "Ghost"-Shadow an Card-Rand (nicht am Text)
- Background-Lichtstreifen werden "unlogisch" langsamer/schneller (sehr subtil)
- Microbar Icons bekommen minimalen Double-Shadow

Wichtig:
- "Reduce Motion" + "Immersion FX Off" schaltet alles aus.
- Text bleibt immer stabil und sauber lesbar.

---

## 8) Animationen (maximal 3 + optional Banner)
**A) Background drift**
- langsamer Loop 20–40s
- nur Deko, kein Fokus

**B) Station Overlay**
- 200ms rein/raus

**C) Choice Commit**
- Button kurz disabled + minimal flash 150–250ms
- danach neue Szene

Optional:
- Announcement Banner slide-in (150ms)

---

## 9) Sound (optional, später)
Wenn überhaupt, dann minimal:
- leises Zugrollen (sehr leise)
- Durchsage-"ding" (selten)
- Ticket click (sehr subtil)

Alles abschaltbar. Nicht jetzt erzwingen.

---

## 10) Build-Varianten (wichtig fürs Projekt)
### 10.1 Player Build (für deine Freundin)
- kein Debug
- Status Drawer optional (kann man komplett ausblenden)
- Fokus: Lesen + Entscheiden + Atmosphäre

### 10.2 Dev Build (für dich)
- Debug Drawer (Scene Jump, Validate Content, State JSON)
- optional Effects Preview bei long-press

---

## 11) Umsetzungsschritte (klein, damit es fertig wird)
1) Player Screen: Reader Card + Choice Tray (funktional)
2) Autosave / Continue
3) Status Drawer (Tickets/Attention/Drift/Items)
4) Station Overlay + Announcement Banner
5) Drift FX (nur Deko, togglebar)
6) Dev/Player Build Flags

Done.

---

## 12) Erfolgskriterien (wenn's richtig wirkt)
- Lesen fühlt sich an wie "im Zug", nicht wie "Chat".
- Entscheidungen sind groß, klar, schnell.
- Drift ist spürbar, aber nie nervig.
- Die UI steht der Story nicht im Weg.
