"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Check, ArrowLeft, ShoppingCart, Loader2 } from "lucide-react"
import { PricingPlan } from "../components/PricingCourse/data"
import axios from "axios"

function PricingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // const price = searchParams.get("price") || ""
  // const salePrice = searchParams.get("salePrice") || ""
  // const descript = searchParams.get("descript") || ""

  const planId = searchParams.get("id")
  // const plan = planId ? getPlanById(Number(planId)) : null
  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://694cec27da5ddabf0037d71b.mockapi.io/pricing_plans";

  // useEffect(() => {
  //   if (!plan) {
  //     router.replace("/") // Quay về trang chủ nếu không tìm thấy plan
  //   }
  // }, [plan, planId, router])

  useEffect(() => {
    if (!planId) {
      router.replace("/")
      return
    }
    const fetchDetailPricing = async() => {
      try {
        const response = await axios.get(`${API_URL}/${planId}`)
        setPlan(response.data)
        setIsLoading(false);
      } catch (error) {
        console.error("Không tìm thấy gói học:", error)
        router.replace("/")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetailPricing();
  }, [planId, router] );


  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-muted-foreground">Đang tải thông tin gói học...</p>
      </div>
    )
  }

  if (!plan) {
    return (
            <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy chương tr</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    )
  }

  const priceNumber = Number.parseInt(plan.price.replace(/\D/g, "") || "0")
  const salePriceNumber = Number.parseInt(plan.salePrice.replace(/\D/g, "") || "0")
  const savings = priceNumber - salePriceNumber

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
          <div className="bg-linear-to-r from-accent/20 to-accent/10 p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{plan.name}</h1>
            <p className="text-muted-foreground">Thông tin chi tiết về gói học bạn đã chọn</p>
          </div>

          <div className="p-8">
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-8 mb-8 text-center">
              <div className="mb-4">
                <span className="text-5xl font-bold text-accent">{plan.salePrice}</span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-xl text-muted-foreground line-through">{plan.price}</span>
                <span className="bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Giảm {savings.toLocaleString()}đ
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Ưu đãi có thời hạn</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Check className="w-6 h-6 text-accent" />
                Những gì bạn nhận được
              </h2>
              <div className="space-y-4">
                {plan.descript.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-base">{item.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-3">Chính sách hoàn tiền</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chúng tôi cam kết hoàn lại 100% học phí trong vòng 30 ngày nếu bạn không hài lòng với khóa học. Không
                cần lý do, không phát sinh phí.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Hoàn tiền trong vòng 30 ngày
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Không cần giải trình lý do
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Xử lý nhanh chóng trong 3-5 ngày
                </li>
              </ul>
            </div>

            <button 
            onClick={() => router.back()} 
            className="cursor-pointer w-full bg-accent hover:bg-accent/90 text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg">
              {/* <ShoppingCart className="w-5 h-5" /> */}
              Liên hệ
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">Bắt đầu học ngay sau khi thanh toán</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingContent />
    </Suspense>
  )
}
