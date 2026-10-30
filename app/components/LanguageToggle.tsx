"use client"
import { useState } from "react"

export default function LanguageToggle() {
  const [activeLang, setActiveLang] = useState("EN")

  return (
    <div className="w-full flex justify-center py-12 px-4 border-b border-white/10">
      <div className="flex flex-wrap justify-center gap-2 text-[16px] font-libre text-theme-white">
        <button
          onClick={() => setActiveLang("EN")}
          className={`hover:text-theme-yellow transition-colors ${activeLang === "EN" ? "text-theme-yellow" : ""}`}
        >
          Read this article in English
        </button>
        <span className="px-4 opacity-50">|</span>
        <button
          onClick={() => setActiveLang("CEB")}
          className={`hover:text-theme-yellow transition-colors ${activeLang === "CEB" ? "text-theme-yellow" : ""}`}
        >
          Basaha kini nga artikulo sa Cebuano
        </button>
      </div>
    </div>
  )
}
