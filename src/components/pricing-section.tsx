import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Học phí ưu đãi</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Đầu tư cho tương lai của bạn với mức giá hợp lý nhất
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-card border-2 border-accent rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Ưu đãi đặc biệt
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">5.999.000đ</div>
              <div className="text-muted-foreground line-through">8.999.000đ</div>
              <div className="text-accent font-semibold mt-2">Tiết kiệm 3.000.000đ</div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Truy cập trọn đời tất cả bài giảng",
                "50+ giờ video chất lượng cao",
                "10+ dự án thực tế để làm portfolio",
                "Hỗ trợ 1-1 từ mentor",
                "Tham gia cộng đồng học viên",
                "Chứng chỉ hoàn thành khóa học",
                "Cập nhật nội dung mới miễn phí",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-accent hover:bg-accent/90 text-black font-semibold text-lg py-3 rounded-lg transition-colors">
              Đăng ký ngay
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Hoàn tiền 100% trong 30 ngày nếu không hài lòng
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
