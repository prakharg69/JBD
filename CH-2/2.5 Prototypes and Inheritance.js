/* ============================================================================
   WHAT IS A PROTOTYPE? (One Definition to Remember)
   ============================================================================ */

/* A prototype is a built-in mechanism where objects inherit properties and 
 * methods from other objects. Every object has an internal [[Prototype]] link
 * to another object (or null at the end).
 * 
 * "Prototype is the secret link between objects that makes inheritance work"
 */

//! THE CORE CONCEPT (Minimal Example)
const parent = { name: "Parent", greet() { return `Hello from ${this.name}` } };
const child = { name: "Child" };

child.__proto__ = parent;  // Set prototype link (don't actually use __proto__)
console.log(child.greet()); // "Hello from Child" — inherits method!
console.log(child.name);     // "Child" (own property overrides)

/* ============================================================================
   WHY PROTOTYPES EXIST (Memory & Reuse)
   ============================================================================ */

/* Key Point: Methods are stored ONCE on the prototype, not copied to every instance.
 * All instances share the same methods → saves memory.
 */

function Dog(name) {
  this.name = name;
}

// Method stored once on prototype
Dog.prototype.bark = function() {
  return `${this.name} says Woof!`;
};

const rex = new Dog("Rex");
const buddy = new Dog("Buddy");

console.log(rex.bark === buddy.bark); // true — same function reference!

/* ============================================================================
   THE PROTOTYPE CHAIN (How Lookup Works)
   ============================================================================ */

//! Property lookup follows the chain until found or null reached

const grandparent = { 
  family: "Smith",
  getFamily: () => "Smith family" 
};

const parent2 = {
  __proto__: grandparent,
  parentProp: "parent value"
};

const child2 = {
  __proto__: parent2,
  name: "John"
};

console.log(child2.name);        // "John" (own property)
console.log(child2.parentProp);  // "parent value" (from parent2)
console.log(child2.family);      // "Smith" (from grandparent)
console.log(child2.toString());  // Built-in method (from Object.prototype)
// child2.nonExistent → undefined (end of chain)

// Visual: child2 → parent2 → grandparent → Object.prototype → null

/* ============================================================================
   CONSTRUCTOR FUNCTIONS (Before Classes)
   ============================================================================ */

//! Pattern 1: Basic Constructor
function Car(make, model, year) {
  // Instance properties (each instance gets its own copy)
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

// Methods on prototype (shared across all instances)
Car.prototype.start = function() {
  this.isRunning = true;
  return `${this.make} started`;
};

Car.prototype.stop = function() {
  this.isRunning = false;
  return `${this.make} stopped`;
};

Car.prototype.getInfo = function() {
  return `${this.year} ${this.make} ${this.model}`;
};

const honda = new Car("Honda", "Civic", 2022);
const toyota = new Car("Toyota", "Camry", 2021);

console.log(honda.start());    // "Honda started"
console.log(toyota.start());   // "Toyota started"
console.log(honda.getInfo());  // "2022 Honda Civic"

//! What `new` keyword does:
// 1. Creates new empty object {}
// 2. Links object to constructor's prototype (__proto__ = Constructor.prototype)
// 3. Binds `this` to new object
// 4. Returns the object (unless constructor returns something else)

// Manual implementation of `new`
function myNew(Constructor, ...args) {
  const obj = {};
  obj.__proto__ = Constructor.prototype;
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

/* ============================================================================
   PROTOTYPE PROPERTY vs INSTANCE PROPERTY
   ============================================================================ */

function Person(name) {
  this.name = name;           // Instance property
}

Person.prototype.species = "Human";  // Prototype property
Person.prototype.greet = function() {  // Prototype method
  return `Hi, I'm ${this.name}`;
};

const alice = new Person("Alice");
const bob = new Person("Bob");

console.log(alice.species);        // "Human" (from prototype)
console.log(bob.species);          // "Human" (same from prototype)
console.log(alice.greet === bob.greet); // true (shared method)

// Override prototype property on instance
alice.species = "Superhuman";
console.log(alice.species);        // "Superhuman" (own property)
console.log(bob.species);          // "Human" (still from prototype)

// Check ownership
console.log(alice.hasOwnProperty("species")); // true (overridden)
console.log(bob.hasOwnProperty("species"));   // false (from prototype)

/* ============================================================================
   INHERITANCE IN JAVASCRIPT (Prototypal Inheritance)
   ============================================================================ */

//! METHOD 1: Classical Pattern (Constructor Stealing + Prototype Chaining)

// Parent constructor
function Animal(name) {
  this.name = name;
  this.isAlive = true;
}

Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

Animal.prototype.sleep = function() {
  return `${this.name} is sleeping`;
};

// Child constructor
function Dog2(name, breed) {
  Animal.call(this, name);  // Steal parent's instance properties
  this.breed = breed;
}

// Link prototypes (inherit parent methods)
Dog2.prototype = Object.create(Animal.prototype);
Dog2.prototype.constructor = Dog2;  // Fix constructor reference

// Add child-specific methods
Dog2.prototype.bark = function() {
  return `${this.name} barks loudly`;
};

// Override parent method
Dog2.prototype.eat = function() {
  return `${this.name} the ${this.breed} eats dog food`;
};

const max = new Dog2("Max", "Golden Retriever");
console.log(max.eat());      // "Max the Golden Retriever eats dog food" (overridden)
console.log(max.sleep());    // "Max is sleeping" (inherited)
console.log(max.bark());     // "Max barks loudly" (own method)
console.log(max.isAlive);    // true (inherited property)

//! METHOD 2: Modern Pattern (Object.create)
const animalProto = {
  init(name) {
    this.name = name;
    this.isAlive = true;
    return this;
  },
  eat() {
    return `${this.name} is eating`;
  },
  sleep() {
    return `${this.name} is sleeping`;
  }
};

const dogProto = Object.create(animalProto);
dogProto.init = function(name, breed) {
  animalProto.init.call(this, name);
  this.breed = breed;
  return this;
};
dogProto.bark = function() {
  return `${this.name} barks`;
};
dogProto.eat = function() {
  return `${this.name} the ${this.breed} eats`;
};

const rocky = Object.create(dogProto).init("Rocky", "Beagle");
console.log(rocky.eat());   // "Rocky the Beagle eats"
console.log(rocky.sleep()); // "Rocky is sleeping"

//! METHOD 3: Class Syntax (Syntactic Sugar)
class AnimalClass {
  constructor(name) {
    this.name = name;
    this.isAlive = true;
  }
  
  eat() {
    return `${this.name} is eating`;
  }
  
  sleep() {
    return `${this.name} is sleeping`;
  }
}

class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  bark() {
    return `${this.name} barks`;
  }
  
  eat() {
    return `${this.name} the ${this.breed} eats`;
  }
}

const luna = new DogClass("Luna", "Husky");
console.log(luna.eat());    // "Luna the Husky eats"

/* ============================================================================
   PRACTICAL USES OF PROTOTYPES
   ============================================================================ */

//! 1. Adding Methods to Built-in Types (Be careful!)
Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.first()); // 1
console.log(numbers.last());  // 5

//! 2. Method Sharing (Memory Efficient)
function UIComponent(id) {
  this.id = id;
  this.element = document.getElementById(id);
}

UIComponent.prototype.show = function() {
  this.element.style.display = 'block';
  return this;
};

UIComponent.prototype.hide = function() {
  this.element.style.display = 'none';
  return this;
};

UIComponent.prototype.setText = function(text) {
  this.element.textContent = text;
  return this;
};

// All instances share the same methods (memory efficient)

//! 3. Type Checking
function isArrayLike(obj) {
  return obj && typeof obj === 'object' && 
         typeof obj.length === 'number' && 
         !obj.hasOwnProperty('call');  // Not a function
}

//! 4. Mixins (Composition over Inheritance)
const flyable = {
  fly() {
    return `${this.name} is flying`;
  }
};

const swimable = {
  swim() {
    return `${this.name} is swimming`;
  }
};

function Bird(name) {
  this.name = name;
}

function Fish(name) {
  this.name = name;
}

Object.assign(Bird.prototype, flyable);
Object.assign(Fish.prototype, swimable);
Object.assign(Bird.prototype, swimable);  // Duck that swims and flies?

const eagle = new Bird("Eagle");
console.log(eagle.fly());  // "Eagle is flying"

/* ============================================================================
   CHECKING THE PROTOTYPE CHAIN
   ============================================================================ */

function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.drive = function() {
  return `Driving ${this.type}`;
};

const tesla = new Vehicle("Tesla");

console.log(tesla instanceof Vehicle);        // true
console.log(tesla instanceof Object);         // true

console.log(Vehicle.prototype.isPrototypeOf(tesla));  // true
console.log(Object.prototype.isPrototypeOf(tesla));   // true

console.log(Object.getPrototypeOf(tesla) === Vehicle.prototype);  // true

console.log(tesla.hasOwnProperty("type"));     // true
console.log(tesla.hasOwnProperty("drive"));    // false (on prototype)

/* ============================================================================
   COMMON PITFALLS
   ============================================================================ */

//! PITFALL 1: Forgetting `new` keyword
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.area = function() {
  return this.width * this.height;
};

const rect1 = new Rectangle(5, 10);   // ✅ Works
const rect2 = Rectangle(5, 10);       // ❌ No 'new' → this is global/window!

console.log(rect1.area());  // 50
// console.log(rect2.area());  // TypeError: Cannot read property 'area' of undefined

// FIX: Add safety check
function SafeRectangle(width, height) {
  if (!(this instanceof SafeRectangle)) {
    return new SafeRectangle(width, height);
  }
  this.width = width;
  this.height = height;
}

//! PITFALL 2: Overwriting Prototype After Instance Creation
function User(name) {
  this.name = name;
}

const user1 = new User("Alice");

User.prototype.greet = function() {
  return `Hi ${this.name}`;
};

console.log(user1.greet());  // Works (prototype was enhanced)

// BUT replacing prototype breaks existing instances
User.prototype = {  // New object, not linked to existing instances
  greet() { return `Hello ${this.name}`; }
};

const user2 = new User("Bob");
console.log(user2.greet());  // "Hello Bob" (works for new instance)
// console.log(user1.greet());  // Still works? Actually yes, user1 still has old prototype
// But if user1.greet was called before? Confusing — DON'T replace prototypes!

//! PITFALL 3: Lost Constructor Reference
function Parent() {}
function Child() {}

Child.prototype = Object.create(Parent.prototype);
console.log(Child.prototype.constructor === Parent);  // true (wrong!)

// FIX: Reset constructor
Child.prototype.constructor = Child;

//! PITFALL 4: Modifying Object.prototype (DON'T DO THIS!)
// Object.prototype.$ = function() { console.log("Dangerous!"); };
// Affects ALL objects, breaks libraries, causes bugs

/* ============================================================================
   PRODUCTION CHECKLIST
   ============================================================================ */

/* ✅ DO use prototypes for:
 * - Shared methods across many instances (memory efficient)
 * - Extending built-in types (carefully!)
 * - When you need instanceof checks
 * - Performance-critical code with many instances
 */

/* ❌ DON'T use prototypes when:
 * - You need true privacy (use closures or #private fields)
 * - Working with frameworks that prefer classes (React, Angular)
 * - You don't understand prototype chain implications
 */

/* ✅ Use modern classes instead when:
 * - Code clarity is important
 * - Working on team projects
 * - Need super() calls
 * - Want cleaner syntax
 */

/* Performance Note:
 * - Prototype lookups are slightly slower than own properties
 * - Deep prototype chains hurt performance
 * - Modern JS engines optimize prototype access well
 * - Classes compile to same prototype mechanism
 */

/* ============================================================================
   INTERVIEW CHEAT SHEET
   ============================================================================ */

/* Q: What's a prototype in JavaScript?
 * A: An object that other objects inherit properties/methods from through
 *    the [[Prototype]] chain. Every function has a prototype property that's
 *    used when the function is called as a constructor with `new`.
 */

/* Q: How does prototypal inheritance work?
 * A: When accessing a property, JS checks the object itself, then its prototype,
 *    then prototype's prototype, until null is reached (prototype chain).
 */

/* Q: What's the difference between __proto__ and prototype?
 * A: __proto__ is the actual prototype link on instances (internal [[Prototype]]).
 *    prototype is a property on constructor functions that sets __proto__ on new instances.
 */

/* Q: How to inherit correctly?
 * A: Child.prototype = Object.create(Parent.prototype);
 *    Child.prototype.constructor = Child;
 */

/* Q: What does `new` do?
 * A: Creates object → links to constructor's prototype → binds this → returns object
 */

/* ============================================================================
   QUICK REFERENCE
   ============================================================================ */

/* | Concept                    | Syntax                                   |
 * |----------------------------|------------------------------------------|
 * | Set prototype (create)     | Object.create(proto)                     |
 * | Get prototype              | Object.getPrototypeOf(obj)               |
 * | Check inheritance          | parent.isPrototypeOf(child)              |
 * | Instance check             | obj instanceof Constructor               |
 * | Own property check         | obj.hasOwnProperty('prop')               |
 * | Constructor inheritance    | Child.prototype = Object.create(Parent)  |
 * | Super call (old)           | Parent.call(this, ...args)               |
 * | Super call (class)         | super(...args)                           |
 * | Class syntax               | class Child extends Parent               |
 * | Private fields (modern)    | #privateField                            |
 */

/* ============================================================================
   VISUAL PROTOTYPE CHAIN EXAMPLE
   ============================================================================ */

/* 
    null
     ↑
    [Object.prototype] → toString, hasOwnProperty, etc.
     ↑
    [Animal.prototype] → eat(), sleep()
     ↑
    [Dog.prototype] → bark(), overridden eat()
     ↑
    [maxInstance] → name: "Max", breed: "Golden"
    
    Lookup: max.eat()
    1. max own properties? No
    2. Dog.prototype? Yes (overridden eat found)
    3. Stop — use that method
*/

// | Term        | What it is                                            | Where it exists |
// | ----------- | ----------------------------------------------------- | --------------- |
// | `prototype` | A **property of constructor functions**               | On functions    |
// | `__proto__` | A **link to another object (internal [[Prototype]])** | On objects      |