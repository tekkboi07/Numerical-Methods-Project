# pip install sympy
from sympy import isprime
import random

def _small_primes(limit=2000):
    """Tiny sieve to prefilter obvious composites quickly."""
    sieve = [True] * (limit + 1)
    sieve[0] = sieve[1] = False
    for p in range(2, int(limit**0.5) + 1):
        if sieve[p]:
            step = p
            start = p * p
            sieve[start:limit+1:step] = [False] * (((limit - start)//step) + 1)
    # 2 and 5 are never last digits of large palindromic primes; skip them anyway
    return [p for p in range(2, limit + 1) if sieve[p] and p not in (2, 5)]

SMALL_PRIMES = _small_primes(2000)

def _quick_composite(n: int) -> bool:
    for q in SMALL_PRIMES:
        if n % q == 0:
            return True
    return False

def _rand_pal_odd_len(L: int) -> int:
    """Random odd-length base-10 palindrome of length L with quick mod-3 avoidance."""
    assert L % 2 == 1 and L >= 1
    h = L // 2

    # First digit must give an odd, non-5 last digit
    first = random.choice(['1', '3', '7', '9'])
    left_rest = ''.join(str(random.randint(0, 9)) for _ in range(h - 1))
    left = first + left_rest

    # Digit-sum trick: for odd length, sum = 2*sum(left) + mid
    # Choose mid so total digit sum ≢ 0 (mod 3), avoiding divisibility by 3
    sum_left_mod3 = sum(int(d) for d in left) % 3
    forbidden_mid_mod3 = (-2 * sum_left_mod3) % 3
    mid_choices = [str(d) for d in range(10) if d % 3 != forbidden_mid_mod3]
    mid = random.choice(mid_choices)

    s = left + mid + left[::-1]
    return int(s)

def func(n: int, n2, max_tries_per_len: int = 50000) -> int:
    """
    Returns a palindromic prime with at least n digits.
    - Skips even lengths (all such palindromes > 11 are composite).
    - Uses small-prime trial division before sympy.isprime for speed.
    - If unlucky at a given odd length, automatically moves to the next odd length.
    """
    if n <= 1:
        return 2
    # Force odd length (50 → 51, etc.)
    L = n if n % 2 == 1 else n + 1

    while True:
        for _ in range(max_tries_per_len):
            cand = _rand_pal_odd_len(L)
            if not _quick_composite(cand) and isprime(cand):
                return f"Found palindromic prime with at least {n} digits: {cand}"
        # If none found after many tries, bump to next odd length
        L += 2
