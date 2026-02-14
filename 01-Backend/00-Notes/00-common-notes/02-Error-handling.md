Great 🔥 let’s learn **Error Handling in Express**.

https://expressjs.com/en/guide/error-handling.html <br>
https://www.geeksforgeeks.org/node-js/error-handling-in-express/

---


Perfect 👍 You’re learning Express error handling, so I’ll give you the **20% interview questions that cover 80% of what companies ask** (Pareto Principle).

I’ll keep answers:

* ✅ Short
* ✅ Practical
* ✅ With small code examples
* ✅ Focused on when & why

---

# 🔥 1. What is error handling in Express?

### ✅ Answer (Interview Style)

Error handling in Express is the process of catching and managing errors in routes and middleware to prevent the app from crashing and to send proper responses to the user.

---

# 🔥 2. How does Express identify error middleware?

### ✅ Key Concept (Very Important)

An error middleware **must have 4 parameters**:

```js
(err, req, res, next)
```

### Example:

```js
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});
```

👉 If it doesn’t have 4 parameters → Express won’t treat it as error middleware.

---

# 🔥 3. How do you throw an error in Express?

### ✅ Inside route

```js
app.get("/", (req, res) => {
  throw new Error("Something went wrong");
});
```

OR

```js
app.get("/", (req, res, next) => {
  next(new Error("Something went wrong"));
});
```

### 🎯 When to use what?

| Situation  | Use                 |
| ---------- | ------------------- |
| Sync code  | `throw new Error()` |
| Async code | `next(error)`       |

---

# 🔥 4. How do you handle async errors in Express?

### ❌ Problem

Express does NOT catch async errors automatically.

### ✅ Solution

```js
app.get("/async", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async Error"));
  } catch (err) {
    next(err);
  }
});
```

---

# 🔥 5. What are different types of errors in Express?

### 🎯 80% Important Types

1. **Operational Errors**

   * Invalid input
   * Not found
   * Validation error
   * Example: User not found

2. **Programmer Errors**

   * Undefined variable
   * Wrong logic
   * Bugs

3. **System Errors**

   * Database down
   * File system error

---

# 🔥 6. What is a custom error class?

### ✅ Why use it?

To control:

* Status code
* Error message
* Error type

### Example:

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
app.get("/user", (req, res, next) => {
  next(new AppError("User not found", 404));
});
```

---

# 🔥 7. Where should error middleware be placed?

### ✅ Always at the bottom

```js
app.use(errorHandler);
```

Why?
Because Express runs middleware in order.

---

# 🔥 8. What is the difference between `throw` and `next()`?

| throw           | next()                     |
| --------------- | -------------------------- |
| For sync errors | For async errors           |
| Stops execution | Passes error to middleware |

---

# 🔥 9. How do you send proper HTTP status codes?

### ❌ Wrong

```js
res.send("Error");
```

### ✅ Correct

```js
res.status(404).json({
  message: "Not Found"
});
```

Common status codes:

| Code | Meaning      |
| ---- | ------------ |
| 400  | Bad request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not found    |
| 500  | Server error |

---

# 🔥 10. What are common beginner mistakes?

### ❌ 1. Forgetting `return`

```js
if (!user) {
  res.status(404).json({ message: "Not found" });
}
// Code continues running ❌
```

### ✅ Fix

```js
if (!user) {
  return res.status(404).json({ message: "Not found" });
}
```

---

### ❌ 2. Not using try-catch in async

---

### ❌ 3. Placing error middleware above routes

---

### ❌ 4. Sending multiple responses

---

# 🔥 11. What is a global error handler?

It is one central middleware that handles all errors.

```js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message
  });
});
```

---

# 🔥 12. What is production vs development error handling?

### Development:

Show full error

```js
res.status(500).json({
  message: err.message,
  stack: err.stack
});
```

### Production:

Hide stack trace

```js
res.status(500).json({
  message: "Something went wrong"
});
```

---

# 🎯 Final 80/20 Summary (Memorize This for Interview)

1. Error middleware must have 4 params.
2. Use `throw` for sync.
3. Use `next(err)` for async.
4. Always place error middleware at bottom.
5. Use custom error class for better control.
6. Send proper status codes.
7. Use try-catch in async routes.

---

If you want, I can now:

* 🔥 Give you advanced-level interview questions
* 🔥 Give real-world project-level error handling structure
* 🔥 Create a complete production-ready error handler example
* 🔥 Take a mock interview for you

Tell me what level you want 😎


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
