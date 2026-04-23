/* ============================================================================
   1.7 STRINGS AND NUMBERS — COMPLETE GUIDE
   ============================================================================ */

/* ============================================================================
   PART 1: STRINGS AND STRING METHODS
   ============================================================================ */

/* What is a String?
 * A string is a sequence of characters (text) enclosed in quotes. 
 * Strings are immutable — once created, they cannot be changed. 
 * Any string operation returns a new string.
 */

//! CREATING STRINGS (all equivalent)
const str1 = "Hello";        // Double quotes
const str2 = 'Hello';        // Single quotes
const str3 = `Hello`;        // Backticks (template literal)

//? STRINGS ARE IMMUTABLE
let text = "JavaScript";
text[0] = "j";              // Does NOT work
console.log(text);          // Still "JavaScript"

/* Key Concept: When you "modify" a string, you're actually creating 
 * a new string and reassigning it.
 */
let name = "rahul";
name = name.toUpperCase();  // Create new string and reassign
console.log(name);          // "RAHUL"


/* ============================================================================
   PART 2: STRING METHODS (Complete Reference)
   ============================================================================ */

// --------------------------------------------
// A. String Length and Character Access
// --------------------------------------------

// TODO: length — Get string length
"Hello".length;             // 5
"".length;                  // 0 (empty string)

// Practical use: Validation
const password = "abc123";
if (password.length < 8) {
  console.log("Password too short");
}

// TODO: charAt(index) — Get character at position
"Hello".charAt(0);          // "H"
"Hello".charAt(1);          // "e"
"Hello".charAt(10);         // "" (empty string if out of bounds)

// Practical: Get first letter
const userName = "Rahul";
const initial = userName.charAt(0); // "R"

// TODO: charCodeAt(index) — Get character code
"A".charCodeAt(0);          // 65 (ASCII code for 'A')
"a".charCodeAt(0);          // 97 (ASCII code for 'a')
"0".charCodeAt(0);          // 48 (ASCII code for '0')

// TODO: [index] — Bracket notation (modern)
const bracketStr = "Hello";
bracketStr[0];              // "H"
bracketStr[4];              // "o"
bracketStr[10];             // undefined (not found)

// --------------------------------------------
// B. String Searching Methods
// --------------------------------------------

// TODO: indexOf(substring) — Find first position
"hello world".indexOf("world");     // 6
"hello world".indexOf("o");         // 4 (first 'o')
"hello world".indexOf("xyz");       // -1 (not found)

// Practical: Check if email contains '@'
const email = "user@example.com";
if (email.indexOf("@") > -1) {
  console.log("Valid email format");
}

// TODO: lastIndexOf(substring) — Find last position
"hello world world".lastIndexOf("world");   // 12 (last occurrence)
"hello world world".lastIndexOf("o");       // 13 (last 'o')

// TODO: includes(substring) — Check if contains (modern)
"hello world".includes("world");    // true
"hello world".includes("xyz");      // false

// Case-sensitive
"Hello".includes("hello");          // false
"Hello".includes("Hello");          // true

// Practical: Filter array
const users = ["alice@gmail.com", "bob@yahoo.com", "charlie@gmail.com"];
const gmailUsers = users.filter(email => email.includes("@gmail.com"));
// ["alice@gmail.com", "charlie@gmail.com"]

// TODO: startsWith(substring) — Check beginning
"hello world".startsWith("hello");  // true
"hello world".startsWith("world");  // false

// Practical: Check file type
const filename = "document.pdf";
if (filename.startsWith("document")) {
  console.log("Valid filename");
}

// TODO: endsWith(substring) — Check ending
"hello world".endsWith("world");    // true
"hello world".endsWith("hello");    // false

// Practical: Check file extension
const imageFile = "image.png";
if (imageFile.endsWith(".png") || imageFile.endsWith(".jpg")) {
  console.log("Valid image");
}

// --------------------------------------------
// C. String Extraction Methods
// --------------------------------------------

// TODO: slice(start, end) — Extract portion (RECOMMENDED)
const sliceStr = "Hello World";

sliceStr.slice(0, 5);            // "Hello" (index 0 to 4)
sliceStr.slice(6);               // "World" (from index 6 to end)
sliceStr.slice(-5);              // "World" (last 5 characters)
sliceStr.slice(-5, -1);          // "Worl" (last 5 chars, excluding last 1)
sliceStr.slice();                // "Hello World" (copy entire string)

// Practical: Get file extension
const docFile = "document.pdf";
const extension = docFile.slice(docFile.lastIndexOf("."));
// ".pdf"

// TODO: substring(start, end) — Extract portion (similar to slice)
const subStr = "Hello World";

subStr.substring(0, 5);        // "Hello"
subStr.substring(6);           // "World"
subStr.substring(-5);          // "Hello World" (ignores negatives!)

/* ⚠️ Difference from slice():
 * "Hello".slice(-3);          // "llo"
 * "Hello".substring(-3);      // "Hello" (treats -3 as 0)
 * 
 * ✅ Recommendation: Use slice() instead
 */

// TODO: substr(start, length) — Extract by length (DEPRECATED - avoid)
const subStrDep = "Hello World";
subStrDep.substr(0, 5);           // "Hello" (start at 0, take 5 chars)
subStrDep.substr(6, 5);           // "World" (start at 6, take 5 chars)

/* ⚠️ Deprecated - avoid in new code. Use slice() instead. */

// --------------------------------------------
// D. String Case Methods
// --------------------------------------------

// TODO: toLowerCase() — Convert to lowercase
"Hello World".toLowerCase();        // "hello world"
"ABC123XYZ".toLowerCase();          // "abc123xyz"

// Practical: Case-insensitive comparison
const userPassword = "MyPassword123";
const input = "mypassword123";
if (userPassword.toLowerCase() === input.toLowerCase()) {
  console.log("Password matches");
}

// TODO: toUpperCase() — Convert to uppercase
"Hello World".toUpperCase();        // "HELLO WORLD"
"abc123xyz".toUpperCase();          // "ABC123XYZ"

// Practical: Format display
const country = "usa";
const display = country.toUpperCase(); // "USA"

// --------------------------------------------
// E. String Whitespace Methods
// --------------------------------------------

// TODO: trim() — Remove whitespace (IMPORTANT)
"  Hello World  ".trim();           // "Hello World"
"\n\tHello\r\n".trim();             // "Hello"
"  ".trim();                        // ""

// Related methods
"  Hello  ".trimStart();            // "Hello  " (left only)
"  Hello  ".trimEnd();              // "  Hello" (right only)

/* ⚠️ CRITICAL: Always trim user input! */
// Practical: Form validation
const userEmail = "  user@example.com  ";
const cleanedEmail = userEmail.trim().toLowerCase();
if (cleanedEmail.includes("@")) {
  // Validate...
}

// --------------------------------------------
// F. String Replacement Methods
// --------------------------------------------

// TODO: replace(old, new) — Replace first match
"hello world world".replace("world", "universe");
// "hello universe world" (only first match)

// With regex for multiple replacements
"hello world world".replace(/world/g, "universe");
// "hello universe universe" (all matches with /g flag)

// Practical: Clean user input
const userInput = "  JavaScript  ";
const cleaned = userInput.trim().replace(/\s+/g, " ");
// Removes extra spaces

// TODO: replaceAll(old, new) — Replace all (modern)
"hello world world".replaceAll("world", "universe");
// "hello universe universe"

// Practical: Safe string replacement
const textReplace = "apple and apple";
const resultReplace = textReplace.replaceAll("apple", "orange");
// "orange and orange"

// --------------------------------------------
// G. String Splitting and Joining
// --------------------------------------------

// TODO: split(separator) — Convert to array (IMPORTANT)
"a,b,c".split(",");                 // ["a", "b", "c"]
"hello world".split(" ");           // ["hello", "world"]
"abc".split("");                    // ["a", "b", "c"]
"hello".split();                    // ["hello"] (no separator)

// Practical: Parse CSV
const csv = "name,age,city";
const headers = csv.split(",");
// ["name", "age", "city"]

// Practical: Get words from sentence
const sentence = "Hello World JavaScript";
const words = sentence.split(" ");
// ["Hello", "World", "JavaScript"]

// Practical: Reverse a string (no reverse() for strings)
const reversed = "hello".split("").reverse().join("");
// "olleh"

// --------------------------------------------
// H. String Repetition and Padding
// --------------------------------------------

// TODO: repeat(count) — Repeat string
"ab".repeat(3);                     // "ababab"
"hello".repeat(2);                  // "hellohello"
"x".repeat(0);                      // ""

// Practical: Create separator
const separator = "-".repeat(20);
console.log(separator);             // "--------------------"

// Practical: Indent text
const indent = " ".repeat(4);
console.log(indent + "Code");       // "    Code"

// TODO: padStart(length, char) — Pad at beginning
"5".padStart(3, "0");               // "005"
"42".padStart(4, "0");              // "0042"
"hello".padStart(10, "*");          // "*****hello"

// Practical: Format numbers
const day = String(5).padStart(2, "0");      // "05"
// const time = `${hours}:${minutes.padStart(2, "0")}`;
// "14:05" instead of "14:5"

// TODO: padEnd(length, char) — Pad at end
"5".padEnd(3, "0");                 // "500"
"hello".padEnd(10, "..");           // "hello....."

// Practical: Create columns
const nameCol = "Alice".padEnd(15, " ");
const ageCol = "25".padEnd(5, " ");
console.log(nameCol + ageCol);            // Aligned columns

// --------------------------------------------
// I. String Conversion Methods
// --------------------------------------------

// TODO: match() — Find pattern (regex)
"hello123world456".match(/\d+/g);
// ["123", "456"] (find all numbers)

"The quick brown fox".match(/quick/);
// ["quick"] (find first match)

// Practical: Extract email from text
const contactText = "Contact: user@example.com";
const emailMatch = contactText.match(/\S+@\S+\.\S+/);
// ["user@example.com"]

// TODO: search() — Find index of pattern (regex)
"hello world".search("world");      // 6
"hello world".search(/world/);      // 6 (same as indexOf for non-regex)

// Practical: Check if contains number
if ("password123".search(/\d/) > -1) {
  console.log("Contains digit");
}

// TODO: toString() — Convert to string
const numToString = 123;
numToString.toString();             // "123"

const boolToString = true;
boolToString.toString();            // "true"

// Convert to different base
const decimalNum = 255;
decimalNum.toString(2);             // "11111111" (binary)
decimalNum.toString(16);            // "ff" (hexadecimal)


/* ============================================================================
   PART 3: TEMPLATE LITERALS
   ============================================================================ */

/* What are Template Literals?
 * Template literals are strings enclosed in backticks (`) that allow:
 * - Variable interpolation using ${}
 * - Multiline strings without escape characters
 * - Cleaner syntax than concatenation
 */

//! OLD WAY (concatenation) - ✗ Verbose
const oldName = "Rahul";
const oldAge = 25;
const oldGreeting = "Hello, " + oldName + "! You are " + oldAge + " years old.";

//! NEW WAY (template literal) - ✓ Clean
const newGreeting = `Hello, ${oldName}! You are ${oldAge} years old.`;

//? VARIABLE INTERPOLATION
const tplName = "Rahul";
const tplAge = 25;

// Basic interpolation
`Name: ${tplName}`;                    // "Name: Rahul"

// Expressions inside ${}
`Next year you'll be ${tplAge + 1}`;   // "Next year you'll be 26"

// Function calls
`Uppercase: ${tplName.toUpperCase()}`;  // "Uppercase: RAHUL"

// Conditional expressions
`Status: ${tplAge >= 18 ? "Adult" : "Minor"}`;  // "Status: Adult"

// Nested template literals
const userInfo = `User: ${tplName}${tplAge > 20 ? " (Senior)" : " (Junior)"}`;

//* MULTILINE STRINGS
// Old way - ✗ Escape characters
const oldHtml = "<div>\n  <p>Hello</p>\n</div>";

// New way - ✓ Native multiline
const newHtml = `
  <div>
    <p>Hello</p>
  </div>
`;

// Practical: HTML templates
const userCard = `
  <div class="card">
    <h2>${tplName}</h2>
    <p>Age: ${tplAge}</p>
    <p>Email: ${email}</p>
  </div>
`;

// TODO: Tagged Templates (Advanced)
// Function receives template and values
function highlight(strings, ...values) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += `<mark>${values[i]}</mark>`;
    }
  }
  return result;
}

const highlightName = "Rahul";
const highlighted = highlight`Hello ${highlightName}!`;
// "Hello <mark>Rahul</mark>!"


/* ============================================================================
   PART 4: NUMBER METHODS
   ============================================================================ */

/* What are Numbers?
 * JavaScript has only one number type: Number (includes integers and decimals). 
 * Numbers can be manipulated with methods for rounding, parsing, and formatting.
 */

//! DIFFERENT NUMBER FORMATS
const intNum = 42;
const floatNum = 3.14;
const exponentialNum = 1.23e5;         // 123000
const negativeNum = -42;

// --------------------------------------------
// Number Creation and Conversion
// --------------------------------------------

// TODO: Number() — Convert to number
Number("123");                      // 123
Number("3.14");                     // 3.14
Number("hello");                    // NaN
Number(true);                       // 1
Number(false);                      // 0
Number(null);                       // 0
Number(undefined);                  // NaN

// TODO: parseInt(string, radix) — Parse integer
parseInt("123");                    // 123
parseInt("123.45");                 // 123 (ignores decimal)
parseInt("42px");                   // 42 (stops at first non-digit)
parseInt("hello");                  // NaN

// With radix (base)
parseInt("1010", 2);                // 10 (binary to decimal)
parseInt("FF", 16);                 // 255 (hex to decimal)

// Practical: Extract number from string
const sizePx = "500px";
const pixels = parseInt(sizePx);      // 500

// TODO: parseFloat(string) — Parse decimal
parseFloat("3.14");                 // 3.14
parseFloat("3.14abc");              // 3.14 (stops at first non-number)
parseFloat("hello");                // NaN

// Practical: Extract decimal from string
const priceStr = "$19.99";
const amount = parseFloat(priceStr.replace("$", ""));  // 19.99

// --------------------------------------------
// Number Formatting Methods
// --------------------------------------------

// TODO: toFixed(decimals) — Round to decimals (returns STRING)
const numPi = 3.14159;

numPi.toFixed(0);                     // "3"
numPi.toFixed(2);                     // "3.14"
numPi.toFixed(4);                     // "3.1416"
numPi.toFixed(10);                    // "3.1415900000"

/* ⚠️ Returns string, not number! */
const fixedResult = (19.99).toFixed(2);  // "19.99"
typeof fixedResult;                      // "string"

// Convert back to number
const fixedNum = parseFloat((3.14159).toFixed(2));  // 3.14

// Practical: Display prices
const priceAmount = 19.99 * 3;            // 59.970000000000006
console.log(`$${priceAmount.toFixed(2)}`);  // "$59.97"

// TODO: toPrecision(digits) — Total significant digits
const numPrecise = 123.456;

numPrecise.toPrecision(1);                 // "1e+2" (scientific notation)
numPrecise.toPrecision(4);                 // "123.5"
numPrecise.toPrecision(6);                 // "123.456"
numPrecise.toPrecision(10);                // "123.4560000"

// Practical: Round to significant figures
const smallValue = 0.00123;
smallValue.toPrecision(2);               // "0.0012"

// TODO: toExponential(decimals) — Scientific notation
const numExp = 1234.567;

numExp.toExponential();                // "1.234567e+3"
numExp.toExponential(2);               // "1.23e+3"
numExp.toExponential(0);               // "1e+3"

// Practical: Display very large numbers
const distanceSun = 1.496e11;          // Distance to sun in km
distanceSun.toExponential(2);          // "1.50e+11"

// TODO: toString(radix) — Convert to string in different bases
const numColor = 255;

numColor.toString();                     // "255"
numColor.toString(2);                    // "11111111" (binary)
numColor.toString(16);                   // "ff" (hexadecimal)
numColor.toString(8);                    // "377" (octal)

// Practical: Display color codes
const red = 255;
const green = 128;
const blue = 64;
const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
// "#ff8040"

// --------------------------------------------
// Number Validation Methods
// --------------------------------------------

// TODO: Number.isNaN() — Check for NaN (RECOMMENDED)
Number.isNaN(NaN);                  // true
Number.isNaN(0);                    // false
Number.isNaN("hello");              // false (✓ correct!)

/* ⚠️ Old way (problematic)
 * isNaN(NaN);                         // true
 * isNaN("hello");                     // true (treats string as NaN!)
 * isNaN("123");                       // false (treats as number)
 * 
 * ✅ Always use Number.isNaN()
 */

// TODO: Number.isFinite() — Check if valid number
Number.isFinite(100);               // true
Number.isFinite(0);                 // true
Number.isFinite(NaN);               // false
Number.isFinite(Infinity);          // false
Number.isFinite(-Infinity);         // false

// Practical: Validate calculation results
const calcResult = 10 / 0;              // Infinity
if (Number.isFinite(calcResult)) {
  console.log("Valid number");
} else {
  console.log("Invalid calculation");
}

// TODO: Number.isInteger() — Check if whole number
Number.isInteger(42);               // true
Number.isInteger(42.0);             // true
Number.isInteger(42.5);             // false
Number.isInteger(NaN);              // false

// Practical: Validate user input
const userAgeNum = parseInt(input);
if (Number.isInteger(userAgeNum) && userAgeNum > 0) {
  console.log("Valid age");
}

// TODO: Number.isSafeInteger() — Check if safe integer
/* Safe integers: -(2^53 - 1) to (2^53 - 1) */
Number.isSafeInteger(100);          // true
Number.isSafeInteger(9007199254740991);  // true (max safe)
Number.isSafeInteger(9007199254740992);  // false (too large)

// --------------------------------------------
// Number Constants
// --------------------------------------------

console.log(Number.MAX_VALUE);                   // 1.7976931348623157e+308
console.log(Number.MIN_VALUE);                   // 5e-324
console.log(Number.MAX_SAFE_INTEGER);            // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);            // -9007199254740991
console.log(Number.POSITIVE_INFINITY);           // Infinity
console.log(Number.NEGATIVE_INFINITY);           // -Infinity
console.log(Number.NaN);                         // NaN


/* ============================================================================
   PART 5: MATH OBJECT
   ============================================================================ */

/* What is the Math Object?
 * The Math object provides mathematical constants and functions. 
 * All Math methods are static (use Math.method(), not instance methods).
 */

//! Math is NOT a constructor
// new Math();                         // ❌ TypeError

// Always use Math.methodName()
Math.round(4.5);                    // ✓ Correct

// --------------------------------------------
// Math Constants
// --------------------------------------------

Math.PI;                            // 3.141592653589793
Math.E;                             // 2.718281828459045 (Euler's number)
Math.LN2;                           // 0.6931471805599453
Math.LN10;                          // 2.302585092994046
Math.LOG2E;                         // 1.4426950408889634
Math.LOG10E;                        // 0.4342944819032518
Math.SQRT1_2;                       // 0.7071067811865476
Math.SQRT2;                         // 1.4142135623730951

// Practical: Calculate circle area
const radius = 5;
const area = Math.PI * radius * radius;  // 78.5

// --------------------------------------------
// Math Rounding Methods
// --------------------------------------------

// TODO: Math.round(n) — Round to nearest integer
Math.round(4.4);                    // 4
Math.round(4.5);                    // 5 (rounds up)
Math.round(4.6);                    // 5
Math.round(-4.5);                   // -4 (rounds towards positive)

// TODO: Math.floor(n) — Round DOWN
Math.floor(4.9);                    // 4
Math.floor(4.1);                    // 4
Math.floor(-4.1);                   // -5 (rounds down = more negative)

// TODO: Math.ceil(n) — Round UP
Math.ceil(4.1);                     // 5
Math.ceil(4.9);                     // 5
Math.ceil(-4.9);                    // -4 (rounds up = less negative)

// TODO: Math.trunc(n) — Remove decimal (truncate)
Math.trunc(4.9);                    // 4
Math.trunc(-4.9);                   // -4 (removes decimal, keeps sign)
Math.trunc(4.1);                    // 4

// TODO: Math.abs(n) — Absolute value
Math.abs(-5);                       // 5
Math.abs(5);                        // 5
Math.abs(-3.14);                    // 3.14

// --------------------------------------------
// Math Power and Root Methods
// --------------------------------------------

// TODO: Math.pow(base, exponent) — Power
Math.pow(2, 3);                     // 8 (2^3)
Math.pow(5, 2);                     // 25 (5^2 = square)
Math.pow(16, 0.5);                  // 4 (16^0.5 = square root)
Math.pow(27, 1/3);                  // 3 (cube root)

// Modern alternative: **
2 ** 3;                             // 8 (same as Math.pow(2, 3))

// TODO: Math.sqrt(n) — Square root
Math.sqrt(16);                      // 4
Math.sqrt(2);                       // 1.4142135623730951
Math.sqrt(0);                       // 0
Math.sqrt(-1);                      // NaN

// TODO: Math.cbrt(n) — Cube root
Math.cbrt(27);                      // 3
Math.cbrt(8);                       // 2
Math.cbrt(-8);                      // -2

// --------------------------------------------
// Math Comparison Methods
// --------------------------------------------

// TODO: Math.min(...numbers) — Find minimum
Math.min(5, 2, 9, 1);               // 1
Math.min(5, 2, -9);                 // -9

// With spread operator for array
const minNumbers = [5, 2, 9, 1];
Math.min(...minNumbers);               // 1

// TODO: Math.max(...numbers) — Find maximum
Math.max(5, 2, 9, 1);               // 9
Math.max(-5, -2, -9);               // -2

// With spread operator
const maxNumbers = [5, 2, 9, 1];
Math.max(...maxNumbers);               // 9

// TODO: Math.sign(n) — Get sign of number
Math.sign(5);                       // 1 (positive)
Math.sign(-5);                      // -1 (negative)
Math.sign(0);                       // 0 (zero)
Math.sign(-0);                      // -0 (negative zero)

// Practical: Direction indicator
const velocity = -5;
const direction = Math.sign(velocity);  // -1 (moving backwards)

// --------------------------------------------
// Math Random
// --------------------------------------------

// TODO: Math.random() — Random number 0-1
Math.random();                      // 0.123456... (random each time)

// Random integer between 0 and 9
Math.floor(Math.random() * 10);     // 0-9

// Random integer between min and max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomInt(1, 10);                   // 1-10

// Shuffle array (Fisher-Yates algorithm)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
  }
  return arr;
}

// Practical: Dice roll
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;  // 1-6
}

/* ⚠️ Security Note: Math.random() is NOT cryptographically secure!
 * For security-sensitive operations, use:
 * crypto.getRandomValues(new Uint8Array(1));
 */

// --------------------------------------------
// Math Trigonometry Methods
// --------------------------------------------

/* Angles in RADIANS (not degrees!) */
Math.sin(Math.PI / 2);              // 1
Math.cos(0);                        // 1
Math.tan(Math.PI / 4);              // 1

// Convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Practical: Calculate distance
const xCoord = 3, yCoord = 4;
const distance = Math.sqrt(xCoord * xCoord + yCoord * yCoord);  // 5


/* ============================================================================
   PART 6: DATE OBJECT
   ============================================================================ */

/* What is the Date Object?
 * The Date object represents a specific point in time. Dates are stored as 
 * milliseconds since January 1, 1970, 00:00:00 UTC (Unix epoch).
 */

//! CREATING DATES
const now = new Date();             // Current date/time
const specific = new Date("2025-04-18");  // ISO format (safest)
const msDate = new Date(1705420800000); // Milliseconds since epoch
const dated = new Date(2025, 3, 18);  // Year, Month(0-11), Day

/* ⚠️ CRITICAL: Month is 0-indexed! */
new Date(2025, 0, 15);              // January 15 (month 0)
new Date(2025, 3, 18);              // April 18 (month 3)
new Date(2025, 11, 25);             // December 25 (month 11)

//? CREATING DATES - VARIOUS FORMS
// 1. new Date() — Current date/time
const currentDate = new Date();
console.log(currentDate);  // e.g., 2025-04-18T10:30:45.123Z

// 2. new Date(year, month, day, hour, minute, second, millisecond)
new Date(2025, 3, 18);              // April 18, 2025, 00:00:00
new Date(2025, 3, 18, 14, 30, 0);   // 2:30 PM
new Date(2025, 3, 18, 14, 30, 0, 500);  // 2:30:00.500

// 3. new Date(milliseconds) — From unix timestamp
const epoch = new Date(0);          // January 1, 1970
const currentMs = Date.now();       // Current time in milliseconds
const dateFromMs = new Date(currentMs); // Convert to Date object

// 4. new Date(dateString) — From string (ISO format recommended)
new Date("2025-04-18");             // April 18, 2025 (UTC)
new Date("2025-04-18T14:30:00");    // With time
new Date("2025-04-18T14:30:00Z");   // UTC (Z = Zulu)

/* ⚠️ Avoid ambiguous formats!
 * new Date("04/18/2025");             // May parse differently per browser
 */

// --------------------------------------------
// Getting Date Components
// --------------------------------------------

// TODO: Getting individual parts
const dateObj = new Date("2025-04-18T14:30:45");

// Date components
dateObj.getFullYear();                    // 2025
dateObj.getMonth();                       // 3 (April, 0-indexed!)
dateObj.getDate();                        // 18 (day of month)
dateObj.getDay();                         // 5 (day of week: 0=Sunday, 6=Saturday)

// Time components
dateObj.getHours();                       // 14
dateObj.getMinutes();                     // 30
dateObj.getSeconds();                     // 45
dateObj.getMilliseconds();                // 0

// Milliseconds since epoch
dateObj.getTime();                        // 1745008245000

// TODO: Getting ISO string
const isoDate = new Date("2025-04-18T14:30:45");
isoDate.toISOString();                    // "2025-04-18T14:30:45.000Z"

// ✓ Best for storing/transmitting dates

// TODO: Formatting for display
const displayDate = new Date("2025-04-18");

// Locale-specific formatting
displayDate.toLocaleDateString();             // "4/18/2025" (US format)
displayDate.toLocaleTimeString();             // "12:00:00 AM"
displayDate.toLocaleString();                 // "4/18/2025, 12:00:00 AM"

// Custom formatting (use libraries for production)
const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
displayDate.toLocaleDateString('en-US', dateOptions);  // "April 18, 2025"

// --------------------------------------------
// Setting Date Components
// --------------------------------------------

// TODO: Modifying dates
const modifyDate = new Date("2025-04-18");

modifyDate.setFullYear(2026);
modifyDate.setMonth(5);                      // June (0-indexed)
modifyDate.setDate(25);
modifyDate.setHours(14);
modifyDate.setMinutes(30);
modifyDate.setSeconds(0);

console.log(modifyDate);                     // June 25, 2026, 14:30:00

// --------------------------------------------
// Date Arithmetic
// --------------------------------------------

// TODO: Calculating time differences
const d1 = new Date("2025-01-01");
const d2 = new Date("2025-01-08");

// Difference in milliseconds
const diffMsCalc = d2 - d1;             // 604800000

// Convert to other units
const diffDaysCalc = diffMsCalc / (1000 * 60 * 60 * 24);    // 7 days
const diffHoursCalc = diffMsCalc / (1000 * 60 * 60);        // 168 hours

// Practical: Age calculation
function getAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// TODO: Adding days
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const todayDate = new Date();
const nextWeek = addDays(todayDate, 7);

// --------------------------------------------
// Common Date Issues
// --------------------------------------------

/* ⚠️ Problem 1: Month is 0-indexed */
// ❌ Wrong
// new Date(2025, 4, 18);              // May 18 (not April!)

// ✓ Correct
new Date(2025, 3, 18);              // April 18
// Or use ISO string
new Date("2025-04-18");             // April 18

/* ⚠️ Problem 2: Timezone confusion */
// Dates are always stored in UTC internally
const tzDate = new Date("2025-04-18");

// These show LOCAL time
tzDate.getHours();                       // Your timezone
tzDate.toLocaleString();                 // Your timezone

// This shows UTC
tzDate.toISOString();                    // UTC (Z = Zulu)

/* ⚠️ Problem 3: Parsing ambiguous formats */
// ❌ Risky (browser-dependent)
// new Date("04/18/2025");             // May parse as May 18

// ✓ Safe (ISO format)
new Date("2025-04-18");             // Consistent across browsers


/* ============================================================================
   PART 7: FLOATING-POINT PRECISION ISSUES
   ============================================================================ */

//! THE PROBLEM
console.log(0.1 + 0.2);                          // 0.30000000000000004 (NOT 0.3!)
console.log(0.1 + 0.2 === 0.3);                  // false ❌

/* Why This Happens
 * Computers store decimals in binary format, and some decimals (like 0.1) 
 * cannot be represented exactly.
 */

//? SOLUTIONS

// 1. Round for comparison
const a = 0.1 + 0.2;
const b = 0.3;

// Round to same decimals before comparing
Math.round(a * 100) / 100 === Math.round(b * 100) / 100;  // true ✓

// 2. Use toFixed() for display
const totalFloat = 0.1 + 0.2;
console.log(totalFloat.toFixed(2));      // "0.30" ✓

// 3. Work with integers
// Work in cents, not dollars
const price1cents = 10;  // 10 cents
const price2cents = 20;  // 20 cents
const totalCents = price1cents + price2cents;      // 30 cents
const dollarsTotal = totalCents / 100;        // 0.30 dollars ✓

// 4. Use a decimal library (production code)
// npm install decimal.js
// const Decimal = require('decimal.js');
// const decimalA = new Decimal(0.1);
// const decimalB = new Decimal(0.2);
// const decimalC = decimalA.plus(decimalB);                // 0.3 ✓


/* ============================================================================
   PRODUCTION CHECKLIST
   ============================================================================ */

/* Strings
 * ✅ Always trim user input: input.trim()
 * ✅ Use template literals: `Hello ${name}`
 * ✅ Use toLowerCase() for case-insensitive comparison
 * ✅ Use includes() instead of indexOf() for checking
 * ✅ Use slice() instead of substring()
 * ✅ Escape special characters in user-generated HTML
 */

/* Numbers
 * ✅ Use Number.isNaN() not isNaN()
 * ✅ Use toFixed() for displaying prices
 * ✅ Use parseInt() and parseFloat() for parsing strings
 * ✅ Be aware of floating-point precision issues
 * ✅ Validate numbers with Number.isFinite()
 */

/* Math
 * ✅ Remember angles are in RADIANS, not degrees
 * ✅ Use Math.floor() for integer division
 * ✅ Use secure random for cryptography: crypto.getRandomValues()
 */

/* Dates
 * ✅ Always use ISO format: new Date("2025-04-18")
 * ✅ Remember: Month is 0-indexed (0 = January)
 * ✅ Store dates as ISO strings on the server
 * ✅ Use libraries for complex date operations (date-fns, Day.js)
 * ✅ Be aware of timezone issues
 */


/* ============================================================================
   EXAMPLE: PRACTICAL APPLICATION
   ============================================================================ */

//! Email validation
function isValidEmail(emailInput) {
  // Trim and lowercase
  const cleaned = emailInput.trim().toLowerCase();
  
  // Check format
  if (!cleaned.includes("@")) return false;
  
  const [localPart, domain] = cleaned.split("@");
  
  if (localPart.length === 0 || !domain.includes(".")) {
    return false;
  }
  
  return true;
}

//! Product pricing
function calculateTotal(prices) {
  // Work in cents to avoid floating-point issues
  const totalCents = prices
    .map(p => Math.round(p * 100))
    .reduce((a, b) => a + b, 0);
  
  // Convert back to dollars
  return (totalCents / 100).toFixed(2);
}

//! Age calculator
function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

//? Usage
console.log(isValidEmail("  User@EXAMPLE.COM  "));     // true
console.log(calculateTotal([19.99, 29.99, 9.99]));    // "59.97"
console.log(calculateAge("1998-06-15"));               // Current age


/* ============================================================================
   QUICK REFERENCE TABLE
   ============================================================================ */

/* | Category           | Method              | Example                          |
 * |--------------------|---------------------|----------------------------------|
 * | String Search      | includes()          | str.includes("hello")            |
 * | String Extract     | slice()             | str.slice(0, 5)                  |
 * | String Case        | toLowerCase()       | str.toLowerCase()                |
 * | String Trim        | trim()              | str.trim()                       |
 * | String Replace     | replaceAll()        | str.replaceAll("a", "b")         |
 * | String Split       | split()             | str.split(",")                   |
 * | String Repeat      | repeat()            | "ab".repeat(3)                   |
 * | Number Parse       | parseInt()          | parseInt("123")                  |
 * | Number Format      | toFixed()           | num.toFixed(2)                   |
 * | Number Validate    | Number.isNaN()      | Number.isNaN(value)              |
 * | Math Round         | Math.floor()        | Math.floor(4.7)                  |
 * | Math Random        | Math.random()       | Math.random()                    |
 * | Math Min/Max       | Math.min()          | Math.min(1, 2, 3)                |
 * | Date Create        | new Date()          | new Date("2025-04-18")           |
 * | Date Get           | getFullYear()       | date.getFullYear()               |
 * | Template Literal   | `${var}`            | `Hello ${name}`                  |
 */