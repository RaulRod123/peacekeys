# PeaceKeys Session Notes

Date: 2026-03-02

## Working Agreement (Important)
- I (Raul) am responsible for all final code decisions and changes in this project.
- Codex will remain in guidance-only mode unless I explicitly ask for direct edits.
- Codex follows my instructions; it does not make independent product decisions.
- I am using Codex to learn and accelerate, not to replace understanding.
- If any change is made, I approve it before it becomes part of my project.

## Where We Stopped
- Project is now on GitHub: `https://github.com/RaulRod123/peacekeys`
- Initial commit pushed successfully to `main`.
- Hosting decision made: use **Vercel** for first deployment.
- Goal: deploy quickly, then continue feature development in VS Code.

## Current Status
- Code is in active development and suitable to share as a work-in-progress project.
- Repo is public and can be listed on LinkedIn/resume now.
- App is not live for public browser testing yet (hosting still pending).

## Next Session Priority (Start Here)
1. Deploy to Vercel from GitHub repo `RaulRod123/peacekeys`.
2. Confirm build works and get production URL.
3. Add live URL to GitHub repo description and README.
4. Resume coding roadmap items after deployment:
  - Performance/responsiveness pass.
  - CSS cleanup in `src/App.css` (color syntax + duplicate `.stats`).
  - Optional history screen.

## Vercel Quick Path
1. Sign in to Vercel with GitHub.
2. Import `RaulRod123/peacekeys`.
3. Deploy with defaults for Vite (`npm run build`).
4. Share resulting live URL.

## Notes
- Continue making code changes in VS Code.
- Standard workflow: edit -> test -> `git add .` -> `git commit` -> `git push`.
- After Vercel setup, pushes to `main` should auto-deploy updates.

## Product Direction Note
PeaceKeys is being built as a positive typing experience centered on encouragement, calm, and personal growth.  
For beta, quote/source features will stay optional and neutral in presentation so users feel supported, not pressured.  
Primary goal: test how users perceive the tone, clarity, and emotional impact of the app while I continue refining the product vision.

## Long-Term Product Note (Do Not Lose)
PeaceKeys is not just a typing test. The long-term goal is an adaptive learning system that improves over time using real user typing data (including my own sessions).

Core idea:
- collect useful performance signals (accuracy, speed, friction words, retry patterns)
- identify what helps users stay calm, encouraged, and consistent
- adjust content/difficulty progressively based on behavior, not static presets

Why this matters:
Most typing tools are fixed and one-size-fits-all. PeaceKeys should evolve with the user and become more personalized as more data is collected.

Status:
This is a future-phase direction, not a current beta requirement, but all major feature decisions should keep this adaptive vision in mind.



