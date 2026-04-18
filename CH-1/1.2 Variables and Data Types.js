// var Function-scoped, hoisted, re-declarable
// Oldest way. Scoped to the nearest function (not block). Hoisted to top of function with value undefined. Avoid in modern code.

// Hoisting trap — prints undefined, not ReferenceError
console.log(name); // undefined
var name = "Alice";

// Leaks out of blocks
if (true) { var leaky = "oops"; }
console.log(leaky); // "oops" — visible outside!
//  Production rule: never use var. It causes subtle hoisting bugs and scope leaks. Always prefer let or const.




// let
// Block-scoped, not hoisted, re-assignable
// Modern mutable variable. Scoped to the nearest { } block. Throws ReferenceError if accessed before declaration (temporal dead zone).

// Block scope — stays inside the block
if (true) {
  let score = 42;
  console.log(score); // 42
}
console.log(score); // ReferenceError ✓ safe

// For loops — each iteration gets its own scope
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// prints 0, 1, 2 (not 3,3,3 like var would)
// ✓ Production rule: use let for loop counters or values that genuinely change over time.




// const
// Block-scoped, not hoisted, binding is immutable
// Declares a constant binding — the variable cannot be re-assigned. Objects/arrays referenced by const can still be mutated internally.

// Can't re-assign
// const MAX_RETRY = 3;
// MAX_RETRY = 5; // TypeError in production ✓ catches bugs

 // Object is still mutable — binding is const, not object
// const user = { name: "Alice" };
// user.name = "Bob"; // fine
// user = {};         // TypeError

// Freeze to make object truly immutable
// const config = Object.freeze({ timeout: 5000 });
// ✓ Production rule: default to const for everything. Only switch to let when you know the value will change. This makes code intent obvious at a glance.



// Here's a quick summary of the production wisdom baked into each section:
// var / let / const — Default to const. Use let only when you know the value changes. Never use var. This one habit alone prevents a whole class of bugs.
// Primitive types — There are 7: string, number, bigint, boolean, null, undefined, symbol. The big gotcha is that 0.1 + 0.2 !== 0.3 — use toFixed() for display and integer cents for money.
// Non-primitive types — Objects, Arrays, Functions, Map, Set. They are all stored by reference, which means passing them to functions can mutate the original unexpectedly. Always clone when you need a safe copy.
// Type conversion — Explicit conversion with Number(), String(), Boolean(). Watch out: Boolean("0") is true and Boolean([]) is true — empty doesn't mean falsy for objects.
// Type coercion — JavaScript's sneakiest feature. The three golden rules: always use ===, never use + to add a string and number (convert first), and prefer ?? over || for defaults.
// Want me to go deeper on any specific topic or add more examples?