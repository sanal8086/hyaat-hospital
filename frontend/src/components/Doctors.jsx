import { useState, useEffect } from 'react'
import API_BASE_URL from '../config'
import { motion } from 'framer-motion'
import { Stethoscope, GraduationCap, Clock, CalendarClock } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 50, rotateY: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, rotateY: 0, scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.3 } },
}

const avatarPalettes = [
  'from-primary-500 to-primary-700',
  'from-accent-500 to-accent-700',
  'from-cyan-500 to-teal-600',
  'from-violet-500 to-indigo-700',
  'from-rose-500 to-pink-700',
  'from-amber-500 to-orange-600',
]

const Doctors = ({ selectedSpecialization, setSelectedSpecialization }) => {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/doctors`)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error('Error fetching doctors:', err))
  }, [])

  return (
    <section
      id="doctors"
      className="relative py-28 bg-slate-950 overflow-hidden"
    >
      {/* BG */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary-700/15 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-800/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(45deg, #28a394 25%, transparent 25%), linear-gradient(-45deg, #28a394 25%, transparent 25%)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          key={`heading-${selectedSpecialization}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="label-chip mb-5 inline-flex">{selectedSpecialization === 'All' ? 'Meet the Team' : `${selectedSpecialization} Department`}</span>
          <h2 className="section-heading mb-5">
            Expert <span className="text-gradient">{selectedSpecialization === 'All' ? 'Doctors' : 'Specialists'}</span>
          </h2>
          <p className="section-sub mb-8">
            Highly qualified specialists committed to delivering personalised,
            compassionate care for every patient.
          </p>
          {selectedSpecialization !== 'All' && (
            <a href="#specializations" className="btn-secondary inline-flex items-center gap-2">
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              View Other Departments
            </a>
          )}
        </motion.div>



        {/* Cards */}
        <motion.div
          key={selectedSpecialization}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
          style={{ perspective: 1200 }}
        >
          {doctors
            .filter(doc => selectedSpecialization === 'All' || doc.department === selectedSpecialization)
            .map((doctor, i) => (
            <motion.div
              key={doctor.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.35 } }}
              className="glass-card overflow-hidden group"
            >
              {/* Avatar banner */}
              <div className={`relative h-52 bg-gradient-to-br ${avatarPalettes[i % avatarPalettes.length]} flex items-center justify-center overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="w-28 h-28 bg-white/15 backdrop-blur-sm border-2 border-white/25 rounded-full flex items-center justify-center shadow-2xl relative z-10 text-white"
                >
                  <Stethoscope size={48} strokeWidth={1.5} />
                </motion.div>

                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {doctor.specialization}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors duration-300">
                  {doctor.name}
                </h3>
                <p className="text-primary-400 font-semibold text-sm mb-5">{doctor.specialization}</p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: <GraduationCap size={16} />, text: doctor.qualification },
                    doctor.experience ? { icon: <Clock size={16} />, text: `${doctor.experience} Experience` } : null,
                    { icon: <CalendarClock size={16} />, text: doctor.timing },
                  ].filter(Boolean).map(row => (
                    <div key={row.text} className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center text-base shrink-0">
                        {row.icon}
                      </span>
                      {row.text}
                    </div>
                  ))}
                </div>


              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Doctors
