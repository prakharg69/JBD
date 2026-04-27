// # 2.1 Execution Context and Scope — Complete Guide

/* ============================================================================
   PART 1: EXECUTION CONTEXT BASICS
   ============================================================================ */

/* What is an Execution Context?
 * An execution context is an abstract concept that contains the environment 
 * in which JavaScript code is evaluated and executed. It tracks:
 * - Variable environment (variables, functions)
 * - Scope chain
 * - `this` value
 */

/* Types of Execution Contexts:
 * 1. Global Execution Context (GEC) — Default context when code first runs
 * 2. Function Execution Context (FEC) — Created when a function is called
 * 3. Eval Execution Context — Inside eval() (rarely used, avoid)
 */

//! GLOBAL EXECUTION CONTEXT (GEC)
// Created when JavaScript engine starts
// Creates:
// - Global object (window in browsers, global in Node.js)
// - `this` binding (points to global object)
// - Sets up memory for variables and functions

// Example: Global scope
const globalVar = "I'm global";
function globalFunc() {
  console.log("I'm a global function");
}

//? THE TWO PHASES OF EXECUTION CONTEXT

/* Phase 1: Creation Phase (Memory Creation / Hoisting)
 * - Creates the variable environment
 * - Sets up scope chain
 * - Determines `this` value
 * - Hoists function declarations (stored in memory)
 * - Hoists variable declarations (initialized as 'undefined')
 */

/* Phase 2: Execution Phase (Code Execution)
 * - Assigns values to variables
 * - Executes code line by line
 * - Invokes functions (creates new execution contexts)
 */

/* ============================================================================
   PART 2: GLOBAL EXECUTION CONTEXT IN DEPTH
   ============================================================================ */

//! WHAT HAPPENS IN GLOBAL EXECUTION CONTEXT?

/* Step 1: Creation Phase (Global)
 * 
 * 1. Create global object:
 *    - Browser: `window`
 *    - Node.js: `global`
 * 
 * 2. Set up `this`:
 *    - `this` = global object
 * 
 * 3. Hoisting:
 *    - Function declarations: Stored fully in memory
 *    - Variable declarations (`var`): Set to `undefined`
 *    - `let`/`const`: Hoisted but NOT initialized (Temporal Dead Zone)
 */

console.log("=== Global Execution Context Demo ===");

// Hoisting demonstration
console.log(hoistedVar);        // undefined (not error!)
// console.log(letVar);          // ReferenceError: Cannot access before initialization
// console.log(constVar);        // ReferenceError: Cannot access before initialization

var hoistedVar = "I'm hoisted";
let letVar = "I'm in TDZ initially";
const constVar = "I'm also in TDZ";

// Function declaration hoisting
hoistedFunc();                  // Works! "I'm hoisted"
function hoistedFunc() {
  console.log("I'm hoisted");
}

// Function expression hoisting
// notHoisted();                // TypeError: notHoisted is not a function
var notHoisted = function() {
  console.log("I'm NOT hoisted");
};

/* ============================================================================
   PART 3: FUNCTION EXECUTION CONTEXT
   ============================================================================ */

/* What is Function Execution Context?
 * Created every time a function is invoked (called). Each function call gets 
 * its own execution context, which is pushed onto the call stack.
 */

//! CREATION OF FUNCTION EXECUTION CONTEXT


//Lexical scope defines the accessibility of variables and functions depending on their location in the source code. Variables and functions have different levels of scope:

function outerFunction(param) {
  var outerVar = "I'm outer";
  
  function innerFunction() {
    var innerVar = "I'm inner";
    console.log(outerVar);     // Accesses outerVar (lexical scope)
    console.log(param);        // Accesses parameter
  }
  
  innerFunction();
}

outerFunction("Hello");

/* Steps when outerFunction("Hello") is called:
 * 
 * 1. CREATE new Function Execution Context
 * 
 * 2. CREATION PHASE:
 *    - Arguments object: {0: "Hello", length: 1}
 *    - Parameter: param = "Hello"
 *    - Variable: outerVar = undefined (hoisted)
 *    - Function: innerFunction stored in memory
 *    - Scope chain: [outerFunction's scope, global scope]
 *    - `this`: Determined by how function is called
 * 
 * 3. EXECUTION PHASE:
 *    - outerVar = "I'm outer"
 *    - innerFunction() called → Creates new FEC
 */

//? FUNCTION EXECUTION CONTEXT INTERNALS
function demonstrateContext(a, b) {
  var result = a + b;
  
  function multiplyByTwo(num) {
    return num * 2;
  }
  
  return multiplyByTwo(result);
}

demonstrateContext(5, 3);

/* Context Stack (Call Stack):
 * 
 * Step 1: Global EC pushed
 * Step 2: demonstrateContext() invoked → Push FEC
 * Step 3: multiplyByTwo() invoked → Push another FEC
 * Step 4: multiplyByTwo() returns → Pop FEC
 * Step 5: demonstrateContext() returns → Pop FEC
 */

/* ============================================================================
   PART 4: SCOPE AND LEXICAL SCOPE
   ============================================================================ */

/* What is Scope?
 * Scope determines where variables and functions are accessible in your code.
 * JavaScript has function scope (for `var`) and block scope (for `let`/`const`).
 */

/* Types of Scope:
 * 1. Global Scope — Accessible everywhere
 * 2. Function Scope — Accessible only inside function (`var`)
 * 3. Block Scope — Accessible only inside block (`let`, `const`)
 */

//! GLOBAL SCOPE
var globalScopeVar = "I'm global";
let globalLet = "Also global";
const globalConst = "Also global";

function showGlobal() {
  console.log(globalScopeVar);     // Accessible
  console.log(globalLet);          // Accessible
  console.log(globalConst);        // Accessible
}

//! FUNCTION SCOPE (var)
function functionScope() {
  var functionVar = "I'm function-scoped";
  
  if (true) {
    var alsoFunctionScoped = "Still function-scoped";
    let blockScoped = "Only in this block";
  }
  
  console.log(functionVar);        // ✅ Works
  console.log(alsoFunctionScoped); // ✅ Works (var ignores block)
  // console.log(blockScoped);     // ❌ ReferenceError
}

//! BLOCK SCOPE (let, const)
{
  let blockLet = "Only in this block";
  const blockConst = "Also only in this block";
  var blockVar = "Leaks out of block!";
  
  console.log(blockLet);           // ✅ Works
  console.log(blockConst);         // ✅ Works
}

console.log(blockVar);             // ✅ Works (var leaks)
// console.log(blockLet);          // ❌ ReferenceError
// console.log(blockConst);        // ❌ ReferenceError

// --------------------------------------------
// LEXICAL SCOPE
// --------------------------------------------

/* What is Lexical Scope?
 * Lexical scope means that a function's scope is determined by where it is 
 * WRITTEN in the code, not where it is CALLED. Also called "static scope".
 * Lexical scope (or static scope) determines variable accessibility based on where functions/blocks are defined in the source code
 * 
 * Key Point: Inner functions have access to variables of outer functions
 * regardless of where they are called from.
 */

//! LEXICAL SCOPING EXAMPLE

const outerVarLexical = "Global";

function outerFunctionLexical() {
  const outerVar = "I'm from outer";
  
  function innerFunction() {
    const innerVar = "I'm from inner";
    console.log(outerVar);         // Accesses outer's variable
    console.log(outerVarLexical);  // Accesses global variable
  }
  
  innerFunction();
  
  // console.log(innerVar);        // ❌ ReferenceError (can't access inner)
}

outerFunctionLexical();

/* Visual of Lexical Scope:
 * 
 * Global Scope
 *   ├── outerVarLexical
 *   └── outerFunctionLexical
 *        └── outerVar
 *        └── innerFunction
 *             └── innerVar
 * 
 * innerFunction can see: outerVar, outerVarLexical (OUTER scopes)
 * outerFunction can see: outerVarLexical, but NOT innerVar
 */

//! LEXICAL SCOPE vs DYNAMIC SCOPE (Conceptual)
// JavaScript uses LEXICAL scope (determined by CODE STRUCTURE)

let value = "global";

function printValue() {
  console.log(value);    // Which 'value' does this use?
}

function setAndPrint() {
  let value = "local";
  printValue();          // Prints "global" (lexical scope)
}

setAndPrint();           // "global" - uses where function was DEFINED, not CALLED

/* ============================================================================
   PART 5: SCOPE CHAIN
   ============================================================================ */

/* What is Scope Chain?
 * The scope chain is the hierarchy of scopes that JavaScript traverses to 
 * find a variable. It goes from innermost scope → outer → global.
 * 
 * When a variable is referenced, JavaScript:
 * 1. Looks in current scope
 * 2. If not found, moves to outer/parent scope
 * 3. Continues until global scope
 * 4. If still not found → ReferenceError (for let/const) or undefined (var)
 */

//! SCOPE CHAIN IN ACTION

const globalColor = "blue";

function level1() {
  const color1 = "red";
  
  function level2() {
    const color2 = "green";
    
    function level3() {
      const color3 = "yellow";
      
      console.log(color3);  // Found in level3 → "yellow"
      console.log(color2);  // Found in level2 → "green"
      console.log(color1);  // Found in level1 → "red"
      console.log(globalColor); // Found in global → "blue"
      // console.log(notExist); // ❌ ReferenceError
    }
    
    level3();
  }
  
  level2();
}

level1();

/* Scope Chain Visual:
 * 
 * level3() scope ──┐
 *                  │ (can't find color2)
 * level2() scope ←─┤ (can't find color1)
 *                  │
 * level1() scope ←─┤ (can't find globalColor)
 *                  │
 * Global scope ←───┘ (found!)
 */

//? DEMONSTRATING SCOPE CHAIN LOOKUP
let message = "Global";

function outer() {
  let message = "Outer";
  
  function middle() {
    // No 'message' declared here
    let otherVar = "something";
    
    function inner() {
      console.log(message);  // Which message?
    }
    
    inner();
  }
  
  middle();
}

outer();  // "Outer" (finds in outer() scope, not global)

//! SHADOWING
/* Shadowing occurs when an inner scope declares a variable with the same name 
 * as a variable in an outer scope. The inner variable "shadows" the outer one.
 */

let shadowVar = "Global";

function shadowingDemo() {
  let shadowVar = "Function";  // Shadows global
  
  if (true) {
    let shadowVar = "Block";   // Shadows function scope
    console.log(shadowVar);    // "Block"
  }
  
  console.log(shadowVar);      // "Function"
}

console.log(shadowVar);        // "Global"
shadowingDemo();

/* ============================================================================
   PART 6: VARIABLE HOISTING DETAILS
   ============================================================================ */

/* Hoisting Rules Summary:
 * 
 * | Declaration Type  | Hoisted? | Initial Value      | Scope     |
 * |------------------|----------|--------------------|-----------|
 * | function         | Yes      | Function reference | Block     |
 * | var              | Yes      | undefined          | Function  |
 * | let              | Yes      | Uninitialized (TDZ)| Block     |
 * | const            | Yes      | Uninitialized (TDZ)| Block     |
 */

//! VAR HOISTING
console.log(varHoist);     // undefined (not ReferenceError)
var varHoist = "value";
console.log(varHoist);     // "value"

// Equivalent to:
// var varHoist;
// console.log(varHoist);
// varHoist = "value";

//! LET/CONST HOISTING (Temporal Dead Zone - TDZ)
// console.log(letHoist);   // ❌ ReferenceError: Cannot access before initialization
let letHoist = "value";

// console.log(constHoist); // ❌ ReferenceError
const constHoist = "value";

/* Temporal Dead Zone (TDZ):
 * The time between entering a scope and the actual declaration where 
 * the variable cannot be accessed.
 */

{
  // TDZ starts for 'tdzVar'
  // console.log(tdzVar);    // ❌ ReferenceError (TDZ)
  let tdzVar = "initialized";
  console.log(tdzVar);       // ✅ Works (TDZ ends)
}

//! FUNCTION HOISTING (Full hoisting)
hoistedFunction();           // ✅ Works

function hoistedFunction() {
  console.log("I'm fully hoisted");
}

//! FUNCTION EXPRESSION HOISTING
// notHoistedFunc();         // ❌ TypeError
var notHoistedFunc = function() {
  console.log("Not fully hoisted");
};

//! ARROW FUNCTION HOISTING
// notHoistedArrow();        // ❌ ReferenceError (TDZ)
const notHoistedArrow = () => {
  console.log("Arrow functions have TDZ");
};

/* ============================================================================
   PART 7: THE CALL STACK
   ============================================================================ */

/* What is the Call Stack?
 * The call stack is a data structure that tracks the execution of functions.
 * It follows LIFO (Last In, First Out) principle.
 */

//! VISUALIZING THE CALL STACK

function first() {
  console.log("First started");
  second();
  console.log("First ended");
}

function second() {
  console.log("Second started");
  third();
  console.log("Second ended");
}

function third() {
  console.log("Third started");
  console.log("Third ended");
}

first();

/* Call Stack Evolution:
 * 
 * Step 1: Global EC
 * Step 2: Global → first() called → Push first()
 * Step 3: first() → second() called → Push second()
 * Step 4: second() → third() called → Push third()
 * Step 5: third() completes → Pop third()
 * Step 6: second() completes → Pop second()
 * Step 7: first() completes → Pop first()
 * Step 8: Back to Global EC
 */

//! STACK OVERFLOW (Recursion without base case)
function infiniteRecursion() {
  infiniteRecursion();  // No base condition
}
// infiniteRecursion();  // ❌ RangeError: Maximum call stack size exceeded

// Proper recursion
function factorial(n) {
  if (n <= 1) return 1;      // Base case
  return n * factorial(n - 1);
}

console.log(factorial(5));   // 120

/* ============================================================================
   PART 8: `this` IN EXECUTION CONTEXTS
   ============================================================================ */

/* What is `this`?
 * `this` is a special keyword that refers to the execution context's owner.
 * Its value depends on HOW the function is called, not where it's defined.
 */

//! GLOBAL CONTEXT `this`
console.log(this);           // Browser: window, Node.js: global

// In strict mode (module or 'use strict')
// 'use strict';
// console.log(this);        // undefined (in function context)

//! FUNCTION CONTEXT `this`
function showThis() {
  console.log(this);
}
showThis();                  // Non-strict: global, Strict: undefined

//! METHOD CONTEXT `this`
const objMethod = {
  name: "Rahul",
  greet: function() {
    console.log(this.name);   // `this` refers to objMethod
  }
};
objMethod.greet();           // "Rahul"

//! ARROW FUNCTIONS AND `this`
/* Arrow functions DO NOT have their own `this`. They inherit `this` from 
 * their lexical (surrounding) scope.
 */

const arrowObj = {
  name: "Priya",
  regularFunc: function() {
    console.log(this.name);    // "Priya" (regular function)
  },
  arrowFunc: () => {
    console.log(this.name);    // undefined (inherits from global)
  }
};
arrowObj.regularFunc();        // "Priya"
arrowObj.arrowFunc();          // undefined

/* ============================================================================
   PART 9: CLOSURES (Application of Lexical Scope)
   ============================================================================ */

/* What is a Closure?
 * A closure is the combination of a function bundled together with its 
 * lexical environment (the variables that were in scope when the function 
 * was defined).
 * A Closure in JavaScript is when a function remembers and can access variables from its outer (parent) scope even after the outer function has finished executing.
 * 
 * Closures allow a function to access variables from its outer scope even 
 * after the outer function has returned.
 */

//! BASIC CLOSURE EXAMPLE
function outerClosure(outerVar) {
  function innerClosure(innerVar) {
    console.log(outerVar + innerVar);
    console.log(`Outer: ${outerVar}, Inner: ${innerVar}`);
  }
  return innerClosure;
}

const closureFunc = outerClosure("Hello");
closureFunc("World");          // "HelloWorld"
// The inner function "remembers" outerVar even though outerClosure() is done

//! PRACTICAL CLOSURE EXAMPLES

// 1. Counter
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getCount());   // 2

// 2. Private variables (Module Pattern)
function createUser(name, age) {
  // Private variables
  let _name = name;
  let _age = age;
  
  // Public methods (closure)
  return {
    getName: function() {
      return _name;
    },
    getAge: function() {
      return _age;
    },
    setAge: function(newAge) {
      if (newAge > 0) {
        _age = newAge;
      }
    }
  };
}

const user = createUser("Rahul", 25);
console.log(user.getName());      // "Rahul"
console.log(user._name);          // undefined (private)
user.setAge(26);
console.log(user.getAge());       // 26

// 3. Loop closure problem and solution
// PROBLEM (var creates issues)
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log("var loop:", i);   // All print 4
  }, 0);
}
// All print: 4, 4, 4 (because i is function-scoped and shared)

// SOLUTION 1: Use let (block scope)
for (let j = 1; j <= 3; j++) {
  setTimeout(function() {
    console.log("let loop:", j);   // Prints 1, 2, 3
  }, 0);
}

// SOLUTION 2: Closure with IIFE
for (var k = 1; k <= 3; k++) {
  (function(index) {
    setTimeout(function() {
      console.log("IIFE closure:", index);  // Prints 1, 2, 3
    }, 0);
  })(k);
}

/* ============================================================================
   PART 10: BLOCK, FUNCTION, MODULE SCOPE
   ============================================================================ */

//! BLOCK SCOPE (let, const)
if (true) {
  let blockLetVar = "Block scoped";
  const blockConstVar = "Also block scoped";
  var blockVarVar = "Function scoped";
}
// console.log(blockLetVar);      // ❌ ReferenceError
// console.log(blockConstVar);    // ❌ ReferenceError
console.log(blockVarVar);         // ✅ Works

//! FUNCTION SCOPE
function demoFunctionScope() {
  var functionScoped = "Function scope";
  let blockScoped = "Block scope";
  
  if (true) {
    var stillFunctionScoped = "Still accessible";
    let blockOnly = "Only in block";
  }
  
  console.log(stillFunctionScoped);  // ✅ Works
  // console.log(blockOnly);         // ❌ ReferenceError
}
// console.log(functionScoped);      // ❌ ReferenceError

//! MODULE SCOPE (ES6 Modules)
// file: module.js
// const moduleVar = "Only in this module";
// export const exportedVar = "Available to importers";

// MODULE SCOPE CHARACTERISTICS:
// - Each module has its own scope
// - Variables are private unless exported
// - Modules are in strict mode by default
// - Top-level `this` is undefined (not global)

/* ============================================================================
   PRODUCTION CHECKLIST
   ============================================================================ */

/* Execution Context
 * ✅ Understand the two phases: Creation and Execution
 * ✅ Remember: Global EC is created when script starts
 * ✅ Each function call creates a new Function EC
 * ✅ Use the call stack to debug nested functions
 */

/* Scope
 * ✅ Use `let` and `const` for block scoping (avoid `var`)
 * ✅ Understand lexical scope (where function is DEFINED matters)
 * ✅ Be aware of the Temporal Dead Zone for let/const
 * ✅ Use modules to create private scopes
 * ✅ Avoid polluting global scope
 */

/* Hoisting
 * ✅ Declare variables at the top of their scope
 * ✅ Use function declarations for hoisting (when needed)
 * ✅ Be careful with function expressions and arrow functions
 * ✅ Initialize variables before use
 */

/* Closures
 * ✅ Use closures for data privacy and encapsulation
 * ✅ Be mindful of memory usage (closures keep variables alive)
 * ✅ Watch for the loop closure problem (use let or IIFE)
 * ✅ Use closures for function factories and currying
 */

/* this Keyword
 * ✅ Arrow functions inherit `this` from parent scope
 * ✅ Regular functions have `this` determined by call site
 * ✅ Use bind(), call(), apply() to control `this`
 * ✅ Be careful with `this` in event handlers and callbacks
 */

/* ============================================================================
   EXAMPLE: PRACTICAL APPLICATION
   ============================================================================ */

//! 1. Counter with different scope patterns

// Using closure (encapsulation)
function createSecureCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = initialValue; },
    getValue: () => count
  };
}

const scoreCounter = createSecureCounter(10);
scoreCounter.increment();  // 11
scoreCounter.increment();  // 12
console.log(scoreCounter.getValue());  // 12

//! 2. Memoization using closure

function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] === undefined) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

const expensiveFunction = (n) => {
  console.log("Computing...");
  return n * 2;
};

const memoized = memoize(expensiveFunction);
console.log(memoized(5));  // "Computing..." 10
console.log(memoized(5));  // 10 (from cache, no "Computing...")

//! 3. Function factory with closure

function createGreeter(greeting) {
  return function(name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayNamaste = createGreeter("Namaste");

sayHello("Rahul");    // "Hello, Rahul!"
sayNamaste("Priya");  // "Namaste, Priya!"

//! 4. Debounce function (closure + async)

function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const searchAPI = (query) => {
  console.log(`Searching for: ${query}`);
};

const debouncedSearch = debounce(searchAPI, 300);
debouncedSearch("a");
debouncedSearch("ap");
debouncedSearch("app");
debouncedSearch("apple");  // Only this one executes after 300ms

/* ============================================================================
   QUICK REFERENCE TABLE
   ============================================================================ */

/* | Concept              | Description                                    | Example                          |
   |----------------------|------------------------------------------------|----------------------------------|
   | Global EC            | Created when script starts                    | window/global object             |
   | Function EC          | Created on each function call                 | function foo() {}; foo()         |
   | Creation Phase       | Hoisting, scope setup, `this` binding         | var x = undefined                |
   | Execution Phase      | Code runs line by line                        | x = 5;                           |
   | Lexical Scope        | Scope determined by code position             | Function inside function         |
   | Scope Chain          | Hierarchy of accessible scopes                | inner → outer → global          |
   | Hoisting             | Moving declarations to top                    | var x; (not initialization)      |
   | TDZ                  | Period before let/const initialization        | Cannot access let before line    |
   | Closure              | Function + outer scope references             | Return function that uses outer  |
   | Call Stack           | Tracks function execution                     | LIFO data structure              |
   | `this` (global)      | Global object                                 | window (browser)                 |
   | `this` (method)      | Object owning the method                      | obj.method() → obj               |
   | `this` (arrow)       | Inherits from parent scope                    | () => console.log(this)          |
   | Block Scope          | {} with let/const                             | if, for, while                   |
   | Function Scope       | Whole function (var)                          | var inside function              |
   | Module Scope         | File-level scope (ES6)                        | export/import                    |
   | Shadowing            | Inner var hides outer var                     | let x = 5; { let x = 10; }       |
 */