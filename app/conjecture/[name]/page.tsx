"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const conjectureData = {
  "palindromic-primes": {
    title: "Palindromic Prime Explorer",
    inputType: "range",
    inputLabel1: "Enter lower bound:",
    inputLabel2: "Enter upper bound:",
    inputPlaceholder1: "e.g., 10",
    inputPlaceholder2: "e.g., 1000",
  },
  "perfect-number": {
    title: "Perfect Number Explorer",
    inputType: "single",
    inputLabel1: "Enter p:",
  },
  "goldbach-conjecture": {
    title: "Goldbach's Conjecture",
    inputType: "single",
    inputLabel: "Enter number of digits:",
    inputPlaceholder: "e.g., 4",
  },
  "collatz-conjecture": {
    title: "Brocard's Conjecture",
    inputType: "button",
  },
  "twin-primes": {
    title: "Palindromic Twin Primes Conjecture",
    inputType: "single",
    inputLabel1: "Enter lower bound:",
    // inputLabel2: "Enter upper bound:",
    inputPlaceholder1: "e.g., 3",
    // inputPlaceholder2: "e.g., 100",
  },
  "mersenne-primes": {
    title: "Mersenne Primes",
    inputType: "range",
    inputLabel1: "Enter lower bound:",
    inputLabel2: "Enter upper bound:",
    inputPlaceholder1: "e.g., 2",
    inputPlaceholder2: "e.g., 10",
  },
  "repunit-primes": {
    title: "Repunit Primes",
    inputType: "range",
    inputLabel1: "Enter lower bound:",
    inputLabel2: "Enter upper bound:",
    inputPlaceholder1: "e.g., 2",
    inputPlaceholder2: "e.g., 10",
  },
};

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
    initial={{
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
    }}
    animate={{
      y: -10,
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1000),
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
);

export default function ConjecutrePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = params;
  return <ConjectureContent name={name} />;
}

function ConjectureContent({ name }: { name: string }) {
  const [mounted, setMounted] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCompute = async () => {
    const conjecture = conjectureData[name as keyof typeof conjectureData];

    if (conjecture.inputType === "single" && !input1.trim()) return;
    if (conjecture.inputType === "range" && (!input1.trim() || !input2.trim()))
      return;

    setLoading(true);
    try {
      const requestBody = {
        conjectureType: name,
        input_1: input1,
        input_2: input2,
      };

      const response = await fetch("http://localhost:8000/compute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      console.log(result);
      setOutput(result);
    } catch (error) {
      setOutput({ error: "Failed to compute. Please try again." });
    }
    setLoading(false);
  };

  if (!mounted) return null;

  const conjecture = conjectureData[name as keyof typeof conjectureData];

  if (!conjecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Conjecture Not Found
          </h1>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(51, 102, 153, 0.5)",
                  "0 0 30px rgba(51, 102, 153, 0.8)",
                  "0 0 20px rgba(51, 102, 153, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {conjecture.title}
            </motion.span>
          </h1>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">
              Calculator
            </h2>

            <div className="space-y-6">
              {conjecture.inputType === "single" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {conjecture.inputLabel}
                  </label>
                  <input
                    type="text"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    placeholder={conjecture.inputPlaceholder}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-white placeholder-gray-400 transition-all duration-300"
                    onKeyPress={(e) => e.key === "Enter" && handleCompute()}
                  />
                </div>
              )}

              {conjecture.inputType === "range" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {conjecture.inputLabel1}
                    </label>
                    <input
                      type="text"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      placeholder={conjecture.inputPlaceholder1}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-white placeholder-gray-400 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {conjecture.inputLabel2}
                    </label>
                    <input
                      type="text"
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      placeholder={conjecture.inputPlaceholder2}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-white placeholder-gray-400 transition-all duration-300"
                      onKeyPress={(e) => e.key === "Enter" && handleCompute()}
                    />
                  </div>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCompute}
                disabled={
                  loading ||
                  (conjecture.inputType === "single" && !input1.trim()) ||
                  (conjecture.inputType === "range" &&
                    (!input1.trim() || !input2.trim()))
                }
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Computing...
                  </span>
                ) : conjecture.inputType === "button" ? (
                  "Run"
                ) : conjecture.inputType === "none" ? (
                  "Explore"
                ) : (
                  "Calculate"
                )}
              </motion.button>
            </div>

            {output && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-gray-800/50 border border-gray-600/30 rounded-lg backdrop-blur-sm overflow-hidden"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Result:
                </h3>
                {output.error ? (
                  <p className="text-red-400 break-words">{output.error}</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-green-400 font-medium break-words whitespace-normal">
                      {output}
                    </p>
                    {output.sequence && (
                      <div>
                        <p className="text-gray-300 bg-gray-900/50 p-3 rounded border border-gray-600/30 text-sm font-mono break-words whitespace-normal overflow-x-auto">
                          Sequence: {output.sequence.join(" → ")}
                          {output.fullLength > 20 ? "..." : ""}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Max: {output.maxValue} | Steps: {output.fullLength}
                        </p>
                      </div>
                    )}
                    {output.pairs && (
                      <p className="text-gray-300 break-words">
                        Found {output.count} prime pair(s)
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
