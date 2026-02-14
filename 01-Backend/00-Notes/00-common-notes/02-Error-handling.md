Great 🔥 let’s learn **Error Handling in Express**.

https://expressjs.com/en/guide/error-handling.html
https://www.geeksforgeeks.org/node-js/error-handling-in-express/

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

Perfect 👍 let’s understand **how error handler works in Express.js** step-by-step for different types of errors.

I’ll keep it simple and practical (backend mindset 🚀).

---

# 🧠 First: How Express Error Flow Works

### Normal Flow:

```
Request → Middleware → Route → Response
```

### If Error Happens:

```
Request → Route → next(err) → Error Middleware → Response
```

👉 When Express sees `next(err)` OR a thrown error,
it **skips all normal middleware** and jumps directly to:

```js
app.use((err, req, res, next) => {})
```

That’s the core idea.

---

# 1️⃣ Default Error Handler (Built-in)

If you don’t create your own error middleware:

```js
app.get("/", (req, res) => {
  throw new Error("Something broke!");
});
```

### What happens internally?

1. Error is thrown
2. Express catches it
3. Sends `500 Internal Server Error`
4. Server doesn’t crash

✔ In development → shows stack trace
✔ In production → hides details

You didn’t write any error handler — Express did it for you.

---

# 2️⃣ Custom Error Middleware (Most Important ⭐)

You create your own handler like this:

```js
app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(500).json({
    success: false,
    message: err.message
  });
});
```

### How it works:

1. Error happens
2. Express finds middleware with **4 parameters**
3. It sends error to that function
4. You control the response

⚠️ Important: Must be written **after all routes**

---

# 3️⃣ Synchronous Errors (Automatic Catch)

Example:

```js
app.get("/sync", (req, res) => {
  throw new Error("Sync error");
});
```

### Why this works automatically?

Because Express wraps route handlers in try-catch internally.

So:

* Error is thrown
* Express catches it
* Sends to error middleware

No need for `next()` manually.

---

# 4️⃣ Asynchronous Errors (Manual Handling Needed ⚠️)

Example (Wrong way):

```js
app.get("/async", async (req, res) => {
  await Promise.reject(new Error("Async error"));
});
```

❌ Express will NOT catch this automatically.

Why?

Because async errors happen **after the function returns**.

---

### Correct Way:

```js
app.get("/async", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async error"));
  } catch (err) {
    next(err);
  }
});
```

### What happens now?

1. Error happens inside async
2. catch block runs
3. `next(err)` sends it to error middleware
4. Error middleware responds

---

# 5️⃣ Manual Error Using next(err)

You can directly pass error:

```js
app.get("/manual", (req, res, next) => {
  next(new Error("Manual error"));
});
```

### What happens?

* Express skips normal middleware
* Goes directly to error middleware
* Sends response

---

# 6️⃣ 404 Errors (Not Found)

404 is special.

It’s NOT a thrown error.

It happens when no route matches.

You handle it like this:

```js
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found"
  });
});
```

Place this BEFORE error middleware.

---

# 🔥 Complete Real Flow Example

```js
const express = require("express");
const app = express();

// Route
app.get("/", (req, res) => {
  throw new Error("Something went wrong");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
});

app.listen(3000);
```

---

# 🎯 Types of Error Handling in Express

| Type          | Auto Handled? | Needs next(err)?       |
| ------------- | ------------- | ---------------------- |
| Default Error | Yes           | No                     |
| Sync Error    | Yes           | No                     |
| Async Error   | ❌ No          | ✅ Yes                  |
| Manual Error  | No            | ✅ Yes                  |
| 404 Error     | No            | No (custom middleware) |

---

# 🚀 Final Big Picture

Error handler works like a **safety net**:

* Sync errors → Express catches automatically
* Async errors → You must pass with `next(err)`
* Error middleware → Handles all errors in one place
* Must be last middleware

---



Perfect 👍 Let’s learn **Error Handling using Pareto Principle (20% concepts = 80% understanding)**

I’ll give you a **progressive list of common error-handling codes**
👉 From basic → intermediate → advanced

---

# 🟢 LEVEL 1 — Basic (Must Know – 80% Use Cases)

---

## 1️⃣ Basic Synchronous Error

```js
app.get('/', (req, res) => {
  throw new Error('Something broke!');
});
```

✔ Express catches automatically
✔ Goes to default error handler

---

## 2️⃣ Basic Custom Error Middleware

```js
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});
```

⚠ Must be last
⚠ Must have 4 parameters

---

## 3️⃣ Async Error (Callback Style)

```js
app.get('/', (req, res, next) => {
  fs.readFile('file.txt', (err, data) => {
    if (err) return next(err);
    res.send(data);
  });
});
```

✔ Async → must use `next(err)`

---

## 4️⃣ Async/Await Error (Most Common Today)

```js
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
```

---

# 🟡 LEVEL 2 — Clean & Structured (Professional Way)

---

## 5️⃣ Create Custom Error Class

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Usage:

```js
app.get('/user/:id', (req, res, next) => {
  const user = null;

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.json(user);
});
```

---

## 6️⃣ Global Error Handler (Production Style)

```js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});
```

✔ Centralized error handling
✔ Clean structure

---

## 7️⃣ Async Wrapper (Avoid Try/Catch Everywhere)

Instead of writing try/catch every time:

```js
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

Use it:

```js
app.get('/user/:id',
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
  })
);
```

✔ Cleaner code
✔ Professional pattern

---

# 🔴 LEVEL 3 — Advanced / Real-World Patterns

---

## 8️⃣ Handle 404 Route Not Found

```js
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
```

✔ Always before error middleware

---

## 9️⃣ Different Error for Development vs Production

```js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(statusCode).json({
      message: err.message || 'Something went wrong'
    });
  }
});
```

✔ Hide stack in production

---

## 🔟 Handling Headers Already Sent

```js
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ message: err.message });
});
```

✔ Prevent crash during streaming

---

# 🧠 Most Important Concepts (Pareto 20%)

If you master these 5 things, you understand 80%:

1. `throw new Error()`
2. `next(err)`
3. Error middleware (4 parameters)
4. Async errors need manual forwarding
5. Centralized global error handler

---

# 🔥 Simple Error Flow (Very Important)

```
Route runs
   ↓
Error happens
   ↓
next(err)
   ↓
Skip normal middleware
   ↓
Global error middleware
   ↓
Response sent
```

---

# 🚀 Real-World Simple Structure (Best Practice)

```js
// 1. Routes
app.use('/api/users', userRoutes);

// 2. 404 Handler
app.all('*', (req, res, next) => {
  next(new AppError('Route not found', 404));
});

// 3. Global Error Handler
app.use(globalErrorHandler);
```

---

# 🎯 Summary

| Level        | What You Learn                    |
| ------------ | --------------------------------- |
| Basic        | throw, next(err), default handler |
| Intermediate | Custom error class, async wrapper |
| Advanced     | 404 handler, production handling  |

---
