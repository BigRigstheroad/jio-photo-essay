"use client"

export type Language = "EN" | "CEB"

interface LanguageToggleProps {
  activeLang: Language
  setActiveLang: (lang: Language) => void
}

export default function LanguageToggle({
  activeLang,
  setActiveLang,
}: LanguageToggleProps) {
  return (
    <div className="w-full flex justify-center py-12 px-4 border-b border-white/10 select-none">
      <div className="flex flex-wrap justify-center gap-2 text-sm sm:text-[16px] font-libre text-theme-white">
        <button
          type="button"
          onClick={() => setActiveLang("EN")}
          className={`hover:text-theme-yellow transition-colors cursor-pointer ${
            activeLang === "EN" ? "text-theme-yellow" : ""
          }`}
        >
          Read this article in English
        </button>
        <span className="px-4 opacity-50">|</span>
        <button
          type="button"
          onClick={() => setActiveLang("CEB")}
          className={`hover:text-theme-yellow transition-colors cursor-pointer ${
            activeLang === "CEB" ? "text-theme-yellow" : ""
          }`}
        >
          Basaha kini nga artikulo sa Bisaya
        </button>
      </div>
    </div>
  )
}
