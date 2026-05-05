/* ============================================================================
   CLASS SYNTAX - MODERN WAY (ES6+)
   ============================================================================ */

//! Basic Class Declaration
class Person {
  // Constructor method - called when using 'new'
  constructor(name, age) {
    // Instance properties
    this.name = name;
    this.age = age;
    this.createdAt = new Date();
  }
  
  // Instance method (added to prototype automatically)
  greet() {
    return `Hello, my name is ${this.name}`;
  }
  
  // Another instance method
  celebrateBirthday() {
    this.age++;
    return `${this.name} is now ${this.age} years old!`;
  }
  
  // Getter
  get birthYear() {
    return new Date().getFullYear() - this.age;
  }
  
  // Setter
  set birthYear(year) {
    this.age = new Date().getFullYear() - year;
  }
}

// Using the class
const john = new Person("John", 30);
console.log(john.greet());              // "Hello, my name is John"
console.log(john.celebrateBirthday());  // "John is now 31 years old!"
console.log(john.birthYear);            // 1993 (assuming current year 2024)

/* ============================================================================
   CONSTRUCTORS - DEEP DIVE
   ============================================================================ */

//! Multiple Constructors Pattern (Using static factory methods)
class User {
  constructor(email, username, role = "user") {
    this.email = email;
    this.username = username;
    this.role = role;
    this.isActive = true;
  }
  
  // Static factory method for creating admin users
  static createAdmin(email, username) {
    return new User(email, username, "admin");
  }
  
  // Static factory method for guest users
  static createGuest() {
    return new User("guest@temp.com", "Guest", "guest");
  }
  
  // Static factory method from object
  static fromObject(obj) {
    return new User(obj.email, obj.username, obj.role);
  }
}

const admin = User.createAdmin("admin@company.com", "AdminUser");
const guest = User.createGuest();
console.log(admin.role);  // "admin"
console.log(guest.role);  // "guest"

//! Default Parameters in Constructor
class Product {
  constructor(name, price = 0, stock = 100, category = "General") {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }
  
  applyDiscount(percent = 10) {
    this.price = this.price * (1 - percent / 100);
    return this.price;
  }
}

const laptop = new Product("Laptop", 999, 50, "Electronics");
console.log(laptop.price);  // 999

/* ============================================================================
   METHODS - TYPES AND USAGE
   ============================================================================ */

class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this.transactions = [];
  }
  
  // Instance method
  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    this.transactions.push({ type: "deposit", amount, date: new Date() });
    return this.balance;
  }
  
  // Instance method with validation
  withdraw(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    this.transactions.push({ type: "withdrawal", amount, date: new Date() });
    return this.balance;
  }
  
  // Getter method
  get accountSummary() {
    return `${this.owner}: $${this.balance} (${this.transactions.length} transactions)`;
  }
  
  // Setter with validation
  set accountName(name) {
    if (name.length < 2) throw new Error("Name too short");
    this.owner = name;
  }
  
  // Private method (using # - modern JS)
  #logTransaction(type, amount) {
    console.log(`[${new Date().toISOString()}] ${type}: $${amount}`);
  }
  
  // Public method using private method
  secureWithdraw(amount, pin) {
    if (pin !== this.#getPin()) return "Access denied";
    this.#logTransaction("withdraw", amount);
    return this.withdraw(amount);
  }
  
  // Private method
  #getPin() {
    return "1234"; // In real app, this would be stored securely
  }
  
  // Static method (class-level)
  static transfer(fromAccount, toAccount, amount) {
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
    return `Transferred $${amount}`;
  }
  
  // Async method
  async fetchExchangeRate(currency) {
    const response = await fetch(`https://api.exchangerate.com/${currency}`);
    return response.json();
  }
}

const account1 = new BankAccount("Alice", 1000);
const account2 = new BankAccount("Bob", 500);
console.log(account1.accountSummary);  // "Alice: $1000 (0 transactions)"
BankAccount.transfer(account1, account2, 200);
console.log(account1.balance);  // 800
console.log(account2.balance);  // 700

/* ============================================================================
   INHERITANCE WITH `extends`
   ============================================================================ */

//! Base/Parent Class
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.isAlive = true;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  eat(food) {
    return `${this.name} eats ${food}`;
  }
  
  sleep() {
    return `${this.name} sleeps peacefully`;
  }
  
  die() {
    this.isAlive = false;
    return `${this.name} has passed away`;
  }
}

//! Child Class with extends
class Dog extends Animal {
  constructor(name, breed, age) {
    // MUST call super() before using 'this'
    super(name, "Canine");
    this.breed = breed;
    this.age = age;
    this.tricks = [];
  }
  
  // Override parent method
  speak() {
    return `${this.name} barks: Woof! Woof!`;
  }
  
  // New method specific to Dog
  fetch(item) {
    return `${this.name} fetches the ${item}`;
  }
  
  // Learn trick
  learnTrick(trick) {
    this.tricks.push(trick);
    return `${this.name} learned ${trick}!`;
  }
  
  // Perform all tricks
  performTricks() {
    if (this.tricks.length === 0) return `${this.name} knows no tricks yet`;
    return this.tricks.map(trick => `${this.name} ${trick}`).join(", ");
  }
  
  // Override with additional logic
  sleep() {
    const baseSleep = super.sleep();  // Call parent method
    return `${baseSleep} on the dog bed`;
  }
}

//! Another Child Class
class Cat extends Animal {
  constructor(name, color, indoor = true) {
    super(name, "Feline");
    this.color = color;
    this.indoor = indoor;
  }
  
  speak() {
    return `${this.name} meows: Meow! Meow!`;
  }
  
  climb() {
    return `${this.name} climbs the furniture`;
  }
  
  scratch() {
    return `${this.name} scratches everything`;
  }
  
  // Different override
  eat(food) {
    if (food === "fish") {
      return `${this.name} happily eats the ${food}`;
    }
    return super.eat(food);
  }
}

// Demonstration
const rex = new Dog("Rex", "German Shepherd", 3);
const whiskers = new Cat("Whiskers", "Orange", true);

console.log(rex.speak());           // "Rex barks: Woof! Woof!"
console.log(rex.fetch("ball"));     // "Rex fetches the ball"
console.log(rex.sleep());           // "Rex sleeps peacefully on the dog bed"

console.log(whiskers.speak());      // "Whiskers meows: Meow! Meow!"
console.log(whiskers.eat("fish"));  // "Whiskers happily eats the fish"

/* ============================================================================
   SUPER KEYWORD - COMPLETE GUIDE
   ============================================================================ */

//! Super in Constructor
class Employee {
  constructor(name, id, department) {
    this.name = name;
    this.id = id;
    this.department = department;
    this.hireDate = new Date();
  }
  
  work() {
    return `${this.name} is working in ${this.department}`;
  }
  
  getSalary() {
    return 50000; // Base salary
  }
}

class Manager extends Employee {
  constructor(name, id, department, teamSize) {
    // Super MUST be called first
    super(name, id, department);
    this.teamSize = teamSize;
    this.teamMembers = [];
  }
  
  // Super in method override
  work() {
    // Call parent method and extend
    const baseWork = super.work();
    return `${baseWork} and managing ${this.teamSize} people`;
  }
  
  getSalary() {
    // Use parent method and add bonus
    const baseSalary = super.getSalary();
    const bonus = this.teamSize * 1000;
    return baseSalary + bonus;
  }
  
  // Super in static methods
  static createFromEmployee(employee, teamSize) {
    const manager = new Manager(
      employee.name, 
      employee.id, 
      employee.department, 
      teamSize
    );
    manager.hireDate = employee.hireDate;
    return manager;
  }
}

const emp = new Employee("Jane", "E001", "Sales");
const manager = new Manager("John", "M001", "IT", 5);
console.log(manager.work());  // "John is working in IT and managing 5 people"
console.log(manager.getSalary());  // 55000 (50000 + 5000)

//! Super in Getters/Setters
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  get area() {
    return this.width * this.height;
  }
  
  set dimensions(dimensions) {
    this.width = dimensions.width;
    this.height = dimensions.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
  
  get area() {
    return super.area;  // Use parent getter
  }
  
  set side(value) {
    super.dimensions = { width: value, height: value };
  }
}

const square = new Square(5);
console.log(square.area);  // 25
square.side = 10;
console.log(square.area);  // 100

/* ============================================================================
   STATIC METHODS AND PROPERTIES
   ============================================================================ */

//! Static Methods - Class-level utilities
class MathUtils {
  // Static property (class-level)
  static PI = 3.14159;
  static VERSION = "1.0.0";
  
  // Static methods
  static add(a, b) {
    return a + b;
  }
  
  static subtract(a, b) {
    return a - b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
  
  static circleArea(radius) {
    return this.PI * radius * radius;
  }
  
  static async fetchFromAPI(url) {
    const response = await fetch(url);
    return response.json();
  }
  
  // Static method that creates instances
  static createRange(start, end, step = 1) {
    const range = [];
    for (let i = start; i <= end; i += step) {
      range.push(i);
    }
    return range;
  }
}

// Call static methods directly on class
console.log(MathUtils.add(5, 3));           // 8
console.log(MathUtils.PI);                  // 3.14159
console.log(MathUtils.circleArea(5));       // 78.53975
console.log(MathUtils.createRange(1, 5));   // [1, 2, 3, 4, 5]

//! Static Methods in Inheritance
class Parent {
  static className = "Parent";
  
  static identify() {
    return `I am ${this.className}`;
  }
  
  static create() {
    return new this();  // Creates instance of whatever class calls it
  }
}

class Child extends Parent {
  static className = "Child";
  
  static identify() {
    return `${super.identify()} (Child version)`;
  }
}

console.log(Parent.identify());  // "I am Parent"
console.log(Child.identify());   // "I am Child (Child version)"

const childInstance = Child.create();
console.log(childInstance instanceof Child);  // true

//! Real-world Example: Database Model with Statics
class Model {
  static tableName = "models";
  
  constructor(data) {
    this.data = data;
    this.id = data.id;
  }
  
  static async find(id) {
    const result = await db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return new this(result.rows[0]);
  }
  
  static async findAll(conditions = {}) {
    const results = await db.query(`SELECT * FROM ${this.tableName}`);
    return results.rows.map(row => new this(row));
  }
  
  static async create(data) {
    const result = await db.query(
      `INSERT INTO ${this.tableName} VALUES ($1) RETURNING *`,
      [data]
    );
    return new this(result.rows[0]);
  }
}

class UserModel extends Model {
  static tableName = "users";
  
  async getPosts() {
    return await PostModel.findAll({ userId: this.id });
  }
}

/* ============================================================================
   ENCAPSULATION
   ============================================================================ */

//! Method 1: Private Fields (#)
class BankVault {
  // Private fields (truly private, not accessible outside)
  #balance = 0;
  #pin;
  #transactionHistory = [];
  
  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
    this.owner = "Unknown";  // Public field
  }
  
  // Public method to access private data
  getBalance(pin) {
    if (this.#verifyPin(pin)) {
      return this.#balance;
    }
    return "Invalid PIN";
  }
  
  deposit(amount, pin) {
    if (!this.#verifyPin(pin)) return "Invalid PIN";
    if (amount <= 0) return "Invalid amount";
    
    this.#balance += amount;
    this.#addTransaction("deposit", amount);
    return this.#balance;
  }
  
  withdraw(amount, pin) {
    if (!this.#verifyPin(pin)) return "Invalid PIN";
    if (amount > this.#balance) return "Insufficient funds";
    
    this.#balance -= amount;
    this.#addTransaction("withdrawal", amount);
    return this.#balance;
  }
  
  // Private method
  #verifyPin(pin) {
    return this.#pin === pin;
  }
  
  // Private method
  #addTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      date: new Date(),
      balance: this.#balance
    });
  }
  
  // Public method to view history (controlled access)
  getTransactionHistory(pin) {
    if (!this.#verifyPin(pin)) return "Invalid PIN";
    return [...this.#transactionHistory];  // Return copy to prevent modification
  }
  
  // Getter (no pin needed for basic info)
  get hasTransactions() {
    return this.#transactionHistory.length > 0;
  }
}

const vault = new BankVault(1000, "1234");
console.log(vault.getBalance("1234"));  // 1000
console.log(vault.balance);              // undefined (can't access)
vault.deposit(500, "1234");
console.log(vault.getBalance("1234"));  // 1500

//! Method 2: Closure-based Encapsulation (Pre-ES2022)
function createCounter(initialValue = 0) {
  // Private variables (captured in closure)
  let count = initialValue;
  let history = [];
  
  // Public interface
  return {
    increment() {
      count++;
      history.push({ action: "increment", value: count, timestamp: new Date() });
      return count;
    },
    
    decrement() {
      count--;
      history.push({ action: "decrement", value: count, timestamp: new Date() });
      return count;
    },
    
    getValue() {
      return count;
    },
    
    getHistory() {
      return [...history];  // Return copy
    },
    
    reset() {
      count = initialValue;
      history = [];
    }
  };
}

const counter = createCounter(10);
console.log(counter.getValue());    // 10
counter.increment();
console.log(counter.getValue());    // 11
console.log(counter.count);         // undefined (private)

//! Method 3: WeakMap for Private Data
const privateData = new WeakMap();

class PersonPrivate {
  constructor(name, age) {
    const privateStuff = {
      ssn: Math.random().toString(36).substring(2),
      createdAt: new Date(),
      secrets: []
    };
    privateData.set(this, privateStuff);
    
    this.name = name;
    this.age = age;
  }
  
  getSSN() {
    return privateData.get(this).ssn;
  }
  
  addSecret(secret) {
    privateData.get(this).secrets.push(secret);
  }
  
  getSecrets() {
    return [...privateData.get(this).secrets];
  }
}

/* ============================================================================
   ABSTRACTION
   ============================================================================ */

//! Abstract Class Pattern (using errors to enforce abstraction)
class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Abstract class cannot be instantiated");
    }
  }
  
  // Abstract methods (must be implemented by child)
  area() {
    throw new Error("Abstract method area() must be implemented");
  }
  
  perimeter() {
    throw new Error("Abstract method perimeter() must be implemented");
  }
  
  // Concrete method (can be used by children)
  describe() {
    return `A shape with area ${this.area()} and perimeter ${this.perimeter()}`;
  }
  
  // Template method pattern
  getDetailedInfo() {
    return {
      type: this.constructor.name,
      area: this.area(),
      perimeter: this.perimeter(),
      description: this.describe()
    };
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
  
  perimeter() {
    return 2 * Math.PI * this.radius;
  }
  
  // Additional method
  diameter() {
    return 2 * this.radius;
  }
}

class Rectangle2 extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
  
  perimeter() {
    return 2 * (this.width + this.height);
  }
  
  isSquare() {
    return this.width === this.height;
  }
}

const circle = new Circle(5);
const rectangle = new Rectangle2(4, 6);

console.log(circle.area());        // 78.54
console.log(rectangle.perimeter()); // 20
console.log(circle.getDetailedInfo());

//! Abstraction Example: API Client
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.cache = new Map();
  }
  
  // Private method (by convention, though not truly private)
  async #request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}:${url}`;
    
    // Check cache for GET requests
    if (options.method === 'GET' && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      // Cache GET responses for 5 minutes
      if (options.method === 'GET') {
        setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);
        this.cache.set(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }
  
  #handleError(error) {
    console.error(`API Error: ${error.message}`);
    // Log to monitoring service
  }
  
  // Public API methods (abstracted complexity)
  async get(endpoint) {
    return this.#request(endpoint, { method: 'GET' });
  }
  
  async post(endpoint, data) {
    return this.#request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async put(endpoint, data) {
    return this.#request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async delete(endpoint) {
    return this.#request(endpoint, { method: 'DELETE' });
  }
  
  clearCache() {
    this.cache.clear();
  }
}

/* ============================================================================
   POLYMORPHISM
   ============================================================================ */

//! Method Overriding (Runtime Polymorphism)
class Payment {
  process(amount) {
    throw new Error("Process method must be implemented");
  }
  
  validate() {
    return true;
  }
  
  getFee(amount) {
    return 0;
  }
}

class CreditCardPayment extends Payment {
  constructor(cardNumber, expiry, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.expiry = expiry;
    this.cvv = cvv;
  }
  
  process(amount) {
    if (!this.validate()) throw new Error("Invalid card details");
    console.log(`Processing credit card payment of $${amount}`);
    return { success: true, method: "credit_card", amount, fee: this.getFee(amount) };
  }
  
  validate() {
    return this.cardNumber.length === 16 && this.cvv.length === 3;
  }
  
  getFee(amount) {
    return amount * 0.03; // 3% fee
  }
}

class PayPalPayment extends Payment {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  
  process(amount) {
    console.log(`Processing PayPal payment of $${amount} from ${this.email}`);
    return { success: true, method: "paypal", amount, fee: this.getFee(amount) };
  }
  
  getFee(amount) {
    return amount * 0.02; // 2% fee
  }
}

class CryptoPayment extends Payment {
  constructor(walletAddress, currency = "BTC") {
    super();
    this.walletAddress = walletAddress;
    this.currency = currency;
  }
  
  process(amount) {
    console.log(`Processing ${this.currency} payment of ${amount} from wallet ${this.walletAddress}`);
    return { success: true, method: "crypto", amount, fee: this.getFee(amount), currency: this.currency };
  }
  
  getFee(amount) {
    return amount * 0.01; // 1% fee
  }
}

// Polymorphic function
function processPayment(paymentMethod, amount) {
  console.log(`Processing payment of $${amount}`);
  const result = paymentMethod.process(amount);
  console.log(`Payment processed with fee: $${result.fee}`);
  return result;
}

const payments = [
  new CreditCardPayment("1234567812345678", "12/25", "123"),
  new PayPalPayment("user@example.com", "password123"),
  new CryptoPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "BTC")
];

// Same interface, different behaviors (polymorphism)
payments.forEach(payment => {
  const result = processPayment(payment, 100);
  console.log(`Result: ${result.method}, Fee: $${result.fee}`);
});

//! Polymorphism with Collections
class AnimalCollection {
  constructor(animals = []) {
    this.animals = animals;
  }
  
  addAnimal(animal) {
    this.animals.push(animal);
  }
  
  makeAllSounds() {
    return this.animals.map(animal => animal.speak());
  }
  
  feedAll(food) {
    return this.animals.map(animal => animal.eat(food));
  }
  
  // Polymorphic filtering
  filterByType(type) {
    return this.animals.filter(animal => animal.constructor.name === type);
  }
  
  // Sum of something polymorphic
  getTotalValue(property) {
    return this.animals.reduce((total, animal) => total + (animal[property] || 0), 0);
  }
}

/* ============================================================================
   COMPOSITION OVER INHERITANCE (Mixins)
   ============================================================================ */

//! Mixins for code reuse
const Flyable = {
  fly() {
    return `${this.name} is flying!`;
  },
  
  land() {
    return `${this.name} landed safely`;
  },
  
  getAltitude() {
    return this.altitude || 0;
  }
};

const Swimmable = {
  swim() {
    return `${this.name} is swimming!`;
  },
  
  dive(depth) {
    this.depth = depth;
    return `${this.name} dove to ${depth} meters`;
  }
};

const Walkable = {
  walk() {
    return `${this.name} is walking!`;
  },
  
  run(speed) {
    return `${this.name} runs at ${speed} km/h`;
  }
};

const Attackable = {
  attack(target) {
    return `${this.name} attacks ${target.name}`;
  },
  
  defend() {
    return `${this.name} defends`;
  }
};

// Class using multiple mixins
class Duck {
  constructor(name) {
    this.name = name;
    this.altitude = 0;
    this.depth = 0;
  }
  
  // Method overriding
  speak() {
    return "Quack! Quack!";
  }
}

// Apply mixins
Object.assign(Duck.prototype, Flyable, Swimmable, Walkable);

const donald = new Duck("Donald");
console.log(donald.fly());    // "Donald is flying!"
console.log(donald.swim());   // "Donald is swimming!"
console.log(donald.walk());   // "Donald is walking!"
console.log(donald.speak());  // "Quack! Quack!"

//! Advanced Mixin with State
const TimestampMixin = {
  getCreationTime() {
    if (!this._createdAt) this._createdAt = new Date();
    return this._createdAt;
  },
  
  getAge() {
    const now = new Date();
    const diff = now - this.getCreationTime();
    return Math.floor(diff / 1000); // seconds
  }
};

const SerializableMixin = {
  toJSON() {
    const props = {};
    for (let key in this) {
      if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
        props[key] = this[key];
      }
    }
    return props;
  },
  
  fromJSON(json) {
    Object.assign(this, JSON.parse(json));
    return this;
  }
};

class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }
}

Object.assign(GameObject.prototype, TimestampMixin, SerializableMixin);

/* ============================================================================
   REAL-WORLD OOP EXAMPLES
   ============================================================================ */

//! Example 1: Shopping Cart System
class ShoppingCart {
  #items = [];
  #discounts = [];
  
  addItem(item) {
    if (!item.id || !item.name || item.price <= 0) {
      throw new Error("Invalid item");
    }
    this.#items.push({ ...item, quantity: item.quantity || 1 });
    return this;
  }
  
  removeItem(itemId) {
    const index = this.#items.findIndex(item => item.id === itemId);
    if (index !== -1) this.#items.splice(index, 1);
    return this;
  }
  
  updateQuantity(itemId, quantity) {
    const item = this.#items.find(item => item.id === itemId);
    if (item) item.quantity = quantity;
    return this;
  }
  
  get subtotal() {
    return this.#items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  get tax() {
    return this.subtotal * 0.1; // 10% tax
  }
  
  get total() {
    let total = this.subtotal + this.tax;
    for (const discount of this.#discounts) {
      total = discount.apply(total);
    }
    return total;
  }
  
  applyDiscount(discount) {
    this.#discounts.push(discount);
    return this;
  }
  
  get items() {
    return [...this.#items]; // Return copy
  }
}

class Discount {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
  
  apply(amount) {
    switch (this.type) {
      case "percentage":
        return amount * (1 - this.value / 100);
      case "fixed":
        return Math.max(0, amount - this.value);
      default:
        return amount;
    }
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 })
    .addItem({ id: 2, name: "Mouse", price: 25, quantity: 2 })
    .applyDiscount(new Discount("percentage", 10));

console.log(`Total: $${cart.total}`); // Total with 10% discount

//! Example 2: Event Emitter System
class EventEmitter {
  #events = new Map();
  
  on(eventName, listener) {
    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, []);
    }
    this.#events.get(eventName).push(listener);
    
    // Return unsubscribe function
    return () => this.off(eventName, listener);
  }
  
  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    return this.on(eventName, onceWrapper);
  }
  
  off(eventName, listener) {
    if (!this.#events.has(eventName)) return;
    
    const listeners = this.#events.get(eventName);
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
    
    if (listeners.length === 0) {
      this.#events.delete(eventName);
    }
  }
  
  emit(eventName, ...args) {
    if (!this.#events.has(eventName)) return false;
    
    const listeners = [...this.#events.get(eventName)];
    for (const listener of listeners) {
      listener(...args);
    }
    return true;
  }
  
  removeAllListeners(eventName) {
    if (eventName) {
      this.#events.delete(eventName);
    } else {
      this.#events.clear();
    }
  }
  
  listenerCount(eventName) {
    return this.#events.get(eventName)?.length || 0;
  }
}

// Usage
class UserAction extends EventEmitter {
  constructor(user) {
    super();
    this.user = user;
  }
  
  login() {
    this.emit("login", this.user);
  }
  
  logout() {
    this.emit("logout", this.user);
  }
  
  performAction(action) {
    this.emit("action", this.user, action);
  }
}

const userActions = new UserAction({ id: 1, name: "Alice" });

userActions.on("login", (user) => {
  console.log(`${user.name} logged in`);
  // Log to analytics
});

userActions.once("action", (user, action) => {
  console.log(`${user.name} performed ${action} (first action only)`);
});

userActions.login();  // "Alice logged in"
userActions.performAction("click");  // "Alice performed click (first action only)"
userActions.performAction("scroll");  // No output (once removed listener)

/* ============================================================================
   PERFORMANCE COMPARISON
   ============================================================================ */

//! Prototype vs Class (Same under the hood)
console.time("Prototype");
function ProtoPerson(name) {
  this.name = name;
}
ProtoPerson.prototype.greet = function() {
  return `Hello ${this.name}`;
};
for (let i = 0; i < 100000; i++) {
  new ProtoPerson(`Person${i}`);
}
console.timeEnd("Prototype");

console.time("Class");
class ClassPerson {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello ${this.name}`;
  }
}
for (let i = 0; i < 100000; i++) {
  new ClassPerson(`Person${i}`);
}
console.timeEnd("Class");
// Both are essentially identical in performance

/* ============================================================================
   BEST PRACTICES & PRODUCTION TIPS
   ============================================================================ */

//! 1. Use private fields for true encapsulation
class SafeClass {
  #privateData = new Map();
  #secret = "hidden";
  
  constructor(data) {
    this.public = data;
    this.#privateData.set("key", data);
  }
}

//! 2. Favor composition over deep inheritance
// BAD: class UberEatsDriver extends Driver, DeliveryPerson, Rider, Employee
// GOOD: Use mixins or composition

//! 3. Use static factory methods for complex construction
class ComplexClass {
  static async createFromAPI(id) {
    const data = await fetch(`/api/${id}`);
    return new ComplexClass(data);
  }
  
  static createDefault() {
    return new ComplexClass({ default: true });
  }
}

//! 4. Make classes immutable where possible
class ImmutablePoint {
  #x;
  #y;
  
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  
  get x() { return this.#x; }
  get y() { return this.#y; }
  
  move(dx, dy) {
    return new ImmutablePoint(this.#x + dx, this.#y + dy);
  }
}

//! 5. Use getters/setters for validation
class ValidatedUser {
  #email;
  
  set email(value) {
    if (!value.includes('@')) throw new Error("Invalid email");
    this.#email = value;
  }
  
  get email() {
    return this.#email;
  }
}

/* ============================================================================
   QUICK REFERENCE TABLE
   ============================================================================ */

/*
| Feature              | Syntax                                          | When to Use                          |
|----------------------|-------------------------------------------------|--------------------------------------|
| Class declaration    | class MyClass {}                                | Creating objects with shared methods |
| Constructor          | constructor() {}                                | Initializing instance properties     |
| Instance method      | methodName() {}                                 | Behavior specific to instances       |
| Static method        | static methodName() {}                          | Utility functions, factories         |
| Private field        | #fieldName                                      | Truly private data                   |
| Getter               | get property() {}                               | Computed properties                  |
| Setter               | set property(value) {}                          | Validation on assignment             |
| Inheritance          | class Child extends Parent                      | IS-A relationship                    |
| Super call           | super() or super.method()                       | Access parent constructor/methods    |
| Abstract method      | throw new Error("Implement me")                 | Enforce method implementation        |
| Mixin                | Object.assign(Class.prototype, MixinObject)     | Code reuse (HAS-A)                   |
*/

/* ============================================================================
   INTERVIEW QUESTIONS & ANSWERS
   ============================================================================ */

/*
Q1: What's the difference between class and prototype syntax?
A: Class syntax is syntactic sugar over prototypes. Both create the same prototype
   chain structure, but classes provide cleaner syntax, enforce super() calls,
   and make inheritance clearer.

Q2: When should you use static methods?
A: For utility functions related to the class, factory methods, singleton access,
   or when the method doesn't need instance-specific data.

Q3: How do you achieve true encapsulation?
A: Using private fields (#), WeakMap, or closures. Private fields are the modern
   standard as of ES2022.

Q4: What's the difference between inheritance and composition?
A: Inheritance is "is-a" (Dog extends Animal), composition is "has-a" (Dog has a
   Legs object). Composition is often more flexible and preferred.

Q5: How does super() work?
A: super() calls the parent class constructor. Must be called before accessing
   'this' in derived class constructor. super.method() calls parent methods.

Q6: Can you have multiple inheritance?
A: No, JavaScript supports single inheritance. Use mixins or composition instead.

Q7: What are getters/setters good for?
A: Validation, computed properties, encapsulation, and maintaining internal state
   consistency.
*/