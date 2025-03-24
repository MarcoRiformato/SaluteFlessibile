import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import SpecialistTabs from "./components/SpecialistTabs"
import Benefits from "./components/Benefits"
import JoinUs from "./components/JoinUs"
import Footer from "./components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FCF8E3]">
      <Header />
      <main>
        <HeroSection />
        <SpecialistTabs />
        <Benefits />
        <JoinUs />
      </main>
      <Footer />
    </div>
  )
}

