Perfect 👍
I’ll give you **middleware code examples from BASIC → ADVANCED**, exactly how backend devs grow.
Each example includes **what it does, when to use it, and the code**.

All examples use **ES modules (`import`)** and **Express**.

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
