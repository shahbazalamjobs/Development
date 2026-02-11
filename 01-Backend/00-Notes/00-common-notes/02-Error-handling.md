Great 🔥 let’s learn **Error Handling in Express**.

https://expressjs.com/en/guide/error-handling.html

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
