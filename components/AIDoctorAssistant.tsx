"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, Sparkles, MessageSquare, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AIDoctorAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showSpecialties, setShowSpecialties] = useState(false)
  const [input, setInput] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const messages = [
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ciao! Sono FlexiDoc, l'assistente medico AI di Flexicare. Come posso aiutarti a trovare lo specialista giusto oggi?",
    },
  ]

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const specialties = [
    { id: "cardiology", name: "Cardiologia" },
    { id: "dermatology", name: "Dermatologia" },
    { id: "pediatrics", name: "Pediatria" },
    { id: "orthopedics", name: "Ortopedia" },
    { id: "neurology", name: "Neurologia" },
    { id: "general", name: "Medicina Generale" },
  ]

  const commonQuestions = [
    "Ho un forte mal di testa da giorni, quale specialista dovrei vedere?",
    "Posso prenotare una visita pediatrica per domani?",
    "Ho bisogno di un dermatologo specializzato in acne",
  ]

  const handleSpecialtySelect = (specialty: string) => {
    setShowSpecialties(false)
  }

  const handleQuestionClick = (question: string) => {
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Do nothing since we want the button to be inactive
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden" // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset" // Restore scrolling
    }
  }, [isOpen])

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-[#FFCC00] text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors z-[100]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
              onClick={handleClickOutside}
            />

            {/* Chat Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
              onClick={handleClickOutside}
            >
              <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Chat Header */}
                <div className="bg-[#FFCC00] p-3 flex justify-between items-center rounded-t-lg">
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center mr-2 shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-[#FFCC00]" />
                    </div>
                    <h3 className="text-white font-bold text-sm">FlexiDoc</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                    <span className="text-white text-xs font-medium">Online</span>
                    <motion.button 
                      onClick={() => setIsOpen(false)} 
                      className="text-white hover:text-gray-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto bg-gray-100"
                  style={{ scrollBehavior: "smooth" }}
                >
                  <div className="py-4 px-4 space-y-6">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center shadow-sm">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}

                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                            message.role === "user"
                              ? "bg-[#FFCC00] text-white"
                              : "bg-white text-gray-900 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                        </div>

                        {message.role === "user" && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shadow-sm">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Suggested Questions - Only show after welcome message */}
                    {showSuggestions && messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4"
                      >
                        <p className="text-xs font-bold text-gray-600 mb-2">Domande frequenti:</p>
                        <div className="space-y-2">
                          {commonQuestions.map((question, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleQuestionClick(question)}
                              className="w-full text-left bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-lg transition-colors flex items-center border border-gray-200 shadow-sm text-sm font-medium"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <MessageSquare className="h-4 w-4 text-[#FFCC00] mr-2 flex-shrink-0" />
                              <span>{question}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Specialties Selection */}
                    {showSpecialties && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                      >
                        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <h4 className="text-sm font-bold text-gray-700">Seleziona uno specialista</h4>
                          <motion.button
                            onClick={() => setShowSpecialties(false)}
                            className="text-gray-500 hover:text-gray-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <div className="p-2">
                          {specialties.map((specialty) => (
                            <motion.button
                              key={specialty.id}
                              onClick={() => handleSpecialtySelect(specialty.name)}
                              className="w-full text-left p-2.5 hover:bg-gray-50 rounded-md transition-colors text-sm text-gray-800 font-medium"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {specialty.name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-300 p-3 bg-white rounded-b-lg">
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Scrivi un messaggio..."
                      className="flex-1 border-2 border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent text-sm text-gray-900 placeholder-gray-500 font-medium"
                    />
                    <motion.button
                      type="submit"
                      disabled={true}
                      className="ml-2 bg-[#FFCC00] text-white p-2.5 rounded-lg opacity-50 cursor-not-allowed transition-colors shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 