// function declaration
// Hoisted — available before its line
// Defined with the function keyword at statement level. The entire function body is hoisted, so you can call it before it appears in code.

// // Call BEFORE the definition — works!
// greet("Alice");

// function greet(name) {
//   return `Hello, ${name}!`;
// }

// // Named in stack traces — easy to debug
// function fetchUserById(id) {
//   return db.query(`SELECT * FROM users WHERE id = ?`, [id]);
// }
// ✓ Production tip: use declarations for all top-level, reusable functions. They appear clearly in stack traces with their real name — anonymous functions show as "(anonymous)" and make debugging painful.
// hoisting visualised
// What you write
// greet("Alice");

// function greet(n) {
// return n;
// }
// What JS sees
// function greet(n) {
// return n;
// }

// greet("Alice");
// ⚠ Only declarations are fully hoisted. Function expressions and arrow functions assigned to const are NOT — calling them before assignment throws a ReferenceError.

// -------------------------------------


// function expression
// Assigned to a variable — not hoisted
// A function stored in a variable. Not hoisted. The variable exists but holds undefined until the line is reached.

// NOT hoisted — this throws ReferenceError
// calculate(5); ← would crash

// const calculate = function(n) {
//   return n * 2;
// };

// Named function expression — better for debugging
// const calculate = function calculateDouble(n) {
//   return n * 2;
// };
// calculateDouble appears in stack traces, not "(anonymous)"
// ✓ Production tip: always give function expressions a name — write const fn = function myFn() {} not const fn = function() {}. Same debugging benefit as declarations.






// arrow function
// Concise syntax, no own this
// Shorter syntax introduced in ES6. Key difference: arrow functions do NOT have their own this — they inherit it from the surrounding scope.

// // Concise forms
// const double = n => n * 2;           // single param, implicit return
// const add    = (a, b) => a + b;      // multi param
// const getUser = id => ({ id, name }); // return object — wrap in ()

// // Full form when you need multiple lines
// const process = (data) => {
//   const cleaned = data.trim();
//   return cleaned.toUpperCase();
// };
// ✓ Use arrow functions for callbacks, array methods, and anything that needs to inherit this. Use declarations/expressions for methods on objects or classes.
// this trap — the most common arrow bug
// // WRONG — arrow method loses 'this'
// const timer = {
//   count: 0,
//   start: () => {
//     setInterval(() => {
//       this.count++;  // 'this' is window/undefined!
//     }, 1000);
//   }
// };

// // CORRECT — use declaration for object methods
// const timer = {
//   count: 0,
//   start() {           // shorthand method declaration
//     setInterval(() => {
//       this.count++;   // 'this' is correctly the timer object
//     }, 1000);
//   }
// };
// ⚠ Never use arrow functions as object methods or class methods. They don't bind this — so this will be the outer scope (usually window or undefined in strict mode).


//-------------------------------------------------------


// parameters & return values
// Parameters are the names in the function definition. Arguments are the values you pass in. JS never throws for wrong argument count — missing params are undefined.

// // Destructure parameters directly — cleaner API
// function createUser({ name, role = "viewer", email }) {
//   return { name, role, email, createdAt: new Date() };
// }
// createUser({ name: "Alice", email: "a@b.com" });

// // Return early to avoid deep nesting
// function processOrder(order) {
//   if (!order) return null;           // guard clause
//   if (order.status === "cancelled") return { skip: true };
//   // main logic here — no nesting needed
//   return { processed: true, id: order.id };
// }
// ✓ Production tip: prefer object parameters over positional ones when a function takes 3+ arguments. It makes call sites self-documenting and order-independent — no more fn(true, false, null, 5) mysteries.
// always return explicitly
 // Implicit undefined return — confusing
// function save(data) {
//   db.insert(data);
  // returns undefined — caller doesn't know if it worked
// }

 // Better — return something meaningful
// async function save(data) {
//   const result = await db.insert(data);
//   return { success: true, id: result.insertId };
// }

// Consistent return shape — always same structure
// function divide(a, b) {
//   if (b === 0) return { ok: false, error: "Division by zero" };
//   return { ok: true, value: a / b };
// }
// ✓ Functions should always return a consistent shape. Mixing return value and return undefined makes callers write defensive code everywhere. Pick one and stick to it.

// default parameters
// Set fallback values in the signature
// Default parameters are evaluated at call time if the argument is undefined. They can reference earlier parameters and even call functions.

// // Basic defaults
// function connect(host = "localhost", port = 5432) {
//   return `${host}:${port}`;
// }
// connect();               // "localhost:5432"
// connect("prod.db", 5433); // "prod.db:5433"

// // Default referencing earlier param
// function createSlug(title, separator = "-") {
//   return title.toLowerCase().replace(/\s+/g, separator);
// }

// // Default that calls a function (evaluated each call)
// function log(msg, timestamp = Date.now()) {
//   console.log(`[${timestamp}] ${msg}`);
// }
// ✓ Production tip: use defaults for optional config. Put required params first, optional (defaulted) params last. This lets callers omit trailing args cleanly: fn(required) instead of fn(required, undefined, undefined, option).Nullish Coalescing Operator. 






// default parameters
// Set fallback values in the signature
// Default parameters are evaluated at call time if the argument is undefined. They can reference earlier parameters and even call functions.

// // Basic defaults
// function connect(host = "localhost", port = 5432) {
//   return `${host}:${port}`;
// }
// connect();               // "localhost:5432"
// connect("prod.db", 5433); // "prod.db:5433"

// // Default referencing earlier param
// function createSlug(title, separator = "-") {
//   return title.toLowerCase().replace(/\s+/g, separator);
// }

// // Default that calls a function (evaluated each call)
// function log(msg, timestamp = Date.now()) {
//   console.log(`[${timestamp}] ${msg}`);
// }
// ✓ Production tip: use defaults for optional config. Put required params first, optional (defaulted) params last. This lets callers omit trailing args cleanly: fn(required) instead of fn(required, undefined, undefined, option).



// default vs || — important difference
// Default only fires on undefined — not 0, "", false
// function paginate(page = 1, size = 10) { ... }
// paginate(0, 20); // page = 0 (not 1!) — 0 is not undefined
 // || fires on all falsy — dangerous for numbers/booleans
// function paginate(page, size) {
//   page = page || 1;  // page=0 becomes 1 — BUG!
//   size = size || 10; // size=0 becomes 10 — BUG!
// }

// ?? is safer than || but default param is cleanest
// page = page ?? 1; // 0 stays 0, only null/undefined → 1
// ⚠ Never use || to set defaults for numeric or boolean params — it coerces 0 and false. Always use real default parameters or ?? as fallback.
// Nullish Coalescing Operator. =??




// rest parameters
// Collect remaining args into a real array
// The ...rest parameter collects all remaining arguments into a proper array. It must be the last parameter.

// // Collect any number of args
// function sum(...numbers) {
//   return numbers.reduce((acc, n) => acc + n, 0);
// }
// sum(1, 2, 3, 4, 5); // 15

// Mix with named params
// function logEvent(level, ...messages) {
//   console.log(`[${level}]`, messages.join(" "));
// }
// logEvent("ERROR", "DB failed", "on table users", "retry 3");

// Use in real APIs — like a logger
// function createLogger(prefix, ...tags) {
//   return (msg) => console.log(`[${prefix}]`, ...tags, msg);
// }
// const dbLog = createLogger("DB", "sql", "query");
// dbLog("SELECT * from users");
// ✓ Rest parameters replace the old arguments object. Unlike arguments, rest params are a real array — you can use .map(), .filter() etc. on them directly. Never use arguments in modern code.
// rest vs arguments — the old way
// OLD — arguments object (avoid)
// function oldSum() {
  // arguments is array-like, not a real array
//   return Array.from(arguments).reduce((a,b) => a+b, 0);
// }
 // NEW — rest parameter (use this)
// const newSum = (...nums) => nums.reduce((a,b) => a+b, 0);

 // arguments doesn't exist in arrow functions at all!
// const broken = () => console.log(arguments); // ReferenceError
// ⚠ arguments is not available in arrow functions. If you need variadic args in an arrow function, you MUST use rest params. Another reason to prefer rest everywhere.







// spread syntax
// Expand iterables into individual elements
// Spread (...) unpacks arrays or objects. It's the inverse of rest — rest collects, spread expands.

// // Spread into function call
// const nums = [1, 5, 3, 9, 2];
// Math.max(...nums);  // 9  (instead of Math.max.apply(null, nums))

// // Spread to clone/merge arrays
// const a = [1, 2, 3];
// const b = [...a, 4, 5];        // [1,2,3,4,5] — non-mutating
// const merged = [...a, ...b];

// // Spread to clone/merge objects
// const defaults = { theme: "dark", lang: "en" };
// const user     = { lang: "fr", name: "Alice" };
// const config   = { ...defaults, ...user };
// // { theme:"dark", lang:"fr", name:"Alice" } — user wins
// ✓ Spread for cloning is shallow — nested objects are still references. For config merging, put the override last: { ...defaults, ...overrides }. Last key wins in object spread.
// spread in production patterns
// // Immutable state updates (React/Redux pattern)
// const state = { user: "Alice", count: 0 };
// const next  = { ...state, count: state.count + 1 };
// // state is untouched — next has the update

// // Passing options with defaults
// function request(url, { method = "GET", ...rest } = {}) {
//   return fetch(url, { method, ...rest });
// }
// request("/api/users");
// request("/api/users", { method: "POST", body: data });

// // Deduplicating arrays
// const tags = ["js", "node", "js", "react"];
// const unique = [...new Set(tags)]; // ["js","node","react"]
// ✓ The [...new Set(arr)] pattern is the cleanest one-liner to deduplicate arrays in production. It preserves insertion order and handles all primitive types.

// | Feature         | Rest Operator (`...`)              | Spread Operator (`...`)         |
// | --------------- | ---------------------------------- | ------------------------------- |
// | **Purpose**     | Collect multiple values into one   | Expand values into multiple     |
// | **Direction**   | many → one                         | one → many                      |
// | **Where used**  | Function parameters, destructuring | Arrays, objects, function calls |
// | **Behavior**    | Packs remaining elements           | Unpacks elements                |
// | **Result type** | Always creates an array/object     | Expands into individual values  |
// | **Position**    | Left side (definition)             | Right side (usage)              |








// scope
// Where variables are visible
// JS has three scope levels. Inner scopes can access outer variables, but not vice versa.

// Global scope — window, document, env config
//   Function scope — parameters, local let/const/var
//     Block scope — let/const inside if, for, {}
// const APP_NAME = "MyApp";  // global

// function getGreeting(lang) {          // function scope
//   const prefix = "Hello";            // function scope
//   if (lang === "formal") {
//     const formal = "Good day";       // block scope
//     return `${formal}, ${APP_NAME}`; // can read outer
//   }
//   // 'formal' not accessible here — block scope ended
//   return `${prefix}, ${APP_NAME}`;
// }
// ✓ Keep variables as close to where they are used as possible. Avoid global variables — they make testing and debugging much harder. Pass data through parameters instead



// closure
// A function that remembers its birth scope
// When a function is created, it captures a reference to all variables in its surrounding scope — even after that scope finishes. This is a closure.

// // Counter — classic closure example
// function makeCounter(start = 0) {
//   let count = start;   // captured in closure

//   return {
//     increment: () => ++count,
//     decrement: () => --count,
//     value:     () => count,
//   };
// }

// const counter = makeCounter(10);
// counter.increment(); // 11
// counter.increment(); // 12
// counter.value();     // 12
// // 'count' is private — not accessible from outside
// ✓ Closure is the foundation of: private state, factory functions, memoisation, event handlers that remember context, and React hooks (useState is built on closure).
// It works because of closures, which allow functions to retain access to variables from their outer scope—even after that function has finished executing.