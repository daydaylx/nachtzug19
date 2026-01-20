import fs from 'fs';

const storyPath = 'export/story.json';
const outputPath = 'reports/choice_audit.json';

try {
  const storyData = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
  const scenes = storyData.scenes;

  const illusionChoices = [];
  const fakeChoices = [];

  scenes.forEach(scene => {
    if (!scene.choices || scene.choices.length < 2) return;

    // A) Illusion Choice: Multiple choices -> same next/ending AND minimal state change difference
    // Group choices by destination
    const destinationGroups = {};
    scene.choices.forEach(c => {
      const dest = c.next || c.naechsteSzeneId || (c.ending ? 'ENDING:' + c.ending : 'DEAD_END');
      if (!destinationGroups[dest]) destinationGroups[dest] = [];
      destinationGroups[dest].push(c);
    });

    Object.entries(destinationGroups).forEach(([dest, group]) => {
      if (group.length > 1) {
        // Multiple choices lead to same destination. Check if they have different effects.
        const effectsSignatures = group.map(c => {
            const effects = c.effects || [];
            // legacy effects
            if (c.werteAenderung) effects.push({type: 'legacy_stats', val: c.werteAenderung});
            if (c.flagsAenderung) effects.push({type: 'legacy_flags', val: c.flagsAenderung});
            return JSON.stringify(effects);
        });

        const allSameEffects = effectsSignatures.every(s => s === effectsSignatures[0]);

        if (allSameEffects) {
             illusionChoices.push({
                 sceneId: scene.id,
                 destination: dest,
                 choiceIds: group.map(c => c.id || c.text),
                 reason: "Same destination, same effects"
             });
        }
      }
    });
  });

  // B) Fake Choice: Choice has effect, but effect is never checked?
  // This requires global analysis of conditions.
  // First collect all targets read in conditions.
  const readTargets = new Set();

  function extractReadTargets(condition) {
      if (!condition) return;
      if (condition.target) readTargets.add(condition.target);
      if (condition.conditions) condition.conditions.forEach(extractReadTargets);
  }

  scenes.forEach(s => {
      if (s.narrative_variants) {
          s.narrative_variants.forEach(nv => {
               extractReadTargets(nv.condition);
               if (nv.min_drift) readTargets.add('memory_drift');
          });
      }
      if (s.choices) {
          s.choices.forEach(c => {
               extractReadTargets(c.condition);
          });
      }
  });

  scenes.forEach(scene => {
      if (!scene.choices) return;
      scene.choices.forEach(c => {
           const effects = c.effects || [];
           // Flatten legacy
           if (c.werteAenderung) Object.keys(c.werteAenderung).forEach(k => effects.push({target: k}));
           if (c.flagsAenderung) Object.keys(c.flagsAenderung).forEach(k => effects.push({target: k}));

           if (effects.length > 0) {
               const impactfulEffects = effects.filter(e => readTargets.has(e.target));
               if (impactfulEffects.length === 0 && effects.length > 0) {
                    // All effects on this choice touch targets that are never read?
                    // NOTE: This is a heuristic. Some targets might be used in Engine logic (e.g. stats, tickets for ending calculation in code, not strictly in json conditions)
                    // We need to whitelist "known engine targets"
               }
           }
      });
  });

  // Refined "Fake Choice" / "Useless Effect" check:
  // List choices that set flags/vars that are seemingly never checked in content conditions.
  // We'll just dump the targets that are written but not read in content conditions.

  const writtenTargets = new Set();
  scenes.forEach(s => {
      if (s.entry_effects) s.entry_effects.forEach(e => writtenTargets.add(e.target));
      if (s.exit_effects) s.exit_effects.forEach(e => writtenTargets.add(e.target));
      if (s.choices) {
          s.choices.forEach(c => {
               if (c.effects) c.effects.forEach(e => writtenTargets.add(e.target));
               if (c.werteAenderung) Object.keys(c.werteAenderung).forEach(k => writtenTargets.add(k));
               if (c.flagsAenderung) Object.keys(c.flagsAenderung).forEach(k => writtenTargets.add(k));
          });
      }
  });

  const unreadTargets = [...writtenTargets].filter(t => !readTargets.has(t));

  // Whitelist core engine targets that might be read by engine logic, not content conditions
  const engineTargets = ['tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love', 'mut', 'wissen', 'empathie'];
  const potentialUselessTargets = unreadTargets.filter(t => !engineTargets.includes(t));

  const report = {
      illusionChoices,
      potentialUselessTargets,
      readTargets: Array.from(readTargets)
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log('Choice audit created at ' + outputPath);

} catch (e) {
  console.error(e);
}
