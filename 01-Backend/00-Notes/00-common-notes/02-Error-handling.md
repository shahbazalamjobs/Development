Great 🔥 let’s learn **Error Handling in Express**.

https://expressjs.com/en/guide/error-handling.html

---


# 🚀 1️⃣ The 20% That Gives 80% Understanding

In Express, error handling mainly depends on just **4 core things**:

1. **throw new Error()**
2. **next(error)**
3. **Error-handling middleware**
4. **try–catch (for async/await)**

If you master these → you understand most of Express error handling.

---

# 🧠 2️⃣ Step 1: What Is an Error in Express?

An error is simply:

> Something unexpected happened and we cannot continue normally.

Example:

* Division by zero
* Database not connected
* User not found
* Invalid input

---

# 🧱 3️⃣ Step 2: Basic Synchronous Error (throw new Error)

### ✅ When to use?

When something is wrong **inside a route handler** (sync code).

```js
app.get('/divide', (req, res) => {
  const { a, b } = req.query;

  if (b == 0) {
    throw new Error('Division by zero not allowed');
  }

  res.send(a / b);
});
```

### 💡 Why?

* `throw` immediately stops execution.
* Express catches it automatically (if sync).

---

# 🔄 4️⃣ Step 3: Handling Errors with next(error)

If you want to manually pass error to middleware:

```js
app.get('/user/:id', (req, res, next) => {
  const user = null;

  if (!user) {
    return next(new Error('User not found'));
  }

  res.json(user);
});
```

### ✅ When to use?

* When you want centralized error handling
* When error happens inside condition

---

# 🧩 5️⃣ Step 4: The Most Important Part — Error Middleware

This is the heart of Express error handling.

⚠️ It MUST have 4 parameters.

```js
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: err.message
  });
});
```

### 🔥 Why 4 parameters?

Express identifies error middleware ONLY if:

```js
(err, req, res, next)
```

Without `err`, it becomes normal middleware.

---

# ⏳ 6️⃣ Step 5: Async Errors (Very Important)

Express does NOT automatically catch async errors.

❌ Wrong:

```js
app.get('/async', async (req, res) => {
  throw new Error('Async error'); // May crash app
});
```

✅ Correct:

```js
app.get('/async', async (req, res, next) => {
  try {
    throw new Error('Async error');
  } catch (error) {
    next(error);
  }
});
```

### 🧠 Why?

Because async functions return Promises.
Express doesn't catch rejected promises automatically (in basic setup).

---

# 🎯 7️⃣ Types of Errors (When to Use What)

## 1️⃣ Operational Errors (Expected Errors)

Examples:

* User not found
* Invalid password
* Validation failed

Use:

```js
return next(new Error('User not found'));
```

Better: Create custom error with status code.

---

## 2️⃣ Programming Errors (Bugs)

Examples:

* Undefined variable
* Wrong logic
* Typo in code

Use:

```js
throw new Error('Something broke');
```

These usually mean developer mistake.

---

## 3️⃣ Custom Errors (Best Practice)

Instead of plain Error, create your own:

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Use it:

```js
return next(new AppError('User not found', 404));
```

Error middleware:

```js
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message
  });
});
```

### ✅ Why use custom error?

* Control status code
* Cleaner API responses
* Professional structure

---

# 🏆 8️⃣ Best Practices (Very Important)

### ✔ Always use centralized error middleware

Do NOT send errors manually everywhere.

### ✔ Always return after next()

```js
return next(error);
```

Prevents running extra code.

### ✔ Use proper status codes

* 400 → Bad request
* 401 → Unauthorized
* 403 → Forbidden
* 404 → Not found
* 500 → Server error

### ✔ Hide stack trace in production

---

# ❌ 9️⃣ Common Beginner Mistakes

## ❌ 1. Forgetting `next`

```js
app.use((req, res) => {})  // No next
```

## ❌ 2. Not returning after next()

```js
next(error);
res.send("Still running"); // ❌
```

## ❌ 3. Not handling async errors

App crashes.

## ❌ 4. Writing error middleware at top

Error middleware should be at the bottom.

```js
// routes
app.use(routes);

// error middleware LAST
app.use((err, req, res, next) => {})
```

## ❌ 5. Using throw err

Wrong:

```js
throw err;
```

Correct:

```js
throw new Error('message');
```

---

# 🧠 Final Mental Model (Very Important)

Think like this:

```
Error happens
     ↓
throw OR next(error)
     ↓
Express sends it to
     ↓
Error middleware
     ↓
Client gets proper response
```

That’s the full system.

---

# 🎯 If You Master Just This:

* throw new Error()
* next(error)
* try-catch in async
* error middleware (4 params)
* custom AppError class

You already understand 80% of Express error handling.

---

If you want, next I can:

* Show real backend structure example (like your food delivery app)
* Or explain global error handling in production style (advanced level)


---

# 🚀 What is Error Handling?

👉 Error handling = managing errors without crashing the server.

Why?

* Prevent app crash
* Send proper response to user
* Log errors for debugging
* Keep app stable

---

# ⚙️ How Express Handles Errors (Simple Flow)

1. Error happens in route
2. Express catches it
3. Sends it to **error middleware**
4. Middleware sends response

If no custom handler → Express uses default one.

---

# 1️⃣ Default Error Handler (Built-in)

If you don’t write your own error handler, Express handles it automatically.

### Code:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  throw new Error("Something went wrong!");
});

app.listen(3000);
```

### What happens?

* Error is thrown
* Express catches it
* Sends `500 Internal Server Error`
* Server does NOT crash

✔ In development → shows error message
✔ In production → hides details

---

# 2️⃣ Custom Error-Handling Middleware (Most Important ⭐)

You can create your own error handler.

⚠️ Special syntax: it must have **4 parameters**

```js
(err, req, res, next)
```

### Code:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  throw new Error("Something broke!");
});

// Custom Error Middleware
app.use((err, req, res, next) => {
  console.log(err.message); // log error
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

app.listen(3000);
```

### Why use this?

✔ Log error
✔ Send clean JSON response
✔ Hide technical details

👉 This is what you should use in real projects.

---

# 3️⃣ Synchronous Error (Easy Case)

If error is thrown normally (not async), Express catches it automatically.

```js
app.get("/sync", (req, res) => {
  throw new Error("Sync error");
});
```

✔ No try-catch needed
✔ Express sends it to error middleware automatically

---

# 4️⃣ Asynchronous Error (Important ⚠️)

Express does NOT automatically catch async errors.

❌ This won’t work properly:

```js
app.get("/async", async (req, res) => {
  await Promise.reject(new Error("Async error"));
});
```

You must use **try-catch** and `next(err)`.

---

### Correct Way:

```js
app.get("/async", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async error"));
  } catch (err) {
    next(err); // send to error middleware
  }
});
```

👉 `next(err)` tells Express:
"Go to error handler."

---

# 5️⃣ Manually Passing Error (next(err))

You can manually create and send error.

```js
app.get("/manual", (req, res, next) => {
  const err = new Error("Manual error");
  next(err);
});
```

✔ Express skips normal middleware
✔ Directly goes to error middleware

---

# 🧠 Very Important Rules

✅ Error middleware must be LAST

```js
app.use(errorHandler);
```

✅ Must have 4 parameters

```js
(err, req, res, next)
```

✅ Use `next(err)` for async errors

---

# 🎯 Final 80/20 Summary

Most important things to remember:

1. Express has default error handler
2. Create custom error middleware
3. Sync errors → auto handled
4. Async errors → use try-catch + next(err)
5. Error middleware must be at the end

---

If you want, I can now explain this using a **real project structure (like your backend folder setup)** so it connects better with your learning 🚀


---


# 🎯 The 20% You Must Know

There are only **4 things** you really need to master:

1. **Throwing errors**
2. **Using `next(error)`**
3. **Error-handling middleware**
4. **Async error handling**

If you understand these, you understand 80% of Express error handling.

---

# 1️⃣ Throwing Errors (Basic)

You can throw errors manually.

```js
app.get('/divide', (req, res) => {
  const { a, b } = req.query;

  if (b == 0) {
    throw new Error('Division by zero not allowed');
  }

  res.send(a / b);
});
```

🚨 Problem: Express **won’t catch this properly** in async code.
So we use `next()`.

---

# 2️⃣ The Most Important Concept → `next(error)`

👉 If something goes wrong, pass the error to Express:

```js
app.get('/divide', (req, res, next) => {
  const { a, b } = req.query;

  if (b == 0) {
    return next(new Error('Division by zero not allowed'));
  }

  res.send(a / b);
});
```

✅ Now Express knows:

> “Okay, skip normal flow and go to error handler.”

This is the **core idea**.

---

# 3️⃣ Error Handling Middleware (The Heart)

This is the **most important 20% concept**.

Error middleware has **4 parameters**:

```js
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: err.message
  });
});
```

⚠️ MUST have 4 parameters:

```
(err, req, res, next)
```

If `err` is missing → it becomes normal middleware.

---

# 🔄 How Express Flows (Super Important)

Normal flow:

```
Request → Middleware → Route → Response
```

If error happens:

```
Request → Middleware → Route → next(error) → Error Middleware → Response
```

Once `next(error)` is called:
👉 Express skips all normal middleware
👉 Goes directly to error middleware

---

# 4️⃣ Async Error Handling (Where Beginners Struggle)

This **breaks beginners**.

❌ This will NOT work properly:

```js
app.get('/users', async (req, res) => {
  const users = await getUsers(); // if this fails?
  res.json(users);
});
```

If `getUsers()` throws error → Express won’t catch it.

---

## ✅ Correct Way (Try-Catch + next)

```js
app.get('/users', async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
```

That’s it.

---

# 🧠 80/20 Summary (Save This)

If you remember only this:

1. Use `next(error)` when something fails
2. Create one global error middleware at bottom
3. In async routes → use try/catch and call `next(error)`
4. Error middleware must have 4 parameters

You’re production-ready.

---

# 🏗️ Clean Real-World Structure (Food App Style)

Since you're building backend projects, structure it like this:

### errorMiddleware.js

```js
export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};
```

### app.js

```js
import { errorHandler } from './middlewares/errorMiddleware.js';

app.use(errorHandler); // always LAST
```

---

# 🚀 Pro Level (Extra 20%)

Create custom error class:

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Use it:

```js
return next(new AppError('User not found', 404));
```

Now your backend looks professional.

---

# 🎯 Final Mental Model

Think like this:

> "Whenever something breaks → send it to next(error) → global error middleware handles everything."

That’s Express error handling.

---

If you want, I can now:

* 🔥 Draw flow diagram
* 🔥 Connect this to your food delivery backend structure
* 🔥 Show production-ready folder structure

What do you want next?
