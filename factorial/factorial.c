/* Computes the factorial of a given integer input */

#include <stdio.h>
#include <stdlib.h>

int factorial(int input) {
    if (input < 0) {
        printf("Factorial of negative number is undefined.\n");
        exit(1);
    }

    int result = 1;

    for (int i = 1; i <= input; i++) {
        result *= i;
    }

    return result;
}

// Tests
int main() {
    int result = factorial(0);
    printf("%i\n", result); // result = 0

    result = factorial(5);
    printf("%i\n", result); // result = 120

    result = factorial(-5);
    printf("%i\n", result); // undefined
}
