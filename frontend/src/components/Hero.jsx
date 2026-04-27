import { motion } from 'framer-motion'

const stats = [
  { value: '5+', label: 'Years of Care' },
  { value: '20+', label: 'Specialist Doctors' },
  { value: '5k+', label: 'Patients Served' },
  { value: '24/7', label: 'Emergency Ready' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = ({ hospitalInfo }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a2927 0%, #1e8278 48%, #1c6861 100%)' }}
    >
      {/* ── Decorative orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-primary-400/20 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent-600/15 blur-[110px]" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[400px] rounded-full bg-primary-800/30 blur-[90px]" />

        {/* Animated ring pulses */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] rounded-full border border-primary-400/25"
        />
        <motion.div
          animate={{ scale: [1.06, 1, 1.06], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1050px] h-[1050px] rounded-full border border-primary-400/12"
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -(20 + i * 4), 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 5 + i * 1.1, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary-300/70"
            style={{ top: `${15 + i * 10}%`, left: `${8 + i * 11}%` }}
          />
        ))}

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:pl-12 pt-28 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Text ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="text-white">

            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/10 border border-white/20 backdrop-blur-sm text-primary-100">
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-primary-300 inline-block"
                />
                Trusted Healthcare · Since 2021
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight"
            >
              Your Health,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #79d8c8, #3b82f6, #79d8c8)', backgroundSize: '200% auto' }}
              >
                Our Priority.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white leading-relaxed max-w-lg mb-10"
            >
              World-class healthcare delivered with compassion and precision.
              Our specialists are here for you — every step of the way.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="#specializations" className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Our Services
              </a>
              <a href="#contact" className="btn-outline">
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Hospital image ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="relative flex items-center justify-end"
          >
            <motion.div
              className="relative w-full max-w-2xl"
            >
              {/* Image with subtle edge dissolve for clarity */}
              <div className="relative">
                <img
                  src="/hospital.png"
                  alt="Hyaat Hospital"
                  className="w-full h-auto object-cover opacity-50 mix-blend-screen"
                  style={{
                    maxHeight: '580px',
                    objectFit: 'cover',
                    maskImage: 'radial-gradient(circle at center, black 15%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 80%)'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.04, y: -3 }}
              className="stat-badge cursor-default hover:bg-white/12 transition-all duration-300"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-gradient">{s.value}</span>
              <span className="text-xs text-primary-200/70 mt-1 font-medium text-center">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] text-primary-300/50 font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-400/30 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary-400" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient dissolve */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none z-10" />
    </section>
  )
}

export default Hero
