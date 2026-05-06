/* ============================================================================
   ASYNCHRONOUS JAVASCRIPT - COMPLETE NOTES
   ============================================================================ */

/* ============================================================================
   UNDERSTANDING SYNCHRONOUS VS ASYNCHRONOUS
   ============================================================================ */

//! Synchronous (Blocking) - Executes line by line
console.log("1. Start");
console.log("2. Middle");
console.log("3. End");
// Output: 1, 2, 3 (each waits for previous)

//! Asynchronous (Non-blocking) - Doesn't wait
console.log("1. Start");

setTimeout(() => {
    console.log("2. This runs later");
}, 0);

console.log("3. End");
// Output: 1, 3, 2

/* ============================================================================
   CALLBACK FUNCTIONS
   ============================================================================ */

//! Basic Callback
function greet(name, callback) {
    console.log(`Hello ${name}`);
    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye);
// Output: Hello Alice, Goodbye!

//! Callback with Data
function fetchUserData(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "John Doe",
            email: "john@example.com"
        };
        callback(user);
    }, 1000);
}

fetchUserData(1, (user) => {
    console.log("User received:", user.name);
});

//! Callback with Error Handling (Error-First Callback Pattern)
function readFile(filename, callback) {
    setTimeout(() => {
        if (!filename) {
            callback("File name is required", null);
            return;
        }
        const content = `Content of ${filename}`;
        callback(null, content);
    }, 1000);
}

readFile("test.txt", (error, data) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Data:", data);
    }
});

//! Array Methods with Callbacks
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// map
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

/* ============================================================================
   CALLBACK HELL (PYRAMID OF DOOM)
   ============================================================================ */

//! Callback Hell Example - Nested Callbacks
function getuser(userId, callback) {
    setTimeout(() => {
        console.log("Getting user...");
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getPosts(userId, callback) {
    setTimeout(() => {
        console.log("Getting posts for user:", userId);
        callback(["Post 1", "Post 2"]);
    }, 1000);
}

function getComments(post, callback) {
    setTimeout(() => {
        console.log("Getting comments for:", post);
        callback(["Comment 1", "Comment 2"]);
    }, 1000);
}

// This is Callback Hell - Hard to read and maintain
getuser(1, (user) => {
    console.log("User:", user);
    getPosts(user.id, (posts) => {
        console.log("Posts:", posts);
        getComments(posts[0], (comments) => {
            console.log("Comments:", comments);
            getComments(posts[1], (moreComments) => {
                console.log("More Comments:", moreComments);
                // Nesting continues...
            });
        });
    });
});

// Problems with Callback Hell:
// 1. Hard to read and maintain
// 2. Error handling is difficult
// 3. Difficult to debug
// 4. Inversion of control (trust issues)
// 5. Cannot use try/catch

/* ============================================================================
   PROMISES
   ============================================================================ */

//! Promise States
// Pending -> Fulfilled (resolve) OR Rejected (reject)

//! Basic Promise Creation
const myPromise = new Promise((resolve, reject) => {
    // Async operation
    const success = true;
    
    if (success) {
        resolve("Operation successful!");
    } else {
        reject("Operation failed!");
    }
});

//! Promise Example - Real World
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!userId) {
                reject("User ID is required");
                return;
            }
            
            const user = { id: userId, name: "Alice", email: "alice@example.com" };
            resolve(user);
        }, 1000);
    });
}

// Using the promise
fetchUser(1)
    .then(user => console.log("User:", user))
    .catch(error => console.error("Error:", error));

//! Promise.resolve() and Promise.reject()
const resolvedPromise = Promise.resolve("Immediate success");
const rejectedPromise = Promise.reject("Immediate failure");

resolvedPromise.then(data => console.log(data));
rejectedPromise.catch(error => console.log(error));

//! Converting Callback to Promise (Promisification)
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    };
}

// Using promisify
const readFilePromise = promisify(readFile);
readFilePromise("test.txt")
    .then(data => console.log(data))
    .catch(error => console.log(error));

/* ============================================================================
   PROMISE CHAINING (.then, .catch, .finally)
   ============================================================================ */

//! Basic Promise Chaining
fetchUser(1)
    .then(user => {
        console.log("Step 1:", user);
        return user.name;
    })
    .then(name => {
        console.log("Step 2:", name);
        return name.toUpperCase();
    })
    .then(upperName => {
        console.log("Step 3:", upperName);
        return `Hello ${upperName}`;
    })
    .then(greeting => {
        console.log("Step 4:", greeting);
    })
    .catch(error => {
        console.error("Any step error:", error);
    })
    .finally(() => {
        console.log("This always runs");
    });

//! Real-World Chain - Fetching Related Data
function getUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: userId, name: "John" }), 1000);
    });
}

function getOrders(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Order1", "Order2"]), 1000);
    });
}

function getOrderDetails(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: orderId, total: 100 }), 1000);
    });
}

// Chaining multiple async operations
getUser(1)
    .then(user => {
        console.log("User:", user);
        return getOrders(user.id);
    })
    .then(orders => {
        console.log("Orders:", orders);
        return getOrderDetails(orders[0]);
    })
    .then(orderDetails => {
        console.log("Order Details:", orderDetails);
    })
    .catch(error => console.error("Error:", error));

//! Returning Values vs Promises in .then()
Promise.resolve(5)
    .then(value => {
        return value * 2;  // Return value (auto-wrapped in Promise)
    })
    .then(value => {
        console.log(value); // 10
        return Promise.resolve(value * 3); // Return Promise explicitly
    })
    .then(value => {
        console.log(value); // 30
    });

//! Multiple Independent Promises - Promise.all()
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log("All resolved:", values); // [3, 42, "foo"]
    })
    .catch(error => {
        console.error("At least one failed:", error);
    });

//! Promise.allSettled() - Wait for all, regardless of success/failure
const promises = [
    Promise.resolve(1),
    Promise.reject("Error here"),
    Promise.resolve(3)
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log("Success:", result.value);
            } else {
                console.log("Failed:", result.reason);
            }
        });
    });

//! Promise.race() - First to complete (success or error)
const slowPromise = new Promise(resolve => setTimeout(() => resolve("Slow"), 3000));
const fastPromise = new Promise(resolve => setTimeout(() => resolve("Fast"), 1000));

Promise.race([slowPromise, fastPromise])
    .then(result => console.log("Race winner:", result)); // "Fast"

//! Promise.any() - First successful (ignores errors)
const p1 = Promise.reject("Error 1");
const p2 = Promise.resolve("Success 2");
const p3 = Promise.reject("Error 3");

Promise.any([p1, p2, p3])
    .then(result => console.log("First success:", result)) // "Success 2"
    .catch(error => console.log("All failed:", error));

/* ============================================================================
   ASYNC/AWAIT (Modern Way - ES2017+)
   ============================================================================ */

//! Basic Async/Await
async function fetchData() {
    return "Hello World";
}

fetchData().then(data => console.log(data)); // "Hello World"

//! Await - Waits for Promise to resolve
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        console.log("User:", user);
        return user;
    } catch (error) {
        console.error("Error:", error);
    }
}

//! Converting Promise Chain to Async/Await
// Promise chain version
function getDataWithPromises() {
    getUser(1)
        .then(user => getOrders(user.id))
        .then(orders => getOrderDetails(orders[0]))
        .then(details => console.log(details))
        .catch(error => console.error(error));
}

// Async/Await version (much cleaner!)
async function getDataWithAsyncAwait() {
    try {
        const user = await getUser(1);
        const orders = await getOrders(user.id);
        const orderDetails = await getOrderDetails(orders[0]);
        console.log(orderDetails);
    } catch (error) {
        console.error(error);
    }
}

//! Multiple awaits - Sequential vs Parallel
// Sequential (Slower - waits for each)
async function sequential() {
    const start = Date.now();
    const user = await getUser(1);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0]);
    console.log("Sequential time:", Date.now() - start);
    return details;
}

// Parallel (Faster - runs simultaneously)
async function parallel() {
    const start = Date.now();
    const userPromise = getUser(1);
    const ordersPromise = getOrders(1);
    
    const [user, orders] = await Promise.all([userPromise, ordersPromise]);
    const details = await getOrderDetails(orders[0]);
    console.log("Parallel time:", Date.now() - start);
    return details;
}

//! Async/Await with Promise.all()
async function fetchAllUsers(userIds) {
    const userPromises = userIds.map(id => fetchUser(id));
    const users = await Promise.all(userPromises);
    console.log("All users:", users);
    return users;
}

//! Async/Await with loops
async function processUsers(userIds) {
    // Sequential with for...of (not forEach - forEach doesn't work with await)
    for (const id of userIds) {
        const user = await fetchUser(id);
        console.log("Processing:", user);
    }
    
    // Parallel with map and Promise.all
    const users = await Promise.all(userIds.map(id => fetchUser(id)));
    console.log("All users:", users);
}

//! Async function returns Promise always
async function getNumber() {
    return 42; // Automatically wrapped in Promise
}

getNumber().then(num => console.log(num)); // 42

//! Async function expression
const getData = async function() {
    return "Data";
};

//! Arrow function async
const fetchAPI = async (url) => {
    const response = await fetch(url);
    return response.json();
};

//! IIFE Async (Immediately Invoked Async Function Expression)
(async () => {
    const data = await fetchUser(1);
    console.log("IIFE result:", data);
})();

//! Async/Await in Class Methods
class DataService {
    async fetchUser(id) {
        const response = await fetch(`/api/users/${id}`);
        return response.json();
    }
    
    async saveUser(userData) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        return response.json();
    }
}

/* ============================================================================
   ERROR HANDLING IN ASYNC CODE
   ============================================================================ */

//! Error Handling with Promises - .catch()
fetchUser(null)
    .then(user => console.log(user))
    .catch(error => {
        console.error("Caught error:", error);
    });

//! Error Handling with Async/Await - try/catch
async function safeFetchUser(userId) {
    try {
        const user = await fetchUser(userId);
        console.log(user);
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null; // Return default value
    }
}

//! Multiple try/catch blocks
async function complexOperation() {
    try {
        const user = await fetchUser(1);
        
        try {
            const orders = await getOrders(user.id);
            console.log(orders);
        } catch (orderError) {
            console.error("Order error:", orderError);
        }
        
        return user;
    } catch (userError) {
        console.error("User error:", userError);
        throw new Error("Complete failure");
    }
}

//! Global Error Handling
window.addEventListener('unhandledrejection', (event) => {
    console.error("Unhandled Promise rejection:", event.reason);
    // Prevent console error
    event.preventDefault();
});

//! Specific Error Types
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

async function handleSpecificErrors() {
    try {
        await fetchUser(null);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log("Validation issue:", error.message);
        } else if (error instanceof NetworkError) {
            console.log("Network issue:", error.message);
        } else {
            console.log("Unknown error:", error);
        }
    }
}

//! Error Handling in Promise.all()
async function handleParallelErrors() {
    try {
        const results = await Promise.all([
            fetchUser(1),
            fetchUser(null), // This will fail
            fetchUser(3)
        ]);
        console.log(results);
    } catch (error) {
        console.error("At least one operation failed:", error);
    }
}

//! Using Promise.allSettled() for partial failures
async function handlePartialFailures() {
    const results = await Promise.allSettled([
        fetchUser(1),
        fetchUser(null),
        fetchUser(3)
    ]);
    
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log("Success:", result.value);
        } else {
            console.log("Failed:", result.reason);
        }
    });
}

//! Retry Logic with Error Handling
async function fetchWithRetry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        
        console.log(`Retrying... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(fn, retries - 1, delay);
    }
}

// Usage
fetchWithRetry(() => fetchUser(1), 3, 1000)
    .then(user => console.log("Success after retry:", user))
    .catch(error => console.log("All retries failed:", error));

//! Timeout with Promises
function timeoutPromise(promise, ms) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms);
    });
    
    return Promise.race([promise, timeout]);
}

// Usage
timeoutPromise(fetchUser(1), 2000)
    .then(user => console.log(user))
    .catch(error => console.error(error.message));

/* ============================================================================
   REAL-WORLD EXAMPLES
   ============================================================================ */

//! Example 1: Fetch API with Async/Await
async function getGitHubUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        console.log(`User: ${user.name}, Repos: ${user.public_repos}`);
        return user;
    } catch (error) {
        console.error("Failed to fetch GitHub user:", error);
        throw error;
    }
}

//! Example 2: Multiple API Calls
async function getUserWithDetails(username) {
    try {
        // Parallel calls
        const [user, repos, events] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
            fetch(`https://api.github.com/users/${username}/repos`).then(r => r.json()),
            fetch(`https://api.github.com/users/${username}/events`).then(r => r.json())
        ]);
        
        return {
            user,
            repos: repos.slice(0, 5),
            recentEvents: events.slice(0, 3)
        };
    } catch (error) {
        console.error("Failed to fetch user details:", error);
        return null;
    }
}

//! Example 3: File Upload with Progress
class FileUploader {
    async upload(file, onProgress) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const percent = (event.loaded / event.total) * 100;
                    onProgress(percent);
                }
            });
            
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error(`Upload failed: ${xhr.status}`));
                }
            });
            
            xhr.addEventListener('error', () => reject(new Error("Network error")));
            
            const formData = new FormData();
            formData.append('file', file);
            xhr.open('POST', '/upload');
            xhr.send(formData);
        });
    }
}

//! Example 4: Rate Limiter
class RateLimiter {
    constructor(limit, interval) {
        this.limit = limit;
        this.interval = interval;
        this.queue = [];
        this.active = 0;
    }
    
    async execute(fn) {
        if (this.active >= this.limit) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        
        this.active++;
        
        try {
            return await fn();
        } finally {
            this.active--;
            
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                next();
            }
        }
    }
}

// Usage
const limiter = new RateLimiter(2, 1000);
for (let i = 0; i < 5; i++) {
    limiter.execute(() => fetchUser(i))
        .then(user => console.log(user));
}

//! Example 5: Debounce with Promises
function debounce(fn, delay) {
    let timeoutId;
    let pendingPromise = null;
    
    return function(...args) {
        if (pendingPromise) {
            return pendingPromise;
        }
        
        return new Promise((resolve, reject) => {
            if (timeoutId) clearTimeout(timeoutId);
            
            timeoutId = setTimeout(async () => {
                try {
                    const result = await fn(...args);
                    resolve(result);
                    pendingPromise = null;
                } catch (error) {
                    reject(error);
                    pendingPromise = null;
                }
            }, delay);
        });
    };
}

//! Example 6: Throttle with Promises
function throttle(fn, limit) {
    let inThrottle = false;
    
    return function(...args) {
        return new Promise((resolve, reject) => {
            if (!inThrottle) {
                inThrottle = true;
                
                Promise.resolve(fn(...args))
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                        setTimeout(() => {
                            inThrottle = false;
                        }, limit);
                    });
            } else {
                reject(new Error("Throttled"));
            }
        });
    };
}

//! Example 7: Cache with Promises
class AsyncCache {
    constructor(ttl = 60000) {
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    async get(key, fetcher) {
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            console.log("Cache hit for:", key);
            return cached.value;
        }
        
        console.log("Cache miss for:", key);
        const value = await fetcher();
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
        
        return value;
    }
    
    clear(key) {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }
}

// Usage
const cache = new AsyncCache(30000);
const user = await cache.get("user:1", () => fetchUser(1));

//! Example 8: Polling with Async/Await
async function poll(fn, condition, interval = 1000, timeout = 30000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        const result = await fn();
        
        if (condition(result)) {
            return result;
        }
        
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    throw new Error("Polling timeout");
}

// Usage - Wait for a task to complete
async function waitForTask(taskId) {
    return poll(
        () => fetch(`/api/tasks/${taskId}`).then(r => r.json()),
        (task) => task.status === "completed",
        2000,
        60000
    );
}

//! Example 9: Request Queue
class RequestQueue {
    constructor(maxConcurrent = 3) {
        this.maxConcurrent = maxConcurrent;
        this.current = 0;
        this.queue = [];
    }
    
    async add(requestFn) {
        if (this.current >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        
        this.current++;
        
        try {
            return await requestFn();
        } finally {
            this.current--;
            
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                next();
            }
        }
    }
}

// Usage
const queue = new RequestQueue(2);
for (let i = 0; i < 10; i++) {
    queue.add(() => fetchUser(i))
        .then(user => console.log(`User ${i}:`, user));
}

//! Example 10: Sequential Execution with Reduce
async function processSequentially(items, processor) {
    return items.reduce(async (previousPromise, item) => {
        await previousPromise;
        return processor(item);
    }, Promise.resolve());
}

// Usage
const userIds = [1, 2, 3, 4, 5];
await processSequentially(userIds, async (id) => {
    const user = await fetchUser(id);
    console.log("Processed:", user.name);
});

/* ============================================================================
   COMMON PATTERNS & PITFALLS
   ============================================================================ */

//! Pitfall 1: Forgetting await
async function badExample() {
    const user = fetchUser(1); // Missing await - returns Promise, not user
    console.log(user); // Promise { <pending> }
}

async function goodExample() {
    const user = await fetchUser(1);
    console.log(user); // Actual user object
}

//! Pitfall 2: Using await in forEach
async function badForEach() {
    const ids = [1, 2, 3];
    
    // This DOES NOT work - forEach doesn't await
    ids.forEach(async (id) => {
        const user = await fetchUser(id);
        console.log(user); // Runs in parallel, not sequential
    });
    
    console.log("Done"); // This runs before all users are fetched
}

async function goodForLoop() {
    const ids = [1, 2, 3];
    
    // Use for...of instead
    for (const id of ids) {
        const user = await fetchUser(id);
        console.log(user);
    }
}

//! Pitfall 3: Not handling rejections
async function badErrorHandling() {
    const user = fetchUser(null); // No catch, unhandled rejection
    return user;
}

async function goodErrorHandling() {
    try {
        const user = await fetchUser(null);
        return user;
    } catch (error) {
        console.error("Handled error:", error);
        return null;
    }
}

//! Pitfall 4: Unnecessary await
async function badUnnecessaryAwait() {
    // Bad - await on non-promise
    const number = await 42;
    
    // Bad - awaiting return
    return await fetchUser(1);
}

async function goodNoUnnecessaryAwait() {
    const number = 42; // No await needed
    
    // Just return the promise
    return fetchUser(1);
}

//! Pattern 1: Async Initialization
class AsyncInitialized {
    constructor() {
        this.initialized = false;
        this.initPromise = this.initialize();
    }
    
    async initialize() {
        await this.loadData();
        this.initialized = true;
    }
    
    async loadData() {
        this.data = await fetchUser(1);
    }
    
    async getData() {
        await this.initPromise;
        return this.data;
    }
}

//! Pattern 2: Cancellable Promise
function makeCancellable(promise) {
    let isCancelled = false;
    
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            value => isCancelled ? reject({ cancelled: true }) : resolve(value),
            error => isCancelled ? reject({ cancelled: true }) : reject(error)
        );
    });
    
    return {
        promise: wrappedPromise,
        cancel() {
            isCancelled = true;
        }
    };
}

// Usage
const cancellable = makeCancellable(fetchUser(1));
cancellable.cancel(); // Cancel the operation

//! Pattern 3: Async Queue
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolvers = [];
    }
    
    enqueue(item) {
        if (this.resolvers.length) {
            const resolve = this.resolvers.shift();
            resolve(item);
        } else {
            this.queue.push(item);
        }
    }
    
    async dequeue() {
        if (this.queue.length) {
            return this.queue.shift();
        }
        
        return new Promise(resolve => {
            this.resolvers.push(resolve);
        });
    }
    
    get size() {
        return this.queue.length;
    }
}

/* ============================================================================
   BEST PRACTICES & PRODUCTION TIPS
   ============================================================================ */

//! 1. Always Handle Errors
async function bestPractice1() {
    try {
        const data = await fetchUser(1);
        return data;
    } catch (error) {
        // Log error properly
        console.error({
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        
        // Either rethrow, return default, or handle gracefully
        throw new Error("Service temporarily unavailable");
    }
}

//! 2. Use Promise.all() for Independent Operations
async function bestPractice2() {
    // Bad - Sequential for independent operations
    const user = await fetchUser(1);
    const posts = await fetchPosts(1);
    const comments = await fetchComments(1);
    
    // Good - Parallel for independent operations
    const [user2, posts2, comments2] = await Promise.all([
        fetchUser(1),
        fetchPosts(1),
        fetchComments(1)
    ]);
}

//! 3. Use Timeouts for Network Requests
function withTimeout(promise, ms, timeoutValue = null) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
        )
    ]);
}

//! 4. Implement Retry Logic for Transient Failures
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            
            if (i === maxRetries - 1) break;
            
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
    
    throw lastError;
}

//! 5. Use Async/Await Instead of Raw Promises (Cleaner Code)
// Bad
function badPromises() {
    return fetchUser(1)
        .then(user => getOrders(user.id))
        .then(orders => getOrderDetails(orders[0]))
        .then(details => processDetails(details));
}

// Good
async function goodAsync() {
    const user = await fetchUser(1);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0]);
    return processDetails(details);
}

//! 6. Combine Async/Await with Event Emitters
class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    async emit(event, ...args) {
        if (!this.events.has(event)) return;
        
        const handlers = this.events.get(event);
        const results = [];
        
        for (const handler of handlers) {
            results.push(await handler(...args));
        }
        
        return results;
    }
    
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
        
        return () => this.off(event, handler);
    }
    
    off(event, handler) {
        if (!this.events.has(event)) return;
        
        const handlers = this.events.get(event);
        const index = handlers.indexOf(handler);
        if (index !== -1) handlers.splice(index, 1);
    }
}

//! 7. Use AbortController for Fetch Requests
async function cancellableFetch(url, options = {}) {
    const controller = new AbortController();
    const { signal } = controller;
    
    const fetchPromise = fetch(url, { ...options, signal });
    
    return {
        promise: fetchPromise,
        cancel: () => controller.abort()
    };
}

//! 8. Batch Async Operations
class AsyncBatcher {
    constructor(operation, batchSize = 10, delay = 100) {
        this.operation = operation;
        this.batchSize = batchSize;
        this.delay = delay;
        this.queue = [];
        this.processing = false;
    }
    
    add(item) {
        return new Promise((resolve, reject) => {
            this.queue.push({ item, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.processing || this.queue.length === 0) return;
        
        this.processing = true;
        
        while (this.queue.length > 0) {
            const batch = this.queue.splice(0, this.batchSize);
            const items = batch.map(b => b.item);
            
            try {
                const results = await this.operation(items);
                
                batch.forEach((b, index) => {
                    b.resolve(results[index]);
                });
            } catch (error) {
                batch.forEach(b => b.reject(error));
            }
            
            if (this.queue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, this.delay));
            }
        }
        
        this.processing = false;
    }
}

/* ============================================================================
   QUICK REFERENCE TABLE
   ============================================================================ */

/*
| Feature              | Syntax                                          | When to Use                          |
|----------------------|-------------------------------------------------|--------------------------------------|
| Callback             | fn(err, data) => {}                             | Simple async, event handlers         |
| Promise              | new Promise((res,rej) => {})                    | Any async operation                  |
| .then()              | promise.then(data => {})                        | Promise chain, transformation        |
| .catch()             | promise.catch(err => {})                        | Error handling in promises           |
| .finally()           | promise.finally(() => {})                       | Cleanup regardless of outcome        |
| Promise.all()        | Promise.all([p1, p2])                           | Multiple independent async ops       |
| Promise.race()       | Promise.race([p1, p2])                          | First to complete (timeouts)         |
| Promise.allSettled() | Promise.allSettled([p1, p2])                    | All results, allow failures          |
| Promise.any()        | Promise.any([p1, p2])                           | First successful result              |
| async function       | async fn() {}                                   | Modern async (returns Promise)       |
| await                | await promise                                   | Wait for Promise resolution          |
| try/catch            | try { await fn() } catch(e) {}                  | Error handling in async/await        |
*/

/* ============================================================================
   INTERVIEW QUESTIONS & ANSWERS
   ============================================================================ */

/*
Q1: What's the difference between synchronous and asynchronous code?
A: Synchronous code executes line by line, blocking subsequent operations.
   Asynchronous code doesn't block; it continues executing while waiting for
   operations to complete.

Q2: What is callback hell and how do you avoid it?
A: Callback hell is deeply nested callbacks leading to unreadable code.
   Solutions: Promises, async/await, modularization.

Q3: What are the states of a Promise?
A: Pending (initial), Fulfilled (resolved successfully), Rejected (failed).

Q4: What's the difference between Promise.all() and Promise.allSettled()?
A: Promise.all() fails fast - rejects if any promise rejects.
   Promise.allSettled() waits for all to complete, returns status for each.

Q5: How does async/await work internally?
A: Async functions return a Promise. Await pauses function execution until the
   promise settles, then resumes with the resolved value.

Q6: Can you use await without async?
A: No, await can only be used inside async functions (or top-level await in modules).

Q7: How do you handle errors in async/await?
A: Wrap in try/catch blocks, or use .catch() on the returned promise.

Q8: What's the difference between sequential and parallel execution?
A: Sequential uses await on each operation (waits for each). Parallel uses
   Promise.all() to run operations concurrently.

Q9: How do you implement a timeout for a promise?
A: Use Promise.race() with a promise that rejects after timeout.

Q10: What's the event loop and how does it handle async operations?
A: The event loop manages execution of async callbacks. It continuously checks
    the call stack and task queues, moving callbacks to the stack when empty.

Q11: What are microtasks and macrotasks?
A: Microtasks (Promises, MutationObserver) have higher priority and execute
    before macrotasks (setTimeout, setInterval, I/O).

Q12: How do you cancel a promise?
A: Promises cannot be cancelled natively. Use AbortController for fetch,
    or implement custom cancellation with flags.

Q13: What's promise chaining?
A: Returning a promise in .then() creates a chain, allowing sequential async
    operations with proper error propagation.

Q14: How do you retry failed async operations?
A: Implement retry logic with loop and exponential backoff, or use libraries
    like p-retry.

Q15: What's the difference between throw and reject?
A: throw is for synchronous errors, reject is for Promise errors. In async
    functions, throw works like reject.
*/