import fs from 'fs';
import path from 'path';

// Load story data
const storyPath = 'export/story.json';
const storyData = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
const scenes = storyData.scenes;
const manifest = storyData.manifest;

// Helper to find scene
function getScene(id) {
    return scenes.find(s => s.id === id);
}

// Initial state (simplified for simulation)
const initialState = {
    tickets_truth: 0,
    tickets_escape: 0,
    tickets_guilt: 0,
    tickets_love: 0,
    conductor_attention: 0,
    memory_drift: 0,
    rel_comp7: 0,
    rel_boy: 0,
    rel_sleepless: 0,
    has_recorder: false,
    has_tag19: false,
    photo_anomaly: false,
    current_scene_id: manifest.start_scene_id
};

// Simulation engine
class Simulator {
    constructor(strategyName, strategyFn) {
        this.name = strategyName;
        this.strategy = strategyFn;
        this.state = { ...initialState };
        this.path = [];
        this.logs = [];
    }

    log(msg) {
        this.logs.push(msg);
    }

    run() {
        let currentSceneId = this.state.current_scene_id;

        while (currentSceneId) {
            this.path.push(currentSceneId);
            const scene = getScene(currentSceneId);

            if (!scene) {
                this.log(`ERROR: Scene ${currentSceneId} not found.`);
                break;
            }

            // Apply entry effects (simplified)
            this.applyEffects(scene.entry_effects);

            // Check if ending
            const endingId = this.checkEnding(scene);
            if (endingId) {
                this.log(`ENDING REACHED: ${endingId}`);
                break;
            }

            // Make choice
            if (!scene.choices || scene.choices.length === 0) {
                 this.log(`DEAD END at ${currentSceneId}`);
                 break;
            }

            const validChoices = scene.choices.filter(c => this.checkCondition(c.condition));

            if (validChoices.length === 0) {
                 this.log(`STUCK at ${currentSceneId}: No valid choices available.`);
                 break;
            }

            const chosen = this.strategy(validChoices, this.state);
            this.log(`Scene: ${currentSceneId} -> Choice: ${chosen.id} (${chosen.label})`);

            // Apply choice effects
            this.applyEffects(chosen.effects);

            // Move next
            if (chosen.next) {
                currentSceneId = chosen.next;
            } else if (chosen.naechsteSzeneId) {
                currentSceneId = chosen.naechsteSzeneId;
            } else if (chosen.ending) {
                this.log(`ENDING CHOSEN: ${chosen.ending}`);
                break;
            } else {
                 this.log(`ERROR: Choice ${chosen.id} has no next/ending.`);
                 break;
            }
        }

        return this.path;
    }

    checkEnding(scene) {
        // Some scenes might be implicit endings if they have no choices?
        // Or strictly defined by "ending" field in choices leading to them?
        // In this engine, endings are usually reached via choices with "ending" field.
        // But let's check if the scene itself is an ending scene (not standard in this engine schema, but good to check)
        return null;
    }

    checkCondition(condition) {
        if (!condition) return true;
        if (typeof condition === 'function') return true; // Can't eval functions from JSON

        // Handle logic
        if (condition.type === 'compare') {
            const val = this.state[condition.target] || 0;
            const threshold = condition.value;
            switch (condition.operator) {
                case '>': return val > threshold;
                case '>=': return val >= threshold;
                case '<': return val < threshold;
                case '<=': return val <= threshold;
                case '==': return val == threshold;
                case '!=': return val != threshold;
                default: return true;
            }
        }
        // ... support other types if needed, keep it simple for now
        return true;
    }

    applyEffects(effects) {
        if (!effects) return;
        if (!Array.isArray(effects)) return;

        effects.forEach(e => {
            if (e.type === 'inc') {
                this.state[e.target] = (this.state[e.target] || 0) + e.value;
            } else if (e.type === 'dec') {
                 this.state[e.target] = (this.state[e.target] || 0) - e.value;
            } else if (e.type === 'set') {
                 this.state[e.target] = e.value;
            }
        });
    }
}

// Strategies
const strategies = {
    'Truth': (choices, state) => {
        // Prefer truth tickets, then items, then random
        const truth = choices.find(c => c.effects && c.effects.some(e => e.target === 'tickets_truth'));
        if (truth) return truth;
        return choices[0];
    },
    'Escape': (choices, state) => {
        const escape = choices.find(c => c.effects && c.effects.some(e => e.target === 'tickets_escape'));
        if (escape) return escape;
        return choices[choices.length - 1];
    },
    'Guilt': (choices, state) => {
        const guilt = choices.find(c => c.effects && c.effects.some(e => e.target === 'tickets_guilt'));
        if (guilt) return guilt;
        return choices[0];
    },
    'Love': (choices, state) => {
         const love = choices.find(c => c.effects && c.effects.some(e => e.target === 'tickets_love' || e.target.startsWith('rel_')));
         if (love) return love;
         return choices[0];
    }
};

const report = [];

Object.entries(strategies).forEach(([name, strat]) => {
    console.log(`Simulating ${name} path...`);
    const sim = new Simulator(name, strat);
    const path = sim.run();

    report.push(`# Playthrough: ${name}`);
    report.push(`Total Scenes: ${path.length}`);
    report.push('Final State:');
    report.push('```json');
    report.push(JSON.stringify(sim.state, null, 2));
    report.push('```');
    report.push('## Log');
    report.push(sim.logs.join('\n'));
    report.push('\n---\n');
});

fs.writeFileSync('reports/path_playthroughs.md', report.join('\n'));
console.log('Playthroughs generated.');
