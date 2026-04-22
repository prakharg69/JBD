// 1.6 Arrays and Objects — Complete Guide

/* ============================================================================
   PART 1: ARRAYS BASICS
   ============================================================================ */

/* What is an Array?
 * An array is an ordered collection of elements stored in a single variable. 
 * Arrays can contain any data type (numbers, strings, objects, other arrays).
 */

//! CREATE ARRAYS
const arr1 = [1, 2, 3, 4, 5];
const arr2 = ["apple", "banana", "cherry"];
const arr3 = [1, "hello", true, {name: "Rahul"}, [1, 2]]; // Mixed types
const arr4 = new Array(3); // Empty array with 3 slots

//? ACCESS ELEMENTS (0-based indexing)
arr1[0]; // 1 (first element)
arr1[2]; // 3 (third element)
arr1[arr1.length - 1]; // 5 (last element)

//* ARRAYS ARE MUTABLE (changeable)
arr1[0] = 10; // Changes first element to 10
arr1[arr1.length] = 6; // Add element at end

/* Key Properties:
 * - Length: arr.length — number of elements
 * - Index: 0-based (first element is at index 0)
 * - Mutable: Can add, remove, or change elements
 * - Reference type: Stored as reference, not value
 */


/* ============================================================================
   PART 2: ARRAY METHODS (Comprehensive)
   ============================================================================ */

// --------------------------------------------
// A. Mutating Methods (Change Original Array)
// --------------------------------------------

// TODO: push() — Add to end
const arr = [1, 2, 3];
arr.push(4); // Returns 4 (new length)
arr.push(5, 6); // Add multiple
console.log(arr); // [1, 2, 3, 4, 5, 6]

// TODO: pop() — Remove from end
const arrPop = [1, 2, 3];
const removed = arrPop.pop(); // Returns 3
console.log(arrPop); // [1, 2]

// TODO: shift() — Remove from start
const arrShift = [1, 2, 3];
const removedShift = arrShift.shift(); // Returns 1
console.log(arrShift); // [2, 3]
// ┌──────────────────────────────────────────────────────────────────────────────┐
// │                           PARAMETER PATTERNS                                  │
// ├──────────────┬─────────────┬──────────────┬─────────────────────────────────┤
// │   PATTERN    │   START     │ DELETE COUNT │     ITEMS TO ADD                 │
// ├──────────────┼─────────────┼──────────────┼─────────────────────────────────┤
// │ Remove only  │     ✓       │      ✓       │      ✗ (omit)                    │
// ├──────────────┼─────────────┼──────────────┼─────────────────────────────────┤
// │ Add only     │     ✓       │      0       │      ✓ (one or more)             │
// ├──────────────┼─────────────┼──────────────┼─────────────────────────────────┤
// │ Replace      │     ✓       │      ✓       │      ✓ (same count)              │
// ├──────────────┼─────────────┼──────────────┼─────────────────────────────────┤
// │ Replace+Add  │     ✓       │      ✓       │      ✓ (different count)         │
// ├──────────────┼─────────────┼──────────────┼─────────────────────────────────┤
// │ Remove to    │     ✓       │   (omit)     │      ✗                           │
// │ end          │             │              │                                 │
// └──────────────┴─────────────┴──────────────┴─────────────────────────────────┘

// TODO: unshift() — Add to start
const arrUnshift = [2, 3];
arrUnshift.unshift(1); // Returns 3 (new length)
arrUnshift.unshift(-1, 0);
console.log(arrUnshift); // [-1, 0, 1, 2, 3]

// TODO: splice() — Add/remove anywhere
const arrSplice = [1, 2, 3, 4, 5];
arrSplice.splice(2, 1); // Remove 1 element at index 2
console.log(arrSplice); // [1, 2, 4, 5]

arrSplice.splice(2, 0, 3); // Insert 3 at index 2, remove 0 elements
console.log(arrSplice); // [1, 2, 3, 4, 5]

arrSplice.splice(1, 2, 20, 30); // Replace 2 elements with 20, 30
console.log(arrSplice); // [1, 20, 30, 4, 5]

// TODO: reverse() — Reverse order
const arrReverse = [1, 2, 3];
arrReverse.reverse();
console.log(arrReverse); // [3, 2, 1]

// TODO: sort() — Sort elements
const arrSort = [3, 1, 4, 1, 5];
arrSort.sort(); // [1, 1, 3, 4, 5] (default: alphabetical)

// Numeric sort
arrSort.sort((a, b) => a - b); // Ascending
arrSort.sort((a, b) => b - a); // Descending

// String sort
["zebra", "apple", "mango"].sort(); // ["apple", "mango", "zebra"]

// Sort objects
const users = [{name: "Rahul", age: 25}, {name: "Priya", age: 23}];
users.sort((a, b) => a.age - b.age); // Sort by age

// TODO: fill() — Fill with value
const arrFill = [1, 2, 3, 4, 5];
arrFill.fill(0); // [0, 0, 0, 0, 0]
arrFill.fill(9, 2, 4); // Fill 9 from index 2 to 4: [0, 0, 9, 9, 0]


// --------------------------------------------
// B. Non-Mutating Methods (Return New Array)
// --------------------------------------------

// !!! map() — Transform each element
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] (original unchanged)

// With objects
const userObjects = [{name: "Rahul", age: 25}, {name: "Priya", age: 23}];
const names = userObjects.map(user => user.name);
console.log(names); // ["Rahul", "Priya"]

/* ⚠️ Production Tip: Use map() to transform data, not for side effects. */

// !!! filter() — Keep matching elements
const filterNumbers = [1, 2, 3, 4, 5, 6];
const evens = filterNumbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4, 6]

// Filter objects
const filterUsers = [
  {name: "Rahul", age: 25},
  {name: "Priya", age: 23},
  {name: "Arjun", age: 27}
];
const adults = filterUsers.filter(user => user.age >= 25);
// [{name: "Rahul", age: 25}, {name: "Arjun", age: 27}]

// !!! reduce() — Combine into single value
// Sum all numbers
const reduceNumbers = [1, 2, 3, 4];
const sum = reduceNumbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

// Build object from array
const reduceArr = ["a", "b", "c"];
const result = reduceArr.reduce((acc, curr, index) => {
  acc[curr] = index;
  return acc;
}, {});
console.log(result); // {a: 0, b: 1, c: 2}

// Count occurrences
const items = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const count = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
console.log(count); // {apple: 3, banana: 2, cherry: 1}

// Flatten nested array
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5]

/* ⚠️ Production Tip: reduce() is powerful but can be hard to read. 
 * Use it for data transformation only.
 */

// !!! forEach() — Loop through each element
const forEachArr = [1, 2, 3];
forEachArr.forEach((element, index, array) => {
  console.log(`${index}: ${element}`);
});
// 0: 1
// 1: 2
// 2: 3

// With objects
const forEachUsers = [{name: "Rahul"}, {name: "Priya"}];
forEachUsers.forEach(user => {
  console.log(user.name);
});

// !!! find() — Get first matching element
const findNumbers = [1, 2, 3, 4, 5];
const found = findNumbers.find(x => x > 3);
console.log(found); // 4 (first element > 3)

const findUsers = [{id: 1, name: "Rahul"}, {id: 2, name: "Priya"}];
const user = findUsers.find(u => u.id === 2);
console.log(user); // {id: 2, name: "Priya"}

// !!! findIndex() — Get index of first match
const findIndexArr = [1, 2, 3, 4, 5];
const index = findIndexArr.findIndex(x => x > 3);
console.log(index); // 3 (index of 4)

const notFound = findIndexArr.findIndex(x => x > 10);
console.log(notFound); // -1 (not found)

// !!! includes() — Check if contains element
const includesArr = [1, 2, 3, 4, 5];
includesArr.includes(3); // true
includesArr.includes(10); // false

const includesStrings = ["apple", "banana", "cherry"];
includesStrings.includes("banana"); // true

// With objects (checks reference, not deep equality)
const includesUsers = [{name: "Rahul"}];
includesUsers.includes({name: "Rahul"}); // false (different reference)

// !!! indexOf() & lastIndexOf() — Find position
const indexOfArr = [1, 2, 3, 2, 1];
indexOfArr.indexOf(2); // 1 (first occurrence)
indexOfArr.lastIndexOf(2); // 3 (last occurrence)
indexOfArr.indexOf(10); // -1 (not found)

const indexOfStrings = ["a", "b", "c", "b"];
indexOfStrings.indexOf("b"); // 1
indexOfStrings.lastIndexOf("b"); // 3

// !!! slice() — Extract portion
const sliceArr = [1, 2, 3, 4, 5];
sliceArr.slice(1, 3); // [2, 3] (index 1 to 2)
sliceArr.slice(2); // [3, 4, 5] (from index 2 to end)
sliceArr.slice(-2); // [4, 5] (last 2 elements)
sliceArr.slice(); // [1, 2, 3, 4, 5] (copy)

// Does NOT mutate original
console.log(sliceArr); // [1, 2, 3, 4, 5]

// !!! concat() — Combine arrays
const arrConcat1 = [1, 2];
const arrConcat2 = [3, 4];
const combined = arrConcat1.concat(arrConcat2);
console.log(combined); // [1, 2, 3, 4]

// Combine multiple
[1].concat([2], [3], 4); // [1, 2, 3, 4]

// Original unchanged
console.log(arrConcat1); // [1, 2]

// !!! join() — Convert to string
const joinArr = [1, 2, 3, 4];
joinArr.join(); // "1,2,3,4" (default separator: comma)
joinArr.join("-"); // "1-2-3-4"
joinArr.join(""); // "1234"
joinArr.join(" "); // "1 2 3 4"

// Common use case: URL slug
const words = ["hello", "world"];
const slug = words.join("-"); // "hello-world"

// !!! flat() & flatMap() — Flatten arrays
// Flatten nested arrays
const flatNested = [1, [2, 3], [4, [5, 6]]];
flatNested.flat(); // [1, 2, 3, 4, [5, 6]] (depth 1)
flatNested.flat(2); // [1, 2, 3, 4, 5, 6] (depth 2)
flatNested.flat(Infinity); // [1, 2, 3, 4, 5, 6] (complete)

// flatMap = map then flat
const flatMapArr = [1, 2, 3];
flatMapArr.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// Practical: Flatten array of arrays
const flatData = [[1, 2], [3, 4], [5]];
flatData.flat(); // [1, 2, 3, 4, 5]

// !!! some() & every() — Check conditions
const someArr = [1, 2, 3, 4, 5];

// some: At least one element matches
someArr.some(x => x > 4); // true
someArr.some(x => x > 10); // false

// every: All elements match
someArr.every(x => x > 0); // true
someArr.every(x => x > 3); // false

// Practical: Form validation
const fields = [{value: "abc"}, {value: ""}, {value: "xyz"}];
const allFilled = fields.every(f => f.value !== "");
// false (one field is empty)

// !!! at() — Access by negative index
const atArr = [1, 2, 3, 4, 5];
atArr.at(-1); // 5 (last element)
atArr.at(-2); // 4 (second last)
atArr.at(0); // 1 (first)

// Practical: Modern way to get last element
atArr.at(-1) === atArr[atArr.length - 1]; // true


/* ============================================================================
   PART 3: OBJECTS BASICS
   ============================================================================ */

/* What is an Object?
 * An object is a collection of key-value pairs (properties). 
 * Keys are strings (or Symbols), values can be any type.
 */

//! CREATE OBJECTS
const obj1 = {
  name: "Rahul",
  age: 25,
  city: "Delhi"
};

const obj2 = new Object();
obj2.name = "Priya";

//? ACCESS PROPERTIES
obj1.name; // "Rahul" (dot notation)
obj1["age"]; // 25 (bracket notation)

//* ADD/MODIFY PROPERTIES
obj1.country = "India"; // Add new property
obj1.age = 26; // Modify existing

//! DELETE PROPERTY
delete obj1.city; // Removes city property


/* ============================================================================
   PART 4: OBJECT METHODS AND PROPERTIES
   ============================================================================ */

// --------------------------------------------
// Object Static Methods
// --------------------------------------------

// TODO: Object.keys() — Get all keys
const keysObj = {name: "Rahul", age: 25, city: "Delhi"};
Object.keys(keysObj); // ["name", "age", "city"]

// Practical: Loop through keys
Object.keys(keysObj).forEach(key => {
  console.log(`${key}: ${keysObj[key]}`);
});

// TODO: Object.values() — Get all values
const valuesObj = {name: "Rahul", age: 25, city: "Delhi"};
Object.values(valuesObj); // ["Rahul", 25, "Delhi"]

// Sum all numbers
const scores = {math: 85, english: 90, science: 88};
const total = Object.values(scores).reduce((a, b) => a + b, 0);
console.log(total); // 263

// TODO: Object.entries() — Get key-value pairs
const entriesObj = {name: "Rahul", age: 25};
Object.entries(entriesObj); // [["name", "Rahul"], ["age", 25]]

// Practical: Convert to Map
const map = new Map(Object.entries(entriesObj));

// Loop with destructuring
Object.entries(entriesObj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// TODO: Object.assign() — Merge objects
const assignObj1 = {name: "Rahul", age: 25};
const assignObj2 = {age: 26, city: "Delhi"};
const mergedAssign = Object.assign({}, assignObj1, assignObj2);
// {name: "Rahul", age: 26, city: "Delhi"}

// Shallow copy
const copy = Object.assign({}, assignObj1);

// Later properties overwrite earlier ones
const resultAssign = Object.assign({}, assignObj1, assignObj2);
// assignObj2's age (26) overwrites assignObj1's age (25)

/* ⚠️ Production Tip: Use spread operator instead (cleaner): */
const spreadMerged = {...assignObj1, ...assignObj2};

// TODO: Object.create() — Create object with specific prototype
const parent = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const child = Object.create(parent);
child.name = "Rahul";
child.greet(); // "Hello, I'm Rahul"

// TODO: Object.freeze() — Make immutable
const freezeObj = {name: "Rahul"};
Object.freeze(freezeObj);
freezeObj.name = "Priya"; // Fails silently (strict mode: error)
console.log(freezeObj.name); // "Rahul" (unchanged)

// TODO: Object.hasOwnProperty() — Check if owns property
const hasOwnObj = {name: "Rahul"};
hasOwnObj.hasOwnProperty("name"); // true
hasOwnObj.hasOwnProperty("age"); // false
hasOwnObj.hasOwnProperty("toString"); // false (inherited, not own)


/* ============================================================================
   PART 5: NESTED OBJECTS
   ============================================================================ */

/* What are Nested Objects?
 * Objects containing other objects or arrays as values.
 */

//! NESTED OBJECT EXAMPLE
const person = {
  name: "Rahul",
  age: 25,
  address: {
    street: "123 Main St",
    city: "Delhi",
    country: "India",
    coordinates: {
      latitude: 28.7041,
      longitude: 77.1025
    }
  },
  hobbies: ["reading", "coding", "gaming"],
  friends: [
    {name: "Priya", age: 23},
    {name: "Arjun", age: 27}
  ]
};

//? ACCESS NESTED PROPERTIES
person.address.city; // "Delhi"
person.address.coordinates.latitude; // 28.7041
person.hobbies[0]; // "reading"
person.friends[0].name; // "Priya"

//* ADD NESTED PROPERTY
person.address.zipCode = "110001";

//! DELETE NESTED PROPERTY
delete person.address.coordinates;

// --------------------------------------------
// Optional Chaining (?.)
// --------------------------------------------

/* Problem: Accessing undefined properties causes errors. */
const optionalUser = {name: "Rahul"}; // No address property
// user.address.city; // ❌ Error: Cannot read property 'city' of undefined

// Solution: Optional chaining
const optionalUser2 = {name: "Rahul"};
optionalUser2?.address?.city; // undefined (safe)
optionalUser2?.address?.city ?? "Not set"; // "Not set"

// With functions
optionalUser2.getAge?.(); // undefined (safe)

// With arrays
optionalUser2?.hobbies?.[0]; // undefined (safe)

// --------------------------------------------
// Nullish Coalescing (??)
// --------------------------------------------

// Old way (problems with 0, false, "")
// const count = data.count || 0; // Treats 0 as falsy!

// New way (only null/undefined are falsy)
// const count = data.count ?? 0; // Only use default if null/undefined
// const name = data.name ?? "Unknown";


/* ============================================================================
   PART 6: DESTRUCTURING
   ============================================================================ */

// --------------------------------------------
// Array Destructuring
// --------------------------------------------

// TODO: Basic destructuring
const destArr = [1, 2, 3, 4, 5];
const [a, b] = destArr; // a = 1, b = 2
const [x, y, z] = destArr; // x = 1, y = 2, z = 3

// TODO: Skip elements
const skipArr = [1, 2, 3, 4, 5];
const [firstSkip, , c] = skipArr; // firstSkip = 1, c = 3 (skip 2)
const [first, ...rest] = skipArr; // first = 1, rest = [2, 3, 4, 5]

// TODO: Default values
const defaultArr = [1, 2];
const [defaultA, defaultB, defaultC = 3] = defaultArr; // defaultC = 3 (default)
const [defaultX = 10, defaultY = 20] = []; // defaultX = 10, defaultY = 20 (both defaults)

// TODO: Swap variables
let swapA = 1, swapB = 2;
[swapA, swapB] = [swapB, swapA]; // swapA = 2, swapB = 1

// --------------------------------------------
// Object Destructuring
// --------------------------------------------

// TODO: Basic destructuring
const destPerson = {name: "Rahul", age: 25, city: "Delhi"};
const {name, age} = destPerson; // name = "Rahul", age = 25
const {name: name2, age: age2, country} = destPerson; // country = undefined

// TODO: Rename properties
const renamePerson = {name: "Rahul", age: 25};
const {name: fullName, age: yearsOld} = renamePerson;
// fullName = "Rahul", yearsOld = 25

// TODO: Default values
const defaultPerson = {name: "Rahul"};
const {defaultName, defaultAge = 25, defaultCity = "Delhi"} = defaultPerson;
// defaultName = "Rahul", defaultAge = 25, defaultCity = "Delhi"

// TODO: Nested destructuring
const nestedPerson = {
  name: "Rahul",
  address: {city: "Delhi", country: "India"}
};
const {nestedName, address: {city}} = nestedPerson;
// nestedName = "Rahul", city = "Delhi"

// TODO: Rest in objects
const restPerson = {name: "Rahul", age: 25, city: "Delhi", country: "India"};
const {restName, ...restRest} = restPerson;
// restName = "Rahul"
// restRest = {age: 25, city: "Delhi", country: "India"}

/* ⚠️ Production Tip: Use destructuring for function parameters (cleaner): */
// Bad
function updateUserBad(user) {
  console.log(user.name);
  console.log(user.age);
}

// Good
function updateUserGood({name, age}) {
  console.log(name);
  console.log(age);
}


/* ============================================================================
   PART 7: ITERATION OVER ARRAYS AND OBJECTS
   ============================================================================ */

// --------------------------------------------
// Array Iteration
// --------------------------------------------

// TODO: for loop — Traditional
const forLoopArr = [1, 2, 3, 4];
for (let i = 0; i < forLoopArr.length; i++) {
  console.log(forLoopArr[i]);
}

// TODO: for...of loop — Modern (values)
const forOfArr = [1, 2, 3, 4];
for (const element of forOfArr) {
  console.log(element); // 1, 2, 3, 4
}

// With index
for (const [index, element] of forOfArr.entries()) {
  console.log(`${index}: ${element}`);
}

// TODO: forEach() — Functional
const forEachIterArr = [1, 2, 3, 4];
forEachIterArr.forEach((element, index) => {
  console.log(`${index}: ${element}`);
});

// TODO: map() — Transform
const mapNumbers = [1, 2, 3];
const mapDoubled = mapNumbers.map(x => x * 2);
console.log(mapDoubled); // [2, 4, 6]

// TODO: filter() — Select
const filterNumbers2 = [1, 2, 3, 4, 5];
const filterEvens = filterNumbers2.filter(x => x % 2 === 0);
console.log(filterEvens); // [2, 4]

// --------------------------------------------
// Object Iteration
// --------------------------------------------

// TODO: for...in loop — Keys
const forInObj = {name: "Rahul", age: 25, city: "Delhi"};
for (const key in forInObj) {
  console.log(`${key}: ${forInObj[key]}`);
}
// name: Rahul
// age: 25
// city: Delhi

/* ⚠️ Warning: for...in includes inherited properties! */
const inheritedObj = {name: "Rahul"};
Object.prototype.inherited = "prop";
for (const key in inheritedObj) {
  console.log(key); // name, inherited ❌
}

// Fix: Use hasOwnProperty
for (const key in inheritedObj) {
  if (inheritedObj.hasOwnProperty(key)) {
    console.log(`${key}: ${inheritedObj[key]}`);
  }
}

// TODO: Object.keys() + forEach
const keysIterObj = {name: "Rahul", age: 25};
Object.keys(keysIterObj).forEach(key => {
  console.log(`${key}: ${keysIterObj[key]}`);
});

// TODO: Object.values() — Get values
const valuesIterObj = {name: "Rahul", age: 25, city: "Delhi"};
Object.values(valuesIterObj).forEach(value => {
  console.log(value);
});
// Rahul, 25, Delhi

// TODO: Object.entries() — Get pairs
const entriesIterObj = {name: "Rahul", age: 25};
Object.entries(entriesIterObj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// TODO: for...of with entries()
const forOfEntriesObj = {name: "Rahul", age: 25};
for (const [key, value] of Object.entries(forOfEntriesObj)) {
  console.log(`${key}: ${value}`);
}


/* ============================================================================
   PART 8: STRING METHODS (Brief Reference)
   ============================================================================ */

//! LENGTH AND ACCESS
"Hello".length; // 5
"Hello"[0]; // "H"
"Hello".charAt(0); // "H"

//! CASE CONVERSION
"hello".toUpperCase(); // "HELLO"
"HELLO".toLowerCase(); // "hello"

//! TRIMMING
"  hello  ".trim(); // "hello"
"  hello  ".trimStart(); // "hello  "
"  hello  ".trimEnd(); // "  hello"

//! SEARCHING
"hello world".indexOf("world"); // 6
"hello world".includes("world"); // true
"hello world".startsWith("hello"); // true
"hello world".endsWith("world"); // true

//! EXTRACTING
"hello".slice(1, 3); // "el"
"hello".substring(1, 3); // "el"
"hello".substr(1, 3); // "ell"

//! SPLITTING AND JOINING
"a,b,c".split(","); // ["a", "b", "c"]
"a-b-c".split("-"); // ["a", "b", "c"]
["a", "b", "c"].join(","); // "a,b,c"

//! REPLACING
"hello world".replace("world", "universe"); // "hello universe"
"hello hello".replaceAll("hello", "hi"); // "hi hi"

//! REPEATING AND PADDING
"ab".repeat(3); // "ababab"
"5".padStart(2, "0"); // "05"
"5".padEnd(2, "0"); // "50"


/* ============================================================================
   PRODUCTION CHECKLIST
   ============================================================================ */

/* Arrays
 * ✅ Prefer map(), filter(), reduce() over for loops (more readable)
 * ✅ Use includes() to check membership, not indexOf()
 * ✅ Use find() to get single element, not filter()
 * ✅ Use flat() to flatten nested arrays
 * ✅ Remember: slice() doesn't mutate, splice() does
 * ✅ Always use const for arrays, then reassign if needed
 */

/* Objects
 * ✅ Use optional chaining for nested property access: obj?.address?.city
 * ✅ Use nullish coalescing for defaults: value ?? "default"
 * ✅ Use destructuring in function parameters
 * ✅ Use spread operator for copying: {...obj}
 * ✅ Use Object.freeze() for immutable objects
 * ✅ Prefer Object.keys(), Object.values(), Object.entries()
 */

/* Iteration
 * ✅ Use for...of for arrays (cleaner than for)
 * ✅ Use forEach() for side effects
 * ✅ Use map() when you need a new array
 * ✅ Use Object.entries() for object iteration
 * ✅ Avoid for...in (use Object.keys() instead)
 */

/* Destructuring
 * ✅ Always use destructuring for function parameters
 * ✅ Use rest operator for "remaining" values: const [first, ...rest]
 * ✅ Provide default values: const {name = "Unknown"} = obj
 */


/* ============================================================================
   EXAMPLE: REAL-WORLD APPLICATION
   ============================================================================ */

// Data structure
const students = [
  {id: 1, name: "Rahul", scores: {math: 85, english: 90, science: 88}},
  {id: 2, name: "Priya", scores: {math: 92, english: 88, science: 95}},
  {id: 3, name: "Arjun", scores: {math: 78, english: 85, science: 80}}
];

// 1. Get all student names
const studentNames = students.map(s => s.name);
// ["Rahul", "Priya", "Arjun"]

// 2. Find student with highest math score
const topMathStudent = students.reduce((best, current) => 
  current.scores.math > best.scores.math ? current : best
);
// {id: 2, name: "Priya", ...}

// 3. Get students with average > 85
const topStudents = students.filter(s => {
  const average = Object.values(s.scores).reduce((a, b) => a + b) / 3;
  return average > 85;
});

// 4. Create a report object
const report = students.reduce((acc, student) => {
  acc[student.name] = {
    id: student.id,
    average: Object.values(student.scores).reduce((a, b) => a + b) / 3
  };
  return acc;
}, {});
// {Rahul: {id: 1, average: 87.67}, Priya: {id: 2, average: 91.67}, ...}

// 5. Destructuring in function
function printStudentInfo({name, scores: {math, english}}) {
  console.log(`${name}: Math=${math}, English=${english}`);
}
printStudentInfo(students[0]); // Rahul: Math=85, English=90


/* ============================================================================
   SUMMARY TABLE
   ============================================================================ */

/* | Concept         | Use Case                    | Example                         |
   |----------------|-----------------------------|---------------------------------|
   | push()         | Add to end                  | arr.push(5)                     |
   | pop()          | Remove from end             | arr.pop()                       |
   | map()          | Transform array             | arr.map(x => x * 2)             |
   | filter()       | Select elements             | arr.filter(x => x > 5)          |
   | reduce()       | Combine into one            | arr.reduce((a, b) => a + b)     |
   | Object.keys()  | Get all keys                | Object.keys(obj)                |
   | Destructuring  | Extract values              | const {name, age} = obj         |
   | Optional chaining | Safe access              | obj?.address?.city              |
   | for...of       | Iterate arrays              | for (const item of arr)         |
   | Object.entries() | Iterate objects           | Object.entries(obj)             |
*/