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
