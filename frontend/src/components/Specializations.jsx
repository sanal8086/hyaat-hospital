import { useState, useEffect } from 'react'
import API_BASE_URL from '../config'
import { motion } from 'framer-motion'
import { Stethoscope, Smile, Baby, Bone, Ear, Droplet, Sparkles, Mic, Activity } from 'lucide-react'

const iconMap = {
  "General Medicine": <Stethoscope size={32} strokeWidth={1.5} />,
  "Dental": <Smile size={32} strokeWidth={1.5} />,
  "Pediatrics": <Baby size={32} strokeWidth={1.5} />,
  "Orthopedics": <Bone size={32} strokeWidth={1.5} />,
  "ENT": <Ear size={32} strokeWidth={1.5} />,
  "Diabetology": <Droplet size={32} strokeWidth={1.5} />,
  "Dermatology": <Sparkles size={32} strokeWidth={1.5} />,
  "Speech Therapy": <Mic size={32} strokeWidth={1.5} />,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 50, rotateX: 15, scale: 0.95 },
  visible:  { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.3 } },
}

const iconBgs = [
  'from-primary-500 to-primary-700',
  'from-accent-500 to-accent-700',
  'from-cyan-500 to-teal-700',
  'from-violet-500 to-purple-700',
  'from-rose-500 to-pink-700',
  'from-amber-500 to-orange-600',
]

const Specializations = ({ setSelectedSpecialization }) => {
  const [specializations, setSpecializations] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/specializations`)
      .then(res => res.json())
      .then(data => setSpecializations(data))
      .catch(err => console.error('Error fetching specializations:', err))
  }, [])

  return (
    <section id="specializations" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* BG decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-primary-800/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-800/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #28a394 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="label-chip mb-5 inline-flex">Our Expertise</span>
          <h2 className="section-heading mb-5">
            Medical <span className="text-gradient">Specializations</span>
          </h2>
          <p className="section-sub">
            From routine care to complex procedures — our specialist departments are
            equipped with cutting-edge technology and expert clinicians.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          key={specializations.length}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1200 }}
        >
          {specializations.map((spec, i) => (
            <motion.div
              key={spec.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-7 group cursor-default relative overflow-hidden"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.12, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconBgs[i % iconBgs.length]} flex items-center justify-center text-white shadow-lg`}
              >
                {iconMap[spec.name] || <Activity size={32} strokeWidth={1.5} />}
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                {spec.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {spec.description}
              </p>

              <a 
                href="#doctors"
                onClick={() => setSelectedSpecialization(spec.name)}
                className="flex items-center gap-2 text-primary-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Hover shimmer line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Specializations
