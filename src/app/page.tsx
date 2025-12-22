import { Header } from "@/app/components/Headers"
import { AdvertiseSection } from "@/app/features/Advertise/Advertise-sections"
import { RecommendSection } from "@/app/features/Recommend/Recommend-sections"
import { CurriculumSection } from "@/app/features/Curriculum/Curriculum-sections"
import { PricingSection } from "@/app/features/PricingCourse/Pricing-sections"
import { CTASection } from "@/app/features/CTA/CTA-sections"
import { Footer } from "@/app/components/Footers"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AdvertiseSection />
        <RecommendSection />
        <CurriculumSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
