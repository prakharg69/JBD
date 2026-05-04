// 2.3 Closures — Essential Notes (No Fluff)

/* ============================================================================
   WHAT IS A CLOSURE? (One Definition to Remember)
   ============================================================================ */

/* A closure is a function that "remembers" variables from its outer scope 
 * even after the outer function has finished executing.
 * 
 * EVERY function in JavaScript is a closure (except when using 'new Function')
 */

//! THE CORE CONCEPT (Minimal Example)
function outer() {
  let secret = 42;
  return function inner() {
    return secret;  // inner "closes over" secret
  };
}

const getSecret = outer();
console.log(getSecret()); // 42 — outer() is gone but secret is remembered!

/* ============================================================================
   WHY CLOSURES EXIST (Lexical Scope)
   ============================================================================ */
s
/* Key Point: Functions keep a reference to their parent scope's variables.
 * Those variables are NOT garbage collected as long as the function exists.
 */

function createCounter() {
  let count = 0;  // This variable "lives on" in the closure
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.get();       // 2 — count is still alive!

/* ============================================================================
   PRACTICAL USES OF CLOSURES (What You'll Actually Use)
   ============================================================================ */

//! 1. DATA PRIVACY / ENCAPSULATION (Most Important)
function BankAccount(initialBalance) {
  let balance = initialBalance;  // PRIVATE — can't access from outside
  
  return {
    deposit: (amount) => {
      if (amount > 0) balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount > 0 && amount <= balance) balance -= amount;
      return balance;
    },
    getBalance: () => balance
  };
}

const account = BankAccount(1000);
console.log(account.balance);        // undefined (private!)
console.log(account.getBalance());   // 1000 (controlled access)
account.deposit(500);
console.log(account.getBalance());   // 1500

//! 2. FUNCTION FACTORIES (Creating specialized functions)
function multiplyBy(factor) {
  return (number) => number * factor;
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

//! 3. ONCE FUNCTION (Execute only once)
function once(fn) {
  let executed = false;
  let result;
  
  return function(...args) {
    if (!executed) {
      executed = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log("Initializing...");
  return { status: "ready" };
});

console.log(initialize()); // "Initializing..." { status: "ready" }
console.log(initialize()); // { status: "ready" } (no log, cached)

//! 4. MEMOIZATION (Caching expensive computations)
function memoize(fn) {
  const cache = new Map();
  
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

const slowSquare = (n) => {
  console.log("Computing...");
  return n * n;
};

const fastSquare = memoize(slowSquare);
fastSquare(5); // "Computing..." 25
fastSquare(5); // 25 (from cache, no "Computing...")

//! 5. DEBOUNCE (Rate limiting)
function debounce(fn, delay) {
  let timer;
  
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 300);

search("a");  // Only last call executes
search("ap");
search("app"); // "Searching for: app" after 300ms

//! 6. THROTTLE (Limit execution frequency)
function throttle(fn, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const logScroll = throttle(() => {
  console.log("Scrolled!");
}, 1000);
// Will only log once per second even if scroll fires many times

//! 7. EVENT HANDLERS WITH PRIVATE STATE
function createButtonHandler(buttonId) {
  let clickCount = 0;
  
  return () => {
    clickCount++;
    console.log(`Button ${buttonId} clicked ${clickCount} times`);
  };
}

const handleBtn1 = createButtonHandler("btn1");
const handleBtn2 = createButtonHandler("btn2");

// In browser: button.addEventListener("click", handleBtn1)

//! 8. ITERATORS / GENERATORS (Manual)
function createRange(start, end) {
  let current = start;
  
  return {
    next: () => {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { done: true };
    }
  };
}

const range = createRange(1, 3);
console.log(range.next()); // { value: 1, done: false }
console.log(range.next()); // { value: 2, done: false }
console.log(range.next()); // { value: 3, done: false }
console.log(range.next()); // { done: true }

/* ============================================================================
   ENCAPSULATION WITH CLOSURES (No Classes Needed)
   ============================================================================ */

//! PATTERN 1: Revealing Module Pattern
const UserModule = (function() {
  // Private variables
  let users = [];
  
  // Private functions
  function validateUser(user) {
    return user.name && user.age > 0;
  }
  
  // Public API
  return {
    addUser: (user) => {
      if (validateUser(user)) {
        users.push(user);
        return true;
      }
      return false;
    },
    getUsers: () => [...users], // Return copy to prevent mutation
    getUserCount: () => users.length
  };
})();

UserModule.addUser({ name: "Rahul", age: 25 });
console.log(UserModule.getUsers());     // [{ name: "Rahul", age: 25 }]
console.log(UserModule.users);          // undefined (private)

//! PATTERN 2: Factory with Full Encapsulation
function createTodoList() {
  let tasks = [];
  let id = 0;
  
  return {
    add: (title) => {
      tasks.push({ id: ++id, title, completed: false });
      return id;
    },
    complete: (taskId) => {
      const task = tasks.find(t => t.id === taskId);
      if (task) task.completed = true;
    },
    getAll: () => [...tasks],  // Return copy
    clearCompleted: () => {
      tasks = tasks.filter(t => !t.completed);
    }
  };
}

const myTodos = createTodoList();
myTodos.add("Learn closures");
myTodos.add("Build project");
console.log(myTodos.getAll());  // Both tasks visible
// myTodos.tasks — undefined (can't access directly)

/* ============================================================================
   COMMON PITFALLS (What NOT to do)
   ============================================================================ */

//! PITFALL 1: Loop Closure Problem (OLD with var)
// PROBLEM:
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 4, 4, 4 (NOT 1, 2, 3)

// SOLUTION 1: Use let (block scope)
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 1, 2, 3

// SOLUTION 2: Create closure with IIFE (if using var)
for (var i = 1; i <= 3; i++) {
  ((index) => {
    setTimeout(() => console.log(index), 0);
  })(i);
}
// Prints: 1, 2, 3

//! PITFALL 2: Memory Leaks
function leakyFunction() {
  const hugeData = new Array(1000000).fill("data");
  
  return () => {
    console.log("I only need a small thing, but keep hugeData alive");
    // hugeData is NEVER garbage collected because closure holds reference
  };
}

// FIX: Only close over what you need
function betterFunction() {
  const hugeData = new Array(1000000).fill("data");
  const smallData = hugeData.length;
  
  return () => {
    console.log(`Length was: ${smallData}`);  // Only closes over smallData
  };
}

//! PITFALL 3: Unexpected Shared State
function createCounters() {
  let count = 0;
  
  return {
    inc1: () => ++count,  // All three share the SAME count
    inc2: () => ++count,
    inc3: () => ++count
  };
}

const counters = createCounters();
counters.inc1(); // 1
counters.inc2(); // 2 (not 1) — SHARED!

// FIX: Create separate closures
function createCounterPair() {
  const createCounter = () => {
    let count = 0;
    return () => ++count;
  };
  
  return {
    counter1: createCounter(),
    counter2: createCounter()
  };
}

/* ============================================================================
   PRODUCTION CHECKLIST
   ============================================================================ */

/* ✅ DO use closures for:
 * - Data privacy/encapsulation (hide implementation details)
 * - Function factories (create specialized functions)
 * - Memoization (cache results)
 * - Debounce/throttle (rate limiting)
 * - Module pattern (organize code)
 * - Iterators/generators
 */

/* ❌ DON'T use closures when:
 * - You don't need to maintain state
 * - Memory is critical (closures prevent garbage collection)
 * - Simple loops/operations can work without them
 * - You accidentally create unintended shared state
 */

/* Performance Note:
 * - Closures have negligible performance cost in modern JS
 * - Memory leaks happen when large data is unnecessarily closed over
 * - Avoid closures inside hot loops when possible
 */

/* ============================================================================
   INTERVIEW CHEAT SHEET
   ============================================================================ */

/* Q: What is a closure?
 * A: A function that retains access to its outer scope's variables even after
 *    the outer function has returned.
 */

/* Q: Give practical examples
 * A: 1. Private variables (BankAccount example)
 *    2. Memoization (caching)
 *    3. Debounce/throttle
 *    4. Function factories (multiplyBy)
 */

/* Q: What's the loop closure problem?
 * A: With `var`, all callbacks in a loop share the same variable.
 *    Solution: Use `let` or IIFE to create new scope per iteration.
 */

/* Q: How do closures affect memory?
 * A: Variables in a closure are NOT garbage collected as long as the closure
 *    exists. Can cause memory leaks if large data is unnecessarily retained.
 */

/* ============================================================================
   QUICK REFERENCE
   ============================================================================ */

/* | Use Case              | Pattern                                |
 * |-----------------------|----------------------------------------|
 * | Private variables     | let x; return { getX: () => x }        |
 * | Function factory      | (factor) => (n) => n * factor          |
 * | Memoization           | cache Map + check before compute       |
 * | Debounce              | Clear timeout + set new                |
 * | Throttle              | Flag + setTimeout reset                |
 * | Once function         | executed flag + store result           |
 * | Module pattern        | IIFE returning public API              |
 * | Iterator              | Return object with next() method       |
 */