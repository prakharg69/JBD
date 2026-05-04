// 2.4 `this` Keyword — Essential Notes (No Fluff)

/* ============================================================================
   THE GOLDEN RULE (Memorize This First)
   ============================================================================ */

/* The value of `this` is determined by HOW the function is CALLED, 
 * not where it's DEFINED (except arrow functions).
 * 
 * 4 Rules in order of priority:
 * 1. new binding (Constructor call) → `this` = new object
 * 2. explicit binding (call/apply/bind) → `this` = specified object
 * 3. implicit binding (Method call) → `this` = object before dot
 * 4. default binding (Regular function) → `this` = global/undefined
 */

/* ============================================================================
   RULE 1: GLOBAL `this`
   ============================================================================ */

//! In browsers (global scope)
console.log(this);  // window object

//! In Node.js (global scope)
console.log(this);  // {} (empty object, not global!)

//! In strict mode (anywhere)
// 'use strict';
function testStrict() {
  console.log(this);  // undefined (not global)
}

//! Regular function (non-strict)
function testRegular() {
  console.log(this);  // window (browser) / global (Node)
}

/* ✅ REMEMBER: 
 * - Arrow functions in global → inherits whatever `this` is
 * - Module scope → `this` is undefined (modules are strict by default)
 */

/* ============================================================================
   RULE 2: `this` INSIDE METHODS (Implicit Binding)
   ============================================================================ */

//! MOST COMMON CASE (90% of what you'll write)
const user = {
  name: "Rahul",
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

user.greet();  // "Hello, I'm Rahul"
// `this` = the object BEFORE the dot (user)

//! Nested methods
const outer = {
  name: "Outer",
  inner: {
    name: "Inner",
    sayHi: function() {
      console.log(this.name);
    }
  }
};

outer.inner.sayHi();  // "Inner" (this = object before dot: inner)

//! THE COMMON PITFALL (Losing `this`)
const userLost = {
  name: "Rahul",
  greet: function() {
    console.log(this.name);
  }
};

const stolenGreet = userLost.greet;
stolenGreet();  // undefined (this = global/window, not userLost)

// Why? No dot! It's just a regular function call.

/* ✅ REMEMBER: 
 * Method called with dot → `this` = object before dot
 * Method reference without dot → `this` = global/undefined
 */

/* ============================================================================
   RULE 3: ARROW FUNCTIONS (No `this` of their own)
   ============================================================================ */

/* Arrow functions DO NOT have their own `this`.
 * They inherit `this` from their PARENT scope (lexical `this`).
 * This is the #1 reason people use arrow functions.
 */

//! ARROW FUNCTIONS IN OBJECTS (Doesn't work as expected)
const userArrow = {
  name: "Rahul",
  greet: () => {
    console.log(this.name);  // ❌ this is NOT userArrow
  }
};
userArrow.greet();  // undefined (this = global/window)

//! ARROW FUNCTIONS IN REGULAR FUNCTIONS (Works great!)
function createCounter() {
  this.count = 0;
  
  setInterval(() => {
    this.count++;  // ✓ Arrow captures `this` from createCounter
    console.log(this.count);
  }, 1000);
}

const counterFunc = new createCounter();  // Works correctly

// SAME but with regular function (BROKEN)
function brokenCounter() {
  this.count = 0;
  
  setInterval(function() {
    this.count++;  // ❌ this = window (not the object)
    console.log(this.count);  // NaN
  }, 1000);
}

//! PRACTICAL: Event handlers with arrow functions
const button = {
  label: "Click Me",
  handleClick: function() {
    // Arrow function captures outer `this`
    setTimeout(() => {
      console.log(`Clicked: ${this.label}`);  // ✓ Works
    }, 100);
  }
};

button.handleClick();  // "Clicked: Click Me"

/* ✅ REMEMBER:
 * Arrow functions = NO own `this`, use parent's `this`
 * Use arrow functions for:
 *   - Callbacks (setTimeout, event handlers, promises)
 *   - Inside methods that need parent `this`
 * DON'T use arrow functions as object methods
 */

/* ============================================================================
   RULE 4: call, apply, bind (Explicit Binding)
   ============================================================================ */

/* Use these when you want to CONTROL what `this` is.
 * All three do the same thing but differently.
 */

const person = { name: "Rahul" };

function introduce(age, city) {
  console.log(`I'm ${this.name}, ${age} years old from ${city}`);
}

//! call() — Call function with custom `this`, arguments one by one
introduce.call(person, 25, "Delhi");
// "I'm Rahul, 25 years old from Delhi"

//! apply() — Same as call, but arguments as ARRAY
introduce.apply(person, [25, "Delhi"]);
// "I'm Rahul, 25 years old from Delhi"

//! bind() — Returns NEW function with `this` permanently bound
const boundIntroduce = introduce.bind(person, 25, "Delhi");
boundIntroduce();  // "I'm Rahul, 25 years old from Delhi"
boundIntroduce();  // Still same `this` (permanent)

//! PRACTICAL: Fixing lost `this` with bind
const userBind = {
  name: "Rahul",
  greet: function() {
    console.log(this.name);
  }
};

const stolenGreetBind = userBind.greet.bind(userBind);
stolenGreetBind();  // "Rahul" (works! because bound to userBind)

//! PRACTICAL: Partial application with bind
function multiply(a, b) {
  return a * b;
}

const doublePartial = multiply.bind(null, 2);  // Fix first argument to 2
console.log(doublePartial(5));  // 10 (2 * 5)
console.log(doublePartial(10)); // 20 (2 * 10)

//! PRACTICAL: Borrowing methods
const numbers = [1, 2, 3];
const max = Math.max.apply(null, numbers);  // 3 (apply spreads array)
const maxModern = Math.max(...numbers);     // Modern way (spread)

/* ✅ REMEMBER:
 * call() — Arguments: (thisArg, arg1, arg2, ...)
 * apply() — Arguments: (thisArg, [arg1, arg2, ...])
 * bind() — Returns new function, doesn't execute immediately
 * 
 * Use bind() when you need a permanent `this` binding
 * Use call/apply for one-off calls with custom `this`
 */

/* ============================================================================
   RULE 5: CONSTRUCTOR FUNCTIONS (new Binding)
   ============================================================================ */

/* When you call a function with `new`, `this` becomes a NEW empty object.
 * Used for creating multiple objects with same structure.
 */

function Person(name, age) {
  // `this` = new empty object {}
  this.name = name;
  this.age = age;
  // implicitly returns `this`
}

const rahul = new Person("Rahul", 25);
const priya = new Person("Priya", 23);

console.log(rahul.name);  // "Rahul"
console.log(priya.name);  // "Priya"

//! WITHOUT new (BROKEN)
const broken = Person("Rahul", 25);
console.log(broken);  // undefined (and polluted global!)

/* ✅ REMEMBER:
 * Use `new` with constructor functions (capitalized by convention)
 * Without `new`, `this` becomes global → BAD
 * Modern JS: use `class` instead (cleaner syntax)
 */

/* ============================================================================
   COMMON REAL-WORLD SCENARIOS
   ============================================================================ */

//! SCENARIO 1: Event listeners
const buttonElement = {
  text: "Submit",
  init: function() {
    // Regular function loses `this`
    document.getElementById("btn").addEventListener("click", function() {
      console.log(this.text);  // ❌ undefined (this = DOM element)
    });
    
    // Fix with arrow function
    document.getElementById("btn").addEventListener("click", () => {
      console.log(this.text);  // ✓ "Submit" (captures outer `this`)
    });
    
    // Fix with bind
    document.getElementById("btn").addEventListener("click", function() {
      console.log(this.text);
    }.bind(this));
  }
};

//! SCENARIO 2: Class methods
class UserClass {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
  
  delayedGreet() {
    // BROKEN
    setTimeout(function() {
      console.log(this.name);  // ❌ undefined (this = window)
    }, 1000);
    
    // FIX 1: Arrow function
    setTimeout(() => {
      console.log(this.name);  // ✓ Works
    }, 1000);
    
    // FIX 2: Bind
    setTimeout(this.greet.bind(this), 1000);  // ✓ Works
  }
}

//! SCENARIO 3: React class components (legacy)
class OldReactComponent {
  constructor() {
    this.state = { count: 0 };
    
    // Must bind or use arrow
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
  
  // Modern: Arrow class field
  handleClickArrow = () => {
    this.setState({ count: this.state.count + 1 });  // Auto-bound
  }
}

//! SCENARIO 4: Array methods callback
const userArray = {
  users: ["Rahul", "Priya"],
  prefix: "User: ",
  
  printUsers() {
    // BROKEN
    this.users.forEach(function(user) {
      console.log(this.prefix + user);  // ❌ this.prefix undefined
    });
    
    // FIX 1: Arrow function (recommended)
    this.users.forEach(user => {
      console.log(this.prefix + user);  // ✓ Works
    });
    
    // FIX 2: Second argument to forEach
    this.users.forEach(function(user) {
      console.log(this.prefix + user);
    }, this);  // Pass `this` as second argument
  }
};

/* ============================================================================
   DECISION TREE (What `this` should I use?)
   ============================================================================ */

/*
 * Q: Are you writing an object method?
 *    → Use REGULAR function (implicit binding)
 * 
 * Q: Are you writing a callback (setTimeout, event handler, promise)?
 *    → Use ARROW function (lexical this)
 * 
 * Q: Need to permanently bind `this` to something?
 *    → Use .bind()
 * 
 * Q: Need to call a function once with custom `this`?
 *    → Use .call() or .apply()
 * 
 * Q: Are you in global scope?
 *    → `this` = window (browser) / {} (Node module)
 * 
 * Q: Are you using strict mode?
 *    → Regular functions get `undefined` (not global)
 */

/* ============================================================================
   QUICK REFERENCE TABLE
   ============================================================================ */

/* | Scenario                    | this value                          | Example                    |
 * |-----------------------------|-------------------------------------|----------------------------|
 * | Global (browser, non-strict)| window                              | console.log(this)          |
 * | Global (Node module)        | {} (empty)                          | console.log(this)          |
 * | Method call (dot)           | Object before dot                   | obj.method()               |
 * | Regular function call       | window/undefined (strict)           | function() { this }        |
 * | Arrow function              | Inherits from parent scope          | () => this                 |
 * | call/apply/bind             | First argument passed               | fn.call(obj)               |
 * | Constructor (new)           | New empty object                    | new Person()               |
 * | Event handler (regular)     | DOM element                         | button.onclick = function()|
 * | Event handler (arrow)       | Parent scope (often window)         | button.onclick = () => {}  |
 * | Class method                | Instance of class                   | class { method() { this } }|
 */

/* ============================================================================
   PRODUCTION CHEAT SHEET
   ============================================================================ */

/* ✅ DO:
 * - Use arrow functions for callbacks (setTimeout, map, filter, event listeners)
 * - Use .bind() to fix lost `this` in methods passed as callbacks
 * - Use class fields with arrow functions for React/auto-binding
 * - Use call/apply for function borrowing (Math.max.apply(null, array))
 * 
 * ❌ DON'T:
 * - DON'T use arrow functions for object methods (loses object `this`)
 * - DON'T assume `this` in callbacks (always check/convert)
 * - DON'T use `var self = this` (arrow functions replaced this pattern)
 * - DON'T call constructors without `new` (pollutes global)
 */

/* ============================================================================
   COMMON INTERVIEW QUESTIONS
   ============================================================================ */

// Q: What's the difference between call, apply, and bind?
// A: call/apply execute immediately, bind returns new function.
//    call takes args separately, apply takes array.

// Q: Why use arrow functions?
// A: They don't have their own `this`, inherits from parent scope.
//    Great for callbacks to avoid losing `this`.

// Q: How do you fix lost `this` in callbacks?
// A: 1. Arrow function  2. .bind(this)  3. Store this in variable (old way)

// Q: What is `this` in an event handler?
// A: Regular function: DOM element. Arrow function: parent scope.
//    Use e.currentTarget to always get element.

// Q: What's the value of `this` in strict mode?
// A: Regular functions: undefined. Everything else same as non-strict.

// strict mode → this = undefined
// non-strict mode → this = global object
// This problem occurs because in JavaScript, this is determined by how a function is called, not where it was defined. When you call u.greet(), the method is invoked with u as the context, so this refers to u. But when you extract it like const fn = u.greet and call fn(), it becomes a plain function call with no associated object, so this becomes undefined (in strict mode) or the global object. In short, the original object context is lost during extraction, which is why this no longer points to u.