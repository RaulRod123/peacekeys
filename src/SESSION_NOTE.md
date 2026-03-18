## Working Agreement
- CRITICAL: Codex is guidance-only by default for this project.
- CRITICAL: Codex must not edit files, apply patches, run project-changing commands, or make direct code changes unless Raul explicitly says to do so in that chat.
- CRITICAL: If there is any ambiguity, assume guidance-only and do not change code.
- Raul makes all final code decisions and applies all project changes.
- Raul enters all terminal/git commands.
- No prompting Raul to run commands unless Raul explicitly asks for command help.

## What We Completed This Session
1. Reviewed the previous session note and confirmed the next focus was quote repetition, quote attribution polish, and quote metadata cleanup.
2. Confirmed Vercel is connected to the custom domain and the site is live.
3. Improved quote randomization in `App.jsx` so quote mode avoids recently used quotes instead of repeating too closely.
4. Fixed quote-mode issues caused during the randomization update:
   - blank screen from outdated function usage
   - quote restart logic issues
   - recent quote tracking being saved incorrectly
5. Confirmed quote mode, word mode, restart, 30s, and 60s are all working again.
6. Updated finished quote attribution layout so it displays horizontally.
7. Updated attribution display so:
   - `Source:` appears on the left
   - `Author:` appears on the right
   - labels still show even when metadata is blank
8. Improved quote attribution CSS so the finished quote section feels more intentional.
9. Cleaned up a large portion of quote metadata in `src/data/quotePool.js`.
10. Separated many quote sources more clearly, especially between:
   - `Meditations`
   - `Proverbs`
   - `Psalms`
   - `Philippians`

## Current App Status
- Typing test still runs.
- Words mode and quote mode are still active.
- 30s and 60s are still active.
- Restart is working.
- Feedback still appears only after a finished test.
- Feedback is still sent privately through Formspree.
- Quote mode uses structured quote objects instead of plain strings.
- Quote attribution appears only after the quote test is finished.
- Quote attribution now shows labeled `Source:` and `Author:` fields.
- Quote repetition has been reduced by avoiding recently used quotes.
- Typing history is being saved to IndexedDB.
- The site is live on the connected custom domain.

## Known Issues / Cleanup Items
- `Stoic Mode` is now misleading because quote content includes more than stoic material.
- Some quote metadata may still need verification or refinement.
- `currentQuote` initialization may still be using a simpler starting value than the newer anti-repeat quote picker.
- History persistence may still be inconsistent across some restarts and should be rechecked later.
- `handleFeedbackSubmit` still has product copy and error-message cleanup potential.
- The feedback error message is currently used for both:
  - empty message validation
  - submission failure
- `quotePool.js` could be organized more clearly into grouped sections for easier maintenance.

## Product Direction
- Keep typing result history local-only for beta.
- Keep feedback private through Formspree so only Raul can review submissions.
- Continue improving trust, clarity, and polish before larger feature expansion.
- Keep quote attribution/source support as part of the product direction.
- Revisit naming and tone now that quote sources are broader than stoicism alone.
- Treat the current build as a stronger beta checkpoint now that quote presentation feels more complete.

## Open Items / Next Steps
1. Revisit the label `Stoic Mode` and rename it to better match the broader quote pool.
2. Organize `src/data/quotePool.js` into cleaner source-based sections.
3. Finish reviewing any remaining quote metadata for consistency and accuracy.
4. Decide whether quote categories should stay mixed or become selectable later.
5. Sanity-check IndexedDB history persistence again after normal restarts.
6. Clean up feedback copy and separate empty-message errors from submission-failure errors.
7. Continue beta polish based on real user feedback from the live site.

## Priority For Next Session
1. Rename `Stoic Mode` if a better label is chosen.
2. Organize the quote pool for cleaner maintenance.
3. Recheck IndexedDB history persistence.
4. Clean up feedback wording and error states.
5. Continue domain and beta polish based on actual use.

## Reminder For Future Chats
- CRITICAL: Codex is guidance-only unless Raul explicitly gives permission in that chat to make changes.
- Raul makes the changes, runs the commands, and decides what gets committed.
- Do not assume permission to edit just because a task is described.
- No prompting Raul to run commands unless he explicitly asks for command help.

## Permanent Product Note
- CRITICAL: Long term, PeaceKeys is not just a typing test. The product direction includes turning user typing data into a personal performance dashboard for registered users.
- The future dashboard should help each user understand their own typing performance in a more meaningful and motivating way, similar to a polished business presentation but personalized to them.
- The long-term goal is to show:
  - personal typing metrics and progress over time
  - trends, patterns, and improvement areas
  - benchmark comparisons against other users
  - comparisons by region, age range, sex, and other relevant demographic groupings if implemented ethically and clearly
  - charts, graphs, and visual summaries that feel closer to Tableau-style reporting than a simple stats page
  - scenario exploration or “what-if” views for performance goals and improvement planning
- Future account-based product work should keep this analytics/dashboard direction in mind when making decisions about data structure, history storage, metrics, and feature design.
- For now, beta remains focused on trust, usability, content quality, local history, and product polish before expanding into full accounts, dashboards, and broader analytics.
- CRITICAL: A future goal is to create an AI-guided personal typing coach for each user.
- The purpose is not just to measure typing speed, but to help users type more clearly, confidently, and effectively over time.
- Benchmarking should feel motivating rather than discouraging.
- Peer comparisons may be more useful when grouped by factors such as age, region, experience level, or other relevant segments, so users can compare themselves to people at a more relatable level.
- The product should support two kinds of motivation:
  - competitive motivation
  - improvement motivation
- Long-term coaching should help users learn from patterns in their own data and from the performance of similar user groups, while keeping the experience encouraging and personal.
