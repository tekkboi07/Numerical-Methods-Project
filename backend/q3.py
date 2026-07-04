from sympy import isprime

def func(n1, n2):
    primes = []
    for p in range(n1, n2 + 1):
        if isprime(p):  
            M = 2**p - 1  
            if isprime(M):
                primes.append((p, M))
    return primes
