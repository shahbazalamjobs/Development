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
