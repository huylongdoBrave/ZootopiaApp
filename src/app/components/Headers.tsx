import { Code2, Menu } from "lucide-react"
import Link from "next/link"
import {ThemeToggle} from "../components/Theme/theme-toggle"


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Code2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-xl">Frontend Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-accent transition-colors">
              Tính năng
            </Link>
            <Link href="#curriculum" className="text-sm font-medium hover:text-accent transition-colors">
              Chương trình
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">
              Học phí
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors">
              Đăng nhập
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-black font-semibold transition-colors">
              Đăng ký ngay
            </button>
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/10 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
