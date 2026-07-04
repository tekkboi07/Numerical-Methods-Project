import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const body = await request.json()

  // Mock API responses for each conjecture type
  switch (name) {
    case "twin-primes":
      const twinLower = Number.parseInt(body.lowerBound)
      const twinUpper = Number.parseInt(body.upperBound)
      if (isNaN(twinLower) || isNaN(twinUpper) || twinLower < 3 || twinUpper < twinLower) {
        return NextResponse.json({ error: "Please enter valid bounds (lower ≥ 3, upper ≥ lower)" })
      }
      const twinPairs = findTwinPrimes(twinLower, twinUpper)
      return NextResponse.json({
        result: twinPairs.length > 0,
        details: `Found ${twinPairs.length} twin prime pairs in range [${twinLower}, ${twinUpper}]`,
        pairs: twinPairs,
        count: twinPairs.length,
      })

    case "palindromic-primes":
      const palindromicLower = Number.parseInt(body.lowerBound)
      const palindromicUpper = Number.parseInt(body.upperBound)
      if (
        isNaN(palindromicLower) ||
        isNaN(palindromicUpper) ||
        palindromicLower < 2 ||
        palindromicUpper < palindromicLower
      ) {
        return NextResponse.json({ error: "Please enter valid bounds (lower ≥ 2, upper ≥ lower)" })
      }
      const palindromicPrimes = findPalindromicPrimesInRange(palindromicLower, palindromicUpper)
      return NextResponse.json({
        result: palindromicPrimes.length > 0,
        details: `Found ${palindromicPrimes.length} palindromic primes in range [${palindromicLower}, ${palindromicUpper}]`,
        primes: palindromicPrimes.slice(0, 10), // Show first 10
        count: palindromicPrimes.length,
      })

    case "perfect-number":
      const perfectNumbers = [6, 28, 496, 8128, 33550336]
      return NextResponse.json({
        result: true,
        details: `Known perfect numbers: ${perfectNumbers.join(", ")}`,
        perfectNumbers,
        count: perfectNumbers.length,
      })

    case "goldbach-conjecture":
      const digits = Number.parseInt(body.input)
      if (isNaN(digits) || digits < 1) {
        return NextResponse.json({ error: "Please enter a positive integer for number of digits" })
      }
      const evenNumber = generateEvenNumber(digits)
      const pairs = findGoldbachPairs(evenNumber)
      return NextResponse.json({
        result: pairs.length > 0,
        details: `${evenNumber} (${digits} digits) = ${pairs
          .slice(0, 3)
          .map((p) => `${p[0]} + ${p[1]}`)
          .join(", ")}${pairs.length > 3 ? "..." : ""}`,
        evenNumber,
        pairs: pairs.slice(0, 5),
        count: pairs.length,
      })

    case "collatz-conjecture":
      const randomStart = Math.floor(Math.random() * 100) + 1
      const sequence = generateCollatzSequence(randomStart)
      return NextResponse.json({
        result: sequence[sequence.length - 1] === 1,
        details: `Random start: ${randomStart}, Sequence length: ${sequence.length} steps`,
        sequence: sequence.slice(0, 20),
        fullLength: sequence.length,
        maxValue: Math.max(...sequence),
        startNumber: randomStart,
      })

    case "mersenne-primes":
      const lowerBound = Number.parseInt(body.lowerBound)
      const upperBound = Number.parseInt(body.upperBound)
      if (isNaN(lowerBound) || isNaN(upperBound) || lowerBound < 2 || upperBound < lowerBound) {
        return NextResponse.json({ error: "Please enter valid bounds (lower ≥ 2, upper ≥ lower)" })
      }
      const mersennePrimes = findMersennePrimes(lowerBound, upperBound)
      return NextResponse.json({
        result: mersennePrimes.length > 0,
        details: `Found ${mersennePrimes.length} Mersenne primes in range [${lowerBound}, ${upperBound}]`,
        primes: mersennePrimes,
        count: mersennePrimes.length,
      })

    case "repunit-primes":
      const repunitLower = Number.parseInt(body.lowerBound)
      const repunitUpper = Number.parseInt(body.upperBound)
      if (isNaN(repunitLower) || isNaN(repunitUpper) || repunitLower < 2 || repunitUpper < repunitLower) {
        return NextResponse.json({ error: "Please enter valid bounds (lower ≥ 2, upper ≥ lower)" })
      }
      const repunitPrimes = findRepunitPrimes(repunitLower, repunitUpper)
      return NextResponse.json({
        result: repunitPrimes.length > 0,
        details: `Found ${repunitPrimes.length} repunit primes in range [${repunitLower}, ${repunitUpper}]`,
        primes: repunitPrimes,
        count: repunitPrimes.length,
      })

    default:
      return NextResponse.json({ error: "Unknown conjecture type" })
  }
}

// Helper functions
function checkPrime(n: number): boolean {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}

function getDivisors(n: number): number[] {
  const divisors = []
  for (let i = 1; i < n; i++) {
    if (n % i === 0) divisors.push(i)
  }
  return divisors
}

function findGoldbachPairs(n: number): [number, number][] {
  const pairs: [number, number][] = []
  for (let i = 2; i <= n / 2; i++) {
    if (checkPrime(i) && checkPrime(n - i)) {
      pairs.push([i, n - i])
    }
  }
  return pairs
}

function generateCollatzSequence(n: number): number[] {
  const sequence = [n]
  let current = n
  while (current !== 1 && sequence.length < 1000) {
    // Limit to prevent infinite loops
    current = current % 2 === 0 ? current / 2 : current * 3 + 1
    sequence.push(current)
  }
  return sequence
}

function findPalindromicPrimes(minDigits: number): number[] {
  const primes = []
  const start = Math.pow(10, minDigits - 1)
  const end = Math.min(start * 10, 100000) // Limit for performance

  for (let i = start; i < end; i++) {
    if (isPalindromic(i) && checkPrime(i)) {
      primes.push(i)
    }
  }
  return primes
}

function findPalindromicPrimesInRange(lower: number, upper: number): number[] {
  const primes = []
  const end = Math.min(upper, 100000) // Limit for performance

  for (let i = lower; i <= end; i++) {
    if (isPalindromic(i) && checkPrime(i)) {
      primes.push(i)
    }
  }
  return primes
}

function isPalindromic(n: number): boolean {
  return n.toString() === n.toString().split("").reverse().join("")
}

function generateEvenNumber(digits: number): number {
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  return num % 2 === 0 ? num : num + 1
}

function findMersennePrimes(lower: number, upper: number): Array<{ exponent: number; value: number }> {
  const mersennePrimes = []
  for (let p = lower; p <= upper && p <= 20; p++) {
    // Limit to prevent overflow
    if (checkPrime(p)) {
      const mersenne = Math.pow(2, p) - 1
      if (checkPrime(mersenne)) {
        mersennePrimes.push({ exponent: p, value: mersenne })
      }
    }
  }
  return mersennePrimes
}

function findRepunitPrimes(lower: number, upper: number): Array<{ digits: number; value: string }> {
  const repunitPrimes = []
  for (let n = lower; n <= upper && n <= 10; n++) {
    // Limit for performance
    const repunit = Number.parseInt("1".repeat(n))
    if (checkPrime(repunit)) {
      repunitPrimes.push({ digits: n, value: "1".repeat(n) })
    }
  }
  return repunitPrimes
}

function findTwinPrimes(lower: number, upper: number): Array<{ prime1: number; prime2: number }> {
  const twinPairs = []
  for (let i = lower; i <= upper - 2; i++) {
    if (checkPrime(i) && checkPrime(i + 2)) {
      twinPairs.push({ prime1: i, prime2: i + 2 })
    }
  }
  return twinPairs
}
