import { runOnce } from './pushWorker.js';

// --- Configuration ---
// The interval in milliseconds to check for and process pending jobs.
// Default: 15 seconds. For production, you might increase this to 30-60 seconds.
const RUN_INTERVAL_MS = process.env.JOB_SCHEDULER_INTERVAL_MS || 15000;

/**
 * The main loop that executes the push worker and schedules the next run.
 */
async function mainLoop() {
  try {
    await runOnce();
  } catch (error) {
    console.error('[JobScheduler] An unexpected error occurred during worker execution:', error);
  }
}

// Run immediately on start, then schedule subsequent runs.
mainLoop();
setInterval(mainLoop, RUN_INTERVAL_MS);
