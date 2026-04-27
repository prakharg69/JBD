/* ============================================================================
   1.8 ERROR HANDLING BASICS — COMPLETE GUIDE
   ============================================================================ */

/* ============================================================================
   PART 1: UNDERSTANDING ERRORS
   ============================================================================ */

/* What is an Error?
 * An error is a problem that occurs during code execution. 
 * Without proper handling, an error stops your entire program from running.
 */

//! WITHOUT ERROR HANDLING — program STOPS
// const data = JSON.parse("invalid json"); // ❌ Program crashes
// console.log("This never runs");

//* WITH ERROR HANDLING — program CONTINUES
try {
  const data = JSON.parse("invalid json");
} catch (error) {
  console.log("Error caught, program continues");
}
console.log("This DOES run"); // ✓ Executes

//? WHY ERROR HANDLING MATTERS
/* Without error handling:
 * - Program crashes
 * - User sees nothing
 * - Server goes down
 * - Data may be lost
 * 
 * With error handling:
 * - Program continues running
 * - User gets helpful message
 * - Server stays stable
 * - Can attempt recovery
 */


/* ============================================================================
   PART 2: TRY-CATCH-FINALLY
   ============================================================================ */

/* What is Try-Catch-Finally?
 * A try-catch-finally block is JavaScript's way of handling errors gracefully:
 * 
 * try — Code that MIGHT cause an error
 * catch — Code that RUNS IF there's an error
 * finally — Code that ALWAYS runs (cleanup)
 */

//! BASIC SYNTAX
try {
  // Code that might throw an error
  // risky_operation();
} catch (error) {
  // Code that runs if error occurs
  console.log("Error caught!");
} finally {
  // Code that ALWAYS runs
  console.log("Cleanup");
}


/* ============================================================================
   PART 3: THE TRY BLOCK
   ============================================================================ */

//? WHAT GOES IN TRY? Any code that MIGHT throw an error:

// Example 1: Parsing JSON
try {
  const data = JSON.parse(userInput);
} catch (error) {
  // Handle error
}

// Example 2: Accessing properties
try {
  const name = user.profile.name;
} catch (error) {
  // Handle error
}

// Example 3: File operations
try {
  const content = readFileSync("file.txt");
} catch (error) {
  // Handle error
}

// Example 4: Array operations
try {
  const item = array[unknownIndex];
} catch (error) {
  // Handle error
}

// Example 5: Math operations (doesn't throw, but could be logic error)
try {
  const result = 10 / 0;
} catch (error) {
  // Handle error
}

//* WHAT NOT TO PUT IN TRY? Code you're certain won't error:

// ❌ Avoid this (wastes performance)
try {
  const x = 5;
  const y = 10;
  const sum = x + y;
} catch (error) {
  console.log("Error");
}

// ✓ Better (only risky code)
const x = 5;
const y = 10;
const sum = x + y;
try {
  const result = JSON.parse(userInput);
} catch (error) {
  console.log("Error");
}


/* ============================================================================
   PART 4: THE CATCH BLOCK
   ============================================================================ */

/* What is Catch?
 * The catch block receives the error object and handles it.
 */

//! BASIC CATCH BLOCK
try {
  throw new Error("Something went wrong");
} catch (error) {
  // 'error' object contains information about what went wrong
  console.log(error.message);   // "Something went wrong"
  console.log(error.name);      // "Error"
  console.log(error.stack);     // Full error traceback
}

//? ERROR OBJECT PROPERTIES
try {
  JSON.parse("invalid");
} catch (error) {
  // Properties available
  error.message;        // "Unexpected token i in JSON at position 0"
  error.name;          // "SyntaxError"
  error.stack;         // Full stack trace (for debugging)
  
  // Different error types
  typeof error;        // "object"
  error instanceof Error;  // true
  error instanceof SyntaxError;  // true (specific type)
}

//* HANDLING DIFFERENT ERROR TYPES
try {
  // Some operation
} catch (error) {
  // Check error type
  if (error instanceof SyntaxError) {
    console.log("JSON format is invalid");
  } else if (error instanceof TypeError) {
    console.log("Wrong data type");
  } else if (error instanceof ReferenceError) {
    console.log("Variable not defined");
  } else {
    console.log("Unknown error:", error.message);
  }
}

// TODO: Named Catch Parameter (Optional)
// Modern: Must use parameter
try {
  throw new Error("Oops");
} catch (error) {
  console.log(error);
}

// Older syntax also possible
try {
  throw new Error("Oops");
} catch {  // No parameter name
  console.log("An error occurred");  // But can't access error details
}


/* ============================================================================
   PART 5: THE FINALLY BLOCK
   ============================================================================ */

/* What is Finally?
 * The finally block ALWAYS runs, whether error or not.
 */

//! FINALLY ALWAYS RUNS
try {
  console.log("1. Try block");
  throw new Error("Oops");
} catch (error) {
  console.log("2. Catch block");
} finally {
  console.log("3. Finally block - ALWAYS runs");
}

// Output:
// 1. Try block
// 2. Catch block
// 3. Finally block - ALWAYS runs

//? WHEN TO USE FINALLY — Use finally for cleanup:

// Example 1: Close database connection
let connection;
try {
  connection = openDatabase();
  const data = connection.query("SELECT * FROM users");
} catch (error) {
  console.log("Database error:", error);
} finally {
  if (connection) {
    connection.close();  // ALWAYS close, even if error
  }
}

// Example 2: Clean up resources
let file;
try {
  file = fs.openSync("data.txt");
  const content = fs.readFileSync(file);
} catch (error) {
  console.log("File error:", error);
} finally {
  if (file) {
    fs.closeSync(file);  // Always close file
  }
}

// Example 3: Stop loading spinner
try {
  const response = await fetch(url);
} catch (error) {
  console.log("Network error:", error);
} finally {
  hideLoadingSpinner();  // Always hide, whether success or error
}

//* FINALLY ALWAYS RUNS (Even with return)
function test() {
  try {
    console.log("Try");
    return "from try";  // Exit function
  } finally {
    console.log("Finally");  // STILL RUNS!
  }
}

test();
// Output:
// Try
// Finally
// Returns: "from try"


/* ============================================================================
   PART 6: THROWING ERRORS
   ============================================================================ */

/* What Does Throw Do?
 * The throw statement creates an error that can be caught.
 */

//! THROWING ERRORS
// Throw an error manually
throw new Error("Something bad happened");

// Can throw any value (not recommended)
// throw "error string";
// throw 42;
// throw {message: "object error"};

//? WHY THROW ERRORS?
/* You throw errors to:
 * - Stop execution — Prevent incorrect behavior
 * - Signal problems — Let calling code know something failed
 * - Validate input — Ensure data is correct before processing
 */

//* THROWING BUILT-IN ERRORS

// TypeError — Wrong data type
if (typeof name !== "string") {
  throw new TypeError("Name must be a string");
}

// RangeError — Value out of range
if (age < 0 || age > 150) {
  throw new RangeError("Age must be between 0 and 150");
}

// SyntaxError — Code syntax problem (usually auto-thrown)
if (invalidJSON) {
  throw new SyntaxError("Invalid JSON format");
}

// ReferenceError — Variable doesn't exist (usually auto-thrown)
if (variableNotDefined) {
  throw new ReferenceError("Variable not defined");
}

// TODO: Practical Example: Throwing Validation Error
function createUser(email, age) {
  // Validate email
  if (!email.includes("@")) {
    throw new Error("Invalid email address");
  }
  
  // Validate age
  if (age < 18) {
    throw new Error("Must be 18 or older");
  }
  
  // If validation passes, create user
  return {email, age, createdAt: new Date()};
}

// Usage
try {
  const user = createUser("invalid", 16);
} catch (error) {
  console.log("Cannot create user:", error.message);
}

//! RETHROWING ERRORS
// Catch, handle, then rethrow
try {
  riskyOperation();
} catch (error) {
  console.log("Logging error:", error.message);
  
  // Do something with error, then rethrow
  throw error;  // Pass error up to caller
}

// Practical: Enhance error before rethrowing
try {
  const result = apiCall();
} catch (error) {
  // Add context to error
  error.context = "API call failed";
  error.timestamp = new Date();
  
  // Rethrow with more info
  throw error;
}


/* ============================================================================
   PART 7: CUSTOM ERRORS
   ============================================================================ */

/* What are Custom Errors?
 * Custom errors are error classes you create for your specific application.
 */

//? WHY CREATE CUSTOM ERRORS?
/* - Specific error types — Different errors for different situations
 * - Better debugging — Know exactly what went wrong
 * - Proper error handling — Catch specific errors, not generic ones
 */

//! CREATING BASIC CUSTOM ERROR
// Extend Error class
class ValidationError extends Error {
  constructor(message) {
    super(message);           // Call parent constructor
    this.name = "ValidationError";
  }
}

// Usage
try {
  throw new ValidationError("Email is invalid");
} catch (error) {
  console.log(error.name);     // "ValidationError"
  console.log(error.message);  // "Email is invalid"
}

//* CUSTOM ERROR WITH PROPERTIES
class ApiError extends Error {
  constructor(message, statusCode, responseData) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.responseData = responseData;
  }
}

// Usage
try {
  throw new ApiError(
    "Failed to fetch user",
    404,
    {error: "User not found"}
  );
} catch (error) {
  if (error instanceof ApiError) {
    console.log(`HTTP ${error.statusCode}: ${error.message}`);
    console.log("Details:", error.responseData);
  }
}

// TODO: MULTIPLE CUSTOM ERRORS
class DatabaseError extends Error {
  constructor(message, query) {
    super(message);
    this.name = "DatabaseError";
    this.query = query;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class PaymentError extends Error {
  constructor(message, amount) {
    super(message);
    this.name = "PaymentError";
    this.amount = amount;
  }
}

// Usage
try {
  // Some operation
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log("User not authenticated");
  } else if (error instanceof PaymentError) {
    console.log(`Payment of $${error.amount} failed`);
  } else if (error instanceof DatabaseError) {
    console.log("Database issue with query:", error.query);
  }
}

//! COMPLETE EXAMPLE: User Service with Custom Errors
class ValidationErrorCustom extends Error {
  constructor(field, message) {
    super(`${field}: ${message}`);
    this.name = "ValidationError";
    this.field = field;
  }
}

class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User ${userId} not found`);
    this.name = "UserNotFoundError";
    this.userId = userId;
  }
}

class UserService {
  // In-memory "database"
  static users = [];

  static createUser(email, age) {
    // Validate email
    if (!email.includes("@")) {
      throw new ValidationErrorCustom("email", "Must contain @");
    }

    // Validate age
    if (age < 18) {
      throw new ValidationErrorCustom("age", "Must be 18 or older");
    }

    const user = {
      id: this.users.length + 1,
      email,
      age,
      createdAt: new Date()
    };

    this.users.push(user);
    return user;
  }

  static getUser(userId) {
    const user = this.users.find(u => u.id === userId);
    
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return user;
  }
}

// Usage
try {
  // Try to create user with invalid age
  UserService.createUser("john@example.com", 16);
} catch (error) {
  if (error instanceof ValidationErrorCustom) {
    console.log(`Validation error in ${error.field}: ${error.message}`);
  } else {
    console.log("Unknown error:", error.message);
  }
}

try {
  // Try to get non-existent user
  UserService.getUser(999);
} catch (error) {
  if (error instanceof UserNotFoundError) {
    console.log(`Cannot find user ${error.userId}`);
  }
}


/* ============================================================================
   PART 8: PRACTICAL ERROR HANDLING PATTERNS
   ============================================================================ */

// TODO: Pattern 1: Try-Catch with Default Value
function parseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("Invalid JSON, using default");
    return null;  // Return default if error
  }
}

const data = parseJSON(userInput) || {default: true};

// TODO: Pattern 2: Try-Catch with Retry
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;  // Final attempt
      
      console.log(`Attempt ${i + 1} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000));  // Wait 1s
    }
  }
}

// TODO: Pattern 3: Try-Catch with Logging
function executeAndLog(operation, context) {
  try {
    console.log(`Starting: ${context}`);
    const result = operation();
    console.log(`Success: ${context}`);
    return result;
  } catch (error) {
    console.error(`Failed: ${context}`);
    console.error("Error details:", error);
    throw error;  // Rethrow for caller to handle
  }
}

// Usage
try {
  executeAndLog(() => risky_operation(), "Database query");
} catch (error) {
  // Handle final error
}

// TODO: Pattern 4: Finally with Resource Cleanup
function processFile(filename) {
  let file;
  try {
    file = openFile(filename);
    const content = file.read();
    return processContent(content);
  } catch (error) {
    console.log("Error processing file:", error);
    return null;
  } finally {
    if (file) {
      file.close();  // Always clean up
    }
  }
}

// TODO: Pattern 5: Async Error Handling
async function fetchAndProcess(url) {
  try {
    // May throw network error
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    // May throw parse error
    const data = await response.json();
    
    // May throw logic error
    return processData(data);
    
  } catch (error) {
    console.log("Operation failed:", error.message);
    return null;
  } finally {
    console.log("Request complete");
  }
}


/* ============================================================================
   PART 9: ERROR TYPES IN JAVASCRIPT
   ============================================================================ */

//! BUILT-IN ERROR TYPES

// Error — Generic error
throw new Error("Generic error");

// SyntaxError — Invalid syntax
// JSON.parse("{invalid}");  // Auto-thrown

// TypeError — Wrong type
// const x = null;
// x.toUpperCase();  // ❌ TypeError: Cannot read property 'toUpperCase' of null

// ReferenceError — Variable not defined
// console.log(undefinedVariable);  // ❌ ReferenceError

// RangeError — Value out of range
// const arr = new Array(-1);  // ❌ RangeError: Invalid array length

// EvalError — eval() error (rarely used)
// URIError — URI function error


/* ============================================================================
   PART 10: COMMON MISTAKES
   ============================================================================ */

//! ❌ Mistake 1: Empty Catch Block

// ❌ BAD — Silently ignores error
try {
  riskyOperation();
} catch (error) {
  // Do nothing
}

// ✓ GOOD — Handle or log error
try {
  riskyOperation();
} catch (error) {
  console.log("Error occurred:", error.message);
  // Take corrective action
}

//! ❌ Mistake 2: Catching Too Broadly

// ❌ BAD — Catches all errors, hard to debug
try {
  const data = JSON.parse(userInput);
  const result = data.value.nested.property;  // May throw
  const processed = processData(result);      // May throw
} catch (error) {
  console.log("Something went wrong");  // Don't know what!
}

// ✓ GOOD — Only risky operation in try
let dataParsed;
try {
  dataParsed = JSON.parse(userInput);
} catch (error) {
  console.log("JSON parse error:", error);
  return null;
}
// Safe operations outside try
const resultData = dataParsed.value.nested.property;
const processedData = processData(resultData);

//! ❌ Mistake 3: Not Cleaning Up in Finally

// ❌ BAD — File might not close if error
try {
  const file = openFile("data.txt");
  const content = file.read();
} catch (error) {
  console.log("Error:", error);
}

// ✓ GOOD — Always close in finally
let fileHandle;
try {
  fileHandle = openFile("data.txt");
  const content = fileHandle.read();
} finally {
  if (fileHandle) fileHandle.close();
}

//! ❌ Mistake 4: Throwing Non-Error Objects

// ❌ BAD — Harder to debug
throw "An error occurred";
throw 42;

// ✓ GOOD — Use Error objects
throw new Error("An error occurred");
throw new CustomError("An error occurred");


/* ============================================================================
   PART 11: PRODUCTION CHECKLIST
   ============================================================================ */

/* ✅ Always try-catch risky operations:
 * - JSON parsing
 * - Fetch/API calls
 * - File operations
 * - Array access
 * - Type conversions
 */

/* ✅ Use finally for cleanup:
 * - Close database connections
 * - Close files
 * - Hide loading indicators
 * - Reset global state
 */

/* ✅ Create custom errors for your app:
 * - Different errors for different situations
 * - Include useful context
 * - Make errors specific and descriptive
 */

/* ✅ Log errors properly:
 * - Include timestamp
 * - Include stack trace
 * - Include user context
 * - Send to error tracking service
 */

/* ✅ Never silently fail:
 * - Always log or handle errors
 * - Never empty catch blocks
 * - Always provide user feedback
 */

/* ✅ Distinguish error types:
 * - Catch specific errors, not generic Error
 * - Use instanceof to check error type
 * - Handle different errors differently
 */

/* ✅ Be specific in error messages:
 * - Include what failed
 * - Include why it failed
 * - Include how to fix it
 */


/* ============================================================================
   PART 12: EXAMPLE: COMPLETE ERROR HANDLING SYSTEM
   ============================================================================ */

//! 1. Define custom errors
class ValidationErrorEx extends Error {
  constructor(field, value, reason) {
    super(`Validation error in ${field}: ${reason}`);
    this.name = "ValidationError";
    this.field = field;
    this.value = value;
  }
}

class AuthErrorEx extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

class DatabaseErrorEx extends Error {
  constructor(message, query) {
    super(message);
    this.name = "DatabaseError";
    this.query = query;
  }
}

//! 2. Error logger
class ErrorLogger {
  static log(error, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
      context: context
    };
    
    console.error(JSON.stringify(logEntry, null, 2));
    // In production, send to error tracking service
  }
}

//! 3. Service with error handling
class UserServiceEx {
  static users = [];

  static createUser(email, age) {
    try {
      // Validate email
      if (!email || !email.includes("@")) {
        throw new ValidationErrorEx("email", email, "Must be valid email");
      }

      // Validate age
      if (age < 18 || age > 120) {
        throw new ValidationErrorEx("age", age, "Must be between 18 and 120");
      }

      // Simulate database operation
      if (this.users.some(u => u.email === email)) {
        throw new ValidationErrorEx("email", email, "Email already exists");
      }

      const user = {
        id: this.users.length + 1,
        email,
        age,
        createdAt: new Date()
      };

      this.users.push(user);
      return user;

    } catch (error) {
      if (error instanceof ValidationErrorEx) {
        // Handle validation errors
        ErrorLogger.log(error, {action: "createUser"});
        throw error;  // Rethrow for caller
      } else {
        // Unexpected error
        ErrorLogger.log(error, {action: "createUser", critical: true});
        throw new Error("Failed to create user");
      }
    }
  }

  static getUser(userId) {
    try {
      const user = this.users.find(u => u.id === userId);
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }
      return user;
    } catch (error) {
      ErrorLogger.log(error, {action: "getUser", userId});
      throw error;
    }
  }
}

//! 4. Usage
function mainExample() {
  // Try to create users
  const testCases = [
    {email: "valid@example.com", age: 25},      // Valid
    {email: "invalid", age: 25},                // Invalid email
    {email: "another@example.com", age: 16},    // Too young
    {email: "valid@example.com", age: 30}       // Duplicate email
  ];

  for (const testCase of testCases) {
    try {
      const user = UserServiceEx.createUser(testCase.email, testCase.age);
      console.log("User created:", user);
    } catch (error) {
      if (error instanceof ValidationErrorEx) {
        console.log(`❌ Validation failed: ${error.message}`);
      } else {
        console.log(`❌ Error: ${error.message}`);
      }
    }
  }
}

mainExample();


/* ============================================================================
   QUICK REFERENCE
   ============================================================================ */

/* | Concept         | Purpose                              | Example                         |
 * |----------------|--------------------------------------|---------------------------------|
 * | try            | Contains code that might error       | try { risky() }                 |
 * | catch          | Handles the error if it occurs       | catch (e) { handle(e) }         |
 * | finally        | Always runs, for cleanup             | finally { cleanup() }           |
 * | throw          | Creates an error manually            | throw new Error("Oops")         |
 * | Error          | Generic error class                  | new Error("message")            |
 * | Custom Error   | Your own error type                  | class MyError extends Error     |
 */


/* ============================================================================
   KEY TAKEAWAYS
   ============================================================================ */

/* ✓ Try-catch prevents crashes — Your program keeps running
 * ✓ Finally always runs — Use for cleanup (close files, connections)
 * ✓ Throw errors intentionally — Validate input and stop bad operations
 * ✓ Custom errors are specific — Know exactly what went wrong
 * ✓ Error handling is essential — Production code needs it!
 */