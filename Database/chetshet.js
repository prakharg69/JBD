```javascript
/*
╔══════════════════════════════════════════════════════════════════════╗
║                         SQL CHEAT SHEET                              ║
║                 QUICK REFERENCE TABLES — MYSQL                       ║
╚══════════════════════════════════════════════════════════════════════╝

=======================================================================
1. BASIC SQL COMMANDS
=======================================================================

| COMMAND       | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| SELECT        | SELECT column FROM table;               | Retrieve specific columns   |
| SELECT *      | SELECT * FROM table;                    | Retrieve all columns        |
| DISTINCT      | SELECT DISTINCT column FROM table;      | Return unique values        |
| AS            | SELECT col AS alias FROM table;         | Rename output column        |
| LIMIT         | SELECT * FROM table LIMIT 5;            | Restrict number of rows     |
| OFFSET        | SELECT * FROM table LIMIT 5 OFFSET 10;  | Skip the first 10 rows      |
| ORDER BY      | SELECT * FROM table ORDER BY col;       | Sort ascending by default   |
| DESC          | ORDER BY col DESC;                       | Sort descending             |
| ASC           | ORDER BY col ASC;                        | Sort ascending              |


=======================================================================
2. WHERE — FILTER ROWS
=======================================================================

| OPERATOR      | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| WHERE         | WHERE salary > 50000                    | Filter rows by condition    |
| AND           | WHERE age > 20 AND salary > 50000       | Both conditions must match  |
| OR            | WHERE city = 'Delhi' OR city = 'Pune'   | Either condition can match  |
| NOT           | WHERE NOT country = 'India'             | Negate a condition          |
| BETWEEN       | WHERE salary BETWEEN 30000 AND 60000    | Inclusive range             |
| NOT BETWEEN   | WHERE salary NOT BETWEEN 30000 AND 60000| Outside a range             |
| IN            | WHERE city IN ('Delhi','Pune')          | Match any listed value      |
| NOT IN        | WHERE city NOT IN ('Delhi','Pune')      | Exclude listed values       |
| LIKE          | WHERE name LIKE 'A%'                    | Match a text pattern        |
| NOT LIKE      | WHERE name NOT LIKE 'A%'                | Exclude a text pattern      |
| IS NULL       | WHERE email IS NULL                     | Find missing values         |
| IS NOT NULL   | WHERE email IS NOT NULL                 | Find non-missing values     |
| =             | WHERE salary = 50000                    | Equal to                    |
| != or <>      | WHERE salary != 50000                   | Not equal to                |
| >             | WHERE salary > 50000                    | Greater than                |
| <             | WHERE salary < 50000                    | Less than                   |
| >=            | WHERE salary >= 50000                   | Greater than or equal to    |
| <=            | WHERE salary <= 50000                   | Less than or equal to       |


=======================================================================
3. LIKE — WILDCARD PATTERNS
=======================================================================

| PATTERN       | EXAMPLE                                 | MEANING                     |
|---------------|-----------------------------------------|-----------------------------|
| %             | LIKE 'A%'                               | Starts with A               |
| %             | LIKE '%a'                               | Ends with a                 |
| %             | LIKE '%an%'                              | Contains an                |
| _             | LIKE '_a%'                               | Second character is a      |
| Multiple %    | LIKE '%Singh%'                           | Contains Singh             |
| Multiple _    | LIKE '___'                               | Exactly 3 characters       |


=======================================================================
4. AGGREGATE FUNCTIONS
=======================================================================

| FUNCTION      | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| COUNT(*)      | SELECT COUNT(*) FROM employees;         | Count all rows              |
| COUNT(column) | SELECT COUNT(salary) FROM employees;    | Count non-NULL values       |
| SUM()         | SELECT SUM(salary) FROM employees;      | Calculate total             |
| AVG()         | SELECT AVG(salary) FROM employees;      | Calculate average           |
| MAX()         | SELECT MAX(salary) FROM employees;      | Find maximum                |
| MIN()         | SELECT MIN(salary) FROM employees;      | Find minimum                |
| ROUND()       | SELECT ROUND(AVG(salary), 2) ...        | Round a numeric result      |


=======================================================================
5. GROUP BY AND HAVING
=======================================================================

| CLAUSE        | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| GROUP BY      | GROUP BY department;                    | Group rows by common values |
| HAVING        | HAVING COUNT(*) > 5                      | Filter groups               |
| WHERE         | WHERE salary > 50000                     | Filter rows before grouping |
| ORDER BY      | ORDER BY AVG(salary) DESC                | Sort grouped results        |

EXAMPLE:

SELECT
    job_title,
    COUNT(*) AS total_employees,
    AVG(salary) AS average_salary
FROM employees
GROUP BY job_title
HAVING COUNT(*) > 5
ORDER BY average_salary DESC;


=======================================================================
6. STRING FUNCTIONS
=======================================================================

| FUNCTION      | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| LENGTH()      | LENGTH(name)                            | Get byte length             |
| CHAR_LENGTH() | CHAR_LENGTH(name)                       | Count characters            |
| UPPER()       | UPPER(name)                             | Convert to uppercase        |
| LOWER()       | LOWER(name)                             | Convert to lowercase        |
| CONCAT()      | CONCAT(first_name, ' ', last_name)      | Join strings                |
| TRIM()        | TRIM(name)                              | Remove outer spaces         |
| LTRIM()       | LTRIM(name)                             | Remove left spaces          |
| RTRIM()       | RTRIM(name)                             | Remove right spaces         |
| SUBSTRING()   | SUBSTRING(name, 1, 3)                   | Extract part of a string    |
| REPLACE()     | REPLACE(name, 'a', 'b')                 | Replace text                |
| LEFT()        | LEFT(name, 3)                           | Get first 3 characters      |
| RIGHT()       | RIGHT(name, 3)                          | Get last 3 characters       |


=======================================================================
7. NUMERIC FUNCTIONS
=======================================================================

| FUNCTION      | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| ROUND()       | ROUND(AVG(salary), 2)                   | Round to 2 decimal places   |
| CEIL()        | CEIL(price)                             | Round upward                |
| FLOOR()       | FLOOR(price)                            | Round downward              |
| ABS()         | ABS(-100)                               | Return absolute value       |
| MOD()         | MOD(10, 3)                              | Return remainder            |
| POWER()       | POWER(2, 3)                             | Calculate exponent          |


=======================================================================
8. DATE AND TIME FUNCTIONS
=======================================================================

| FUNCTION      | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| NOW()         | SELECT NOW();                           | Current date and time       |
| CURDATE()     | SELECT CURDATE();                       | Current date                |
| CURTIME()     | SELECT CURTIME();                       | Current time                |
| YEAR()        | YEAR(join_date)                         | Extract year                |
| MONTH()       | MONTH(join_date)                        | Extract month               |
| DAY()         | DAY(join_date)                          | Extract day                 |
| DATEDIFF()    | DATEDIFF(date1, date2)                   | Difference in days          |
| DATE_ADD()    | DATE_ADD(date, INTERVAL 7 DAY)           | Add a time interval         |
| DATE_SUB()    | DATE_SUB(date, INTERVAL 7 DAY)           | Subtract a time interval    |


=======================================================================
9. CONDITIONAL FUNCTIONS
=======================================================================

| FUNCTION      | SYNTAX                                  | USAGE                       |
|---------------|-----------------------------------------|-----------------------------|
| CASE          | CASE WHEN condition THEN value END      | Conditional output          |
| IF()          | IF(condition, value1, value2)           | Choose between two values   |
| IFNULL()      | IFNULL(column, 0)                        | Replace NULL with a value   |
| COALESCE()    | COALESCE(col1, col2, 0)                  | First non-NULL value        |
| NULLIF()      | NULLIF(value1, value2)                   | Return NULL if values match|

EXAMPLE:

SELECT
    name,
    CASE
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;


=======================================================================
10. JOINS
=======================================================================

| JOIN TYPE       | SYNTAX STRUCTURE                         | USAGE                      |
|-----------------|------------------------------------------|----------------------------|
| INNER JOIN      | A INNER JOIN B ON A.id = B.id            | Matching rows only         |
| LEFT JOIN       | A LEFT JOIN B ON A.id = B.id              | All left + matching right |
| RIGHT JOIN      | A RIGHT JOIN B ON A.id = B.id             | All right + matching left |
| CROSS JOIN      | A CROSS JOIN B                            | Every possible combination|
| SELF JOIN       | A JOIN A AS B ON A.id = B.manager_id      | Join a table to itself    |

EXAMPLE:

SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments
    ON employees.department_id = departments.id;


=======================================================================
11. SUBQUERIES
=======================================================================

| TYPE            | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| Scalar          | WHERE salary > (SELECT AVG(salary) ...) | Compare with one value     |
| IN Subquery     | WHERE id IN (SELECT id ...)              | Match returned values      |
| EXISTS          | WHERE EXISTS (SELECT 1 ...)              | Check if rows exist         |
| NOT EXISTS      | WHERE NOT EXISTS (SELECT 1 ...)          | Check if no rows exist      |

EXAMPLE:

SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);


=======================================================================
12. SET OPERATORS
=======================================================================

| OPERATOR        | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| UNION           | SELECT ... UNION SELECT ...              | Combine; remove duplicates |
| UNION ALL       | SELECT ... UNION ALL SELECT ...          | Combine; keep duplicates   |

RULE:
Both queries must return the same number of columns with compatible data types.


=======================================================================
13. WINDOW FUNCTIONS
=======================================================================

| FUNCTION        | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| ROW_NUMBER()    | ROW_NUMBER() OVER (ORDER BY salary)      | Unique sequential numbers  |
| RANK()          | RANK() OVER (ORDER BY salary DESC)       | Rank; skips after ties     |
| DENSE_RANK()    | DENSE_RANK() OVER (ORDER BY salary DESC) | Rank; no gaps after ties   |
| LAG()           | LAG(salary) OVER (ORDER BY id)            | Access previous row        |
| LEAD()          | LEAD(salary) OVER (ORDER BY id)           | Access next row             |
| PARTITION BY    | OVER (PARTITION BY department)             | Create groups for windows  |

EXAMPLE:

SELECT
    name,
    department,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;


=======================================================================
14. COMMON TABLE EXPRESSIONS (CTE)
=======================================================================

| CONCEPT         | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| WITH            | WITH cte AS (SELECT ...) SELECT ...      | Name a temporary result    |

EXAMPLE:

WITH department_salary AS (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
)
SELECT *
FROM department_salary
WHERE avg_salary > 60000;


=======================================================================
15. DATA MODIFICATION
=======================================================================

| COMMAND         | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| INSERT          | INSERT INTO table (col) VALUES (value);  | Add rows                   |
| INSERT MULTIPLE | INSERT INTO table VALUES (...), (...);   | Add multiple rows          |
| UPDATE          | UPDATE table SET col = value WHERE ...;  | Modify existing rows       |
| DELETE          | DELETE FROM table WHERE condition;       | Delete selected rows       |
| TRUNCATE        | TRUNCATE TABLE table;                    | Remove all rows            |

IMPORTANT:
Always check the WHERE condition before UPDATE or DELETE.
Without WHERE, all rows may be affected.


=======================================================================
16. TABLE STRUCTURE — DDL
=======================================================================

| COMMAND         | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| CREATE DATABASE | CREATE DATABASE database_name;            | Create a database          |
| CREATE TABLE    | CREATE TABLE table_name (...);            | Create a table             |
| ALTER TABLE     | ALTER TABLE table ADD column datatype;    | Change table structure     |
| DROP TABLE      | DROP TABLE table_name;                    | Delete a table             |
| DROP DATABASE   | DROP DATABASE database_name;              | Delete a database          |
| RENAME TABLE    | RENAME TABLE old_name TO new_name;         | Rename a table             |
| DESCRIBE        | DESCRIBE table_name;                       | Show column definitions    |
| SHOW TABLES     | SHOW TABLES;                               | List tables                |


=======================================================================
17. CONSTRAINTS
=======================================================================

| CONSTRAINT      | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| PRIMARY KEY     | id INT PRIMARY KEY                       | Unique row identifier      |
| FOREIGN KEY     | FOREIGN KEY (dept_id) REFERENCES ...     | Link related tables        |
| UNIQUE          | email VARCHAR(100) UNIQUE                | Prevent duplicate values   |
| NOT NULL        | name VARCHAR(100) NOT NULL                | Require a value            |
| DEFAULT         | status VARCHAR(20) DEFAULT 'Active'       | Set a default value        |
| CHECK           | CHECK (salary >= 0)                       | Restrict allowed values    |
| AUTO_INCREMENT  | id INT AUTO_INCREMENT PRIMARY KEY         | Generate numeric IDs       |


=======================================================================
18. TRANSACTIONS
=======================================================================

| COMMAND         | SYNTAX                                  | USAGE                      |
|-----------------|-----------------------------------------|----------------------------|
| START TRANSACTION | START TRANSACTION;                     | Begin transaction          |
| COMMIT          | COMMIT;                                 | Save changes               |
| ROLLBACK        | ROLLBACK;                               | Undo uncommitted changes   |
| SAVEPOINT       | SAVEPOINT point1;                        | Create rollback point      |
| ROLLBACK TO     | ROLLBACK TO point1;                      | Return to savepoint        |


=======================================================================
19. QUERY EXECUTION ORDER
=======================================================================

| ORDER | CLAUSE       | PURPOSE                               |
|-------|--------------|---------------------------------------|
| 1     | FROM         | Choose source table(s)                |
| 2     | JOIN / ON    | Combine related tables                |
| 3     | WHERE        | Filter individual rows                |
| 4     | GROUP BY     | Create groups                         |
| 5     | HAVING       | Filter groups                         |
| 6     | SELECT       | Choose output columns and expressions |
| 7     | DISTINCT     | Remove duplicate result rows          |
| 8     | ORDER BY     | Sort the result                       |
| 9     | LIMIT        | Restrict the number of rows           |


=======================================================================
20. COMPLETE QUERY SKELETON
=======================================================================

SELECT
    column1,
    COUNT(*) AS total_rows,
    AVG(column2) AS average_value
FROM table_name
JOIN another_table
    ON table_name.id = another_table.id
WHERE row_condition
GROUP BY column1
HAVING COUNT(*) > 1
ORDER BY average_value DESC
LIMIT 10;


=======================================================================
21. QUICK MEMORY RULES
=======================================================================

| RULE                  | REMEMBER                                      |
|-----------------------|-----------------------------------------------|
| WHERE                 | Filters rows before grouping                  |
| GROUP BY              | Groups rows with matching values              |
| HAVING                | Filters groups after grouping                 |
| ORDER BY              | Sorts the final result                        |
| COUNT(*)              | Counts rows                                   |
| COUNT(column)         | Counts non-NULL values                        |
| BETWEEN               | Includes both endpoints                       |
| IN                    | Matches any value in the list                 |
| LIKE 'A%'             | Starts with A                                 |
| LIKE '%A'             | Ends with A                                   |
| LIKE '%A%'            | Contains A                                    |
| IS NULL               | Checks for NULL                               |
| DISTINCT              | Removes duplicate result rows                 |
| UNION                 | Combines results and removes duplicates       |
| UNION ALL             | Combines results and keeps duplicates         |
| UPDATE / DELETE       | Use WHERE carefully                           |
| AVG(integer_column)   | Use 1.0 * AVG(...) if decimal precision needed|
| MySQL string length   | LENGTH() counts bytes; CHAR_LENGTH() counts characters |

=======================================================================
END OF SQL CHEAT SHEET
=======================================================================
*/
```