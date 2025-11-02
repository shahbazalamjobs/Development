
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



--- 


# Database Relationships & Data Modeling

## Types of Database Relationships

### **One-to-One Relationship**
**Explanation:** One record in Table A relates to exactly one record in Table B, and vice versa.

```sql
-- Example: User and UserProfile (each user has one profile)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,  -- UNIQUE ensures one-to-one
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Query with one-to-one join
SELECT u.username, up.first_name, up.last_name, up.bio
FROM users u
INNER JOIN user_profiles up ON u.id = up.user_id;
```

**Common Use Cases:**
- User ↔ UserProfile
- Product ↔ ProductDetails
- Employee ↔ EmployeeConfidentialData

### **One-to-Many Relationship**
**Explanation:** One record in Table A relates to many records in Table B, but each record in Table B relates to only one record in Table A.

```sql
-- Example: User and Posts (one user can have many posts)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,  -- Foreign key to users
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Query: Get all posts by a specific user
SELECT u.username, p.title, p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.username = 'john_doe'
ORDER BY p.created_at DESC;
```

**Common Use Cases:**
- Customer ↔ Orders
- Department ↔ Employees
- Category ↔ Products

### **Many-to-Many Relationship**
**Explanation:** Records in Table A can relate to many records in Table B, and vice versa. Requires a junction table.

```sql
-- Example: Students and Courses (students can take many courses, courses have many students)
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL
);

-- Junction table for many-to-many relationship
CREATE TABLE student_courses (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade DECIMAL(3,2),
    PRIMARY KEY (student_id, course_id),  -- Composite primary key
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Query: Get all courses for a student with their grades
SELECT s.name AS student_name, c.name AS course_name, sc.grade
FROM students s
INNER JOIN student_courses sc ON s.id = sc.student_id
INNER JOIN courses c ON sc.course_id = c.id
WHERE s.name = 'Alice Johnson';

-- Query: Count students per course
SELECT c.name AS course_name, COUNT(sc.student_id) AS student_count
FROM courses c
LEFT JOIN student_courses sc ON c.id = sc.course_id
GROUP BY c.id, c.name
ORDER BY student_count DESC;
```

**Common Use Cases:**
- Students ↔ Courses
- Products ↔ Tags
- Users ↔ Groups
- Books ↔ Authors

## Setting Up Foreign Keys

### **Basic Foreign Key Syntax:**
```sql
-- Method 1: Inline definition
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2)
);

-- Method 2: Separate constraint (more explicit)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10,2),
    CONSTRAINT fk_orders_users 
        FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Method 3: Adding foreign key after table creation
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_users 
FOREIGN KEY (user_id) REFERENCES users(id);
```

## Cascade Delete/Update Options

### **ON DELETE Options:**
```sql
-- 1. CASCADE: Delete related records when parent is deleted
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    -- If user is deleted, all their posts are automatically deleted
);

-- 2. SET NULL: Set foreign key to NULL when parent is deleted
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    -- If user is deleted, user_id becomes NULL (requires nullable column)
);

-- 3. RESTRICT: Prevent deletion if related records exist (default)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
    -- Cannot delete user if they have posts
);

-- 4. NO ACTION: Similar to RESTRICT
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION
);
```

### **ON UPDATE Options:**
```sql
-- CASCADE: Update foreign key when primary key changes
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
    -- If user.id changes, posts.user_id automatically updates
);
```

## 👉 **Common Interview Question Solution:**

**Problem:** "Design a DB schema for users and their posts/comments"

```sql
-- Complete Social Media Schema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'published', -- published, draft, archived
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    parent_comment_id INTEGER, -- For nested comments (self-referencing)
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Many-to-many: Post likes
CREATE TABLE post_likes (
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Many-to-many: Tags for posts
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_comment_id);
```

**Example Queries for the Schema:**
```sql
-- Get all posts with author info and comment count
SELECT 
    p.title,
    p.content,
    u.username AS author,
    p.created_at,
    COUNT(DISTINCT c.id) AS comment_count,
    COUNT(DISTINCT pl.user_id) AS like_count
FROM posts p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON p.id = c.post_id AND c.is_approved = true
LEFT JOIN post_likes pl ON p.id = pl.post_id
WHERE p.status = 'published'
GROUP BY p.id, u.username
ORDER BY p.created_at DESC;

-- Get nested comments for a post
SELECT 
    c.id,
    c.content,
    u.username AS commenter,
    c.created_at,
    pc.content AS parent_comment
FROM comments c
INNER JOIN users u ON c.user_id = u.id
LEFT JOIN comments pc ON c.parent_comment_id = pc.id
WHERE c.post_id = 123
ORDER BY c.created_at ASC;
```

# ⚡ Indexes & Query Optimization

## What is an Index and Why It Improves Query Speed

**Explanation:** An index is a data structure that improves the speed of data retrieval operations on a database table. It works like a book index - instead of scanning every page, you can quickly find what you need.

```sql
-- Creating basic indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_comments_user_post ON comments(user_id, post_id);

-- How indexes help:
-- Without index: Full table scan (slow for large tables)
-- With index: Direct lookup (fast)
```

## B-tree Index (Default)

**Explanation:** B-tree (Balanced Tree) is the most common index type. It keeps data sorted and allows searches, sequential access, inserts, and deletes in logarithmic time.

```sql
-- B-tree is default, so these are equivalent:
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_email ON users USING BTREE (email);

-- When B-tree helps:
-- =, <, >, <=, >=, BETWEEN, IN
-- LIKE 'prefix%' (but not '%suffix')
-- ORDER BY queries
```

## When Indexes Don't Help

### **1. Small Tables**
```sql
-- Tables with few rows (less than 100-1000 rows)
-- Index overhead may outweigh benefits
CREATE TABLE config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE,
    value TEXT
); -- Primary key index is enough, no need for additional indexes
```

### **2. Low Selectivity Columns**
```sql
-- Columns with few unique values
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    gender CHAR(1),  -- Only 'M', 'F', 'O' - low selectivity
    is_active BOOLEAN  -- Only true/false - very low selectivity
);

-- Index on gender or is_active won't help much
-- They filter out too few rows to be worth the index
```

### **3. Wildcard Searches with Leading %**
```sql
-- These CAN use index (if available):
SELECT * FROM users WHERE email LIKE 'john%';
SELECT * FROM users WHERE email LIKE 'john%@gmail.com';

-- These CANNOT use index effectively:
SELECT * FROM users WHERE email LIKE '%john';
SELECT * FROM users WHERE email LIKE '%john%';
```

### **4. Table Scans Are Faster**
```sql
-- When query returns large percentage of table
SELECT * FROM users WHERE created_at > '2020-01-01'; 
-- If 80% of users created after 2020, index won't help
```

## EXPLAIN and EXPLAIN ANALYZE Basics

### **EXPLAIN** - Query Plan Without Execution
```sql
-- See the query execution plan
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';

-- Output example:
-- Index Scan using idx_users_email on users  (cost=0.14..8.16 rows=1 width=64)
--   Index Cond: (email = 'john@example.com'::text)
```

### **EXPLAIN ANALYZE** - Query Plan With Actual Execution
```sql
-- Execute query and show actual performance
EXPLAIN ANALYZE 
SELECT * FROM posts 
WHERE user_id = 123 AND created_at > '2024-01-01';

-- Output shows actual time and row counts:
-- Index Scan using idx_posts_user_date on posts  (cost=0.29..8.31 rows=1 width=64)
--   Index Cond: ((user_id = 123) AND (created_at > '2024-01-01'::date))
-- Actual time: 0.045..0.046 rows=5 loops=1
```

### **Reading EXPLAIN Output:**
- **Seq Scan**: Full table scan (may be slow for large tables)
- **Index Scan**: Using index to find rows
- **Index Only Scan**: Best case - gets all data from index
- **Nested Loop**: Join method for small datasets
- **Hash Join**: Join method for larger datasets
- **Sort**: Indicates ORDER BY operations

## Avoiding SELECT *

**Why avoid SELECT \*:**
1. **Unnecessary Data Transfer**: Retrieves unused columns
2. **Index Inefficiency**: May prevent index-only scans
3. **Breaking Changes**: Schema changes break application
4. **Network Overhead**: More data transferred

```sql
-- ❌ DON'T
SELECT * FROM users WHERE email = 'john@example.com';

-- ✅ DO
SELECT id, username, email FROM users WHERE email = 'john@example.com';

-- ✅ Even better for joins
SELECT 
    u.username,
    p.title,
    p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.id = 123;
```

## 👉 **Typical Interview Question Solution:**

**Problem:** "How do you find why a query is slow and how to optimize it?"

### **Step-by-Step Optimization Process:**

```sql
-- 1. Start with EXPLAIN ANALYZE
EXPLAIN ANALYZE 
SELECT u.username, p.title, c.content
FROM users u
INNER JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id
WHERE u.created_at > '2024-01-01'
ORDER BY p.created_at DESC
LIMIT 100;

-- 2. Look for warning signs:
-- - Sequential scans on large tables
-- - Expensive sort operations
-- - Nested loops with large datasets
-- - Missing indexes

-- 3. Check if indexes exist and are used
SELECT * FROM pg_indexes WHERE tablename IN ('users', 'posts', 'comments');

-- 4. Add missing indexes based on WHERE, JOIN, ORDER BY clauses
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);
CREATE INDEX CONCURRENTLY idx_posts_user_created ON posts(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_comments_post_id ON comments(post_id);

-- 5. Rewrite query if needed
-- Original slow query might be doing unnecessary work

-- 6. Verify improvement
EXPLAIN ANALYZE 
SELECT u.username, p.title, c.content
FROM users u
INNER JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id
WHERE u.created_at > '2024-01-01'
ORDER BY p.created_at DESC
LIMIT 100;
```

### **Common Optimization Patterns:**

```sql
-- Pattern 1: Add composite indexes for common query patterns
CREATE INDEX idx_posts_user_status_date ON posts(user_id, status, created_at);

-- Pattern 2: Covering indexes for frequent queries
CREATE INDEX idx_users_covering ON users(id, username, email, created_at);

-- Pattern 3: Partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(id) WHERE is_active = true;

-- Pattern 4: Expression indexes for function-based queries
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Pattern 5: Monitor and remove unused indexes
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;  -- Never used indexes
```

### **Complete Optimization Example:**
```sql
-- Slow query reported by users
EXPLAIN ANALYZE 
SELECT u.username, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at BETWEEN '2023-01-01' AND '2024-01-01'
  AND p.status = 'published'
  AND p.created_at > '2023-06-01'
GROUP BY u.id, u.username
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC;

-- Optimization steps:
-- 1. Add missing indexes
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_posts_user_status_date ON posts(user_id, status, created_at);

-- 2. Consider a better query structure
SELECT u.username, p.post_count
FROM users u
INNER JOIN (
    SELECT user_id, COUNT(*) as post_count
    FROM posts 
    WHERE status = 'published' 
      AND created_at > '2023-06-01'
    GROUP BY user_id
    HAVING COUNT(*) > 5
) p ON u.id = p.user_id
WHERE u.created_at BETWEEN '2023-01-01' AND '2024-01-01'
ORDER BY p.post_count DESC;
```

## Key Performance Takeaways

1. **Index strategically** - not every column needs an index
2. **Use EXPLAIN ANALYZE** to understand query performance
3. **Avoid SELECT *** - specify only needed columns
4. **Composite indexes** for common query patterns
5. **Monitor index usage** and remove unused indexes
6. **Consider query structure** - sometimes rewriting helps more than indexing


---




# ⚡ Indexes & Query Optimization (Continued)

## What is an Index and Why It Improves Query Speed

**Analogy:** Think of a database index like a book index. Without an index, you have to scan every page (full table scan). With an index, you can go directly to the relevant pages.

**How Indexes Work:**
- Indexes create a separate data structure (usually B-tree)
- This structure stores column values + pointers to actual rows
- Queries can traverse the index instead of scanning the entire table

```sql
-- Without index: Sequential Scan (O(n) complexity)
SELECT * FROM users WHERE email = 'john@example.com';
-- Database must check EVERY row in users table

-- With index: Index Scan (O(log n) complexity)  
CREATE INDEX idx_users_email ON users(email);
SELECT * FROM users WHERE email = 'john@example.com';
-- Database uses index to find exact location quickly
```

## B-tree Index (Default)

**B-tree Characteristics:**
- Self-balancing tree structure
- Efficient for equality and range queries
- Default index type in most databases
- Maintains sorted data for efficient traversal

```sql
-- B-tree works well for:
-- Equality
SELECT * FROM users WHERE id = 123;

-- Range queries
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';

-- Sorting
SELECT * FROM products ORDER BY price DESC;

-- Prefix matching
SELECT * FROM users WHERE name LIKE 'John%';
```

## When Indexes Don't Help

### **1. Small Tables**
```sql
-- Tables with few records
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

-- With only 10 categories, index on name provides little benefit
-- Sequential scan is often faster due to index overhead
```

### **2. Low Selectivity Columns**
```sql
-- Columns with very few distinct values
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,  -- Only 2 values
    status VARCHAR(20) DEFAULT 'active'  -- Few values
);

-- Index on is_active (50% true, 50% false) won't filter effectively
-- Returns too many rows to be useful
```

### **3. Frequent Data Modifications**
```sql
-- Tables with heavy write operations
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER
);

-- Indexes on frequently updated tables cause overhead
-- Each INSERT/UPDATE/DELETE must update indexes too
```

### **4. Wrong Query Patterns**
```sql
-- Queries that can't use indexes effectively

-- Leading wildcards
SELECT * FROM products WHERE name LIKE '%shoe%';

-- Functions on indexed columns
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- OR conditions on different columns
SELECT * FROM orders WHERE user_id = 123 OR total_amount > 1000;
```

## EXPLAIN and EXPLAIN ANALYZE Basics

### **Reading Query Plans:**
```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- Output interpretation:
-- Seq Scan -> Full table scan (potentially slow)
-- Index Scan -> Using index
-- Index Only Scan -> Best case, all data from index
-- Filter -> Applying WHERE conditions
-- Sort -> ORDER BY operation
```

### **Practical Examples:**
```sql
-- Good: Index Scan
EXPLAIN SELECT * FROM users WHERE id = 1;
-- "Index Scan using users_pkey on users"

-- Bad: Sequential Scan  
EXPLAIN SELECT * FROM users WHERE is_active = true;
-- "Seq Scan on users" (if no index or low selectivity)

-- Better with index:
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = true;
EXPLAIN SELECT * FROM users WHERE is_active = true;
-- "Index Scan using idx_users_active on users"
```

### **EXPLAIN ANALYZE with Real Timing:**
```sql
EXPLAIN ANALYZE 
SELECT u.username, COUNT(p.id) 
FROM users u 
JOIN posts p ON u.id = p.user_id 
WHERE u.created_at > '2024-01-01'
GROUP BY u.id;

-- Look for:
-- Actual time: 0.045..125.300 (execution time range)
-- Planning time: 0.150 (time to create plan)
-- Execution time: 125.450 (total time)
-- Rows removed by filter: 12500 (inefficient filtering)
```

## Avoiding SELECT *

**Performance Impact:**
```sql
-- ❌ Inefficient
SELECT * FROM orders 
WHERE user_id = 123 
ORDER BY created_at DESC 
LIMIT 10;

-- ✅ Efficient
SELECT id, total_amount, status, created_at 
FROM orders 
WHERE user_id = 123 
ORDER BY created_at DESC 
LIMIT 10;

-- Why it matters:
-- 1. Less data transfer between DB and application
-- 2. Potential for "index-only scans" if all columns in index
-- 3. Better cache utilization
-- 4. Immune to schema changes (adding/removing columns)
```

## 👉 **Typical Interview Question Solution:**

**Problem:** "How do you find why a query is slow and how to optimize it?"

### **Systematic Approach:**

```sql
-- Step 1: Identify the slow query
-- Use your database's query monitoring tools
-- PostgreSQL: pg_stat_statements
-- MySQL: Slow query log
-- Look for queries with high execution time or frequent calls

-- Step 2: Analyze with EXPLAIN ANALYZE
EXPLAIN ANALYZE 
SELECT u.*, p.*, c.*
FROM users u
INNER JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON p.id = c.post_id
WHERE u.created_at > '2023-01-01'
  AND p.status = 'published'
  AND c.is_approved = true
ORDER BY p.created_at DESC
LIMIT 50;

-- Step 3: Look for red flags
-- - Sequential scans on large tables
-- - Expensive sort operations (external merge disk)
-- - Nested loops with large inner tables
-- - Missing join conditions
-- - Functions applied to indexed columns

-- Step 4: Check existing indexes
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('users', 'posts', 'comments');

-- Step 5: Add strategic indexes
CREATE INDEX CONCURRENTLY idx_users_created ON users(created_at);
CREATE INDEX CONCURRENTLY idx_posts_user_status_date ON posts(user_id, status, created_at);
CREATE INDEX CONCURRENTLY idx_comments_post_approved ON comments(post_id, is_approved);

-- Step 6: Rewrite query if needed
SELECT 
    u.id,
    u.username,
    p.title,
    p.content,
    p.created_at,
    (SELECT COUNT(*) FROM comments c 
     WHERE c.post_id = p.id AND c.is_approved = true) as comment_count
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.created_at > '2023-01-01'
  AND p.status = 'published'
ORDER BY p.created_at DESC
LIMIT 50;

-- Step 7: Verify improvement
EXPLAIN ANALYZE <optimized_query>;

-- Step 8: Monitor ongoing performance
```

### **Common Optimization Patterns:**

```sql
-- Pattern 1: Composite indexes for common access patterns
CREATE INDEX idx_orders_user_status_date ON orders(user_id, status, created_at);

-- Pattern 2: Covering indexes
CREATE INDEX idx_users_covering ON users(id, username, email);

-- Pattern 3: Partial indexes for filtered queries
CREATE INDEX idx_active_products ON products(id, name) 
WHERE is_active = true AND inventory_count > 0;

-- Pattern 4: Expression indexes
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Pattern 5: Monitor and maintain
-- Remove unused indexes
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes 
WHERE idx_scan = 0;  -- Never used indexes
```

# 🧠 7. Transactions & ACID

## What are Transactions

**Definition:** A transaction is a sequence of operations performed as a single logical unit of work. All operations must complete successfully, or none of them take effect.

```sql
-- Basic transaction pattern
BEGIN;  -- Start transaction

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;  -- Make changes permanent
-- OR
ROLLBACK;  -- Undo all changes in transaction
```

## Transaction Commands

### **BEGIN** - Start Transaction
```sql
BEGIN;
-- Or BEGIN TRANSACTION;
-- Or START TRANSACTION; (in MySQL)
```

### **COMMIT** - Save Changes
```sql
BEGIN;
INSERT INTO orders (user_id, total) VALUES (1, 99.99);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 5, 2);
COMMIT;  -- Both inserts are permanently saved
```

### **ROLLBACK** - Undo Changes
```sql
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
-- Oops, wrong account!
ROLLBACK;  -- Balance change is undone
```

## ACID Properties

### **Atomicity**
- "All or nothing" principle
- Entire transaction succeeds or fails completely
- No partial updates

```sql
-- Money transfer example
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Debit
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Credit
-- Both must succeed or both must fail
COMMIT;
```

### **Consistency**
- Transaction brings database from one valid state to another
- All constraints, rules are maintained
- No invalid data after transaction

```sql
-- Consistency example
BEGIN;
INSERT INTO orders (total) VALUES (-100);  -- Would violate CHECK constraint
-- Transaction would fail, maintaining consistency
ROLLBACK;
```

### **Isolation**
- Concurrent transactions don't interfere with each other
- Multiple users can work simultaneously
- Different isolation levels control visibility of uncommitted changes

### **Durability**
- Once committed, changes are permanent
- Survives system failures, crashes
- Changes written to persistent storage

## Example: Order Placement with Multiple Steps

```sql
-- Complete order placement transaction
BEGIN;

-- 1. Create order
INSERT INTO orders (user_id, total_amount, status) 
VALUES (123, 199.98, 'pending') 
RETURNING id;

-- 2. Add order items
INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES 
    (last_order_id, 1, 2, 49.99),
    (last_order_id, 2, 1, 99.99);

-- 3. Update inventory
UPDATE products 
SET stock_quantity = stock_quantity - 2 
WHERE id = 1;

UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 2;

-- 4. Process payment
INSERT INTO payments (order_id, amount, payment_method, status)
VALUES (last_order_id, 199.98, 'credit_card', 'completed');

-- 5. Update order status
UPDATE orders SET status = 'confirmed' WHERE id = last_order_id;

-- If all steps successful
COMMIT;

-- If any step fails
ROLLBACK;
```

## Concept of Rollback on Failure

```sql
-- Using exception handling in transactions
BEGIN;
DECLARE
    success BOOLEAN := true;
BEGIN
    -- Step 1: Process payment
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    
    -- Step 2: Check if balance sufficient
    IF (SELECT balance FROM accounts WHERE id = 1) < 0 THEN
        success := false;
        RAISE EXCEPTION 'Insufficient funds';
    END IF;
    
    -- Step 3: Credit recipient
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
    
    IF success THEN
        COMMIT;
        RAISE NOTICE 'Transaction completed successfully';
    ELSE
        ROLLBACK;
        RAISE NOTICE 'Transaction failed - rolled back';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE NOTICE 'Error occurred - transaction rolled back';
END;
```

## 👉 **Interview Question Solution:**

**Problem:** "Why use transactions in backend operations like payments?"

### **Answer Structure:**

**1. Data Integrity:**
```sql
-- Without transaction: Risk of inconsistent state
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
-- System crashes here 💥
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
-- Result: Money deducted but not received!

-- With transaction: Atomic guarantee
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
COMMIT;  -- Both succeed or both fail
```

**2. Financial Accuracy:**
- Payments involve multiple related operations
- All must complete successfully for valid financial state
- Partial completion = accounting nightmares

**3. Error Recovery:**
```sql
BEGIN;
TRY:
    ProcessPayment();
    UpdateInventory();
    SendConfirmationEmail();
    COMMIT;
CATCH:
    ROLLBACK;  -- Clean undo on any failure
    LogError();
```

**4. Concurrent Access Safety:**
- Multiple users paying simultaneously
- Transactions prevent race conditions
- Ensure correct account balances

**5. Regulatory Compliance:**
- Financial systems require audit trails
- Transactions provide clear success/failure boundaries
- Essential for compliance (SOX, PCI-DSS)

# 💾 8. Constraints & Data Integrity

## NOT NULL Constraint

**Purpose:** Ensures a column cannot contain NULL values.

```sql
-- During table creation
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,        -- Required
    email VARCHAR(255) NOT NULL,          -- Required  
    phone VARCHAR(20) NULL,               -- Optional
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Adding NOT NULL to existing table
ALTER TABLE users ALTER COLUMN email SET NOT NULL;

-- Removing NOT NULL
ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;
```

## UNIQUE Constraint

**Purpose:** Ensures all values in a column are different.

```sql
-- Single column unique
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,           -- Unique email
    username VARCHAR(50) UNIQUE NOT NULL          -- Unique username
);

-- Composite unique constraint
CREATE TABLE class_registrations (
    student_id INTEGER,
    class_id INTEGER,
    semester VARCHAR(10),
    UNIQUE (student_id, class_id, semester)  -- Same student can't register same class same semester
);

-- Adding unique constraint later
ALTER TABLE products ADD CONSTRAINT unique_product_code UNIQUE (product_code);
```

## CHECK Constraint

**Purpose:** Validates data against a condition before insertion/update.

```sql
-- Basic check constraints
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 18),                    -- Must be adult
    salary DECIMAL(10,2) CHECK (salary > 0),         -- Positive salary
    email VARCHAR(255) CHECK (email LIKE '%@%')      -- Basic email format
);

-- Complex check constraints
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) CHECK (price >= 0),
    discount_price DECIMAL(10,2),
    CHECK (discount_price <= price),                 -- Cross-column validation
    CHECK (price > 0 OR discount_price IS NULL)      -- Conditional logic
);

-- Date validation
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    CHECK (end_date > start_date)                    -- Logical date range
);
```

## Foreign Key Constraint Behavior

### **Basic Foreign Key:**
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),  -- Must reference existing user
    total_amount DECIMAL(10,2)
);
```

### **Advanced Foreign Key Options:**
```sql
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    
    -- Foreign key with explicit actions
    FOREIGN KEY (order_id) 
        REFERENCES orders(id) 
        ON DELETE CASCADE        -- Delete items when order deleted
        ON UPDATE CASCADE,       -- Update order_id if orders.id changes
    
    FOREIGN KEY (product_id) 
        REFERENCES products(id) 
        ON DELETE RESTRICT       -- Prevent product deletion if referenced
        ON UPDATE NO ACTION
);
```

### **Foreign Key Actions:**

**ON DELETE Options:**
- **CASCADE**: Delete related records
- **RESTRICT**: Prevent deletion if references exist
- **SET NULL**: Set foreign key to NULL
- **SET DEFAULT**: Set foreign key to default value
- **NO ACTION**: Similar to RESTRICT

**ON UPDATE Options:**
- **CASCADE**: Update foreign key when primary key changes
- **RESTRICT**: Prevent primary key updates if referenced
- **SET NULL/DEFAULT**: Similar to ON DELETE

## Preventing Bad Data via Constraints

### **Comprehensive Example:**
```sql
CREATE TABLE bank_accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('checking', 'savings', 'business')),
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
    overdraft_limit DECIMAL(15,2) DEFAULT 0.00 CHECK (overdraft_limit >= 0),
    status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'frozen')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Complex business logic
    CHECK (
        (account_type = 'checking' AND overdraft_limit <= 1000) OR
        (account_type = 'savings' AND overdraft_limit = 0) OR
        (account_type = 'business' AND overdraft_limit <= 5000)
    ),
    
    CHECK (updated_at >= created_at)
);

-- Trigger for updated_at (bonus)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_account_updated_at
    BEFORE UPDATE ON bank_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
```

### **Benefits of Constraints:**

1. **Data Quality**: Prevent invalid data at database level
2. **Application Logic**: Reduce complexity in application code
3. **Performance**: Better than application-level checks
4. **Consistency**: Same rules enforced everywhere
5. **Documentation**: Constraints document business rules

### **Constraint Validation Queries:**
```sql
-- Check constraint definitions
SELECT 
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'bank_accounts';

-- Check foreign key relationships
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';
```

These concepts are fundamental for building robust, reliable database systems that maintain data integrity even under complex operational scenarios.
