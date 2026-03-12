## Working Agreement
- CRITICAL: Codex is guidance-only by default for this project.
- CRITICAL: Codex must not edit files, apply patches, run project-changing commands, or make direct code changes unless Raul explicitly says to do so in that chat.
- CRITICAL: If there is any ambiguity, assume guidance-only and do not change code.
- Raul makes all final code decisions and applies all project changes.
- Raul enters all terminal/git commands.
- No prompting Raul to run commands unless Raul explicitly asks for command help.

## What We Completed This Session
1. Continued polishing the History/Stats area in `src/App.jsx` and `src/App.css`.
2. Renamed the visible History section heading to `Stats`.
3. Kept local history behavior in place using `localStorage`; saved runs still persist across refreshes for each user in their own browser.
4. Added an empty-state message path for no saved runs: `No runs saved yet.`
5. Moved `ResultsSummary` into the stats panel so results and long-term stats can live in one surface.
6. Removed the timer from `src/components/ResultsSummary.jsx` so the results card focuses on WPM and Accuracy.
7. Added a separate timer above the stats panel in `src/App.jsx` that appears during the test.
8. Restored the blur-based post-test behavior for the typing box instead of removing the typing area entirely.
9. Brought back hidden-during-test behavior for the stats panel using the `history-hidden` class so the layout can reserve space while the test is active.
10. Widened the stats panel in `src/App.css` to make room for both current results and derived stats.
11. Added layout hooks/classes for the combined top row:
   - `top-stats-row`
   - `current-results-card`
12. Softened the old `results-visible` effect so results stay inside the box instead of visually jumping out.
13. Confirmed current focus is desktop-first polish, not mobile-first refinement.

## Current App Status
- Typing test still runs normally.
- Test completion still works.
- History records are saving to `localStorage`.
- Stats panel now acts as a combined stats/results surface.
- Timer is intended to show during the test above the stats area.
- Typing box remains on screen and uses the blurred finished state.
- Layout polish is in progress; current work is focused on reducing movement and improving clarity.

## Open Polish Items For Next Session
1. Refine `.test-timer` spacing and centering so it does not push controls down during the test.
2. Finalize styling for:
   - `.top-stats-row`
   - `.current-results-card`
   - `.stats`
   - `.stats-row`
3. Decide whether recent runs should show `3` or `5` items.
4. Confirm the stats panel hides during active typing without causing noticeable layout jump.
5. Do a visual cleanup pass so the Stats area matches the rest of the app.

## Reminder For Future Chats
- Codex is only for guidance.
- Codex must make zero file changes unless Raul explicitly requests direct edits in that chat.
- Raul makes the changes, runs the commands, and decides what gets committed.
- Do not assume permission to edit just because a file is open or a task is described.
- No prompting Raul to run commands unless he explicitly asks for command help.
