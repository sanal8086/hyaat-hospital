import { motion } from 'framer-motion'
import { PhoneCall } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Specializations', href: '#specializations' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Emergency Care', 'Outpatient Services',
  'Inpatient Care', 'Diagnostic Imaging',
  'Surgical Procedures', 'Pharmacy',
]



const colVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

const Footer = ({ hospitalInfo }) => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 overflow-hidden">
      {/* BG blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-primary-900/30 blur-[100px]" />
        <div className="absolute top-0 right-0 w-[350px] h-[300px] rounded-full bg-accent-900/15 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <motion.div custom={0} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: false }}>
            <a href="#home" className="flex items-center mb-6 group w-fit">
              <img
                src="/logo.png"
                alt="Hyaat Hospital"
                className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-lg"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Providing world-class healthcare with compassion, expertise, and technology.
              Your health is our highest priority.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div custom={1} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: false }}>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary-300 text-sm font-medium transition-all duration-300 group"
                  >
                    <span className="w-4 h-4 rounded bg-primary-500/10 flex items-center justify-center text-xs text-primary-500 group-hover:bg-primary-500/20 transition-colors">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div custom={2} variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: false }}>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s} className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500/60 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Emergency Card removed as it is redundant with Contact section */}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-sm">
            &copy; {year} {hospitalInfo?.name || 'Hyaat Hospital'}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-600 text-xs">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-red-500 mx-0.5"
            >♥</motion.span>
            <span>for better healthcare</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
