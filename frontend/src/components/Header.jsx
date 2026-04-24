import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['Home', 'Specializations', 'Doctors', 'Contact']

const Header = ({ hospitalInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60)
      const sections = navLinks.map(n => n.toLowerCase())
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:pl-12 py-3 flex items-center justify-between">

        {/* Logo only — no text */}
        <motion.a
          href="#home"
          className="flex items-center"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <img
            src="/logo.png"
            alt="Hyaat Hospital"
            className="h-14 w-auto object-contain drop-shadow-lg"
          />
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 ml-auto mr-8">
          {navLinks.map((item, i) => {
            const isActive = activeSection === item.toLowerCase()
            return (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-primary-300 bg-primary-500/12'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400"
                    />
                  )}
                </a>
              </motion.li>
            )
          })}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">


          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-xl bg-white/8 hover:bg-white/14 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/8"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 font-medium transition-all"
                >
                  {item}
                </a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
