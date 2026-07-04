"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const conjectures = [
  {
    id: "palindromic-primes",
    name: "Palindromic Prime Explorer",
    description: "Primes that read the same forwards and backwards",
  },
  {
    id: "perfect-number",
    name: "Perfect Number Explorer",
    description: "Numbers equal to the sum of their proper divisors",
  },
  {
    id: "goldbach-conjecture",
    name: "Goldbach's Conjecture",
    description: "Every even integer > 2 is the sum of two primes",
  },
  {
    id: "collatz-conjecture",
    name: "Brocard's Conjecture",
    description: "The conjecture that there are at least four prime numbers between (pn)2 and (pn+1)2, where pn is the nth prime number, for every n ≥ 2",
  },
  {
    id: "twin-primes",
    name: "Palindromic Twin Primes Conjecture",
    description: "Palindromic Primes",
  },
  {
    id: "mersenne-primes",
    name: "Mersenne Primes",
    description: "Primes of the form 2^p - 1",
  },
  {
    id: "repunit-primes",
    name: "Repunit Primes",
    description: "Primes consisting entirely of repeated 1s",
  },
];


const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
    initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 10 }}
    animate={{
      y: -10,
      x: Math.random() * window.innerWidth,
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
)

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(51, 102, 153, 0.5)",
                  "0 0 30px rgba(51, 102, 153, 0.8)",
                  "0 0 20px rgba(51, 102, 153, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              Conjecture Cosmos
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 font-light tracking-wide"
          >
            Explorer of Mathematical Enigmas
          </motion.p>
        </motion.div>

        {/* Conjecture Grid */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="grid gap-6 md:gap-8"
          >
            {conjectures.map((conjecture, index) => (
              <motion.div
                key={conjecture.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.8, ease: "easeOut" }}
              >
                <Link href={`/conjecture/${conjecture.id}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(51, 102, 153, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6 md:p-8 cursor-pointer transition-all duration-300 hover:border-blue-400/50"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white group-hover:text-blue-200 transition-colors duration-300">
                        {conjecture.name}
                      </h3>
                      <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors duration-300">
                        {conjecture.description}
                      </p>
                    </div>

                    {/* Animated Arrow */}
                    <motion.div
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center mt-20"
        >
          <p className="text-gray-500 text-sm tracking-wider">Dive into the infinite mysteries of mathematics</p>
        </motion.div>
      </div>
    </div>
  )
}
