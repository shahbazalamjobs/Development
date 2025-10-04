# Complete Node.js/Express API Refactoring & Enhancement Guide

## Project Structure
```
project/
├── routes/
│   ├── index.js
│   ├── users.js
│   └── products.js
├── controllers/
│   ├── userController.js
│   └── productController.js
├── middleware/
│   ├── errorHandler.js
│   └── rateLimiter.js
├── utils/
│   └── fakeDb.js
├── tests/
│   └── app.test.js
├── app.js
├── server.js
└── package.json
```

---

## 1. Refactor Routes into Separate Files

### `controllers/userController.js`
```javascript
const { fakeDbQuery } = require('../utils/fakeDb');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await fakeDbQuery('users');
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

// Get single user
exports.getUserById = async (req, res, next) => {
  try {
    const user = await fakeDbQuery('user', req.params.id);
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await fakeDbQuery('create', req.body);
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await fakeDbQuery('update', req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await fakeDbQuery('delete', req.params.id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

### `controllers/productController.js`
```javascript
const { fakeDbQuery } = require('../utils/fakeDb');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await fakeDbQuery('products');
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await fakeDbQuery('product', req.params.id);
    
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await fakeDbQuery('create', req.body);
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};
```

### `routes/users.js`
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// All routes here are prefixed with /api/users

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

### `routes/products.js`
```javascript
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// All routes here are prefixed with /api/products

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);

module.exports = router;
```

### `routes/index.js`
```javascript
const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const productRoutes = require('./products');

// Mount route modules
router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
```

---

## 2. Centralized Error Handling Middleware

### `middleware/errorHandler.js`
```javascript
/**
 * Centralized error handling middleware
 * Must be placed AFTER all routes in app.js
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
      // Only send stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
```

---

## 3. Simulate Database Delays with setTimeout & Async/Try-Catch

### `utils/fakeDb.js`
```javascript
/**
 * Simulates database operations with delays and random failures
 */

// Fake data store
const fakeData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ],
  products: [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 399 }
  ]
};

/**
 * Simulates a database query with delay
 * @param {string} operation - Type of operation (users, user, products, product, create, update, delete)
 * @param {any} param - Additional parameter (id or data)
 * @returns {Promise} - Resolves with data or rejects with error
 */
const fakeDbQuery = (operation, param, data) => {
  return new Promise((resolve, reject) => {
    // Simulate network/database delay (500ms - 2000ms)
    const delay = Math.random() * 1500 + 500;

    setTimeout(() => {
      // Simulate random database failures (10% chance)
      if (Math.random() < 0.1) {
        const error = new Error('Database connection failed');
        error.statusCode = 503;
        return reject(error);
      }

      // Handle different operations
      switch (operation) {
        case 'users':
          resolve(fakeData.users);
          break;

        case 'user':
          const user = fakeData.users.find(u => u.id === parseInt(param));
          resolve(user);
          break;

        case 'products':
          resolve(fakeData.products);
          break;

        case 'product':
          const product = fakeData.products.find(p => p.id === parseInt(param));
          resolve(product);
          break;

        case 'create':
          const newId = Math.max(...fakeData.users.map(u => u.id)) + 1;
          const newItem = { id: newId, ...param };
          fakeData.users.push(newItem);
          resolve(newItem);
          break;

        case 'update':
          const index = fakeData.users.findIndex(u => u.id === parseInt(param));
          if (index !== -1) {
            fakeData.users[index] = { ...fakeData.users[index], ...data };
            resolve(fakeData.users[index]);
          } else {
            const error = new Error('User not found');
            error.statusCode = 404;
            reject(error);
          }
          break;

        case 'delete':
          const deleteIndex = fakeData.users.findIndex(u => u.id === parseInt(param));
          if (deleteIndex !== -1) {
            fakeData.users.splice(deleteIndex, 1);
            resolve({ message: 'Deleted successfully' });
          } else {
            const error = new Error('User not found');
            error.statusCode = 404;
            reject(error);
          }
          break;

        default:
          reject(new Error('Invalid operation'));
      }
    }, delay);
  });
};

module.exports = { fakeDbQuery };
```

---

## 4. Custom Rate-Limiting Middleware

### `middleware/rateLimiter.js`
```javascript
/**
 * Custom rate limiting middleware
 * Limits requests per IP address to prevent abuse
 */

// Store for tracking requests per IP
const requestStore = {};

/**
 * Rate limiter configuration
 */
const WINDOW_MS = 60000; // 1 minute window
const MAX_REQUESTS = 10;  // Max 10 requests per minute

/**
 * Rate limiting middleware
 */
const rateLimiter = (req, res, next) => {
  // Get client IP address
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  // Initialize request tracking for this IP if not exists
  if (!requestStore[ip]) {
    requestStore[ip] = [];
  }

  // Remove old requests outside the time window
  requestStore[ip] = requestStore[ip].filter(timestamp => {
    return now - timestamp < WINDOW_MS;
  });

  // Check if request limit exceeded
  if (requestStore[ip].length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: {
        message: 'Too many requests. Please try again later.',
        statusCode: 429,
        retryAfter: Math.ceil(WINDOW_MS / 1000) // seconds
      }
    });
  }

  // Add current request timestamp
  requestStore[ip].push(now);

  // Add rate limit info to response headers
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - requestStore[ip].length);
  res.setHeader('X-RateLimit-Reset', new Date(now + WINDOW_MS).toISOString());

  next();
};

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  Object.keys(requestStore).forEach(ip => {
    requestStore[ip] = requestStore[ip].filter(timestamp => {
      return now - timestamp < WINDOW_MS;
    });
    // Remove IP if no recent requests
    if (requestStore[ip].length === 0) {
      delete requestStore[ip];
    }
  });
}, 5 * 60000);

module.exports = rateLimiter;
```

---

## 5. Health Check Route

### Added to `app.js` (shown in full app.js below)
```javascript
// Track server start time for uptime calculation
const startTime = Date.now();

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000); // in seconds
  
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: uptime,
    uptimeFormatted: formatUptime(uptime),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
```

---

## 6. Test for 404 on Unknown Routes

### `tests/app.test.js`
```javascript
const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  
  // Test 404 handler for unknown routes
  describe('404 Handler', () => {
    it('should return 404 for GET request to unknown route', async () => {
      const response = await request(app)
        .get('/api/nonexistent-route');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toHaveProperty('message');
      expect(response.body.error.message).toContain('Not Found');
    });

    it('should return 404 for POST request to unknown route', async () => {
      const response = await request(app)
        .post('/api/unknown')
        .send({ data: 'test' });
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it('should return 404 for any HTTP method on unknown route', async () => {
      const response = await request(app)
        .delete('/random/path/here');
      
      expect(response.status).toBe(404);
    });
  });

  // Test health check endpoint
  describe('Health Check', () => {
    it('should return 200 and health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Test rate limiting
  describe('Rate Limiting', () => {
    it('should allow requests under the limit', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).not.toBe(429);
    });

    it('should block requests exceeding rate limit', async () => {
      // Make multiple rapid requests
      const requests = [];
      for (let i = 0; i < 12; i++) {
        requests.push(request(app).get('/api/users'));
      }
      
      const responses = await Promise.all(requests);
      const blocked = responses.some(r => r.status === 429);
      
      expect(blocked).toBe(true);
    }, 10000); // Increase timeout for this test
  });

  // Test user routes
  describe('User Routes', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/api/users');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get user by id', async () => {
      const response = await request(app).get('/api/users/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  // Test error handling
  describe('Error Handling', () => {
    it('should handle errors gracefully', async () => {
      // This might trigger the random 10% database failure
      const response = await request(app).get('/api/users');
      
      if (response.status === 503) {
        expect(response.body.success).toBe(false);
        expect(response.body.error).toHaveProperty('message');
      } else {
        expect(response.status).toBe(200);
      }
    });
  });

});
```

---

## Complete `app.js`

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import custom middleware
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const apiRoutes = require('./routes');

// Track server start time for health check
const startTime = Date.now();

// Apply rate limiting to all routes
app.use(rateLimiter);

// Health check endpoint (before rate limiting to ensure monitoring works)
app.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: uptime,
    uptimeFormatted: formatUptime(uptime),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

// Mount API routes
app.use('/api', apiRoutes);

// 404 handler - Must be after all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} Not Found`,
      statusCode: 404
    }
  });
});

// Error handling middleware - Must be last
app.use(errorHandler);

module.exports = app;
```

---

## `server.js`

```javascript
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
```

---

## `package.json`

```json
{
  "name": "express-api-refactored",
  "version": "1.0.0",
  "description": "Refactored Express API with best practices",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --coverage --verbose",
    "test:watch": "jest --watch"
  },
  "keywords": ["express", "api", "nodejs"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "nodemon": "^2.0.22",
    "supertest": "^6.3.3"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"]
  }
}
```

---

## Installation & Running

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

---

## Testing the API

```bash
# Health check
curl http://localhost:3000/health

# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"New User","email":"new@example.com"}'

# Test 404
curl http://localhost:3000/api/nonexistent

# Test rate limiting (run this 12 times quickly)
for i in {1..12}; do curl http://localhost:3000/api/users; done
```

---

## Key Takeaways

1. **Separation of Concerns**: Routes define endpoints, controllers handle logic
2. **Error Handling**: Centralized middleware catches all errors consistently
3. **Async/Await**: Always use try/catch and pass errors to next()
4. **Rate Limiting**: Protect API from abuse with request limits
5. **Health Checks**: Essential for monitoring and DevOps
6. **Testing**: Separate app export from server startup for testability
7. **Modular Structure**: Easy to maintain and scale
