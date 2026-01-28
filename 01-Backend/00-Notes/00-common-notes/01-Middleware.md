
Other Notes: https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/

---

Got you 👍
I’ll explain **middleware** from **absolute basics → intermediate**, step-by-step, with **why / when / how**, and **real Express examples**.
No fluff. Think of this as how backend devs *actually* understand middleware.

---

# 1️⃣ What is Middleware? (Absolute Basics)

In **Express**, middleware is **just a function**.

👉 A function that sits **between**:

```
Request  ➜  Middleware(s)  ➜  Route Handler  ➜  Response
```

### Simple definition

> Middleware is a function that **runs before the final route handler** and has access to `req`, `res`, and `next`.

---

### Basic middleware function signature

```js
(req, res, next) => {
  // do something
}
```

* `req` → incoming request
* `res` → outgoing response
* `next()` → tells Express: *“I’m done, move to the next middleware”*

---

# 2️⃣ Why Middleware Exists (Very Important)

Without middleware, **every route would repeat the same logic**.

Middleware helps you:

* ✅ Log requests
* ✅ Authenticate users
* ✅ Validate data
* ✅ Handle errors
* ✅ Modify `req` / `res`
* ✅ Keep code **clean & reusable**

💡 **Rule of thumb**

> If logic is **common across routes**, it belongs in middleware.

---

# 3️⃣ Your First Middleware (Beginner)

### Example: Logger middleware

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next(); // move forward
};
```

### Use it

```js
app.use(logger);
```

📌 What happens?

* Every request passes through `logger`
* Then goes to the route

---

# 4️⃣ Understanding `next()` (MOST IMPORTANT)

### Think of middleware like a pipeline

```
Request
  ↓
Middleware 1
  ↓ next()
Middleware 2
  ↓ next()
Route Handler
  ↓
Response
```

### If you **DON’T call `next()`**

```js
app.use((req, res, next) => {
  console.log("Hello");
  // no next()
});
```

⛔ Request will **hang forever**
(because Express doesn’t know what to do next)

---

# 5️⃣ Middleware vs Route Handler

### Middleware

```js
(req, res, next) => { }
```

### Route handler

```js
(req, res) => { }
```

| Feature       | Middleware | Route Handler |
| ------------- | ---------- | ------------- |
| Uses `next()` | ✅ Yes      | ❌ No          |
| Ends response | Sometimes  | Always        |
| Reusable      | ✅ Yes      | ❌ No          |

---

# 6️⃣ Built-in Middleware (Beginner Level)

Express gives you middleware out of the box.

### 1️⃣ JSON body parser

```js
app.use(express.json());
```

Why?

* Reads JSON from request body
* Adds it to `req.body`

Without this:

```js
req.body === undefined
```

---

### 2️⃣ URL encoded data

```js
app.use(express.urlencoded({ extended: true }));
```

Used for:

* Forms
* `application/x-www-form-urlencoded`

---

# 7️⃣ Application-level Middleware

Runs for **every request**.

```js
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});
```

Later in route:

```js
app.get('/', (req, res) => {
  res.send(`Request took ${Date.now() - req.startTime}ms`);
});
```

💡 Middleware can **modify `req` & `res`**

---

# 8️⃣ Route-level Middleware (Intermediate)

Middleware that runs **only for specific routes**.

### Example: Auth middleware

```js
const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
```

### Use on route

```js
app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: "Welcome!" });
});
```

📌 Flow:

```
Request → isAuthenticated → route handler
```

---

# 9️⃣ Multiple Middleware in One Route

```js
app.post(
  '/order',
  validateOrder,
  checkStock,
  createOrder
);
```

Execution order:

1. `validateOrder`
2. `checkStock`
3. `createOrder`

Each must call `next()`.

---

# 🔟 Router-level Middleware (Very Important)

Used with `express.Router()`.

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log("User router middleware");
  next();
});

router.get('/users', (req, res) => {
  res.send("Users list");
});
```

Mounted like:

```js
app.use('/api', router);
```

Runs **only for `/api/*` routes**.

---

# 1️⃣1️⃣ Error-Handling Middleware (Intermediate)

Special middleware with **4 parameters**.

```js
(err, req, res, next) => {
  // error handler
}
```

### Example

```js
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Something went wrong"
  });
};
```

### Use it LAST

```js
app.use(errorHandler);
```

📌 Why last?

* Because it catches errors from **previous middleware/routes**

---

# 1️⃣2️⃣ Throwing Errors from Middleware

```js
const checkAge = (req, res, next) => {
  if (req.query.age < 18) {
    return next(new Error("Underage"));
  }
  next();
};
```

Express will send it to **error middleware**.

---

# 1️⃣3️⃣ Third-Party Middleware (Real World)

| Middleware           | Purpose                      |
| -------------------- | ---------------------------- |
| `morgan`             | HTTP logging                 |
| `cors`               | Enable cross-origin requests |
| `helmet`             | Security headers             |
| `express-rate-limit` | Rate limiting                |
| `multer`             | File uploads                 |

Example:

```js
import cors from 'cors';
app.use(cors());
```

---

# 1️⃣4️⃣ Middleware Execution Order (Interview Question ⚠️)

Order matters.

```js
app.use(m1);
app.use(m2);
app.get('/', handler);
```

Execution:

```
m1 → m2 → handler
```

📌 First defined → first executed

---

# 1️⃣5️⃣ When to Use Middleware (Golden Rules)

✅ Use middleware when:

* Logic is **common**
* Logic is **cross-cutting**
* Logic is **pre-processing**

❌ Don’t use middleware when:

* Logic is **route-specific only**
* It directly sends response always

---

# 🧠 Mental Model (Remember This)

> Middleware is **not magic**
> It’s just **functions executed in sequence**

```
(req, res) → function → function → function → response
```



---

# 🟢 BASIC LEVEL MIDDLEWARE

---

## 1️⃣ Basic Logger Middleware

📌 **Use case**: Understand request flow

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export default logger;
```

Usage:

```js
app.use(logger);
```

---

## 2️⃣ Request Time Middleware

📌 **Use case**: Modify `req`

```js
const requestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

export default requestTime;
```

Usage:

```js
app.use(requestTime);
```

---

## 3️⃣ Conditional Middleware

📌 **Use case**: Block request

```js
const blockGetRequests = (req, res, next) => {
  if (req.method === 'GET') {
    return res.status(403).send('GET requests blocked');
  }
  next();
};

export default blockGetRequests;
```

---

# 🟡 INTERMEDIATE LEVEL MIDDLEWARE

---

## 4️⃣ Route-level Middleware

📌 **Use case**: Protect routes

```js
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

export default isAuthenticated;
```

Usage:

```js
app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: 'Profile data' });
});
```

---

## 5️⃣ Query Validation Middleware

📌 **Use case**: Validate input

```js
const validatePageQuery = (req, res, next) => {
  const { page } = req.query;

  if (page && isNaN(page)) {
    return res.status(400).json({ message: 'Page must be a number' });
  }

  next();
};

export default validatePageQuery;
```

---

## 6️⃣ Body Validation Middleware

📌 **Use case**: Validate request body

```js
const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  next();
};

export default validateUser;
```

---

## 7️⃣ Multiple Middleware Chain

```js
app.post(
  '/users',
  validateUser,
  isAuthenticated,
  (req, res) => {
    res.json({ message: 'User created' });
  }
);
```

Execution order:

```
validateUser → isAuthenticated → handler
```

---

# 🔵 ADVANCED LEVEL MIDDLEWARE

---

## 8️⃣ Async Middleware with Error Handling

📌 **Problem**: Async errors don’t auto-catch

```js
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
```

Usage:

```js
app.get(
  '/data',
  asyncHandler(async (req, res) => {
    const data = await fetchData();
    res.json(data);
  })
);
```

---

## 9️⃣ Centralized Error Middleware

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
```

Usage (LAST):

```js
app.use(errorHandler);
```

---

## 🔟 Custom Error Class + Middleware

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
```

```js
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message
  });
};
```

Throw error:

```js
throw new AppError('User not found', 404);
```

---

## 1️⃣1️⃣ JWT Authentication Middleware

📌 **Real-world auth**

```js
import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticateJWT;
```

---

## 1️⃣2️⃣ Role-based Authorization Middleware

```js
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

export default authorizeRoles;
```

Usage:

```js
app.get(
  '/admin',
  authenticateJWT,
  authorizeRoles('admin'),
  (req, res) => {
    res.send('Admin panel');
  }
);
```

---

## 1️⃣3️⃣ Rate Limiting Middleware (Custom)

```js
const requestCounts = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;

  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > 100) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  next();
};

export default rateLimiter;
```

---

## 1️⃣4️⃣ File Upload Middleware (Multer)

```js
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 1024 * 1024 }
});

export default upload;
```

Usage:

```js
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded');
});
```

---

# 🧠 MASTER TIP (Very Important)

👉 Middleware should be:

* Small
* Single-responsibility
* Reusable

❌ Don’t:

* Write business logic in middleware
* Send response everywhere

---
