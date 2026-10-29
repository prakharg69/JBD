
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





/*
===========================================================
                    SQL WHERE CLAUSE
===========================================================

1. DEFINITION
--------------
WHERE is used to filter rows based on specified conditions.

SYNTAX:

SELECT column_names
FROM table_name
WHERE condition;

RULES:
- WHERE filters rows, not columns.
- Only rows whose condition evaluates to TRUE are returned.
- WHERE is optional.
- WHERE does not modify the original table.
- WHERE is evaluated before GROUP BY and SELECT in the
  logical query processing order.
===========================================================
2. COMPARISON OPERATORS
===========================================================

Operator    Meaning                         Example
-----------------------------------------------------------
=           Equal to                        marks = 80
!=          Not equal to                    marks != 80
<>          Not equal to                    marks <> 80
>           Greater than                    marks > 80
<           Less than                       marks < 80
>=          Greater than or equal to        marks >= 80
<=          Less than or equal to           marks <= 80

EXAMPLES:

SELECT *
FROM students
WHERE marks = 80;

SELECT *
FROM students
WHERE marks > 80;

SELECT *
FROM students
WHERE marks <= 50;

SELECT *
FROM students
WHERE course != 'BCA';

RULES:
- Use single quotes for string values.
- Numeric values generally do not need quotes.
- Both != and <> mean not equal in MySQL.
- Use >= when the boundary value must be included.
- Use > when the boundary value must be excluded.

TRICK:
> 80   means greater than 80, not including 80.
>= 80  means greater than or equal to 80, including 80.
< 80   means less than 80, not including 80.
<= 80  means less than or equal to 80, including 80.


===========================================================
3. LOGICAL OPERATORS: AND, OR, NOT
===========================================================

Operator    Definition
-----------------------------------------------------------
AND         Both conditions must be TRUE.
OR          At least one condition must be TRUE.
NOT         Reverses a logical condition.

AND EXAMPLE:

SELECT *
FROM students
WHERE age >= 20
  AND marks > 80;

Both conditions must be satisfied.

OR EXAMPLE:

SELECT *
FROM students
WHERE course = 'BCA'
   OR course = 'MCA';

Either condition can be satisfied.

NOT EXAMPLE:

SELECT *
FROM students
WHERE NOT course = 'BCA';

Returns rows whose course is not BCA, excluding NULL
course values because the condition evaluates to UNKNOWN.

TRUTH TABLE:

Condition A    Condition B    A AND B    A OR B
------------------------------------------------
TRUE           TRUE           TRUE       TRUE
TRUE           FALSE          FALSE      TRUE
FALSE          TRUE           FALSE      TRUE
FALSE          FALSE          FALSE      FALSE

NOT TRUE  = FALSE
NOT FALSE = TRUE

RULE:
Logical operator precedence is generally:

1. Parentheses ()
2. NOT
3. AND
4. OR

TRICK:
Use parentheses when combining AND and OR.

EXAMPLE:

SELECT *
FROM students
WHERE (course = 'BCA' OR course = 'MCA')
  AND marks > 80;


===========================================================
4. BETWEEN OPERATOR
===========================================================

DEFINITION:
BETWEEN checks whether a value falls within a range.
Both boundaries are included.

SYNTAX:

SELECT *
FROM table_name
WHERE column_name BETWEEN lower_value AND upper_value;

EXAMPLE:

SELECT *
FROM students
WHERE marks BETWEEN 70 AND 90;

Equivalent to:

SELECT *
FROM students
WHERE marks >= 70
  AND marks <= 90;

EXCLUDING A RANGE:

SELECT *
FROM students
WHERE marks NOT BETWEEN 70 AND 90;

RULES:
- BETWEEN includes both boundaries.
- It works with numbers, dates, and comparable values.

DATE TRICK:
For a DATETIME column, use a half-open interval when you
need to include an entire calendar month.

EXAMPLE:

SELECT *
FROM orders
WHERE created_at >= '2026-10-01'
  AND created_at < '2026-11-01';

This includes every time during October 2026.


===========================================================
5. IN OPERATOR
===========================================================

DEFINITION:
IN checks whether a value matches any value in a list.

SYNTAX:

SELECT *
FROM table_name
WHERE column_name IN (value1, value2, value3);

EXAMPLE:

SELECT *
FROM students
WHERE course IN ('BCA', 'MCA', 'BBA');

Equivalent to:

SELECT *
FROM students
WHERE course = 'BCA'
   OR course = 'MCA'
   OR course = 'BBA';

EXCLUDING VALUES:

SELECT *
FROM students
WHERE course NOT IN ('BCA', 'MCA');

RULES:
- IN simplifies multiple equality conditions.
- NOT IN excludes matching values.
- NULL requires special care.

IMPORTANT NULL TRICK:
If a NOT IN list contains NULL, the condition can evaluate
to UNKNOWN for otherwise nonmatching values.

Use IS NULL or IS NOT NULL for NULL checks.


===========================================================
6. LIKE OPERATOR
===========================================================

DEFINITION:
LIKE matches text against a specified pattern.

WILDCARDS:

Wildcard    Meaning
----------------------------------------------
%           Zero or more characters
_           Exactly one character

EXAMPLES:

1. Names starting with A:

SELECT *
FROM students
WHERE name LIKE 'A%';

2. Names ending with a:

SELECT *
FROM students
WHERE name LIKE '%a';

3. Names containing an:

SELECT *
FROM students
WHERE name LIKE '%an%';

4. Names with exactly four characters:

SELECT *
FROM students
WHERE name LIKE '____';

5. Names whose second character is a:

SELECT *
FROM students
WHERE name LIKE '_a%';

PATTERN TRICKS:

'A%'     Starts with A.
'%A'     Ends with A.
'%A%'    Contains A.
'_A%'    Second character is A.
'__A%'   Third character is A.
'____'   Exactly four characters.

RULES:
- % represents zero or more characters.
- _ represents exactly one character.
- Case sensitivity depends on the expression's collation.
- Use an appropriate case-sensitive collation or binary
  comparison if case-sensitive matching is required.


===========================================================
7. NULL CHECKING
===========================================================

DEFINITION:
NULL represents a missing or unknown value.
It is different from zero, an empty string, or the text 'NULL'.

OPERATOR        PURPOSE
-----------------------------------------------
IS NULL         Checks for NULL values.
IS NOT NULL     Checks for non-NULL values.

EXAMPLE:

SELECT *
FROM students
WHERE phone IS NULL;

SELECT *
FROM students
WHERE phone IS NOT NULL;

INCORRECT:

SELECT *
FROM students
WHERE phone = NULL;

CORRECT:

SELECT *
FROM students
WHERE phone IS NULL;

RULES:
- Do not use = NULL or != NULL.
- Use IS NULL or IS NOT NULL.
- Ordinary comparisons involving NULL generally
  evaluate to UNKNOWN.
- WHERE returns only rows whose condition is TRUE.


===========================================================
8. COMBINING WHERE WITH SELECT EXPRESSIONS
===========================================================

DEFINITION:
A SELECT expression calculates a value for display.
WHERE filters rows using a condition.

EXAMPLE:

SELECT name, marks + 5 AS updated_marks
FROM students
WHERE marks + 5 > 85;

IMPORTANT RULE:
A SELECT alias generally cannot be referenced in the
WHERE clause of the same query block.

INCORRECT:

SELECT marks + 5 AS updated_marks
FROM students
WHERE updated_marks > 85;

CORRECT:

SELECT marks + 5 AS updated_marks
FROM students
WHERE marks + 5 > 85;

ALTERNATIVE USING A SUBQUERY:

SELECT *
FROM (
    SELECT name, marks + 5 AS updated_marks
    FROM students
) AS result
WHERE updated_marks > 85;


===========================================================
9. WHERE WITH EXISTS
===========================================================

DEFINITION:
EXISTS checks whether a subquery returns at least one row.

EXAMPLE:

SELECT s.id, s.name
FROM students AS s
WHERE EXISTS (
    SELECT 1
    FROM payments AS p
    WHERE p.student_id = s.id
);

PURPOSE:
Returns students who have at least one matching payment.

RULES:
- EXISTS checks whether rows exist.
- SELECT 1 is a common convention inside EXISTS.
- The subquery can refer to columns from the outer query.
- EXISTS is often useful for related-table checks.


===========================================================
10. WHERE WITH MULTIPLE CONDITIONS
===========================================================

EXAMPLE 1: Age at least 20 AND marks above 80.

SELECT *
FROM students
WHERE age >= 20
  AND marks > 80;

EXAMPLE 2: Course is BCA OR MCA.

SELECT *
FROM students
WHERE course IN ('BCA', 'MCA');

EXAMPLE 3: Marks between 70 and 90 AND course is BCA.

SELECT *
FROM students
WHERE marks BETWEEN 70 AND 90
  AND course = 'BCA';

EXAMPLE 4: Course is not BCA AND marks are at least 80.

SELECT *
FROM students
WHERE course <> 'BCA'
  AND marks >= 80;

EXAMPLE 5: Course is BCA or MCA, and marks exceed 80.

SELECT *
FROM students
WHERE course IN ('BCA', 'MCA')
  AND marks > 80;


===========================================================
11. COMMON MISTAKES
===========================================================

Mistake 1: Using == for equality.

Incorrect:
WHERE marks == 80

Correct:
WHERE marks = 80


Mistake 2: Forgetting quotes around text.

Incorrect:
WHERE course = BCA

Correct:
WHERE course = 'BCA'


Mistake 3: Comparing NULL with =.

Incorrect:
WHERE phone = NULL

Correct:
WHERE phone IS NULL


Mistake 4: Confusing AND and OR.

AND requires both conditions to be TRUE.
OR requires at least one condition to be TRUE.


Mistake 5: Ignoring operator precedence.

Use parentheses to make complex conditions clear.


Mistake 6: Using SELECT aliases inside WHERE.

Repeat the expression or use a subquery.


Mistake 7: Forgetting BETWEEN boundaries are inclusive.

BETWEEN 10 AND 20 includes both 10 and 20.


===========================================================
12. WHERE QUERY SKELETON
===========================================================

BASIC FILTER:

SELECT column_names
FROM table_name
WHERE condition;


MULTIPLE CONDITIONS:

SELECT column_names
FROM table_name
WHERE condition1
  AND condition2;


EITHER CONDITION:

SELECT column_names
FROM table_name
WHERE condition1
   OR condition2;


RANGE FILTER:

SELECT column_names
FROM table_name
WHERE column_name BETWEEN lower_value AND upper_value;


LIST FILTER:

SELECT column_names
FROM table_name
WHERE column_name IN (value1, value2);


TEXT PATTERN:

SELECT column_names
FROM table_name
WHERE column_name LIKE 'pattern';


NULL FILTER:

SELECT column_names
FROM table_name
WHERE column_name IS NULL;


===========================================================
13. LOGICAL QUERY EXECUTION ORDER
===========================================================

Simplified logical processing order:

1. FROM       - Identify the source table.
2. WHERE      - Filter rows.
3. GROUP BY   - Group remaining rows.
4. HAVING     - Filter groups.
5. SELECT     - Choose columns and expressions.
6. DISTINCT   - Remove duplicate result rows.
7. ORDER BY   - Sort the result.
8. LIMIT      - Limit the number of returned rows.

NOTE:
This is logical processing order. The database optimizer
may choose a different physical execution plan.


===========================================================
14. QUICK REVISION TABLE
===========================================================

Operator       Purpose
-----------------------------------------------------------
=              Equal to
!=             Not equal to
<>             Not equal to
>              Greater than
<              Less than
>=             Greater than or equal to
<=             Less than or equal to
AND            Both conditions must be TRUE
OR             At least one condition must be TRUE
NOT            Reverses a condition
BETWEEN        Checks an inclusive range
NOT BETWEEN    Checks outside an inclusive range
IN             Matches a value from a list
NOT IN         Excludes values from a list
LIKE           Matches a text pattern
IS NULL        Checks for missing values
IS NOT NULL    Checks for non-NULL values
EXISTS         Checks whether a subquery returns rows


===========================================================
15. PRACTICE QUESTIONS
===========================================================

Use the students table.

1. Find students whose marks are greater than 80.
2. Find students whose age is exactly 20.
3. Find students who do not study BCA.
4. Find students whose marks are between 75 and 90.
5. Find students studying BCA or MCA.
6. Find students whose names start with N.
7. Find students who are at least 20 years old and
   have marks above 80.
8. Find students studying MCA or BBA who have marks
   of at least 80.
9. Find students whose names contain 'an'.
10. Find students whose phone number is NULL.

===========================================================
END OF WHERE CLAUSE NOTES
===========================================================
