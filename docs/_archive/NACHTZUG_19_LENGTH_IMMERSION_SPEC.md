# NACHTZUG 19 – Length & Immersion Spec (v1)
**Ziel:** Jedes Kapitel soll sich **nicht gehetzt** anfühlen und **mindestens 20 Minuten**, besser **30–35 Minuten** Spielzeit liefern – ohne sinnloses Gelaber, ohne Plot-Express und ohne kaputten Content-Graph.

---

## 1) Zielwerte: Spielzeit pro Kapitel

### 1.1 Mindestziel
- **≥ 20 Minuten pro Kapitel** (unter 20 min gilt als **Fehler**)

### 1.2 Idealziel
- **30–35 Minuten pro Kapitel** (Sweet Spot)

### 1.3 Was "Spielzeit" hier bedeutet
Spielzeit = **Lesen + Entscheidungen treffen + kurzer mentaler Nachhall**, nicht "der Spieler starrt 5 Minuten auf Adjektive".

---

## 2) Messmodell (damit niemand rät)

### 2.1 Annahmen
- Durchschnittliche Lesegeschwindigkeit (mobil): **160–220 Wörter/Minute**
- Entscheidung (Choice) inkl. Nachdenken: **6–12 Sekunden**
- Mini-Interaktion (Hotspot/Overlay) zählt wie Choice

### 2.2 Runtime-Formel (Schätzung)
**Kapitel-Minuten ≈ (Wörter / 190) + (Choices_total × 0.15)**

- 190 Wörter/Minute = realistischer Mittelwert für mobile, atmosphärischen Text
- 0.15 Minuten pro Choice = 9 Sekunden pro Entscheidung

### 2.3 Ziel-Bereich als Zahlen
Für **30–35 Minuten** brauchst du grob:
- **Wörter pro Kapitel:** ~ **5.000–6.500**
- **Choices pro Kapitel:** ~ **30–45**

---

## 3) Kapitel-Blueprint (wie du Länge erzeugst, ohne zu nerven)

### 3.1 Szenenanzahl pro Kapitel
- Minimum: **18 Szenen**
- Ziel: **22–28 Szenen**
- Maximal (nur wenn sauber): **32 Szenen**

> Wenn ein Kapitel nur 10–14 Szenen hat, ist "17 Minuten" praktisch garantiert.

### 3.2 Szene-Typen (Mischung, nicht nur "Plot-Szenen")
Jedes Kapitel soll enthalten:
1) **3–5 Atmosphere/Interlude Szenen**
   Kurz, dicht, wenig Plot, viel Gefühl (Gang, Geräusche, Durchsage, Lichtwechsel).
2) **10–16 Standard Szenen**
   Dialog + Entscheidung + Konsequenz.
3) **2–4 "Set-Piece"-Szenen**
   Länger, zentral (Kontrolle, Abteil 7 Moment, Drift/Spiegel).

### 3.3 Plot-Tempo-Regel (Anti-Express)
- Pro Kapitel wird **maximal 1 großer Reveal** geliefert.
- "Erklären" ist verboten: Max. **3 erklärende Sätze am Stück**.
- Mystery bleibt Mystery. Der Zug lügt nicht plump, er **verschiebt Bedeutung**.

---

## 4) Szenen-Spezifikation (für Immersion)

### 4.1 Mindestanforderungen pro Szene
- **narrative:** 5–10 Absätze (bei Interludes: 3–6)
- **Mindestens 1 sensorischer Anker**:
  - Geräusch / Licht / Geruch / Temperatur / Material / Vibration
- **Mindestens 1 "Moment"** (siehe 4.2)
- **choices:** 1–4, jede Choice hat Effects + next/ending
- **state_notes:** max 3, aber mindestens 1 Callback-Hinweis, wenn Choice State ändert

### 4.2 Der "Moment"-Katalog (jede Szene muss ≥ 1 davon haben)
- Mini-Konflikt (Blickkontakt, Unterbrechung, leise Drohung, Unsicherheit)
- Mini-Entscheidung (nicht nur Plot, auch Verhalten/Ton)
- Nachhall (ein Satz/Detail, das später wiederkommt)
- Drift-Symptom (klein, subtil, nicht übertrieben)
- Beziehungssignal (rel_* bewegt sich spürbar in Dialog/Reaktion)

---

## 5) Entscheidungen (damit Spielzeit echt ist)

### 5.1 Jede Choice muss spürbar sein
- Jede Choice:
  - **mindestens 1 Effect**
  - und ein **sichtbares Echo später** (Callback)

Wenn eine Choice "nur Text variiert", ist das Fake-Interaktivität und zählt nicht als Spielzeit.

### 5.2 Choice-Dichte
- Ziel: **1 Choice pro Szene** mindestens
- In Set-Pieces: gerne **2 Choices** (Interaktions-Sandwich)

### 5.3 Interaktions-Sandwich (für große Szenen)
Für zentrale Szenen:
1) Einstieg (kurz)
2) Choice 1
3) Konsequenz sichtbar
4) Choice 2
5) Ausklang / Hook

Ergebnis: mehr Spielzeit **und** mehr Immersion, ohne Fülltext.

---

## 6) Drift & Kontrolle (Canonical Timing)
- **station_end** pro Kapitel: Pflicht
- Kontrolle: Kapitel **2, 3, 5** (mindestens eine `control` Szene)
- Drift soll nicht "random weird" sein:
  - pro Kapitel 1–2 klare Drift-Symptome
  - Steigerung über Kapitel hinweg

---

## 7) "Keine Füllwörter"-Regeln (damit's nicht langweilig wird)

### Verbotene Füllmuster
- "Du spürst ein seltsames Gefühl" ohne konkreten Sinneseindruck
- "Alles wirkt anders" ohne konkretes Detail
- "Plötzlich erinnerst du dich" ohne Trigger / Konsequenz

### Stattdessen
- **Konkrete Dinge**: Metallkälte am Griff, fluoreszierendes Flackern, Ozongeruch, Schienenstoß, zu saubere Stille, falscher Name in Durchsage.

---

## 8) Definition of Done pro Kapitel
Ein Kapitel gilt als **fertig**, wenn:
1) **Runtime-Schätzung** nach Formel:
   - ≥ 20 Minuten (Fehler, wenn nicht)
   - Ziel: 30–35 Minuten
2) **Szenenanzahl** im Zielbereich (22–28 empfohlen)
3) **Choice-Integrität**:
   - keine Choice ohne Effect
   - keine next-Links ins Nichts
4) **Callbacks vorhanden**:
   - mind. 60% der State-ändernden Choices haben ein späteres Echo (Dialog/Variante/Gate)
5) **Canon-Regeln** eingehalten:
   - station_end vorhanden
   - control in Kap. 2/3/5
6) **Validator + Tests grün** (wenn vorhanden)

---

## 9) Agenten-Aufgabenstellung (Kurzform)
Wenn ein Agent ein Kapitel schreibt/erweitert, lautet die Aufgabe:
- Erhöhe Szenenanzahl auf Zielbereich
- Erhöhe Choice-Dichte
- Erzeuge Immersion über sensorische Anker + Momente
- Halte Canon Rules ein
- Keine neuen State-Keys, keine Engine/UI-Änderungen
- Danach QA/Validator-Lauf

---

## 10) Prompt-Baustein für "Kapitel verlängern auf 30–35 Minuten"
**Dieser Block wird in jedem Writer-Prompt eingefügt:**

- Ziel: 30–35 Minuten Kapitelspielzeit
- Ziel-Wortanzahl: 5.000–6.500 Wörter
- Ziel-Choices: 30–45
- Ziel-Szenen: 22–28
- Füge 3–5 Interludes ein (Atmosphäre)
- Füge 2–4 Set-Pieces ein (Interaktions-Sandwich)
- Jede Szene braucht sensorischen Anker + Moment
- Kein Plot-Express: max 1 großer Reveal pro Kapitel

---

## 11) QA-Check (für den "Continuity Cop")
- Runtime grob ausrechnen (Wörter/Choices)
- Zu kurze Szenen markieren (unter 3 Absätze ohne Grund)
- "Füllsatz"-Scanner: ersetze generische Sätze durch konkrete Details
- Prüfe Callback-Abdeckung
- Prüfe, dass Drift subtil bleibt (keine plumpen Erklärungen)

---
