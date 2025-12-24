'use client';

import { X } from "lucide-react"; 
import { useEffect } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterPopup({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    
  // Bấm ESC để tắt
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    // CONTAINER CHÍNH: Căn giữa nội dung
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* 1. LỚP NỀN (Backdrop) - Nằm riêng biệt */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 2. HỘP POPUP - Nằm đè lên trên (z-10) */}
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header Popup (Nút tắt) */}
        <div className="absolute top-4 right-4 z-20">
            <button 
            onClick={onClose}
            type="button"
            className="p-2 rounded-full hover:bg-accent/10 transition-colors"
            >
            <X className="w-5 h-5 text-muted-foreground" />
            </button>
        </div>

        {/* Nội dung Form (Thêm overflow-y-auto để nếu màn hình nhỏ quá thì cuộn được) */}
        <div className="p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Tạo tài khoản mới</h2>
          <p className="text-center text-muted-foreground mb-6">Điền thông tin để tham gia cộng đồng</p>

          <form className="space-y-4">
            
            {/* Họ và tên */}
            <div>
              <label className="block text-sm font-medium mb-1">Họ và tên</label>
              <input 
                type="text" 
                placeholder="Tên của bạn"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
              />
            </div>
            
            {/* Hàng đôi: SĐT và Ngày sinh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input 
                        type="tel" 
                        placeholder="098..."
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                    <input 
                        type="date" 
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Hàng đôi: Mật khẩu và Nhập lại mật khẩu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Nút Đăng ký */}
            <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 rounded-lg transition-colors mt-2">
              Đăng ký tài khoản
            </button>
          </form>

          {/* Footer chuyển đổi */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <span 
                onClick={onSwitchToLogin}
                className="text-accent font-semibold cursor-pointer hover:underline"
            >
                Đăng nhập ngay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}