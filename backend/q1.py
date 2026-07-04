from gmpy2 import mpz, is_prime
from tqdm import tqdm

def generate_number(n):
    """
    Generates number in pattern: 123...n...(n-1)...321
    Returns as string to handle huge numbers
    """
    first_half = ''.join(str(i) for i in range(1, n + 1))
    second_half = ''.join(str(i) for i in range(n - 1, 0, -1))
    return first_half + second_half

def func(start, end):
    for n in tqdm(range(start, end + 1)):
        num_str = generate_number(n)
        number = mpz(num_str)
        if is_prime(number, 25):
            return f"Prime found for n = {n}"
    return "No Prime Found"

if __name__ == "__main__":
    print(func(5, 1000))
