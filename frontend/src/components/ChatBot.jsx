import { useState, useEffect, useRef } from 'react'
import API_BASE_URL from '../config'
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
      text: "Hello! Welcome to Blackstone Hyaat Hospital 👋\nHow can I help you today?",
      options: ['View All Doctors', 'Search by Department', 'Hospital Info']
    }
  ])

  const qaData = [
    // GENERAL & CONTACT INFORMATION
    { keywords: ['name', 'hospital'], answer: "The hospital is Blackstone Hyaat Hospital." },
    { keywords: ['location', 'where', 'address'], answer: "Blackstone Hyaat Hospital is located at Karukapilly, Kaloor, Kochi, Kerala." },
    { keywords: ['contact', 'phone', 'number'], answer: "You can reach us at +91 9746 768983 or +91 4843 5689." },
    { keywords: ['open', '24 hours', 'everyday'], answer: "Yes, Blackstone Hyaat Hospital operates 24 hours a day, 7 days a week with round-the-clock emergency services." },
    { keywords: ['enquiry', 'book', 'appointment'], answer: "For enquiries and appointments, please call +91 9746 768983 or +91 4843 5689." },
    { keywords: ['department', 'list'], answer: "The hospital has the following departments: Family Medicine, General Medicine (24 hrs), Dental, Pediatrics, Orthopedics, ENT, Diabetology, Dermatology & Cosmetology, and Speech Therapy." },
    { keywords: ['walk-in'], answer: "Yes, walk-in consultations are available during department hours. For emergency care, the hospital is open 24 hours." },
    { keywords: ['first visit', 'bring'], answer: "Please bring a valid ID, any previous medical records, prescriptions, and insurance documents if applicable." },
    { keywords: ['emergency care', 'emergency available'], answer: "Yes, the hospital provides 24-hour emergency care with a Resident Medical Officer (Dr. Afsal .K) and General Physician (Dr. Muhammed Nazeer) available at all times." },
    { keywords: ['sunday'], answer: "The 24-hour General Physician (Dr. Muhammed Nazeer) and RMO (Dr. Afsal .K) are available on Sundays. Most specialty departments operate Monday to Saturday only." },
    { keywords: ['morning', 'outpatient', 'timings'], answer: "Most departments open at 10 AM. Dental is available Mon–Sat, 10 AM to 2 PM. General and Family Physician hours are Mon–Sat, 10 AM to 7 PM." },

    // GENERAL MEDICINE & 24-HR SERVICES
    { keywords: ['family physician', 'ilyas'], answer: "The family physician is Hafis Dr. Muhammad Ilyas, qualified with MBBS and FFM (AFPI)." },
    { keywords: ['general physician', 'nazeer'], answer: "Dr. Muhammed Nazeer (MBBS) is available as the General Physician on a 24-hour basis." },
    { keywords: ['rmo', 'resident medical officer', 'afsal'], answer: "Dr. Afsal .K (MBBS) is the Resident Medical Officer (RMO) available round the clock." },
    { keywords: ['night', 'available at night'], answer: "Yes, the hospital has 24-hour General Physician and RMO cover. Dr. Muhammed Nazeer and Dr. Afsal .K are available at all times including nights." },
    { keywords: ['fever', 'cold'], answer: "Please visit our General Physician Dr. Muhammed Nazeer or Family Physician Dr. Muhammad Ilyas. They are available 24 hours." },

    // DENTAL DEPARTMENT
    { keywords: ['dental timings', 'dental hours'], answer: "The Dental Department is open Monday to Saturday, 10 AM to 2 PM. Evening slots are available on Monday and Friday at 6:00 PM." },
    { keywords: ['general dentist', 'alfas'], answer: "Dr. Alfas Ali Khan is the General Dentist available at the hospital." },
    { keywords: ['endodontist', 'root canal specialist', 'sonu'], answer: "Yes, Dr. Sonu Clarence is the Endodontist (root canal specialist) at the hospital." },
    { keywords: ['oral surgeon', 'jerry'], answer: "Yes, Dr. Jerry Bastin is the Oral Surgeon at Blackstone Hyaat Hospital." },
    { keywords: ['orthodontist', 'sunny', 'aleena'], answer: "The hospital has two orthodontists: Dr. Sunny George and Dr. Aleena Thomas. They are available on Monday and Friday at 6:00 PM." },
    { keywords: ['pediatric dentist', 'paedodontist', 'sreelakshmi'], answer: "Yes, Dr. Sreelakshmi V is the Paedodontist (child dental specialist) available at the hospital." },
    { keywords: ['braces', 'teeth alignment'], answer: "Yes, our orthodontists Dr. Sunny George and Dr. Aleena Thomas handle braces and teeth alignment. They are available on Monday and Friday at 6:00 PM." },
    { keywords: ['root canal treatment'], answer: "Yes, Dr. Sonu Clarence (Endodontist) performs root canal treatments. Available Mon–Sat, 10 AM to 2 PM." },
    { keywords: ['tooth extraction', 'oral surgery'], answer: "Yes, Dr. Jerry Bastin (Oral Surgeon) is available for tooth extractions and surgical procedures, Mon–Sat 10 AM to 2 PM." },
    { keywords: ['children dental treatment', 'child dental treatment'], answer: "Yes, our Paedodontist Dr. Sreelakshmi V specializes in children's dental care. Available Mon–Sat, 10 AM to 2 PM." },

    // PEDIATRICS
    { keywords: ['pediatric doctor', 'khalil'], answer: "Dr. Mohammed Khalil (MBBS, DCH – Pediatric Internist) handles the Pediatric Department." },
    { keywords: ['pediatric timings'], answer: "The Pediatric Department is open Monday to Saturday, 5 PM to 8 PM." },
    { keywords: ['child specialist', 'weekend'], answer: "Dr. Mohammed Khalil is available Monday to Saturday, 5 PM to 8 PM. Sunday appointments are not listed — please call to confirm." },
    { keywords: ['child sick', 'bring child'], answer: "For pediatric concerns, Dr. Mohammed Khalil is available Mon–Sat from 5 PM to 8 PM. For emergencies at any time, our 24-hour team is always available." },
    { keywords: ['pediatrician qualifications'], answer: "Dr. Mohammed Khalil holds an MBBS and DCH (Diploma in Child Health) and is a Pediatric Internist." },
    { keywords: ['newborn', 'infant'], answer: "Yes, our Pediatric Internist Dr. Mohammed Khalil handles infants, toddlers, and children. Please call +91 9746 768983 for details." },

    // ORTHOPEDIC
    { keywords: ['orthopedic doctor', 'rafeeq'], answer: "Dr. Mohammed Rafeeq (MBBS, D Ortho, MS Ortho) is the Orthopedic Surgeon at the hospital." },
    { keywords: ['orthopedic timings'], answer: "The Orthopedic Department is available on Monday, Wednesday, and Friday from 5:30 PM to 7 PM." },
    { keywords: ['orthopedic every day'], answer: "Dr. Mohammed Rafeeq is available on Monday, Wednesday, and Friday only, from 5:30 PM to 7 PM." },
    { keywords: ['bone and joint specialist'], answer: "Yes, Dr. Mohammed Rafeeq is an MS Ortho qualified specialist for bone, joint, and orthopedic concerns." },
    { keywords: ['knee pain', 'back pain'], answer: "Please visit our Orthopedic Department and consult Dr. Mohammed Rafeeq (MS Ortho), available Mon, Wed & Fri, 5:30 PM to 7 PM." },
    { keywords: ['fractures'], answer: "Yes, Dr. Mohammed Rafeeq handles fracture care and orthopedic surgeries. He is available Mon, Wed & Fri, 5:30–7 PM. For emergencies, call us immediately." },

    // ENT
    { keywords: ['ent department available'], answer: "Yes, Blackstone Hyaat Hospital has a dedicated ENT (Ear, Nose & Throat) Department." },
    { keywords: ['ent doctors', 'shafeeq', 'asha'], answer: "The ENT Department has two doctors: Dr. Muhammad Shafeeq (MBBS, DLO) and Dr. Asha MS (MBBS, DLS, DNB)." },
    { keywords: ['shafeeq timings'], answer: "Dr. Muhammad Shafeeq is available on Thursdays from 5 PM to 7 PM." },
    { keywords: ['asha timings'], answer: "Dr. Asha MS is available Monday to Saturday from 5 PM to 8 PM, and also on Wednesdays from 5 PM to 6:30 PM." },
    { keywords: ['ear problem', 'ear consult'], answer: "Please visit our ENT department. Dr. Asha MS (Mon–Sat, 5–8 PM) or Dr. Muhammad Shafeeq (Thursday 5–7 PM) can help you." },
    { keywords: ['ent wednesday'], answer: "Yes, there is an ENT slot on Wednesdays from 5 PM to 6:30 PM." },
    { keywords: ['sore throat', 'sinus'], answer: "Yes, our ENT specialists Dr. Asha MS and Dr. Muhammad Shafeeq handle throat, sinus, nose, and ear conditions." },

    // DIABETOLOGY
    { keywords: ['treat diabetes', 'diabetes department'], answer: "Yes, we have a dedicated Diabetology Department." },
    { keywords: ['diabetologist', 'shalini'], answer: "Dr. Shobha Shalini (MBBS, Diploma in Diabetology, Fellowship in Diabetes) handles the Diabetology Department." },
    { keywords: ['diabetes doctor qualifications'], answer: "Dr. Shobha Shalini holds an MBBS, a Diploma in Diabetology, and a Fellowship in Diabetes — making her a highly specialized diabetes care physician." },
    { keywords: ['diabetology timings', 'diabetes timings'], answer: "Diabetology timings are not separately listed. Please call +91 9746 768983 to confirm Dr. Shobha Shalini's availability." },
    { keywords: ['blood sugar', 'hb1ac', 'hba1c'], answer: "Yes, Dr. Shobha Shalini provides comprehensive diabetes management. Please call us to book an appointment." },

    // DERMATOLOGY
    { keywords: ['skin specialist', 'dermatologist', 'balan', 'cosmetology'], answer: "Dr. Indhu Balan (MBBS, MD) is the Dermatologist and Cosmetologist at the hospital." },
    { keywords: ['skin rash', 'acne'], answer: "Please consult Dr. Indhu Balan (MBBS, MD) in our Dermatology & Cosmetology Department. Call us to book your appointment." },

    // SPEECH THERAPY
    { keywords: ['speech therapy', 'speech therapist', 'ahana'], answer: "Ahana Abid is the Speech Therapist at the hospital. Available Monday to Saturday, 5 PM to 8 PM." },
    { keywords: ['speech delay', 'stuttering'], answer: "Yes, our Speech Therapist Ahana Abid handles various speech and language disorders. Available Mon–Sat, 5 PM to 8 PM." }
  ]
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/doctors`)
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
    let options = ['Main Menu']

    // 1. Check for Q&A matches
    const qaMatch = qaData.find(qa => qa.keywords.some(k => text.includes(k)))
    
    if (text === 'hospital info') {
        responseText = "Blackstone Hyaat Hospital provides 24/7 healthcare services in Kochi. What specifically would you like to know?"
        options = ['Location', 'Contact Numbers', 'Sunday Availability', 'Morning Timings', 'Main Menu']
    }
    else if (text === 'location') {
        responseText = "Blackstone Hyaat Hospital is located at Karukapilly, Kaloor, Kochi, Kerala."
    }
    else if (text === 'contact numbers') {
        responseText = "You can reach us at +91 9746 768983 or +91 4843 5689."
    }
    else if (text === 'sunday availability') {
        responseText = "The 24-hour General Physician (Dr. Muhammed Nazeer) and RMO (Dr. Afsal .K) are available on Sundays. Most specialty departments operate Monday to Saturday only."
    }
    else if (text === 'morning timings') {
        responseText = "Most departments open at 10 AM. Dental is available Mon–Sat, 10 AM to 2 PM. General and Family Physician hours are Mon–Sat, 10 AM to 7 PM."
    }
    else if (qaMatch) {
      responseText = qaMatch.answer
    }
    else if (text === 'view all doctors' || text === 'search by department') {
      responseText = "Please select a department from the list below:"
      options = [...new Set(doctors.map(d => d.department))].filter(Boolean)
    }
    else if (text === 'main menu') {
      responseText = "How can I help you today?"
      options = ['View All Doctors', 'Search by Department', 'Hospital Info']
    }
    else {
      // Check if they typed/clicked a department
      const matchingDocs = doctors.filter(d => d.department && d.department.toLowerCase() === text)
      if (matchingDocs.length > 0) {
        responseText = `Here are our specialists in ${matchingDocs[0].department}:\n\n` + 
          matchingDocs.map(d => `👨‍⚕️ ${d.name}\n⚕️ ${d.specialization}\n⏰ ${d.timing}`).join('\n\n')
      } else {
        // Fallback for unknown questions
        responseText = "I'm sorry, I don't have the exact answer for that. For more details, please call us at +91 9746 768983 or +91 4843 5689."
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
