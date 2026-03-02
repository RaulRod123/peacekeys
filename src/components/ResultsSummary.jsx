import { memo } from 'react'

const ResultsSummary = memo(function ResultsSummary({
  isFinished,
  isRunning,
  time,
  wpm,
  accuracy,
}) {
  const isPerfectResult = isFinished && accuracy === 100

  return (
    <div className={`stats ${isFinished ? 'results-visible' : ''}`}>
        <div className="stats-row">
          <span>Time: {time}s</span>

          {(!isRunning || isFinished) && (
            <>
            <span>WPM: {wpm}</span>
            <span className={isPerfectResult ? 'perfect-result' : ''}>
              Accuracy: {accuracy}%
              </span>
          </>
        )}
      </div>

      {isPerfectResult && (
        <div className="perfect-badge" role="status" aria-live="polite">
          Perfect Accuracy!
        </div>
      )}
    </div>
  )
})

export default ResultsSummary
