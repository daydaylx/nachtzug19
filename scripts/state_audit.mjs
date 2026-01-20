import fs from 'fs';

const storyPath = 'export/story.json';
const storyData = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
const scenes = storyData.scenes;

// 1. Collect all Effect Targets & Conditions
const effects = new Set();
const conditions = new Set();
const readTargets = new Set();
const writtenTargets = new Set();

function visitEffects(effs) {
    if (!effs) return;
    effs.forEach(e => {
        effects.add(e.target);
        writtenTargets.add(e.target);
    });
}

function visitCondition(cond) {
    if (!cond) return;
    if (cond.type === 'compare' || cond.type === 'bool') {
        conditions.add(cond.target);
        readTargets.add(cond.target);
    }
    if (cond.conditions) {
        cond.conditions.forEach(visitCondition);
    }
}

scenes.forEach(s => {
    visitEffects(s.entry_effects);
    visitEffects(s.exit_effects);
    if (s.narrative_variants) {
        s.narrative_variants.forEach(nv => visitCondition(nv.condition));
    }
    if (s.choices) {
        s.choices.forEach(c => {
            visitEffects(c.effects);
            visitCondition(c.condition);
            // Legacy
            if (c.werteAenderung) Object.keys(c.werteAenderung).forEach(k => writtenTargets.add(k));
            if (c.flagsAenderung) Object.keys(c.flagsAenderung).forEach(k => writtenTargets.add(k));
        });
    }
});

// 2. Identify Issues
const unusedEffects = [...writtenTargets].filter(t => !readTargets.has(t));
const unknownTargets = [...writtenTargets, ...readTargets].filter(t => {
    // Whitelist known engine targets
    const valid = [
        'mut', 'wissen', 'empathie',
        'tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love',
        'conductor_attention', 'memory_drift',
        'rel_comp7', 'rel_boy', 'rel_sleepless',
        'has_recorder', 'has_tag19', 'photo_anomaly',
        'chapter_index', 'station_count',
        // potentially legacy flags if any
    ];
    return !valid.includes(t);
});

// 3. Check for impossible conditions (simplified: e.g. checking boolean as number)
// This requires type inference which is hard on JSON alone.

const report = {
    unusedEffects,
    unknownTargets,
    stats: {
        totalWritten: writtenTargets.size,
        totalRead: readTargets.size
    }
};

fs.writeFileSync('reports/state_audit.json', JSON.stringify(report, null, 2));
console.log('State audit created.');
