# Express Server Learning Tasks - Notes

## 1. Create Simple Express Server with 'Hello World'
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
**Key points:**
- Import express and create app instance
- Define GET route for root path '/'
- Use `res.send()` to send response
- Start server with `app.listen()`

---

## 2. Add JSON Routes for /about and /contact
```javascript
app.get('/about', (req, res) => {
  res.json({ message: 'About page' });
});

app.get('/contact', (req, res) => {
  res.json({ message: 'Contact page' });
});
```
**Key points:**
- Use `res.json()` to automatically send JSON responses
- Sets `Content-Type: application/json` header automatically
- Object gets stringified automatically

---

## 3. Log Request Details (Method, URL, Time)
```javascript
// Middleware to log all requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Important! Pass control to next middleware/route
});
```
**Key points:**
- Use middleware with `app.use()`
- Place BEFORE your routes to catch all requests
- `req.method` - GET, POST, etc.
- `req.url` - the path requested
- Must call `next()` to continue to route handlers

---

## 4. Serve Static Files with express.static()
```javascript
const path = require('path');

// Serve files from 'public' directory
app.use(express.static('public'));

// Or with absolute path:
app.use(express.static(path.join(__dirname, 'public')));
```
**Folder structure:**
```
project/
  ├── server.js
  └── public/
      ├── index.html
      ├── styles.css
      └── script.js
```
**Key points:**
- Files in `public/` folder accessible directly
- `public/index.html` → `http://localhost:3000/index.html`
- Index files served at directory root
- Place static middleware before custom routes

---

## 5. Experiment with HTTP Status Codes
```javascript
// 404 Not Found
app.get('/missing', (req, res) => {
  res.status(404).send('Not Found');
});

// 201 Created
app.post('/create', (req, res) => {
  res.status(201).json({ message: 'Resource created' });
});

// 500 Server Error
app.get('/error', (req, res) => {
  res.status(500).send('Internal Server Error');
});

// Catch-all 404 (place at end)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});
```
**Common status codes:**
- 200 - OK (default)
- 201 - Created
- 404 - Not Found
- 500 - Internal Server Error
- 400 - Bad Request
- 403 - Forbidden

---

## 6. Send Custom Headers
```javascript
app.get('/custom-headers', (req, res) => {
  res.set('X-Powered-By', 'NodeJS');
  res.set('X-Custom-Header', 'My Value');
  res.send('Check response headers');
});

// Or set multiple at once:
app.get('/headers', (req, res) => {
  res.set({
    'X-Powered-By': 'NodeJS',
    'X-Author': 'Your Name',
    'X-Version': '1.0.0'
  });
  res.json({ message: 'Custom headers sent' });
});
```
**Key points:**
- Use `res.set(header, value)` for single header
- Use `res.set(object)` for multiple headers
- 'X-' prefix for custom non-standard headers
- Headers must be set BEFORE sending response

---

## Complete Example Server
```javascript
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2. Static files
app.use(express.static(path.join(__dirname, 'public')));

// 3. Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/about', (req, res) => {
  res.json({ message: 'About page' });
});

app.get('/contact', (req, res) => {
  res.json({ message: 'Contact page' });
});

// 4. Custom headers example
app.get('/headers', (req, res) => {
  res.set('X-Powered-By', 'NodeJS');
  res.json({ message: 'Check the headers!' });
});

// 5. 404 catch-all (must be last)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```





# Express CRUD API - Notes

## 1. Setup & Dependencies
```bash
npm init -y
npm install express dotenv
```

**Project structure:**
```
project/
  ├── server.js
  ├── .env
  ├── package.json
  └── node_modules/
```

---

## 2. Create .env File for Configuration
```env
PORT=3000
NODE_ENV=development
```

**Load in server.js:**
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
```

**Key points:**
- Must call `config()` at the very top of your file
- Access variables via `process.env.VARIABLE_NAME`
- Add `.env` to `.gitignore` (never commit secrets!)

---

## 3. In-Memory User Storage
```javascript
// In-memory database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextId = 3; // Counter for generating new IDs
```

**Key points:**
- Simple array to store users
- Data resets when server restarts
- Track next available ID manually

---

## 4. Middleware Setup
```javascript
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

**Key points:**
- `express.json()` is REQUIRED to parse JSON request bodies
- Must come before your routes

---

## 5. GET /api/users - Get All Users
```javascript
app.get('/api/users', (req, res) => {
  res.json(users);
});
```

**Response example:**
```json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
]
```

---

## 6. GET /api/users/:id - Get User by ID
```javascript
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});
```

**Key points:**
- `req.params.id` is always a string - convert with `parseInt()`
- Return 404 if user doesn't exist
- Use `return` to prevent further execution

---

## 7. POST /api/users - Create New User
```javascript
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // Validation: check required fields
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Validation: check if email already exists
  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  // Create new user
  const newUser = {
    id: nextId++,
    name,
    email
  };
  
  users.push(newUser);
  
  // Return 201 Created with the new user
  res.status(201).json(newUser);
});
```

**Test with curl:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
```

**Key points:**
- Status 201 = "Created" (not 200)
- Validate before creating
- Check for duplicate emails
- Return the created resource

---

## 8. PUT /api/users/:id - Update User
```javascript
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Validation: check if email exists for another user
  if (email) {
    const emailExists = users.find(u => u.email === email && u.id !== id);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  }
  
  // Update user
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  res.json(users[userIndex]);
});
```

**Test with curl:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'
```

**Key points:**
- Use `findIndex()` to get array position
- Check email doesn't belong to different user
- Allow partial updates (only update provided fields)
- Return updated user

---

## 9. DELETE /api/users/:id - Delete User
```javascript
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({ message: 'User deleted', user: deletedUser });
});
```

**Test with curl:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

**Key points:**
- `splice()` removes and returns deleted element
- Return confirmation message
- Could use 204 No Content (no response body) instead

---

## 10. Error Handling Middleware
```javascript
// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
```

**Using error handling in routes:**
```javascript
app.get('/api/users/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const err = new Error('Invalid ID format');
      err.status = 400;
      return next(err); // Pass to error handler
    }
    
    const user = users.find(u => u.id === id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

**Key points:**
- Error middleware has 4 parameters: `(err, req, res, next)`
- Must be defined AFTER all routes
- Use `next(err)` to pass errors to error handler
- 404 handler catches undefined routes

---

## 11. HTTP Status Codes Summary

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE (no response body) |
| 400 | Bad Request | Validation errors, missing fields |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email/resource conflict |
| 500 | Internal Server Error | Unexpected server errors |

---

## 12. Complete Server Example

```javascript
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
let nextId = 3;

// Routes

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: nextId++,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  if (email) {
    const emailExists = users.find(u => u.email === email && u.id !== id);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  }
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'User deleted', user: deletedUser });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 13. Testing Your API

**Using curl:**
```bash
# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","email":"bob@example.com"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

**Or use Postman/Insomnia/Thunder Client for easier testing!**
