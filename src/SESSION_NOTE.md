## Working Agreement
- CRITICAL: Codex is guidance-only by default for this project.
- CRITICAL: Codex must not edit files, apply patches, run project-changing commands, or make direct code changes unless Raul explicitly says to do so in that chat.
- CRITICAL: If there is any ambiguity, assume guidance-only and do not change code.
- Raul makes all final code decisions and applies all project changes.
- Raul enters all terminal/git commands.
- No prompting Raul to run commands unless Raul explicitly asks for command help.

## What We Completed This Session
1. Reviewed the current beta-readiness priorities and chose to focus on feedback collection first.
2. Added feedback state into `src/App.jsx`.
3. Added a feedback form UI to the app.
4. Moved the feedback panel so it only appears after a completed typing test.
5. Changed the feedback panel to a floating card in the top-right corner.
6. Fixed multiple JSX/CSS issues while wiring the feedback panel:
   - missing fragment close in controls
   - `className` typo
   - `onChange` typo
   - CSS selector typos
   - floating panel styling issues
7. Prevented the feedback panel from conflicting with the app-wide click-to-focus behavior by stopping click propagation on the panel.
8. Switched feedback submission from localStorage to Formspree.
9. Confirmed that completed test feedback is now being received in Formspree.

## Current App Status
- Typing test still runs.
- Words mode and quote mode are still active.
- 30s and 60s are still active.
- Local history is still being saved for typing test results.
- Feedback now appears only after a finished test.
- Feedback is now sent privately through Formspree instead of being stored locally.
- Floating feedback panel is currently positioned in the top-right corner.
- Feedback submissions are currently working.

## Known Issues / Cleanup Items
- `handleFeedbackSubmit` still has a request header typo:
  - `'Content-Type': 'application/join'` should be `'application/json'`
- ESLint still reports one issue:
  - `catch (error)` is unused and should be changed to `catch {` or `catch (_error)`
- History loading is still fragile:
  - `JSON.parse(saved)` is unguarded for `peacekeys-history`
- History saving is still uncapped:
  - saved run history can grow forever in localStorage
- Feedback no longer needs localStorage, so the old local feedback storage approach is no longer part of the product direction

## Product Direction
- Keep typing result history local-only for beta.
- Keep feedback private through Formspree so only Raul can review submissions.
- Improve stability and trust before adding larger features.
- Next major content/product improvement after storage hardening is quote attribution and source credit.

## Open Items / Next Steps
1. Fix the Formspree request header typo in `src/App.jsx`.
2. Fix the lint error caused by the unused `catch (error)` variable.
3. Harden local history loading so malformed saved data cannot crash the app.
4. Add a practical cap to saved typing history in localStorage.
5. Convert quote data from plain strings into structured objects.
6. Add quote attribution fields such as:
   - `text`
   - `author`
   - `source`
7. Update the UI so quote sources/authors can be shown clearly.
8. Revisit wording for `Stoic Mode` since the quote pool now includes multiple source types.
9. Continue domain/beta polish later after storage and attribution are in a better place.

## Priority For Next Session
1. Fix the small Formspree cleanup items:
   - content-type typo
   - unused catch variable
2. Harden local history storage next.
3. Add quote attribution/source support after that.
4. Revisit wording/polish once those are stable.

## Reminder For Future Chats
- Codex is only for guidance unless Raul explicitly asks for direct edits in that chat.
- Raul makes the changes, runs the commands, and decides what gets committed.
- Do not assume permission to edit just because a file is open or a task is described.
- No prompting Raul to run commands unless he explicitly asks for command help.
