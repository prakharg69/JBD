/* ============================================================================
   2.9 EVENT LOOP — COMPLETE GUIDE
   ============================================================================ */

/* What is the Event Loop?
 * The Event Loop is JavaScript's execution model that enables asynchronous 
 * (non-blocking) operations despite being single-threaded. It continuously 
 * monitors the call stack and callback queues, pushing tasks from queues 
 * to the stack when the stack is empty.
 * 
 * Key Concept: JavaScript can only do ONE thing at a time (single-threaded), 
 * but the Event Loop creates the illusion of multitasking by prioritizing 
 * and scheduling tasks efficiently.
 */

//! CORE COMPONENTS OF THE EVENT LOOP
/*
 * ┌─────────────────────────────────────────────────────────────┐
 * │                        CALL STACK                           │
 * │  (Where your code actually executes - one thing at a time)  │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    WEB APIs / NODE APIs                     │
 * │  (Browser/Node features: setTimeout, fetch, DOM events,     │
 * │   file system, etc. - handled outside JS engine)            │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                       CALLBACK QUEUE                        │
 * │  (Macrotask queue: setTimeout, setInterval, I/O events)     │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 * ┌─────────────────────────────────────────────────────────────┐
 * │                      MICROTASK QUEUE                        │
 * │  (Higher priority: Promises, queueMicrotask, MutationObserver)│
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                        EVENT LOOP                           │
 * │  "Check if stack is empty → run microtasks → take one       │
 * │   Macrotask → repeat forever"                               │
 * └─────────────────────────────────────────────────────────────┘
 */


/* ============================================================================
   PART 1: CALL STACK
   ============================================================================ */

/* What is the Call Stack?
 * The call stack is a LIFO (Last In, First Out) data structure that tracks 
 * function execution. When a function is called, it's added to the stack. 
 * When it returns, it's removed.
 */

//! HOW THE CALL STACK WORKS

// Example 1: Simple function calls
function first() {
  console.log("First function");
  second();
}

function second() {
  console.log("Second function");
  third();
}

function third() {
  console.log("Third function");
}

first();
/* Stack trace:
 * 1. Empty stack
 * 2. first() pushed
 * 3. console.log("First function") pushed → executed → popped
 * 4. second() pushed (inside first)
 * 5. console.log("Second function") pushed → executed → popped
 * 6. third() pushed (inside second)
 * 7. console.log("Third function") pushed → executed → popped
 * 8. third() popped
 * 9. second() popped
 * 10. first() popped
 */

//! CALL STACK OVERFLOW (Recursion without base case)
function infiniteRecursion() {
  return infiniteRecursion();  // No exit condition
}
// infiniteRecursion();  // ❌ RangeError: Maximum call stack size exceeded

// Practical: Track stack depth
let callCount = 0;
function safeRecursion(depth) {
  callCount++;
  if (callCount > 10000) {
    console.log("Stack limit approaching");
    return;
  }
  return safeRecursion(depth);
}

/* ⚠️ IMPORTANT: 
 * The call stack is synchronous and single-threaded. 
 * If a function takes 5 seconds to execute, nothing else can happen
 * during those 5 seconds (blocking behavior).
 */

//! BLOCKING THE CALL STACK (Bad practice)
function blockFor5Seconds() {
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // This loop blocks the stack for 5 seconds
  }
  console.log("Done blocking");
}

console.log("Start");
// blockFor5Seconds();  // UI freezes for 5 seconds
console.log("End");    // Only runs after blockFor5Seconds finishes

/* Visualization:
 * Stack: [blockFor5Seconds] ← Blocks for 5 seconds
 * After 5 seconds: Stack: []
 * Then: console.log("End") runs
 */


/* ============================================================================
   PART 2: WEB APIs / NODE APIs
   ============================================================================ */

/* What are Web/Node APIs?
 * These are browser or Node.js provided features that live OUTSIDE the 
 * JavaScript engine. When you call setTimeout, fetch, or read a file, 
 * these APIs handle the operation asynchronously.
 * 
 * Key Insight: These APIs are NOT part of JavaScript's spec. They're provided 
 * by the environment (browser or Node.js) and enable async behavior.
 */

//! COMMON WEB APIs (Browser)
// 1. setTimeout / setInterval
// 2. fetch (HTTP requests)
// 3. DOM event listeners (click, keypress, etc.)
// 4. console.log (actually async in some browsers)
// 5. requestAnimationFrame
// 6. IndexedDB
// 7. Geolocation API

//! COMMON NODE APIs (Server)
// 1. fs.readFile / fs.writeFile
// 2. http.createServer
// 3. crypto module
// 4. child_process
// 5. process.nextTick (special microtask)

//! HOW APIs WORK WITH EVENT LOOP

console.log("1. Start");

setTimeout(() => {
  console.log("2. setTimeout callback (after 0ms)");
}, 0);

console.log("3. End");

/* What happens:
 * ┌─────────────────────────────────────────────────────────┐
 * │ 1. console.log("1. Start") → executes immediately      │
 * │ 2. setTimeout() → Web API takes it, starts timer       │
 * │ 3. console.log("3. End") → executes immediately        │
 * │ 4. After 0ms, Web API moves callback to Callback Queue │
 * │ 5. Event Loop sees stack empty → moves callback to stack│
 * │ 6. console.log("2. setTimeout...") → executes          │
 * └─────────────────────────────────────────────────────────┘
 * 
 * Output:
 * 1. Start
 * 3. End
 * 2. setTimeout callback (after 0ms)
 * 
 * ⚠️ Even with 0ms delay, setTimeout is ALWAYS asynchronous!
 */

//! COMPLEX EXAMPLE: Multiple APIs interacting

console.log("A");  // Synchronous

setTimeout(() => {
  console.log("B");  // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("C");  // Microtask (higher priority)
});

console.log("D");  // Synchronous

/* Output:
 * A
 * D
 * C    ← Microtask runs BEFORE macrotask
 * B    ← Macrotask runs after microtasks
 */


/* ============================================================================
   PART 3: CALLBACK QUEUE (MACROTASK QUEUE)
   ============================================================================ */

/* What is the Callback Queue?
 * Also known as the Macrotask Queue. Holds callbacks from async operations
 * that are ready to be executed. The Event Loop takes tasks from this queue
 * ONE AT A TIME, AFTER all microtasks are completed.
 */

//! TYPES OF MACROTASKS
/*
 * 1. setTimeout / setInterval callbacks
 * 2. setImmediate (Node.js only)
 * 3. I/O callbacks (file system, network)
 * 4. DOM event callbacks (click, load, etc.)
 * 5. requestAnimationFrame (special case - runs before paint)
 * 6. MessageChannel callbacks
 */

//! MACROTASK QUEUE EXAMPLE

console.log("1. Start");

setTimeout(() => {
  console.log("2. First timeout");
}, 0);

setTimeout(() => {
  console.log("3. Second timeout");
}, 0);

console.log("4. End");

/* Execution:
 * Stack: [console.log("1")] → executes
 * Stack: [] 
 * API: setTimeout(..., 0) → timer starts
 * API: setTimeout(..., 0) → timer starts
 * Stack: [console.log("4")] → executes
 * Stack: []
 * After timers expire → callbacks move to Macrotask Queue
 * Event Loop: Take first macrotask → console.log("2")
 * Event Loop: Take second macrotask → console.log("3")
 * 
 * Output:
 * 1. Start
 * 4. End
 * 2. First timeout
 * 3. Second timeout
 */

//! DOM EVENTS AS MACROTASKS

const button = document.getElementById("myButton");

console.log("Event listener registered");

button.addEventListener("click", () => {
  console.log("Button clicked");  // This goes to Macrotask Queue
});

console.log("Script continues");

// When user clicks:
// 1. Web API handles click event
// 2. Callback moves to Macrotask Queue
// 3. Event Loop moves it to stack when stack is empty


/* ============================================================================
   PART 4: MICROTASK QUEUE
   ============================================================================ */

/* What is the Microtask Queue?
 * Higher priority queue that MUST be completely emptied BEFORE the Event Loop
 * takes the next macrotask. Microtasks run immediately after the currently 
 * executing script and between macrotasks.
 */

//! TYPES OF MICROTASKS
/*
 * 1. Promise callbacks (.then, .catch, .finally)
 * 2. async/await continuations (syntactic sugar over Promises)
 * 3. queueMicrotask() function
 * 4. MutationObserver callbacks (browser)
 * 5. process.nextTick (Node.js - even higher priority)
 */

//! MICROTASK QUEUE EXAMPLE

console.log("1. Start");

Promise.resolve().then(() => {
  console.log("2. Promise microtask 1");
});

Promise.resolve().then(() => {
  console.log("3. Promise microtask 2");
});

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

console.log("5. End");

/* Execution:
 * ┌──────────────────────────────────────────────────────┐
 * │ Synchronous code runs first:                        │
 * │ 1. console.log("1. Start")                          │
 * │ 2. Promise callbacks are REGISTERED                 │
 * │ 3. setTimeout is REGISTERED (goes to Web API)       │
 * │ 4. console.log("5. End")                            │
 * │                                                      │
 * │ THEN microtasks run (entire queue):                 │
 * │ 5. console.log("2. Promise microtask 1")            │
 * │ 6. console.log("3. Promise microtask 2")            │
 * │                                                      │
 * │ THEN one macrotask:                                 │
 * │ 7. console.log("4. Macrotask (setTimeout)")         │
 * └──────────────────────────────────────────────────────┘
 * 
 * Output:
 * 1. Start
 * 5. End
 * 2. Promise microtask 1
 * 3. Promise microtask 2
 * 4. Macrotask (setTimeout)
 */

//! MICROTASK QUEUE CAN BLOCK MACROTASKS (Bad pattern)

function createInfiniteMicrotasks() {
  function scheduleMicrotask() {
    queueMicrotask(() => {
      console.log("Microtask running...");
      scheduleMicrotask();  // Recursively queue another microtask
    });
  }
  scheduleMicrotask();
}

// createInfiniteMicrotasks();
// setTimeout(() => console.log("This NEVER runs"), 1000);
/* ⚠️ WARNING: This blocks macrotasks forever because microtask queue
 * never empties. The Event Loop keeps processing microtasks and never
 * gets to the macrotask queue!
 */

//! PRACTICAL: Using queueMicrotask()
queueMicrotask(() => {
  console.log("Custom microtask runs");
});

console.log("This runs before the microtask");

// Output:
// This runs before the microtask
// Custom microtask runs


/* ============================================================================
   PART 5: EVENT LOOP WORKING
   ============================================================================ */

/* How the Event Loop Works Step by Step
 * 
 * while (true) {
 *   1. Run all synchronous code in the call stack until empty
 *   2. Run ALL microtasks (entire microtask queue)
 *      - If new microtasks are queued during this, run them too
 *   3. Take ONE macrotask from callback queue
 *   4. Run that macrotask to completion
 *   5. Go back to step 2
 * }
 */

//! COMPLETE VISUALIZATION

console.log("=== START OF PROGRAM ===");

// Macrotask 1
setTimeout(() => {
  console.log("Macrotask 1: setTimeout 1");
  
  // This Promise gets queued DURING a macrotask
  Promise.resolve().then(() => {
    console.log("Microtask inside Macrotask 1");
  });
  
}, 0);

// Macrotask 2
setTimeout(() => {
  console.log("Macrotask 2: setTimeout 2");
}, 0);

// Microtask 1
Promise.resolve().then(() => {
  console.log("Microtask 1: Promise 1");
});

// Microtask 2
Promise.resolve().then(() => {
  console.log("Microtask 2: Promise 2");
});

// Synchronous
console.log("=== MIDDLE OF PROGRAM ===");

/* Step-by-step execution:
 * 
 * Step 1 (Synchronous phase - Call Stack):
 * - console.log("=== START ===") → executes
 * - setTimeout (macro 1) → sent to Web API
 * - setTimeout (macro 2) → sent to Web API
 * - Promise.then (micro 1) → registered
 * - Promise.then (micro 2) → registered
 * - console.log("=== MIDDLE ===") → executes
 * - Stack is now empty
 * 
 * Step 2 (Microtask phase - run ALL microtasks):
 * - Microtask 1 executes → console.log("Microtask 1")
 * - Microtask 2 executes → console.log("Microtask 2")
 * - Microtask queue is empty
 * 
 * Step 3 (Macrotask phase - take ONE macrotask):
 * - Take first macrotask (macro 1)
 * - console.log("Macrotask 1")
 * - Inside macro 1: Promise.then is queued as a NEW microtask
 * - After macro 1 completes, Event Loop checks microtasks AGAIN
 * 
 * Step 4 (Microtask phase again):
 * - New microtask from macro 1 runs → console.log("Microtask inside Macrotask 1")
 * 
 * Step 5 (Macrotask phase):
 * - Take next macrotask (macro 2)
 * - console.log("Macrotask 2")
 * 
 * FINAL OUTPUT:
 * === START OF PROGRAM ===
 * === MIDDLE OF PROGRAM ===
 * Microtask 1: Promise 1
 * Microtask 2: Promise 2
 * Macrotask 1: setTimeout 1
 * Microtask inside Macrotask 1
 * Macrotask 2: setTimeout 2
 */

//! VISUAL TIMELINE
/*
 * Time →
 * ┌──────┬──────┬──────┬──────┬──────┬──────┐
 * │Sync  │Micro │Macro1│Micro │Macro2│ ...  │
 * │Code  │Queue │      │Queue │      │      │
 * └──────┴──────┴──────┴──────┴──────┴──────┘
 *    ↑      ↑      ↑      ↑      ↑
 *    │      │      │      │      └─ Next macrotask
 *    │      │      │      └─ Microtask from Macro1
 *    │      │      └─ First macrotask
 *    │      └─ All queued microtasks
 *    └─ Synchronous execution
 */

//! NODE.JS SPECIFIC: process.nextTick (Super microtask)
if (typeof process !== 'undefined' && process.nextTick) {
  console.log("Node.js environment detected");
  
  process.nextTick(() => {
    console.log("process.nextTick - runs before any microtasks!");
  });
  
  Promise.resolve().then(() => {
    console.log("Promise microtask - runs AFTER nextTick");
  });
  
  // Output:
  // process.nextTick - runs before any microtasks!
  // Promise microtask - runs AFTER nextTick
}


/* ============================================================================
   PART 6: SYNCHRONOUS vs ASYNCHRONOUS EXECUTION
   ============================================================================ */

/* Synchronous Execution (Blocking)
 * - Code runs line by line
 * - Each operation waits for the previous to complete
 * - Call stack blocks until current function finishes
 * - Predictable but can freeze UI
 */

//! SYNCHRONOUS EXAMPLE
function syncTask(name, duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    // Blocking loop
  }
  console.log(`${name} completed after ${duration}ms`);
}

console.log("Start sync");
syncTask("Task 1", 2000);  // Blocks for 2 seconds
syncTask("Task 2", 1000);  // Blocks for 1 second (after task 1)
console.log("End sync");

/* Output (with 3 second delay):
 * Start sync
 * Task 1 completed after 2000ms
 * Task 2 completed after 1000ms
 * End sync
 * 
 * Total time: ~3 seconds (blocking)
 */

/* Asynchronous Execution (Non-blocking)
 * - Operations start but don't block
 * - Callbacks run later when stack is empty
 * - Enables concurrency without threads
 * - Better performance but more complex
 */

//! ASYNCHRONOUS EXAMPLE
function asyncTask(name, duration) {
  setTimeout(() => {
    console.log(`${name} completed after ${duration}ms`);
  }, duration);
}

console.log("Start async");
asyncTask("Task 1", 2000);  // Non-blocking
asyncTask("Task 2", 1000);  // Non-blocking
console.log("End async");

/* Output (immediate then after delays):
 * Start async
 * End async
 * (after 1 second) Task 2 completed after 1000ms
 * (after 2 seconds) Task 1 completed after 2000ms
 * 
 * Total time: ~2 seconds (non-blocking)
 */

//! COMPARISON TABLE

/*
 * ┌────────────────┬────────────────────────┬─────────────────────────┐
 * │    Feature     │    Synchronous         │    Asynchronous         │
 * ├────────────────┼────────────────────────┼─────────────────────────┤
 * │ Execution      │ Blocks until done      │ Returns immediately     │
 * │ Stack behavior │ Stays on stack         │ Moves to Web API        │
 * │ UI Responsive  │ ❌ Freezes UI           │ ✅ Responsive           │
 * │ Error handling │ try/catch works        │ Need catch/Promise.catch│
 * │ Order          │ Predictable            │ Depends on timing       │
 * │ Performance    │ Bad for I/O             │ Excellent for I/O       │
 * │ Use when       │ CPU-intensive tasks    │ Network/files/timers    │
 * └────────────────┴────────────────────────┴─────────────────────────┘
 */

//! MIXING SYNC AND ASYNC (Common Pitfall)

let data = "initial";

// Async operation
setTimeout(() => {
  data = "updated";
  console.log("Data updated inside timeout");
}, 0);

console.log(data);  // Still "initial" - async hasn't run yet

// Using Promise to handle async properly
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("updated data");
    }, 0);
  });
}

async function main() {
  console.log("Start");
  const result = await fetchData();  // Waits for async
  console.log(result);  // "updated data"
  console.log("End");
}
main();

/* Output:
 * Start
 * updated data
 * End
 */


/* ============================================================================
   PART 7: REAL-WORLD EXAMPLES AND PITFALLS
   ============================================================================ */

//! EXAMPLE 1: Using async to prevent blocking (UI freeze)

// ❌ BAD: Blocking the UI
function processLargeArraySync(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Heavy computation
    arr[i] = Math.sqrt(arr[i]) * Math.PI;
  }
  return arr;
}

// ✅ GOOD: Chunk async processing
async function processLargeArrayAsync(arr, chunkSize = 1000) {
  const result = [];
  
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    
    // Process chunk synchronously but yield to event loop
    const processedChunk = chunk.map(num => Math.sqrt(num) * Math.PI);
    result.push(...processedChunk);
    
    // Allow UI to update and other tasks to run
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  return result;
}

//! EXAMPLE 2: Promise + setTimeout race condition

let counter = 0;

// Both start at same time
Promise.resolve().then(() => {
  counter++;
  console.log("Promise incremented to:", counter);
});

setTimeout(() => {
  counter++;
  console.log("Timeout incremented to:", counter);
}, 0);

console.log("Current counter:", counter);

/* Output:
 * Current counter: 0
 * Promise incremented to: 1
 * Timeout incremented to: 2
 * 
 * Promise always runs before setTimeout (microtask priority)
 */

//! EXAMPLE 3: Async/Await event loop behavior

async function asyncFunction() {
  console.log("1. Inside async function (sync part)");
  
  await Promise.resolve();  // This creates a microtask boundary
  
  console.log("3. After await (microtask)");
}

console.log("Start");
asyncFunction();
console.log("End");

/* Output:
 * Start
 * 1. Inside async function (sync part)
 * End
 * 3. After await (microtask)
 * 
 * ⚠️ The code BEFORE the first await runs synchronously!
 * The code AFTER await runs as a microtask.
 */

//! EXAMPLE 4: Unhandled Promise rejections (important!)

// ❌ Missing .catch()
Promise.reject("Error!").then(() => {
  console.log("This won't run");
});
// Unhandled promise rejection (deprecated, now crashes Node.js)

// ✅ Always handle rejections
Promise.reject("Error!").catch(err => {
  console.log("Handled:", err);
});

// ✅ Or use try/catch with async/await
async function safeAsync() {
  try {
    await Promise.reject("Error!");
  } catch (err) {
    console.log("Caught:", err);
  }
}

//! EXAMPLE 5: setImmediate vs setTimeout (Node.js)

if (typeof setImmediate !== 'undefined') {
  setImmediate(() => {
    console.log("setImmediate runs after I/O events");
  });
  
  setTimeout(() => {
    console.log("setTimeout runs at the next timer tick");
  }, 0);
  
  // Order in Node.js event loop phases:
  // Timers (setTimeout) → I/O → setImmediate → Close
}

//! EXAMPLE 6: Infinite loop detection pattern

function safeAsyncLoop(task, maxIterations = 10000) {
  let iterations = 0;
  
  function schedule() {
    if (iterations >= maxIterations) {
      console.log("Max iterations reached");
      return;
    }
    
    iterations++;
    
    // Schedule next iteration as a microtask
    Promise.resolve().then(() => {
      task(iterations);
      schedule();  // Continue loop
    });
  }
  
  schedule();
}

// Usage - this won't block the event loop
safeAsyncLoop((count) => {
  console.log(`Iteration ${count}`);
  if (count >= 10) return;  // Stop condition
});


/* ============================================================================
   PART 8: INTERVIEW QUESTIONS AND CONCEPTS
   ============================================================================ */

//! Q1: What's the output of this code?

console.log("1");

setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => {
    console.log("3");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => {
    console.log("5");
  }, 0);
});

console.log("6");

/* Answer:
 * 1
 * 6
 * 4
 * 2
 * 3
 * 5
 * 
 * Explanation:
 * - Sync: 1, 6
 * - Microtasks: 4 (from Promise)
 * - Macrotask 1: setTimeout with 2
 *   - During macro 1, Promise queues microtask 3
 * - After macro 1, microtask 3 runs
 * - Then macro 2 (setTimeout with 5 from inside the first microtask)
 */

//! Q2: Will this code cause a stack overflow?

function recursivePromise() {
  return Promise.resolve().then(() => {
    console.log("Running");
    return recursivePromise();  // Not recursion on stack!
  });
}

// recursivePromise();  // ❌ Will run FOREVER but won't overflow stack
/* Why? Each .then callback runs in a new microtask, not recursively
 * on the call stack. This is an infinite loop but a safe one (though
 * it will block macrotasks forever!)
 */

//! Q3: Difference between queueMicrotask and Promise.resolve().then()

// They are essentially equivalent for most cases
queueMicrotask(() => {
  console.log("Microtask from queueMicrotask");
});

Promise.resolve().then(() => {
  console.log("Microtask from Promise");
});

// Both run in the same microtask queue (order preserved)
// Output (depending on browser):
// Microtask from queueMicrotask
// Microtask from Promise

//! Q4: How to defer code until stack is clear?

// Method 1: setTimeout (macrotask - lowest priority)
setTimeout(() => {
  console.log("After all microtasks and current macrotask");
}, 0);

// Method 2: Promise (microtask - runs after sync but before next macrotask)
Promise.resolve().then(() => {
  console.log("After sync but before next macrotask");
});

// Method 3: queueMicrotask (same as Promise)
queueMicrotask(() => {
  console.log("Also after sync");
});

// Method 4: setImmediate (Node.js only, between I/O and timers)


/* ============================================================================
   PRODUCTION CHECKLIST
   ============================================================================ */

/* ✅ ALWAYS:
 * - Handle Promise rejections (add .catch() or try/catch)
 * - Use async/await instead of raw Promises for readability
 * - Break up long synchronous tasks using setTimeout or queueMicrotask
 * - Understand that setTimeout(..., 0) is NOT immediate
 * 
 * ⚠️ NEVER:
 * - Block the event loop with long synchronous loops
 * - Assume order of async operations (race conditions)
 * - Create infinite microtask recursion (blocks macrotasks)
 * - Mix sync and async code without understanding the flow
 * 
 * 🔧 DEBUGGING TIPS:
 * - Use console.trace() to see call stack
 * - Use Node.js --trace-event-listeners flag
 * - Use browser Performance tab to visualize event loop
 * - Use process.nextTick(() => {}) in Node.js for immediate async
 * 
 * 📚 BEST PRACTICES:
 * 1. Keep callbacks small and focused
 * 2. Always return Promises or use async/await
 * 3. Use Promise.all() for parallel async operations
 * 4. Implement timeout for external API calls
 * 5. Use worker threads for CPU-intensive tasks
 */


/* ============================================================================
   QUICK REFERENCE TABLE
   ============================================================================ */

/* | Queue Type        | Priority | Example APIs                          | Runs When                    |
 * |-------------------|----------|---------------------------------------|------------------------------|
 * | process.nextTick  | HIGHEST  | process.nextTick()                    | Before any microtasks (Node) |
 * | Microtask Queue   | HIGH     | Promises, queueMicrotask, async/await | After sync, before each macro|
 * | Macrotask Queue   | LOW      | setTimeout, setInterval, I/O, UI      | After microtasks are empty   |
 * 
 * | Code Type         | Execution Order                       |
 * |-------------------|---------------------------------------|
 * | Synchronous       | 1st (immediately)                     |
 * | Microtasks        | 2nd (after sync, before next macro)   |
 * | Macrotasks        | 3rd (one at a time, between microtasks)|
 * 
 * | Method            | Queue Type      | Use Case                           |
 * |-------------------|-----------------|------------------------------------|
 * | Promise.resolve() | Microtask       | Defer but still high priority      |
 * | setTimeout(...,0) | Macrotask       | Defer with lowest priority         |
 * | queueMicrotask()  | Microtask       | Explicit microtask scheduling      |
 * | setImmediate()    | Macrotask (Node)| Defer until I/O phase              |
 */


/* ============================================================================
   EXAMPLE: PRACTICAL APPLICATION
   ============================================================================ */

//! Debounced search (prevents excessive API calls)
class SearchDebouncer {
  constructor(searchFn, delay = 300) {
    this.searchFn = searchFn;
    this.delay = delay;
    this.timeoutId = null;
  }
  
  search(query) {
    // Clear previous timeout (macrotask)
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    // Schedule new search
    this.timeoutId = setTimeout(() => {
      this.searchFn(query);
      this.timeoutId = null;
    }, this.delay);
  }
}

//! Rate limiter using event loop microtasks
class RateLimiter {
  constructor(limitPerSecond = 10) {
    this.tokens = limitPerSecond;
    this.lastRefill = Date.now();
    this.pending = [];
  }
  
  async acquire() {
    // Refill tokens based on time passed
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const newTokens = Math.floor(timePassed / 1000);
    
    if (newTokens > 0) {
      this.tokens = Math.min(this.tokens + newTokens, 10);
      this.lastRefill = now;
    }
    
    if (this.tokens > 0) {
      this.tokens--;
      return Promise.resolve();
    }
    
    // Wait for next token (microtask-based queue)
    return new Promise((resolve) => {
      this.pending.push(resolve);
      
      // Schedule token refill check
      setTimeout(() => {
        this.acquire().then(resolve);
      }, 100);
    });
  }
}

//! Batch processor (prevents blocking)
class AsyncBatchProcessor {
  constructor(items, processor, batchSize = 100) {
    this.items = [...items];
    this.processor = processor;
    this.batchSize = batchSize;
    this.results = [];
  }
  
  async process() {
    while (this.items.length > 0) {
      const batch = this.items.splice(0, this.batchSize);
      
      // Process batch
      const batchResults = await Promise.all(
        batch.map(item => this.processor(item))
      );
      
      this.results.push(...batchResults);
      
      // Yield to event loop
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    return this.results;
  }
}

// Usage
// const processor = new AsyncBatchProcessor(largeArray, async (item) => {
//   return await processItem(item);
// });
// const results = await processor.process();

/* ============================================================================
   VISUAL SUMMARY
   ============================================================================ */

/*
 *                    ┌─────────────────────────────────────────┐
 *                    │            JAVASCRIPT ENGINE            │
 *                    │                                         │
 *                    │  ┌─────────────────────────────────┐   │
 *                    │  │          CALL STACK             │   │
 *                    │  │  ┌─────────────────────────┐    │   │
 *                    │  │  │  function() { ... }     │    │   │
 *                    │  │  │  function() { ... }     │    │   │
 *                    │  │  │  main()                 │    │   │
 *                    │  │  └─────────────────────────┘    │   │
 *                    │  └─────────────────────────────────┘   │
 *                    │              │                          │
 *                    └──────────────│──────────────────────────┘
 *                                   │
 *                     ═══════════════╪═══════════════════
 *                     Environment    │    (Browser/Node)
 *                     (Web/Node APIs)│
 *                                   │
 *                    ┌──────────────▼──────────────────────────┐
 *                    │                                         │
 *                    │  ┌─────────────────────────────────┐   │
 *                    │  │       WEB/NODE APIs             │   │
 *                    │  │  • setTimeout()                │   │
 *                    │  │  • fetch()                     │   │
 *                    │  │  • addEventListener()          │   │
 *                    │  │  • readFile()                  │   │
 *                    │  └─────────────────────────────────┘   │
 *                    │              │                          │
 *                    │              │ (callback ready)         │
 *                    │              ▼                          │
 *                    │  ┌─────────────────────────────────┐   │
 *                    │  │    MACROTASK QUEUE              │   │
 *                    │  │  [cb1][cb2][cb3]                │   │
 *                    │  └─────────────────────────────────┘   │
 *                    │                                         │
 *                    │  ┌─────────────────────────────────┐   │
 *                    │  │    MICROTASK QUEUE              │   │
 *                    │  │  [p1][p2][p3]  ← HIGHER PRIORITY│   │
 *                    │  └─────────────────────────────────┘   │
 *                    │                                         │
 *                    │         ┌─────────────────┐            │
 *                    │         │   EVENT LOOP    │            │
 *                    │         │ while(stack.empty) {         │
 *                    │         │   runAllMicrotasks()         │
 *                    │         │   takeOneMacrotask()         │
 *                    │         │ }                            │
 *                    │         └─────────────────┘            │
 *                    └─────────────────────────────────────────┘
 */