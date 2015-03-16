#!/usr/bin/env ruby

# Computes the factorial of a given integer input
def factorial(input)
  if input < 0
    raise ArgumentError.new("Factorial of negative number is undefined.")
  end

  result = 1

  for i in 1..input
    result *= i
  end

  result
end
