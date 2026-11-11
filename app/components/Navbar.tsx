import Link from "next/link"

interface NavbarProps {
  isFixed?: boolean
}

export default function Navbar({ isFixed = false }: NavbarProps) {
  return (
    <nav
      className={`w-full px-8 py-6 z-50 flex items-center gap-10 bg-offblack ${
        isFixed ? "fixed top-0 left-0 shadow-xl" : "absolute top-0 left-0"
      }`}
    >
      <div className="font-montserrat text-[18px] font-bold text-theme-white tracking-wide">
        MAKIGDUYOG SA YUTA
      </div>

      <div className="flex gap-6">
        <Link
          href="/"
          className="font-montserrat text-[16px] font-semibold text-theme-white uppercase tracking-wider hover:text-theme-yellow transition-colors"
        >
          Story
        </Link>
        <Link
          href="/about"
          className="font-montserrat text-[16px] font-semibold text-theme-white uppercase tracking-wider hover:text-theme-yellow transition-colors"
        >
          About
        </Link>
      </div>
    </nav>
  )
}
