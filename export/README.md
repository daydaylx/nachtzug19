# export/ – Generierte Artefakte

Dieser Ordner enthält **generierte Artefakte**, die nicht ins Git committed werden.

## Inhalt

| Datei | Beschreibung | Status |
|---|---|---|
| `story.json` | Vollständige Story als JSON (Scenes + Endings + Manifest) | 🔄 generiert |

## Erzeugen

```bash
npm run export:story
```

Das Script `scripts/export_story_json.ts`:
1. Lädt den TypeScript-Story-Content aus `src/content/`
2. Normalisiert Legacy-Felder → kanonisches Format
3. Validiert den Content (validateContent)
4. Schreibt `export/story.json`
5. Kopiert automatisch nach `android-native/app/src/main/assets/story.json` (falls Ordner existiert)

## Wann aktualisieren?

Vor **jedem Android-Build** muss `npm run export:story` ausgeführt werden, wenn Story-Content geändert wurde.

Empfohlener Workflow:
```bash
npm run mcp:validate    # Content prüfen
npm run export:story    # JSON erzeugen
cd android-native && ./gradlew assembleDebug
```

## Hinweis

`export/story.json` ist in `.gitignore` eingetragen → wird **nicht versioniert**.  
Der Ordner selbst ist durch `export/.gitkeep` im Repo sichtbar.
