
SELECT:- 
1. What is SELECT in SQL?
Definition: The SELECT statement is used to retrieve data from one or more tables in a database.

It allows you to choose which columns you want to see and, when needed, filter, sort, group, or limit the returned data.

SELECT column_name FROM table_name;


2. Selecting All Columns — SELECT *
Definition
The asterisk (*) is a wildcard that tells SQL to return all columns from the selected table.

Important rules
- Separate column names using commas.
- Do not put a comma immediately before FROM.
- Column names must exist in the table, unless you are using an expression or an alias appropriately.
- The order of column names determines the order of output columns.


# 4. Selecting a Calculated Value

`SELECT` can retrieve not only existing columns but also calculated expressions.

 Definition

An expression is a combination of values, column names, operators, or functions that produces a result.

**Example 1: Addition**

SELECT 10 + 20;


Output 30

No table is required for this calculation in MySQL.

**Example 2: Calculate marks after adding 5 bonus marks**

SELECT name, marks, marks + 5
FROM students;


The query displays each students original marks and the calculated marks.


5. Giving a Column an Alias — AS
Definition
An alias temporarily changes the name displayed for a column or expression in the query result.

It does not rename the actual column in the database.

Syntax:
SELECT column_name AS alias_name
FROM table_name;

Example:
SELECT name AS student_name
FROM students;

The output column is labelled student_name instead of name.
Aliases with calculations
SELECT name, marks + 5 AS updated_marks
FROM students;


| name | updated_marks |
|---|---:|
| Aman | 90 |
| Priya | 97 |
| Rahul | 81 |
| Neha | 93 |
| Karan | 84 |



6. Removing Duplicate Results — DISTINCT
Definition
DISTINCT removes duplicate rows from the result of a SELECT query.

Consider these course values:
course
BCA
MCA
BCA
MCA
BBA


Without DISTINCT:
SELECT course
FROM students;

The result contains five rows, including repeated courses.

With DISTINCT:
SELECT DISTINCT course
FROM students;

Output:
course
BCA
MCA
BBA


The order of these results is not guaranteed unless you use ORDER BY.
Important rules
Rule 1: DISTINCT applies to the complete combination of selected columns.


| Function | Purpose | Example |
|---|---|---|
| `UPPER()` | Converts text to uppercase | `UPPER(name)` |
| `LOWER()` | Converts text to lowercase | `LOWER(name)` |
| `LENGTH()` | Returns string length in bytes | `LENGTH(name)` |
| `CHAR_LENGTH()` | Returns the number of characters | `CHAR_LENGTH(name)` |
| `ROUND()` | Rounds a number | `ROUND(85.678, 2)` |
| `ABS()` | Returns the absolute value | `ABS(-10)` |
| `COALESCE()` | Returns the first non-`NULL` argument | `COALESCE(NULL, 0)` |


| Mistake | Incorrect example | Correct approach |
|---|---|---|
| Forgetting `FROM` when retrieving table data | `SELECT name;` | `SELECT name FROM students;` |
| Using a nonexistent column | `SELECT salary FROM students;` when no `salary` column exists | Use a real column or add the column if appropriate |
| Adding a trailing comma | `SELECT name, FROM students;` | `SELECT name FROM students;` |
| Confusing an alias with a permanent rename | `SELECT name AS student_name FROM students;` | Remember that this changes only the output label |
| Using `= NULL` | `WHERE phone = NULL` | `WHERE phone IS NULL` |
| Assuming `DISTINCT` applies to one column only | `SELECT DISTINCT course, age FROM students;` | Remember that it applies to the selected combination |
| Assuming `SELECT` updates data | `SELECT marks + 5 FROM students;` | Use `UPDATE` if you intend to modify stored values |



