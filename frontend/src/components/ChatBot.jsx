import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, HeartPulse } from 'lucide-react'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      isBot: true,
      text: "Hello! Welcome to Hyaat Hospital 👋\nHow can I help you today?",
      options: ['View All Doctors', 'Search by Department']
    }
  ])
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return
    
    // Add user message
    const newUserMsg = { id: Date.now(), isBot: false, text: text }
    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')

    // Process bot response
    setTimeout(() => {
      processBotResponse(text)
    }, 500)
  }

  const processBotResponse = (input) => {
    const text = input.toLowerCase()
    let responseText = ""
    let options = null

    if (text === 'view all doctors') {
      responseText = "Here are all our departments. Which one are you looking for?"
      options = [...new Set(doctors.map(d => d.department))].filter(Boolean)
    } 
    else if (text === 'search by department') {
      responseText = "Please select a department from the list below:"
      options = [...new Set(doctors.map(d => d.department))].filter(Boolean)
    }
    else {
      // Check if they typed/clicked a department
      const matchingDocs = doctors.filter(d => d.department && d.department.toLowerCase() === text)
      if (matchingDocs.length > 0) {
        responseText = `Here are our specialists in ${matchingDocs[0].department}:\n\n` + 
          matchingDocs.map(d => `👨‍⚕️ ${d.name}\n⚕️ ${d.specialization}\n⏰ ${d.timing}`).join('\n\n')
        options = ['Main Menu']
      } else if (text === 'main menu') {
        responseText = "How can I help you today?"
        options = ['View All Doctors', 'Search by Department']
      } else {
        responseText = "I'm sorry, I didn't understand that. Please choose an option below."
        options = ['Main Menu']
      }
    }

    setMessages(prev => [...prev, {
      id: Date.now(),
      isBot: true,
      text: responseText,
      options: options
    }])
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-900/50 z-50 hover:bg-[#008f6f] transition-colors"
          >
            <MessageCircle size={32} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[360px] h-[550px] bg-[#0b141a] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/10 sm:right-6 sm:bottom-6 max-w-[calc(100vw-2rem)]"
          >
            {/* Header */}
            <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white shrink-0 relative">
                  <HeartPulse size={20} />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#202c33] rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base leading-tight">Hyaat Assistant</h3>
                  <p className="text-emerald-500 text-xs font-medium">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{
              backgroundImage: 'radial-gradient(circle at center, #111b21 0%, #0b141a 100%)'
            }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] whitespace-pre-wrap leading-relaxed shadow-sm ${
                      msg.isBot 
                        ? 'bg-[#202c33] text-slate-200 rounded-tl-none' 
                        : 'bg-[#005c4b] text-white rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Options */}
                  {msg.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSend(opt)}
                          className="px-4 py-2 bg-[#2a3942] hover:bg-[#374b57] border border-white/5 text-emerald-400 text-sm font-medium rounded-full transition-colors shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-[#202c33] p-3 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-[#2a3942] text-white rounded-full px-5 py-2.5 outline-none placeholder:text-slate-400 text-[15px]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-11 h-11 rounded-full bg-[#00a884] flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:bg-[#2a3942] transition-colors"
              >
                <Send size={18} className="ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
