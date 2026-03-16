## Working Agreement
- CRITICAL: Codex is guidance-only by default for this project.
- CRITICAL: Codex must not edit files, apply patches, run project-changing commands, or make direct code changes unless Raul explicitly says to do so in that chat.
- CRITICAL: If there is any ambiguity, assume guidance-only and do not change code.
- Raul makes all final code decisions and applies all project changes.
- Raul enters all terminal/git commands.
- No prompting Raul to run commands unless Raul explicitly asks for command help.

## What We Completed This Session
1. Reviewed the current beta-readiness state and identified that the most important remaining technical risk is still fragile `localStorage` history loading.
2. Chose to keep the current Backspace behavior as-is for now instead of treating it as a blocker.
3. Decided to prioritize vocabulary/content work before feedback, history hardening, and domain work.
4. Refactored the inline `WORD_POOL` and `QUOTE_POOL` data out of `src/App.jsx` into separate data files.
5. Created `src/data/wordPool.js` for the word list.
6. Created `src/data/quotePool.js` for the quote list.
7. Updated `src/App.jsx` imports so the app now reads words and quotes from the new data files instead of storing that content directly in the main component.
8. Confirmed the refactor worked after resolving an import/path issue during setup.
9. Re-added the full quote list into `QUOTE_POOL` after initially only having a small subset in the new file.
10. Confirmed the app is currently loading and the import structure now looks correct.
11. Noted that a temporary crash/reload appeared to wipe prior local history, reinforcing that history storage is still a fragile part of the app.
12. Reviewed the current quote list and found a few text typos that still need cleanup.

## Current App Status
- Typing test still runs.
- Words mode and quote mode are both still wired correctly.
- Word and quote content now live outside `App.jsx`, which keeps the main component cleaner.
- `src/data/wordPool.js` is active and valid.
- `src/data/quotePool.js` is active and valid.
- Current quote pool contains the restored larger list.
- History is still stored in `localStorage`.
- History loading is still not protected against malformed saved data.
- The app appears stable again after the temporary import/crash issue.

## Content Notes
- Quote pool still has a few typos to fix:
  - `sheild` should be `shield`
  - `undrstanding` should be `understanding`
  - `better then gold` should be `better than gold`
- Raul may continue adding more words and quotes directly in the new data files.

## Product Direction
- Keep expanding the content pool now that the data is separated cleanly from the component.
- Continue using local-only history for now, but treat storage hardening as an upcoming stability task.
- Move toward beta by improving clarity and trust before adding larger features.
- Feedback collection is still the next major product addition after content work.

## Open Items / Next Steps
1. Finish expanding and cleaning the vocabulary and quote pools.
2. Fix the remaining quote typos in `src/data/quotePool.js`.
3. Add a feedback section so users can share thoughts, bugs, and suggestions.
4. Add a practical cap to saved history so `localStorage` does not grow forever.
5. Make history loading safer so malformed saved data cannot crash the app on load.
6. Choose and secure a domain name.
7. Lock the beta scope clearly:
   - words mode
   - quote mode
   - 30s / 60s
   - local history only
   - no accounts
   - no cloud sync

## Priority For Next Session
1. Finish content expansion first.
2. Add feedback collection next.
3. Harden local history storage after that.
4. Lock domain and beta scope once the product feels stable enough to share.

## Reminder For Future Chats
- Codex is only for guidance.
- Codex must make zero file changes unless Raul explicitly requests direct edits in that chat.
- Raul makes the changes, runs the commands, and decides what gets committed.
- Do not assume permission to edit just because a file is open or a task is described.
- No prompting Raul to run commands unless he explicitly asks for command help.
