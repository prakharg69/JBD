// What is JavaScript?
// JavaScript is a high-level, interpreted, dynamically-typed programming language originally created in 1995 by Brendan Eich at Netscape. It was designed to make web pages interactive. Today it's one of the most widely used languages in the world — running in browsers, servers, mobile apps, and even IoT devices.
// Key characteristics: it is single-threaded, event-driven, and uses a prototype-based object model.



// JavaScript in Backend Development
// With the arrival of Node.js in 2009, JavaScript escaped the browser. Now you can write server-side code — handling HTTP requests, connecting to databases (MongoDB, PostgreSQL), building REST/GraphQL APIs — all in JavaScript. Frameworks like Express.js, Fastify, and NestJS power this. This made JavaScript a true full-stack language


// Browser JavaScript

// JavaScript was originally built only for the browser. Its first job was to make HTML pages interactive.
// The browser provides a JS engine (like V8 in Chrome, SpiderMonkey in Firefox) that actually reads and executes your code.
// On top of the engine, the browser gives extra Web APIs — these are NOT part of the JS language itself, but are provided by the browser:

// document / DOM — lets JS read and change HTML elements
// window — the global object; everything lives on it (window.alert, window.fetch, etc.)
// setTimeout, setInterval — timers
// fetch / XMLHttpRequest — network requests
// localStorage, sessionStorage — store data in the browser
// navigator — info about the user's browser/device
// location — current URL, navigation
// The Event Loop is what makes JS non-blocking. When you do setTimeout(fn, 1000), the browser handles the timer. After 1 second it pushes fn to the callback queue. The event loop checks if the call stack is empty, and if so, moves fn in.
// JS in the browser is sandboxed — it cannot access your file system, OS, or hardware directly (for security reasons).
// The BOM (Browser Object Model) gives access to browser-level things like history, screen size, and the URL bar.



// JavaScript Runtime 

// A JavaScript Runtime is any environment that can run JS code outside the browser. Node.js (2009) was the first major one. Others include Deno and Bun.
// Node.js takes the same V8 engine from Chrome and wraps it with server-side capabilities.
// Node.js adds its own APIs (not available in browsers):

// fs — read/write files on disk
// http / https — create HTTP servers
// path — handle file paths
// os — info about the operating system
// process — current process info, env variables (process.env)
// child_process — run shell commands
// crypto — encryption/hashing


// The power of Node.js comes from libuv — a C library that handles asynchronous I/O. When you read a file or make a network call, libuv delegates the work to the OS (or its thread pool) and notifies Node when it's done. This is why Node is non-blocking even though JS is single-threaded.
// The thread pool (4 threads by default) handles operations the OS can't do async natively, like file system tasks and DNS lookups.
// Node has no window object, no document, no DOM — those are purely browser things.
// Node uses either CommonJS (require('fs')) or ES Modules (import fs from 'fs') for organizing code.
// The npm (Node Package Manager) ecosystem has over 2 million packages, making Node extremely powerful for building anything from web servers to CLI tools.


// How the JS Runtime works 
// Call Stack — where your code actually runs. One thing at a time. When a function is called it gets pushed on top; when it finishes it pops off.
// Web APIs / Node APIs — the environment (browser or Node.js) handles things JS can't do natively: timers, network requests, file reads. JS just hands the task off and moves on.
// Callback Queue — a waiting room. When an async task finishes (timer fires, fetch returns), its callback is placed here.
// Event Loop — a simple, never-stopping loop that checks: "Is the call stack empty? Is there a callback waiting?" — if yes to both, it moves the callback onto the stack.

// Why does "2: End" print before "3: Hello from timeout"?
// Because setTimeout doesn't pause JS. It hands the timer to the browser and JS immediately continues running the next line. JS is single-threaded — it can only do one thing at a time, so it never waits.
// The golden rule:

// Synchronous code always finishes first. Async callbacks only run after the call stack is completely empty.

// This is why you can call setTimeout(fn, 0) and fn will still run after all your current code, even with a 0ms delay — the stack must be empty first.



// ECMAScript Overview
// ECMAScript (ES) is the official specification/standard that defines how JavaScript should work. It's maintained by ECMA International (Technical Committee 39 / TC39).
// Major milestones:

// ES5 (2009) — strict mode, JSON, Array.forEach
// ES6 / ES2015 — let, const, arrow functions, classes, promises, modules (import/export), template literals
// ES2017 — async/await
// ES2020+ — optional chaining ?., nullish coalescing ??, BigInt
// ES2024 — ongoing yearly releases


// Think of ECMAScript as the rulebook and JavaScript as the implementation of that rulebook.