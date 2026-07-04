from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import q1, q2, q3, q4, q5, q6, q7

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/compute")
async def compute_problems(request: Request):
    data = await request.json()
    problemType = data['conjectureType']
    input1 = data.get('input_1', 1)
    input2 = data.get('input_2', 1)

    if not input1.isdigit():
        input1 = 1
    if not input2.isdigit():
        intpu2 = 1

    print(input1, input2)


    match problemType:
        case "palindromic-primes":
            return q1.func(int(input1), int(input2))

        case "perfect-number":
            return q6.func(int(input1), 1)

        case "goldbach-conjecture":
            return q7.func(int(input1), 1)

        case "collatz-conjecture":
            return q4.func()

        case "twin-primes":
            return q5.func(int(input1), 1)

        case "mersenne-primes":
            return q3.func(int(input1), int(input2))

        case "repunit-primes":
            return q2.func(int(input1), int(input2))

        case _:
            return f"Unknown conjecture: {problemType}"

    return {"answer": 1}