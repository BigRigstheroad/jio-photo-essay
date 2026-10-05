"use client"
import { useState } from "react"

export default function LanguageToggle() {
  const [activeLang, setActiveLang] = useState("EN")

  // in production, this would trigger the actual translation logic
  return (
    <div className="w-full flex justify-center py-12 px-4 border-b border-white/10">
      <div className="flex flex-wrap justify-center gap-2 text-[16px] font-libre text-theme-white">
        <button
          onClick={() => setActiveLang("TL")}
          className={`hover:text-theme-yellow cursor-pointer transition-colors ${activeLang === "TL" ? "text-theme-yellow" : ""}`}
        >
          Basahin ang artikulong ito sa Tagalog
        </button>
        <span className="px-2 opacity-50">|</span>
        <button
          onClick={() => setActiveLang("EN")}
          className={`hover:text-theme-yellow cursor-pointer transition-colors ${activeLang === "EN" ? "text-theme-yellow" : ""}`}
        >
          Read this article in English
        </button>
        <span className="px-2 opacity-50">|</span>
        <button
          onClick={() => setActiveLang("CEB")}
          className={`hover:text-theme-yellow cursor-pointer transition-colors ${activeLang === "CEB" ? "text-theme-yellow" : ""}`}
        >
          Basaha kini nga artikulo sa Cebuano
        </button>
      </div>
    </div>
  )
}
