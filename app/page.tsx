"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RetroMonitor() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [isTypingQuestion, setIsTypingQuestion] = useState(true)
  const [currentText, setCurrentText] = useState("")

  // Use a ref to track if component is mounted
  const isMounted = useRef(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const questions = [
    {
      question: "How do you measure success?",
      choices: [
        "Achievement of goals",
        "Happiness and fulfillment",
        "Positive impact on others",
        "Balance in all areas of life",
      ],
      responses: [
        "Setting and reaching meaningful goals provides direction and a sense of accomplishment. Each milestone becomes a stepping stone to greater heights.",
        "True success might be measured by the joy we experience along the journey, not just at the destination. A life rich in meaningful moments is a successful one.",
        "Perhaps we are most successful when we lift others up, when our presence makes the world a little better for those around us.",
        "Success may lie in harmonizing the various aspects of our existence - work, relationships, health, and personal growth - so that none is neglected.",
      ],
    },
    {
      question: "What is the nature of happiness?",
      choices: [
        "A temporary feeling",
        "A choice we make daily",
        "The absence of suffering",
        "A byproduct of meaning",
      ],
      responses: [
        "Like all emotions, happiness comes and goes. Its transient nature makes it precious, something to be savored rather than clung to.",
        "Perhaps happiness is less about circumstances and more about perspective - a lens through which we choose to view our experiences.",
        "Some philosophies suggest that reducing our desires and attachments leads to contentment. When we expect less, we suffer less.",
        "Meaningful pursuits often generate happiness as a side effect. When we are engaged in something larger than ourselves, joy frequently follows.",
      ],
    },
  ]

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Start typing when question changes
  useEffect(() => {
    setCurrentText(questions[currentQuestionIndex].question)
    setIsTypingQuestion(true)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentQuestionIndex])

  // Effect to handle the typewriter animation
  useEffect(() => {
    if (!currentText) return

    let i = 0
    setTypedText("")
    setTypingComplete(false)

    function typeCharacter() {
      if (!isMounted.current) return

      if (i < currentText.length) {
        setTypedText(currentText.substring(0, i + 1))
        i++
        timeoutRef.current = setTimeout(typeCharacter, 50)
      } else {
        setTypingComplete(true)
      }
    }

    // Start typing with a small delay
    timeoutRef.current = setTimeout(typeCharacter, 100)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentText])

  const handleChoiceClick = (choice: string) => {
    const responseIndex = questions[currentQuestionIndex].choices.indexOf(choice)
    const responseText = questions[currentQuestionIndex].responses[responseIndex]

    setIsTypingQuestion(false)
    setCurrentText(responseText)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-[0_0_20px_8px_rgba(255,170,0,0.15)] border-4 border-gray-700">
          <div className="bg-black rounded relative overflow-hidden p-6 min-h-[500px] flex flex-col">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(circle,rgba(255,170,0,0.5)_0%,rgba(0,0,0,0)_70%)]" />
            <div className="absolute inset-0 pointer-events-none opacity-5 animate-pulse bg-[radial-gradient(circle,rgba(255,170,0,0.7)_0%,rgba(0,0,0,0)_60%)]" />

            <div className="text-amber-500/80 mb-4 font-mono text-sm">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>

            <div className="font-mono text-xl mb-6 flex-grow">
              <p className="typewriter-text text-amber-300/90">{typedText}<span className="cursor text-amber-400 animate-pulse">▌</span></p>
            </div>

            {isTypingQuestion && typingComplete && (
              <div className="space-y-3 font-mono">
                {questions[currentQuestionIndex].choices.map((choice, index) => (
                  <div key={index} onClick={() => handleChoiceClick(choice)}
                    className="p-2 border border-amber-700/70 rounded cursor-pointer hover:bg-amber-900/20 transition-colors">
                    <p className="choice-text text-amber-300/90"><span className="text-amber-500">{String.fromCharCode(65 + index)}.</span> {choice}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-6 font-mono">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length)}
                className="nav-button flex items-center text-amber-300/90 border border-amber-700/70 px-3 py-1 rounded hover:bg-amber-900/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1 text-amber-500" /> Prev
              </button>

              <button
                onClick={() => setCurrentQuestionIndex((prev) => (prev + 1) % questions.length)}
                className="nav-button flex items-center text-amber-300/90 border border-amber-700/70 px-3 py-1 rounded hover:bg-amber-900/20 transition-colors"
              >
                Next <ChevronRight className="w-4 h-4 ml-1 text-amber-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

