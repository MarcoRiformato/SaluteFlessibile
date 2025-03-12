import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import SpecialistTabs from "./components/SpecialistTabs"
import Benefits from "./components/Benefits"
import AppMockup from "./components/AppMockup"
import JoinUs from "./components/JoinUs"
import Footer from "./components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <SpecialistTabs />
        <Benefits />
        <AppMockup />
        <JoinUs />
      </main>
      <Footer />
    </div>
  )
}

