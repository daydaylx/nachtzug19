# NACHTZUG 19 - Rules Index

> Übersicht aller expliziten Regeln aus docs/NACHTZUG_19_RULES.md
> Format: Regel-ID | Name | Kurzbeschreibung | Teile | Umsetzung

---

## R1: Drift nach Station

**ID:** R1

**Kurzbeschreibung:** Nach jeder Station erhöht sich memory_drift automatisch um +1. Je höher der Wert (0-6), desto stärker die Drift-Effekte in Narrativen und Szenen.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Engine:** `transitionToNextScene()` erhöht memory_drift/station_count automatisch bei `station_end`, solange keine manuellen Effects für diese Targets gesetzt sind.
- **Content:** station_end-Szenen nutzen keine `exit_effects`; Standard-Choices setzen keinen drift/station_count. Explizite Overrides bleiben Choice-basiert (z.B. c1_end_station/confront_jacket_change).

---

## R2: Schaffner-Kontrolle

**ID:** R2

**Kurzbeschreibung:** Der Schaffner führt in bestimmten Kapiteln Kontrollen durch. Die Härte hängt von conductor_attention ab. Der Schaffner fragt nach dem "Warum", nicht nach dem "Wo".

**Betrifft:** Content / Engine

**Umsetzung:**
- **Engine:** conductor_attention als State-Variable (0-6) definiert
- **Content:** Set-Pieces für Kontrollen in c2_s04a_conductor_approach, c2_control_01_approach, c2_control_01_question, c2_control_01_aftermath, c3_control_02_approach, c3_control_02_question, c3_control_02_aftermath, c5_s14_control3_approach, c5_s15_control3_question, c5_s16_control3_aftermath

---

## T1: Tickets-System

**ID:** T1 (implizit)

**Kurzbeschreibung:** Vier Ticket-Typen (Truth, Escape, Guilt, Love) steuern Story-Pfade und Ending-Entscheidungen. Tickets sind 0-5 und werden durch Choices erhöht.

**Betrifft:** Content

**Umsetzung:**
- **Types:** Tickets als State-Variable (tickets_truth, tickets_escape, tickets_guilt, tickets_love) definiert
- **Content:** Alle Choices verteilen Tickets über `effects` Arrays

---

## D1: Druck-System

**ID:** D1 (implizit)

**Kurzbeschreibung:** Zwei System-Variablen steuern Schwierigkeit und Varianten:
- conductor_attention (0-6): Einfluss auf Kontrollen und Aufmerksamkeit
- memory_drift (0-6): Einfluss auf Drift-Effekte und Textvarianten

**Betrifft:** Content / Engine

**Umsetzung:**
- **Types:** Pressure als State-Variable definiert
- **Content:** Choices erhöhen/erniedrigen diese Werte; Drift steigt automatisch nach Stationen (R1)

---

## B1: Beziehungs-System

**ID:** B1 (implizit)

**Kurzbeschreibung:** Drei Haupt-NPC-Beziehungen (rel_comp7, rel_boy, rel_sleepless) steuern Dialog-Optionen und Endings. Werte von -2 bis +4.

**Betrifft:** Content

**Umsetzung:**
- **Types:** Relations als State-Variable definiert
- **Content:** Choices erhöhen/erniedrigen Beziehungen; Conditions prüfen Beziehungen für Dialog-Optionen

---

## I1: Items-System

**ID:** I1 (implizit)

**Kurzbeschreibung:** Drei wichtige Items schalten Story-Optionen frei:
- has_recorder: Kassettenrekorder (Boy-Story)
- has_tag19: Schlüsselanhänger (Wagen 7)
- photo_anomaly: Foto mit Anomalie (Comp7-Story)

**Betrifft:** Content

**Umsetzung:**
- **Types:** Items als boolean State-Variablen definiert
- **Content:** Items werden durch Choices `set: { target: 'has_recorder', value: true }` freigeschaltet; Conditions prüfen Items für Optionen

---

## C1: Callback-Regel

**ID:** C1

**Kurzbeschreibung:** Alle Choices sollten mindestens 1 Effect haben (kein leeres effects-Array). State-Notes (max 3) sollen Hinweise auf Rückrufe geben.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Alle Choices haben mindestens 1 Effect
- **Content:** state_notes Arrays in Scenes enthalten Hinweise auf frühere Entscheidungen

---

## C2: Tags-System

**ID:** C2 (implizit)

**Kurzbeschreibung:** Scenes haben Tags zur Kategorisierung:
- setup: Einstiegsszenen
- drift_seed: Szene die Drift-Effekte etabliert
- drift_variant: Szene mit Drift-Textvarianten
- reveal: Szene offenbart wichtige Informationen
- control: Kontroll-Szenen (Schaffner)
- station_end: Letzte Szene eines Kapitels (triggered R1)

**Betrifft:** Content / Engine

**Umsetzung:**
- **Content:** Alle Scenes haben `tags` Arrays
- **Engine:** `station_end` Tag löst R1 aus

---

## C3: Narrative-Varianten

**ID:** C3 (implizit)

**Kurzbeschreibung:** Drift-basierte Textvarianten basierend auf memory_drift. Scenes mit `narrative_variants` haben alternative Texte mit `min_drift` Thresholds. Engine wählt passende Variante basierend auf aktuellem memory_drift.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Content:** Scenes mit `narrative_variants` Array und `min_drift` Properties
- **Engine:** `resolveSceneNarrative()` Funktion wählt höchste passende Variante

---

## C4: Conditions-System

**ID:** C4 (implizit)

**Kurzbeschreibung:** Choices können sichtbar oder unsichtbar sein basierend auf Conditions. Condition-Typen:
- SimpleCondition: compare (==, !=, >, <, >=, <=)
- BooleanCondition: bool check
- AndCondition: alle müssen erfüllt sein
- OrCondition: mindestens eine muss erfüllt sein

**Betrifft:** Content / Engine

**Umsetzung:**
- **Content:** Choices haben `condition` Properties mit Condition-Objects
- **Engine:** `evaluateCondition()` und `getAvailableChoices()` prüfen Conditions

---

## C5: Entry/Exit Effects

**ID:** C5 (implizit)

**Kurzbeschreibung:** Scenes können `entry_effects` (beim Betreten) und `exit_effects` (beim Verlassen) haben. Diese werden von Engine automatisch angewendet.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Content:** Scenes haben optional `entry_effects` und `exit_effects` Arrays
- **Engine:** `transitionToNextScene()` wendet entry_effects (neue Szene) und exit_effects (alte Szene) an

---

## C6: Effects-System

**ID:** C6 (implizit)

**Kurzbeschreibung:** Atomare State-Änderungen. Effect-Typen:
- inc: erhöht Wert
- dec: verringert Wert
- set: setzt Wert
- clamp: begrenzt Wert auf min/max

**Betrifft:** Content / Engine

**Umsetzung:**
- **Content:** Choices und Scenes haben `effects` Arrays mit Effect-Objects
- **Engine:** `applyEffects()` führt Effect-Arrays aus

---

## C7: State Notes System

**ID:** C7 (implizit)

**Kurzbeschreibung:** Max 3 Hinweise pro Scene für Content-Editoren und Developer-Context.

**Betrifft:** Content

**Umsetzung:**
- **Content:** state_notes Arrays in Scenes mit max 3 Einträgen

---

## C8: Auto-Clamp

**ID:** C8 (implizit)

**Kurzbeschreibung:** Alle State-Variablen werden nach Effects automatisch auf ihre erlaubten Ranges geklempt:
- Tickets: 0-5
- Pressure: 0-6
- Relations: -2 bis +4

**Betrifft:** Engine

**Umsetzung:**
- **Engine:** `autoClamp()` Funktion nach jeder `applyEffects()` Aufrufe

---

## C9: History-System

**ID:** C9 (implizit)

**Kurzbeschreibung:** Alle Entscheidungen werden in `history` Array protokolliert mit scene_id, choice_id, timestamp und optionalem state_delta.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Types:** GameState hat `history` Array
- **Engine:** `transitionToNextScene()` fügt History-Einträge hinzu

---

## C10: Save/Load

**ID:** C10 (implizit)

**Kurzbeschreibung:** GameStates können lokal in LocalStorage gespeichert und geladen werden. `save_version` prüft Kompatibilität.

**Betrifft:** Engine

**Umsetzung:**
- **Engine:** GameEngine Klasse mit `saveGame()` und `loadGame()` Methoden

---

## C11: Ending-System

**ID:** C11 (implizit)

**Kurzbeschreibung:** Multiple Endings basierend auf Ticket-Scores und Entscheidungen. Endings haben ID, Titel und Beschreibung.

**Betrifft:** Content

**Umsetzung:**
- **Types:** Ending Type definiert
- **Content:** Endings Collection mit ending IDs; Choices können `ending: "A"` Property haben

---

## C12: Chapter-System

**ID:** C12 (implizit)

**Kurzbeschreibung:** Story ist in 7 Kapitel unterteilt. chapter_index wird automatisch aktualisiert bei Szenen mit `chapter` Property.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Content:** Scenes haben `chapter` Property
- **Engine:** `transitionToNextScene()` aktualisiert `chapter_index`

---

## C13: Station-Count

**ID:** C13 (implizit)

**Kurzbeschreibung:** station_count wird bei jeder station_end-Szene erhöht. Trackt Anzahl besuchter Stationen.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Engine:** `transitionToNextScene()` erhöht station_count bei station_end Tag
- **Content:** station_end Szenen erhöhen station_count zusätzlich (doppelt!)

---

## C14: Visited Scenes

**ID:** C14 (implizit)

**Kurzbeschreibung:** visited_scene_ids trackt alle besuchten Szenen für Analytics und State-Save.

**Betrifft:** Content / Engine

**Umsetzung:**
- **Types:** GameState hat `visited_scene_ids` Array
- **Engine:** `transitionToNextScene()` fügt neue Szenen hinzu

---

## C15: Atmosphere

**ID:** C15 (implizit)

**Kurzbeschreibung:** Scenes haben atmosphere Properties für UI (normal, danger, mystic, dream, tense, somber, dark) die visuelle Darstellung steuern.

**Betrifft:** Content / UI

**Umsetzung:**
- **Content:** Scenes haben `atmosphere` Property
- **UI:** UI-Komponenten lesen atmosphere und passen Darstellung an

---

## C16: Interludes

**ID:** C16 (implizit)

**Kurzbeschreibung:** Kurze atmosphärische Szenen ohne Plot-Vorschritt, nur zur Stimmung. Typischerweise ohne Choices oder mit minimalen Options.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Scenes mit interlude im Namen (z.B. c1_interlude_01_lights) fokussieren auf Atmosphäre

---

## C17: Set-Pieces

**ID:** C17 (implizit)

**Kurzbeschreibung:** Mehr-Szenen-Sequenzen für wichtige Story-Momente (z.B. Kontrollen, Abteil 7, Endings). Mehrere Szenen erzählen ein Set-Piece.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Kontrollen, Abteil 7 und Endings sind als Set-Pieces über mehrere Szenen verteilt

---

## C18: Conditional Scenes

**ID:** C18 (implizit)

**Kurzbeschreibung:** Szenen sind nur unter bestimmten Conditions sichtbar (z.B. nur wenn rel_comp7 >= 2 oder has_recorder == true). Ermöglicht dynamischen Content.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Choices mit Conditions führen zu conditional Szenen

---

## C19: Loop-Erkennung

**ID:** C19 (implizit)

**Kurzbeschreibung:** Bestimmte Szenen erkennen oder erwähnen Loops (z.B. mehrfache Durchfahrten, rekursive Narrative). Wird durch Story-Text implizit, nicht durch Code.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Story-Text erwähnt Schleifen (z.B. "Wir fahren von A nach A", "Das ist nicht zum ersten Mal")

---

## C20: Memory-Fragmentation

**ID:** C20 (implizit)

**Kurzbeschreibung:** Drift-Effekte manifestieren sich als falsche oder fragmentierte Erinnerungen. Je höher memory_drift, desto fragmentierter.

**Betrifft:** Content

**Umsetzung:**
- **Content:** narrative_variants mit hoher min_drift zeigen fragmentierte Erinnerungen
- **Content:** Story-Text beschreibt Erinnerungsglitches

---

## C21: Paradox-Effekte

**ID:** C21 (implizit)

**Kurzbeschreibung:** Zeit- und Raum-Paradoxe bei hohem Drift (z.B. mehrfache Versionen des Selbst, Zeit läuft rückwärts). Steigen mit memory_drift.

**Betrifft:** Content

**Umsetzung:**
- **Content:** narrative_variants bei min_drift >= 5 zeigen Paradoxe
- **Content:** Story-Text beschreibt Raum- und Zeitanomalien

---

## C22: Realitätsbruch

**ID:** C22 (implizit)

**Kurzbeschreibung:** Bei extrem hohem Drift bricht die Realität vollständig auf (Metagaming, Renderer sichtbar, Code-Ebenen).

**Betrifft:** Content

**Umsetzung:**
- **Content:** narrative_variants bei min_drift >= 5 zeigen Metagaming
- **Content:** Story-Text erwähnt Rendering und Code-Ebenen

---

## C23: Narrative-Length

**ID:** C23 (implizit)

**Kurzbeschreibung:** Szenen sollten 3-12 Absätze haben. Interludes können kürzer sein (1-3). Balanciert Immersion und Lesbarkeit.

**Betrifft:** Content

**Umsetzung:**
- **Content:** narrative Properties mit 3-12 Absätzen

---

## C24: Choice-Count

**ID:** C24 (implizit)

**Kurzbeschreibung:** Szenen haben 1-4 Choices. Set-Pieces können mehr haben, aber sollten balanciert bleiben.

**Betrifft:** Content

**Umsetzung:**
- **Content:** choices Arrays mit 1-4 Choices

---

## C25: Depth-Progression

**ID:** C25 (implizit)

**Kurzbeschreibung:** Story eskaliert in Intensität und Komplexität von Kapitel 1 zu 7. Drift-Effekte und Anomalien nehmen zu.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Kapitel 1-7 zeigen zunehmende Drift-Effekte und Komplexität

---

## C26: Choice-Consequences

**ID:** C26 (implizit)

**Kurzbeschreibung:** Alle Choices sollten Konsequenzen haben (Tickets, Relations, Attention, Drift). Keine "neutralen" Choices ohne State-Änderung.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Alle Choices haben mindestens 1 Effect mit State-Änderung

---

## C27: Replay-Value

**ID:** C27 (implizit)

**Kurzbeschreibung:** Story sollte für Replays wert sein (mehrere Endings, unterschiedliche Pfade, Secrets entdecken).

**Betrifft:** Content

**Umsetzung:**
- **Content:** Multiple Endings basierend auf Ticket-Kombinationen; Secrets (Abteil 7, Recorder)

---

## C28: Player-Agency

**ID:** C28 (implizit)

**Kurzbeschreibung:** Player hat Agency durch Meaningful Choices. Endings sind Ergebnis der Entscheidungen, nicht Random.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Ending-Conditions basieren auf Ticket-Scores (Truth >= 8, Escape >= 6, etc.)

---

## C29: Theme-Konsistenz

**ID:** C29 (implizit)

**Kurzbeschreibung:** Konsistente Themenvorgabe (Nachtzug 19, Schleife, Verlust, Identität). Keine widersprüchenden Motive.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Alle Szenen folgen zentralen Themen (Schleife, 1973, Nachtzug)

---

## C30: Mystery-Pacing

**ID:** C30 (implizit)

**Kurzbeschreibung:** Informationen werden schrittweise enthüllt. Spoiler werden frühzeitig angedeutet, aber spät erklärt.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Early Hints (Boy, Comp7, Sleepless) führen zu späterer Enthüllung

---

## C31: Atmosphere-Immersion

**ID:** C31 (implizit)

**Kurzbeschreibung:** Atmosphärische Beschreibungen für Immersion (Gerüche, Temperaturen, Texturen, Klänge). Nicht nur visuell.

**Betrifft:** Content

**Umsetzung:**
- **Content:** narrative Properties beschreiben multisensorische Details

---

## C32: Character-Consistency

**ID:** C32 (implizit)

**Kurzbeschreibung:** NPCs (Comp7, Boy, Sleepless) sind konsistent. Comp7 ist immer rätselhaft, Boy immer verletzlich. Keine Out-of-Character Moments.

**Betrifft:** Content

**Umsetzung:**
- **Content:** NPC-Dialoge bleiben konsistent mit Charakterisierungen

---

## C33: Pacing-Variation

**ID:** C33 (implizit)

**Kurzbeschreibung:** Abwechselndes Tempo (Interludes, Intensive Szenen, Calm Moments). Verhindert Monotonie.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Mix aus Interludes (Stille), Standard-Szenen und Intensiven (Kontrollen, Endings)

---

## C34: Foreshadowing

**ID:** C34 (implizit)

**Kurzbeschreibung:** Spätere Events werden frühzeitig angedeutet (z.B. Abteil 7, Unfall 1973). Seeding für Payoffs.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Early Hints auf Abteil 7, 1973 Unfall führen zu späterer Enthüllung

---

## C35: Payoff-Konsistenz

**ID:** C35 (implizit)

**Kurzbeschreibung:** Alle Foreshadowing und Setup werden bezahlt (abgeschlossen). Keine loose ends.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Alle Setup-Elemente (Abteil 7, 1973, Recorder, Tag19) werden aufgelöst

---

## C36: Emotional-Resonance

**ID:** C36 (implizit)

**Kurzbeschreibung:** Story zielt auf emotionale Resonanz (Verlust, Isolation, Identitätssuche). Dialoge und Situationen rufen Emotionen hervor.

**Betrifft:** Content

**Umsetzung:**
- **Content:** Story-Themen und Szenen fokussieren auf emotionale Erfahrung

---

## C37: Minimalist-UI

**ID:** C37 (implizit)

**Kurzbeschreibung:** UI sollte minimal und unobtrusiv sein, nicht von Story ablenken. Noir-Ästhetik.

**Betrifft:** UI

**Umsetzung:**
- **UI:** Noir-Thema mit dunklen Farben, minimalistisches Layout

---

## C38: Accessibility

**ID:** C38 (implizit)

**Kurzbeschreibung:** Story und UI sollten zugänglich sein (kontrast, Textgröße, Screen Reader Support).

**Betrifft:** UI / Content

**Umsetzung:**
- **Content:** Klarer Text mit guter Kontrast
- **UI:** Screen Reader Support, a11y Farben

---

## C39: Testing-QA

**ID:** C39 (implizit)

**Kurzbeschreibung:** Content-Validierung durch automatische Tests und QA-Berichte. `scripts/validate.ts` und `scripts/audit_chapters.mjs`.

**Betrifft:** Tools / Content

**Umsetzung:**
- **Tools:** `validate.ts` mit Tests für Content-Validierung
- **Tools:** `audit_chapters.mjs` prüft Kapitel gegen Specs

---

## C40: Documentation

**ID:** C40 (implizit)

**Kurzbeschreibung:** Vollständige Dokumentation aller Systeme und Regeln. docs/ Ordner mit Concept, Architecture, Rules, Specs.

**Betrifft:** Documentation

**Umsetzung:**
- **Docs:** docs/ARCHITECTURE.md, docs/CONCEPT_NACHTZUG_19.md, docs/NACHTZUG_19_RULES.md, docs/NACHTZUG_19_LENGTH_IMMERSION_SPEC.md

---

## ZUSAMMENFASSUNG

**Explizite Canon Rules:** 2 (R1, R2)
**Implizite System-Rules:** ~40 (T1-T40, C1-C40)

**R1 Status:** 
- Keine doppelte Erhöhung; Engine übernimmt Default +1, Overrides nur bei expliziten Choice-Effects
- Details siehe `reports/rules_policy_r1_drift_fix.md`

**Teile:**
- Engine: Canon Rules und State Management
- Content: Szenen, Choices, Narrative, NPCs
- UI: Atmosphäre, Minimalismus, Accessibility
- Tools: Validierung, QA
- Docs: Architektur, Konzepte, Regeln
