from sympy import isprime

def mersenne_primes(n1, n2):
    primes = []
    for p in range(n1, n2 + 1):
        if isprime(p):  
            M = 2**p - 1  
            if isprime(M):
                primes.append((p, M))
    return primes

def func():
    exp1, exp2 = 2203, 2281
    # mersenne = mersenne_primes(exp1, exp2)
    # exp1 = mersenne[0]
    # exp2 = mersenne[-1]

    p1 = 2**exp1 - 1
    p2 = 2**exp2 - 1
    low = p1**2
    high = p2**2

    primes = []
    for n in range(low + 1, high):
        if isprime(n):
            primes.append(n)
            if len(primes) == 4:  
                break
    primeoutput = ""
    for prime in primes:
        primeoutput += str(prime) + "\n\n"
    return primeoutput

