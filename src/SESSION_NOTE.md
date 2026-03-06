# PeaceKeys Session Note (Updated)

Date: 2026-03-04

## Working Agreement
- Raul makes all final code decisions and applies all project changes.
- Codex is guidance-only unless Raul explicitly asks for direct edits.
- Raul enters all terminal/git commands.

## Current State
- Repo (source of truth): `https://github.com/RaulRod123/peacekeys`
- Live app: `https://peacekeys-raul.vercel.app/`
- Deployment: Vercel should be connected to GitHub repo `RaulRod123/peacekeys` on branch `main`.
- Project status: public beta/work-in-progress and shareable.

## What We Completed This Session
1. Confirmed performance/responsiveness felt good from shared-user feedback.
2. Added Quote Mode MVP in `src/App.jsx`.
3. Added mode toggle buttons: `Word Mode` and `Quote Mode`.
4. Fixed mode switching so each button loads the correct pool immediately.
5. Added active mode highlight styling in `src/App.css`.
6. Fixed restart behavior so `Restart` keeps current mode (does not force Word Mode).
7. Added end-of-quote behavior so test finishes when quote text is completed.
8. Resolved git push/rebase flow and verified clean/synced repo state.
9. Resolved deployment confusion by standardizing on repo `RaulRod123/peacekeys`.

## Active Workflow (Keep)
1. Develop locally in VS Code.
2. Test locally (`npm run dev`).
3. Commit and push from `main`.
4. Verify update on live URL after Vercel deploy.

## Pre-Push Safety Check (Use Every Time)
```powershell
git fetch origin
git status -sb
git remote -v
git log --oneline --decorate -5
git push origin main

## Progress Update (2026-03-06)

### Completed
1. Finalized scoring model simplification in `src/App.jsx`.
2. Removed `attempts` / `errors` state and related update/reset logic.
3. Accuracy now calculates from current typed result only: `correctChars / typed.length`.
4. WPM now calculates from correct characters only: `(correctChars / 5) / minutes`.
5. Preserved existing mode switching, restart behavior, and quote completion behavior.

### Decision
- Beta metrics for now are only:
  - Accuracy
  - WPM
- No raw input counters or error display in this phase.

### Next Steps (Beta Path)
1. Build History MVP (localStorage first):
   - Save one record on test completion: date, mode, duration, wpm, accuracy.
   - Add simple history UI (recent runs + personal best + 7-day average).
2. Keep UX stable while adding history:
   - Ensure record saves once per finished run.
   - Ensure restart/mode change does not create duplicate entries.
3. After History MVP, evaluate progression layer:
   - streaks, “beat last run”, mode-specific bests.


## you are only for guidance!! I will make all the commands. No more prompting to run commands