import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import './App.css'
import ResultsSummary from './components/ResultsSummary'



//=========================
// CONSTANTS
// ========================//
const QUOTE_POOL = [
  'To direct your thoughts to what is said. To focus the mind on what happens and what makes it happen.',
  'So other people hurt me? That is their problem. Their character and actions are not mine. What is done to me is ordained by nature, what I do by my own.',
  'It is crazy to want what is impossible. And impossible for the wicked not to do so.',
  'To labor cheerfully and so endure, endure the wind that blows from heaven',
  'To love only what happens, what was destined. No greater harmony.',
  'Not a dancer but a wrestler: waiting, poised and dug in, for sudden assault.',
  'Never let loyalty and kindess leave you! Tie them around your neck as a reminder. Write them deep within your heart.',
  'Seek his will in all you do, and he will show you which path to take.',
  'Awaken; return to yourself. Now, no longer asleep, knowing they were only dreams, clear-headed again, treat everything around you as a dream.',
  'Fear of the Lord is the foundation of true knowledge, but fools despise wisdom and discipline.',
  'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
  'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
  'I can do all this through him who gives me strength.',
  'The wise inherit honor, but fools are put to shame.',
  'Let your wife be a fountain of blessing for you. Rejoice in the wife of your youth.',
  'Such is the fate of all who are greedy for money; it robs them of life.',  
  'Tune your ears to wisdom, and concentrate on understanding. Cry out for insight, and ask for understanding. Search for them as you would for silver; seek them like hidden treasures.',
]

const WORD_POOL = [
  'the','and','for','you','that','with','this','have','from','your',
  'will','what','when','where','how','why','can','could','should','would',
  'there','their','about','after','before','today','again','never','always','often',
  'time','year','week','day','night','home','work','school','place','world',
  'people','person','friend','family','child','group','name','word','line','part',
  'hand','head','face','eyes','mind','heart','life','body','food','water',
  'bread','table','room','door','light','sound','music','book','story','page',
  'good','best','better','right','wrong','true','kind','calm','safe','warm',
  'small','large','short','long','early','late','young','old','new','same',
  'make','take','give','help','keep','move','walk','read','write','learn',
  'start','begin','stop','finish','open','close','look','watch','think','know',
  'feel','hope','trust','smile','share','care','love','peace','grace','faith'
]



const WORDS_PER_LINE = 15
const COLOR_PENDING = '#109cb1'
const COLOR_CORRECT = '#1d1f1f'
const COLOR_ERROR = '#c03636'

//=========================
// HELPER FUNCTIONS
// ========================//

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
function generateQuoteText() {
  return QUOTE_POOL[Math.floor(Math.random() * QUOTE_POOL.length)]
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
  const [mode, setMode] = useState('words')
  const [renderWordIndex, setRenderWordIndex] = useState(WORDS_PER_LINE)
  const [text, setText] = useState(() => generateText())
  const [cursor, setCursor] = useState(0)
  const [typed, setTyped] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('peacekeys-history')
    return saved ? JSON.parse(saved) : []  
  })  
  
  const [resultSaved, setResultSaved] = useState(false)
  
  const inputRef = useRef(null)
  
   

// ===========================
// DERIVED VALUES (useMemo)
// ===========================  
  const { accuracy, wpm } = useMemo(() => {    
    const correctChars = typed.reduce(
      (count, char, i) => count + (char === text[i] ? 1 : 0),
      0
    )
    const totalAttempts = correctChars + mistakes    
    const accuracyLocal =
      totalAttempts > 0 ? Math.round((correctChars / totalAttempts) * 100) : 100

    const minutes = time / 60
    const wpmLocal =
      minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0

    return {      
      accuracy: accuracyLocal,
      wpm: wpmLocal,
    }
  }, [typed, text, time, mistakes])

  const { line1EndIndex, charsBeforeLine0, lineToRender } = useMemo(
    () => deriveVisibleLines(text, renderWordIndex),
    [text, renderWordIndex]
  )

  const recentRuns = history.slice(0, 15)

  const bestRun = history.reduce((best, run) => {
    if (!best || run.wpm > best.wpm) return run
    return best
  }, null)

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

  const sevenDayRuns = history.filter((run) => {
    return new Date(run.date).getTime() >= sevenDaysAgo
  })
  
  const sevenDayAverage =
    sevenDayRuns.length > 0
      ? {
          wpm: Math.round(
            sevenDayRuns.reduce((sum, run) => sum + run.wpm, 0) / sevenDayRuns.length
          ),
          accuracy: Math.round (
            sevenDayRuns.reduce((sum, run) => sum + run.accuracy, 0) / sevenDayRuns.length
          ),
          
      }
    : null 
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

  useEffect(() => {
    if (!isFinished || resultSaved) return

    const newRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      mode,
      duration,
      wpm,
      accuracy,
    }

    setHistory((prev) => {
      const updated = [newRecord, ...prev]
      localStorage.setItem('peacekeys-history', JSON.stringify(updated))
      return updated
    })

    setResultSaved(true)
  }, [isFinished, resultSaved, mode, duration, wpm, accuracy])

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
      
      if (e.key !== text[cursor]) {
        setMistakes((m) => m + 1)
      }

      
      setTyped((prev) => [...prev, e.key])
      setCursor((c) => {
        const next = c +1
        if (next >= text.length) {
          setIsRunning(false)
          setIsFinished(true)
        }
        return next
      })
    },
    [isFinished, isRunning, charsBeforeLine0, text, cursor]
  )

  const restartTest = useCallback((nextMode = mode) => {
    setTime(0)
    setResultSaved(false)
    setIsRunning(false)
    setIsFinished(false)
    setCursor(0)
    setTyped([])
    setMistakes(0)
    setRenderWordIndex(WORDS_PER_LINE)
    setText(nextMode === 'quotes' ? generateQuoteText() : generateText())    
  }, [mode])

  const handleModeChange = useCallback((nextMode) => {
    setMode(nextMode)
    restartTest(nextMode)
  }, [restartTest])
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
    
        {isRunning && (
          <div className="test-timer">
            Time: {duration -time}s
          </div>
        )}
      
        <section className={`history-panel ${isRunning ? 'history-hidden' : ''}`}>
          <h2>Stats</h2>

          <div className="top-stats-row">
            <div className="current-results-card">
              <ResultsSummary
                isFinished={isFinished}
                isRunning={isRunning}
                time={time}
                wpm={wpm}
                accuracy={accuracy}
                />
            </div>
          

            <div className="history-stats">
             <div className="history-stat-card">
               <span className="history-stat-label">Best WPM</span>
               <strong className="history-stat-value">
                  {bestRun ? bestRun.wpm : '--'}                
                </strong>
              </div>

             <div className="history-stat-card">
               <span className="history-stat-label">7-Day Avg</span>
                <strong className="history-stat-value">
                  {sevenDayAverage
                   ? `${sevenDayAverage.wpm} WPM / ${sevenDayAverage.accuracy}%`
                    : '--'}
                </strong>
              </div>
            </div>
          </div>
         

          { recentRuns.length === 0 ? (
              <p className="history-empty">No runs saved yet.</p>
          ) : (
            <ul className="history-list">
              {recentRuns.map((run) => (
                <li key={run.id} className="history-item">
                  <span className="history-mode">
                    {run.mode === 'quotes' ? 'Quote' : 'Word'}
                  </span>
                  <span>{run.duration}s</span>
                  <span>{run.wpm} WPM</span>
                  <span>{run.accuracy}%</span>
                  <span>{new Date(run.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      
        <div className="controls">
          {!isRunning && (
            <>
              <button 
                className={mode === 'words' ? 'is-active' : ''}
                onClick={() => handleModeChange('words')}
              >
                Word Mode
              </button>
                         
                
              <button 
                className={mode === 'quotes' ? 'is-active' : ''}
                 onClick={() => handleModeChange('quotes')}
              >
                Quote Mode
              </button>
              <button onClick={() => restartTest() || setDuration(30)}>30s</button>
              <button onClick={() => restartTest() || setDuration(60)}>60s</button>
            </>
          )}

          <button onClick={() => restartTest()}>Restart</button>
        </div>
      </div>
    </div>
  )
}

export default App
