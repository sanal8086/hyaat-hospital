import { useState, useEffect } from 'react'
import API_BASE_URL from './config'
import Header from './components/Header'
import Hero from './components/Hero'
import Specializations from './components/Specializations'
import Doctors from './components/Doctors'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

function App() {
  const [hospitalInfo, setHospitalInfo] = useState(null)
  const [selectedSpecialization, setSelectedSpecialization] = useState('General Medicine')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hospital-info`)
      .then(res => res.json())
      .then(data => setHospitalInfo(data))
      .catch(err => console.error('Error fetching hospital info:', err))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <Header hospitalInfo={hospitalInfo} />
      <Hero hospitalInfo={hospitalInfo} />
      <Specializations setSelectedSpecialization={setSelectedSpecialization} />
      <Doctors selectedSpecialization={selectedSpecialization} setSelectedSpecialization={setSelectedSpecialization} />
      <Contact hospitalInfo={hospitalInfo} />
      <Footer hospitalInfo={hospitalInfo} />
      <ChatBot />
    </div>
  )
}

export default App
