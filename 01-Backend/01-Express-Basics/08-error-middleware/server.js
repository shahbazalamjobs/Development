// server.js
import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// 🧠 In-memory "database"
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];

// ------------------- CRUD ROUTES -------------------

// ➕ Create user
app.post("/api/users", (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            const err = new Error("Name and email are required");
            err.status = 400;
            throw err;
        }

        const newUser = { id: Date.now(), name, email };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
});

// 📋 Get all users
app.get("/api/users", (req, res, next) => {
    try {
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// 🔍 Get one user by ID
app.get("/api/users/:id", (req, res, next) => {
    try {
        const user = users.find((u) => u.id === parseInt(req.params.id));
        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// ✏️ Update user
app.put("/api/users/:id", (req, res, next) => {
    try {
        const user = users.find((u) => u.id === parseInt(req.params.id));
        if (!user) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        const { name, email } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;

        res.json(user);
    } catch (err) {
        next(err);
    }
});

// ❌ Delete user
app.delete("/api/users/:id", (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const index = users.findIndex((u) => u.id === userId);

        if (index === -1) {
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        users.splice(index, 1);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
});

// ------------------- ERROR HANDLER -------------------

// Custom error-handling middleware
app.use((err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || "Internal Server Error",
    });
});

// -----------------------------------------------------

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/api/users`);
});
