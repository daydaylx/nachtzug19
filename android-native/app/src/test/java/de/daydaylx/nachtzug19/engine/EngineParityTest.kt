package de.daydaylx.nachtzug19.engine

import de.daydaylx.nachtzug19.model.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.File

// ============================================================================ 
// Trace Data Models (Matching trace_golden_master.json)
// ============================================================================ 

@Serializable
data class Trace(
    val id: Int,
    val seed: Int,
    val steps: List<TraceStep>,
    val ending: String?
)

@Serializable
data class TraceStep(
    val scene_id: String,
    val choice_id: String,
    val state_after: ExpectedState
)

@Serializable
data class ExpectedState(
    val stats: PlayerStats,
    val tickets: Tickets,
    val pressure: Pressure,
    val relations: Relations,
    val items: Items,
    val current_scene_id: String,
    val chapter_index: Int,
    val station_count: Int,
    val visited_scene_ids: List<String>
)

// ============================================================================ 
// Test Class
// ============================================================================ 

class EngineParityTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `golden master parity check`() {
        // 1. Load Paths
        // Gradle unit tests usually run in the module directory (app/)
        var storyFile = File("src/main/assets/story.json")
        if (!storyFile.exists()) {
            // Fallback for IDE or root execution
            storyFile = File("app/src/main/assets/story.json")
        }
        
        // Trace file is in project_root/docs/evidence/
        // From app/ -> ../../docs/evidence/
        var traceFile = File("../../docs/evidence/trace_golden_master.json")
        if (!traceFile.exists()) {
             // From root/ -> docs/evidence/
             traceFile = File("../docs/evidence/trace_golden_master.json")
        }

        println("Working Directory: ${System.getProperty("user.dir")}")
        assertTrue("Story file not found at ${storyFile.absolutePath}", storyFile.exists())
        assertTrue("Trace file not found at ${traceFile.absolutePath}", traceFile.exists())

        // 2. Parse Data
        val storyRaw = storyFile.readText()
        val traceRaw = traceFile.readText()

        val storyExport = json.decodeFromString<StoryExport>(storyRaw)
        val traces = json.decodeFromString<List<Trace>>(traceRaw)

        // 3. Initialize Engine
        // We use the same 'StoryContent' map transformation as in the App
        val scenesById = storyExport.scenes.associateBy { it.id }
        val endingsById = storyExport.endings
        val gameEngine = GameEngine()
        gameEngine.setStory(scenesById, endingsById, storyExport.manifest.start_scene_id)

        println("🤖 Running Golden Master Parity Test")
        println("   - Story loaded: ${scenesById.size} scenes")
        println("   - Traces loaded: ${traces.size}")

        // 4. Run Traces
        var passedTraces = 0
        
        for (trace in traces) {
            runTrace(gameEngine, trace, storyExport.manifest.start_scene_id)
            passedTraces++
        }

        assertEquals("All traces should pass", traces.size, passedTraces)
        println("\n✅ SUCCESS: All ${traces.size} traces verified against Kotlin Engine.")
    }

        private fun runTrace(engine: GameEngine, trace: Trace, startSceneId: String) {
            // Reset Engine auf manifest-konforme Start-Szene.
            engine.reset(startSceneId)
            
            var currentState = engine.state

            // Initial sanity check
            assertEquals("Initial scene mismatch", startSceneId, currentState.current_scene_id)

        for ((index, step) in trace.steps.withIndex()) {
            val currentScene = engine.getCurrentScene()
            assertNotNull("Scene not found: ${currentState.current_scene_id}", currentScene)

            // Verify we are in the expected scene before choice
            assertEquals(
                "Trace ${trace.id} Step $index: Pre-Choice Scene Mismatch",
                step.scene_id,
                currentScene!!.id
            )

            // Find Choice
            val availableChoices = engine.getAvailableChoices()
            val choice = availableChoices.find { it.id == step.choice_id }
            
            assertNotNull(
                "Trace ${trace.id} Step $index: Choice '${step.choice_id}' not found or conditions not met in ${currentScene.id}. Available: ${availableChoices.map { it.id }}",
                choice
            )

            // Make Choice
            engine.makeChoice(choice!!)
            currentState = engine.state

            // Verify State After
            val expected = step.state_after
            
            // We compare component by component for better error messages
            
            // 1. Meta
            assertEquals("Trace ${trace.id} Step $index: Next Scene ID mismatch", expected.current_scene_id, currentState.current_scene_id)
            assertEquals("Trace ${trace.id} Step $index: Chapter Index mismatch", expected.chapter_index, currentState.chapter_index)
            assertEquals("Trace ${trace.id} Step $index: Station Count mismatch", expected.station_count, currentState.station_count)
            
            // 2. Stats & Tickets
            assertEquals("Trace ${trace.id} Step $index: Tickets mismatch", expected.tickets, currentState.tickets)
            assertEquals("Trace ${trace.id} Step $index: Pressure mismatch", expected.pressure, currentState.pressure)
            
            // 3. Relations & Items
            assertEquals("Trace ${trace.id} Step $index: Relations mismatch", expected.relations, currentState.relations)
            assertEquals("Trace ${trace.id} Step $index: Items mismatch", expected.items, currentState.items)
            
            // 4. Visited (Check set equality order independent? Trace has list, State has list)
            // Ideally order matters in history, but 'visited' is a set concept usually. 
            // In our implementation it is a list. Let's check size first.
            assertEquals("Trace ${trace.id} Step $index: Visited count mismatch", expected.visited_scene_ids.size, currentState.visited_scene_ids.size)
            // Check last visited
            if (expected.visited_scene_ids.isNotEmpty()) {
                 assertEquals("Trace ${trace.id} Step $index: Last visited mismatch", expected.visited_scene_ids.last(), currentState.visited_scene_ids.last())
            }
        }
        
        // Final Ending Check
        if (trace.ending != null) {
            assertTrue("Trace ${trace.id}: Should be Game Over", currentState.isGameOver)
            assertEquals("Trace ${trace.id}: Ending ID mismatch", trace.ending, currentState.endingId)
        }
    }
}
