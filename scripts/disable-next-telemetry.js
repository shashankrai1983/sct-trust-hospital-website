// scripts/disable-next-telemetry.js
/**
 * Purpose:
 *  Force-disables Next.js telemetry during build and other scripts by setting
 *  process.env.NEXT_TELEMETRY_DISABLED = '1' early and logging confirmation.
 *  This guards against shell/env propagation issues that can trigger the
 *  "Telemetry is not a constructor" error with certain Node/Next combos.
 *
 * Notes:
 *  - Safe for local and CI usage.
 *  - Does not get bundled.
 *  - Keep this script small and dependency-free.
 */

try {
  process.env.NEXT_TELEMETRY_DISABLED = '1';
  // Also ensure no legacy variable names are used by upstream wrappers.
  process.env.NEXT_TELEMETRY_DISABLED_FORCED = '1';

  // Optional hardening: unset any internal Next telemetry flags if present.
  delete process.env.__NEXT_TELEMETRY_DISABLED; // defensive
  delete process.env.__NEXT_TELEMETRY_DEBUG;    // defensive

  // Emit a single-line confirmation to help troubleshooting.
  console.log('[Build Guard] NEXT_TELEMETRY_DISABLED=1 enforced before Next build.');
} catch (err) {
  console.error('[Build Guard] Failed to enforce telemetry disable:', err);
  // Do not exit with failure; allow build to continue in case this guard is not the root cause.
}
