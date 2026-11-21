import { Language } from "@/app/components/LanguageToggle"

interface FooterProps {
  activeLang?: Language
}

export default function Footer({ activeLang = "EN" }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-theme-black text-theme-white p-8 mt-20 select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="footer-text mb-2">
          {activeLang === "CEB"
            ? `© ${year} Joaquin Gabriel P. Tugot & Participant Photographers. Ang tanang mga katungod gigahin.`
            : `© ${year} Joaquin Gabriel P. Tugot & Participant Photographers. All rights reserved.`}
        </p>
        <p className="footer-text opacity-70">
          {activeLang === "CEB"
            ? "Development ginugma ni Ricardo R. Rey III"
            : "Developed by Ricardo R. Rey III"}
        </p>
      </div>
    </footer>
  )
}
