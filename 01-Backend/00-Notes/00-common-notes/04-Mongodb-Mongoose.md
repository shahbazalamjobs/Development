
---

# 1. What is MongoDB

**MongoDB**

MongoDB is a **NoSQL database** that stores data as **documents (JSON-like objects)**.

Example document:

```json
{
  "title": "Learn MongoDB",
  "completed": false
}
```

Instead of tables (like SQL), MongoDB uses:

| SQL      | MongoDB    |
| -------- | ---------- |
| Database | Database   |
| Table    | Collection |
| Row      | Document   |
| Column   | Field      |

Example:

```
Database: taskDB
Collection: tasks
Document:
{
  title: "Learn MongoDB",
  completed: false
}
```

---

# 2. What is Mongoose

**Mongoose**

Mongoose is a **library that helps Node.js interact with MongoDB easily**.

It provides:

* Schema
* Validation
* Models
* Query helpers
* Middleware

Think of it like:

```
Node.js  →  Mongoose  →  MongoDB
```

---

# 3. Install Packages

```bash
npm install mongoose
```

---

# 4. Connect MongoDB with Node.js

```js
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/taskDB")
.then(() => {
  console.log("Database connected");
})
.catch((err) => {
  console.log(err);
});
```

Explanation:

```
mongodb://127.0.0.1:27017 → database server
taskDB → database name
```

If database does not exist → MongoDB creates it automatically.

---

# 5. Mongoose Schema

A **schema defines the structure of your document**.

```js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});
```

Meaning:

```
title → String
completed → Boolean
```

---

# 6. Mongoose Model

Model is used to **interact with the database**.

```js
const Task = mongoose.model("Task", taskSchema);
```

Now `Task` can:

```
create
read
update
delete
```

---

# 7. Create Data (Insert)

```js
const task = new Task({
  title: "Learn MongoDB",
  completed: false
});

await task.save();
```

OR

```js
await Task.create({
  title: "Learn Mongoose",
  completed: false
});
```

---

# 8. Read Data

### Get all tasks

```js
const tasks = await Task.find();
```

### Get one task

```js
const task = await Task.findById(id);
```

---

# 9. Update Data

```js
await Task.findByIdAndUpdate(id, {
  completed: true
});
```

---

# 10. Delete Data

```js
await Task.findByIdAndDelete(id);
```

---

# 11. Schema with Validations

Example:

```js
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
```

Meaning:

| Option     | Meaning                      |
| ---------- | ---------------------------- |
| required   | field must exist             |
| trim       | removes extra spaces         |
| default    | default value                |
| timestamps | adds createdAt and updatedAt |

---

# 12. Example Document Created

```json
{
  "_id": "65657f1a23c91",
  "title": "Learn MongoDB",
  "completed": false,
  "createdAt": "2026-03-06T10:10:00",
  "updatedAt": "2026-03-06T10:10:00"
}
```

---

# 13. Typical Backend Structure

```
project
│
├── config
│    └── db.js
│
├── models
│    └── Task.js
│
├── controllers
│    └── taskController.js
│
├── routes
│    └── taskRoutes.js
│
└── server.js
```

---

# 14. Full Flow

```
Client Request
      ↓
Express Route
      ↓
Controller
      ↓
Mongoose Model
      ↓
MongoDB Database
```

---

✅ **In short**

MongoDB → database
Mongoose → tool to interact with MongoDB
Schema → structure of document
Model → used to query database

---
