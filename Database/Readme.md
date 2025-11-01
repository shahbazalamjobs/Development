

## 🧩 1. **Database Fundamentals (must know)**

*(Foundational questions + simple coding tasks)*

* What is a **database**, **table**, **row**, **column**
* **Primary key**, **Foreign key**, **Unique key**
* **Data types** (INTEGER, SERIAL, VARCHAR, TEXT, BOOLEAN, DATE, JSONB)
* **NULL vs NOT NULL**
* **DEFAULT** values
* **Constraints**: `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `DEFAULT`

---

## ⚙️ 2. **SQL Basics (most asked in coding rounds)**

* CRUD operations: `SELECT`, `INSERT`, `UPDATE`, `DELETE`
* Filtering: `WHERE`, `AND`, `OR`, `IN`, `BETWEEN`, `LIKE`, `ILIKE`
* Sorting: `ORDER BY`
* Limiting results: `LIMIT`, `OFFSET` (for pagination)
* Aliases: `AS` (column/table alias)
* `DISTINCT` and removing duplicates

---

## 🔗 3. **Joins (Top 3 most frequently asked area)**

*(Used heavily in real projects and interviews)*

* `INNER JOIN`
* `LEFT JOIN`
* `RIGHT JOIN`
* `FULL OUTER JOIN`
* Joining **multiple tables**
* Join on **foreign keys**
* Difference between **INNER JOIN** and **LEFT JOIN**

👉 Example interview question:

> Get all users with their total number of orders (even if they have none).

---

## 📊 4. **Aggregations & Grouping**

*(Always tested in SQL query questions)*

* Aggregate functions: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`
* `GROUP BY`
* `HAVING` (difference from `WHERE`)
* Combining joins + aggregates (most common in tasks)

👉 Example:

> Find total sales per user where total > 1000.

---

## 🧱 5. **Database Relationships**

*(Backend interviews often test data modeling)*

* One-to-One, One-to-Many, Many-to-Many
* Setting up **foreign keys**
* Cascade delete/update (`ON DELETE CASCADE`)
* Example schema: `users`, `posts`, `comments`, `orders`, etc.

👉 Common question:

> Design a DB schema for users and their posts/comments.

---

## ⚡ 6. **Indexes & Query Optimization (important after 1 year exp)**

* What is an **index** and why it improves query speed
* **B-tree** index (default)
* When indexes **don’t help** (e.g. small tables, low selectivity)
* `EXPLAIN` and `EXPLAIN ANALYZE` basics
* Avoiding `SELECT *`

👉 Typical question:

> How do you find why a query is slow and how to optimize it?

---

## 🧠 7. **Transactions & ACID**

*(Every backend dev must understand this conceptually)*

* What are **Transactions**
* Commands: `BEGIN`, `COMMIT`, `ROLLBACK`
* **ACID properties**
* Example: order placement with multiple steps
* Concept of **rollback on failure**

👉 Interview question:

> Why use transactions in backend operations like payments?

---

## 💾 8. **Constraints & Data Integrity**

* `NOT NULL`, `UNIQUE`, `CHECK`
* Foreign key constraint behavior
* Preventing bad data via constraints

---

## 🧩 9. **Subqueries & CTEs**

*(Common in mid-level SQL questions)*

* Subqueries in `WHERE` and `FROM`
* **Common Table Expressions (CTEs)** using `WITH`
* Example:

  ```sql
  WITH total_orders AS (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
  )
  SELECT u.name, t.order_count
  FROM users u
  JOIN total_orders t ON u.id = t.user_id;
  ```

---

## 🔐 10. **Security & SQL Injection Prevention**

* Why **parameterized queries** are important
* Don’t use string concatenation in SQL
* Roles & privileges (basic understanding)

---

## 🧰 11. **JSON & JSONB (Frequently asked in modern projects)**

* Difference between `json` and `jsonb`
* Access operators: `->`, `->>`, `#>`
* Filtering JSON data using `@>`
* Use case: store metadata, user preferences, settings

👉 Example question:

> Query users where `settings->>'theme' = 'dark'`

---

## 🔄 12. **Database Design & Normalization**

* **1NF**, **2NF**, **3NF** (and why denormalization sometimes needed)
* Real-world schema design for simple app (users, orders, products)
* Importance of relationships + indexes

---

## 🚀 13. **Backend Integration Concepts**

* Using PostgreSQL with Node.js (`pg` or ORM like Prisma/Sequelize/Knex)
* **Connection pooling**
* **Environment variables** for DB connection (`.env`)
* Handling errors & async queries
* Using **transactions in code**

👉 Example:

> How do you handle DB connection failures in your Node backend?

---

## 🔍 Optional but Nice-to-Know (bonus for strong impression)

* **Views** and **Materialized Views**
* **Triggers** (basic awareness)
* **Stored Procedures / Functions** for reusable logic
* **Migrations** (with ORM tools)
* **Backup / Restore** (`pg_dump`, `pg_restore`)

---

## 🧭 TL;DR — 80/20 PostgreSQL Interview Core Topics

✅ SQL CRUD & filtering
✅ Joins (Inner, Left, Full)
✅ Group By + Having
✅ Relationships & Foreign Keys
✅ Indexing & Performance basics
✅ Transactions + ACID
✅ Constraints + Data integrity
✅ Subqueries & CTEs
✅ JSONB usage
✅ Node.js integration with PostgreSQL

---

# SQL Joins - Most Frequently Asked in Interviews

## Understanding Table Relationships

**Sample Tables for Examples:**
```sql
-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INTEGER,
    manager_id INTEGER
);

-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    budget DECIMAL(12,2)
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    department_id INTEGER
);

-- Sample Data
INSERT INTO departments (id, name, budget) VALUES 
(1, 'Engineering', 1000000),
(2, 'Sales', 500000),
(3, 'Marketing', 300000);

INSERT INTO employees (id, name, department_id, manager_id) VALUES 
(1, 'John Doe', 1, NULL),
(2, 'Jane Smith', 1, 1),
(3, 'Bob Wilson', 2, NULL),
(4, 'Alice Brown', 2, 3),
(5, 'Charlie Davis', NULL, NULL);

INSERT INTO projects (id, name, department_id) VALUES
(1, 'Website Redesign', 1),
(2, 'Mobile App', 1),
(3, 'Sales Portal', 2),
(4, 'Market Research', NULL);
```

## INNER JOIN

**Explanation:** Returns only the rows that have matching values in both tables. This is the most commonly used join.

```sql
-- Basic INNER JOIN
SELECT 
    e.name AS employee_name,
    d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Result: Only employees with departments and departments with employees
-- John Doe - Engineering
-- Jane Smith - Engineering  
-- Bob Wilson - Sales
-- Alice Brown - Sales
-- (Charlie Davis is excluded - no department)
-- (Marketing department is excluded - no employees)
```

**Venn Diagram Concept:**
```
Employees    Departments
   [John]        [Eng]
   [Jane]        [Sales] 
   [Bob]         [Marketing]
   [Alice]
   [Charlie]
   
INNER JOIN Result: [John-Eng], [Jane-Eng], [Bob-Sales], [Alice-Sales]
```

## LEFT JOIN (LEFT OUTER JOIN)

**Explanation:** Returns all rows from the left table, and matched rows from the right table. If no match, NULL values from right table.

```sql
-- LEFT JOIN - All employees, with department if exists
SELECT 
    e.name AS employee_name,
    d.name AS department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

-- Result:
-- John Doe - Engineering
-- Jane Smith - Engineering
-- Bob Wilson - Sales
-- Alice Brown - Sales
-- Charlie Davis - NULL (included from left table)
-- (Marketing department not included - not in left table)
```

**When to use LEFT JOIN:**
- When you want all records from main table, with optional related data
- Finding records that DON'T have relationships (using WHERE IS NULL)

```sql
-- Employees without departments
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;  -- Returns: Charlie Davis
```

## RIGHT JOIN (RIGHT OUTER JOIN)

**Explanation:** Returns all rows from the right table, and matched rows from the left table. If no match, NULL values from left table.

```sql
-- RIGHT JOIN - All departments, with employees if exist
SELECT 
    e.name AS employee_name,
    d.name AS department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- Result:
-- John Doe - Engineering
-- Jane Smith - Engineering
-- Bob Wilson - Sales
-- Alice Brown - Sales
-- NULL - Marketing (included from right table)
-- (Charlie Davis not included - not in right table)
```

**When to use RIGHT JOIN:**
- Less common than LEFT JOIN
- When you want all records from the "lookup" table
- Finding departments without employees

```sql
-- Departments without employees
SELECT d.name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id
WHERE e.id IS NULL;  -- Returns: Marketing
```

## FULL OUTER JOIN

**Explanation:** Returns all rows when there's a match in either table. Combines LEFT and RIGHT JOIN results.

```sql
-- FULL OUTER JOIN - All employees AND all departments
SELECT 
    e.name AS employee_name,
    d.name AS department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- Result:
-- John Doe - Engineering
-- Jane Smith - Engineering
-- Bob Wilson - Sales
-- Alice Brown - Sales
-- Charlie Davis - NULL (from employees)
-- NULL - Marketing (from departments)
```

**Use Cases for FULL OUTER JOIN:**
- Complete picture of both tables
- Finding orphaned records in both tables

```sql
-- Find all records without matches in either table
SELECT 
    e.name AS employee_name,
    d.name AS department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id
WHERE e.id IS NULL OR d.id IS NULL;
-- Returns: Charlie Davis (no department) and Marketing (no employees)
```

## Joining Multiple Tables

**Explanation:** You can chain multiple joins in a single query.

```sql
-- Employees + Departments + Projects
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    p.name AS project_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN projects p ON d.id = p.department_id;

-- Result: Employees working on projects in their department
```

**Complex Multiple Join Example:**
```sql
-- Employees with their managers and departments
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    m.name AS manager_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;  -- Self-join on same table
```

## Join on Foreign Keys

**Explanation:** Most joins use foreign key relationships, but you can join on any related columns.

```sql
-- Standard foreign key join
SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id;  -- Foreign key relationship

-- Non-foreign key joins (less common but possible)
SELECT e1.name AS employee, e2.name AS colleague
FROM employees e1
JOIN employees e2 ON e1.department_id = e2.department_id 
                  AND e1.id != e2.id;  -- Same department but different people
```

## Key Differences: INNER JOIN vs LEFT JOIN

### **INNER JOIN**
- Returns ONLY matching rows from both tables
- More restrictive
- Default choice for most queries
- Better performance usually

### **LEFT JOIN** 
- Returns ALL rows from left table
- NULLs for non-matching right table rows
- Use when you need "optional" related data
- Use to find "orphaned" records

### **Visual Comparison:**
```
Table A: [1, 2, 3, 4]
Table B: [3, 4, 5, 6]

INNER JOIN ON id: [3, 4]  (only matches)
LEFT JOIN A ON B: [1-null, 2-null, 3-3, 4-4]  (all from A)
RIGHT JOIN A ON B: [3-3, 4-4, null-5, null-6]  (all from B)
FULL OUTER JOIN: [1-null, 2-null, 3-3, 4-4, null-5, null-6]
```

## Real-World Interview Scenarios

### **Scenario 1: E-commerce Analysis**
```sql
-- Customers and their orders (including customers with no orders)
SELECT 
    c.customer_name,
    o.order_date,
    o.total_amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
ORDER BY c.customer_name, o.order_date DESC;
```

### **Scenario 2: Employee Hierarchy**
```sql
-- Employees with their manager names
SELECT 
    e.name AS employee_name,
    e.salary,
    m.name AS manager_name,
    d.name AS department_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id  -- Self-join for manager
LEFT JOIN departments d ON e.department_id = d.id;
```

### **Scenario 3: Finding Gaps in Data**
```sql
-- Products that have never been ordered
SELECT p.product_name
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;
```

## Common Interview Questions & Solutions

### **Question 1: "Find departments with no employees"**
```sql
-- Solution 1: Using RIGHT JOIN
SELECT d.name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id
WHERE e.id IS NULL;

-- Solution 2: Using NOT EXISTS (often more efficient)
SELECT name FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.id
);
```

### **Question 2: "Find employees without managers"**
```sql
SELECT name 
FROM employees 
WHERE manager_id IS NULL;
```

### **Question 3: "Get count of employees per department, including departments with zero employees"**
```sql
SELECT 
    d.name AS department_name,
    COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;
```

### **Question 4: "Find duplicate records using self-join"**
```sql
SELECT a.id, a.email, a.name
FROM users a
JOIN users b ON a.email = b.email AND a.id < b.id;  -- Finds duplicates
```

## Performance Tips

1. **Use INNER JOIN** when you only need matching records
2. **Add indexes** on foreign key columns
3. **Be careful with OR conditions** in JOIN clauses
4. **Use WHERE IS NULL** with LEFT JOIN to find missing relationships
5. **Avoid SELECT *** in joins - specify only needed columns

## Key Takeaways for Interviews

1. **INNER JOIN**: "Give me only what matches in both tables"
2. **LEFT JOIN**: "Give me everything from left, with matches from right if available"  
3. **RIGHT JOIN**: "Give me everything from right, with matches from left if available"
4. **FULL OUTER JOIN**: "Give me everything from both tables"
5. **Multiple Joins**: Chain them logically based on relationships
6. **Foreign Keys**: Natural join points, but not required for joins to work




----
