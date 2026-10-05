export default function Footer() {
  return (
    <footer className="bg-theme-black text-theme-white p-8 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="footer-text mb-2">
          © {new Date().getFullYear()} Joaquin Gabriel P. Tugot & Participant
          Photographers. All rights reserved.
        </p>
        <p className="footer-text opacity-70">
          Developed by Ricardo R. Rey III
        </p>
      </div>
    </footer>
  )
}
