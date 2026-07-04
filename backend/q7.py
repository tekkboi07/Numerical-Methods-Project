import random
from sympy import isprime, primerange

def random_even_number(digits=4):
    """Generate a random even number with given number of digits."""
    n = random.randint(10**(digits - 1), 10**digits - 1)
    return n if n % 2 == 0 else n + 1

def func(digits, p2):
    """Pick a random even number and verify Goldbach's conjecture."""
    n = random_even_number(digits)
    print(f"Testing number: {n}")

    for p in primerange(2, n):
        q = n - p
        if isprime(q):
            return f"Goldbach verified: {n} = {p} + {q}"

    return f"Goldbach conjecture failed for {n} (very unlikely!)"
