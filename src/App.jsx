import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import './App.css'
import ResultsSummary from './components/ResultsSummary'


//=========================
// CONSTANTS
// ========================//
const WORD_POOL = [
  'peace',
  'kind',
  'words',
  'wisdom',
  'gentle',
  'truth',
  'faith',
  'make',
  'well',
  'for',
  'plan',
  'do',
  'same',
  'fact',
  'begin',
  'need',
  'call',
  'place',
  'give',
  'part',
  'this',
  'also',
  'but',
  'or',
  'and',
  'cool',
  'mercy',
  'humble',
  'calm',
  'hope',
  'grace',
  'love',
  'joy',
  'serene',
  'kindness',
  'patience',
  'harmony',
]

const WORDS_PER_LINE = 8
const COLOR_PENDING = '#109cb1'
const COLOR_CORRECT = '#1d1f1f'
const COLOR_ERROR = '#c03636'

//=========================
// HELPER FUNCTIONS
// ========================//

/*function getRandomWordExcept(except) {
  let word
  do {
    word = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]
  } while (word === except)
  return word
}
*/
function generateText(length = 200) {
  const words = []
  for (let i = 0; i < length; i++) {
    const prev = i === 0 ? null : words[i - 1]
    const prev2 = i <= 1 ? null : words[i - 2]

    let next
    do {
      next = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]
    } while (next === prev || next === prev2)

    words.push(next)
  }
  return words.join(' ')
}

function isTypingKey(key) {
  return key.length === 1 || key === 'Backspace'
}

function deriveVisibleLines(text, currentWordIndex) {
  const words = text.split(' ')

  const charsBeforeLine1 =
    words.slice(0, currentWordIndex).join(' ').length +
    (currentWordIndex > 0 ? 1 : 0)

  const line1 = words
    .slice(currentWordIndex, currentWordIndex + WORDS_PER_LINE)
    .join(' ')

  const line2 = words
    .slice(
      currentWordIndex + WORDS_PER_LINE,
      currentWordIndex + WORDS_PER_LINE * 2
    )
    .join(' ')

  const line0 = words
    .slice(currentWordIndex - WORDS_PER_LINE, currentWordIndex)
    .join(' ')

  const line1EndIndex = charsBeforeLine1 + line1.length
  const charsBeforeLine0 =
    charsBeforeLine1 - (line0.length > 0 ? line0.length + 1 : 0)

  return {
    line1EndIndex,
    charsBeforeLine0,
    lineToRender: [
      { text: line0, start: charsBeforeLine0 },
      { text: line1, start: charsBeforeLine1 },
      { text: line2, start: line1EndIndex + 1 },
    ],
  }
}

//=========================
// UI SUBCOMPONENTS
// ========================//
const TypingLines = memo(function TypingLines({ lineToRender, cursor, typed, isFinished }) {
  return (
    <div className={`typing-box ${isFinished ? 'typing-finished' : ''}`}>
      {lineToRender.map((lineObj, lineIdx) => {
        const lineStart = lineObj.start
        const line = lineObj.text

        return (
          <div
            key={lineIdx}
            className={`line ${
              cursor >= lineStart && cursor <= lineStart + line.length
                ? 'line-active'
                : lineIdx === 0
                ? 'line-prev'
                : 'line-next'
            }`}
          >
            {line.split('').map((char, i) => {
              const index = lineStart + i

              let color = COLOR_PENDING
              if (index < typed.length) {
                color = typed[index] === char ? COLOR_CORRECT : COLOR_ERROR
              }

              const textDecoration = index === cursor ? 'underline' : 'none'

              return (
                <span key={i} style={{ color, textDecoration }}>
                  {char}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
})
//=========================
// MAIN COMPONENT
// ========================//
function App() {
  // ===========================
  // STATE
  // ===========================
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(60)
  const [isFinished, setIsFinished] = useState(false)
  const [renderWordIndex, setRenderWordIndex] = useState(WORDS_PER_LINE)
  const [text, setText] = useState(() => generateText(200))
  const [cursor, setCursor] = useState(0)
  const [typed, setTyped] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [errors, setErrors] = useState(0)
  const inputRef = useRef(null)

// ===========================
// DERIVED VALUES (useMemo)
// ===========================  
  const { accuracy, wpm } = useMemo(() => {
    const totalTypedLocal = typed.length
    const correctChars = typed.reduce(
      (count, char, i) => count + (char === text[i] ? 1 : 0),
      0
    )
    

    const accuracyLocal =
      attempts > 0 ? Math.round((correctChars / attempts) * 100) : 100

    const minutes = time / 60
    const wpmLocal =
      minutes > 0 ? Math.round((totalTypedLocal / 5) / minutes) : 0

    return {      
      accuracy: accuracyLocal,
      wpm: wpmLocal,
    }
  }, [typed, text, attempts, time])

  const { line1EndIndex, charsBeforeLine0, lineToRender } = useMemo(
    () => deriveVisibleLines(text, renderWordIndex),
    [text, renderWordIndex]
  )
// ===========================
// EFFECTS
// ===========================
  useEffect(() => {
    if (cursor > line1EndIndex) {
      setRenderWordIndex((prev) => prev + WORDS_PER_LINE)
    }
  }, [cursor, line1EndIndex])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (time >= duration && isRunning) {
      setIsRunning(false)
      setIsFinished(true)
    }
  }, [time, duration, isRunning])

  useEffect(() => {
    if (!isRunning) return
    if (accuracy < 15 && wpm > 150) {
      setIsRunning(false)
      setIsFinished(true)
    }
  }, [accuracy, wpm, isRunning])

  // ===========================
  // HANDLERS / ACTIONS
  // ===========================

  const handleKeyDown = useCallback(
    (e) => {
      if (isFinished) return
      if (!isTypingKey(e.key)) return

      if (!isRunning) setIsRunning(true)

      if (e.key === 'Backspace') {
        e.preventDefault()

        setCursor((c) => {
          const next = Math.max(charsBeforeLine0, c - 1)
          setTyped((prev) => prev.slice(0, next))
          return next
        })

        return
      }

      e.preventDefault()
      const expectedChar = text[cursor]
      setAttempts((a) => a + 1)

      if (e.key !== expectedChar) {
        setErrors((prev) => prev + 1)
      }

      setTyped((prev) => [...prev, e.key])
      setCursor((c) => c + 1)
    },
    [isFinished, isRunning, charsBeforeLine0, text, cursor]
  )

  const restartTest = useCallback(() => {
    setTime(0)
    setIsRunning(false)
    setIsFinished(false)
    setCursor(0)
    setTyped([])
    setRenderWordIndex(WORDS_PER_LINE)
    setText(generateText())
    setAttempts(0)
    setErrors(0)
  }, [])
// ===========================
// RENDER
// ===========================
  return (
    <div className="app" onClick={() => inputRef.current?.focus()}>
      <div className="container">
        <h1 className="title">PeaceKeys</h1>

        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="hidden-input"
        />

        <TypingLines
          lineToRender={lineToRender}
          cursor={cursor}
          typed={typed}
          isFinished={isFinished}
        />

        <ResultsSummary
          isFinished={isFinished}
          isRunning={isRunning}
          time={time}
          wpm={wpm}
          accuracy={accuracy}
        />

        <div className="controls">
          {!isRunning && (
            <>
              <button onClick={() => restartTest() || setDuration(30)}>30s</button>
              <button onClick={() => restartTest() || setDuration(60)}>60s</button>
            </>
          )}

          <button onClick={restartTest}>Restart</button>
        </div>
      </div>
    </div>
  )
}

export default App
