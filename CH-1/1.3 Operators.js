// + (Addition)
// Adds numbers or concatenates strings
// 10 + 5 // 15
// "Hello" + " " + "World" // "Hello World"
// ⚠️ Production tip: Watch out for type coercion! 5 + "5" returns "55" (string), not 10. Use explicit types: Number("5") + 5 or parseInt("5") + 5




// - (Subtraction)
// Subtracts one number from another
// 10 - 3 // 7
// const balance = 100;
// balance = balance - 25; // 75
// ✓ Production tip: Always validate input before subtraction. For finances, use decimal libraries like decimal.js to avoid floating-point errors.




// * (Multiplication)
// Multiplies two numbers
// 10 * 5 // 50
// const price = 29.99;
// const total = price * 3; // 89.97
// ⚠️ Production tip: Beware of floating-point math: 0.1 * 0.2 gives 0.020000000000000004 not 0.02. For financial calculations, multiply by 100, do integer math, then divide.



// / (Division)
// Divides one number by another
// 10 / 2 // 5
// 10 / 0 // Infinity (not an error!)
// ⚠️ Critical: Division by zero returns Infinity, not an error. Always check: if (divisor === 0) throw new Error('Division by zero')


// % (Modulo - Remainder)
// Returns the remainder after division
// 10 % 3 // 1
// 15 % 5 // 0
// -10 % 3 // -1
// ✓ Production use: Check if number is even/odd, paginate arrays, cycle through patterns:
// if (number % 2 === 0) { /* even */ }
// const pageIndex = currentPage % itemsPerPage;



