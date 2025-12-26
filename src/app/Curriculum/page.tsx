"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CurriculumPlan } from "../components/Curriculum/data"
import { ArrowLeft, Check, Clock, Loader2 } from "lucide-react"
import { Suspense, useEffect, useState } from "react"

function CourseContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const planId = searchParams.get("id")
  const [plan, setPlan] = useState<CurriculumPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const plan = planId ? getPlanById(Number(planId)) : null

  const API_URL = "https://694cec27da5ddabf0037d71b.mockapi.io/curriculum_plans";

  // useEffect(() => {
  //   if (!plan) {
  //     router.replace("/") //
  //   }
  // }, [plan, planId, router])

  useEffect(() =>{
    if (!planId) {
      router.replace("/")
      return
    }
    const fetchDetailCurriculum = async() => {
      try {
        const response = await fetch(`${API_URL}/${planId}`)
        const data = await response.json()
        setPlan(data)
        setIsLoading(false);
      } catch (error) {
        console.error("Không tìm thấy khóa học:", error)
        router.replace("/")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetailCurriculum();
  }, [planId, router]);
  
    if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-muted-foreground">Đang tải thông tin chương trình...</p>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h1>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        {/* plan header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-accent px-4 py-1.5 rounded-full bg-accent/10">
              {plan.duration}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{plan.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{plan.description}</p>
        </div>

        {/* lessions list */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-accent" />
            Nội dung học
          </h2>
          <ul className="space-y-4">
            {plan.lessions.map((lesson, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium">{lesson}</p>
                  <p className="text-sm text-muted-foreground mt-1">Bài học {index + 1}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA section */}
        <div className="mt-12 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Sẵn sàng bắt đầu học?</h3>
          <p className="text-muted-foreground mb-6">Đăng ký ngay để nhận ưu đãi đặc biệt 50% cho khóa học này</p>
          <button
            onClick={() => router.push("/#pricing")}
            className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CurriculumPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Đang tải...</p>
          </div>
        </div>
      }
    >
      <CourseContent />
    </Suspense>
  )
}
