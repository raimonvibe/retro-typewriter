"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RetroMonitor() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [isTypingQuestion, setIsTypingQuestion] = useState(true)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  // Use refs to prevent issues with stale closures
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)

  const questions = [
    {
      question: "What is the most important thing in life?",
      choices: [
        "Love and relationships",
        "Personal growth and learning",
        "Making a difference in the world",
        "Finding happiness and contentment",
      ],
      responses: [
        "The connections we form with others give our lives meaning and purpose. Through love, we experience the deepest joys and learn our most profound lessons.",
        "Life is a journey of continuous growth. Each challenge we face and lesson we learn shapes who we become and expands our understanding of ourselves and the world.",
        "Our actions ripple outward in ways we may never fully comprehend. The positive impact we have on others and our environment may be our most enduring legacy.",
        "Perhaps the ultimate goal is simply to find peace within ourselves - to accept what we cannot change and to appreciate the beauty in each moment.",
      ],
    },
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
      choices: ["A temporary feeling", "A choice we make daily", "The absence of suffering", "A byproduct of meaning"],
      responses: [
        "Like all emotions, happiness comes and goes. Its transient nature makes it precious, something to be savored rather than clung to.",
        "Perhaps happiness is less about circumstances and more about perspective - a lens through which we choose to view our experiences.",
        "Some philosophies suggest that reducing our desires and attachments leads to contentment. When we expect less, we suffer less.",
        "Meaningful pursuits often generate happiness as a side effect. When we are engaged in something larger than ourselves, joy frequently follows.",
      ],
    },
     {
      question: "What does freedom mean to you?",
      choices: [
        "Being able to choose your own path",
        "Inner peace and independence",
        "Breaking free from expectations",
        "Exploring the world without limits",
      ],
      responses: [
        "Freedom begins with the ability to choose your own direction, even when the way is unclear.",
        "True freedom comes from within. It's the peace of knowing you are enough, just as you are.",
        "We become truly free when we stop living to meet others' expectations and start living authentically.",
        "The world is full of wonder. Freedom means embracing curiosity and letting it guide you.",
      ],
    },
    {
      question: "What gives life meaning?",
      choices: [
        "Connection with others",
        "Faith or spirituality",
        "Passion and creativity",
        "Helping where it's needed",
      ],
      responses: [
        "In the mirror of another’s heart, we find our own. Meaning is born in connection.",
        "Believing in something greater than yourself can offer direction, comfort, and purpose.",
        "When we create, we express the soul. Passion brings color to our lives and purpose to our days.",
        "To serve is to matter. Each act of kindness becomes part of a greater story.",
      ],
    },
    {
      question: "How do you handle adversity?",
      choices: [
        "By learning and growing",
        "By feeling my emotions",
        "By asking for help",
        "By putting things into perspective",
      ],
      responses: [
        "Every hardship holds a seed of transformation. Growth often begins outside our comfort zone.",
        "Healing starts when we let ourselves feel. Emotion is a bridge to understanding.",
        "There’s strength in seeking support. We rise higher when we lift each other.",
        "Perspective softens pain. Even this moment, too, shall pass.",
      ],
    },
    {
      question: "What does love mean to you?",
      choices: [
        "Unconditional acceptance",
        "Deep connection",
        "Selfless giving",
        "Opening your heart",
      ],
      responses: [
        "Love is not a transaction; it’s a decision to stay present, even when it’s difficult.",
        "Love is the sacred thread that ties souls together — built on trust, time, and vulnerability.",
        "Love lives in the small acts of care — a shared meal, a quiet presence, a gentle word.",
        "To love is to risk, but also to be seen, truly and fully.",
      ],
    },
    {
      question: "What is your relationship with time?",
      choices: [
        "I try to make the most of every second",
        "I often feel rushed",
        "I try to live in the present",
        "I reflect on the past a lot",
      ],
      responses: [
        "Time is precious, and intentional living honors its fleeting nature.",
        "When time pressures us, perhaps it's time to pause and reclaim stillness.",
        "The present moment is all we truly have. Peace lives in the now.",
        "The past teaches, but does not define. We can remember and still move forward.",
      ],
    },
    {
      question: "Where do you find your strength?",
      choices: [
        "My faith or beliefs",
        "My relationships",
        "My life experiences",
        "My inner voice",
      ],
      responses: [
        "Faith can be a steady anchor — a light that endures in stormy seas.",
        "Love is a source of resilience. With support, we are stronger than we know.",
        "Each challenge I’ve faced has shaped me. My strength is lived, not imagined.",
        "My intuition whispers truth. When I quiet the noise, I hear it clearly.",
      ],
    },
    {
      question: "How do you find balance in life?",
      choices: [
        "By setting clear boundaries",
        "By taking time to rest",
        "By managing my energy",
        "By focusing on what matters",
      ],
      responses: [
        "Boundaries protect our peace. They are an act of self-respect, not separation.",
        "Rest is not a luxury — it’s a rhythm. In stillness, we return to ourselves.",
        "Energy is sacred. Where we place it determines how we feel.",
        "Less is more when it’s aligned. Simplicity often reveals what truly matters.",
      ],
    },
    {
      question: "What does long-term success mean to you?",
      choices: [
        "Living a fulfilled life",
        "Leaving something behind for others",
        "Finding inner peace",
        "Inspiring those around me",
      ],
      responses: [
        "Success is living in alignment with what you value, not what the world demands.",
        "A true legacy is not what we leave behind, but how we’ve shaped those we touched.",
        "Without peace, achievement is hollow. With it, even little things feel whole.",
        "To inspire is to light a spark that travels beyond our reach — a quiet kind of eternity.",
      ],
    },
    {
      question: "What do you do when you're unsure what to choose?",
      choices: [
        "I follow my gut feeling",
        "I ask others for advice",
        "I take my time",
        "I just try something",
      ],
      responses: [
        "The heart often knows before the mind catches up. Trust your inner compass.",
        "Wisdom can live in the voices of those who truly know and care for us.",
        "Slowness makes room for clarity. You don’t have to rush into knowing.",
        "Clarity often comes through motion. Sometimes the path appears as you walk.",
      ],
    },
    {
      question: "What does peace mean to you?",
      choices: [
        "The absence of conflict",
        "A quiet mind",
        "Living in harmony",
        "Letting go of control",
      ],
      responses: [
        "Peace is more than the end of conflict — it's the presence of understanding.",
        "The calmest place is within. A still mind sees clearly.",
        "Harmony is the song of life when we stop resisting and begin flowing.",
        "Peace begins when we release our grip and accept what is.",
      ],
    },
  ];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  // Function to handle the typewriter effect
  const typeText = (text: string, callback?: () => void) => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Reset state
    setTypedText("")
    setTypingComplete(false)

    let i = 0
    const typeNextChar = () => {
      if (!isMountedRef.current) return

      if (i < text.length) {
        setTypedText(text.substring(0, i + 1))
        i++
        typingTimeoutRef.current = setTimeout(typeNextChar, 50) // 50ms per character
      } else {
        setTypingComplete(true)
        if (callback) callback()
      }
    }

    // Start typing with a small delay
    typingTimeoutRef.current = setTimeout(typeNextChar, 100)
  }

  // Start typing when question changes
  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex].question
    setIsTypingQuestion(true)
    setSelectedChoice(null)
    typeText(currentQuestion)

    // Cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [currentQuestionIndex])

  const handleChoiceClick = (choice: string) => {
    setSelectedChoice(choice)
    const responseIndex = questions[currentQuestionIndex].choices.indexOf(choice)
    const responseText = questions[currentQuestionIndex].responses[responseIndex]
    setIsTypingQuestion(false)
    typeText(responseText)
  }

  const handleBackToQuestion = () => {
    setIsTypingQuestion(true)
    typeText(questions[currentQuestionIndex].question)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-[0_0_20px_8px_rgba(255,170,0,0.15)] border-4 border-gray-700">
          <div className="bg-[#1f2d28] rounded relative overflow-hidden p-6 min-h-[500px] flex flex-col">
            {/* CRT effects */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]" />
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle,rgba(10,255,10,0.8)_0%,rgba(0,0,0,0)_70%)]" />

            {/* Question number */}
            <div className="text-amber-500/80 mb-4 font-mono text-sm">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>

            {/* Text display area */}
            <div className="font-mono text-xl mb-6 flex-grow">
              <p className="typewriter-text text-amber-300/90">
                {typedText}
                <span className="cursor text-amber-400 animate-pulse">▌</span>
              </p>
            </div>

            {/* Choices */}
            {isTypingQuestion && typingComplete && (
              <div className="space-y-3 font-mono">
                {questions[currentQuestionIndex].choices.map((choice, index) => (
                  <div
                    key={index}
                    onClick={() => handleChoiceClick(choice)}
                    className="p-2 border border-amber-700/70 rounded cursor-pointer hover:bg-amber-900/20 transition-colors"
                  >
                    <p className="choice-text text-amber-300/90">
                      <span className="text-amber-500">{String.fromCharCode(65 + index)}.</span> {choice}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 font-mono">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length)}
                className="nav-button flex items-center text-amber-300/90 border border-amber-700/70 px-3 py-1 rounded hover:bg-amber-900/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1 text-amber-500" /> Prev
              </button>

              {!isTypingQuestion && typingComplete && (
                <button
                  onClick={handleBackToQuestion}
                  className="nav-button text-amber-300/90 border border-amber-700/70 px-3 py-1 rounded hover:bg-amber-900/20 transition-colors"
                >
                  Back to Question
                </button>
              )}

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

