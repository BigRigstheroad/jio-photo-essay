import Link from "next/link"

interface NavbarProps {
  isFixed?: boolean
}

export default function Navbar({ isFixed = false }: NavbarProps) {
  return (
    <nav
      className={`w-full p-6 z-50 flex gap-6 ${
        isFixed
          ? "fixed top-0 left-0 bg-offblack/90 backdrop-blur-sm"
          : "absolute top-0 left-0"
      }`}
    >
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
    </nav>
  )
}
