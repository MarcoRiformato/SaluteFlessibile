import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import SpecialistTabs from "./components/SpecialistTabs"
import Benefits from "./components/Benefits"
import JoinUs from "./components/JoinUs"
import Footer from "./components/Footer"
import { Suspense } from "react"
import { HeroSkeleton, SpecialistTabsSkeleton, BenefitsSkeleton, JoinUsSkeleton } from "./components/Skeleton"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FCF8E3]">
      <Header />
      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SpecialistTabsSkeleton />}>
          <SpecialistTabs />
        </Suspense>
        <Suspense fallback={<BenefitsSkeleton />}>
          <Benefits />
        </Suspense>
        <Suspense fallback={<JoinUsSkeleton />}>
          <JoinUs />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

