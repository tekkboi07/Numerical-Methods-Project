import gmpy2

def verify_perfect(p):
    if not gmpy2.is_prime(p):
        return False

    mersenne = gmpy2.mpz(2)**p - 1
    if not gmpy2.is_prime(mersenne):
        raise ValueError("2^p - 1 is not prime")

    # Euclid–Euler formula for even perfect numbers
    N = (gmpy2.mpz(2) ** (p - 1)) * mersenne

    sigma_N = (gmpy2.mpz(2)**p - 1) * (1 + mersenne)
    proper_divisor_sum = sigma_N - N

    return proper_divisor_sum == N



def func(p, p1):
    return f"Verification for p={p}, Perfect Number: {verify_perfect(p)}"


# Example usage
p_values = [2203, 2281]