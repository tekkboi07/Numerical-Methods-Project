import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { conjectureType } = body

  try {
    // For now, mock the external API call
    // const externalResponse = await fetch("http://localhost:3000/compute", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // })
    // const result = await externalResponse.json()

    // Mock response based on conjecture type
    const mockResult = await getMockResult(conjectureType, body)
    return NextResponse.json(mockResult)
  } catch (error) {
    return NextResponse.json({ error: "External API call failed" }, { status: 500 })
  }
}

async function getMockResult(conjectureType: string, params: any) {
  switch (conjectureType) {
    case "twin-primes":
      return {
        details: `Found 8 twin prime pairs in range [${params.lowerBound}, ${params.upperBound}]`,
        count: 8,
      }
    case "palindromic-primes":
      return {
        details: `Found 4 palindromic primes in range [${params.lowerBound}, ${params.upperBound}]`,
        count: 4,
      }
    case "perfect-number":
      return {
        details: "Known perfect numbers: 6, 28, 496, 8128, 33550336",
        count: 5,
      }
    case "goldbach-conjecture":
      return {
        details: `1234 (${params.input} digits) = 3 + 1231, 7 + 1227, 13 + 1221`,
        count: 3,
      }
    case "collatz-conjecture":
      return {
        details: "Random start: 27, Sequence length: 111 steps",
        sequence: [27, 82, 41, 124, 62, 31, 94, 47, 142, 71, 214, 107, 322, 161, 484, 242, 121, 364, 182, 91],
        fullLength: 111,
        maxValue: 9232,
      }
    case "mersenne-primes":
      return {
        details: `Found 2 Mersenne primes in range [${params.lowerBound}, ${params.upperBound}]`,
        count: 2,
      }
    case "repunit-primes":
      return {
        details: `Found 1 repunit prime in range [${params.lowerBound}, ${params.upperBound}]`,
        count: 1,
      }
    default:
      return { error: "Unknown conjecture type" }
  }
}
