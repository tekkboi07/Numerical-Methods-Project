from sympy import isprime

def func(n1, n2):
    primes = []
    for N in range(n1, n2 + 1):
        if isprime(N):  
            repunit = (10**N - 1) // 9 
            if isprime(repunit):
                primes.append(repunit)
    primeoutput = ""
    for prime in primes:
        primeoutput += str(prime) + ",\n\n"
    return  primeoutput