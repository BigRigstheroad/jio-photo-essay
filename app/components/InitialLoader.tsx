"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1000)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 bg-offblack flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            {/* simple pulsing text */}
            <p className="font-montserrat text-sm font-semibold uppercase tracking-widest text-theme-yellow animate-pulse">
              Loading...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
