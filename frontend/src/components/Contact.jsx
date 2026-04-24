import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, CheckCircle2, Siren } from 'lucide-react'

const infoItems = (hospitalInfo) => [
  {
    icon: <MapPin className="text-white" size={24} />, label: 'Address',
    value: hospitalInfo?.address || '123 Healthcare Avenue, Medical District',
    color: 'from-primary-500 to-primary-700',
  },
  {
    icon: <Phone className="text-white" size={24} />, label: 'Phone',
    value: hospitalInfo?.phone || '+91 9746 768983',
    extra: `Emergency: ${hospitalInfo?.emergency || '+91 4843 5689'}`,
    color: 'from-accent-500 to-violet-600',
  },
  {
    icon: <Mail className="text-white" size={24} />, label: 'Email',
    value: hospitalInfo?.email || 'info@hyaatcare.com',
    color: 'from-cyan-500 to-teal-600',
  },
  {
    icon: <Clock className="text-white" size={24} />, label: 'Working Hours',
    value: 'Mon – Sat: 8:00 AM – 8:00 PM',
    extra: 'Sunday: Emergency Only',
    color: 'from-amber-500 to-orange-600',
  },
]

const inputClass =
  'w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300'

const Contact = ({ hospitalInfo }) => {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const message = `*New Contact Form Submission*
    
*Name:* ${form.name}
*Phone:* ${form.phone}
*Email:* ${form.email}

*Message:*
${form.message}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = '918086438990'
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')

    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const items = infoItems(hospitalInfo)

  return (
    <section id="contact" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] rounded-full bg-primary-800/20 blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-800/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #28a394 1px, transparent 1px)',
            backgroundSize: '40px 40px',
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
          <span className="label-chip mb-5 inline-flex">Get In Touch</span>
          <h2 className="section-heading mb-5">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="section-sub">
            Have questions? We're here to help you 24/7. Reach out through any channel below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start" style={{ perspective: 1200 }}>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -30, z: -100 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-7">Send us a Message</h3>

              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400"><CheckCircle2 size={32} /></div>
                  <p className="text-xl font-bold text-white">Message Sent!</p>
                  <p className="text-slate-400 text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-300 text-sm font-semibold mb-2">Full Name</label>
                      <input type="text" required placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-semibold mb-2">Phone</label>
                      <input type="tel" placeholder="+91 00000 00000"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Email</label>
                    <input type="email" required placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Message</label>
                    <textarea rows={4} required placeholder="How can we help you?"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputClass} resize-none`} />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Info cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 30, z: -100 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="space-y-4"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 6 }}
                className="glass-card p-5 flex items-start gap-5 cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl shrink-0 shadow-lg`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                  {item.extra && <p className="text-primary-400 text-sm font-medium mt-0.5">{item.extra}</p>}
                </div>
              </motion.div>
            ))}

            {/* Emergency CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="rounded-3xl p-6 bg-gradient-to-br from-red-600/30 to-rose-800/30 border border-red-500/25 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500"
                ><Siren size={28} /></motion.span>
                <span className="text-red-400 font-bold text-lg">Emergency Hotline</span>
              </div>
              <p className="text-3xl font-extrabold text-white mb-1">
                {hospitalInfo?.emergency || '+91 4843 5689'}
              </p>
              <p className="text-red-300/70 text-sm">Available 24 hours, 7 days a week</p>
              <a
                href={`tel:${hospitalInfo?.emergency || '+9148435689'}`}
                className="btn-accent w-full justify-center mt-4 text-sm"
              >
                Call Emergency Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
