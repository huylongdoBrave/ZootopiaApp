import { Header } from "@/app/components/Headers"
import { IntroSection } from "@/app/components/Advertise/Intro-sections"
import { RecommendSection } from "@/app/components/Recommend/Recommend-sections"
import { CurriculumSection } from "@/app/components/Curriculum/Curriculum-sections"
import { PricingSection } from "@/app/components/PricingCourse/Pricing-sections"
import { CTASection } from "@/app/components/CTA/CTA-sections"
import { Footer } from "@/app/components/Footers"

// import ParticleBackground from "@/app/components/EffectFeCourse/EffectFeCourse"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* <ParticleBackground /> */}
        <IntroSection />
        <RecommendSection />
        <CurriculumSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
