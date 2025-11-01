
## Core Database Components

### **Database**
**Explanation:** A database is like a digital filing cabinet that stores related data in an organized way. It's a collection of structured information that can be easily accessed, managed, and updated.

**Why important:** Without a database, data would be stored in disorganized files, making it hard to find and manage information efficiently.

```sql
CREATE DATABASE company;
-- Creates a container called "company" to hold all our business data
```

### **Table**
**Explanation:** A table is like a spreadsheet within your database. It has columns (fields) and rows (records) that store specific types of information.

**Why important:** Tables organize data into logical groups. For example, you'd have separate tables for employees, products, and orders rather than mixing everything together.

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    hire_date DATE DEFAULT CURRENT_DATE
);
-- Creates a structured format to store employee information
```

### **Row (Record)**
**Explanation:** A row is a single, complete entry in a table. It represents one instance of whatever the table stores (like one employee, one product, etc.).

**Why important:** Rows allow you to store individual pieces of data while keeping them organized with all related information together.

```sql
INSERT INTO employees (name, email) VALUES ('John Doe', 'john@email.com');
-- Creates one row representing John Doe as an employee
```

### **Column (Field)**
**Explanation:** A column defines a specific piece of information that every row in the table will have. All values in a column are the same data type.

**Why important:** Columns ensure consistency - every employee has a name, every product has a price, etc.

```sql
SELECT name FROM employees;  -- 'name' is a column
-- Returns all values from the name column for every employee
```

## Keys - The Relationships

### **Primary Key**
**Explanation:** A primary key is a unique identifier for each row in a table. Think of it like a social security number for your data - no two rows can have the same primary key.

**Why important:** 
- Uniquely identifies each record
- Enables fast searching and sorting
- Required for creating relationships between tables

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,  -- This ensures each product has a unique ID
    product_name VARCHAR(100)
);
-- Even if two products have the same name, they'll have different product_id values
```

### **Foreign Key**
**Explanation:** A foreign key creates a link between two tables. It's a column that references the primary key of another table, creating a relationship.

**Why important:**
- Maintains referential integrity (can't reference non-existent records)
- Enforces logical relationships between tables
- Prevents orphaned records

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),  -- Links to products table
    quantity INTEGER
);
-- This ensures every order must be for a product that actually exists
```

### **Unique Key**
**Explanation:** A unique key ensures that all values in a column are different from each other, but unlike a primary key, it can allow NULL values and you can have multiple unique keys.

**Why important:**
- Prevents duplicate entries in specific columns
- Useful for fields like email, username, phone numbers
- Multiple unique constraints can exist per table

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,    -- No two users can have same username
    email VARCHAR(255) UNIQUE       -- No two users can have same email
);
-- username and email must be unique, but either could be NULL
```

## Data Types - Defining What Data Can Be Stored

### **INTEGER**
**Explanation:** Stores whole numbers without decimal points.
```sql
age INTEGER  -- Can store values like 25, -10, 1000
```

### **SERIAL**
**Explanation:** An auto-incrementing integer that automatically generates sequential numbers.
```sql
id SERIAL PRIMARY KEY  -- Database automatically assigns 1, 2, 3, etc.
```

### **VARCHAR(n)**
**Explanation:** Variable-length text with a maximum character limit.
```sql
name VARCHAR(100)  -- Can store up to 100 characters
```

### **TEXT**
**Explanation:** Variable-length text without a predefined limit.
```sql
description TEXT  -- Good for long descriptions, comments, articles
```

### **BOOLEAN**
**Explanation:** Stores true/false values.
```sql
is_active BOOLEAN  -- Can be TRUE, FALSE, or NULL
```

### **DATE**
**Explanation:** Stores calendar dates without time information.
```sql
birth_date DATE  -- Stores like '1990-05-15'
```

### **JSONB**
**Explanation:** Stores JSON data in binary format for efficient querying.
```sql
metadata JSONB  -- Good for flexible, schema-less data
```

## NULL vs NOT NULL - Handling Missing Data

### **NULL**
**Explanation:** NULL represents missing, unknown, or not applicable data. It's not zero or empty string - it's the absence of a value.

**When to use:** For optional fields where data might not be available.
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    middle_name VARCHAR(50) NULL  -- Not everyone has a middle name
);
```

### **NOT NULL**
**Explanation:** Forces a column to always have a value. The database will reject any attempt to insert NULL in these columns.

**When to use:** For required fields that must always contain data.
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,  -- Everyone must have a first name
    last_name VARCHAR(50) NOT NULL
);
```

## DEFAULT Values - Smart Defaults

**Explanation:** DEFAULT provides a value when no value is specified during insertion. This ensures columns always have sensible values.

**Why important:**
- Reduces the need to specify common values
- Ensures consistency
- Handles common scenarios automatically

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE,  -- Automatically uses today's date
    status VARCHAR(20) DEFAULT 'pending',  -- New orders are pending by default
    priority INTEGER DEFAULT 1             -- Default priority is 1
);
```

## Constraints - Data Quality Enforcers

### **PRIMARY KEY Constraint**
**Explanation:** Enforces uniqueness and prevents NULL values for the primary key.
```sql
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,  -- No duplicates, no NULLs allowed
    name VARCHAR(100)
);
```

### **FOREIGN KEY Constraint**
**Explanation:** Ensures that a value exists in the referenced table, maintaining data integrity.
```sql
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),  -- Must be valid student
    course_id INTEGER
);
```

### **UNIQUE Constraint**
**Explanation:** Prevents duplicate values in a column while allowing NULLs.
```sql
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_code VARCHAR(10) UNIQUE,  -- No two departments can have same code
    dept_name VARCHAR(100)
);
```

### **CHECK Constraint**
**Explanation:** Validates data against a specific condition before allowing insertion.
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    age INTEGER CHECK (age >= 18),      -- Must be adult
    salary DECIMAL CHECK (salary > 0)   -- Salary must be positive
);
```

### **DEFAULT Constraint**
**Explanation:** Provides automatic values when none are specified.
```sql
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),      -- Auto-set to current time
    is_completed BOOLEAN DEFAULT FALSE       -- New tasks are incomplete
);
```

## Complete Practical Example

```sql
-- Authors table: Stores information about book authors
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,           -- Unique ID for each author
    name VARCHAR(100) NOT NULL,             -- Author name is required
    email VARCHAR(255) UNIQUE NOT NULL,     -- Email must be unique and required
    birth_date DATE,                        -- Birth date is optional (can be NULL)
    is_active BOOLEAN DEFAULT TRUE          -- Defaults to active author
);

-- Books table: Stores information about books with relationships to authors
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,            -- Book title is required
    author_id INTEGER REFERENCES authors(author_id),  -- Links to authors table
    isbn VARCHAR(13) UNIQUE NOT NULL,       -- ISBN must be unique
    publication_year INTEGER CHECK (publication_year > 1500), -- Valid year check
    price DECIMAL(10,2) DEFAULT 0.00,       -- Free by default
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Auto-set creation time
);
```

## Why These Concepts Matter

1. **Data Integrity**: Constraints prevent invalid data from entering your database
2. **Relationships**: Keys create logical connections between related data
3. **Consistency**: Data types and constraints ensure uniform data quality
4. **Efficiency**: Proper structure enables fast queries and operations
5. **Maintainability**: Organized data is easier to understand and modify

These foundational concepts work together to create robust, reliable database systems that can scale and maintain data quality over time.



---



# SQL Basics - Essential for Coding Interviews

## CRUD Operations

### **SELECT** - Reading Data
**Explanation:** Retrieves data from one or more tables. This is the most fundamental SQL operation.

```sql
-- Basic SELECT
SELECT * FROM employees;  -- Get all columns from employees table

-- Selecting specific columns
SELECT name, email, salary FROM employees;

-- With expressions
SELECT name, salary, salary * 1.1 AS increased_salary FROM employees;
```

### **INSERT** - Adding New Data
**Explanation:** Adds new rows to a table.

```sql
-- Insert single row
INSERT INTO employees (name, email, salary, hire_date) 
VALUES ('John Doe', 'john@email.com', 50000, '2023-01-15');

-- Insert multiple rows
INSERT INTO employees (name, email, salary) 
VALUES 
    ('Jane Smith', 'jane@email.com', 60000),
    ('Bob Wilson', 'bob@email.com', 55000);

-- Insert with default values
INSERT INTO employees (name, email) VALUES ('Alice Brown', 'alice@email.com');
```

### **UPDATE** - Modifying Existing Data
**Explanation:** Modifies existing rows in a table.

```sql
-- Update all rows (be careful!)
UPDATE employees SET salary = salary * 1.05;

-- Update specific rows
UPDATE employees 
SET salary = 65000, department = 'Engineering' 
WHERE name = 'John Doe';

-- Update with conditions
UPDATE employees 
SET salary = salary * 1.10 
WHERE department = 'Sales' AND hire_date < '2020-01-01';
```

### **DELETE** - Removing Data
**Explanation:** Removes rows from a table.

```sql
-- Delete specific rows
DELETE FROM employees WHERE id = 5;

-- Delete with conditions
DELETE FROM employees 
WHERE department = 'Temp' AND hire_date < '2022-01-01';

-- Delete all rows (DANGEROUS!)
DELETE FROM employees;  -- Removes all data but keeps table structure
```

## Filtering with WHERE Clause

### **Basic WHERE**
```sql
SELECT * FROM employees WHERE salary > 50000;
```

### **AND / OR Operators**
```sql
-- AND: Both conditions must be true
SELECT * FROM employees 
WHERE department = 'Engineering' AND salary > 70000;

-- OR: Either condition can be true
SELECT * FROM employees 
WHERE department = 'Sales' OR department = 'Marketing';

-- Combining AND/OR with parentheses
SELECT * FROM employees 
WHERE (department = 'Engineering' OR department = 'IT') 
AND salary > 60000;
```

### **IN Operator**
**Explanation:** Checks if a value matches any value in a list.

```sql
-- Multiple OR conditions simplified
SELECT * FROM employees 
WHERE department IN ('Sales', 'Marketing', 'HR');

-- With subquery
SELECT * FROM employees 
WHERE department IN (SELECT name FROM departments WHERE active = true);

-- NOT IN
SELECT * FROM employees 
WHERE department NOT IN ('Temp', 'Intern');
```

### **BETWEEN Operator**
**Explanation:** Checks if a value is within a range (inclusive).

```sql
-- Numeric range
SELECT * FROM employees 
WHERE salary BETWEEN 40000 AND 80000;

-- Date range
SELECT * FROM employees 
WHERE hire_date BETWEEN '2020-01-01' AND '2023-12-31';

-- NOT BETWEEN
SELECT * FROM employees 
WHERE salary NOT BETWEEN 30000 AND 50000;
```

### **LIKE and ILIKE Operators**
**Explanation:** Pattern matching in strings. LIKE is case-sensitive, ILIKE is case-insensitive.

```sql
-- % matches any sequence of characters
SELECT * FROM employees WHERE name LIKE 'J%';  -- Names starting with J
SELECT * FROM employees WHERE email LIKE '%@gmail.com';  -- Gmail addresses

-- _ matches exactly one character
SELECT * FROM employees WHERE name LIKE 'J_n';  -- Jen, Jon, Jan, etc.

-- ILIKE (case-insensitive)
SELECT * FROM employees WHERE name ILIKE 'john%';  -- John, john, JOHN, etc.

-- Complex patterns
SELECT * FROM employees 
WHERE name LIKE 'A%e' OR name LIKE 'B%n';
```

## Sorting with ORDER BY

### **Basic Sorting**
```sql
-- Single column ascending (ASC is default)
SELECT * FROM employees ORDER BY name;
SELECT * FROM employees ORDER BY name ASC;

-- Single column descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees 
ORDER BY department ASC, salary DESC;  -- Sort by department, then by salary high to low

-- Using column positions
SELECT name, department, salary FROM employees 
ORDER BY 2, 3 DESC;  -- Sort by 2nd column (department), then 3rd (salary)
```

## Limiting Results

### **LIMIT**
**Explanation:** Restricts the number of rows returned.

```sql
-- Get top 10 highest paid employees
SELECT * FROM employees 
ORDER BY salary DESC 
LIMIT 10;

-- With WHERE clause
SELECT * FROM employees 
WHERE department = 'Engineering' 
ORDER BY hire_date 
LIMIT 5;
```

### **OFFSET**
**Explanation:** Skips a specified number of rows before returning results.

```sql
-- Pagination: Get rows 11-20
SELECT * FROM employees 
ORDER BY name 
LIMIT 10 OFFSET 10;  -- Skip first 10, get next 10

-- Common pagination pattern
SELECT * FROM employees 
ORDER BY id 
LIMIT 10 OFFSET 20;  -- Page 3 (rows 21-30)
```

### **Pagination Formula**
```sql
-- For page number P with page size S:
-- LIMIT S OFFSET (P-1)*S

-- Example: Page 4 with 25 records per page
SELECT * FROM employees 
ORDER BY name 
LIMIT 25 OFFSET 75;  -- (4-1)*25 = 75
```

## Aliases with AS

### **Column Aliases**
**Explanation:** Give temporary names to columns in the result set.

```sql
-- Basic column aliases
SELECT 
    name AS employee_name,
    salary AS annual_salary,
    salary/12 AS monthly_salary
FROM employees;

-- Without AS keyword (also works)
SELECT 
    name employee_name,
    salary annual_salary
FROM employees;

-- Aliases with expressions
SELECT 
    name,
    salary,
    (salary * 1.1) AS projected_salary,
    CONCAT(name, ' - ', department) AS employee_info
FROM employees;
```

### **Table Aliases**
**Explanation:** Give temporary names to tables, especially useful in joins.

```sql
-- Single table alias
SELECT e.name, e.department, e.salary 
FROM employees AS e
WHERE e.salary > 50000;

-- Without AS keyword
SELECT e.name, e.department
FROM employees e
WHERE e.department = 'Engineering';
```

## DISTINCT - Removing Duplicates

### **Basic DISTINCT**
```sql
-- Get unique departments
SELECT DISTINCT department FROM employees;

-- Get unique combinations
SELECT DISTINCT department, location FROM employees;

-- COUNT of distinct values
SELECT COUNT(DISTINCT department) FROM employees;
```

### **DISTINCT vs GROUP BY**
```sql
-- These are often equivalent:
SELECT DISTINCT department FROM employees;
SELECT department FROM employees GROUP BY department;

-- But DISTINCT works on entire rows, GROUP BY can aggregate
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department;  -- Can't do this with DISTINCT
```

## Practical Examples Combining Concepts

### **Complex Query Example**
```sql
-- "Get the top 5 highest paid active employees in Engineering or IT departments, 
-- showing their name, email, and monthly salary, sorted by salary descending"
SELECT 
    name AS employee_name,
    email AS contact_email,
    salary/12 AS monthly_salary,
    department
FROM employees
WHERE 
    department IN ('Engineering', 'IT')
    AND active = true
    AND salary IS NOT NULL
ORDER BY salary DESC
LIMIT 5;
```

### **Pagination for UI**
```sql
-- Common pattern for web applications
SELECT 
    id,
    name,
    email,
    department,
    salary
FROM employees
WHERE 
    department = 'Sales'
    AND hire_date >= '2020-01-01'
ORDER BY name ASC
LIMIT 20 OFFSET 40;  -- Page 3 with 20 records per page
```

### **Data Analysis Queries**
```sql
-- Unique values analysis
SELECT 
    COUNT(*) AS total_employees,
    COUNT(DISTINCT department) AS unique_departments,
    COUNT(DISTINCT location) AS unique_locations
FROM employees;

-- Pattern matching for data cleanup
SELECT 
    name,
    email
FROM employees
WHERE email NOT LIKE '%@%.%'  -- Find invalid email patterns
   OR name LIKE '% % %';       -- Names with more than 2 spaces
```

## Common Interview Patterns

1. **Filtering and Sorting**: WHERE + ORDER BY + LIMIT
2. **Pagination**: LIMIT + OFFSET
3. **Data Quality**: DISTINCT + COUNT for uniqueness checks
4. **Pattern Matching**: LIKE/ILIKE for text searches
5. **Range Queries**: BETWEEN for dates and numbers

These SQL basics form the foundation for 80% of real-world database queries and are essential for technical interviews. Practice combining these concepts to solve complex data retrieval problems efficiently.



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

---

